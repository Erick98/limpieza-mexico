/**
 * Contenido editorial y FAQs reutilizables.
 *
 * REGLA: nada de cifras inventadas. No hay "1,500 clientes", ni "5,000 proyectos",
 * ni precios. Donde el usuario espera un precio, se explica CÓMO se cotiza —eso
 * responde la intención de búsqueda sin mentir— y se marca PENDIENTE_ERICK para
 * cuando existan rangos reales autorizados.
 */

/** FAQs generales. Alimentan /preguntas-frecuentes y el FAQPage del home. */
export const FAQ_GENERAL = [
  {
    q: '¿Cuánto cuesta un servicio de limpieza en CDMX?',
    a: 'El precio depende de tres cosas: la superficie a atender, la frecuencia del servicio y el tipo de trabajo. No es lo mismo una limpieza profunda de una sola vez que personal fijo de lunes a viernes. Por eso cotizamos por proyecto y no con una lista de precios genérica: enviamos una propuesta con el número de personas, las horas y los insumos que realmente requiere tu espacio. La cotización no tiene costo ni compromiso.',
  },
  {
    q: '¿Cómo se calcula la cotización?',
    a: 'Partimos de los metros cuadrados y del tipo de inmueble para estimar el rendimiento por persona y por jornada. A eso se suman los insumos, el equipo especializado que haga falta (por ejemplo, pulidoras o equipo para trabajo en alturas), la frecuencia y el horario. Si el servicio es nocturno o en fin de semana, se ajusta. Te entregamos el desglose para que sepas exactamente qué estás pagando.',
  },
  {
    q: '¿Emiten factura?',
    a: 'Sí. Facturamos con CFDI vigente ante el SAT. Al contratar solicitamos tus datos fiscales y la factura se emite conforme a la periodicidad acordada en el contrato de servicio.',
  },
  {
    q: '¿El personal está asegurado y verificado?',
    a: 'El personal que asignamos trabaja bajo relación laboral formal, con alta ante el IMSS y sus prestaciones de ley. Aplicamos verificación de antecedentes y referencias antes de asignar a alguien a un inmueble. Esa es justamente la diferencia frente a contratar por cuenta propia: la responsabilidad laboral y la verificación las asume la empresa, no el cliente.',
  },
  {
    q: '¿Qué zonas cubren?',
    a: 'Operamos en las 16 alcaldías de la Ciudad de México y en la Zona Metropolitana del Valle de México, incluidos municipios del Estado de México como Naucalpan, Huixquilucan, Tlalnepantla, Ecatepec y Cuautitlán. Si tu inmueble está fuera de esa cobertura, escríbenos: dependiendo del tamaño del proyecto podemos evaluarlo.',
  },
  {
    q: '¿Cuánto tardan en responder una solicitud de cotización?',
    a: 'Un asesor revisa cada solicitud que entra por el formulario y responde con la propuesta o con las preguntas que falten para armarla. Si tu necesidad es urgente, indícalo en el campo de detalles del formulario para darle prioridad.',
  },
  {
    q: '¿Los insumos y el equipo están incluidos?',
    a: 'Salvo que acordemos lo contrario, sí: llegamos con los productos de limpieza, el material de consumo y el equipo necesario para el servicio. Si prefieres que usemos productos específicos —por normativa interna, por alergias o por certificaciones de tu edificio— lo indicamos en el contrato y trabajamos con esos.',
  },
  {
    q: '¿Puedo contratar solo una vez o tiene que ser recurrente?',
    a: 'Las dos modalidades existen. Hay clientes que nos contratan una limpieza profunda única (una mudanza, una entrega de obra, un evento) y otros que requieren personal recurrente. En el formulario de cotización puedes indicar "una sola vez" y la propuesta se arma para eso.',
  },
] as const;

/** Preguntas específicas de contratación corporativa. */
export const FAQ_OFICINAS = [
  {
    q: '¿Pueden dar servicio fuera del horario de oficina?',
    a: 'Sí. Una parte importante de la limpieza corporativa se hace en horario nocturno o de madrugada, precisamente para no interferir con la operación. Coordinamos accesos con la administración del edificio y con seguridad, y ajustamos el operativo al reglamento interno del inmueble.',
  },
  {
    q: '¿Qué pasa si falta una persona del equipo asignado?',
    a: 'La cobertura de ausencias es responsabilidad nuestra, no tuya. Mantenemos personal de relevo para que el servicio no se caiga por una incapacidad o una falta. Ese es uno de los motivos principales por los que una empresa terceriza la limpieza en lugar de contratar directo.',
  },
  {
    q: '¿Firman convenio de confidencialidad?',
    a: 'Sí. Para oficinas corporativas, despachos y espacios donde se maneja información sensible, firmamos acuerdos de confidencialidad con la empresa y hacemos que el personal asignado los suscriba.',
  },
  {
    q: '¿Cómo se supervisa la calidad del servicio?',
    a: 'Cada cuenta tiene un supervisor responsable que hace recorridos y levanta la bitácora del servicio. Se acuerda contigo un canal directo para reportar incidencias y un tiempo de respuesta para atenderlas. Si algo no se hizo como se acordó, se corrige.',
  },
] as const;

export const FAQ_DOMESTICA = [
  {
    q: '¿Puedo pedir a la misma persona cada semana?',
    a: 'Sí, y es lo que recomendamos para servicios recurrentes: que sea la misma persona quien atienda tu casa. Ya conoce el inmueble, tus preferencias y dónde está cada cosa, y eso mejora el resultado.',
  },
  {
    q: '¿Qué diferencia hay entre contratar por servicio y reclutar personal de planta?',
    a: 'En el servicio por visita, nosotros somos el patrón: nosotros contratamos, damos de alta y respondemos. En el reclutamiento de personal de planta, te presentamos candidatos verificados para que tú contrates directamente, y la relación laboral queda entre tú y esa persona. Cuál conviene depende de cuántas horas a la semana necesitas y de si quieres asumir la administración laboral.',
  },
  {
    q: '¿Verifican antecedentes del personal doméstico?',
    a: 'Sí. Validamos identidad, domicilio y referencias laborales antes de presentar a cualquier candidato o de asignar a alguien a un domicilio. Es el punto más sensible del servicio doméstico y no lo saltamos.',
  },
] as const;
