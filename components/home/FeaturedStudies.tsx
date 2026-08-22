import type { CaseStudyMeta } from "@/content/projects";
import { Reveal } from "@/components/motion/Reveal";
import { PageWidth } from "@/components/layout/PageWidth";
import { FeaturedStudyCard } from "@/components/home/FeaturedStudyCard";

export function FeaturedStudies({ studies }: { studies: CaseStudyMeta[] }) {
  return (
    <section id="case-studies" className="scroll-mt-8 px-6 md:px-12 lg:px-16">
      <PageWidth className="space-y-12 md:space-y-16">
        {studies.map((study, i) => (
          <Reveal key={study.slug} delay={i * 0.04}>
            <FeaturedStudyCard study={study} />
          </Reveal>
        ))}
      </PageWidth>
    </section>
  );
}
