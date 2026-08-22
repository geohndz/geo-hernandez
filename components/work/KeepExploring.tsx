import { Reveal } from "@/components/motion/Reveal";
import { PageWidth } from "@/components/layout/PageWidth";
import { FolderCard } from "@/components/home/FolderCard";
import { workIndex } from "@/content/projects";

export function KeepExploring({ exclude }: { exclude: string }) {
  const items = workIndex.filter((item) => item.href !== exclude);

  return (
    <section className="px-6 py-20 md:px-12 lg:px-16">
      <PageWidth>
      <Reveal className="text-center">
        <h2 className="font-display text-[27px] tracking-[-0.03em] md:text-[34px]">
          Keep Exploring
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-[15px] text-muted">
          Every project tells a different story. Explore more of my work across
          applications, websites, and creative explorations.
        </p>
      </Reveal>
      <div className="mt-8 flex flex-wrap justify-center gap-5 pt-4">
        {items.map((item, i) => (
          <Reveal key={item.href} delay={i * 0.06} className="w-full max-w-folder">
            <FolderCard item={item} />
          </Reveal>
        ))}
      </div>
      </PageWidth>
    </section>
  );
}
