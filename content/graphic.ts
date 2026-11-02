import { site } from "@/content/site";

export type GraphicFrame = {
  src: string;
  width: number;
  height: number;
  alt?: string;
};

export type GraphicProject = {
  title: string;
  year: string;
  accent: string;
  summary: string;
  image?: string;
  width?: number;
  height?: number;
  images?: GraphicFrame[];
  href?: string;
};

export function projectPoster(project: GraphicProject): GraphicFrame | null {
  if (project.images?.[0]) return project.images[0];
  if (!project.image) return null;
  return {
    src: project.image,
    width: project.width ?? 800,
    height: project.height ?? 1000,
    alt: project.title,
  };
}

export const graphic = {
  header: "Geo Hernandez",
  name: "Geo Hernandez",
  headline: ["Designing for the love", "of the game."],
  intro:
    "Sports graphics, visual storytelling, and bold creative work inspired by the energy of competition.",
  seo: "Designing for the love of the game. Sports graphics, visual storytelling, and bold creative work by Geo Hernandez.",
  email: site.email,
  linkedin: site.links.linkedin,
  instagram: site.links.instagram,
  year: site.year,
  portrait: {
    src: site.portrait,
    alt: site.legalName,
  },
  about: [
    "I'm Geo Hernandez, a graphic designer currently pursuing my master's degree in Graphic Design. I'm passionate about sports, visual storytelling, and the creative possibilities behind bringing teams, athletes, and moments to life through design.",
    "From game-day graphics to player features and promotional campaigns, I explore how bold visuals and thoughtful composition can capture the emotion, energy, and identity of sports.",
  ],
  interests: [
    {
      src: "/media/about/matcha-v3.png",
      label: "Matcha",
      width: 438,
      height: 748,
    },
    {
      src: "/media/about/got.jpg",
      label: "Ice and Fire",
      width: 240,
      height: 360,
      framed: true,
    },
    {
      src: "/media/about/adizero-v3.png",
      label: "Running",
      width: 500,
      height: 242,
    },
  ],
} as const;

export const graphicProjects: GraphicProject[] = [
  {
    title: "Milwaukee Divers | Sports Mascot & Identity",
    year: "",
    accent: "#B3710B",
    summary:
      "A graduate school project exploring the creation of an original sports mascot with complete creative freedom. Developing the Milwaukee Divers, a fictional lacrosse team inspired by Milwaukee's identity and a vintage diving helmet, I expanded the concept into a visual identity system featuring mascot illustrations, game day graphics, and promotional compositions.",
    images: [
      {
        src: "/media/graphic/milwaukee-divers-identity.jpg",
        width: 768,
        height: 1024,
        alt: "Milwaukee Divers mascot and identity pieces",
      },
      {
        src: "/media/graphic/milwaukee-divers-gameday.jpg",
        width: 768,
        height: 1024,
        alt: "Milwaukee Divers game day graphic",
      },
    ],
  },
  {
    title: "Delta Psi Delta | Raiders Mascot Expansion",
    year: "",
    accent: "#CB1F21",
    summary:
      "An illustration project commissioned by the president of Delta Psi Delta to expand the organization's existing Raiders mascot beyond its original bust illustration. I developed a full-body character while preserving the established identity, extending its visual presence through additional poses, color treatments, and promotional compositions.",
    images: [
      {
        src: "/media/graphic/raiders-3.jpg",
        width: 768,
        height: 1024,
        alt: "Delta Psi Delta Raiders red illustration",
      },
      {
        src: "/media/graphic/raiders-4.jpg",
        width: 768,
        height: 1024,
        alt: "Delta Psi Delta Raiders full-body mascot",
      },
      {
        src: "/media/graphic/raiders-5.jpg",
        width: 768,
        height: 1024,
        alt: "Delta Psi Delta Raiders mascot mark",
      },
    ],
  },
  {
    title: "Southern Wesleyan | Women's Lacrosse",
    year: "",
    accent: "#1124BA",
    summary:
      "A social media graphic promoting a women's lacrosse scrimmage for Southern Wesleyan University. Combining bold collegiate typography, layered photography, and a striking monochromatic treatment, the composition brings together athletic identity and visual storytelling to build excitement around the matchup.",
    image: "/media/graphic/southern-wesleyan-lacrosse.jpg",
    width: 768,
    height: 1024,
  },
  {
    title: "Ice Flyers | Game Day Victory",
    year: "",
    accent: "#3A6B97",
    summary:
      "Inspired by the atmosphere and excitement of my first Pensacola Ice Flyers game, this personal exploration captures the energy of a Friday night victory through bold typography, cinematic composition, and aviation-inspired imagery.",
    image: "/media/graphic/ice-flyers-victory.jpg",
    width: 768,
    height: 1024,
  },
  {
    title: "Formula 1 | Driver Collection",
    year: "",
    accent: "#8E1524",
    summary:
      "Created as part of my undergraduate Directed Studio course, this poster series explores Formula 1 driver portraits through a collectible card-inspired design system. Each composition combines layered photography, signature details, driver statistics, and team-specific color palettes to create a distinct visual identity while maintaining consistency across the collection.",
    images: [
      {
        src: "/media/graphic/f1-hamilton.jpg",
        width: 791,
        height: 1024,
        alt: "Lewis Hamilton, Scuderia Ferrari",
      },
      {
        src: "/media/graphic/f1-norris.jpg",
        width: 791,
        height: 1024,
        alt: "Lando Norris, McLaren",
      },
      {
        src: "/media/graphic/f1-russell.jpg",
        width: 791,
        height: 1024,
        alt: "George Russell, Mercedes",
      },
    ],
  },
  {
    title: "Lyssie Metzker | 1,000 Career Digs & Kills",
    year: "",
    accent: "#14486A",
    summary:
      "A celebratory player graphic for Pensacola Christian College's Lady Eagles Volleyball team, recognizing Lyssie Metzker's milestone of 1,000 career digs. Combining oversized typography, layered photography, and bold team colors, the composition captures the energy of the sport while putting the athlete and her achievement front and center.",
    image: "/media/graphic/lyssie-metzker-digs.jpg",
    width: 768,
    height: 1024,
  },
  {
    title: "Max Verstappen | Visual Explorations",
    year: "",
    accent: "#E2186A",
    summary:
      "A poster series celebrating Max Verstappen through three distinct visual directions. This exploration focuses on pushing color, composition, typography, and photographic treatments while maintaining a consistent visual essence across each piece. The result is a collection that celebrates the driver's identity through contrasting yet cohesive graphic expressions.",
    images: [
      {
        src: "/media/graphic/verstappen-1.jpg",
        width: 791,
        height: 1024,
        alt: "Max Verstappen celebration poster",
      },
      {
        src: "/media/graphic/verstappen-2.jpg",
        width: 791,
        height: 1024,
        alt: "Oracle Red Bull Racing car poster",
      },
      {
        src: "/media/graphic/verstappen-3.jpg",
        width: 791,
        height: 1024,
        alt: "Max Verstappen portrait poster",
      },
    ],
  },
  {
    title: "Beta Psi Delta | Jaguars Athletics",
    year: "",
    accent: "#0092C9",
    summary:
      "A collection of sports graphics and photography created for Beta Psi Delta throughout my sophomore and junior years of college. As the elected Collegian Representative responsible for the organization's social media, I developed promotional graphics, athletic photography, and visual content for various sports and events. This experience became the foundation of my journey into sports graphic design, providing an opportunity to experiment with typography, color treatments, and athletic storytelling while developing an early understanding of sports branding and visual communication.",
    images: [
      {
        src: "/media/graphic/bpd-softball-champions.jpg",
        width: 1024,
        height: 1024,
        alt: "Beta Psi Delta 2023 softball champions graphic",
      },
      {
        src: "/media/graphic/bpd-welcome.jpg",
        width: 1024,
        height: 1024,
        alt: "Beta Psi Delta welcome graphic",
      },
      {
        src: "/media/graphic/bpd-soccer-schedule.jpg",
        width: 1024,
        height: 1024,
        alt: "Beta Psi Delta 2023 soccer schedule",
      },
      {
        src: "/media/graphic/bpd-soccer-lineup.jpg",
        width: 1024,
        height: 1024,
        alt: "Beta Psi Delta soccer lineup",
      },
      {
        src: "/media/graphic/bpd-jaguars.jpg",
        width: 1024,
        height: 1024,
        alt: "Beta Psi Delta Jaguars graphic",
      },
    ],
  },
];
