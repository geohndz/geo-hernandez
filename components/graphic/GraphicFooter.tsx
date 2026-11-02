import Link from "next/link";
import { graphic } from "@/content/graphic";

export function GraphicFooter() {
  return (
    <footer className="border-t border-[var(--gd-rule)]">
      <div className="mx-auto flex w-full max-w-[1440px] flex-wrap items-baseline justify-between gap-x-8 gap-y-3 px-5 py-6 text-[14px] md:px-10 lg:px-14">
        <nav aria-label="Contact" className="flex flex-wrap gap-x-6 gap-y-2">
          <a href={`mailto:${graphic.email}`} className="gd-link">
            Email
          </a>
          <a href={graphic.linkedin} className="gd-link" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={graphic.instagram} className="gd-link" target="_blank" rel="noreferrer">
            Instagram
          </a>
          <Link href="/" className="gd-link">
            Product design
          </Link>
        </nav>
        <p className="w-full text-center text-[var(--gd-muted)] md:w-auto">{graphic.year}</p>
      </div>
    </footer>
  );
}
