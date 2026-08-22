import { cta, site } from "@/content/site";
import { PageWidth } from "@/components/layout/PageWidth";
import { Reveal } from "@/components/motion/Reveal";

export function FooterCta() {
  return (
    <section className="px-6 py-24 md:px-12 lg:px-16">
      <PageWidth>
      <Reveal>
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-display text-[34px] font-medium tracking-[-0.04em] md:text-[42px]">
            {cta.title}
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-muted">{cta.body}</p>
          <p className="mt-6 text-[16px] text-fg">{cta.prompt}</p>
          <div className="mt-8 flex justify-center gap-3">
            <a
              href={`mailto:${site.email}`}
              className="rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-80"
            >
              Email
            </a>
            <a
              href={site.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-line px-5 py-2.5 text-sm font-medium text-fg transition-colors hover:border-white/30"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </Reveal>
      </PageWidth>
    </section>
  );
}
