export type AnalyticsEvent =
  | 'cotizador_abierto'
  | 'cotizador_paso'
  | 'cotizador_envio_ok'
  | 'cotizador_envio_error'
  | 'click_whatsapp'
  | 'click_telefono';

type AnalyticsParams = Record<string, string | number | boolean | undefined | null>;

const PARAMS_PERMITIDOS: Record<AnalyticsEvent, readonly string[]> = {
  cotizador_abierto: [],
  cotizador_paso: ['paso'],
  cotizador_envio_ok: ['canal', 'tipo', 'zona'],
  cotizador_envio_error: ['codigo'],
  click_whatsapp: ['ubicacion'],
  click_telefono: ['ubicacion'],
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function limpiarParams(evento: AnalyticsEvent, params: AnalyticsParams = {}): AnalyticsParams {
  const permitidos = new Set(PARAMS_PERMITIDOS[evento]);
  return Object.fromEntries(
    Object.entries(params).filter(
      ([key, value]) => permitidos.has(key) && value !== undefined && value !== null && value !== ''
    )
  );
}

export function track(evento: AnalyticsEvent, params: AnalyticsParams = {}) {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag !== 'function') return;
  window.gtag('event', evento, limpiarParams(evento, params));
}

export function trackOnce(key: string, evento: AnalyticsEvent, params: AnalyticsParams = {}) {
  if (typeof window === 'undefined') return;
  const storageKey = `lmx:${key}`;
  try {
    if (window.sessionStorage.getItem(storageKey)) return;
    window.sessionStorage.setItem(storageKey, '1');
  } catch {
    // Si sessionStorage está bloqueado, seguimos midiendo sin romper UX.
  }
  track(evento, params);
}
