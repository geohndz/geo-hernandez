import type { Metadata } from "next";
import { pageIntros, websites } from "@/content/projects";
import { ProjectCard } from "@/components/work/ProjectCard";
import { KeepExploring } from "@/components/work/KeepExploring";
import { FooterCta } from "@/components/layout/FooterCta";
import { PageWidth } from "@/components/layout/PageWidth";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Websites",
  description: pageIntros.websites.body,
};

export default function WebsitesPage() {
  return (
    <>
      <section className="px-6 pb-10 pt-16 md:px-12 md:pt-24 lg:px-16">
        <PageWidth>
          <Reveal className="text-center">
            <h1 className="mx-auto max-w-xl font-display text-[38px] font-medium tracking-[-0.05em] md:text-[50px]">
              {pageIntros.websites.title}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-muted">
              {pageIntros.websites.body}
            </p>
          </Reveal>
        </PageWidth>
      </section>
      <div className="px-6 md:px-12 lg:px-16">
        <PageWidth className="space-y-6">
          {websites.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </PageWidth>
      </div>
      <KeepExploring exclude="/websites" />
      <FooterCta />
    </>
  );
}
