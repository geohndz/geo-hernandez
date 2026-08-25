export type CaseStudyMeta = {
  slug: string;
  href: string;
  title: string;
  category: string;
  summary: string;
  tags: string[];
  video?: string;
  poster?: string;
  heroImage?: string;
  deviceImage?: string;
  deviceAspect?: string;
  carousel?: {
    top: string[];
    bottom: string[];
  };
};

export const caseStudies: CaseStudyMeta[] = [
  {
    slug: "world-geography",
    href: "/interface/world-geography",
    title: "Interactive Geography Learning Tool",
    category: "EdTech Product Design",
    summary:
      "Teachers needed one map they could teach with. Layered curriculum maps, live annotation, and a builder that cut production time in half.",
    tags: ["Interaction Design", "Usability", "UX Engineering"],
    video: "/media/world-geography/demo.mp4",
    poster: "/media/world-geography/slide-01.jpg",
    heroImage: "/media/world-geography/hero.webp",
    carousel: {
      top: [
        "/media/world-geography/slide-01.jpg",
        "/media/world-geography/slide-03.jpg",
        "/media/world-geography/slide-05.jpg",
        "/media/world-geography/slide-07.jpg",
        "/media/world-geography/slide-02.jpg",
        "/media/world-geography/slide-08.jpg",
      ],
      bottom: [
        "/media/world-geography/slide-04.jpg",
        "/media/world-geography/slide-06.jpg",
        "/media/world-geography/slide-08.jpg",
        "/media/world-geography/slide-02.jpg",
        "/media/world-geography/slide-01.jpg",
        "/media/world-geography/slide-03.jpg",
      ],
    },
  },
  {
    slug: "formula-1",
    href: "/interface/formula-1",
    title: "VR Formula 1 Telemetry Dashboard",
    category: "XR / Data Visualization",
    summary:
      "Fans already juggle a broadcast, cameras, and a leaderboard. I designed a VR companion that keeps the race in front of you and the data around you.",
    tags: ["Spatial UX", "Virtual Reality", "Systems Design"],
    video: "/framer/cjQ9YiJjDjG3HaVSSfx9flzvew.mp4",
    poster: "/framer/EkpxfXbrQiCNf04Ca1kjdcPGi0.png",
    heroImage: "/framer/EkpxfXbrQiCNf04Ca1kjdcPGi0.png",
    deviceImage: "/media/formula-1/hero.webp",
    deviceAspect: "30 / 17",
    carousel: {
      top: [
        "/media/formula-1/cameras.webp",
        "/media/formula-1/onboard-russell.webp",
        "/media/formula-1/yellow-flag.webp",
        "/media/formula-1/leaderboard.webp",
        "/media/formula-1/video-tag.webp",
      ],
      bottom: [
        "/media/formula-1/info.webp",
        "/media/formula-1/driver-tag.webp",
        "/media/formula-1/onboard-default.webp",
        "/media/formula-1/cameras.webp",
        "/media/formula-1/yellow-flag.webp",
      ],
    },
  },
];

export const workIndex = [
  {
    href: "/applications",
    title: "Applications",
    description: "Product design for mobile apps, from user flows to high-fidelity interfaces.",
    image: "/media/mobile-order/splash.png",
    kind: "phone" as const,
    sheets: [
      { image: "/media/sunset-sports/splash-2.png" },
      { image: "/media/health-coach/onboarding.png" },
    ],
  },
  {
    href: "/websites",
    title: "Websites",
    description: "Brand-led websites with visual craft, responsive layouts, and clear user journeys.",
    image: "/framer/ZDRvPYAfkwMkZWU4Ul2fM2gIx1c.png",
    video: "/framer/e59Eq7ErLjufzLDJZPM6QfrqF1Q.mp4",
    kind: "desktop" as const,
    sheets: [
      { image: "/framer/3sW34rxaU9OVtbcz83IU0ZGHL2M.png" },
      { video: "/framer/EfJkb8RNqvsph1uTGn7OtOYHU.mp4" },
    ],
  },
  {
    href: "/creative-explorations",
    title: "Explorations",
    description: "AI-assisted prototypes, interaction experiments, and tools built to learn fast.",
    image: "/framer/St6jaSSTgPDkJdEtg8qx9xI4.png",
    video: "/framer/SE1kveylJ0Gt3sCmFv45VWFyuU.mp4",
    kind: "desktop" as const,
    sheets: [
      { video: "/framer/brBgYqyspX9gbV64MER9TYhbCQE.mp4" },
      { video: "/media/eagles-nest/redesign.mp4" },
    ],
  },
];

export type GalleryProject = {
  slug: string;
  title: string;
  description: string;
  kicker?: string;
  href?: string;
  image?: string;
  video?: string;
  images?: string[];
  kind: "phone" | "desktop";
  meta?: string;
  tools?: string[];
  tags?: string[];
  category?: string;
  wash?: "orange" | "red" | "navy" | "ice";
  award?: {
    src: string;
    href: string;
    label: string;
  };
  challenge?: string;
  focus?: string;
  contribution?: string;
  sequence?: string[];
  carousel?: {
    top: string[];
    bottom: string[];
  };
};

export const applications: GalleryProject[] = [
  {
    slug: "sunset-sports",
    title: "Sunset Sports",
    category: "Community App",
    description:
      "A community sports app with a clear path from splash to session. Users find nearby games and join in a few taps.",
    challenge:
      "Finding local pickup games required searching across disconnected platforms.",
    focus: "Discovery, joining, session management",
    contribution: "Product strategy · UX/UI · interaction design",
    image: "/media/sunset-sports/home.png",
    sequence: [
      "/media/sunset-sports/splash.png",
      "/media/sunset-sports/splash-2.png",
      "/media/sunset-sports/splash-3.png",
      "/media/sunset-sports/onboarding.png",
      "/media/sunset-sports/onboarding-2.png",
      "/media/sunset-sports/onboarding-3.png",
      "/media/sunset-sports/onboarding-4.png",
      "/media/sunset-sports/onboarding-5.png",
      "/media/sunset-sports/home.png",
      "/media/sunset-sports/map.png",
      "/media/sunset-sports/you.png",
      "/media/sunset-sports/achievements.png",
      "/media/sunset-sports/medal.png",
      "/media/sunset-sports/settings.png",
      "/media/sunset-sports/activity.png",
      "/media/sunset-sports/activity-loading.png",
      "/media/sunset-sports/activity-success.png",
    ],
    carousel: {
      top: [
        "/media/sunset-sports/splash.png",
        "/media/sunset-sports/you.png",
        "/media/sunset-sports/achievements.png",
        "/media/sunset-sports/medal.png",
        "/media/sunset-sports/splash-2.png",
        "/media/sunset-sports/splash-3.png",
      ],
      bottom: [
        "/media/sunset-sports/onboarding.png",
        "/media/sunset-sports/create-session.png",
        "/media/sunset-sports/settings.png",
        "/media/sunset-sports/onboarding-5.png",
        "/media/sunset-sports/activity-share.png",
        "/media/sunset-sports/activity-leave.png",
      ],
    },
    wash: "orange",
    kind: "phone",
    tags: ["Interaction Design", "User Flows", "Mobile"],
  },
  {
    slug: "healthcoach",
    title: "HealthCoach",
    category: "Health App",
    description:
      "A product redesign of Beurer's weight tracking app. I simplified navigation and made body metrics easier to scan for daily check-ins.",
    challenge:
      "Daily body metrics were buried in cluttered navigation that made check-ins feel like work.",
    focus: "Navigation, metric scanning, daily check-ins",
    contribution: "Product redesign · UX/UI · data visualization",
    image: "/media/health-coach/onboarding.png",
    sequence: [
      "/media/health-coach/onboarding.png",
      "/media/health-coach/metrics.png",
      "/media/health-coach/metrics-2.png",
      "/media/health-coach/metrics-3.png",
      "/media/health-coach/search.png",
      "/media/health-coach/search-2.png",
      "/media/health-coach/entry.png",
      "/media/health-coach/tables.png",
      "/media/health-coach/tables-2.png",
    ],
    carousel: {
      top: [
        "/media/health-coach/onboarding.png",
        "/media/health-coach/metrics.png",
        "/media/health-coach/search.png",
        "/media/health-coach/tables.png",
        "/media/health-coach/metrics-3.png",
      ],
      bottom: [
        "/media/health-coach/metrics-2.png",
        "/media/health-coach/search-2.png",
        "/media/health-coach/entry.png",
        "/media/health-coach/tables-2.png",
        "/media/health-coach/onboarding.png",
      ],
    },
    wash: "red",
    kind: "phone",
    tags: ["Product Design", "UX", "Data Visualization"],
  },
  {
    slug: "mount-blanco",
    title: "Mount Blanco",
    category: "Resort App",
    description:
      "A ski resort companion that puts lift passes, lessons, trail maps, and activity tracking in one product. Designed for complex workflows on mobile.",
    challenge:
      "Guests juggled lift passes, lessons, maps, and activity tracking across separate touchpoints.",
    focus: "Passes, lessons, trail maps, activity tracking",
    contribution: "Product strategy · complex workflows · mobile UX",
    image: "/media/mount-blanco/home.png",
    sequence: [
      "/media/mount-blanco/home.png",
      "/media/mount-blanco/pass.png",
      "/media/mount-blanco/map.png",
      "/media/mount-blanco/lesson.png",
      "/media/mount-blanco/lesson-2.png",
      "/media/mount-blanco/stats.png",
    ],
    carousel: {
      top: [
        "/media/mount-blanco/home.png",
        "/media/mount-blanco/map.png",
        "/media/mount-blanco/lesson.png",
        "/media/mount-blanco/stats.png",
      ],
      bottom: [
        "/media/mount-blanco/pass.png",
        "/media/mount-blanco/lesson-2.png",
        "/media/mount-blanco/home.png",
        "/media/mount-blanco/map.png",
      ],
    },
    wash: "ice",
    kind: "phone",
    tags: ["Product Design", "Complex Workflows", "Mobile"],
  },
  {
    slug: "mobile-order",
    title: "Mobile Order",
    category: "Campus App",
    description:
      "A campus ordering redesign focused on speed, visual hierarchy, and a clearer pickup flow from home to scan to cart.",
    challenge:
      "Campus ordering was slow to scan, with a pickup flow that buried the next step.",
    focus: "Speed, visual hierarchy, pickup flow",
    contribution: "Visual design · interaction design · mobile UX",
    image: "/media/mobile-order/home.png",
    sequence: [
      "/media/mobile-order/splash.png",
      "/media/mobile-order/home.png",
      "/media/mobile-order/reorder.png",
      "/media/mobile-order/scan.png",
      "/media/mobile-order/scan-2.png",
      "/media/mobile-order/cart.png",
    ],
    carousel: {
      top: [
        "/media/mobile-order/splash.png",
        "/media/mobile-order/home.png",
        "/media/mobile-order/scan.png",
        "/media/mobile-order/cart.png",
      ],
      bottom: [
        "/media/mobile-order/reorder.png",
        "/media/mobile-order/scan-2.png",
        "/media/mobile-order/splash.png",
        "/media/mobile-order/home.png",
      ],
    },
    wash: "navy",
    kind: "phone",
    tags: ["Visual Design", "Interaction Design", "Mobile"],
  },
];

export const websites: GalleryProject[] = [
  {
    slug: "automotive-alternative",
    title: "Automotive Alternative",
    kicker: "Service",
    description:
      "A local auto shop site redesigned for trust and faster service discovery. I modernized the brand and made estimates and appointments easier to request.",
    href: "https://automotive-alternative.vercel.app/",
    image: "/framer/ZDRvPYAfkwMkZWU4Ul2fM2gIx1c.png",
    video: "/framer/e59Eq7ErLjufzLDJZPM6QfrqF1Q.mp4",
    kind: "desktop",
    tools: ["Visual Design", "Brand", "Responsive"],
  },
  {
    slug: "colle-days",
    title: "Colle Days",
    kicker: "Landing Page",
    description:
      "A College Days site for Pensacola Christian College. I designed and built it in a student studio, collapsing five pages into one promotional experience in four weeks.",
    href: "https://collegedays.framer.website/",
    image: "/framer/3sW34rxaU9OVtbcz83IU0ZGHL2M.png",
    video: "/framer/dG4XezHk2kzBPLQIJFXGnTma4.mp4",
    kind: "desktop",
    tools: ["Web Design", "UX", "Responsive"],
  },
  {
    slug: "christina-kline",
    title: "Christina Kline Portfolio",
    kicker: "Portfolio",
    description:
      "A custom portfolio that translates Christina's visual identity into a digital experience. We collaborated for three months on craft, layout, and brand.",
    href: "https://christina-kline.framer.website/",
    video: "/framer/EfJkb8RNqvsph1uTGn7OtOYHU.mp4",
    kind: "desktop",
    tools: ["Visual Design", "Brand Identity", "Web"],
  },
];

export const explorations: GalleryProject[] = [
  {
    slug: "eagles-nest",
    title: "Eagle's Nest",
    kicker: "AI-First Portal",
    category: "AI-First Portal",
    description:
      "What if my college's student portal was AI-first? I rebuilt Eagle's Nest from a dense widget dashboard into a modern interface centered on intelligent assistance.",
    image: "/media/eagles-nest/current.jpg",
    video: "/media/eagles-nest/redesign.mp4",
    kind: "desktop",
    tools: ["AI-First UX", "Prototyping", "Interaction Design"],
  },
  {
    slug: "gridform",
    title: "GridForm",
    kicker: "Web Application Design",
    category: "Web Application Design",
    description:
      "A tool for generating custom motion patterns and visual noise. I used it to explore interface interactions and produce prototyping assets.",
    href: "https://geohndz.github.io/GridForm/",
    award: {
      src: "/media/awards/ca-award-of-excellence.png",
      href: "https://www.commarts.com/project/38688/gridform",
      label: "Communication Arts Award of Excellence",
    },
    video: "/framer/brBgYqyspX9gbV64MER9TYhbCQE.mp4",
    kind: "desktop",
    tools: ["Prototyping", "Motion", "Experimental Interface"],
  },
  {
    slug: "plane-tracker",
    title: "Plane Tracker",
    category: "Data Visualization",
    meta: "32 Prompts · 3.5 Hours",
    description:
      "Live aircraft data is public, so I asked what an Ace Combat-style radar would look like with real planes and weather around me. Plane Tracker is a real-time visualization prototype.",
    image: "/framer/St6jaSSTgPDkJdEtg8qx9xI4.png",
    video: "/framer/SE1kveylJ0Gt3sCmFv45VWFyuU.mp4",
    kind: "desktop",
    tools: ["Cursor", "JavaScript", "MapLibre GL", "ADS-B flight data", "OpenWeather"],
  },
  {
    slug: "chemistry-structure-builder",
    title: "Chemistry Structure Builder",
    category: "Educational Technology",
    meta: "57 Prompts · 6 Hours",
    description:
      "Could AI help prototype a molecule editor with professional-grade interactions? I designed and built one: drag-and-drop atoms, bond validation, and compound recognition, from concept to a working demo.",
    video: "/framer/CqFQC5KqcLIkWaNHqDDlpo26Jfw.mp4",
    kind: "desktop",
    tools: ["Interaction Design", "Prototyping", "AI"],
  },
];

export const pageIntros = {
  applications: {
    title: "Where strategy meets interaction",
    body: "Mobile products designed with user-centered flows, clear visual systems, and interaction patterns you can prototype and ship.",
  },
  websites: {
    title: "Where brands come to life online",
    body: "Brand-led websites with strong visual craft, responsive layouts, and journeys that feel considered from first click to handoff.",
  },
  explorations: {
    title: "Where design, code, and AI meet",
    body: "Prototypes and experiments where I test interaction ideas, AI-assisted workflows, and tools that start as questions.",
  },
} as const;
