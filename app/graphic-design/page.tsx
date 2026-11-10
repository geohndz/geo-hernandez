import type { Metadata } from "next";
import { GraphicAbout } from "@/components/graphic/GraphicAbout";
import { GraphicDesignShell } from "@/components/graphic/GraphicDesignShell";
import { GraphicFooter } from "@/components/graphic/GraphicFooter";
import { GraphicHeader } from "@/components/graphic/GraphicHeader";
import { GraphicHero } from "@/components/graphic/GraphicHero";
import { GraphicWork } from "@/components/graphic/GraphicWork";
import { graphic, graphicProjects } from "@/content/graphic";

const { social } = graphic;

export const metadata: Metadata = {
  title: "Sports graphics",
  description: graphic.seo,
  keywords: [
    "sports graphics",
    "graphic design",
    "game day graphics",
    "sports branding",
    "collegiate athletics",
    "mascot design",
    "poster design",
    "visual identity",
    "typography",
    "Geo Hernandez",
  ],
  alternates: { canonical: "/graphic-design" },
  openGraph: {
    title: social.title,
    description: social.description,
    url: "/graphic-design",
    type: "website",
    images: [
      {
        url: social.image,
        width: 768,
        height: 1024,
        alt: social.imageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: social.title,
    description: social.description,
    images: [social.image],
  },
};

export default function GraphicDesignPage() {
  return (
    <GraphicDesignShell>
      <div id="top">
        <GraphicHeader />
        <main>
          <GraphicHero projects={graphicProjects} />
          <GraphicWork projects={graphicProjects} />
          <GraphicAbout />
        </main>
        <GraphicFooter />
      </div>
    </GraphicDesignShell>
  );
}
