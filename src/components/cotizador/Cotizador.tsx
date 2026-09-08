'use client';

/**
 * Wizard de cotización en 3 pasos. ES LA ÚNICA ISLA CLIENTE DEL SITIO.
 *
 * Decisiones:
 *  - Sin librerías de animación ni de formularios: es un <form> con estado local.
 *  - Los pasos 1 y 2 son botones grandes (un tap = avanzar). En móvil eso es la
 *    diferencia entre cotizar en 20 segundos o abandonar.
 *  - aria-live en el estado del envío, fieldset/legend por paso, y foco movido al
 *    encabezado del paso para lectores de pantalla.
 *
 * SOBRE JAVASCRIPT (honestidad técnica): este wizard REQUIERE JS. El avance entre
 * pasos es estado de React. El `action`/`method` del <form> apuntan a /api/notify
 * como red de seguridad si el JS falla DESPUÉS de hidratar, pero no es un fallback
 * real sin JS: sin JS el usuario sólo vería el paso 1. Se asume conscientemente
 * porque el tráfico objetivo (búsqueda móvil en Google) ejecuta JS, y porque el
 * contenido indexable de la página sí es server-rendered. Quien llegue sin JS tiene
 * la ruta alterna visible: el correo de ventas en el footer y en /contacto.
 */

import { useId, useRef, useState } from 'react';
import {
  TIPOS_SERVICIO,
  TAMANOS,
  FRECUENCIAS,
  ZONAS_COTIZACION,
} from '@/lib/cotizacion';
import { whatsappUrl } from '@/lib/site';

type Estado = 'idle' | 'enviando' | 'ok' | 'error';

const CARD =
  'w-full text-left rounded-2xl border px-4 py-3.5 transition-colors cursor-pointer';
const CARD_OFF = 'border-black/10 bg-white hover:border-[#2F5D50]/50 hover:bg-[#FAFAF7]';
const CARD_ON = 'border-[#2F5D50] bg-[#2F5D50]/7';

export default function Cotizador({ compacto = false }: { compacto?: boolean }) {
  const baseId = useId();
  const [paso, setPaso] = useState(1);
  const [estado, setEstado] = useState<Estado>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const headingRef = useRef<HTMLParagraphElement>(null);

  const [tipo, setTipo] = useState('');
  const [tamano, setTamano] = useState('');
  const [frecuencia, setFrecuencia] = useState('');
  const [zona, setZona] = useState('');
  const [nombre, setNombre] = useState('');
  const [contacto, setContacto] = useState('');
  const [detalle, setDetalle] = useState('');
  // Honeypot anti-spam: un bot rellena todo; un humano no ve este campo.
  const [website, setWebsite] = useState('');

  const wa = whatsappUrl();

  function irA(n: number) {
    setPaso(n);
    // Mover el foco al encabezado del paso para que un lector de pantalla anuncie el cambio.
    requestAnimationFrame(() => headingRef.current?.focus());
  }

  function elegir(setter: (v: string) => void, valor: string, siguiente: number) {
    setter(valor);
    irA(siguiente);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (estado === 'enviando') return;
    setEstado('enviando');
    setErrorMsg('');

    try {
      const res = await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'cotizacion',
          data: { tipo, tamano, frecuencia, zona, nombre, contacto, detalle, website },
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErrorMsg(
          res.status === 429
            ? 'Recibimos varias solicitudes desde tu conexión. Espera un minuto e intenta de nuevo.'
            : json?.message || 'No pudimos enviar tu solicitud. Intenta otra vez.'
        );
        setEstado('error');
        return;
      }
      setEstado('ok');
    } catch {
      setErrorMsg('Hubo un problema de conexión. Revisa tu red e intenta de nuevo.');
      setEstado('error');
    }
  }

  if (estado === 'ok') {
    return (
      <div
        className="rounded-[2rem] border border-[#2F5D50]/30 bg-[#2F5D50]/7 p-6 shadow-[0_24px_70px_rgba(31,31,37,0.08)]"
        role="status"
        aria-live="polite"
      >
        <p className="font-display text-2xl mb-2">Solicitud recibida</p>
        <p className="text-[15px] leading-relaxed mb-5">
          Un asesor te contacta con la cotización. Si quieres adelantar el proceso,
          escríbenos directo y te atendemos en el momento.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          {wa && (
            <a
              href={wa}
              className="inline-flex justify-center items-center rounded-full bg-[#2F5D50] px-5 py-3 font-bold text-white hover:bg-[#24483F]"
            >
              Escribir por WhatsApp
            </a>
          )}
          <a
            href="mailto:ventas@limpiezamexico.com"
            className="inline-flex justify-center items-center rounded-full border border-[#1F1F25]/20 px-5 py-3 font-bold hover:bg-[#EDEDEA]"
          >
            ventas@limpiezamexico.com
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      action="/api/notify"
      method="post"
      className={`rounded-[2rem] border border-black/10 bg-white p-5 shadow-[0_24px_70px_rgba(31,31,37,0.10)] sm:p-6 ${
        compacto ? '' : 'sm:p-7'
      }`}
      noValidate
    >
      <div className="flex items-baseline justify-between mb-1">
        <p
          ref={headingRef}
          tabIndex={-1}
          className="font-display text-xl sm:text-2xl outline-none"
        >
          {paso === 1 && 'Cotiza tu servicio de limpieza'}
          {paso === 2 && '¿De qué tamaño y con qué frecuencia?'}
          {paso === 3 && '¿A dónde te enviamos la cotización?'}
        </p>
        <span className="rounded-full bg-[#FAFAF7] px-3 py-1 text-xs font-bold text-[#2F5D50] shrink-0 ml-3">Paso {paso} de 3</span>
      </div>

      {/* Barra de progreso: decorativa, el dato real lo da el texto de arriba. */}
      <div className="h-1.5 w-full bg-[#EDEDEA] rounded-full mb-5 mt-3" aria-hidden="true">
        <div
          className="h-1.5 bg-[#2F5D50] rounded-full transition-[width] duration-200"
          style={{ width: `${(paso / 3) * 100}%` }}
        />
      </div>

      {/* PASO 1 */}
      {paso === 1 && (
        <fieldset>
          <legend className="text-[15px] text-[#1F1F25] mb-3">
            ¿Qué necesitas limpiar?{' '}
            <span className="text-[#9B9BA3]">Gratis y sin compromiso.</span>
          </legend>
          <div className="grid gap-2.5">
            {TIPOS_SERVICIO.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => elegir(setTipo, t.id, 2)}
                aria-pressed={tipo === t.id}
                className={`${CARD} ${tipo === t.id ? CARD_ON : CARD_OFF}`}
              >
                <span className="block font-bold">{t.label}</span>
                <span className="block text-sm text-[#9B9BA3] mt-0.5">{t.ayuda}</span>
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {/* PASO 2 */}
      {paso === 2 && (
        <div className="space-y-5">
          <fieldset>
            <legend className="text-[15px] mb-3">Superficie aproximada</legend>
            <div className="grid grid-cols-2 gap-2.5">
              {TAMANOS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTamano(t.id)}
                  aria-pressed={tamano === t.id}
                  className={`${CARD} text-center font-medium ${
                    tamano === t.id ? CARD_ON : CARD_OFF
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor={`${baseId}-frecuencia`}
                className="block text-[15px] mb-2"
              >
                Frecuencia
              </label>
              <select
                id={`${baseId}-frecuencia`}
                name="frecuencia"
                value={frecuencia}
                onChange={(e) => setFrecuencia(e.target.value)}
                className="w-full rounded-2xl border border-black/10 bg-[#FAFAF7] px-3 py-3"
              >
                <option value="">Selecciona</option>
                {FRECUENCIAS.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor={`${baseId}-zona`} className="block text-[15px] mb-2">
                Zona
              </label>
              <select
                id={`${baseId}-zona`}
                name="zona"
                value={zona}
                onChange={(e) => setZona(e.target.value)}
                className="w-full rounded-2xl border border-black/10 bg-[#FAFAF7] px-3 py-3"
              >
                <option value="">Selecciona</option>
                {ZONAS_COTIZACION.map((z) => (
                  <option key={z.id} value={z.id}>
                    {z.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => irA(1)}
              className="rounded-full border border-[#1F1F25]/15 px-4 py-3 font-bold hover:bg-[#FAFAF7]"
            >
              Atrás
            </button>
            <button
              type="button"
              onClick={() => irA(3)}
              className="flex-1 rounded-full bg-[#1F1F25] px-4 py-3 font-bold text-white hover:bg-black"
            >
              Continuar
            </button>
          </div>
        </div>
      )}

      {/* PASO 3 */}
      {paso === 3 && (
        <div className="space-y-4">
          <div>
            <label htmlFor={`${baseId}-nombre`} className="block text-[15px] mb-2">
              Nombre
            </label>
            <input
              id={`${baseId}-nombre`}
              name="nombre"
              type="text"
              autoComplete="name"
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full rounded-2xl border border-black/10 bg-[#FAFAF7] px-3 py-3"
              placeholder="Tu nombre"
            />
          </div>
          <div>
            <label htmlFor={`${baseId}-contacto`} className="block text-[15px] mb-2">
              WhatsApp o correo
            </label>
            <input
              id={`${baseId}-contacto`}
              name="contacto"
              type="text"
              inputMode="email"
              autoComplete="email"
              required
              value={contacto}
              onChange={(e) => setContacto(e.target.value)}
              aria-describedby={`${baseId}-contacto-ayuda`}
              className="w-full rounded-2xl border border-black/10 bg-[#FAFAF7] px-3 py-3"
              placeholder="55 0000 0000 o tu@correo.com"
            />
            <p id={`${baseId}-contacto-ayuda`} className="text-sm text-[#9B9BA3] mt-1.5">
              Solo lo usamos para enviarte la cotización.
            </p>
          </div>
          <div>
            <label htmlFor={`${baseId}-detalle`} className="block text-[15px] mb-2">
              ¿Algo que debamos saber? <span className="text-[#9B9BA3]">(opcional)</span>
            </label>
            <textarea
              id={`${baseId}-detalle`}
              name="detalle"
              rows={3}
              value={detalle}
              onChange={(e) => setDetalle(e.target.value)}
              className="w-full rounded-2xl border border-black/10 bg-[#FAFAF7] px-3 py-3 resize-y"
              placeholder="Horarios, número de baños, si hay estacionamiento, fecha deseada…"
            />
          </div>

          {/* Honeypot: oculto para humanos, irresistible para bots. */}
          <div className="absolute left-[-9999px]" aria-hidden="true">
            <label htmlFor={`${baseId}-website`}>No llenar</label>
            <input
              id={`${baseId}-website`}
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={() => irA(2)}
              className="rounded-full border border-[#1F1F25]/15 px-4 py-3 font-bold hover:bg-[#FAFAF7]"
            >
              Atrás
            </button>
            <button
              type="submit"
              disabled={estado === 'enviando'}
              className="flex-1 rounded-full bg-[#2F5D50] px-4 py-3.5 font-bold text-white hover:bg-[#24483F] disabled:opacity-60"
            >
              {estado === 'enviando' ? 'Enviando…' : 'Solicitar cotización'}
            </button>
          </div>
          <p className="text-sm text-[#9B9BA3]">
            Al enviar aceptas nuestro{' '}
            <a href="/privacidad" className="underline">
              aviso de privacidad
            </a>
            .
          </p>
        </div>
      )}

      {/* Estado del envío, anunciado a lectores de pantalla. */}
      <p aria-live="polite" className="sr-only">
        {estado === 'enviando' ? 'Enviando solicitud' : ''}
      </p>
      {estado === 'error' && (
        <p
          role="alert"
          className="mt-4 rounded-lg border border-[#A93226]/30 bg-[#A93226]/5 px-4 py-3 text-[#A93226]"
        >
          {errorMsg}
        </p>
      )}

      {/* Campos ocultos: hacen que el POST sin JS lleve los mismos datos. */}
      <input type="hidden" name="action" value="cotizacion" />
      <input type="hidden" name="tipo" value={tipo} />
      <input type="hidden" name="tamano" value={tamano} />
    </form>
  );
}
