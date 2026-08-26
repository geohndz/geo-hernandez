"use client";

import { useEffect, useState } from "react";
import { caseStudies } from "@/content/projects";
import type { CaseFrontmatter } from "@/lib/mdx";
import { FooterCta } from "@/components/layout/FooterCta";
import { PageWidth } from "@/components/layout/PageWidth";
import { FeaturedStudyCard } from "@/components/home/FeaturedStudyCard";
import { CaseStudyHero } from "./CaseStudyHero";
import { DeviceShowcase } from "./DeviceShowcase";
import { cn } from "@/lib/cn";

const overviewItems = [
  ["Background", "background"],
  ["Problem", "problem"],
  ["Solution", "solution"],
  ["Outcome", "outcome"],
] as const;

export function CaseStudyView({
  slug,
  frontmatter,
  readingMinutes,
  children,
}: {
  slug: string;
  frontmatter: CaseFrontmatter;
  readingMinutes: number;
  children: React.ReactNode;
}) {
  const next = caseStudies.find((study) => study.slug !== slug) ?? caseStudies[0];
  const study = caseStudies.find((item) => item.slug === slug);

  return (
    <article>
      <CaseStudyHero
        frontmatter={frontmatter}
        readingMinutes={readingMinutes}
        image={study?.heroImage ?? study?.poster}
      />

      <div className="px-6 pb-16 pt-10 md:px-12 lg:px-16">
        <div className="mx-auto grid w-full grid-cols-1 xl:grid-cols-[1fr_minmax(0,72rem)_1fr]">
          {frontmatter.toc.length > 0 ? (
            <aside className="relative hidden xl:block pr-8">
              <div className="sticky top-24 ml-auto w-[10.5rem]">
                <PageNav items={frontmatter.toc} />
              </div>
            </aside>
          ) : (
            <div className="hidden xl:block" aria-hidden />
          )}
          <div className="study-body study-cinematic w-full min-w-0 justify-self-center">
            <Overview className="study-text" frontmatter={frontmatter} layout="rows" />
            {study?.video || study?.deviceImage ? (
              <DeviceShowcase
                study={study}
                deviceOnly
                controls="device"
                className="mt-10"
              />
            ) : null}
            {children}
          </div>
        </div>
      </div>

      {next ? (
        <section className="px-6 py-16 md:px-12 lg:px-16">
          <PageWidth>
            <p className="text-[15px] text-muted">Next project</p>
            <div className="mt-6">
              <FeaturedStudyCard study={next} />
            </div>
          </PageWidth>
        </section>
      ) : null}

      <FooterCta />
    </article>
  );
}

function PageNav({ items }: { items: CaseFrontmatter["toc"] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    if (items.length === 0) return;

    const offset = 128;
    let frame = 0;

    function update() {
      let current = items[0]?.id ?? "";
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= offset) current = item.id;
      }
      setActive(current);
    }

    function onScroll() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", update);
    };
  }, [items]);

  return (
    <>
      <p className="mb-3 text-[11px] uppercase tracking-[0.16em] text-dim">
        On this page
      </p>
      <nav className="space-y-1.5" aria-label="On this page">
        {items.map((item) => {
          const isActive = item.id === active;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={isActive ? "location" : undefined}
              className={cn(
                "block border-l pl-3 text-[13px] transition-colors",
                isActive
                  ? "border-fg text-fg"
                  : "border-transparent text-muted hover:text-fg",
              )}
            >
              {item.label}
            </a>
          );
        })}
      </nav>
    </>
  );
}

function Overview({
  frontmatter,
  className,
  layout = "cards",
}: {
  frontmatter: CaseFrontmatter;
  className?: string;
  layout?: "cards" | "rows";
}) {
  if (layout === "rows") {
    return (
      <div id="overview" className={cn("scroll-mt-28", className)}>
        {overviewItems.map(([label, key], i) => (
          <div
            key={label}
            className={cn(
              "grid gap-3 py-8 sm:grid-cols-[minmax(8.5rem,0.28fr)_minmax(0,1fr)] sm:gap-10 md:py-9",
              i < overviewItems.length - 1 && "border-b border-line",
            )}
          >
            <p className="font-medium tracking-tight text-fg">{label}</p>
            <p className="text-[16px] leading-[1.75] text-muted">
              {frontmatter.overview[key]}
            </p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div id="overview" className={cn("scroll-mt-28 grid gap-4 md:grid-cols-2", className)}>
      {overviewItems.map(([label, key]) => (
        <div key={label} className="rounded-[18px] border border-line bg-card p-5">
          <p className="text-[12px] uppercase tracking-[0.14em] text-dim">{label}</p>
          <p className="mt-2 text-[15px] leading-relaxed text-muted">
            {frontmatter.overview[key]}
          </p>
        </div>
      ))}
    </div>
  );
}

