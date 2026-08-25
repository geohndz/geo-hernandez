import type { GalleryProject } from "@/content/projects";
import { PhoneShowcase } from "@/components/work/PhoneShowcase";
import { cn } from "@/lib/cn";

const washes = {
  orange:
    "[background-image:linear-gradient(145deg,rgba(232,110,40,0.32)_0%,rgba(140,50,16,0.16)_46%,transparent_100%)]",
  red: "[background-image:linear-gradient(145deg,rgba(196,48,48,0.38)_0%,rgba(120,24,24,0.16)_46%,transparent_100%)]",
  navy: "[background-image:linear-gradient(145deg,rgba(32,58,140,0.40)_0%,rgba(16,28,82,0.18)_46%,transparent_100%)]",
  ice: "[background-image:linear-gradient(145deg,rgba(48,140,168,0.38)_0%,rgba(16,52,72,0.18)_46%,transparent_100%)]",
} as const;

export function ApplicationArtifactCard({ project }: { project: GalleryProject }) {
  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-[24px] border border-line-strong bg-card",
        washes[project.wash ?? "orange"],
      )}
    >
      <header className="relative z-0 flex flex-col gap-4 px-6 pt-6 md:flex-row md:items-start md:justify-between md:px-8 md:pt-8">
        <div className="max-w-2xl">
          <h2 className="font-display text-[23px] font-medium tracking-[-0.03em] md:text-[27px]">
            {project.title}
          </h2>
          <p className="mt-2 text-[15px] leading-relaxed text-muted">{project.description}</p>
          {project.challenge || project.focus || project.contribution ? (
            <dl className="mt-5 space-y-3 text-[13.5px] leading-relaxed">
              {project.challenge ? (
                <div>
                  <dt className="font-medium text-fg">Challenge</dt>
                  <dd className="mt-0.5 text-muted">{project.challenge}</dd>
                </div>
              ) : null}
              {project.focus ? (
                <div>
                  <dt className="font-medium text-fg">Design focus</dt>
                  <dd className="mt-0.5 text-muted">{project.focus}</dd>
                </div>
              ) : null}
              {project.contribution ? (
                <div>
                  <dt className="font-medium text-fg">Contribution</dt>
                  <dd className="mt-0.5 text-muted">{project.contribution}</dd>
                </div>
              ) : null}
            </dl>
          ) : null}
          {project.tags ? (
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-line px-2.5 py-1 text-[11px] text-dim"
                >
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        {project.category ? (
          <p className="shrink-0 self-start rounded-full border border-line px-3 py-1 text-[12px] text-muted">
            {project.category}
          </p>
        ) : null}
      </header>

      <PhoneShowcase project={project} className="mt-6" controls="card" />
    </article>
  );
}
