export const site = {
  name: "Geo Hernandez",
  legalName: "Geovany Hernandez",
  title: "Geo Hernandez | Product & Interaction Designer",
  description:
    "I'm Geo Hernandez, an Interaction Designer focused on making digital products feel intuitive, purposeful, and a little more human.",
  email: "geovanyhernandezb@gmail.com",
  url: "https://geohernandez.xyz",
  year: 2026,
  links: {
    resume:
      "https://drive.google.com/file/d/1k80I14P1EY1aAHVBna9LdYbiGln2Lq5w/view?usp=sharing",
    linkedin: "https://www.linkedin.com/in/geovany-hernandez-a517471ba/",
    github: "https://github.com/geohndz",
  },
  portrait: "/media/geo.jpg",
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
  seo: "I'm Geo Hernandez, an Interaction Designer focused on making digital products feel intuitive, purposeful, and a little more human.",
  paragraphs: [
    "I'm Geo Hernandez, an Interaction Designer focused on making digital products feel intuitive, purposeful, and a little more human.",
    "I started in graphic design, learning composition, type, and visual systems. That is still how I tell if an interface feels considered.",
    "The work that keeps showing up is a real workflow that does not fit on one tidy screen. I sit with how people actually teach, check, or decide. Then I design the interaction and write enough front-end to find where it breaks.",
    "I want the task to stay louder than the chrome. If someone is in the middle of a lesson or a daily check-in, the product should get out of the way.",
    "When I am not on a product, I build small tools to test an interaction idea in code, sometimes with AI in the loop.",
  ],
};

export const aboutStickers = [
  {
    src: "/media/about/matcha-v3.png",
    label: "iced matcha for life",
    width: 438,
    height: 748,
    framed: false,
  },
  {
    src: "/media/about/got.jpg",
    label: "ASoIaF brainrot",
    width: 240,
    height: 360,
    framed: true,
  },
  {
    src: "/media/about/adizero-v3.png",
    label: "zone 2 gang",
    width: 500,
    height: 242,
    framed: false,
  },
] as const;

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
    mark: "/media/awards/ca-award-of-excellence.png",
  },
  {
    title: "Gold Student Addy Award",
    org: "American Advertising Federation",
    date: "Mar 2025",
    featured: true,
  },
  {
    title: "Silver Student Addy Award, Single",
    org: "American Advertising Federation",
    date: "Mar 2025",
    featured: true,
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
  aside: "Or stay a while and run.",
};
