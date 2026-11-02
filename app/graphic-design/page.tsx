import type { Metadata } from "next";
import { GraphicAbout } from "@/components/graphic/GraphicAbout";
import { GraphicFooter } from "@/components/graphic/GraphicFooter";
import { GraphicHeader } from "@/components/graphic/GraphicHeader";
import { GraphicHero } from "@/components/graphic/GraphicHero";
import { GraphicWork } from "@/components/graphic/GraphicWork";
import { graphic, graphicProjects } from "@/content/graphic";

export const metadata: Metadata = {
  title: "Sports graphics",
  description: graphic.seo,
  alternates: { canonical: "/graphic-design" },
  openGraph: {
    title: "Sports graphics",
    description: graphic.seo,
    url: "/graphic-design",
  },
};

export default function GraphicDesignPage() {
  return (
    <div id="top">
      <GraphicHeader />
      <main>
        <GraphicHero projects={graphicProjects} />
        <GraphicWork projects={graphicProjects} />
        <GraphicAbout />
      </main>
      <GraphicFooter />
    </div>
  );
}
