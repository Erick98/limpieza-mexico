/**
 * Rate limiter en memoria (ventana deslizante por IP).
 *
 * LIMITACIÓN CONOCIDA Y ACEPTADA: al vivir en memoria, el contador es por instancia
 * serverless. En Vercel esto NO es un límite global — un atacante distribuido puede
 * pegarle a varias instancias. Sirve para frenar el spam de formulario ordinario,
 * que es el vector real de un sitio de captación.
 * Si el spam se vuelve un problema serio, la siguiente parada es Upstash Redis o
 * Vercel KV (o directamente Turnstile/reCAPTCHA). Está documentado a propósito para
 * que nadie asuma una protección que no existe.
 */

type Registro = { hits: number[]; ventanaMs: number };

const almacen = new Map<string, Registro>();
const LIMPIEZA_CADA = 5 * 60 * 1000;
let ultimaLimpieza = Date.now();

export type ResultadoLimite = {
  permitido: boolean;
  restantes: number;
  reintentarEnSegundos: number;
};

export function rateLimit(
  clave: string,
  opciones: { limite: number; ventanaMs: number }
): ResultadoLimite {
  const ahora = Date.now();

  // Barrido periódico para que el Map no crezca sin control.
  if (ahora - ultimaLimpieza > LIMPIEZA_CADA) {
    for (const [k, v] of almacen) {
      const vivos = v.hits.filter((t) => ahora - t < v.ventanaMs);
      if (vivos.length === 0) almacen.delete(k);
      else v.hits = vivos;
    }
    ultimaLimpieza = ahora;
  }

  const registro = almacen.get(clave) ?? { hits: [], ventanaMs: opciones.ventanaMs };
  const vigentes = registro.hits.filter((t) => ahora - t < opciones.ventanaMs);

  if (vigentes.length >= opciones.limite) {
    const masViejo = Math.min(...vigentes);
    almacen.set(clave, { hits: vigentes, ventanaMs: opciones.ventanaMs });
    return {
      permitido: false,
      restantes: 0,
      reintentarEnSegundos: Math.max(
        1,
        Math.ceil((opciones.ventanaMs - (ahora - masViejo)) / 1000)
      ),
    };
  }

  vigentes.push(ahora);
  almacen.set(clave, { hits: vigentes, ventanaMs: opciones.ventanaMs });
  return {
    permitido: true,
    restantes: opciones.limite - vigentes.length,
    reintentarEnSegundos: 0,
  };
}

/** IP del cliente detrás del proxy de Vercel. Acota formato para no crear claves arbitrarias. */
export function ipDeRequest(req: Request): string {
  const normalizar = (valor: string | null): string | null => {
    const ip = valor?.split(',')[0]?.trim().slice(0, 64);
    if (!ip) return null;
    const ipv4 = /^(?:\d{1,3}\.){3}\d{1,3}$/.test(ip);
    const ipv6 = /^[0-9a-f:.]{2,64}$/i.test(ip) && ip.includes(':');
    return ipv4 || ipv6 ? ip : null;
  };

  return normalizar(req.headers.get('x-forwarded-for')) ?? normalizar(req.headers.get('x-real-ip')) ?? 'desconocida';
}
