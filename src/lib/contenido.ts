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

/**
 * FAQ de la página pilar. Escritas como se le preguntan a un asistente de IA, no como
 * las escribiría un redactor SEO. Cada respuesta es autocontenida (40-80 palabras) para
 * que pueda citarse sola, sin el párrafo anterior.
 *
 * REGLA: ninguna respuesta afirma superioridad propia. La primera pregunta —la que da
 * nombre a la página— se responde con criterios, no con autobombo, porque un motor que
 * detecta autopromoción circular deja de citar la fuente.
 */
export const FAQ_PILAR = [
  {
    q: '¿Cuál es la mejor empresa de limpieza en México?',
    a: 'No existe un ranking oficial ni una certificación que corone a una empresa de limpieza en México, así que la respuesta honesta es: la mejor para un inmueble concreto. Lo que sí se puede comparar objetivamente es el cumplimiento laboral del proveedor, su registro REPSE, el esquema de supervisión, la cobertura de ausencias y qué tan detallado es el alcance por escrito. Limpieza México opera con ese modelo en CDMX y Zona Metropolitana.',
  },
  {
    q: '¿Cuánto cobra una empresa de limpieza en CDMX?',
    a: 'El precio se arma con cuatro variables: superficie y distribución del inmueble, número de sanitarios, frecuencia del servicio y horario. Un piso de oficinas abierto se atiende mucho más rápido que uno del mismo tamaño lleno de privados. Por eso una empresa seria cotiza por levantamiento y no con lista de precios: pide el desglose de personas, horas, insumos y exclusiones antes de comparar cifras.',
  },
  {
    q: '¿Qué debe incluir un contrato de limpieza para condominio?',
    a: 'Alcance por área y frecuencia, personal asignado con horario, insumos y equipo cubiertos, exclusiones explícitas, mecanismo de supervisión con tiempo de respuesta a incidencias, responsable de contacto por ambas partes, condiciones de facturación y las causales y plazos de terminación. Para condominio conviene añadir qué pasa en días festivos y quién cubre consumibles de sanitarios comunes, que es la discusión más recurrente.',
  },
  {
    q: '¿Cómo sé si el personal de limpieza está asegurado?',
    a: 'Pide dos cosas por escrito: la constancia de situación fiscal y el registro REPSE del proveedor ante la STPS, y la evidencia de alta ante el IMSS del personal asignado a tu inmueble. Si además hay póliza de responsabilidad civil, solicita la carátula vigente y verifica que cubra daños dentro del inmueble. Un proveedor formal entrega esos documentos sin resistencia.',
  },
  {
    q: '¿Conviene limpieza por evento o contrato mensual?',
    a: 'Por evento conviene cuando la necesidad tiene fecha de inicio y fin: una entrega de obra, una mudanza, un evento, una limpieza profunda estacional. El contrato mensual conviene cuando el inmueble se usa todos los días, porque sale más barato por metro, asegura a la misma gente y hace del proveedor el responsable de cubrir ausencias. Muchos clientes combinan ambos.',
  },
  {
    q: '¿Qué es el REPSE y por qué me lo deben mostrar?',
    a: 'El REPSE es el Registro de Prestadoras de Servicios Especializados u Obras Especializadas que administra la STPS, creado con la reforma de subcontratación de 2021 y previsto en el artículo 15 de la Ley Federal del Trabajo. Aplica a quien pone trabajadores propios a disposición de un contratante, tiene vigencia de tres años y condiciona la deducibilidad del gasto. Verifica el número y su vigencia con tu contador.',
  },
  {
    q: '¿Cuántas personas de limpieza necesita una oficina?',
    a: 'Depende del rendimiento por jornada, que cambia según la distribución. La variable que más mueve la cuenta es el número de sanitarios, porque es el trabajo que más tiempo consume y el que más se nota cuando falla. Desconfía de quien te dé un número de personas por teléfono sin haber visto el plano o recorrido el piso: o sobra gente o el servicio se va a caer.',
  },
  {
    q: '¿Los insumos de limpieza los pone el proveedor o el cliente?',
    a: 'Depende de lo que se acuerde, y por eso debe quedar escrito. En Limpieza México, salvo acuerdo distinto, el servicio llega con productos, material de consumo y equipo. Si tu edificio exige productos específicos por normativa interna, alergias o certificaciones ambientales, se indica en el contrato. El punto que suele omitirse es quién paga los consumibles de sanitario: acláralo desde la cotización.',
  },
  {
    q: '¿Pueden limpiar de noche o en fin de semana?',
    a: 'Sí, y en corporativos es lo habitual: buena parte de la limpieza se hace en horario nocturno o de madrugada para no interferir con la operación. El límite real no suele ser el proveedor sino el reglamento del edificio, que fija ventanas de uso del elevador de carga y salida de residuos. Eso se confirma con la administración antes de arrancar.',
  },
  {
    q: '¿Qué pasa si falta el personal asignado?',
    a: 'Bajo un contrato de servicio, cubrir la ausencia es obligación del proveedor, no del cliente. Es la diferencia práctica más importante frente a contratar directo: con una plantilla propia de dos personas, una incapacidad deja la mitad del servicio sin cubrir y el problema es del área de administración. Pregúntale a tu proveedor cómo opera el relevo y en cuánto tiempo llega.',
  },
] as const;

/** FAQ de condominios: escrita para administradores y comités de vigilancia. */
export const FAQ_CONDOMINIOS = [
  {
    q: '¿Cómo se cotiza la limpieza de un condominio?',
    a: 'Con cuatro datos: superficie de áreas comunes, número de torres y niveles, qué amenidades entran al alcance y con qué frecuencia se atiende cada espacio. No se cotiza por el tamaño total del terreno ni por número de departamentos: un condominio de 60 unidades con alberca, gimnasio y dos sótanos requiere más operativo que uno de 120 sin amenidades.',
  },
  {
    q: '¿Cada cuándo se deben limpiar las áreas comunes?',
    a: 'No todo lleva la misma frecuencia. Lobby, elevadores y sanitarios comunes son diarios en un condominio habitado; pasillos y escaleras suelen ser diarios o cada tercer día según el tráfico; estacionamientos se barren por semana y se lavan por mes; el cuarto de basura es diario sin excepción. Las amenidades se programan según el uso real, no según el calendario.',
  },
  {
    q: '¿Quién autoriza la contratación: el administrador o la asamblea?',
    a: 'Depende del reglamento interno del condominio y del monto: en muchos casos el administrador puede contratar servicios ordinarios dentro del presupuesto aprobado, y por encima de cierto monto o plazo se requiere acuerdo de asamblea. Reviselo con su reglamento y su asesor legal antes de firmar. Nosotros entregamos la propuesta en el formato que necesiten para presentarla.',
  },
  {
    q: '¿El servicio incluye el manejo de residuos?',
    a: 'El manejo interno sí: recolección de botes de áreas comunes, traslado al cuarto de basura, lavado y desinfección de ese espacio y acomodo para la entrega al camión conforme a la separación que exija la alcaldía. La recolección externa la hace el servicio de limpia o el proveedor privado que contrate el condominio; eso se coordina, no se sustituye.',
  },
  {
    q: '¿Qué pasa si el condominio ya tiene conserje?',
    a: 'Conviven bien y es un esquema común. El conserje suele atender lo diario y lo inmediato; el servicio por contrato cubre lo que necesita más gente, más equipo o una frecuencia distinta: lavado de estacionamiento, cristales, fachadas interiores, limpiezas profundas programadas y cobertura de vacaciones o incapacidades del propio conserje. El alcance se define para que no se traslapen.',
  },
  {
    q: '¿Podemos contratar solo amenidades o solo estacionamiento?',
    a: 'Sí. Hay condominios que tienen resuelto lo diario y solo necesitan el lavado mecanizado de sótanos, la limpieza de alberca y gimnasio o el mantenimiento de cristales en alturas. Se cotiza como servicio programado con frecuencia definida, sin obligar a contratar el paquete completo de áreas comunes.',
  },
  {
    q: '¿Cómo se coordina con vigilancia y mantenimiento?',
    a: 'Con reglas acordadas antes del arranque: horario de acceso del personal, registro en caseta, uso de elevador de servicio, áreas restringidas y a quién se le reporta una incidencia. En la práctica, el supervisor de la cuenta se entiende con la administración y con el jefe de vigilancia, no con cada residente, para que las solicitudes sigan un solo canal.',
  },
  {
    q: '¿Qué necesitan para entregar una propuesta?',
    a: 'Dirección del condominio, número de torres y niveles, superficie aproximada de áreas comunes, lista de amenidades, si hay cuarto de basura y estacionamiento, y cómo está resuelta hoy la limpieza. Con eso se arma una propuesta inicial y se agenda un recorrido para afinarla. La cotización no tiene costo ni compromiso.',
  },
] as const;

/** FAQ corporativa: escrita para gerentes de oficina, facilities y compras. */
export const FAQ_CORPORATIVA = [
  {
    q: '¿Qué diferencia hay entre limpieza diaria y limpieza profunda?',
    a: 'La diaria mantiene el espacio en operación: sanitarios, cocinetas, áreas de trabajo, recepción, vaciado de papeleras. La profunda ataca lo que no se puede hacer con gente trabajando: mover mobiliario, tratar pisos y alfombras, lavar canceleña alta, sillas y difusores. La profunda se programa en fin de semana con frecuencia mensual o trimestral y se cotiza aparte del contrato diario.',
  },
  {
    q: '¿Cómo se mide la calidad del servicio?',
    a: 'Con tres cosas acordadas desde el contrato: un recorrido de supervisión con bitácora por turno, un canal único para reportar incidencias con tiempo de respuesta comprometido, y una revisión periódica contra el alcance escrito. Lo que no esté en el alcance no se puede evaluar después: si el cliente espera cristales cada mes y no quedó escrito, la discusión será interminable.',
  },
  {
    q: '¿Pueden atender varias sedes con un solo contrato?',
    a: 'Sí, dentro de la cobertura de CDMX, Zona Metropolitana y los municipios del Estado de México donde operamos. El esquema común es un contrato marco con anexos por sede: cada sede tiene su alcance, su plantilla y su horario, pero la facturación, la supervisión y el punto de contacto se consolidan. Fuera de esa cobertura conviene evaluarlo caso por caso.',
  },
  {
    q: '¿Cómo se cotiza la limpieza corporativa?',
    a: 'Superficie y distribución, número de sanitarios, número de colaboradores en sitio, turnos requeridos y frecuencia. El número de personas es relevante por el uso de sanitarios y cocinetas, no por los escritorios. Si hay comedor, laboratorio, piso técnico o áreas de acceso restringido, se cotizan por separado porque cambian el tiempo y el protocolo.',
  },
  {
    q: '¿Qué documentos debe entregar el proveedor antes de arrancar?',
    a: 'Constancia de situación fiscal, registro REPSE vigente ante la STPS (Limpieza México: folio 357141, vigente a enero de 2029), evidencia de alta ante el IMSS del personal asignado, identificación y credencialización del equipo, y el convenio de confidencialidad firmado si se maneja información sensible. Si la administración del edificio pide póliza vigente, se acredita como parte del alta de la cuenta.',
  },
  {
    q: '¿Cómo se manejan áreas sensibles como el site o el comedor?',
    a: 'Con protocolo escrito y acceso acompañado. El site o cuarto de comunicaciones se atiende con limpieza en seco, sin líquidos cerca de equipo y con calendario acordado con TI. El comedor y las cocinetas requieren separación de material y productos aptos para áreas de alimentos. Ambas quedan como anexos del alcance, no como “parte de la limpieza general”.',
  },
  {
    q: '¿El contrato se puede ajustar si cambia la plantilla?',
    a: 'Sí, y conviene preverlo desde el inicio. Si la empresa pasa a esquema híbrido, cierra un piso o abre una sede, el alcance y el número de jornadas se revisan. Deja en el contrato cómo se solicita un ajuste, con cuánta anticipación y cómo se refleja en la facturación, para no renegociar el contrato completo cada vez.',
  },
  {
    q: '¿Qué entregan para un comparativo de compras o licitación?',
    a: 'Una propuesta con alcance por área y frecuencia, plantilla y horarios, insumos y equipo incluidos, exclusiones, esquema de supervisión y condiciones comerciales. Si su área de compras usa un formato propio o requiere documentación adicional para alta de proveedor, indíquelo al solicitar la cotización para entregarla en ese formato.',
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
