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
    description: "Digital products designed to solve real user problems.",
    image: "/framer/qVuyyXji5e2C5IXRTmxmIYrRiI.png",
    kind: "phone" as const,
  },
  {
    href: "/websites",
    title: "Websites",
    description: "Web experiences that bring brands and ideas to life.",
    image: "/framer/ZDRvPYAfkwMkZWU4Ul2fM2gIx1c.png",
    kind: "desktop" as const,
  },
  {
    href: "/creative-explorations",
    title: "Explorations",
    description: "Experiments, tools, and AI-powered ideas built for fun and discovery.",
    image: "/framer/St6jaSSTgPDkJdEtg8qx9xI4.png",
    kind: "desktop" as const,
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
};

export const applications: GalleryProject[] = [
  {
    slug: "sunset-sports",
    title: "Sunset Sports",
    description:
      "A community sports app designed to make discovering and joining local games effortless.",
    image: "/framer/WiIF1qpC2bZtaukpYlnoFeQM.png",
    images: [
      "/framer/WiIF1qpC2bZtaukpYlnoFeQM.png",
      "/framer/A8Zoe0Ic2vf0le9KGdTitHnbpI.png",
    ],
    kind: "phone",
  },
  {
    slug: "healthcoach",
    title: "HealthCoach",
    description:
      "A redesign of the Beurer weight tracking app, improving navigation and data clarity for seamless daily check-ins.",
    image: "/framer/KwZhBcclOrhOqat45QIE3NzuTQ.png",
    kind: "phone",
  },
  {
    slug: "mount-blanco",
    title: "Mount Blanco",
    description:
      "A ski resort companion app that brings lift passes, lessons, trail maps, and activity tracking into one seamless experience.",
    image: "/framer/dqRaGhOr63PiIeDoI79v5A4LTkA.png",
    kind: "phone",
  },
  {
    slug: "mobile-order",
    title: "Mobile Order",
    description:
      "A campus ordering app redesign focused on speed, clarity, and a more engaging experience.",
    image: "/framer/CMGHQJvEF6AMOALyDfdJthtEVTg.png",
    kind: "phone",
  },
];

export const websites: GalleryProject[] = [
  {
    slug: "automotive-alternative",
    title: "Automotive Alternative",
    kicker: "Service",
    description:
      "Redesigned a local automotive repair shop's website to improve trust, simplify service discovery, and streamline appointment requests. The new experience modernizes the brand while making it easier for customers to explore services and request estimates.",
    href: "https://automotive-alternative.vercel.app/",
    image: "/framer/ZDRvPYAfkwMkZWU4Ul2fM2gIx1c.png",
    video: "/framer/e59Eq7ErLjufzLDJZPM6QfrqF1Q.mp4",
    kind: "desktop",
  },
  {
    slug: "colle-days",
    title: "Colle Days",
    kicker: "Landing Page",
    description:
      "A complete redesign of Pensacola Christian College's College Days promotional experience. As part of a student-led design studio, I designed and developed the website, consolidating five separate pages into a single streamlined experience over four weeks.",
    href: "https://collegedays.framer.website/",
    image: "/framer/3sW34rxaU9OVtbcz83IU0ZGHL2M.png",
    video: "/framer/dG4XezHk2kzBPLQIJFXGnTma4.mp4",
    kind: "desktop",
  },
  {
    slug: "christina-kline",
    title: "Christina Kline — Portfolio",
    kicker: "Portfolio",
    description:
      "Designed and developed a custom portfolio website that translated Christina's visual identity into an engaging digital experience. Over three months, we collaborated to create a site that showcases her work while reinforcing her personal brand.",
    href: "https://christina-kline.framer.website/",
    video: "/framer/EfJkb8RNqvsph1uTGn7OtOYHU.mp4",
    kind: "desktop",
  },
];

export const explorations: GalleryProject[] = [
  {
    slug: "gridform",
    title: "GridForm",
    kicker: "Web Application Design",
    description:
      "Experiment-driven tool for generating custom motion patterns and visual noise — designed to explore interface interactions and build practical prototyping assets.",
    video: "/framer/brBgYqyspX9gbV64MER9TYhbCQE.mp4",
    kind: "desktop",
    tools: ["Experimental Interface", "Custom Pattern Engine", "Design Utility"],
  },
  {
    slug: "plane-tracker",
    title: "Plane Tracker",
    meta: "32 Prompts · 3.5 Hours",
    description:
      "As a lifelong aviation enthusiast, I was fascinated when I discovered that live aircraft data is publicly available. That curiosity led to a simple question: What if I could build my own Ace Combat-style radar that showed real-time aircraft and weather around me? Plane Tracker is an exploration of real-time data visualization and aviation-inspired interface design.",
    image: "/framer/St6jaSSTgPDkJdEtg8qx9xI4.png",
    video: "/framer/SE1kveylJ0Gt3sCmFv45VWFyuU.mp4",
    kind: "desktop",
    tools: ["Cursor", "JavaScript", "MapLibre GL", "ADS-B flight data", "OpenWeather"],
  },
  {
    slug: "chemistry-structure-builder",
    title: "Chemistry Structure Builder",
    meta: "57 Prompts · 6 Hours",
    description:
      "This project explores how AI can accelerate interaction design for complex educational tools. Starting with a simple question: could AI help prototype a molecule editor with professional-grade interactions? I designed and built an application that lets users construct molecules through direct manipulation, complete with drag-and-drop atoms, functional groups, automatic bond validation, compound recognition, and interactive editing.",
    video: "/framer/CqFQC5KqcLIkWaNHqDDlpo26Jfw.mp4",
    kind: "desktop",
    tools: ["Cursor", "JavaScript", "Interaction Design", "Educational Technology"],
  },
];

export const pageIntros = {
  applications: {
    title: "Where strategy meets interaction",
    body: "A selection of product design work focused on solving real user problems through thoughtful UX, scalable systems, and polished interfaces.",
  },
  websites: {
    title: "Where brands come to life online",
    body: "From portfolio sites to marketing experiences, these projects combine strong visual design, thoughtful user journeys, and modern web craftsmanship.",
  },
  explorations: {
    title: "Exploring what happens when design, code, and AI intersect",
    body: "A growing collection of concepts, tools, and experiments built to learn, prototype faster, and push ideas beyond the sketchbook. Each experiment begins with a question rather than a specification.",
  },
} as const;
