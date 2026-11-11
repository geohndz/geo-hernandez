import type { GraphicFrame } from "@/content/graphic";

export type DiversAsset = {
  label: string;
  caption: string;
  image?: GraphicFrame;
  swatch?: string;
  codes?: readonly string[];
};

const identity: GraphicFrame = {
  src: "/media/graphic/milwaukee-divers-identity.jpg",
  width: 768,
  height: 1024,
  alt: "Milwaukee Divers mascot and identity pieces",
};

const gameday: GraphicFrame = {
  src: "/media/graphic/milwaukee-divers-gameday.jpg",
  width: 768,
  height: 1024,
  alt: "Milwaukee Divers game day graphic",
};

const mark: GraphicFrame = {
  src: "/media/graphic/milwaukee-divers-mark.jpg",
  width: 1024,
  height: 576,
  alt: "Milwaukee Divers mascot and wordmark",
};

export const milwaukeeDivers = {
  title: "Milwaukee Divers",
  seo: "A fictional lacrosse club for Milwaukee, built around a vintage diving helmet and a lot of tracing paper. Mascot system and brand applications by Geo Hernandez.",
  hero: mark,
  lede: "A fictional lacrosse club for Milwaukee, built around a vintage diving helmet and a lot of tracing paper.",
  timeline: "3 weeks",
  tools: "Adobe Illustrator, Adobe Photoshop",
  course: "Graduate coursework, expanded into a brand system",
  strategy: {
    brief:
      "The assignment was just a mascot. The final graphic needed highlights and shadows, a dynamic pose, type that matched the style, and a cohesive look throughout. I wanted to see how far the mascot could go, so I expanded it into a small brand system.",
    points: [
      {
        label: "Who it's for.",
        body: "Fans 18 to 35 who want a team with personality and local pride, not another generic sports mark.",
      },
      {
        label: "Why lacrosse.",
        body: "My sister has played since high school and now plays in college. This one's for her.",
      },
      {
        label: "Why a diver.",
        body: "I'd been in a diving-themed era, and the old-school brass helmet suits looked meaner than anything modern. That edge was what I wanted for a contact sport.",
      },
      {
        label: "Why Milwaukee.",
        body: "The city came to mind first, and when I looked into it, it turned out to have a real history with diving. I took that as a sign. The Pensacola Pelicans and the Galapagos Hammerheads were also on the table.",
      },
    ],
  },
  reflection: [
    "This project taught me that a mascot is only the beginning. The real work is making it hold up at every size and on every surface. Class critique also changed how I draw: I now push proportions for emotion instead of stopping at correct.",
    "With more time, I'd expand the logo suite, design environmental pieces like arena signage and a stadium takeover, and build out a merch line.",
  ],
  identity: {
    intro: "Before building the system, I studied how pro teams apply their branding across different mediums. Since this wasn't a full brand, I focused on what a team needs most: the mascot in large, medium, and small sizes, and a wordmark with a full version and a monogram.",
    wordmark: "The team name on its own, for jerseys, headlines, and headers.",
    monogram: "A compact mark for small spaces, like avatars, embroidery, and merch tags.",
    logos: [
      {
        label: "System",
        caption: "Primary lockup, wordmark, D monogram, and the bust on one board.",
        image: {
          src: "/media/graphic/milwaukee-divers-system.jpg",
          width: 768,
          height: 1024,
          alt: "Milwaukee Divers identity system with the primary lockup, wordmark, D monogram, and bust",
        },
      },
      {
        label: "Identity board",
        caption: "Mascot, crest, and early lockups on one board.",
        image: identity,
      },
      {
        label: "Embroidery",
        caption: "The D monogram stitched into the jersey mesh.",
        image: {
          src: "/media/graphic/milwaukee-divers-embroidery.jpg",
          width: 768,
          height: 1024,
          alt: "Embroidered Milwaukee Divers D monogram on jersey mesh",
        },
      },
      {
        label: "Field",
        caption: "Wordmark down both sidelines, mascot at midfield.",
        image: {
          src: "/media/graphic/milwaukee-divers-midfield.jpg",
          width: 768,
          height: 1024,
          alt: "Aerial view of a lacrosse field with Milwaukee Divers marks at midfield and on the sidelines",
        },
      },
      {
        label: "Banners",
        caption: "Into the Blue. Street banners in navy, brass, and blue.",
        image: {
          src: "/media/graphic/milwaukee-divers-banners.jpg",
          width: 768,
          height: 1024,
          alt: "Three Milwaukee Divers street banners reading Into the Blue",
        },
      },
    ] satisfies DiversAsset[],
    mascot: {
      label: "Mascot",
      caption: "Mascot locked with the city name and wordmark.",
      image: {
        src: "/media/graphic/milwaukee-divers-primary-mascot.jpg",
        width: 1024,
        height: 728,
        alt: "Milwaukee Divers mascot locked over the city name and wordmark",
      },
    } satisfies DiversAsset,
    wordmarks: [
      {
        label: "Primary lockup",
        caption: "City name locked over the wordmark.",
        image: {
          src: "/media/graphic/milwaukee-divers-wordmark.jpg",
          width: 1012,
          height: 1024,
          alt: "Milwaukee Divers lockup with the city name over the wordmark",
        },
      },
      {
        label: "Wordmark",
        caption: "Wordmark on its own.",
        image: {
          src: "/media/graphic/milwaukee-divers-wordmark-only.jpg",
          width: 1012,
          height: 1024,
          alt: "Milwaukee Divers wordmark with the anchor, no city name",
        },
      },
    ] satisfies DiversAsset[],
    monograms: [
      {
        label: "MD",
        caption: "",
        image: {
          src: "/media/graphic/milwaukee-divers-monogram.jpg",
          width: 1012,
          height: 1024,
          alt: "Milwaukee Divers MD monogram with the anchor",
        },
      },
      {
        label: "Monogram",
        caption: "White D with the mascot, for one-color print and dark grounds.",
        image: {
          src: "/media/graphic/milwaukee-divers-monogram-white.jpg",
          width: 1012,
          height: 1024,
          alt: "White Milwaukee Divers monogram, mascot in front of a D",
        },
      },
      {
        label: "Brass monogram",
        caption: "Same monogram with a brass D.",
        image: {
          src: "/media/graphic/milwaukee-divers-monogram-brass.jpg",
          width: 1012,
          height: 1024,
          alt: "Milwaukee Divers monogram with a brass D",
        },
      },
      {
        label: "Waterline monogram",
        caption: "Same monogram with a waterline D.",
        image: {
          src: "/media/graphic/milwaukee-divers-monogram-waterline.jpg",
          width: 1012,
          height: 1024,
          alt: "Milwaukee Divers monogram with a waterline D",
        },
      },
    ] satisfies DiversAsset[],
    type: [
      {
        label: "Display",
        caption:
          "Norches is blocky and heavy, like the bolted brass of a diving helmet. It gives numbers and headlines the weight the mascot has.",
      },
      {
        label: "Functional",
        caption: "Subheads, schedules, stats, and captions.",
      },
    ] satisfies DiversAsset[],
    colors: [
      {
        label: "Harbor",
        caption: "Backgrounds and large fields.",
        swatch: "#0A1724",
        codes: ["HEX #0A1724", "RGB 10, 23, 36", "CMYK 72, 36, 0, 86", "HSL 210, 57%, 9%"],
      },
      {
        label: "Brass",
        caption: "Helmet hardware and highlights.",
        swatch: "#C68A30",
        codes: ["HEX #C68A30", "RGB 198, 138, 48", "CMYK 0, 30, 76, 22", "HSL 36, 61%, 48%"],
      },
      {
        label: "Waterline",
        caption: "Suit, gloves, and the ball.",
        swatch: "#3980BA",
        codes: ["HEX #3980BA", "RGB 57, 128, 186", "CMYK 69, 31, 0, 27", "HSL 207, 53%, 48%"],
      },
      {
        label: "Plate",
        caption: "Wordmark and metal details.",
        swatch: "#CED3D6",
        codes: ["HEX #CED3D6", "RGB 206, 211, 214", "CMYK 4, 1, 0, 16", "HSL 203, 9%, 82%"],
      },
      {
        label: "White",
        caption: "Outlines and the base wordmark.",
        swatch: "#FFFFFF",
        codes: ["HEX #FFFFFF", "RGB 255, 255, 255", "CMYK 0, 0, 0, 0", "HSL 0, 0%, 100%"],
      },
    ] satisfies DiversAsset[],
  },
  architecture: {
    intro: "One mascot, three sizes. It has to work as a full character, a bust, and a small badge without losing its attitude.",
    assets: [
      {
        label: "Mascot",
        caption: "Finished character locked with the wordmark for posters and large apparel.",
        image: {
          src: "/media/graphic/milwaukee-divers-mascot.jpg",
          width: 1012,
          height: 1024,
          alt: "Milwaukee Divers mascot locked with the wordmark",
        },
      },
      {
        label: "Bust",
        caption: "Tighter crop for social and embroidery.",
        image: {
          src: "/media/graphic/milwaukee-divers-bust.jpg",
          width: 1012,
          height: 1024,
          alt: "Milwaukee Divers helmet bust",
        },
      },
      {
        label: "Badge",
        caption: "Mascot locked into the D for crests and large marks.",
        image: {
          src: "/media/graphic/milwaukee-divers-badge.jpg",
          width: 1012,
          height: 1024,
          alt: "Milwaukee Divers mascot locked into a D badge",
        },
      },
    ] satisfies DiversAsset[],
  },
  applications: {
    groups: [
      {
        title: "Uniforms and apparel",
        body: "The helmets are gold to echo the diver's brass helmet, so the mascot's signature detail carries onto the field.",
        assets: [
          {
            label: "Helmet",
            caption: "Brass shell with the bust and DIVERS along the side.",
            image: {
              src: "/media/graphic/milwaukee-divers-helmet.jpg",
              width: 768,
              height: 1024,
              alt: "Gold Milwaukee Divers lacrosse helmet with the bust and wordmark",
            },
          },
          {
            label: "Home kit",
            caption: "Wordmark, number 20, and the anchor on the shorts.",
            image: {
              src: "/media/graphic/milwaukee-divers-kit.jpg",
              width: 768,
              height: 1024,
              alt: "Milwaukee Divers player in the white home kit, number 20",
            },
          },
          {
            label: "Jersey",
            caption: "Wordmark and number across the front.",
            image: {
              src: "/media/graphic/milwaukee-divers-jersey.jpg",
              width: 768,
              height: 1024,
              alt: "Milwaukee Divers player in a white jersey, number 32",
            },
          },
          {
            label: "Huddle",
            caption: "Numbers, gloves, and helmets from behind the huddle.",
            image: {
              src: "/media/graphic/milwaukee-divers-huddle.jpg",
              width: 768,
              height: 1024,
              alt: "Milwaukee Divers players in a huddle, jerseys and gold helmets",
            },
          },
          {
            label: "On the field",
            caption: "Helmet and glove in the foreground, lineup behind them.",
            image: {
              src: "/media/graphic/milwaukee-divers-field.jpg",
              width: 768,
              height: 1024,
              alt: "Milwaukee Divers helmet and glove on the field with the team lined up",
            },
          },
        ] satisfies DiversAsset[],
      },
      {
        title: "Digital and social",
        body: "I chose photos with raw emotion and motion, so the graphics feel like the game: fast, physical, and a little chaotic.",
        assets: [
          {
            label: "Game day",
            caption: "Matchup poster in the same brass-and-navy language as the identity board.",
            image: gameday,
          },
          {
            label: "Into the Blue",
            caption: "Campaign post for social, stacked over game photography.",
            image: {
              src: "/media/graphic/milwaukee-divers-into-the-blue.jpg",
              width: 768,
              height: 1024,
              alt: "Into the Blue Milwaukee Divers social post with game photography",
            },
          },
          {
            label: "Win",
            caption: "Final score post for social, with the player and the score.",
            image: {
              src: "/media/graphic/milwaukee-divers-win.jpg",
              width: 768,
              height: 1024,
              alt: "Milwaukee Divers win graphic, 10 to 6 over Boston Cannons",
            },
          },
        ] satisfies DiversAsset[],
      },
    ],
  },
  process: {
    steps: [
      {
        title: "Research",
        body: "I had never played or watched lacrosse, so I started with reference photos to learn how players hold the stick, how they move, and how physical the game actually is. It finally made sense why my sister thrives at it.",
        assets: [
          {
            label: "Reference",
            caption: "Reference photos for how players hold the stick and move.",
            image: {
              src: "/media/graphic/milwaukee-divers-reference.png",
              width: 655,
              height: 441,
              alt: "Lacrosse reference photos of players holding sticks and checking each other",
            },
          },
        ] satisfies DiversAsset[],
      },
      {
        title: "Sketching",
        body: "I built the pose up in layers on tracing paper, refining each round on top of the last. A lot of trial and error.",
        assets: [
          {
            label: "Ink studies",
            caption: "Early pose studies from lacrosse reference photos.",
            image: {
              src: "/media/graphic/milwaukee-divers-sketch-1.jpg",
              width: 1024,
              height: 921,
              alt: "Pencil and ink pose studies of the diver mascot holding a lacrosse stick",
            },
          },
          {
            label: "Wordmark pass",
            caption: "Building the pose in layers on tracing paper.",
            image: {
              src: "/media/graphic/milwaukee-divers-sketch-2.jpg",
              width: 848,
              height: 880,
              alt: "Tracing-paper sketch of the diver mascot layered over a Divers wordmark",
            },
          },
        ] satisfies DiversAsset[],
      },
      {
        title: "Critique",
        body: "I presented the sketches to my class for feedback. The biggest lesson: anatomically correct isn't always right. Exaggerating proportions pushes the drama and attitude that a mascot needs.",
        assets: [
          {
            label: "Clean line",
            caption: "The version I brought to class critique.",
            image: {
              src: "/media/graphic/milwaukee-divers-sketch-3.jpg",
              width: 1024,
              height: 921,
              alt: "Clean line drawing of the diver mascot brought to class critique",
            },
          },
        ] satisfies DiversAsset[],
      },
      {
        title: "Refinement",
        body: "I took the feedback back to the tracing paper and developed the final mascot from there.",
        assets: [
          {
            label: "Lockup",
            caption: "Post-critique revision with exaggerated proportions for more drama.",
            image: {
              src: "/media/graphic/milwaukee-divers-sketch-4.jpg",
              width: 1024,
              height: 921,
              alt: "Revised pencil lockup of the diver mascot over the Divers wordmark",
            },
          },
          {
            label: "Illustrator explorations",
            caption: "",
            image: {
              src: "/media/graphic/milwaukee-divers-explorations.jpg",
              width: 1024,
              height: 608,
              alt: "Illustrator explorations of Milwaukee Divers wordmarks, monograms, and mascot colorways",
            },
          },
          {
            label: "Reversed",
            caption: "",
            image: {
              src: "/media/graphic/milwaukee-divers-one-color-white.jpg",
              width: 1012,
              height: 1024,
              alt: "White one-color Milwaukee Divers mascot on black",
            },
          },
          {
            label: "One color",
            caption: "",
            image: {
              src: "/media/graphic/milwaukee-divers-one-color-harbor.jpg",
              width: 1012,
              height: 1024,
              alt: "Harbor one-color Milwaukee Divers mascot on white",
            },
          },
          {
            label: "Flat construction",
            caption: "",
            image: {
              src: "/media/graphic/milwaukee-divers-mascot-base.jpg",
              width: 1012,
              height: 1024,
              alt: "Flat construction of the Milwaukee Divers mascot and wordmark",
            },
          },
        ] satisfies DiversAsset[],
      },
      {
        title: "Type",
        body: "I tested sport display faces for the wordmark. Norches is the one that carries the helmet's weight.",
        assets: [
          {
            label: "Type options",
            caption: "Sport font options for the Divers wordmark.",
            image: {
              src: "/media/graphic/milwaukee-divers-type-options.png",
              width: 1024,
              height: 706,
              alt: "Sport font options for the Divers wordmark, including Enforce, Grasher, Mineros, Norches, Baxerys, Aeroxer, Overward, and Gameont",
            },
          },
        ] satisfies DiversAsset[],
      },
    ],
    textures: [
      {
        label: "Waterline texture",
        caption: "Scratched waterline field for banners and social posts.",
        image: {
          src: "/media/graphic/milwaukee-divers-texture-waterline.jpg",
          width: 768,
          height: 1024,
          alt: "Scratched blue waterline texture",
        },
      },
      {
        label: "Plate texture",
        caption: "Paper grain for light grounds.",
        image: {
          src: "/media/graphic/milwaukee-divers-texture-plate.jpg",
          width: 768,
          height: 1024,
          alt: "Crumpled light paper texture",
        },
      },
      {
        label: "Brass texture",
        caption: "Worn metal for brass fields and helmet hardware.",
        image: {
          src: "/media/graphic/milwaukee-divers-texture-brass.jpg",
          width: 768,
          height: 1024,
          alt: "Worn brass metal texture",
        },
      },
      {
        label: "Anchor",
        caption: "Soft anchor laid over waterline fields.",
        image: {
          src: "/media/graphic/milwaukee-divers-anchor.jpg",
          width: 768,
          height: 1024,
          alt: "Blurred anchor on a waterline field",
        },
      },
      {
        label: "Map",
        caption: "Milwaukee streets in brass, under the posters.",
        image: {
          src: "/media/graphic/milwaukee-divers-map.jpg",
          width: 768,
          height: 1024,
          alt: "Milwaukee street map in brass",
        },
      },
      {
        label: "City",
        caption: "Harbor skyline framing the waterline field.",
        image: {
          src: "/media/graphic/milwaukee-divers-city.jpg",
          width: 768,
          height: 1024,
          alt: "Distressed Milwaukee skyline in harbor on waterline",
        },
      },
    ] satisfies DiversAsset[],
  },
} as const;
