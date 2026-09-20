import { Hero } from "@/components/home/Hero";
import { CommitMatrix } from "@/components/home/CommitMatrix";
import { FeaturedStudies } from "@/components/home/FeaturedStudies";
import { WorkIndex } from "@/components/home/WorkIndex";
import { AwardsTeaser } from "@/components/home/AwardsTeaser";
import { FooterCta } from "@/components/layout/FooterCta";
import { caseStudies, workIndex } from "@/content/projects";

export const dynamic = "force-static";

export default function HomePage() {
  return (
    <>
      <Hero matrix={<CommitMatrix />} />
      <FeaturedStudies studies={caseStudies} />
      <WorkIndex items={workIndex} />
      <AwardsTeaser />
      <FooterCta />
    </>
  );
}
