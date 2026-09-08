/**
 * Contenido de las páginas de zona.
 *
 * REGLA ANTI-THIN-CONTENT: cada zona tiene texto propio, escrito para esa zona,
 * hablando de cosas que sólo aplican ahí (tipo de inmueble, reglamentos de edificio,
 * horarios de acceso, problemática real de la colonia). Si una zona no puede llenarse
 * con contenido diferenciado, NO se crea la página: cuatro páginas buenas posicionan;
 * dieciséis páginas plantilla con el nombre cambiado son thin content y penalizan.
 *
 * Por eso hay 4 zonas y no 16. Ampliar sólo cuando haya información real que aportar.
 */

export type Zona = {
  slug: string;
  nombre: string;
  titulo: string;
  descripcion: string;
  alcaldia: string;
  intro: string;
  parrafos: { h: string; p: string[] }[];
  colonias: string[];
  faqs: { q: string; a: string }[];
};

export const ZONAS_CONTENIDO: Record<string, Zona> = {
  polanco: {
    slug: 'polanco',
    nombre: 'Polanco',
    alcaldia: 'Miguel Hidalgo',
    titulo: 'Servicio de limpieza en Polanco',
    descripcion:
      'Servicio de limpieza en Polanco para oficinas, residencias y locales. Personal formal, horario nocturno y gestión de accesos. Cotiza sin costo.',
    intro:
      'Nuestras oficinas están en Sófocles 133, en Polanco. Es la zona que atendemos con mayor densidad y donde tenemos el tiempo de respuesta más corto de toda la ciudad.',
    parrafos: [
      {
        h: 'Cómo es operar limpieza en Polanco',
        p: [
          'Polanco concentra dos realidades muy distintas en pocas cuadras. Sobre Ejército Nacional, Moliere y Campos Elíseos hay corporativos de oficinas con administración profesional de inmueble, mientras que en las calles de los poetas y los filósofos predomina la vivienda —desde casonas hasta departamentos en edificios chicos— y locales de calle. El operativo de limpieza no se parece en nada entre uno y otro, aunque estén a tres cuadras.',
          'En los corporativos, el filtro real es la administración del edificio. Piden credencialización del personal, póliza vigente, alta ante el IMSS comprobable, y asignan ventanas específicas para el uso del elevador de carga y la salida de residuos. No es raro que un proveedor nuevo pierda su primer día completo atorado en ese trámite. Nosotros lo resolvemos antes del arranque como parte del alta de la cuenta, no cuando el equipo ya está parado en el lobby.',
          'En la parte residencial el problema es otro: el estacionamiento. Cargar y descargar equipo en las calles interiores de Polanco a media mañana es complicado, y en las horas de mayor movimiento simplemente no se puede. Por eso los servicios domésticos y las limpiezas profundas en la zona se programan temprano o en horarios valle.',
        ],
      },
      {
        h: 'Qué se pide más en la zona',
        p: [
          'En oficinas, personal de planta durante el horario de operación para mantener sanitarios y áreas comunes, más limpieza profunda mensual en fin de semana. En restaurantes de la zona —que hay muchísimos— desengrase de cocina, campanas y trampas de grasa, casi siempre de madrugada. En residencias, servicio recurrente una o dos veces por semana, y limpiezas profundas de entrega cuando se renta o se vende un departamento.',
          'También hay una demanda constante de limpieza de vidrio y cancelería. Los edificios de la zona tienen mucha superficie acristalada y en temporada seca el polvo se nota de inmediato en las fachadas y en los interiores.',
        ],
      },
      {
        h: 'Tiempos de respuesta',
        p: [
          'Al estar basados en Polanco, es la zona donde podemos hacer una visita de levantamiento con más rapidez y donde es más viable atender un requerimiento urgente. Si necesitas una limpieza de emergencia —una fuga, un evento que se adelantó, una entrega de inmueble— indícalo en el campo de detalles del formulario.',
        ],
      },
    ],
    colonias: [
      'Polanco I, II, III, IV y V Sección',
      'Bosques de Chapultepec',
      'Granada',
      'Ampliación Granada',
      'Anzures',
      'Lomas de Chapultepec (colindante)',
    ],
    faqs: [
      {
        q: '¿Atienden edificios corporativos en Polanco con reglamento de acceso?',
        a: 'Sí, es lo habitual en la zona. Gestionamos la credencialización del personal, entregamos la documentación que pida la administración del inmueble (altas ante el IMSS, póliza, identificaciones) y nos ajustamos a las ventanas de elevador de carga y salida de residuos que marque el reglamento interno.',
      },
      {
        q: '¿Pueden dar servicio de madrugada en restaurantes de Polanco?',
        a: 'Sí. El desengrase de cocina y la limpieza profunda en restaurantes se programan casi siempre después del cierre, entre la madrugada y la mañana temprano, para entregar el local listo antes de la apertura.',
      },
      {
        q: '¿Cuál es su tiempo de respuesta en Polanco?',
        a: 'Es la zona con el tiempo más corto porque nuestras oficinas están en Sófocles 133, dentro de la colonia Granada. Podemos agendar visitas de levantamiento con mayor rapidez que en el resto de la ciudad.',
      },
    ],
  },

  'santa-fe': {
    slug: 'santa-fe',
    nombre: 'Santa Fe',
    alcaldia: 'Álvaro Obregón / Cuajimalpa',
    titulo: 'Servicio de limpieza en Santa Fe',
    descripcion:
      'Servicio de limpieza en Santa Fe para torres corporativas, oficinas y departamentos. Personal formal, turno nocturno y coordinación con administración.',
    intro:
      'Santa Fe es territorio de torre corporativa y vivienda vertical. Casi todo el servicio en la zona se organiza alrededor de dos cosas: el reglamento del edificio y el tráfico de entrada y salida.',
    parrafos: [
      {
        h: 'La torre manda',
        p: [
          'En Santa Fe casi nada está a nivel de calle. Trabajar aquí significa trabajar dentro de torres con administración formal, control de acceso estricto, elevadores de carga con horario asignado y rutas de residuos definidas. Es probablemente la zona de la ciudad con los requisitos administrativos más rígidos para un proveedor: se pide expediente completo del personal, seguro de responsabilidad civil, y en varios edificios se exige que el equipo entre y salga por accesos específicos.',
          'Eso tiene una consecuencia práctica en el costo: el tiempo muerto. Si el elevador de carga solo está disponible en dos ventanas del día, el operativo tiene que planearse alrededor de esas ventanas o se pierden horas. Al cotizar en Santa Fe consideramos ese factor explícitamente, en vez de descubrirlo en la primera semana de servicio.',
        ],
      },
      {
        h: 'El tráfico define el horario, no al revés',
        p: [
          'Entrar y salir de Santa Fe en hora pico puede tomar más de una hora, y eso afecta directamente la puntualidad del personal. Por eso los turnos en la zona se arman desplazados: el personal llega temprano, antes del congestionamiento, o entra en turno nocturno. Un proveedor que promete personal a las 9:00 en Santa Fe sin haber pensado en eso, llega tarde el primer lunes y todos los lunes siguientes.',
          'Para limpiezas profundas y trabajos especializados, el fin de semana es casi siempre la mejor opción: los accesos están más libres, el edificio está vacío y se puede trabajar pisos y áreas comunes sin interferir con nadie.',
        ],
      },
      {
        h: 'Qué se pide más',
        p: [
          'En corporativos: personal de planta en horario de operación, mantenimiento de sanitarios de alto tráfico y salas de junta, y limpieza profunda programada. En residencial vertical: áreas comunes, lobby, amenidades, estacionamientos y escaleras de emergencia por contrato con la administración del condominio. Y en ambos casos, tratamiento de pisos —hay mucha superficie de mármol y porcelanato— y limpieza de vidrio interior.',
          'Santa Fe también genera bastante demanda de limpieza post-obra: es una zona en obra permanente, entre remodelaciones de oficinas que cambian de inquilino y entregas de departamento nuevo.',
        ],
      },
    ],
    colonias: [
      'Santa Fe',
      'Peña Blanca Santa Fe',
      'Zedec Santa Fe',
      'La Loma / Contadero (colindante)',
      'Lomas de Santa Fe',
      'Cuajimalpa centro (colindante)',
    ],
    faqs: [
      {
        q: '¿Cumplen los requisitos de acceso de las torres de Santa Fe?',
        a: 'Sí. Entregamos expediente del personal, comprobantes de alta ante el IMSS, identificaciones y la documentación de seguro que pida la administración. Nos ajustamos a los horarios asignados de elevador de carga y a las rutas de residuos del inmueble.',
      },
      {
        q: '¿Cómo garantizan puntualidad con el tráfico de la zona?',
        a: 'Armando los turnos desplazados respecto de la hora pico: el personal entra antes del congestionamiento o en turno nocturno. Es la única forma realista de sostener puntualidad en Santa Fe y lo consideramos desde la cotización, no después.',
      },
      {
        q: '¿Atienden condominios residenciales además de oficinas?',
        a: 'Sí. En vivienda vertical trabajamos por contrato con la administración del condominio: lobby, pasillos, amenidades, estacionamientos, escaleras de emergencia y manejo de residuos.',
      },
    ],
  },

  interlomas: {
    slug: 'interlomas',
    nombre: 'Interlomas',
    alcaldia: 'Huixquilucan, Estado de México',
    titulo: 'Servicio de limpieza en Interlomas',
    descripcion:
      'Servicio de limpieza en Interlomas y Huixquilucan para residencias, condominios y oficinas. Personal verificado y servicio recurrente. Cotiza sin costo.',
    intro:
      'Interlomas pertenece a Huixquilucan, Estado de México, no a la CDMX. Eso importa más de lo que parece: cambia la logística, los accesos y hasta el tipo de servicio que se pide.',
    parrafos: [
      {
        h: 'Zona residencial con lógica propia',
        p: [
          'A diferencia de Polanco o Santa Fe, en Interlomas domina la vivienda: fraccionamientos con caseta, condominios horizontales y verticales, y casas de superficie considerable. El servicio estrella aquí no es la limpieza corporativa sino la doméstica recurrente y el reclutamiento de personal de planta, porque muchas casas requieren a alguien varios días a la semana o de tiempo completo.',
          'La caseta de acceso es la primera variable operativa. Los fraccionamientos exigen registro previo del personal, y en varios de ellos hay que dar aviso con anticipación para que dejen pasar a alguien nuevo. Cuando el servicio es recurrente y va siempre la misma persona, el trámite se hace una vez; cuando el proveedor manda gente distinta cada semana, se convierte en fricción semanal para el cliente. Es una de las razones por las que en esta zona insistimos en asignar personal fijo.',
        ],
      },
      {
        h: 'Distancias reales, no distancias de mapa',
        p: [
          'Interlomas se ve cerca de Santa Fe en el mapa, pero la conexión por Vasco de Quiroga y la salida hacia Palo Solo pueden ser lentas. Para el personal que vive en otras zonas, el traslado es largo, y eso hace que la rotación sea el enemigo número uno del servicio en esta zona. Trabajamos con personal que ya conoce la ruta y para quien el traslado es sostenible; suena menor, pero es lo que determina si el servicio aguanta seis meses o se cae al segundo.',
        ],
      },
      {
        h: 'Qué se pide más en Interlomas',
        p: [
          'Limpieza doméstica recurrente, una o dos veces por semana, es lo más solicitado. Después, reclutamiento de personal de hogar para contratación directa. En condominios, mantenimiento de áreas comunes y amenidades por contrato con la administración. Y de forma estacional, limpiezas profundas: entregas de casa, post-remodelación y puesta a punto antes de eventos familiares, que en esta zona son frecuentes.',
          'También hay demanda de servicios especializados que aquí se piden más que en otras zonas: lavado de cisternas en condominios, limpieza de tapicería y alfombra, y mantenimiento de áreas exteriores y terrazas.',
        ],
      },
    ],
    colonias: [
      'Interlomas',
      'Bosque Real',
      'Lomas Anáhuac',
      'Jesús del Monte',
      'La Herradura (colindante)',
      'Bosques de las Lomas (colindante)',
    ],
    faqs: [
      {
        q: '¿Interlomas está dentro de su cobertura si no es CDMX?',
        a: 'Sí. Interlomas pertenece a Huixquilucan, Estado de México, y forma parte de nuestra cobertura de Zona Metropolitana junto con municipios como Naucalpan y Tlalnepantla. No hay diferencia de servicio por estar fuera de la CDMX.',
      },
      {
        q: '¿Cómo manejan el acceso por caseta en los fraccionamientos?',
        a: 'Registramos al personal con la administración del fraccionamiento antes del primer servicio y procuramos que sea siempre la misma persona la asignada, para que el trámite se haga una vez y no cada semana.',
      },
      {
        q: '¿Puedo contratar personal de planta en lugar de servicio por visita?',
        a: 'Sí. En esta zona es de lo más solicitado. Te presentamos candidatos con identidad, domicilio y referencias verificadas para que contrates directamente, y te explicamos cómo hacer el alta ante el IMSS bajo el régimen de personas trabajadoras del hogar.',
      },
    ],
  },

  'condesa-roma': {
    slug: 'condesa-roma',
    nombre: 'Condesa y Roma',
    alcaldia: 'Cuauhtémoc',
    titulo: 'Servicio de limpieza en Condesa y Roma',
    descripcion:
      'Servicio de limpieza en Condesa y Roma para departamentos, oficinas creativas, locales y restaurantes. Servicio único o recurrente. Cotiza sin costo.',
    intro:
      'Condesa y Roma son las colonias donde más se mezcla vivienda, oficina pequeña y local comercial en el mismo edificio. Eso define completamente cómo se organiza el servicio.',
    parrafos: [
      {
        h: 'Edificio viejo, reglas nuevas',
        p: [
          'Buena parte del parque inmobiliario de la Condesa y la Roma es de principios y mediados del siglo pasado: edificios art déco, casonas divididas en departamentos, inmuebles catalogados. Eso trae particularidades reales. Muchos no tienen elevador, lo que cambia por completo el esfuerzo de subir equipo a un cuarto piso. Los pisos suelen ser de duela, mosaico o pasta, materiales que no se tratan como un porcelanato: la duela se arruina con exceso de agua y el mosaico de pasta pierde el sellador si se usa químico agresivo.',
          'Es el tipo de detalle que distingue a alguien que conoce la zona de alguien que solo llegó a limpiar. Un piso de pasta mal tratado no se recupera con otra limpieza; hay que rehacerlo.',
        ],
      },
      {
        h: 'La calle es el otro reto',
        p: [
          'Estacionarse en Condesa o Roma para cargar y descargar equipo es de las cosas más complicadas de la ciudad, entre parquímetros, tráfico lento y calles arboladas estrechas. Para servicios grandes se coordina el acceso vehicular con anticipación y se prefieren horarios tempranos. Para limpieza recurrente de departamento, el personal llega con lo indispensable y el resto del insumo permanece en el domicilio, que resulta lo más práctico.',
          'El arbolado, que es lo mejor de estas colonias, también genera trabajo constante: hojarasca en patios, azoteas y coladeras, especialmente en temporada de lluvias, cuando una coladera tapada se convierte en una filtración.',
        ],
      },
      {
        h: 'Qué se pide más',
        p: [
          'Limpieza de departamento recurrente y limpiezas profundas de entrega —la zona tiene mucha rotación de inquilinos y bastante operación de renta temporal, donde la limpieza entre estancias tiene que ser rápida y consistente—. También oficinas pequeñas y estudios creativos, que suelen requerir dos o tres visitas por semana en vez de personal de planta.',
          'Y restaurantes: la densidad gastronómica de estas colonias es alta y genera demanda constante de desengrase de cocina, limpieza de trampas de grasa y mantenimiento de terrazas y fachadas, casi siempre en horario de madrugada.',
        ],
      },
    ],
    colonias: [
      'Condesa',
      'Hipódromo y Hipódromo Condesa',
      'Roma Norte',
      'Roma Sur',
      'Juárez (colindante)',
      'Escandón (colindante)',
    ],
    faqs: [
      {
        q: '¿Saben tratar pisos de duela, mosaico o pasta?',
        a: 'Sí, y es importante en estas colonias. La duela no admite exceso de agua y el mosaico de pasta pierde el sellador con químicos agresivos. Usamos el producto y la técnica que corresponde a cada material; un piso antiguo mal tratado no se corrige limpiándolo otra vez.',
      },
      {
        q: '¿Atienden departamentos de renta temporal entre estancias?',
        a: 'Sí. Es un servicio frecuente en la zona: limpieza rápida y consistente entre huéspedes, con revisión de blancos y reposición de consumibles si se acuerda en el alcance. Se cotiza por visita.',
      },
      {
        q: '¿Dan servicio a restaurantes de Condesa y Roma?',
        a: 'Sí. Desengrase de cocina, campanas y trampas de grasa, sanitización de superficies y limpieza de terrazas y fachada. Se programa después del cierre para entregar el local listo antes de la apertura.',
      },
    ],
  },
};

export const ZONA_SLUGS = Object.keys(ZONAS_CONTENIDO);
