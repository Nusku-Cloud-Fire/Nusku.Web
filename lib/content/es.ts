import type { RouteKey } from "@/lib/i18n";

/**
 * Spanish is the source of truth: `SiteContent` is derived from this object,
 * so anything added here has to be translated in `en.ts` before it compiles.
 * Strings are verbatim from the Webflow site unless noted.
 */
const es = {

  chrome: {
    skipToContent: "Saltar al contenido",
    homeAriaLabel: "Nusku — Inicio",
    mainNavLabel: "Principal",
    mobileNavLabel: "Principal (móvil)",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    languageNavLabel: "Idioma",
    demoCta: "Programa una demo",
    learnMore: "Saber más",
    soon: "Próximamente",
    nav: [
      { key: "installers", label: "Instaladores y mantenedores" },
      { key: "receivers", label: "Receptoras" },
      { key: "owners", label: "Propietarios" },
    ] as { key: RouteKey; label: string }[],
  },

  footer: {
    tagline:
      "Nusku es una plataforma Cloud que permite la gestión óptima de instalaciones de detección de incendios.",
    platformHeading: "Plataforma",
    platformLinks: [
      { key: "installers", label: "Instaladores y mantenedores" },
      { key: "receivers", label: "Receptoras" },
      { key: "owners", label: "Propietarios de instalación" },
    ] as { key: RouteKey; label: string }[],
    contactHeading: "Contacta con nosotros",
    contactFormLabel: "Formulario de contacto",
    languageHeading: "Idioma",
    copyright: "© 2025 Copyright. Nusku Cloud S.L.",
    legalLinks: [
      { key: "terms", label: "Términos y condiciones" },
      { key: "privacy", label: "Política de privacidad" },
    ] as { key: RouteKey; label: string }[],
  },

  siteMeta: {
    titleDefault: "Nusku | Detección de incendios con IA",
    titleTemplate: "%s | Nusku",
    description:
      "Configura y gestiona las instalaciones de detección de incendios de una forma rápida, sencilla y con prestaciones predictivas únicas en el mercado.",
  },

  demoCta: {
    badge: "Realiza una demo",
    title: "¿Te enseñamos de qué es capaz la plataforma?",
    body: "Agenda una demostración y compártenos tus requerimientos para evaluar cómo podemos asistirte.",
    cta: "Programa una demo",
  },

  support: {
    badge: "Soporte técnico",
    title: "Un soporte técnico gestionado por ingenieros expertos",
    body: "Contar con ingenieros en el soporte técnico garantiza una atención más especializada y eficiente. Ellos pueden diagnosticar problemas complejos rápidamente y ofrecer soluciones efectivas, lo que reduce el tiempo de inactividad. Además, su experiencia permite una mejor comprensión de los sistemas, lo que se traduce en un servicio más proactivo y preventivo.",
    features: [
      {
        icon: "/images/clock.svg",
        title: "Soporte 24/7",
        body: "Nuestro servicio de soporte técnico 24/7 está diseñado para darle la asistencia que necesitas desde cualquier parte y con un equipo de expertos en el sector.",
      },
      {
        icon: "/images/eye.svg",
        title: "Soporte en tiempo real",
        body: "Nuestros ingenieros pueden acceder a tu cuenta en remoto para darte soporte en tiempo real y resolver tu problema al momento.",
      },
    ],
  },

  cloud: {
    cardTitle: "Por qué es importante el Cloud en la seguridad de hoy en día",
    cardBody:
      "En la era digital, almacenar datos en la nube se ha convertido en una práctica común y conveniente. Sin embargo, la seguridad de esos datos es una preocupación fundamental para muchos usuarios. Afortunadamente, con la plataforma de NUSKU las soluciones de almacenamiento e interacción en la nube ofrecen múltiples capas de protección para garantizar que tu información y datos estén a salvo.",
    title: "Tus datos siempre protegidos",
    body: "Agenda una demostración y compártenos tus requerimientos para evaluar cómo podemos asistirte.",
    features: [
      {
        icon: "/images/globe-01.svg",
        label: "Arquitectura distribuida con escalabilidad sin límites",
      },
      {
        icon: "/images/shield-03.svg",
        label: "Más altos estándares de la industria en seguridad y fiabilidad",
      },
      // NOTE: the live Webflow site repeats the first label here. Kept verbatim.
      {
        icon: "/images/data.svg",
        label: "Arquitectura distribuida con escalabilidad sin límites",
      },
    ],
  },

  aiHighlight: {
    title: "Operaciones automatizadas por la I.A.",
    body: "Nusku es la única plataforma para gestión de instalaciones de detección de incendios que incorpora la I.A. y te ahorra horas de instalación y gestión.",
    alt: "Operaciones automatizadas por la inteligencia artificial de Nusku",
  },

  planimetria: {
    title: "Planimetría de emergencias",
    body: "Es posible consultar en la plataforma lo que está pasando en cada dispositivo que está instalado y diferenciar la tipología del mismo y en que estado se encuentra.",
    alt: "Planimetría de emergencias mostrando el estado de cada dispositivo",
  },

  home: {
    hero: {
      title: "Detección de incendios con I.A.",
      body: "Configura y gestiona instalaciones de detección de incendios de forma rápida y sencilla, aportando prestaciones predictivas únicas en el mercado mediante Inteligencia Artificial.",
      body2:
        "Nuestra IA procesa y analiza datos, aprende y crea algoritmos aportando soluciones revolucionarias y únicas de manera continua.",
      cta: "Programa una demo",
      alt: "Panel de la plataforma Nusku mostrando el estado de una instalación de detección de incendios",
    },
    installers: {
      badge: "Instaladores y mantenedores",
      title: "Proyecta y diseña tu instalación perfecta",
      body: "El algoritmo de I.A. de Nusku realiza un estudio detallado de las necesidades para la instalación e identifica las áreas de alto riesgo aumentando la efectividad de la realización del proyecto.",
      alt: "Vista de planimetría con las áreas de riesgo identificadas por la IA de Nusku",
      features: [
        {
          icon: "/images/map-02.svg",
          title: "Planimetría",
          body: "Gestiona incidencias a través de la planimetría informando las coordenadas específicas de la alarma o avería en la instalación.",
        },
        {
          icon: "/images/route.svg",
          title: "Rutas de Evacuación",
          body: "Cálculo de rutas de evacuación dimensionada a tiempo real y apoyo a las señalizaciones de emergencia.",
        },
        {
          icon: "/images/star-06.svg",
          title: "Mantenimiento predictivo",
          body: "Realiza el mantenimiento de su instalación de forma remota, no presencial.",
        },
      ],
    },
    receivers: {
      badge: "Centrales receptoras",
      title: "Gestiona las alarmas de forma rápida y eficaz",
      body: "El sistema de visualización y alertas de NUSKU minimiza y mejora la gestión de falsos positivos en cualquier instalación y en cualquier circunstancia.",
      cardOne: {
        title: "Video verificación de la instalación en tiempo real",
        body: "El sistema monitoriza las alarmas de incendio en tiempo real, facilitando la comprobación de las incidencias en la instalación.",
        alt: "Pantalla de video verificación de una alarma en curso",
      },
      cardTwo: {
        title: "Conectividad directa con emergencias",
        body: "En situaciones de emergencia, el sistema genera un enlace para conexión directa a planimetría y visualización de la instalación.",
        alt: "Enlace de emergencia compartido con los servicios de emergencia",
      },
      cardThree: {
        title: "Alertas automáticas y personalizadas",
        body: "Posibilidad de acceso a listados de contactos directos con el personal responsable de la instalación o empresa encargada del mantenimiento.",
        alt: "Listado de contactos de emergencia en la aplicación de Nusku",
      },
    },
    owners: {
      badge: "Visor para propietarios",
      title: "Ofrece una herramienta para el usuario final",
      body: "Proporcionamos una herramienta para el usuario final donde le permite visualizar e interaccionar con los alertas y eventos de la instalación.",
      alt: "Visor de Nusku para propietarios de instalación",
      features: [
        {
          icon: "/images/settings-03.svg",
          title: "Administración de instalaciones",
          body: "El usuario final podrá administrar recursos para su instalación así como tener conectividad con los profesionales a cargo de la instalación.",
        },
        {
          icon: "/images/dotpoints-02.svg",
          title: "Visualización de dispositivos",
          body: "Con la herramienta para usuario final se podrá interaccionar con los dispositivos y comprobar el estado de los mismos.",
        },
        {
          icon: "/images/alert-triangle.svg",
          title: "Estados de alarma",
          body: "En caso de alarmas de incendio o averías, el usuario final dispondrá de los recursos para contactar con la Central Receptora o el mantenedor de la instalación.",
        },
        {
          icon: "/images/alert-triangle.svg",
          title: "Puesta en marcha",
          body: "La plataforma incorpora el innovador sistema Plex Sensor que permite identificar el dispositivo a través del destello del led. También se podrán direccionar los elementos por código QR, teléfono móvil y Bluetooth para una programación en remoto.",
        },
      ],
    },
  },

  installers: {
    metaTitle: "Instaladores y Mantenedores",
    metaDescription:
      "Diseña, instala y haz el mantenimiento de instalaciones de detección de incendios sin desplazamientos, con la I.A. de Nusku.",
    hero: {
      badge: "nusku para instaladores y mantenedores",
      title:
        "Instala y haz el mantenimiento de la instalación mediante nuestra I.A.",
      body: "Gana y optimiza su tiempo. Diseña, instala y haz el mantenimiento de la instalación sin desplazamientos y tan solo con un clic.",
      cta: "Programar una demo",
      alt: "Plataforma Nusku para instaladores y mantenedores",
    },
    install: {
      badge: "01 - instala",
      title:
        "Instala y proyecta su instalación de una forma rápida, segura y efectiva",
      body: "Gestiona cualquier instalación desde la misma plataforma NUSKU, de manera segura, ahorrando desplazamientos y ganando tiempo y agilidad.",
      cards: [
        {
          image: "/images/ilus-a-1-01.avif",
          alt: "Operaciones automatizadas por la I.A. en la plataforma Nusku",
          title: "Operaciones automatizadas por la I.A.",
          soon: true,
          body: "Automatiza las operaciones en tu instalación de forma predictiva con ayuda de la I.A.",
        },
        {
          image: "/images/ilus-a2-01.avif",
          alt: "Configuración de la instalación sobre la planimetría",
          title: "Configura la instalación y verifica con la Planimetría",
          body: "Con ayuda de la planimetría podrás acceder a los eventos de la instalación con tan solo un clic.",
        },
        {
          image: "/images/ilus-a-1-03.avif",
          alt: "Creación de escenarios en la instalación",
          title: "Crea escenarios en la instalación",
          body: "La plataforma permite crear diferentes escenarios para optimizar así la eficiencia de falsas alarmas.",
        },
        {
          image: "/images/ilus-a-1-04.avif",
          alt: "Dispositivos inteligentes conectados a la plataforma",
          title: "Dispositivos inteligentes",
          body: "El sistema permite que los dispositivos manden su estado de situación en cualquier momento.",
        },
      ],
    },
    design: {
      badge: "02 - Diseña",
      title: "Proyecta tu instalación con precisión y con todas las comodidades",
      body: "Con la herramienta de configuración de la instalación, podrás cumplir con todos los requerimientos necesarios y diseñar un proyecto a medida.",
      cards: [
        {
          image: "/images/ilus-a2-01.avif",
          alt: "Planimetría incorporada en la plataforma",
          title: "Planimetría incorporada",
          body: "La plataforma incorpora la planimetría de la instalación para ayudar a configurarla y visualizar los dispositivos.",
        },
        {
          image: "/images/ilus-a2-02.avif",
          alt: "Cálculo de rutas de evacuación",
          title: "Cálculo de rutas de evacuación",
          soon: true,
          body: "Con ayuda de la I.A. de la plataforma, podremos calcular las rutas de evacuación más idóneas para la instalación y con interacción a tiempo real.",
        },
        {
          image: "/images/ilus-a-1-04.avif",
          alt: "Dispositivos inteligentes enviando información de estado",
          title: "Dispositivos inteligentes",
          body: "Los dispositivos conectados al sistema de la plataforma, interaccionan y envían información del estado de la instalación, facilitando así su arquitectura y diseño.",
        },
        {
          image: "/images/ilus-a2-04.avif",
          alt: "Cálculo predictivo de probabilidad de fuego",
          title: "Cálculo predictivo",
          body: "La I.A. del sistema de NUSKU permite calcular el porcentaje de la probabilidad de fuego a tiempo real antes de que ocurra.",
        },
      ],
    },
    manage: {
      badge: "03 - Gestiona",
      title:
        "Gestiona tu instalación desde cualquier lugar de una forma ágil y sencilla",
      body: "Con Nusku podrás gestionar tu instalación, visualizar alertas y modificar configuraciones de una manera remota de muy fácil uso.",
      cards: [
        {
          image: "/images/ilus-a3-01.avif",
          alt: "Interacción remota con la instalación",
          title: "Interacciona con tu instalación",
          body: "Desde la plataforma podrás interaccionar y obtener información del estado de tu instalación allá donde estés.",
        },
        {
          image: "/images/ilus-a3-02.avif",
          alt: "Gestión de permisos de usuarios",
          title: "Permisos de usuarios",
          body: "En la configuración de la instalación, podrás dar permisos a los usuarios de la plataforma conforme el grado de responsabilidad del mismo.",
        },
        {
          image: "/images/ilus-a3-03.avif",
          alt: "Configuración de alarmas según nivel de riesgo",
          title: "Configuración de alarmas",
          body: "Podrás obtener la información de la tipología de la alarma de tu instalación según el nivel de importancia y calculado, basándose en el porcentaje de riesgo con ayuda de la I.A.",
        },
        {
          image: "/images/ilus-a3-04.avif",
          alt: "Conexión bidireccional con la Central Receptora",
          title: "Conexión con Central Receptora",
          body: "Estarás conectado con tu Central Receptora de Incendios de una forma bidireccional desde la aplicación e interaccionando con ellos a tiempo real para mayor verificación en caso de alarma y averías.",
        },
      ],
    },
  },

  receivers: {
    metaTitle: "Receptoras",
    metaDescription:
      "Reduce las falsas alarmas a prácticamente cero y optimiza la gestión de tu Central Receptora con la información predictiva de Nusku.",
    hero: {
      badge: "nusku para receptoras",
      title: "Reduce falsas alarmas y optimiza la gestión de tu Central Receptora",
      body: "Con la información predictiva de que dispone la plataforma, podrás reducir las falsas alarmas a prácticamente cero, ya que el sistema te aportará la probabilidad de fuego con ayuda de la I.A.",
      cta: "Programa una demo",
      alt: "Plataforma Nusku para centrales receptoras de alarmas",
    },
    secure: {
      title: "Instalaciones más seguras, más completas y más conectadas",
      body: "Accede a toda la información necesaria para informar de lo que está ocurriendo en la instalación en tiempo real y adelantarte a los acontecimientos.",
      cards: [
        {
          image: "/images/c1-01.avif",
          alt: "Sistema Plus Sensor analizando los minutos previos a una alarma",
          title: "Sistema Plus Sensor",
          body: "El sistema DM Sensor almacena 5 minutos anteriores a la alarma de fuego y se compara los algoritmos y curvas lógicas, generando una probabilidad real de fuego, en que punto se encuentra y la zona.",
        },
        {
          image: "/images/ilus-a2-02.avif",
          alt: "Detección de presencia mediante inteligencia artificial",
          title: "Detección de hombre muerto",
          soon: true,
          body: "Con ayuda de la inteligencia artificial, el sistema genera un algoritmo de detección de fuego, humo y presencia de «hombre muerto».",
        },
        {
          image: "/images/ilus-a2-01.avif",
          alt: "Planos de la instalación con itinerarios de evacuación",
          title: "Planimetría",
          body: "Acceso a planos para evaluación y revisión de espacios, localización de instalaciones y confirmación de itinerarios de evacuación en caso de emergencia.",
        },
        {
          image: "/images/b3-04.avif",
          alt: "Enlace de video verificación compartido con emergencias",
          title: "Conectividad e información",
          body: "Genera links con video verificación para consulta en tiempo real a bomberos o cualquier otra unidad de emergencia.",
        },
      ],
    },
    design: {
      title:
        "Diseña la instalación y facilita la conectividad con tu Central Receptora",
      body: "El sistema ayuda a calcular el diseño de la instalación para proyectar la solución más adecuada y para que no pierdas conectividad en ningún momento.",
      cards: [
        {
          image: "/images/ilus-a2-02.avif",
          alt: "Cálculo de rutas de evacuación",
          title: "Cálculo de rutas de evacuación",
          soon: true,
          body: "Con ayuda de la I.A. de la plataforma, podremos calcular las rutas de evacuación más idóneas para la instalación y con interacción a tiempo real.",
        },
        {
          image: "/images/b2-02.avif",
          alt: "Dispositivos compatibles con la plataforma",
          title: "Compatibilidad con dispositivos",
          body: "Proyecta la instalación con los dispositivos que mejor se adapten a las circunstancias.",
        },
        {
          image: "/images/b3-01.avif",
          alt: "Definición de escenarios y zonas de la instalación",
          title: "Diferentes escenarios",
          body: "Delimita diferentes escenarios para la instalación, acotando zonas e instancias que sean cruciales para la seguridad de la misma.",
        },
        {
          image: "/images/ilus-a2-01.avif",
          alt: "Visualización de planos de la instalación",
          title: "Planimetría",
          body: "Visualiza los planos con facilidad y diseña de manera ágil la instalación perfecta.",
        },
      ],
    },
    manage: {
      title: "Gestiona la instalación con ayuda de la I.A.",
      body: "Gestiona la instalación con ayuda de la inteligencia artificial y programa nuevos escenarios conforme las necesidades de tu cliente.",
      cards: [
        {
          image: "/images/b3-01.avif",
          alt: "Gestión de escenarios en la plataforma",
          title: "Gestión de escenarios",
          body: "Visualiza las operaciones de mayor importancia, crea nuevos escenarios y relaciona los dispositivos de la instalación con ayuda del asistente.",
        },
        {
          image: "/images/b3-02.avif",
          alt: "Alertas y avisos de la instalación",
          title: "Alertas y avisos",
          body: "Las alarmas de fuego o alertas de avería, se podrán gestionar de forma fácil por el operador de la Central Receptora, ya que con la plataforma, tendrán toda la información a tiempo real sin falsas alarmas.",
        },
        {
          image: "/images/b3-03.avif",
          alt: "Gestión de una emergencia con video verificación y planimetría",
          title: "Emergencias",
          body: "Genera de forma automática un enlace para video verificación y planimetría donde podrás compartir con los propietarios de la instalación o con los cuerpos de seguridad de forma interactiva.",
        },
        {
          image: "/images/b3-04.avif",
          alt: "Responsables de la instalación conectados a la plataforma",
          title: "Conectividad con los responsables",
          body: "Los responsables de la instalación estarán siempre conectados a la plataforma y con la posibilidad de interactuar con la Central Receptora a tiempo real.",
        },
      ],
    },
  },

  owners: {
    metaTitle: "App para Propietarios",
    metaDescription:
      "Consulta y gestiona tu instalación de detección de incendios de una manera fácil e intuitiva, con notificaciones en tiempo real.",
    hero: {
      badge: "Nusku para propietarios",
      title:
        "Consulta y gestiona tu instalación de detección de incendios de una manera fácil e intuitiva",
      body: "Consulta el estado de tu instalación y recibe notificaciones a tiempo real de los profesionales que trabajan en ella. Cualquier alarma de fuego te será notificada al instante.",
      cta: "Programa una demo",
      alt: "Aplicación de Nusku para propietarios de instalación",
    },
    cards: [
      {
        image: "/images/c1-01.avif",
        alt: "Sistema Plus Sensor analizando los minutos previos a una alarma",
        title: "Sistema Plus Sensor",
        body: "El sistema DM Sensor almacena 5 minutos anteriores a la alarma de fuego y se compara los algoritmos y curvas lógicas, generando una probabilidad real de fuego, en que punto se encuentra y la zona.",
      },
      {
        image: "/images/c1-02.avif",
        alt: "Aplicación de Nusku para propietarios de instalación",
        title: "Una aplicación moderna e intuitiva",
        body: "Gestiona y mantente comunicado con los profesionales y cuerpos de seguridad para tener la protección contra un incendio real necesaria e imprescindible en tu instalación.",
      },
      {
        image: "/images/c1-03.avif",
        alt: "Conectividad permanente con la instalación",
        title: "Conectividad 24/7",
        body: "La plataforma garantiza la conectividad en cualquier momento y en cualquier circunstancia para, de esta forma, mantenerte informado de que está pasando en tu negocio y hogar a tiempo real.",
      },
      {
        image: "/images/c1-04.avif",
        alt: "Video verificación en directo desde la aplicación",
        title: "Video verificación",
        body: "El sistema también incorpora la posibilidad de visualización de la instalación mediante video verificación. Podrás visualizar en la app a través del video en directo del estado de la situación.",
      },
    ],
  },

  contact: {
    metaTitle: "Contacta con nosotros",
    metaDescription:
      "Envíanos tus datos y programaremos una demo personalizada de la plataforma Nusku para ti.",
    badge: "Contacta",
    title:
      "Envíanos tus datos y programaremos una demo personalizada para ti",
    form: {
      nombre: "Nombre",
      apellidos: "Apellidos",
      email: "Correo electrónico",
      telefono: "Número de teléfono",
      empresa: "Nombre de la empresa",
      perfil: "Perfil",
      honeypot: "No rellenar",
      submit: "Enviar",
      submitting: "Enviando...",
      successTitle: "¡Formulario recibido!",
      successBody: "Contactaremos contigo en un plazo de 24h.",
      errorPrefix: "Oops! Hay un error al enviar el formulario. Envíanos un correo a",
      /**
       * Labels only. The value posted to /api/contact is always the Spanish
       * one, so the notification Nusku receives reads the same either way.
       */
      perfiles: [
        { value: "Instalador", label: "Instalador" },
        { value: "Mantenedor", label: "Mantenedor" },
        { value: "Receptora", label: "Receptora" },
        { value: "Propietario", label: "Propietario" },
      ],
    },
  },

  terms: {
    metaTitle: "Términos y Condiciones",
    metaDescription:
      "Términos y condiciones de uso de la plataforma Nusku Cloud S.L.",
    title: "Términos y condiciones",
    bodyBefore: "En proceso de creación. Contacta con",
    bodyAfter: "para información sobre nuestros términos y condiciones.",
  },

  notFound: {
    title: "Página no encontrada",
    body: "La página que buscas no existe o se ha movido.",
    cta: "Volver al inicio",
  },

  privacy: {
    metaTitle: "Política de privacidad",
    metaDescription:
      "Cómo Nusku recopila, utiliza y protege sus datos personales cuando usa nuestra aplicación móvil.",
    title: "Política de privacidad",
    /** Only rendered on the English page — see `en.ts`. */
    precedenceNotice: null as string | null,
    introHeading: "Introducción",
    introBody:
      "Nusku Tools («nosotros», «nuestro» o «nos») respeta su privacidad y se compromete a proteger sus datos personales. Esta política de privacidad explica cómo recopilamos, utilizamos y protegemos su información cuando usa nuestra aplicación móvil.",
    collectHeading: "Información que recopilamos",
    permissionsHeading: "Permisos y su finalidad",
    permissions: [
      {
        term: "Acceso a Internet",
        body: "Se utiliza para conectar con nuestros servidores y servicios, permitiendo funciones que requieren conectividad de red.",
      },
      {
        term: "Cámara",
        body: "Se utiliza para funciones de escaneo y captura de imágenes cuando usted inicia estas acciones.",
      },
      {
        term: "Bluetooth",
        body: "Se utiliza para conectar con dispositivos cercanos para transferencia de datos o funciones de control de dispositivos.",
      },
      {
        term: "Información de ubicación",
        body: "Se utiliza para ofrecer funciones basadas en ubicación, mejorar la detección de dispositivos Bluetooth y optimizar servicios que requieren conocer su ubicación aproximada.",
      },
    ],
    collectedHeading: "Datos que podemos recopilar",
    collected: [
      "Información del dispositivo (modelo, versión del sistema operativo)",
      "Estadísticas de uso para mejorar nuestros servicios",
      "Datos de ubicación (cuando usa funciones relacionadas)",
      "Imágenes capturadas con la cámara (solo cuando inicia la captura)",
      "Información de conexiones Bluetooth para vincular dispositivos",
    ],
    usesHeading: "Cómo utilizamos su información",
    uses: [
      "Para proporcionar y mantener nuestro servicio",
      "Para notificarle cambios en la aplicación",
      "Para ofrecer soporte técnico",
      "Para analizar patrones de uso y mejorar la aplicación",
      "Para habilitar funciones específicas que usted solicite (como conexiones Bluetooth)",
    ],
    sharingHeading: "Compartición de datos",
    sharingBody:
      "No vendemos sus datos personales. Podemos compartir información con:",
    sharing: [
      "Proveedores de servicios que colaboran en nuestras operaciones",
      "Autoridades legales cuando lo exija la ley",
    ],
    securityHeading: "Seguridad de los datos",
    securityBody:
      "Implementamos medidas de seguridad adecuadas para proteger su información contra accesos no autorizados, alteraciones, divulgaciones o destrucción. Sin embargo, ningún método de transmisión por Internet o almacenamiento electrónico es 100% seguro, por lo que no podemos garantizar seguridad absoluta.",
    rightsHeading: "Sus derechos",
    rightsBody: "Usted puede:",
    rights: [
      "Acceder a sus datos personales",
      "Solicitar corrección o eliminación de datos",
      "Excluirse de comunicaciones comerciales",
      "Desactivar permisos mediante la configuración de su dispositivo",
    ],
    rightsFooter:
      "Para ejercer estos derechos, contáctenos usando los datos proporcionados al final.",
    childrenHeading: "Privacidad infantil",
    childrenBody:
      "Nuestra aplicación no está dirigida a menores de 13 años. No recopilamos información de menores de 13 años de forma consciente. Si es padre/madre o tutor y cree que un menor nos ha proporcionado datos personales, contáctenos para tomar medidas.",
    updatesHeading: "Actualizaciones de la política",
    updatesBody:
      "Podemos actualizar esta política periódicamente por motivos operativos, legales o regulatorios. Le notificaremos cambios significativos a través de la aplicación o por correo electrónico si disponemos de su contacto.",
    contactHeading: "Contacto",
    contactBody:
      "Si tiene preguntas sobre esta política de privacidad, contáctenos en:",
    contactEmailLabel: "Correo electrónico:",
    contactSiteLabel: "Sitio web:",
  },
};

export type SiteContent = typeof es;

export default es;
