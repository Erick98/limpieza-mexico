/**
 * Guías (/guias/*). Contenido informativo que precede a la compra.
 *
 * FUNCIÓN EN LA ESTRATEGIA GEO: las páginas de servicio responden "quiero contratar";
 * estas responden "todavía estoy entendiendo el problema". Un modelo generativo cita
 * con mucha más frecuencia el material que explica un criterio que el que vende algo,
 * y desde aquí se enlaza al pilar y a las páginas de servicio.
 *
 * REGLA DURA (2026-09-11), igual que en el resto del sitio: cero afirmaciones no
 * verificables. Sin cifras de precio inventadas, sin años de operación, sin número de
 * clientes, sin certificaciones, sin premios, sin testimonios. Donde el usuario espera
 * un número que no tenemos autorizado, se explica de qué depende: eso responde la
 * intención sin mentir.
 *
 * Las guías 1 y 5 tocan temas con implicación legal (reforma de subcontratación 2021,
 * REPSE, artículo 15 LFT). Se describen en términos generales y SIEMPRE se remite al
 * contador o abogado del lector. No se da asesoría legal.
 */

export type Bloque =
  | { tipo: 'parrafos'; h: string; p: string[] }
  | { tipo: 'lista'; h: string; intro?: string; items: { t: string; d: string }[] }
  | { tipo: 'tabla'; h: string; intro?: string; caption: string; encabezados: string[]; filas: string[][] };

export type Guia = {
  slug: string;
  /** H1 de la página. Puede ser largo. */
  titulo: string;
  /** <title> del documento: <= 60 caracteres con o sin marca. */
  tituloSeo: string;
  /** meta description < 155 caracteres. */
  descripcion: string;
  /** Entradilla visible bajo el H1. */
  entrada: string;
  /** Resumen citable: lo que un asistente copiaría. Autocontenido. */
  resumen: string;
  publicado: string;
  modificado: string;
  keywords: string[];
  bloques: Bloque[];
  faqs: { q: string; a: string }[];
  relacionados: { titulo: string; href: string }[];
};

export const GUIAS: Guia[] = [
  /* ------------------------------------------------------------------ 1 */
  {
    slug: 'elegir-empresa-limpieza-condominio',
    titulo: 'Cómo elegir una empresa de limpieza para tu condominio: checklist para administradores y comités',
    tituloSeo: 'Elegir empresa de limpieza para condominio',
    descripcion:
      'Checklist para administradores y comités: qué documentos pedir, cómo comparar propuestas de limpieza y qué revisar antes de llevarlo a la asamblea.',
    entrada:
      'Elegir proveedor de limpieza para un condominio tiene una dificultad que no tiene elegirlo para una oficina: la decisión hay que defenderla ante gente que no participó en el proceso y que sí va a opinar sobre el resultado.',
    resumen:
      'Para elegir empresa de limpieza para un condominio conviene seguir cuatro pasos: definir el alcance real por espacio antes de pedir cotizaciones, solicitar a cada proveedor la misma documentación (situación fiscal, registro REPSE vigente cuando aplica, evidencia de alta ante el IMSS del personal y póliza de responsabilidad civil si existe), comparar propuestas que estén desglosadas por área y frecuencia —nunca montos globales— y verificar cómo se resuelven la supervisión y la cobertura de ausencias. La decisión debe llevarse a la asamblea con el alcance escrito, no solo con el precio.',
    publicado: '2026-09-11',
    modificado: '2026-09-11',
    keywords: [
      'cómo elegir empresa de limpieza para condominio',
      'proveedor de limpieza condominio cdmx',
      'checklist limpieza áreas comunes',
      'administrador de condominio limpieza',
    ],
    bloques: [
      {
        tipo: 'parrafos',
        h: 'Primero el alcance, después las cotizaciones',
        p: [
          'El error que arruina la mayoría de los procesos es pedir cotizaciones antes de definir qué se quiere. Cuando cada proveedor cotiza lo que él entiende por "limpieza de áreas comunes", las propuestas no son comparables: una incluye el lavado de estacionamiento y otra no, una contempla amenidades y otra las deja fuera, y al final se compara el número de abajo, que es lo único que parece equivalente. Casi siempre gana la más barata, que suele ser la de menor alcance.',
          'La secuencia correcta es al revés. Antes de llamar a nadie, recorre el condominio y escribe la lista de espacios: lobby, pasillos por nivel, escaleras, escaleras de emergencia, elevadores, cada amenidad por separado, niveles de estacionamiento, cuarto de basura, sanitarios comunes, cristales interiores y fachada accesible. Junto a cada espacio, anota la frecuencia que el condominio quiere. Ese documento se les entrega idéntico a todos los proveedores.',
          'Con un alcance común, las propuestas se vuelven comparables de verdad y la conversación se mueve del precio al método: cuánta gente propone cada uno para el mismo trabajo, en qué horario y con qué equipo.',
        ],
      },
      {
        tipo: 'lista',
        h: 'Los documentos que debes pedir a todos por igual',
        intro:
          'Pídelos como requisito para participar, no como favor después de elegir. Un proveedor formal los entrega sin resistencia, y esa reacción ya es información.',
        items: [
          {
            t: 'Constancia de situación fiscal',
            d: 'Confirma que la empresa existe, que el régimen le permite facturar el servicio y que los datos coinciden con los de la propuesta. Un proveedor que no factura correctamente le crea un problema al administrador frente a la asamblea.',
          },
          {
            t: 'Registro REPSE vigente cuando aplica',
            d: 'Desde la reforma de subcontratación de 2021, quien pone trabajadores propios a disposición de un contratante debe estar inscrito ante la Secretaría del Trabajo y Previsión Social conforme al artículo 15 de la Ley Federal del Trabajo. El registro vence a los tres años: verifica número y vigencia, y confírmalo con el contador del condominio.',
          },
          {
            t: 'Evidencia de alta ante el IMSS del personal asignado',
            d: 'No basta con que la empresa afirme que su gente está en nómina. Pide poder acreditarlo para las personas que van a entrar al inmueble, antes del arranque del servicio.',
          },
          {
            t: 'Póliza de responsabilidad civil, si existe',
            d: 'Solicita la carátula vigente y revisa qué cubre y por qué monto. Un derrame, un cristal roto o una caída en piso recién trapeado son incidentes normales de la actividad; la pregunta es quién responde.',
          },
          {
            t: 'Propuesta desglosada por área y frecuencia',
            d: 'Es el documento que vas a presentar en asamblea. Un monto mensual sin desglose es indefendible: no permite explicar el gasto ni evaluar el servicio después.',
          },
          {
            t: 'Nombre del supervisor y mecanismo de incidencias',
            d: 'Quién es el responsable de la cuenta, con qué frecuencia hace recorrido, dónde queda el registro y en cuánto tiempo se compromete a atender un reporte.',
          },
        ],
      },
      {
        tipo: 'parrafos',
        h: 'Cómo comparar propuestas sin que gane la más barata por default',
        p: [
          'Con el alcance igualado, revisa tres cosas antes del precio. La primera es la plantilla propuesta: si un proveedor ofrece dos personas donde los demás proponen cuatro para el mismo alcance, no encontró una eficiencia mágica; o va a incumplir, o va a rotar personal cada mes. La segunda son las exclusiones explícitas: la propuesta seria dice qué no hace, y esa lista es más informativa que la de lo que sí hace.',
          'La tercera es la continuidad. Pregunta qué pasa exactamente si mañana falta la persona asignada, en cuánto tiempo llega el relevo y quién lo capacita en el inmueble. En un condominio, una ausencia sin cubrir en el cuarto de basura se convierte en queja vecinal el mismo día.',
          'Sobre el precio: en limpieza, un costo notablemente por debajo del mercado casi siempre significa una de dos cosas, y ninguna es buena para quien contrata. O el alcance es menor de lo que parece, o el personal no está formalmente contratado, lo que traslada el riesgo laboral al inmueble donde ocurra un accidente.',
        ],
      },
      {
        tipo: 'parrafos',
        h: 'Llevarlo a la asamblea',
        p: [
          'La autorización depende del reglamento interno y del monto: en muchos condominios el administrador puede contratar servicios ordinarios dentro del presupuesto aprobado, y por encima de cierto monto o plazo se requiere acuerdo de asamblea. Revisa tu reglamento con el asesor legal del condominio antes de firmar.',
          'Para la presentación funciona mejor un comparativo de tres columnas con el mismo alcance y las diferencias marcadas, más una recomendación escrita del comité con su razonamiento. Presentar solo precios invita a la asamblea a decidir por precio, que es justo lo que se quiere evitar.',
          'Un último punto práctico: acuerda desde el inicio quién cubre los consumibles de los sanitarios comunes y qué ocurre en días festivos. Son las dos discusiones que aparecen a los tres meses de firmado en prácticamente todos los contratos de condominio.',
        ],
      },
    ],
    faqs: [
      {
        q: '¿Cuántos proveedores conviene invitar a cotizar?',
        a: 'Tres suele ser suficiente para tener referencia de mercado sin volver el proceso interminable. Más de cinco rara vez aporta información nueva y retrasa la decisión varias semanas, lo que en un condominio sin servicio se nota rápido.',
      },
      {
        q: '¿Es mejor contratar personal directo para el condominio?',
        a: 'Depende de cuántas horas se necesitan y de quién asume la administración laboral. Con personal directo, el condominio se vuelve patrón: alta ante el IMSS, prestaciones, incapacidades y finiquitos. Bajo contrato de servicio, esa responsabilidad y la cobertura de ausencias son del proveedor.',
      },
      {
        q: '¿Qué hago si el conserje actual hace parte del trabajo?',
        a: 'Escríbelo en el alcance para que no se traslape. Lo habitual es que el conserje atienda lo diario e inmediato y el proveedor cubra lo que requiere más gente o equipo: lavado de estacionamiento, cristales, limpiezas profundas y cobertura de sus vacaciones.',
      },
      {
        q: '¿Cada cuánto conviene revisar el contrato?',
        a: 'Una revisión anual contra el alcance escrito es razonable, más una revisión extraordinaria si cambia algo del inmueble: una amenidad nueva, un nivel de estacionamiento que se abre o un aumento notable de ocupación.',
      },
    ],
    relacionados: [
      { titulo: 'Limpieza de condominios y áreas comunes', href: '/limpieza-de-condominios' },
      { titulo: 'Frecuencias recomendadas por espacio', href: '/guias/frecuencias-limpieza-areas-comunes' },
      { titulo: '12 cláusulas que debe tener el contrato', href: '/guias/contrato-de-limpieza-clausulas' },
    ],
  },

  /* ------------------------------------------------------------------ 2 */
  {
    slug: 'costo-limpieza-oficinas-cdmx',
    titulo: 'Cuánto cuesta el servicio de limpieza de oficinas en CDMX y de qué depende el precio',
    tituloSeo: 'Costo de limpieza de oficinas en CDMX',
    descripcion:
      'Qué variables determinan el precio de la limpieza de oficinas en CDMX y qué debe traer una cotización para poder compararla con otra.',
    entrada:
      'La pregunta tiene respuesta, pero no es un número: es una fórmula. Quien publica una tarifa por metro cuadrado sin haber visto el espacio está adivinando, y esa cifra se corrige a la alza o el servicio se cae.',
    resumen:
      'El costo de la limpieza de oficinas en CDMX se determina por superficie y distribución del espacio, número de sanitarios, cantidad de personas en sitio, turnos y frecuencia, insumos y equipo incluidos, y áreas especiales como comedor, site o archivo. La variable que más mueve el precio es el número de sanitarios, no los metros cuadrados. Una cotización comparable debe desglosar personal asignado, horas, insumos, equipo y exclusiones; los montos globales sin desglose no permiten comparar proveedores.',
    publicado: '2026-09-11',
    modificado: '2026-09-11',
    keywords: [
      'cuánto cuesta limpieza de oficinas cdmx',
      'precio servicio de limpieza oficinas',
      'costo limpieza corporativa méxico',
      'cotización limpieza de oficinas',
    ],
    bloques: [
      {
        tipo: 'parrafos',
        h: 'Por qué nadie serio publica una tarifa fija',
        p: [
          'El costo de un servicio de limpieza es, en el fondo, el costo de un número de jornadas de trabajo. Y el número de jornadas depende de cuánto tarda una persona en dejar bien un espacio, algo que varía enormemente entre dos oficinas del mismo tamaño. Un piso de 600 m² en planta abierta puede requerir la mitad del tiempo que uno de 600 m² dividido en privados, salas de junta y pasillos, porque cada muro agrega esquinas, puertas, superficies y traslados.',
          'Por eso una tarifa publicada por metro cuadrado solo funciona como gancho. Cuando el proveedor ve el espacio real, la cifra se ajusta; si no se ajusta, el servicio se dimensiona por debajo y termina fallando en lo mismo de siempre: sanitarios.',
        ],
      },
      {
        tipo: 'lista',
        h: 'Las seis variables que mueven el precio',
        items: [
          {
            t: 'Número de sanitarios',
            d: 'La variable de mayor impacto. Es el trabajo que más tiempo consume por jornada y el que primero se nota cuando no se hizo. Dos oficinas idénticas con distinto número de baños no cuestan lo mismo.',
          },
          {
            t: 'Distribución, no solo superficie',
            d: 'Planta abierta contra privados y salas de junta. Los metros cuadrados son el punto de partida; la distribución define el rendimiento real por persona y por jornada.',
          },
          {
            t: 'Personas en sitio',
            d: 'Importa por el uso de sanitarios y cocinetas, no por el número de escritorios. Una oficina con esquema híbrido y ocupación de martes a jueves se dimensiona distinto que una al cien por ciento presencial.',
          },
          {
            t: 'Turnos y frecuencia',
            d: 'Diario en operación, nocturno, de madrugada o fin de semana. El horario nocturno se cotiza distinto, y la limpieza profunda programada casi nunca está incluida en el contrato diario: se cotiza aparte.',
          },
          {
            t: 'Insumos y equipo',
            d: 'Quién pone los productos, el material de consumo y el equipo, y si se requiere maquinaria específica como pulidora o restregadora. Si el edificio exige productos particulares por normativa interna, cambia el costo.',
          },
          {
            t: 'Áreas especiales',
            d: 'Comedor, cocina, site o cuarto de comunicaciones, laboratorio, piso técnico y archivo. Cambian el tiempo y el protocolo, y por eso se cotizan como anexos y no dentro del alcance general.',
          },
        ],
      },
      {
        tipo: 'tabla',
        h: 'Qué debe traer una cotización para poder compararla',
        intro:
          'Si dos propuestas no traen estos seis elementos, no se están comparando dos precios: se están comparando dos suposiciones.',
        caption: 'Elementos que debe incluir una cotización de limpieza de oficinas y por qué.',
        encabezados: ['Elemento', 'Por qué importa'],
        filas: [
          ['Personal asignado y horario', 'Permite ver si el proveedor dimensionó el trabajo o si puso un número para ganar el precio.'],
          ['Alcance por área y frecuencia', 'Es contra lo que se evalúa el servicio después. Sin esto, cualquier reclamo es opinión contra opinión.'],
          ['Insumos y equipo incluidos', 'Evita el cargo sorpresa al segundo mes y aclara quién paga los consumibles de sanitario.'],
          ['Exclusiones explícitas', 'La lista de lo que NO se hace es más informativa que la de lo que sí. Su ausencia es una señal de alerta.'],
          ['Esquema de supervisión', 'Quién responde, cada cuándo revisa y en cuánto tiempo atiende una incidencia.'],
          ['Condiciones de facturación', 'Periodicidad, datos fiscales y cómo se refleja un ajuste de alcance a mitad del contrato.'],
        ],
      },
      {
        tipo: 'parrafos',
        h: 'Señales de que un precio es demasiado bajo',
        p: [
          'Un costo notablemente por debajo del resto suele explicarse por una de tres razones, y conviene identificar cuál antes de firmar. La primera es alcance menor: no incluye cristales, ni profunda, ni amenidades, ni consumibles. La segunda es dimensionamiento insuficiente: menos gente de la necesaria para el mismo trabajo, lo que se traduce en rotación y en servicio irregular a partir del segundo mes.',
          'La tercera es la más delicada: personal no formalizado. Si el proveedor no está pagando carga social, su costo por hora baja de forma dramática, pero el riesgo laboral no desaparece; se queda en el inmueble donde ocurra un accidente. Ese ahorro mensual puede costar mucho más de una sola vez.',
          'Nota sobre cifras: en esta guía no publicamos rangos de precio porque cualquier número sin levantamiento sería inventado, y preferimos no darlo a darlo mal. Si quieres una referencia real para tu espacio, la cotización se arma con los datos de arriba y no tiene costo.',
        ],
      },
    ],
    faqs: [
      {
        q: '¿Se cobra por metro cuadrado o por persona?',
        a: 'La mayoría de los contratos se estructuran por jornadas de personal en un horario definido, usando la superficie y la distribución para calcular cuántas jornadas se necesitan. El metro cuadrado es un insumo del cálculo, no la unidad de cobro.',
      },
      {
        q: '¿La limpieza profunda está incluida en el servicio diario?',
        a: 'Casi nunca, en ningún proveedor. La profunda requiere mover mobiliario, tratar pisos y trabajar fuera de horario, así que se cotiza aparte. Conviene dejar el calendario acordado desde el inicio aunque se ejecute dos o tres veces al año.',
      },
      {
        q: '¿Cuesta más el servicio nocturno?',
        a: 'Se cotiza distinto porque implica turno nocturno para el personal y coordinación de accesos con la administración del edificio. A cambio permite hacer trabajos que con gente en el piso simplemente no se pueden hacer.',
      },
      {
        q: '¿Conviene contratar por temporada de prueba?',
        a: 'Es razonable y un proveedor con método no debería oponerse. Lo importante es que el periodo de prueba se evalúe contra el alcance escrito y no contra una impresión general, y que quede claro cómo se termina si no funciona.',
      },
    ],
    relacionados: [
      { titulo: 'Limpieza corporativa por contrato', href: '/limpieza-corporativa' },
      { titulo: 'Limpieza de oficinas en CDMX', href: '/limpieza-de-oficinas' },
      { titulo: 'Cómo elegir empresa de limpieza', href: '/mejor-empresa-de-limpieza-en-mexico' },
    ],
  },

  /* ------------------------------------------------------------------ 3 */
  {
    slug: 'contrato-de-limpieza-clausulas',
    titulo: 'Contrato de limpieza para empresas: 12 cláusulas que debes exigir',
    tituloSeo: 'Contrato de limpieza: 12 cláusulas clave',
    descripcion:
      'Las 12 cláusulas que evitan conflictos en un contrato de limpieza para empresas y condominios: alcance, exclusiones, supervisión, ausencias y terminación.',
    entrada:
      'Los conflictos en un contrato de limpieza casi nunca son por el precio. Son por algo que las dos partes daban por hecho y que nadie escribió.',
    resumen:
      'Un contrato de limpieza para empresas o condominios debe incluir al menos doce elementos: alcance por área y frecuencia, exclusiones explícitas, plantilla y horarios, insumos y equipo, protocolo de áreas sensibles, esquema de supervisión con tiempo de respuesta, cobertura de ausencias, obligaciones laborales y documentación (IMSS y REPSE cuando aplica), responsabilidad por daños, confidencialidad, condiciones de facturación y ajuste, y causales y plazos de terminación. La cláusula más olvidada es la de exclusiones, y es la que más conflictos evita.',
    publicado: '2026-09-11',
    modificado: '2026-09-11',
    keywords: [
      'contrato de limpieza para empresas',
      'cláusulas contrato de limpieza',
      'contrato servicio de limpieza condominio',
      'qué debe incluir un contrato de limpieza',
    ],
    bloques: [
      {
        tipo: 'parrafos',
        h: 'Qué hace fallar un contrato de limpieza',
        p: [
          'En la práctica, casi todas las rupturas entre un cliente y su proveedor de limpieza vienen del mismo lugar: una expectativa que no quedó escrita. El cliente asumía que los cristales entraban cada mes; el proveedor entendió que eran semestrales. El cliente creía que los consumibles del baño los ponía el proveedor; el proveedor los cotizó aparte. Nadie mintió: nadie lo escribió.',
          'Por eso un buen contrato de limpieza no se mide por su extensión legal sino por cuántas de esas zonas grises deja resueltas. Las doce cláusulas siguientes cubren las que aparecen una y otra vez. Esta guía es orientativa y no constituye asesoría legal: revisa el contrato con el abogado de tu empresa o del condominio antes de firmarlo.',
        ],
      },
      {
        tipo: 'lista',
        h: 'Las 12 cláusulas',
        items: [
          {
            t: '1. Alcance por área y frecuencia',
            d: 'El corazón del contrato. Cada espacio con la frecuencia con que se atiende. Sin esto no hay forma de evaluar el servicio después ni de sostener un reclamo.',
          },
          {
            t: '2. Exclusiones explícitas',
            d: 'Qué no está incluido: cristales en altura, fachadas, cisternas, control de plagas, jardinería, consumibles. Es la cláusula más olvidada y la que más discusiones evita.',
          },
          {
            t: '3. Plantilla asignada y horarios',
            d: 'Cuántas personas, en qué turno y qué días. Si el servicio depende de una persona específica, dilo aquí; si no, deja claro que el proveedor puede rotar manteniendo el alcance.',
          },
          {
            t: '4. Insumos, material de consumo y equipo',
            d: 'Quién los provee y bajo qué estándar. Si el inmueble exige productos específicos por normativa interna, alergias o certificación ambiental, se indica en esta cláusula.',
          },
          {
            t: '5. Protocolo para áreas sensibles',
            d: 'Site o cuarto de comunicaciones, comedor, laboratorio, archivo y zonas restringidas: método, acceso acompañado y calendario. Van como anexo, no dentro de la limpieza general.',
          },
          {
            t: '6. Supervisión y tiempo de respuesta',
            d: 'Quién es el supervisor, con qué frecuencia recorre, dónde queda el registro, por qué canal se reportan incidencias y en cuánto tiempo se atienden.',
          },
          {
            t: '7. Cobertura de ausencias',
            d: 'Qué ocurre cuando falta una persona, en cuánto tiempo llega el relevo y quién lo capacita. Debe quedar claro que la cobertura es obligación del proveedor.',
          },
          {
            t: '8. Obligaciones laborales y documentación',
            d: 'Declaración de que el personal está bajo relación laboral formal con el proveedor, con alta ante el IMSS, y entrega de registro REPSE vigente cuando la operación lo requiera conforme al artículo 15 de la Ley Federal del Trabajo.',
          },
          {
            t: '9. Responsabilidad por daños',
            d: 'Quién responde por un daño causado durante el servicio, con qué procedimiento de reporte y con qué respaldo. Si hay póliza de responsabilidad civil, se referencia aquí.',
          },
          {
            t: '10. Confidencialidad y conducta',
            d: 'Obligación de confidencialidad extendida al personal asignado, reglas de acceso, uso de identificación y qué hacer con objetos encontrados.',
          },
          {
            t: '11. Facturación, ajustes y precios',
            d: 'Periodicidad, condiciones de pago, cómo se solicita un cambio de alcance, con cuánta anticipación y cómo se refleja en la factura sin renegociar todo el contrato.',
          },
          {
            t: '12. Vigencia, terminación y entrega',
            d: 'Plazo, renovación, causales de terminación anticipada, periodo de aviso y qué se devuelve al cerrar: llaves, credenciales, accesos y bitácoras del servicio.',
          },
        ],
      },
      {
        tipo: 'parrafos',
        h: 'Dos cláusulas extra si es condominio',
        p: [
          'Para inmuebles en régimen de condominio conviene añadir dos puntos que en oficinas rara vez importan. El primero es el tratamiento de días festivos: si el cuarto de basura se atiende o no el 25 de diciembre no es una pregunta menor cuando hay doscientas personas viviendo en el edificio.',
          'El segundo es quién cubre los consumibles de los sanitarios de áreas comunes y de las amenidades. Es un gasto pequeño y recurrente que genera fricción desproporcionada cuando no quedó asignado. Ambos puntos se resuelven con dos líneas al firmar y son casi imposibles de resolver después.',
        ],
      },
      {
        tipo: 'parrafos',
        h: 'Antes de firmar',
        p: [
          'Revisa que el anexo de alcance esté firmado por ambas partes y forme parte integral del contrato, no como un correo adjunto. Confirma que los nombres y datos fiscales coincidan con la constancia de situación fiscal del proveedor. Y verifica que exista una persona designada de cada lado para operar el día a día, con su correo y su teléfono en el documento.',
          'Por último, una recomendación práctica: guarda el contrato junto con la propuesta original y la bitácora de supervisión en el mismo expediente. Cuando hay que evaluar una renovación un año después, ese expediente es la única memoria confiable de lo que se acordó.',
        ],
      },
    ],
    faqs: [
      {
        q: '¿Cuánto debe durar un contrato de limpieza?',
        a: 'Lo habitual es anual con renovación, porque permite estabilizar al personal en el inmueble. Lo importante no es el plazo sino que exista una causal de terminación anticipada con aviso razonable si el servicio no cumple el alcance.',
      },
      {
        q: '¿Se puede cambiar el alcance a mitad del contrato?',
        a: 'Sí, y conviene preverlo. Deja escrito cómo se solicita un ajuste, con cuánta anticipación y cómo se refleja en la facturación, para no renegociar el contrato completo cada vez que cambie la ocupación del inmueble.',
      },
      {
        q: '¿Qué pasa si el proveedor no tiene REPSE?',
        a: 'Depende de si su operación lo requiere. Cuando aplica y no lo tiene, el gasto puede no ser deducible para quien contrata y hay implicaciones laborales adicionales. Verifícalo con tu contador antes de firmar, no después.',
      },
      {
        q: '¿Conviene incluir penalizaciones por incumplimiento?',
        a: 'Funcionan mejor los mecanismos de corrección con tiempo de respuesta que las penalizaciones económicas, que suelen ser difíciles de aplicar y deterioran la relación. Lo que sí conviene es una causal clara de terminación por incumplimiento reiterado y documentado.',
      },
    ],
    relacionados: [
      { titulo: 'Limpieza corporativa por contrato', href: '/limpieza-corporativa' },
      { titulo: 'Limpieza de condominios y áreas comunes', href: '/limpieza-de-condominios' },
      { titulo: 'Personal en nómina vs. por app', href: '/guias/personal-en-nomina-vs-por-app' },
    ],
  },

  /* ------------------------------------------------------------------ 4 */
  {
    slug: 'frecuencias-limpieza-areas-comunes',
    titulo: 'Limpieza de áreas comunes en condominios: frecuencias recomendadas por espacio',
    tituloSeo: 'Frecuencias de limpieza de áreas comunes',
    descripcion:
      'Con qué frecuencia limpiar lobby, pasillos, elevadores, estacionamientos, amenidades y cuarto de basura en un condominio, según el tráfico real.',
    entrada:
      'La pregunta que llega a casi toda administración es la misma: "¿cada cuándo se debe limpiar esto?". La respuesta corta es que no todos los espacios llevan la misma frecuencia, y tratarlos igual es la forma más común de gastar de más en unos y quedarse corto en otros.',
    resumen:
      'En un condominio habitado, lobby, elevadores, sanitarios comunes y cuarto de basura se atienden a diario; pasillos y escaleras, diario o cada tercer día según el tráfico; el estacionamiento se barre semanalmente y se lava de forma mecanizada cada mes o trimestre; las amenidades se programan por uso real y calendario de reservas; los cristales y la cancelería de áreas comunes, mensual o trimestral. La frecuencia se ajusta por número de unidades por nivel, presencia de mascotas, ocupación real y temporada.',
    publicado: '2026-09-11',
    modificado: '2026-09-11',
    keywords: [
      'frecuencia limpieza áreas comunes',
      'cada cuándo limpiar áreas comunes condominio',
      'limpieza de lobby y pasillos condominio',
      'programa de limpieza edificio',
    ],
    bloques: [
      {
        tipo: 'parrafos',
        h: 'La frecuencia se define por tráfico, no por tamaño',
        p: [
          'El criterio útil para programar limpieza en un condominio no es cuántos metros tiene un espacio sino cuánta gente pasa por él y con qué consecuencia. El lobby de un edificio de treinta departamentos puede tener más tránsito diario que el pasillo del quinto nivel de una torre de cien, y el resultado de descuidar cada uno es muy distinto: uno lo ve todo visitante, el otro lo ven ocho familias.',
          'Esa lógica también explica por qué el cuarto de basura es innegociablemente diario aunque sea el espacio más pequeño del inmueble. No es cuestión de estética: un día sin atención produce olor, atrae fauna nociva y genera queja vecinal inmediata.',
        ],
      },
      {
        tipo: 'tabla',
        h: 'Frecuencias recomendadas por espacio',
        intro:
          'Punto de partida para un condominio habitado con ocupación normal. Cada inmueble ajusta según tráfico real y presupuesto aprobado.',
        caption: 'Frecuencia recomendada de limpieza por espacio en áreas comunes de condominio.',
        encabezados: ['Espacio', 'Frecuencia recomendada', 'Qué la hace subir o bajar'],
        filas: [
          ['Lobby y recepción', 'Diario, con repaso en horas pico', 'Sube con tráfico de visitantes, paquetería y temporada de lluvias.'],
          ['Elevadores', 'Diario', 'Sube con número de unidades por torre y con mascotas; botonera y acero se atienden en cada pasada.'],
          ['Pasillos de niveles', 'Diario o cada tercer día', 'Depende de unidades por nivel, mascotas y si el pasillo es abierto al exterior.'],
          ['Escaleras principales', 'Cada tercer día', 'Sube si es la ruta habitual en edificios de pocos niveles.'],
          ['Escaleras de emergencia', 'Semanal', 'Poco tráfico pero acumulan polvo y objetos; es el espacio más olvidado del inmueble.'],
          ['Sanitarios de áreas comunes', 'Diario', 'Sube con amenidades activas y eventos en el salón de usos múltiples.'],
          ['Cuarto de basura', 'Diario, sin excepción', 'No baja. En temporada de calor puede requerir doble atención y lavado más frecuente.'],
          ['Estacionamiento: barrido', 'Semanal', 'Sube en temporada seca y con acceso directo desde la calle.'],
          ['Estacionamiento: lavado mecanizado', 'Mensual o trimestral', 'Requiere liberar niveles por etapas; se programa con aviso a residentes.'],
          ['Gimnasio', 'Diario si hay uso constante', 'Depende del uso real; superficies de contacto y espejos son lo crítico.'],
          ['Alberca y su área', 'Diario en temporada de uso', 'Fuera de temporada baja a semanal; el tratamiento del agua es un servicio distinto.'],
          ['Salón de usos múltiples', 'Por evento, más repaso semanal', 'Se programa contra el calendario de reservas, no contra el calendario fijo.'],
          ['Roof garden y terrazas', 'Semanal, diario en temporada alta', 'Sube con lluvias, hojas y uso de asadores.'],
          ['Cristales y cancelería interior', 'Mensual', 'Sube en temporada seca por polvo; la fachada en altura es proyecto aparte.'],
        ],
      },
      {
        tipo: 'lista',
        h: 'Cuatro factores que justifican subir una frecuencia',
        items: [
          {
            t: 'Mascotas',
            d: 'Un condominio pet friendly con alta densidad de mascotas cambia por completo la frecuencia de pasillos, elevadores y áreas verdes. Es el factor que más se subestima al armar el programa.',
          },
          {
            t: 'Temporada',
            d: 'En lluvias entra agua y lodo al lobby y a los accesos; en temporada seca el polvo se nota antes en cristales y superficies. El programa anual puede tener dos configuraciones.',
          },
          {
            t: 'Obras dentro del inmueble',
            d: 'Una remodelación en un departamento ensucia pasillos, elevador y estacionamiento durante semanas. Conviene prever quién asume ese costo extra: normalmente el residente que remodela.',
          },
          {
            t: 'Ocupación real',
            d: 'Un edificio recién entregado con 40% de unidades habitadas no requiere el mismo programa que uno lleno. La frecuencia se revisa cuando la ocupación cambia de forma significativa.',
          },
        ],
      },
      {
        tipo: 'parrafos',
        h: 'Cómo se convierte esto en un programa de trabajo',
        p: [
          'El programa se escribe por espacio y por día, no por persona. Es decir: lunes a domingo, qué se atiende cada día y qué se atiende solo ciertos días. A partir de ahí se calcula cuántas jornadas se necesitan, y de ahí sale la plantilla. Hacerlo al revés —primero decidir cuánta gente se contrata y luego ver qué alcanza a limpiar— es la razón por la que muchos condominios tienen servicio todos los días y aun así áreas permanentemente descuidadas.',
          'Ese documento, firmado por ambas partes, es también la herramienta de supervisión: la bitácora se levanta contra él y cualquier reclamo se resuelve mirando el programa, no discutiendo impresiones.',
        ],
      },
    ],
    faqs: [
      {
        q: '¿Diario significa todos los días incluyendo domingos?',
        a: 'No necesariamente, y debe quedar escrito. Muchos condominios operan de lunes a sábado con guardia reducida en domingo, salvo el cuarto de basura. Lo importante es que el programa diga explícitamente qué pasa fines de semana y días festivos.',
      },
      {
        q: '¿Cuántas personas se necesitan para un condominio?',
        a: 'Sale del programa, no al revés: se define qué se atiende cada día y con eso se calcula la carga en jornadas. Un condominio con amenidades y dos sótanos requiere más operativo que otro con más unidades y sin ellas.',
      },
      {
        q: '¿Se puede bajar la frecuencia para reducir la cuota?',
        a: 'Sí, pero conviene hacerlo por espacio y con criterio, no de forma pareja. Bajar escaleras de emergencia o cristales tiene poco impacto perceptible; bajar cuarto de basura o sanitarios comunes genera quejas en días.',
      },
      {
        q: '¿Cada cuándo se revisa el programa?',
        a: 'Una vez al año, y de forma extraordinaria si cambia algo relevante del inmueble: una amenidad nueva, un aumento notable de ocupación o un cambio de uso en algún espacio común.',
      },
    ],
    relacionados: [
      { titulo: 'Limpieza de condominios y áreas comunes', href: '/limpieza-de-condominios' },
      { titulo: 'Checklist para administradores y comités', href: '/guias/elegir-empresa-limpieza-condominio' },
      { titulo: 'Cómo elegir empresa de limpieza', href: '/mejor-empresa-de-limpieza-en-mexico' },
    ],
  },

  /* ------------------------------------------------------------------ 5 */
  {
    slug: 'personal-en-nomina-vs-por-app',
    titulo: 'Personal de limpieza en nómina vs. por app o independiente: riesgos legales y operativos en México',
    tituloSeo: 'Limpieza en nómina vs. por app: riesgos',
    descripcion:
      'Diferencias entre contratar limpieza con personal en nómina, por app o independiente en México: seguridad social, REPSE y riesgo operativo.',
    entrada:
      'La comparación suele plantearse como una decisión de precio. En realidad es una decisión sobre dónde queda el riesgo cuando algo sale mal, y ese costo no aparece en ninguna cotización.',
    resumen:
      'En México, contratar limpieza con personal en nómina de un proveedor formal traslada a ese proveedor las obligaciones de seguridad social, la cobertura de ausencias y la responsabilidad por el servicio. Contratar personal independiente o por aplicación suele ser más barato por hora, pero deja al contratante expuesto en materia laboral y sin continuidad garantizada. Desde la reforma de subcontratación de 2021, quien pone trabajadores propios a disposición de un contratante debe estar inscrito en el REPSE ante la STPS conforme al artículo 15 de la Ley Federal del Trabajo, con vigencia de tres años. Esta información es general y debe validarse con un contador o abogado.',
    publicado: '2026-09-11',
    modificado: '2026-09-11',
    keywords: [
      'personal de limpieza en nómina o independiente',
      'riesgos contratar limpieza por app',
      'repse limpieza méxico',
      'reforma subcontratación 2021 limpieza',
    ],
    bloques: [
      {
        tipo: 'parrafos',
        h: 'Qué cambió con la reforma de 2021',
        p: [
          'La reforma en materia de subcontratación de 2021 modificó el marco bajo el cual una empresa puede recibir personal de un tercero. En términos generales, prohibió la subcontratación de personal y dejó permitida la prestación de servicios especializados u obras especializadas que no formen parte del objeto social ni de la actividad económica preponderante de quien contrata. La limpieza suele encuadrar en ese supuesto para una empresa cuyo giro es otro.',
          'La consecuencia práctica más visible fue el REPSE: el Registro de Prestadoras de Servicios Especializados u Obras Especializadas que administra la Secretaría del Trabajo y Previsión Social, previsto en el artículo 15 de la Ley Federal del Trabajo. Debe registrarse quien pone trabajadores propios a disposición de un contratante; el registro tiene vigencia de tres años y debe renovarse.',
          'Para quien contrata, el punto relevante es que la validez de ese registro tiene efectos fiscales: el gasto con un proveedor que debía estar registrado y no lo está puede no ser deducible. Por eso las áreas de compras lo piden como requisito de alta y no como trámite posterior. Esta guía describe el panorama general; la aplicación a tu caso concreto la debe confirmar tu contador o tu abogado.',
        ],
      },
      {
        tipo: 'tabla',
        h: 'Comparación de los tres esquemas',
        caption: 'Comparación entre personal en nómina de proveedor formal, personal independiente o por app, y contratación directa.',
        encabezados: ['Aspecto', 'Proveedor formal (personal en su nómina)', 'Independiente o por app', 'Contratación directa'],
        filas: [
          [
            'Quién es el patrón',
            'El proveedor. Contrata, da de alta y responde por su personal.',
            'Ambiguo. La plataforma suele presentarse como intermediaria.',
            'Tú. Con todas las obligaciones que eso implica.',
          ],
          [
            'Seguridad social',
            'A cargo del proveedor, acreditable antes del arranque.',
            'Frecuentemente inexistente; conviene verificarlo caso por caso.',
            'A tu cargo: alta ante el IMSS y prestaciones de ley.',
          ],
          [
            'Si falta la persona',
            'El proveedor cubre el relevo.',
            'Buscas reemplazo o te quedas sin servicio ese día.',
            'Tu problema: cubrir o parar el servicio.',
          ],
          [
            'Accidente dentro del inmueble',
            'Responde el proveedor conforme al contrato y su cobertura.',
            'Zona de riesgo: sin patrón formal, la exposición tiende a quedarse contigo.',
            'Tuyo, como patrón, incluido el riesgo de trabajo.',
          ],
          [
            'Equipo especializado',
            'Incluido según el alcance: pulido, lavado mecanizado, alturas.',
            'Limitado a lo que la persona pueda trasladar.',
            'Lo compras o lo rentas tú.',
          ],
          [
            'Costo visible por hora',
            'El más alto de los tres: incluye carga social, supervisión, insumos y equipo.',
            'El más bajo, y el más volátil cuando se suman imprevistos.',
            'Intermedio, sin contar el costo administrativo interno.',
          ],
        ],
      },
      {
        tipo: 'lista',
        h: 'Los riesgos operativos que no aparecen en la comparación de precio',
        items: [
          {
            t: 'Discontinuidad',
            d: 'Es el más frecuente y el más caro en tiempo. Con personal independiente, la ausencia se convierte en gestión tuya el mismo día, y la rotación te obliga a re-explicar el inmueble cada pocas semanas.',
          },
          {
            t: 'Ausencia de supervisión',
            d: 'Sin un tercero que revise, la evaluación de calidad recae en quien ya tiene otro trabajo: el gerente de oficina o el administrador. En la práctica eso significa que solo se detecta lo que alguien se queja.',
          },
          {
            t: 'Sin respaldo ante daños',
            d: 'Un derrame sobre equipo, un piso dañado por producto equivocado o un cristal roto se vuelven una negociación personal en lugar de un procedimiento con respaldo documental.',
          },
          {
            t: 'Verificación de antecedentes',
            d: 'En inmuebles con acceso a información sensible o a domicilios particulares, quién entra importa tanto como qué tan bien limpia. Con contratación informal, esa verificación rara vez existe.',
          },
        ],
      },
      {
        tipo: 'parrafos',
        h: 'Cuándo cada esquema es razonable',
        p: [
          'No todos los casos piden lo mismo, y decir lo contrario sería vender. Para una limpieza puntual de un departamento, o para una casa donde alguien puede estar presente y supervisar, contratar directo a una persona de confianza es perfectamente razonable y suele ser lo más económico. El riesgo existe, pero es acotado y el contratante lo administra de cerca.',
          'El cálculo cambia cuando el inmueble se usa todos los días, cuando hay terceros —empleados, residentes, clientes— circulando, cuando hay un consejo o una asamblea a quien rendir cuentas, o cuando el gasto tiene que ser deducible y auditable. Ahí el esquema formal deja de ser un lujo y se vuelve la opción que cuesta menos en el escenario malo.',
          'Si estás evaluando el cambio de un esquema a otro, conviene revisarlo con tu contador antes de decidir, sobre todo por las implicaciones fiscales de la deducibilidad. Nada de lo escrito aquí sustituye esa consulta.',
        ],
      },
    ],
    faqs: [
      {
        q: '¿Contratar por app es ilegal?',
        a: 'No es esa la pregunta correcta. Las plataformas operan legalmente; lo que conviene revisar es bajo qué figura queda la persona que entra a tu inmueble, si existe alguien que responda como patrón y si tu operación requiere un proveedor con REPSE. Consúltalo con tu contador.',
      },
      {
        q: '¿Cómo verifico el REPSE de un proveedor?',
        a: 'Pídele su número de registro y la constancia, y valida la vigencia: el registro dura tres años y debe renovarse. Tu área de compras o tu contador puede confirmar el estatus antes del alta del proveedor.',
      },
      {
        q: '¿Un condominio puede contratar personal directo?',
        a: 'Sí, y muchos lo hacen con conserjes. Al hacerlo, el condominio asume el rol de patrón con todas sus obligaciones: alta ante el IMSS, prestaciones, incapacidades y finiquitos, además de cubrir las ausencias. Es una decisión que conviene tomar con asesoría contable y con acuerdo de asamblea.',
      },
      {
        q: '¿Qué documentos debe entregarme un proveedor formal?',
        a: 'Constancia de situación fiscal, registro REPSE vigente cuando aplica, evidencia de alta ante el IMSS del personal asignado, identificación y credencialización del equipo, y convenio de confidencialidad firmado si se maneja información sensible.',
      },
    ],
    relacionados: [
      { titulo: 'Cómo elegir empresa de limpieza', href: '/mejor-empresa-de-limpieza-en-mexico' },
      { titulo: '12 cláusulas del contrato de limpieza', href: '/guias/contrato-de-limpieza-clausulas' },
      { titulo: 'Limpieza corporativa por contrato', href: '/limpieza-corporativa' },
    ],
  },
];

export const GUIA_SLUGS = GUIAS.map((g) => g.slug);

export function getGuia(slug: string): Guia | undefined {
  return GUIAS.find((g) => g.slug === slug);
}
