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
  copy: string;
  image?: string;
  width?: number;
  height?: number;
  images?: GraphicFrame[];
  href?: string;
  studyHref?: string;
};

const singleImageAlts: Record<string, string> = {
  "/media/graphic/southern-wesleyan-lacrosse.jpg":
    "Southern Wesleyan women's lacrosse scrimmage announcement graphic",
  "/media/graphic/ice-flyers-victory.jpg":
    "Pensacola Ice Flyers Friday night victory game-day graphic",
};

export function projectPoster(project: GraphicProject): GraphicFrame | null {
  if (project.images?.[0]) return project.images[0];
  if (!project.image) return null;
  return {
    src: project.image,
    width: project.width ?? 800,
    height: project.height ?? 1000,
    alt: singleImageAlts[project.image] ?? project.title,
  };
}

export const graphic = {
  header: "Geo Hernandez",
  name: "Geo Hernandez",
  headline: ["Designing for the love", "of the game."],
  intro:
    "Sports graphics, visual storytelling, and bold creative work inspired by the energy of competition.",
  seo: "Sports graphics, mascots, and game-day visuals by Geo Hernandez. Collegiate athletics, identity systems, and poster work.",
  social: {
    title: "Geo Hernandez | Sports & Graphic Design",
    description:
      "Game-day graphics, mascot identity, and sports poster work. Collegiate athletics, visual storytelling, and type-driven campaigns.",
    image: "/media/graphic/milwaukee-divers-identity.jpg",
    imageAlt: "Milwaukee Divers lacrosse mascot identity graphic",
  },
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
    studyHref: "/graphic-design/milwaukee-divers",
    copy:
      "Graduate assignment with full creative freedom: I invented the Milwaukee Divers, a fictional lacrosse club rooted in Milwaukee's lakefront and vintage diving-helmet history. I built the mascot mark and illustration system first, then extended the same brass-and-navy palette into identity boards and game-day posters. The audience is young fans drawn to heritage pride and gritty Midwest energy, not generic college blue.",
    images: [
      {
        src: "/media/graphic/milwaukee-divers-system.jpg",
        width: 768,
        height: 1024,
        alt: "Milwaukee Divers identity system with the primary lockup, wordmark, D monogram, and bust",
      },
      {
        src: "/media/graphic/milwaukee-divers-helmet.jpg",
        width: 768,
        height: 1024,
        alt: "Gold Milwaukee Divers lacrosse helmet with the bust and wordmark",
      },
    ],
  },
  {
    title: "Delta Psi Delta | Raiders Mascot Expansion",
    year: "",
    accent: "#CB1F21",
    copy:
      "Delta Psi Delta commissioned an expansion of their Raiders mascot from a bust illustration into a full character, without breaking what members already wore on shirts and banners. I matched horn curvature, scar placement, and red values from the original, then delivered full-body poses for social posts and tighter marks for embroidery. The tone stays loyal, competitive, and tradition-first for members and recruits.",
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
    copy:
      "Social graphic promoting a women's lacrosse scrimmage for Southern Wesleyan. Schedule, opponent, and location had to read in one thumb-scroll on Instagram, so I used a split duotone on action photography to let navy carry the frame while date and matchup lead the type hierarchy. Built for SWU students and local families: upbeat, collegiate, and photo-forward within a 4:5 crop.",
    image: "/media/graphic/southern-wesleyan-lacrosse.jpg",
    width: 768,
    height: 1024,
  },
  {
    title: "Ice Flyers | Game Day Victory",
    year: "",
    accent: "#3A6B97",
    copy:
      "Personal exploration after my first Pensacola Ice Flyers game, trying to bottle Friday night SPHL energy in one victory graphic. Aviation-inspired typography and jet-wing motifs echo the team name without copying official assets; the scoreline reads like a broadcast lower third. Cool steel blues and ice-white type target hockey die-hards and Gulf Coast locals who want loud, cinematic, arena-dark graphics.",
    image: "/media/graphic/ice-flyers-victory.jpg",
    width: 768,
    height: 1024,
  },
  {
    title: "Formula 1 | Driver Collection",
    year: "",
    accent: "#8E1524",
    copy:
      "Directed Studio poster series treating Formula 1 drivers like collectible trading cards. A shared grid and typography hold the layout together while constructor color becomes the frame; layered cutouts, signatures, and stat chips create a hierarchy F1 fans can scan quickly. Hamilton, Norris, and Russell show the system stretching across different personalities without losing a premium, team-coded feel.",
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
    title: "Pensacola Christian College | Athletics",
    year: "",
    accent: "#0C3C6C",
    copy:
      "Unofficial athletics graphics for Pensacola Christian College across volleyball milestones and men's and women's basketball game days. One template family ties the set together: milestone posts let big stat typography lead, while hoops graphics share layout DNA with sport-specific accent bars. Navy overlays stay legible on busy gym photos for spirited, celebration-ready posts aimed at PCC students and alumni.",
    images: [
      {
        src: "/media/graphic/pcc-bertinato.jpg",
        width: 768,
        height: 1024,
        alt: "Raul Bertinato men's basketball game day graphic",
      },
      {
        src: "/media/graphic/pcc-sellars.jpg",
        width: 768,
        height: 1024,
        alt: "Maddie Sellars women's basketball game day graphic",
      },
      {
        src: "/media/graphic/pcc-matney-gameday.jpg",
        width: 768,
        height: 1024,
        alt: "Abby Matney women's basketball game day graphic vs. Ozark",
      },
      {
        src: "/media/graphic/lyssie-metzker-digs.jpg",
        width: 768,
        height: 1024,
        alt: "Lyssie Metzker volleyball milestone graphic",
      },
    ],
  },
  {
    title: "Max Verstappen | Visual Explorations",
    year: "",
    accent: "#E2186A",
    copy:
      "Three posters on Max Verstappen, each with a different art direction: celebration type as noise, RB19 geometry as backdrop, and a tight portrait with neon accent like a magazine cover. Color, composition, and photo treatment shift, but Max stays recognizable so the set reads as a series on a wall. Made for Red Bull fans and poster collectors who like high-contrast, editorial experiments.",
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
    copy:
      "Two years as Beta Psi Delta's collegian representative running social for a multi-sport organization: schedules, lineups, welcome posts, and championship graphics. Softball title art centers the trophy moment for story reshares; soccer schedules collapse into one screenshot-friendly grid. Jaguar blue, schedule-first layouts, and hype-forward tone for members and anyone following rivals online. This role shaped how I still approach sports branding.",
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
