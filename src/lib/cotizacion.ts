/**
 * Contrato compartido entre el wizard (cliente) y /api/notify (servidor).
 * Tener las opciones en un solo lugar permite validar en el servidor contra
 * una lista blanca en vez de confiar en lo que mande el navegador.
 */

export const TIPOS_SERVICIO = [
  { id: 'oficinas', label: 'Oficinas / corporativo', ayuda: 'Oficina, condominio, escuela, restaurante, industria' },
  { id: 'hogar', label: 'Hogar / doméstico', ayuda: 'Casa o departamento, por día o recurrente' },
  { id: 'personal', label: 'Personal de planta', ayuda: 'Personal fijo asignado a tu inmueble' },
  { id: 'especializado', label: 'Obra, evento o especializado', ayuda: 'Post-obra, post-evento, sanitización, pisos, alturas' },
] as const;

export const FRECUENCIAS = [
  { id: 'unica', label: 'Una sola vez' },
  { id: 'semanal', label: '1–2 veces por semana' },
  { id: 'diaria', label: 'Diario / de lunes a viernes' },
  { id: 'no-se', label: 'Todavía no lo sé' },
] as const;

export const TAMANOS = [
  { id: 'chico', label: 'Hasta 100 m²' },
  { id: 'mediano', label: '100 – 500 m²' },
  { id: 'grande', label: '500 – 2,000 m²' },
  { id: 'xl', label: 'Más de 2,000 m²' },
] as const;

export const ZONAS_COTIZACION = [
  { id: 'cdmx', label: 'Ciudad de México' },
  { id: 'edomex', label: 'Estado de México / Zona Metropolitana' },
  { id: 'otro', label: 'Otro estado' },
] as const;

export type CotizacionPayload = {
  tipo: string;
  tamano: string;
  frecuencia: string;
  zona: string;
  nombre: string;
  contacto: string; // email o teléfono
  detalle?: string;
};

export const OPCIONES_VALIDAS = {
  tipo: TIPOS_SERVICIO.map((t) => t.id),
  tamano: TAMANOS.map((t) => t.id),
  frecuencia: FRECUENCIAS.map((f) => f.id),
  zona: ZONAS_COTIZACION.map((z) => z.id),
} as const;

export function etiqueta(campo: keyof typeof OPCIONES_VALIDAS, id: string): string {
  const fuentes = {
    tipo: TIPOS_SERVICIO,
    tamano: TAMANOS,
    frecuencia: FRECUENCIAS,
    zona: ZONAS_COTIZACION,
  } as const;
  const found = (fuentes[campo] as readonly { id: string; label: string }[]).find((o) => o.id === id);
  return found ? found.label : id;
}
