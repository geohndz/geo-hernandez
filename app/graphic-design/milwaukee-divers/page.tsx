import type { Metadata } from "next";
import { GraphicDesignShell } from "@/components/graphic/GraphicDesignShell";
import { MilwaukeeDiversStudy } from "@/components/graphic/MilwaukeeDiversStudy";
import { milwaukeeDivers } from "@/content/milwaukee-divers";

export const metadata: Metadata = {
  title: "Milwaukee Divers",
  description: milwaukeeDivers.seo,
  alternates: { canonical: "/graphic-design/milwaukee-divers" },
  openGraph: {
    title: "Milwaukee Divers | Geo Hernandez",
    description: milwaukeeDivers.seo,
    url: "/graphic-design/milwaukee-divers",
    type: "article",
    images: [
      {
        url: milwaukeeDivers.hero.src,
        width: milwaukeeDivers.hero.width,
        height: milwaukeeDivers.hero.height,
        alt: milwaukeeDivers.hero.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Milwaukee Divers | Geo Hernandez",
    description: milwaukeeDivers.seo,
    images: [milwaukeeDivers.hero.src],
  },
};

export default function MilwaukeeDiversPage() {
  return (
    <GraphicDesignShell>
      <MilwaukeeDiversStudy />
    </GraphicDesignShell>
  );
}
