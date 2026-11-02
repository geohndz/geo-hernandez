import { GraphicPortrait } from "@/components/graphic/GraphicPortrait";
import { graphic } from "@/content/graphic";

export function GraphicAbout() {
  return (
    <section id="about" className="scroll-mt-16 border-t border-[var(--gd-rule)]">
      <div className="mx-auto grid w-full max-w-[1440px] gap-12 px-5 py-16 md:grid-cols-12 md:gap-10 md:px-10 md:py-24 lg:px-14">
        <div className="md:col-span-6">
          <h2 className="font-medium text-[1.75rem] leading-none tracking-[-0.03em] md:text-[2rem]">
            About
          </h2>
          <div className="mt-8 max-w-[38rem] space-y-5 text-[17px] leading-[1.55]">
            {graphic.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="overflow-visible md:col-span-5 md:col-start-8">
          <GraphicPortrait />
        </div>
      </div>
    </section>
  );
}
