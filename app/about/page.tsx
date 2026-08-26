import type { Metadata } from "next";
import Image from "next/image";
import { about, awards, site, testimonials } from "@/content/site";
import { AwardList } from "@/components/work/AwardList";
import { FooterCta } from "@/components/layout/FooterCta";
import { PageWidth } from "@/components/layout/PageWidth";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "About",
  description: about.seo,
};

const [lead, ...rest] = about.paragraphs;

export default function AboutPage() {
  return (
    <>
      <section className="px-6 pb-8 pt-16 md:px-12 md:pt-24 lg:px-16">
        <PageWidth>
          <div className="grid gap-10 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:gap-12 lg:gap-16">
            <div className="min-w-0">
              <Reveal>
                <h1 className="max-w-xl font-display text-[34px] font-medium leading-[1.15] tracking-[-0.04em] md:text-[46px]">
                  {lead}
                </h1>
              </Reveal>

              <div className="mt-8 space-y-5 text-[16px] leading-[1.75] text-muted md:mt-10 md:text-[17px]">
                {rest.map((p) => (
                  <Reveal key={p}>
                    <p>{p}</p>
                  </Reveal>
                ))}
              </div>

              <Reveal className="mt-10 flex flex-wrap gap-3">
                <a
                  href={site.links.resume}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-line px-4 py-2 text-[13px] text-muted transition-colors hover:border-line-strong hover:text-fg"
                >
                  Resume
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="rounded-full border border-line px-4 py-2 text-[13px] text-muted transition-colors hover:border-line-strong hover:text-fg"
                >
                  Email
                </a>
                <a
                  href={site.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-line px-4 py-2 text-[13px] text-muted transition-colors hover:border-line-strong hover:text-fg"
                >
                  LinkedIn
                </a>
              </Reveal>
            </div>

            <div className="relative order-first mx-auto w-full max-w-[420px] self-stretch md:order-none md:mx-0 md:max-w-none">
              <div className="md:sticky md:top-24">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-line bg-card shadow-[0_24px_60px_rgba(0,0,0,0.45)] md:rounded-[32px]">
                  <Image
                    src={site.portrait}
                    alt={site.legalName}
                    fill
                    sizes="(min-width: 768px) 40vw, 90vw"
                    className="object-cover object-[50%_18%]"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </PageWidth>
      </section>

      <section className="px-6 py-16 md:px-12 lg:px-16">
        <PageWidth>
          <Reveal>
            <h2 className="mb-8 font-display text-[29px] tracking-[-0.03em] md:text-[34px]">
              Achievements
            </h2>
          </Reveal>
          <AwardList items={awards} />
        </PageWidth>
      </section>

      <section className="px-6 py-8 md:px-12 lg:px-16">
        <PageWidth>
          <Reveal>
            <h2 className="mb-8 font-display text-[29px] tracking-[-0.03em] md:text-[34px]">
              Words from Leadership
            </h2>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2">
            {testimonials.map((t) => (
              <Reveal key={t.name}>
                <figure className="rounded-[22px] border border-line bg-card p-6 md:p-8">
                  <blockquote className="text-[15px] leading-relaxed text-muted">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-6">
                    <p className="text-sm font-medium text-fg">{t.name}</p>
                    <p className="text-sm text-dim">{t.role}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </PageWidth>
      </section>

      <FooterCta />
    </>
  );
}
