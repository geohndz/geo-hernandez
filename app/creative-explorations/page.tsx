import type { Metadata } from "next";
import { explorations, pageIntros } from "@/content/projects";
import { ExplorationDeviceCard } from "@/components/work/ExplorationDeviceCard";
import { KeepExploring } from "@/components/work/KeepExploring";
import { FooterCta } from "@/components/layout/FooterCta";
import { PageWidth } from "@/components/layout/PageWidth";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Design Explorations",
  description: pageIntros.explorations.body,
};

export default function ExplorationsPage() {
  const [featured, ...rest] = explorations;

  return (
    <>
      <section className="px-6 pb-10 pt-16 md:px-12 md:pt-24 lg:px-16">
        <PageWidth>
          <Reveal className="text-center">
            <h1 className="mx-auto max-w-2xl font-display text-[34px] font-medium tracking-[-0.05em] md:text-[46px]">
              {pageIntros.explorations.title}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-muted">
              {pageIntros.explorations.body}
            </p>
          </Reveal>
        </PageWidth>
      </section>
      <div className="px-6 md:px-12 lg:px-16">
        <PageWidth className="space-y-12 md:space-y-16">
          {featured ? (
            <Reveal>
              <ExplorationDeviceCard project={featured} />
            </Reveal>
          ) : null}
          <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2">
            {[0, 1].map((column) => (
              <div key={column} className="flex flex-col gap-6">
                {rest
                  .filter((_, index) => index % 2 === column)
                  .map((project) => (
                    <Reveal key={project.slug}>
                      <ExplorationDeviceCard project={project} compact />
                    </Reveal>
                  ))}
              </div>
            ))}
          </div>
        </PageWidth>
      </div>
      <KeepExploring exclude="/creative-explorations" />
      <FooterCta />
    </>
  );
}
