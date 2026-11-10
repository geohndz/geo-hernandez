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
  seo: "A fictional Milwaukee lacrosse identity built from lakefront history and a vintage diving helmet. Mascot system, game-day graphics, and brand applications by Geo Hernandez.",
  hero: mark,
  lede: "A fictional lacrosse club for Milwaukee, built from the lakefront and a vintage diving helmet.",
  strategy: {
    brief:
      "Graduate brief with full creative freedom: invent a team, then build the identity before any game-day layout.",
    points: [
      "Prompt: a lacrosse club rooted in Milwaukee's maritime and industrial history.",
      "Audience: fans 18 to 35 who want heritage pride, not a generic college mark.",
      "Tone: gritty Midwest energy. Brass, navy, and helmet hardware over glossy sports blue.",
    ],
  },
  identity: {
    intro: "The mark came first. Wordmark, crest, and mascot share one brass-and-navy system.",
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
      {
        label: "MD",
        caption: "MD mark for caps, avatars, and one-color print.",
        image: {
          src: "/media/graphic/milwaukee-divers-monogram.jpg",
          width: 1012,
          height: 1024,
          alt: "Milwaukee Divers MD monogram with the anchor",
        },
      },
    ] satisfies DiversAsset[],
    monograms: [
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
        caption: "Numbers, player names, and headlines.",
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
    intro: "One mascot, several locks. It has to work as a crest, a full character, and a small badge.",
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
    intro: "The system has to live where fans actually see it.",
    groups: [
      {
        title: "Uniforms and apparel",
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
    intro: "The helmet came before the wordmark. These sketches test whether a diver could read as a lacrosse athlete.",
    assets: [
      {
        label: "Ink studies",
        caption: "Helmet thumbs and a first ink pose, before a lockup existed.",
        image: {
          src: "/media/graphic/milwaukee-divers-sketch-1.jpg",
          width: 1024,
          height: 921,
          alt: "Ink sketch of the Milwaukee Divers mascot with pencil helmet studies",
        },
      },
      {
        label: "Wordmark pass",
        caption: "DIVERS blocked in under the mascot. The bird above did not make the team.",
        image: {
          src: "/media/graphic/milwaukee-divers-sketch-2.jpg",
          width: 848,
          height: 880,
          alt: "Pencil sketch of the diver mascot with a hand-lettered Divers wordmark",
        },
      },
      {
        label: "Clean line",
        caption: "The stick angle and suit panels tightened into one pose.",
        image: {
          src: "/media/graphic/milwaukee-divers-sketch-3.jpg",
          width: 1024,
          height: 921,
          alt: "Clean line drawing of the Milwaukee Divers mascot",
        },
      },
      {
        label: "Lockup",
        caption: "Mascot and wordmark drawn together, close to the final mark.",
        image: {
          src: "/media/graphic/milwaukee-divers-sketch-4.jpg",
          width: 1024,
          height: 921,
          alt: "Pencil lockup of the Milwaukee Divers mascot over the wordmark",
        },
      },
      {
        label: "Illustrator explorations",
        caption: "Wordmarks, monograms, and mascot colorways tested before a final lockup.",
        image: {
          src: "/media/graphic/milwaukee-divers-explorations.jpg",
          width: 1024,
          height: 608,
          alt: "Illustrator explorations of Milwaukee Divers wordmarks, monograms, and mascot colorways",
        },
      },
      {
        label: "Reversed",
        caption: "White mascot for dark grounds and one-color print.",
        image: {
          src: "/media/graphic/milwaukee-divers-one-color-white.jpg",
          width: 1012,
          height: 1024,
          alt: "White one-color Milwaukee Divers mascot on black",
        },
      },
      {
        label: "One color",
        caption: "Harbor mascot for light grounds and one-color print.",
        image: {
          src: "/media/graphic/milwaukee-divers-one-color-harbor.jpg",
          width: 1012,
          height: 1024,
          alt: "Harbor one-color Milwaukee Divers mascot on white",
        },
      },
      {
        label: "Flat construction",
        caption: "Flat shapes under the finished mascot. The wordmark stays white before shading.",
        image: {
          src: "/media/graphic/milwaukee-divers-mascot-base.jpg",
          width: 1012,
          height: 1024,
          alt: "Flat construction of the Milwaukee Divers mascot and wordmark",
        },
      },
    ] satisfies DiversAsset[],
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
