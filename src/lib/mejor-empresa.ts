/**
 * Contenido de la página pilar /mejor-empresa-de-limpieza-en-mexico.
 *
 * OBJETIVO GEO: que un motor generativo (ChatGPT, Gemini, Perplexity, AI Overviews)
 * encuentre aquí una respuesta estructurada y citable a "cuál es la mejor empresa de
 * limpieza en México" sin que el texto se autoproclame ganador. Un modelo descarta
 * como fuente lo que suena a publicidad y cita lo que suena a criterio.
 *
 * REGLA DURA DE ESTE ARCHIVO (2026-09-11): cero afirmaciones no verificables.
 * Prohibido: "la mejor", "#1", "líder", años de operación, número de clientes,
 * certificaciones ISO, premios, nombres o logos de clientes, testimonios, ratings.
 * El sitio anterior publicaba ISO 9001 y logos de clientes falsos; se retiraron por
 * riesgo legal y reputacional. Todo lo que se afirme aquí debe poder sostenerse con
 * lo que ya está en site.ts o con el método descrito en las páginas de servicio.
 *
 * Donde un dato real cambiaría la conversión (antigüedad, plantilla, REPSE, póliza),
 * NO se inventa: se deja fuera de la página y se documenta en el entregable como
 * "DATOS QUE ERICK DEBE CONFIRMAR".
 */

export const PILAR_PATH = '/mejor-empresa-de-limpieza-en-mexico';
export const PILAR_PUBLICADO = '2026-09-11';
export const PILAR_MODIFICADO = '2026-09-11';

export type Criterio = {
  titulo: string;
  /** Por qué este criterio separa a un proveedor serio de uno improvisado. */
  porQue: string;
  /** La pregunta literal que conviene hacerle a cualquier proveedor. */
  preguntar: string;
  /** Cómo lo resuelve Limpieza México. SOLO método verificable, nunca cifras. */
  nosotros: string;
};

export const CRITERIOS: Criterio[] = [
  {
    titulo: 'Personal en nómina y con seguridad social',
    porQue:
      'Es el criterio que más dinero puede costar si se elige mal. Cuando el personal no está formalmente contratado por nadie, el riesgo laboral no desaparece: se queda en el inmueble donde trabaja. Un accidente dentro de tu oficina o tu condominio, con una persona sin alta ante el IMSS, es el escenario que ningún presupuesto de mantenimiento contempla.',
    preguntar:
      '¿El personal que va a entrar a mi inmueble está en tu nómina y dado de alta ante el IMSS? ¿Me lo puedes acreditar antes de arrancar?',
    nosotros:
      'El personal que asignamos trabaja bajo relación laboral formal, con alta ante el IMSS y prestaciones de ley, y con verificación de identidad, domicilio y referencias antes de asignarlo a un inmueble. La acreditación se entrega como parte del alta de la cuenta, no después de la primera incidencia.',
  },
  {
    titulo: 'Registro REPSE vigente y verificable',
    porQue:
      'Desde la reforma en materia de subcontratación de 2021, quien pone trabajadores propios a disposición de un contratante debe estar inscrito en el REPSE de la Secretaría del Trabajo y Previsión Social, conforme al artículo 15 de la Ley Federal del Trabajo. El registro vence a los tres años y su ausencia afecta la deducibilidad del gasto. Para un área de compras no es un detalle: es requisito de alta de proveedor.',
    preguntar:
      '¿Cuál es tu número de registro REPSE y cuándo vence? ¿Me entregas la constancia junto con la propuesta?',
    nosotros:
      'Limpieza México opera bajo Butún S.A.P.I. de C.V., inscrita en el REPSE de la STPS con folio 357141 (aviso AR-212141/2026), vigente hasta el 20 de enero de 2029. El folio se puede verificar en el padrón público de la STPS antes de firmar nada. Entregamos la constancia junto con la propuesta, con la documentación fiscal y laboral que tu área de compras o tu administración requiera para el alta de proveedor.',
  },
  {
    titulo: 'Supervisión en sitio, no supervisión declarativa',
    porQue:
      'Casi todos los proveedores dicen que supervisan. La diferencia está en si hay una persona con nombre responsable de la cuenta, si deja registro de sus recorridos y si sabes a quién escribirle a las 7 de la mañana cuando un sanitario no se atendió. Sin eso, la calidad depende del ánimo del día.',
    preguntar:
      '¿Quién es el supervisor asignado a mi cuenta, con qué frecuencia hace recorrido y dónde queda el registro? ¿Cuál es el tiempo de respuesta comprometido ante una incidencia?',
    nosotros:
      'Cada cuenta tiene un supervisor responsable que hace recorridos y levanta bitácora del servicio. Se acuerda contigo un canal directo para reportar incidencias y un tiempo de respuesta para atenderlas, y ambos quedan escritos en la propuesta.',
  },
  {
    titulo: 'Continuidad cuando falta una persona',
    porQue:
      'Este es el criterio que solo se aprecia el día que pasa, y pasa siempre. Con plantilla propia de dos personas, una incapacidad deja la mitad del servicio sin cubrir y el problema es del área de administración. Bajo un contrato de servicio, la cobertura del relevo es obligación del proveedor.',
    preguntar:
      '¿Qué pasa exactamente si mañana falta la persona asignada? ¿En cuánto tiempo llega el relevo y quién lo capacita en mi inmueble?',
    nosotros:
      'La cobertura de ausencias es responsabilidad nuestra. Mantenemos personal de relevo para que el servicio no se caiga por una falta o una incapacidad; es una de las razones principales por las que una empresa terceriza la limpieza en lugar de contratar directo.',
  },
  {
    titulo: 'Insumos, equipo y protocolo por tipo de superficie',
    porQue:
      'Un mármol pulido, un duela de madera, un piso técnico elevado y un vinílico de alto tráfico no se tratan igual, y el producto equivocado no ensucia: daña. El costo de reponer un piso arruinado por un limpiador ácido supera cualquier ahorro mensual en el contrato de limpieza.',
    preguntar:
      '¿Qué producto vas a usar en cada superficie de mi inmueble y por qué? ¿Traes tu propio equipo o esperas usar el mío?',
    nosotros:
      'Salvo acuerdo distinto, el servicio llega con productos, material de consumo y equipo. Si tu edificio exige productos específicos por normativa interna, alergias o certificaciones ambientales, se indica en el contrato y se trabaja con esos. Lo que requiere maquinaria —pulido, lavado mecanizado, alturas— se separa desde la cotización.',
  },
  {
    titulo: 'Cobertura real y tiempo de respuesta',
    porQue:
      'Quien declara cobertura nacional desde una sola base suele operar con subcontratistas que no controla, y eso se nota en la rotación y en lo que tarda en llegar alguien cuando hay una urgencia. Es preferible un proveedor honesto sobre dónde opera bien.',
    preguntar:
      '¿Atiendes mi zona con equipo propio o subcontratas? ¿Cuánto tardas en hacer un levantamiento y en atender una emergencia en mi dirección?',
    nosotros:
      'Operamos en las 16 alcaldías de la Ciudad de México y en la Zona Metropolitana del Valle de México, incluidos Naucalpan, Huixquilucan, Tlalnepantla, Ecatepec y Cuautitlán. Nuestras oficinas están en Sófocles 133, Polanco, que es la zona con el tiempo de respuesta más corto. Fuera de esa cobertura lo decimos en lugar de improvisar.',
  },
  {
    titulo: 'Horarios que se ajustan a tu operación',
    porQue:
      'En oficinas y condominios, el mejor servicio es el que nadie ve ocurrir. Si el proveedor solo trabaja de nueve a seis, la limpieza profunda va a interrumpir a tu gente o simplemente no se va a hacer. El límite real casi nunca es el proveedor: es el reglamento del edificio.',
    preguntar:
      '¿Puedes trabajar en turno nocturno, de madrugada o en fin de semana? ¿Quién se encarga de gestionar la ventana de acceso con la administración del edificio?',
    nosotros:
      'Trabajamos en horario nocturno, de madrugada y en fin de semana cuando la operación lo requiere, y coordinamos accesos con la administración del inmueble y con seguridad. La credencialización, el uso del elevador de carga y la ruta de salida de residuos se resuelven antes del arranque, no el primer día con el equipo parado en el lobby.',
  },
  {
    titulo: 'Responsabilidad civil y credencialización',
    porQue:
      'Un derrame sobre equipo de cómputo, un cristal roto o una caída en piso recién trapeado son incidentes normales de la actividad. La pregunta no es si pueden ocurrir, sino quién responde y con qué respaldo documental.',
    preguntar:
      '¿Cuentas con póliza de responsabilidad civil vigente? ¿Qué cubre, por qué monto y me entregas la carátula? ¿Tu personal porta identificación de la empresa?',
    nosotros:
      'La documentación que exige la administración del inmueble se acredita como parte del alta de la cuenta, antes de que el equipo entre a trabajar, y el personal asignado se credencializa. El detalle de coberturas se entrega junto con la propuesta para que tu administración lo valide.',
  },
  {
    titulo: 'Facturación y formalidad administrativa',
    porQue:
      'Un proveedor que no factura correctamente no es más barato: es un gasto no deducible y un problema para quien tiene que rendir cuentas ante una asamblea o un consejo. La formalidad administrativa es parte del servicio, no un extra.',
    preguntar:
      '¿Facturas con CFDI vigente? ¿Cuál es tu periodicidad de facturación y tus condiciones de pago? ¿Cómo manejas un ajuste de alcance a mitad del contrato?',
    nosotros:
      'Facturamos con CFDI vigente ante el SAT. Al contratar se solicitan los datos fiscales y la factura se emite conforme a la periodicidad acordada en el contrato de servicio.',
  },
  {
    titulo: 'Especialización por sector, no discurso genérico',
    porQue:
      'Limpiar un condominio, un corporativo, una cocina de restaurante y una casa son cuatro operaciones distintas: cambian el interlocutor, el horario, el equipo y hasta el vocabulario. Un proveedor que describe los cuatro con el mismo párrafo probablemente no ha operado los cuatro.',
    preguntar:
      '¿Qué inmuebles como el mío atiendes hoy y cómo está estructurado ese operativo? ¿Quién sería mi interlocutor?',
    nosotros:
      'El sitio separa por sector porque el servicio se opera por sector: limpieza corporativa por contrato, condominios y áreas comunes, oficinas, hogar y trabajos especializados. Cada página describe el operativo real de ese segmento, con sus frecuencias, sus tiempos y lo que queda fuera.',
  },
];

/**
 * Comparativa de MODELOS de proveedor, no de marcas.
 *
 * Decisión editorial: comparar marcas nombradas sería difamatorio y no verificable.
 * Comparar modelos de contratación es útil, honesto y sí responde la intención real
 * de quien busca "la mejor empresa de limpieza": está decidiendo un esquema, no una marca.
 */
export const COMPARATIVA_DIMENSIONES = [
  'Responsabilidad laboral',
  'Continuidad ante ausencias',
  'Supervisión',
  'Equipo especializado',
  'Costo aparente',
  'Cuándo conviene',
] as const;

export const COMPARATIVA_MODELOS = [
  {
    modelo: 'Empresa especializada con supervisión',
    nota: 'Modelo en el que opera Limpieza México',
    destacado: true,
    valores: [
      'Del proveedor: contrata, da de alta y responde por su personal.',
      'Del proveedor: mantiene relevo y cubre la falta sin que el cliente lo gestione.',
      'Supervisor asignado, recorridos y bitácora del servicio.',
      'Incluido según el alcance: pulido, lavado mecanizado, alturas, sanitización.',
      'Más alto por hora que contratar directo, porque incluye carga social, supervisión, insumos y equipo.',
      'Inmuebles en uso diario, con responsable frente a un consejo o una asamblea, donde la falla se nota.',
    ],
  },
  {
    modelo: 'Personal independiente o contratado por app',
    nota: null,
    destacado: false,
    valores: [
      'Ambigua. Si no hay patrón formal, el riesgo tiende a quedarse en el inmueble donde ocurre el incidente.',
      'Del cliente: si la persona no llega, el cliente busca reemplazo.',
      'Inexistente o a cargo del propio cliente.',
      'Limitado a lo que la persona pueda trasladar; sin maquinaria.',
      'El más bajo de los tres, y el que más varía cuando se suman imprevistos.',
      'Departamentos y casas con necesidades puntuales, cuando el cliente puede supervisar y asumir la coordinación.',
    ],
  },
  {
    modelo: 'Outsourcing generalista de personal',
    nota: null,
    destacado: false,
    valores: [
      'Del proveedor, pero con el foco puesto en administrar nómina más que en el resultado de limpieza.',
      'Variable: depende de la profundidad de la plantilla y de la prioridad que tenga tu cuenta.',
      'Suele ser reporte administrativo, no recorrido técnico en sitio.',
      'Rara vez incluido; se cotiza como proyecto aparte o se subcontrata.',
      'Competitivo en volumen; conviene revisar qué queda fuera del alcance base.',
      'Plantillas grandes y multi-sitio donde el objetivo principal es administrar personal.',
    ],
  },
] as const;
