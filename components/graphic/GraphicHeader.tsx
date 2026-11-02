import { graphic } from "@/content/graphic";

export function GraphicHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--gd-rule)] bg-[var(--gd-paper)]">
      <div className="mx-auto flex w-full max-w-[1440px] items-baseline justify-between gap-4 px-5 py-4 md:px-10 lg:px-14">
        <a href="#top" className="gd-link whitespace-nowrap text-[14px] tracking-[-0.02em] sm:text-[15px]">
          {graphic.header}
        </a>
        <nav aria-label="Page" className="flex gap-4 text-[13px] sm:gap-6 sm:text-[14px]">
          <a href="#work" className="gd-link">
            Work
          </a>
          <a href="#about" className="gd-link">
            About
          </a>
          <a href={`mailto:${graphic.email}`} className="gd-link">
            Email
          </a>
        </nav>
      </div>
    </header>
  );
}
