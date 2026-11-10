import type { ReactNode } from "react";
import localFont from "next/font/local";
import Image from "next/image";
import Link from "next/link";
import { GraphicFooter } from "@/components/graphic/GraphicFooter";
import { GraphicPosters } from "@/components/graphic/GraphicPosters";
import { graphic } from "@/content/graphic";
import { milwaukeeDivers, type DiversAsset } from "@/content/milwaukee-divers";

const norches = localFont({
  src: [
    { path: "../../app/fonts/Norches-Regular.ttf", weight: "400", style: "normal" },
    { path: "../../app/fonts/Norches-Bold.ttf", weight: "700", style: "normal" },
  ],
  display: "swap",
});

export function MilwaukeeDiversStudy() {
  const study = milwaukeeDivers;

  return (
    <div id="top">
      <header className="sticky top-0 z-30 border-b border-[var(--gd-rule)] bg-[var(--gd-paper)]">
        <div className="mx-auto flex w-full max-w-[1440px] items-baseline justify-between gap-4 px-5 py-4 md:px-10 lg:px-14">
          <Link href="/graphic-design" className="gd-link text-[14px] tracking-[-0.02em] sm:text-[15px]">
            {graphic.header}
          </Link>
          <Link href="/graphic-design#work" className="gd-link text-[13px] sm:text-[14px]">
            All work
          </Link>
        </div>
      </header>

      <main>
        <Image
          src={study.hero.src}
          alt={study.hero.alt ?? study.title}
          width={study.hero.width}
          height={study.hero.height}
          sizes="100vw"
          priority
          className="h-auto w-full"
        />

        <div className="mx-auto w-full max-w-[1440px] px-5 py-12 md:px-10 md:py-16 lg:px-14">
          <h1 className="max-w-[16ch] font-medium text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] tracking-[-0.04em]">
            {study.title}
          </h1>
          <p className="mt-5 max-w-[36ch] text-[17px] leading-[1.45] text-[var(--gd-muted)]">{study.lede}</p>
        </div>

        <StudySection title="Strategy">
          <p className="max-w-[46ch] text-[16px] leading-[1.5]">{study.strategy.brief}</p>
          <ul className="mt-6 max-w-[48ch] space-y-2 text-[15px] leading-[1.5] text-[var(--gd-muted)]">
            {study.strategy.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </StudySection>

        <StudySection title="Process">
          <p className="max-w-[46ch] text-[15px] leading-[1.5] text-[var(--gd-muted)]">{study.process.intro}</p>
          <AssetGrid assets={study.process.assets} columns="sm:grid-cols-2" />
          <AssetBlock title="Textures" assets={study.process.textures.slice(0, 3)} columns="grid-cols-3" />
          <AssetGrid assets={study.process.textures.slice(3)} columns="grid-cols-3" />
        </StudySection>

        <StudySection title="Identity">
          <p className="max-w-[46ch] text-[15px] leading-[1.5] text-[var(--gd-muted)]">{study.identity.intro}</p>
          <AssetBlock title="Mascot" assets={[study.identity.mascot]} />
          <AssetBlock
            title="Team name on its own, for jerseys, headlines, and the header."
            assets={study.identity.wordmarks}
            columns="grid-cols-3"
          />
          <AssetBlock title="Monogram" assets={study.identity.monograms} columns="grid-cols-3" />
        </StudySection>

        <StudySection title="Typography">
          <TypeSpecimen />
        </StudySection>

        <StudySection title="Color">
          <ColorPalette colors={study.identity.colors} />
        </StudySection>

        <StudySection title="Mascot system">
          <p className="max-w-[46ch] text-[15px] leading-[1.5] text-[var(--gd-muted)]">{study.architecture.intro}</p>
          <AssetGrid assets={study.architecture.assets} />
        </StudySection>

        <StudySection title="In use">
          <p className="max-w-[46ch] text-[15px] leading-[1.5] text-[var(--gd-muted)]">{study.applications.intro}</p>
          <AssetBlock title="Logos and marks" assets={study.identity.logos} />
          {study.applications.groups.map((group) => (
            <AssetBlock key={group.title} title={group.title} assets={group.assets} />
          ))}
        </StudySection>
      </main>
      <GraphicFooter />
    </div>
  );
}

function StudySection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-[var(--gd-rule)]">
      <div className="mx-auto w-full max-w-[1440px] px-5 py-14 md:px-10 md:py-20 lg:px-14">
        <h2 className="font-medium text-[clamp(1.75rem,3vw,2.5rem)] leading-none tracking-[-0.03em]">
          {title}
        </h2>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

const alphabet = "aa bb cc dd ee ff gg hh ii jj kk ll mm nn oo pp qq rr ss tt uu vv ww xx yy zz";

function TypeSpecimen() {
  const [display, functional] = milwaukeeDivers.identity.type;

  return (
    <ul className="grid gap-4 sm:grid-cols-2">
        <li className="border border-[var(--gd-rule)] p-5 sm:p-6">
          <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-[var(--gd-muted)]">{display.label}</p>
          <p className={`${norches.className} mt-6 text-[clamp(4.5rem,11vw,8rem)] font-bold leading-[0.8]`}>
            Game Day
          </p>
          <p className={`${norches.className} mt-6 text-[clamp(4rem,9vw,7rem)] font-bold leading-[0.85]`}>DIVERS</p>
          <p className={`${norches.className} mt-3 text-[clamp(2.5rem,5vw,4rem)] font-bold leading-none`}>20</p>
          <p className={`${norches.className} mt-8 text-[clamp(1.35rem,2.6vw,1.85rem)] font-bold leading-[1.2]`}>
            {alphabet}
          </p>
          <p className="mt-6 max-w-[36ch] text-[13px] leading-[1.45] text-[var(--gd-muted)]">
            Norches Bold and Regular. {display.caption}
          </p>
        </li>
        <li className="border border-[var(--gd-rule)] p-5 sm:p-6">
          <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-[var(--gd-muted)]">{functional.label}</p>
          <p
            className="mt-6 text-[clamp(2.75rem,6vw,4.5rem)] leading-[0.9]"
            style={{ fontFamily: "zuume, sans-serif", fontWeight: 400 }}
          >
            Saturday, 7:00 PM
          </p>
          <p
            className="mt-3 text-[clamp(1.5rem,3vw,2rem)] leading-none"
            style={{ fontFamily: "zuume, sans-serif", fontWeight: 300 }}
          >
            Home vs. Chicago
          </p>
          <p
            className="mt-8 text-[clamp(1.35rem,2.6vw,1.85rem)] leading-[1.15]"
            style={{ fontFamily: "zuume, sans-serif", fontWeight: 400 }}
          >
            {alphabet}
          </p>
          <p className="mt-6 max-w-[36ch] text-[13px] leading-[1.45] text-[var(--gd-muted)]">
            Zuume Regular and Light. {functional.caption}
          </p>
        </li>
      </ul>
  );
}

function ColorPalette({ colors }: { colors: readonly DiversAsset[] }) {
  return (
    <>
      <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
        {colors.map((color) => {
          const swatch = color.swatch ?? "#FFFFFF";
          const ink = swatchText(swatch);
          return (
            <li key={color.label}>
              <p
                className={`${norches.className} text-[clamp(1.65rem,2.4vw,2.15rem)] font-bold leading-[0.9]`}
                style={
                  swatch.toUpperCase() === "#FFFFFF"
                    ? { color: swatch, WebkitTextStroke: "1px #0A1724", paintOrder: "stroke fill" }
                    : { color: swatch }
                }
              >
                {color.label}
              </p>
              <div
                className="mt-3 flex min-h-[148px] flex-col justify-end border px-3.5 py-3.5"
                style={{
                  backgroundColor: swatch,
                  color: ink,
                  borderColor: ink === "#0A1724" ? "rgba(10, 23, 36, 0.16)" : "transparent",
                }}
              >
                {color.codes ? (
                  <ul className="space-y-0.5 text-[11px] leading-[1.35] tabular-nums">
                    {color.codes.map((code) => (
                      <li key={code}>{code}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>
      <ul className="mt-2.5 grid grid-cols-5 gap-2.5">
        {colors.map((color) => {
          const swatch = color.swatch ?? "#FFFFFF";
          return (
            <li key={color.label}>
              <div
                className="h-52 sm:h-72"
                aria-hidden="true"
                style={{
                  backgroundImage: `linear-gradient(to bottom, ${swatch} 0%, ${swatch} 12%, color-mix(in srgb, ${swatch} 55%, transparent) 48%, transparent 100%)`,
                }}
              />
              <p className="mt-2 text-[13px] leading-[1.4] text-[var(--gd-muted)]">{color.caption}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
}

function swatchText(hex: string) {
  const value = hex.replace("#", "");
  const channel = (start: number) => {
    const s = parseInt(value.slice(start, start + 2), 16) / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  const luminance = 0.2126 * channel(0) + 0.7152 * channel(2) + 0.0722 * channel(4);
  return luminance > 0.18 ? "#0A1724" : "#F5F5F5";
}

function AssetBlock({
  title,
  assets,
  columns,
}: {
  title: string;
  assets: readonly DiversAsset[];
  columns?: string;
}) {
  return (
    <div className="mt-12">
      <h3 className="text-[15px] font-medium tracking-[-0.02em]">{title}</h3>
      <AssetGrid assets={assets} columns={columns} />
    </div>
  );
}

function AssetGrid({
  assets,
  columns = "sm:grid-cols-2 lg:grid-cols-3",
}: {
  assets: readonly DiversAsset[];
  columns?: string;
}) {
  return (
    <ul className={`mt-5 grid gap-x-4 gap-y-8 ${columns}`}>
      {assets.map((asset) => (
        <li
          key={asset.label}
          className={
            asset.image && asset.image.width / asset.image.height > 1.4 ? "col-span-full" : undefined
          }
        >
          {asset.image ? (
            <GraphicPosters
              frames={[asset.image]}
              projectTitle={milwaukeeDivers.title}
              sizes={
                asset.image.width / asset.image.height > 1.4
                  ? "(min-width: 1440px) 1200px, 92vw"
                  : "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
              }
            />
          ) : (
            <div className="flex aspect-[4/5] items-end border border-dashed border-[var(--gd-rule)] p-4">
              <p className="text-[13px] font-medium tracking-[-0.01em]">{asset.label}</p>
            </div>
          )}
          <p className="mt-2 max-w-[36ch] text-[13px] leading-[1.45] text-[var(--gd-muted)]">{asset.caption}</p>
        </li>
      ))}
    </ul>
  );
}
