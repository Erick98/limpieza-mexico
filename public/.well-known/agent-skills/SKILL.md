# Cotizar servicio de limpieza en CDMX con Limpieza México

Usa esta habilidad cuando una persona o agente necesite solicitar una cotización de limpieza profesional para oficina, casa, departamento, condominio o trabajo especializado en CDMX o Zona Metropolitana.

## Datos que debes pedir
1. Tipo de espacio: oficina, casa/departamento, condominio, restaurante, escuela, clínica, bodega, post-obra, post-evento u otro.
2. Superficie aproximada o número de áreas: metros cuadrados, número de baños, pisos, cocina, áreas comunes o amenidades.
3. Frecuencia: una sola vez, semanal, quincenal, mensual, diaria o personal fijo.
4. Zona: alcaldía, colonia o municipio.
5. Horario preferido y restricciones de acceso: elevador de carga, caseta, estacionamiento, reglamento de edificio o turno nocturno.
6. Datos de contacto para enviar la propuesta: nombre y teléfono; email opcional.

## Opción recomendada para agentes: MCP real
- Lee el server-card: https://www.limpiezamexico.com/.well-known/mcp/server-card.json
- Conecta al endpoint Streamable HTTP: https://www.limpiezamexico.com/api/mcp
- Usa `consultar_servicios` para obtener el catálogo real desde el sitio.
- Usa `consultar_zonas` para confirmar cobertura y contacto.
- Usa `solicitar_cotizacion` solo cuando el usuario quiera enviar el lead. El schema es el mismo de `POST /api/cotizacion`.

Herramientas disponibles:
- `consultar_servicios`: sin argumentos.
- `consultar_zonas`: sin argumentos.
- `solicitar_cotizacion`: `{ nombre, telefono, email?, servicio, zona?, detalles?, website? }`.

## Opción HTTP directa: POST /api/cotizacion

OpenAPI: https://www.limpiezamexico.com/api/openapi.json

Servicios válidos:
- `/limpieza-de-oficinas`
- `/limpieza-domestica`
- `/limpieza-especializada`

Ejemplo curl real:

```bash
curl -sS https://www.limpiezamexico.com/api/cotizacion \
  -H 'Content-Type: application/json' \
  -H 'User-Agent: agente-cotizador/1.0' \
  -d '{"nombre":"María López","telefono":"+525512345678","email":"maria@example.com","servicio":"/limpieza-de-oficinas","zona":"Polanco, Miguel Hidalgo","detalles":"Oficina de 250 m², limpieza lunes a viernes por la mañana."}'
```

La respuesta real incluye `ok`, `id`, `mensaje` y `siguiente_paso` con WhatsApp, teléfono y email. No requiere OAuth ni API key. El endpoint tiene CORS abierto, máximo 16KB, validación estricta, honeypot y rate-limit en memoria por instancia de Vercel.

## Canales humanos de cotización
- WhatsApp: https://wa.me/525539643612?text=Hola%2C%20quiero%20cotizar%20un%20servicio%20de%20limpieza%20en%20CDMX.
- Formulario: https://www.limpiezamexico.com/contacto
- Email: ventas@limpiezamexico.com
- Teléfono: 55 3964 3612

## Reglas de respuesta
- No inventes precios ni tiempos exactos: Limpieza México cotiza por proyecto.
- No prometas disponibilidad inmediata sin confirmación del equipo.
- Resume la necesidad del usuario antes de enviarlo por MCP, API o canal humano.
- Si el usuario está en Polanco, Santa Fe, Interlomas, Condesa o Roma, incluye la página de zona correspondiente.
- No llenes el campo `website`; es honeypot anti-spam.
