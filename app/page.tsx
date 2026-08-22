import { Hero } from "@/components/home/Hero";
import { FeaturedStudies } from "@/components/home/FeaturedStudies";
import { WorkIndex } from "@/components/home/WorkIndex";
import { AwardsTeaser } from "@/components/home/AwardsTeaser";
import { FooterCta } from "@/components/layout/FooterCta";
import { caseStudies, workIndex } from "@/content/projects";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedStudies studies={caseStudies} />
      <WorkIndex items={workIndex} />
      <AwardsTeaser />
      <FooterCta />
    </>
  );
}
