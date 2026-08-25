export const site = {
  name: "Geo Hernandez",
  legalName: "Geovany Hernandez",
  title: "Geo Hernandez | Product & Interaction Designer",
  description:
    "I'm Geo, a product and interaction designer who codes. I prototype accessible experiences across learning, XR, and the web.",
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
  tags: ["Product Design", "Interaction Design", "Prototyping", "UX Engineering"],
} as const;

export const nav = {
  about: { href: "/about", label: "About" },
  groups: [
    {
      label: "Product & Interaction",
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
  seo: "Geovany Hernandez is a product and interaction designer who prototypes accessible digital experiences, design systems, and AI-powered tools.",
  paragraphs: [
    "I'm Geo, a product and interaction designer who likes figuring out how things work, and how they could work better.",
    "My background started in graphic design, where I learned to think about composition, typography, visual systems, and the details that make an experience feel intentional. Over time, that curiosity pulled me toward UX and product design, where I could apply those same principles to more complex problems and interactive experiences.",
    "Today, I work across product design, interaction design, prototyping, and front-end development. I enjoy moving between the abstract and the tangible: understanding a problem, mapping out a system, designing the interaction, and then building enough of it to see whether the idea actually works.",
    "I'm particularly drawn to projects involving complex information, learning, emerging technology, and new ways of interacting with digital products. Whether it's a classroom map, a spatial interface, or a small web experiment, I'm interested in making complicated things feel clear, approachable, and engaging.",
    "I also like to explore outside of client and product work. I build experiments, play with new technologies, and occasionally make things simply because I'm curious about what happens when I try.",
  ],
};

export const awards = [
  {
    title: "1st Place, Interaction Design Award",
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
    title: "Silver Student Addy Award, Single",
    org: "American Advertising Federation",
    date: "Mar 2025",
    featured: false,
  },
  {
    title: "1st Place, Interaction Design Award",
    org: "Pensacola Christian College",
    date: "Apr 2024",
    featured: true,
  },
  {
    title: "Silver Student Addy Award, Online/Interactive (District)",
    org: "American Advertising Federation",
    date: "Apr 2024",
    featured: false,
  },
  {
    title: "Gold Student Addy Award, Online/Interactive (Local)",
    org: "American Advertising Federation",
    date: "Dec 2023",
    featured: false,
  },
  {
    title: "1st Place, Web Design Award",
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
  body: "I'm looking for product and interaction design roles where I can prototype, ship, and work closely with engineering and product.",
  prompt: "Let's connect.",
};
