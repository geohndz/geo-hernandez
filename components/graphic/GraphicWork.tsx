import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { projectPoster, type GraphicFrame, type GraphicProject } from "@/content/graphic";

export function GraphicWork({ projects }: { projects: GraphicProject[] }) {
  return (
    <section id="work" className="scroll-mt-16 border-t border-[var(--gd-rule)]">
      <div className="mx-auto w-full max-w-[1440px] px-5 py-16 md:px-10 md:py-24 lg:px-14">
        <h2 className="font-medium text-[1.75rem] leading-none tracking-[-0.03em] md:text-[2rem]">
          Work
        </h2>
        <ol className="mt-10 md:mt-14">
          {projects.map((project, i) => (
            <li key={project.title} className="border-t border-[var(--gd-rule)]">
              <ProjectRow project={project} index={i} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function ProjectRow({ project, index }: { project: GraphicProject; index: number }) {
  const flip = index % 2 === 1;
  const number = String(index + 1).padStart(2, "0");
  const poster = projectPoster(project);
  const frames = project.images?.length ? project.images : poster ? [poster] : [];
  const series = frames.length > 1;
  const pair = frames.length === 2;

  const copy = (
    <div
      className={cn(
        series ? "md:col-span-8" : "md:col-span-5 md:row-start-1",
        !series && (flip ? "md:col-start-8" : "md:col-start-1"),
      )}
    >
      <div className="flex items-baseline gap-6 text-[13px] tabular-nums text-[var(--gd-muted)]">
        <span>{number}</span>
        {project.year ? <span>{project.year}</span> : null}
      </div>
      <h3 className="mt-5 font-medium text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.05] tracking-[-0.03em]">
        {project.title}
      </h3>
      <p className="mt-4 max-w-[46ch] text-[15px] leading-[1.55] text-[var(--gd-muted)]">
        {project.summary}
      </p>
    </div>
  );

  const gallery = series ? (
    <ul
      className={cn(
        "grid gap-3 sm:gap-4 md:col-span-12 md:mt-2",
        pair ? "grid-cols-2" : "grid-cols-3",
      )}
    >
      {frames.map((frame) => (
        <li key={frame.src}>
          <Poster
            frame={frame}
            sizes={pair ? "(min-width: 768px) 45vw, 50vw" : "(min-width: 768px) 30vw, 33vw"}
          />
        </li>
      ))}
    </ul>
  ) : (
    <div className={cn("md:col-span-7 md:row-start-1", flip ? "md:col-start-1" : "md:col-start-6")}>
      {frames[0] ? (
        <Poster frame={{ ...frames[0], alt: "" }} sizes="(min-width: 768px) 55vw, 100vw" />
      ) : (
        <div aria-hidden className="aspect-[5/4] border border-[var(--gd-rule)]" />
      )}
    </div>
  );

  const body = (
    <div className="grid items-start gap-8 py-10 md:grid-cols-12 md:gap-x-12 md:py-14">
      {copy}
      {gallery}
    </div>
  );

  if (!project.href) return body;

  if (project.href.startsWith("/")) {
    return (
      <Link href={project.href} className="block">
        {body}
      </Link>
    );
  }

  return (
    <a href={project.href} className="block" target="_blank" rel="noreferrer">
      {body}
    </a>
  );
}

function Poster({ frame, sizes }: { frame: GraphicFrame; sizes: string }) {
  return (
    <Image
      src={frame.src}
      alt={frame.alt ?? ""}
      width={frame.width}
      height={frame.height}
      sizes={sizes}
      className="h-auto w-full"
    />
  );
}
