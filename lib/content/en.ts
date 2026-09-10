import type { SiteContent } from "./es";

/**
 * British spelling throughout, and industry terms rather than literal
 * translations: `Central Receptora` → "alarm receiving centre" (the EN 50518
 * term), `planimetría` → "floor plans", `puesta en marcha` → "commissioning",
 * `hombre muerto` → "man-down". Product names (Plus Sensor, DM Sensor, Plex
 * Sensor) are left exactly as the Spanish site has them.
 */
const en: SiteContent = {

  chrome: {
    skipToContent: "Skip to content",
    homeAriaLabel: "Nusku — Home",
    mainNavLabel: "Main",
    mobileNavLabel: "Main (mobile)",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    languageNavLabel: "Language",
    demoCta: "Book a demo",
    learnMore: "Learn more",
    soon: "Coming soon",
    nav: [
      { key: "installers", label: "Installers and maintainers" },
      { key: "receivers", label: "Alarm receiving centres" },
      { key: "owners", label: "Property owners" },
    ],
  },

  footer: {
    tagline:
      "Nusku is a cloud platform for the efficient management of fire detection systems.",
    platformHeading: "Platform",
    platformLinks: [
      { key: "installers", label: "Installers and maintainers" },
      { key: "receivers", label: "Alarm receiving centres" },
      { key: "owners", label: "System owners" },
    ],
    contactHeading: "Get in touch",
    contactFormLabel: "Contact form",
    languageHeading: "Language",
    copyright: "© 2025 Copyright. Nusku Cloud S.L.",
    legalLinks: [
      { key: "terms", label: "Terms and conditions" },
      { key: "privacy", label: "Privacy policy" },
    ],
  },

  siteMeta: {
    titleDefault: "Nusku | AI fire detection",
    titleTemplate: "%s | Nusku",
    description:
      "Set up and manage fire detection systems quickly and simply, with predictive capabilities unmatched on the market.",
  },

  demoCta: {
    badge: "Book a demo",
    title: "Shall we show you what the platform can do?",
    body: "Book a demonstration and tell us what you need, so we can work out how best to help.",
    cta: "Book a demo",
  },

  support: {
    badge: "Technical support",
    title: "Technical support run by expert engineers",
    body: "Having engineers on the support desk means more specialised, more efficient help. They can diagnose complex problems quickly and offer effective solutions, which cuts downtime. Their experience also gives them a deeper understanding of the systems, and that translates into a more proactive, preventive service.",
    features: [
      {
        icon: "/images/clock.svg",
        title: "24/7 support",
        body: "Our 24/7 technical support service is built to give you the help you need from anywhere, with a team of specialists in the sector.",
      },
      {
        icon: "/images/eye.svg",
        title: "Real-time support",
        body: "Our engineers can access your account remotely to support you in real time and resolve your problem on the spot.",
      },
    ],
  },

  cloud: {
    cardTitle: "Why the cloud matters to security today",
    cardBody:
      "In the digital age, storing data in the cloud has become common and convenient practice. The security of that data, however, is a fundamental concern for many users. Fortunately, with the NUSKU platform, cloud storage and interaction solutions offer multiple layers of protection to keep your information and data safe.",
    title: "Your data, protected at all times",
    body: "Book a demonstration and tell us what you need, so we can work out how best to help.",
    features: [
      {
        icon: "/images/globe-01.svg",
        label: "Distributed architecture with limitless scalability",
      },
      {
        icon: "/images/shield-03.svg",
        label: "The industry's highest standards in security and reliability",
      },
      // NOTE: the live Webflow site repeats the first label here. Kept verbatim.
      {
        icon: "/images/data.svg",
        label: "Distributed architecture with limitless scalability",
      },
    ],
  },

  aiHighlight: {
    title: "Operations automated by AI",
    body: "Nusku is the only fire detection management platform with AI built in, saving you hours of installation and management.",
    alt: "Operations automated by Nusku's artificial intelligence",
  },

  planimetria: {
    title: "Emergency floor plans",
    body: "The platform lets you see what is happening on every installed device, tell what type it is and check the state it is in.",
    alt: "Emergency floor plan showing the state of each device",
  },

  home: {
    hero: {
      title: "Fire detection powered by AI",
      body: "Set up and manage fire detection systems quickly and simply, with predictive capabilities unmatched on the market, powered by artificial intelligence.",
      body2:
        "Our AI processes and analyses data, learns and builds algorithms, delivering revolutionary and unique solutions on a continuous basis.",
      cta: "Book a demo",
      alt: "The Nusku platform dashboard showing the state of a fire detection system",
    },
    installers: {
      badge: "Installers and maintainers",
      title: "Plan and design your perfect installation",
      body: "Nusku's AI algorithm carries out a detailed study of what the installation needs and identifies high-risk areas, making the project more effective to deliver.",
      alt: "Floor plan view with the risk areas identified by Nusku's AI",
      features: [
        {
          icon: "/images/map-02.svg",
          title: "Floor plans",
          body: "Handle incidents from the floor plan, which reports the exact coordinates of the alarm or fault on site.",
        },
        {
          icon: "/images/route.svg",
          title: "Evacuation routes",
          body: "Scaled evacuation routes calculated in real time, backing up emergency signage.",
        },
        {
          icon: "/images/star-06.svg",
          title: "Predictive maintenance",
          body: "Maintain the system remotely, with no need to visit the site.",
        },
      ],
    },
    receivers: {
      badge: "Alarm receiving centres",
      title: "Handle alarms quickly and effectively",
      body: "NUSKU's monitoring and alerting system reduces false positives and improves how they are handled, on any site and in any circumstance.",
      cardOne: {
        title: "Real-time video verification of the site",
        body: "The system monitors fire alarms in real time, making it easier to check incidents on site.",
        alt: "Video verification screen for an alarm in progress",
      },
      cardTwo: {
        title: "Direct link to the emergency services",
        body: "In an emergency, the system generates a link giving direct access to the floor plans and a live view of the site.",
        alt: "Emergency link shared with the emergency services",
      },
      cardThree: {
        title: "Automatic, personalised alerts",
        body: "Access to direct contact lists for the staff responsible for the site or the company handling its maintenance.",
        alt: "Emergency contact list in the Nusku app",
      },
    },
    owners: {
      badge: "Viewer for owners",
      title: "Give the end user a tool of their own",
      body: "We provide a tool for the end user that lets them view and interact with the alerts and events on their site.",
      alt: "Nusku's viewer for system owners",
      features: [
        {
          icon: "/images/settings-03.svg",
          title: "Site administration",
          body: "End users can administer resources for their site and stay connected to the professionals who look after it.",
        },
        {
          icon: "/images/dotpoints-02.svg",
          title: "Device overview",
          body: "The end-user tool makes it possible to interact with the devices and check their status.",
        },
        {
          icon: "/images/alert-triangle.svg",
          title: "Alarm states",
          body: "In the event of a fire alarm or a fault, the end user has everything they need to contact the alarm receiving centre or the company maintaining the site.",
        },
        {
          icon: "/images/alert-triangle.svg",
          title: "Commissioning",
          body: "The platform includes the innovative Plex Sensor system, which identifies a device by the flash of its LED. Elements can also be addressed by QR code, mobile phone and Bluetooth for remote programming.",
        },
      ],
    },
  },

  installers: {
    metaTitle: "Installers and Maintainers",
    metaDescription:
      "Design, install and maintain fire detection systems without travelling to site, with Nusku's AI.",
    hero: {
      badge: "nusku for installers and maintainers",
      title: "Install and maintain the system with our AI",
      body: "Win back your time. Design, install and maintain the system with no site visits, in a single click.",
      cta: "Book a demo",
      alt: "The Nusku platform for installers and maintainers",
    },
    install: {
      badge: "01 - install",
      title: "Install and plan the system quickly, safely and effectively",
      body: "Manage any site from the NUSKU platform itself, securely, saving journeys and gaining time and agility.",
      cards: [
        {
          image: "/images/ilus-a-1-01.avif",
          alt: "Operations automated by AI in the Nusku platform",
          title: "Operations automated by AI",
          soon: true,
          body: "Automate operations on your site predictively, with the help of AI.",
        },
        {
          image: "/images/ilus-a2-01.avif",
          alt: "Configuring the system on the floor plan",
          title: "Configure the system and verify it on the floor plan",
          body: "The floor plan gives you access to the site's events in a single click.",
        },
        {
          image: "/images/ilus-a-1-03.avif",
          alt: "Creating scenarios on site",
          title: "Create scenarios on site",
          body: "The platform lets you create different scenarios, improving how efficiently false alarms are handled.",
        },
        {
          image: "/images/ilus-a-1-04.avif",
          alt: "Smart devices connected to the platform",
          title: "Smart devices",
          body: "The system lets devices report their status at any moment.",
        },
      ],
    },
    design: {
      badge: "02 - Design",
      title: "Plan your installation precisely, and comfortably",
      body: "The system configuration tool lets you meet every requirement and design a project made to measure.",
      cards: [
        {
          image: "/images/ilus-a2-01.avif",
          alt: "Floor plans built into the platform",
          title: "Floor plans built in",
          body: "The platform includes the site's floor plans to help you configure it and see the devices.",
        },
        {
          image: "/images/ilus-a2-02.avif",
          alt: "Evacuation route calculation",
          title: "Evacuation route calculation",
          soon: true,
          body: "With the platform's AI we can calculate the most suitable evacuation routes for the site, with real-time interaction.",
        },
        {
          image: "/images/ilus-a-1-04.avif",
          alt: "Smart devices sending status information",
          title: "Smart devices",
          body: "Devices connected to the platform interact and send information on the state of the site, making its architecture and design easier.",
        },
        {
          image: "/images/ilus-a2-04.avif",
          alt: "Predictive calculation of fire probability",
          title: "Predictive calculation",
          body: "NUSKU's system AI calculates the percentage probability of fire in real time, before it happens.",
        },
      ],
    },
    manage: {
      badge: "03 - Manage",
      title: "Manage your site from anywhere, quickly and simply",
      body: "With Nusku you can manage your site, view alerts and change settings remotely, and it is very easy to use.",
      cards: [
        {
          image: "/images/ilus-a3-01.avif",
          alt: "Remote interaction with the site",
          title: "Interact with your site",
          body: "From the platform you can interact with your site and get information on its status wherever you are.",
        },
        {
          image: "/images/ilus-a3-02.avif",
          alt: "Managing user permissions",
          title: "User permissions",
          body: "In the site settings you can grant permissions to platform users according to their level of responsibility.",
        },
        {
          image: "/images/ilus-a3-03.avif",
          alt: "Configuring alarms by risk level",
          title: "Alarm configuration",
          body: "Get information on the type of alarm at your site according to its calculated level of importance, based on the risk percentage worked out by the AI.",
        },
        {
          image: "/images/ilus-a3-04.avif",
          alt: "Two-way connection with the alarm receiving centre",
          title: "Connection to the alarm receiving centre",
          body: "You will be connected to your fire alarm receiving centre both ways from the app, interacting with them in real time for better verification in the event of alarms and faults.",
        },
      ],
    },
  },

  receivers: {
    metaTitle: "Alarm Receiving Centres",
    metaDescription:
      "Cut false alarms to virtually zero and streamline how your alarm receiving centre operates, with Nusku's predictive data.",
    hero: {
      badge: "nusku for alarm receiving centres",
      title: "Cut false alarms and streamline your alarm receiving centre",
      body: "With the predictive information available to the platform, you can cut false alarms to virtually zero: the system gives you the probability of fire with the help of AI.",
      cta: "Book a demo",
      alt: "The Nusku platform for alarm receiving centres",
    },
    secure: {
      title: "Safer, more complete and better connected installations",
      body: "Get all the information you need to report what is happening on site in real time and stay ahead of events.",
      cards: [
        {
          image: "/images/c1-01.avif",
          alt: "The Plus Sensor system analysing the minutes before an alarm",
          title: "Plus Sensor system",
          body: "The DM Sensor system stores the 5 minutes before a fire alarm and compares algorithms and logic curves, generating a real probability of fire, where it is and which zone it is in.",
        },
        {
          image: "/images/ilus-a2-02.avif",
          alt: "Presence detection through artificial intelligence",
          title: "Man-down detection",
          soon: true,
          body: "With the help of artificial intelligence, the system generates an algorithm that detects fire, smoke and “man-down” presence.",
        },
        {
          image: "/images/ilus-a2-01.avif",
          alt: "Site plans with evacuation routes",
          title: "Floor plans",
          body: "Access to plans for assessing and reviewing spaces, locating installations and confirming evacuation routes in an emergency.",
        },
        {
          image: "/images/b3-04.avif",
          alt: "Video verification link shared with the emergency services",
          title: "Connectivity and information",
          body: "Generate video verification links for the fire service or any other emergency unit to consult in real time.",
        },
      ],
    },
    design: {
      title:
        "Design the installation and make connecting to your alarm receiving centre easy",
      body: "The system helps calculate the design of the installation so you can plan the most suitable solution and never lose connectivity.",
      cards: [
        {
          image: "/images/ilus-a2-02.avif",
          alt: "Evacuation route calculation",
          title: "Evacuation route calculation",
          soon: true,
          body: "With the platform's AI we can calculate the most suitable evacuation routes for the site, with real-time interaction.",
        },
        {
          image: "/images/b2-02.avif",
          alt: "Devices compatible with the platform",
          title: "Device compatibility",
          body: "Plan the installation with the devices that best suit the circumstances.",
        },
        {
          image: "/images/b3-01.avif",
          alt: "Defining scenarios and zones on site",
          title: "Different scenarios",
          body: "Set out different scenarios for the site, marking off the zones and areas that are crucial to its security.",
        },
        {
          image: "/images/ilus-a2-01.avif",
          alt: "Viewing the site plans",
          title: "Floor plans",
          body: "View the plans easily and design the perfect installation, fast.",
        },
      ],
    },
    manage: {
      title: "Manage the installation with the help of AI",
      body: "Manage the installation with the help of artificial intelligence and programme new scenarios to suit your client's needs.",
      cards: [
        {
          image: "/images/b3-01.avif",
          alt: "Managing scenarios in the platform",
          title: "Scenario management",
          body: "See the most important operations, create new scenarios and link the site's devices with help from the assistant.",
        },
        {
          image: "/images/b3-02.avif",
          alt: "Site alerts and notices",
          title: "Alerts and notices",
          body: "Fire alarms and fault alerts are easy for the alarm receiving centre operator to handle, because the platform gives them all the information in real time with no false alarms.",
        },
        {
          image: "/images/b3-03.avif",
          alt: "Handling an emergency with video verification and floor plans",
          title: "Emergencies",
          body: "Automatically generate a link to video verification and floor plans that you can share interactively with the site's owners or with the emergency services.",
        },
        {
          image: "/images/b3-04.avif",
          alt: "Site managers connected to the platform",
          title: "Connectivity with those responsible",
          body: "The people responsible for the site are always connected to the platform, with the option to interact with the alarm receiving centre in real time.",
        },
      ],
    },
  },

  owners: {
    metaTitle: "App for Owners",
    metaDescription:
      "Check and manage your fire detection system easily and intuitively, with real-time notifications.",
    hero: {
      badge: "Nusku for owners",
      title:
        "Check and manage your fire detection system easily and intuitively",
      body: "Check the status of your system and get real-time notifications from the professionals working on it. Any fire alarm is reported to you instantly.",
      cta: "Book a demo",
      alt: "The Nusku app for system owners",
    },
    cards: [
      {
        image: "/images/c1-01.avif",
        alt: "The Plus Sensor system analysing the minutes before an alarm",
        title: "Plus Sensor system",
        body: "The DM Sensor system stores the 5 minutes before a fire alarm and compares algorithms and logic curves, generating a real probability of fire, where it is and which zone it is in.",
      },
      {
        image: "/images/c1-02.avif",
        alt: "The Nusku app for system owners",
        title: "A modern, intuitive app",
        body: "Manage and stay in touch with the professionals and the emergency services, so your site has the protection against a real fire that it needs and cannot do without.",
      },
      {
        image: "/images/c1-03.avif",
        alt: "Permanent connectivity with the site",
        title: "24/7 connectivity",
        body: "The platform guarantees connectivity at any moment and in any circumstance, keeping you informed in real time about what is happening in your business and your home.",
      },
      {
        image: "/images/c1-04.avif",
        alt: "Live video verification from the app",
        title: "Video verification",
        body: "The system also offers the option of viewing the site through video verification. In the app you will be able to see the state of the situation on live video.",
      },
    ],
  },

  contact: {
    metaTitle: "Contact us",
    metaDescription:
      "Send us your details and we will arrange a personalised demo of the Nusku platform for you.",
    badge: "Contact",
    title: "Send us your details and we'll arrange a personalised demo for you",
    form: {
      nombre: "First name",
      apellidos: "Last name",
      email: "Email address",
      telefono: "Phone number",
      empresa: "Company name",
      perfil: "Profile",
      honeypot: "Do not fill in",
      submit: "Send",
      submitting: "Sending...",
      successTitle: "Form received!",
      successBody: "We'll be in touch within 24 hours.",
      errorPrefix:
        "Oops! Something went wrong sending the form. Please email us at",
      perfiles: [
        { value: "Instalador", label: "Installer" },
        { value: "Mantenedor", label: "Maintainer" },
        { value: "Receptora", label: "Alarm receiving centre" },
        { value: "Propietario", label: "Owner" },
      ],
    },
  },

  terms: {
    metaTitle: "Terms and Conditions",
    metaDescription:
      "Terms and conditions of use for the Nusku Cloud S.L. platform.",
    title: "Terms and conditions",
    bodyBefore: "Currently being drafted. Contact",
    bodyAfter: "for information about our terms and conditions.",
  },

  notFound: {
    title: "Page not found",
    body: "The page you are looking for does not exist or has moved.",
    cta: "Back to home",
  },

  privacy: {
    metaTitle: "Privacy policy",
    metaDescription:
      "How Nusku collects, uses and protects your personal data when you use our mobile app.",
    title: "Privacy policy",
    precedenceNotice:
      "This English text is a translation provided for convenience. The Spanish version of this privacy policy is the legally binding one; in the event of any discrepancy, the Spanish version prevails.",
    introHeading: "Introduction",
    introBody:
      "Nusku Tools (“we”, “our” or “us”) respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use and protect your information when you use our mobile app.",
    collectHeading: "Information we collect",
    permissionsHeading: "Permissions and their purpose",
    permissions: [
      {
        term: "Internet access",
        body: "Used to connect to our servers and services, enabling features that require network connectivity.",
      },
      {
        term: "Camera",
        body: "Used for scanning and image capture features, when you initiate those actions.",
      },
      {
        term: "Bluetooth",
        body: "Used to connect to nearby devices for data transfer or device control features.",
      },
      {
        term: "Location information",
        body: "Used to offer location-based features, improve Bluetooth device detection and optimise services that need to know your approximate location.",
      },
    ],
    collectedHeading: "Data we may collect",
    collected: [
      "Device information (model, operating system version)",
      "Usage statistics, to improve our services",
      "Location data (when you use related features)",
      "Images captured with the camera (only when you initiate the capture)",
      "Bluetooth connection information, to pair devices",
    ],
    usesHeading: "How we use your information",
    uses: [
      "To provide and maintain our service",
      "To notify you of changes to the app",
      "To offer technical support",
      "To analyse usage patterns and improve the app",
      "To enable specific features you request (such as Bluetooth connections)",
    ],
    sharingHeading: "Data sharing",
    sharingBody:
      "We do not sell your personal data. We may share information with:",
    sharing: [
      "Service providers that support our operations",
      "Legal authorities, where required by law",
    ],
    securityHeading: "Data security",
    securityBody:
      "We implement appropriate security measures to protect your information against unauthorised access, alteration, disclosure or destruction. However, no method of transmission over the Internet or of electronic storage is 100% secure, so we cannot guarantee absolute security.",
    rightsHeading: "Your rights",
    rightsBody: "You can:",
    rights: [
      "Access your personal data",
      "Request correction or deletion of data",
      "Opt out of commercial communications",
      "Disable permissions through your device settings",
    ],
    rightsFooter:
      "To exercise these rights, contact us using the details provided at the end.",
    childrenHeading: "Children's privacy",
    childrenBody:
      "Our app is not directed at children under 13. We do not knowingly collect information from children under 13. If you are a parent or guardian and believe a child has provided us with personal data, contact us so that we can take action.",
    updatesHeading: "Policy updates",
    updatesBody:
      "We may update this policy from time to time for operational, legal or regulatory reasons. We will notify you of significant changes through the app, or by email if we have your contact details.",
    contactHeading: "Contact",
    contactBody:
      "If you have questions about this privacy policy, contact us at:",
    contactEmailLabel: "Email:",
    contactSiteLabel: "Website:",
  },
};

export default en;
