export const site = {
  name: "Geo Hernandez",
  legalName: "Geovany Hernandez",
  title: "Geo Hernandez — Portfolio",
  description:
    "I'm Geo, a product designer who codes, creating accessible digital experiences across learning, XR, and the web.",
  email: "geovanyhernandezb@gmail.com",
  url: "https://geo-hernandez.vercel.app",
  year: 2026,
  links: {
    resume:
      "https://drive.google.com/file/d/1n21aQYfOGDPCGElkCeVmpxXU86hpj_be/view?usp=sharing",
    linkedin: "https://www.linkedin.com/in/geovany-hernandez-a517471ba/",
    github: "https://github.com/geohndz",
  },
  portrait: "/framer/HxB0bRtVAFQDCK2uViIzt8757g.jpg",
  tags: ["Product Designer", "Front-End Developer", "XR", "Ed Tech"],
} as const;

export const nav = {
  about: { href: "/about", label: "About" },
  groups: [
    {
      label: "Interface Design",
      items: [
        { href: "/#case-studies", label: "Case Studies", icon: "layers" },
        { href: "/applications", label: "Applications", icon: "app" },
        { href: "/websites", label: "Websites", icon: "globe" },
        { href: "/creative-explorations", label: "Explorations", icon: "compass" },
      ],
    },
  ],
  social: [
    { href: site.links.resume, label: "Resume", external: true },
    { href: `mailto:${site.email}`, label: "Email", external: true },
    { href: site.links.linkedin, label: "LinkedIn", external: true },
    { href: site.links.github, label: "Github", external: true },
  ],
} as const;

export const about = {
  kicker: "About",
  paragraphs: [
    "I'm Geovany Hernandez, a product designer from Tegucigalpa, Honduras.",
    "I enjoy turning complex problems into simple, intuitive experiences. With a background that spans both design and development, I think beyond screens and consider how ideas move from concept to production.",
    "I'm particularly interested in interaction design, design systems, and the growing intersection of design, AI, and code. Whether I'm designing a product, building a prototype, or exploring a new technology, I'm always looking for ways to make digital experiences more useful, accessible, and enjoyable.",
    "Outside of work, you'll usually find me drinking iced lattes, running, or building side projects.",
  ],
};

export const awards = [
  {
    title: "1st Place — Interaction Design Award",
    org: "Pensacola Christian College",
    date: "Apr 2026",
    featured: true,
  },
  {
    title: "Award of Excellence",
    org: "Communication Arts",
    date: "Nov 2025",
    featured: true,
    mark: "/framer/NX2cziCzlMzFrWJhVRGpXaxaBXY.png",
  },
  {
    title: "Gold Student Addy Award",
    org: "American Advertising Federation",
    date: "Mar 2025",
    featured: true,
    mark: "/framer/8bO0mkvX6zeRyukYSsV6afcYMQ.png",
  },
  {
    title: "Silver Student Addy Award — Single",
    org: "American Advertising Federation",
    date: "Mar 2025",
    featured: false,
  },
  {
    title: "1st Place — Interaction Design Award",
    org: "Pensacola Christian College",
    date: "Apr 2024",
    featured: true,
  },
  {
    title: "Silver Student Addy Award — Online/Interactive (District)",
    org: "American Advertising Federation",
    date: "Apr 2024",
    featured: false,
  },
  {
    title: "Gold Student Addy Award — Online/Interactive (Local)",
    org: "American Advertising Federation",
    date: "Dec 2023",
    featured: false,
  },
  {
    title: "1st Place — Web Design Award",
    org: "Pensacola Christian College",
    date: "Apr 2023",
    featured: false,
  },
] as const;

export const testimonials = [
  {
    quote:
      "Geovany is a highly skilled, highly ambitious, and highly enjoyable person to have on your team. Not only are his professional skills impressive, his people skills make him an absolute joy to work with. I could always count on him to get the job done at a high quality while exceeding all expectations!",
    name: "Allison Tomash",
    role: "Digital Publishing Design Coordinator",
    photo: "/framer/TGkSLu1bWuxQ4qRafr1uZdF6g.jpg",
  },
  {
    quote:
      "Geo is an incredibly talented individual that loves to create and design new things. We love having him on the team.",
    name: "Jordan Jones",
    role: "Assistant Product Manager for Digital Publishing",
  },
] as const;

export const cta = {
  title: "Interested in working together?",
  body: "I'm seeking product design opportunities where I can drive measurable outcomes and collaborate with cross-functional teams.",
  prompt: "Let's connect.",
};
