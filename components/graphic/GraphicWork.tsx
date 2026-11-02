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
      <div className="flex items-center gap-6 text-[13px] tabular-nums text-[var(--gd-muted)]">
        <span className="relative inline-grid place-items-center">
          <NumberBlob color={project.accent} />
          <span
            className="relative col-start-1 row-start-1 px-3 text-[12px] font-medium leading-none"
            style={{ color: numberInk(project.accent) }}
          >
            {number}
          </span>
        </span>
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
        pair ? "grid-cols-2" : "grid-cols-2 md:grid-cols-3",
      )}
    >
      {frames.map((frame) => (
        <li key={frame.src}>
          <Poster
            frame={frame}
            sizes={pair ? "(min-width: 768px) 45vw, 50vw" : "(min-width: 768px) 30vw, 50vw"}
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

function numberInk(hex: string) {
  const value = Number.parseInt(hex.slice(1), 16);
  const channel = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  const luminance =
    0.2126 * channel((value >> 16) & 255) +
    0.7152 * channel((value >> 8) & 255) +
    0.0722 * channel(value & 255);
  return luminance > 0.2 ? "#121212" : "#F5F5F5";
}

function NumberBlob({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 183.58 61.72"
      aria-hidden
      className="col-start-1 row-start-1 h-[1.7rem] w-auto"
      style={{ color }}
    >
      <path
        fill="currentColor"
        d="M170.01,42.21c1.01-1.22-.25-3.66-2.07-3.24-.16.08-.33.14-.5.2v-.02c-.05.02-.1.04-.15.06-1.18.32-2.28-.06-3.28-1.16.56-.16,14.04-2.75,17.57-3.4,1.91-.35-8.02-5.85-12.12-6.84-1.1-.27-3.99-.49-5.63-1.07,0-.91,0-1.82,0-2.69.64-.21,1.34-.2,2.12.06,1.16.13,1.97-.87,2.06-1.9.94-.08,1.88-.17,2.82-.25,2.02-.19-6.8-5.73-6.8-5.73v-.04c2.36-.4,4.71-.8,7.07-1.2,2.17-.36,1.9-3.3.1-3.87,1.7.52,3.54.85,5.83.42-.42-.29-.84-.52-1.27-.72-2.46-1.13-5.07-.9-7.6-.72.7.22,1.39.47,2.09.71-.64,0-1.27,0-1.91,0-3.95-.01-7.91-.02-11.86-.07-4.96-.06-9.89-.42-14.73-1.21-1.29-.22-2.85-.4-3.7-1-.69-.47-1.41-.85-2.16-1.14-.6-.25-1.21-.43-1.84-.58-.02-.02-.03-.04-.04-.06.82-.54,1.85-.82,3.06-.96-.71-1.23-2.17-1.17-3.36-1.4-.55-.1-1.13-.11-1.7-.15-5.18-.31-10.35-.44-15.52-.79-1.53-.86-3.28-1.24-5.24-1.29-7.43-.17-14.69-.76-22.03-1.84-5.23-.76-10.61-.04-15.8,1.05-1.28.27-2.54.56-3.79.86-2.46.58-4.49.76-7.06-.04-4.93-1.53-10.04-1.43-14.9.37-1.16-.05-2.33-.09-3.49-.14-6.92-1.58-13.57-.86-20.02,1.12-2.69.82-5.23,1.48-5.53,4.27-.18,1.67-2.88,3.28-4.72,4.77-1.53,1.23-10.55-.99-13.25-.09-3.86,1.29,10.01,6.93,12.9,7.02-1.02,1.21.24,3.66,2.06,3.23.16-.07.33-.14.5-.19h0s.1-.02.15-.04c1.19-.32,2.28.06,3.28,1.16-.56.16-14.04,2.74-17.57,3.39-1.91.35,8.02,5.85,12.12,6.85,1.1.27,3.99.49,5.63,1.06,0,.92-.01,1.82-.01,2.7-.64.21-1.34.19-2.12-.07-1.16-.12-1.97.88-2.06,1.9-.94.09-1.88.17-2.82.26-2.02.18,6.8,5.72,6.8,5.72v.05c-2.36.4-4.71.8-7.07,1.19-2.16.37-1.9,3.29-.12,3.87-1.7-.51-3.52-.84-5.81-.42.43.29.86.54,1.3.73,2.45,1.12,5.05.9,7.57.72-.68-.22-1.36-.47-2.04-.7h1.95c3.92.01,7.85.03,11.77.07,4.96.06,9.89.41,14.73,1.21,1.29.21,2.85.4,3.7.99.68.47,1.4.85,2.14,1.15.6.24,1.23.43,1.86.58.02.02.03.04.04.06-.82.53-1.85.82-3.06.95.71,1.23,2.17,1.18,3.36,1.4.55.11,1.13.12,1.7.15,5.17.31,10.35.44,15.52.8,1.53.86,3.28,1.24,5.24,1.28,7.43.18,14.69.77,22.03,1.85,5.22.76,10.6.04,15.79-1.06,1.28-.26,2.55-.55,3.8-.85,2.46-.58,4.49-.76,7.07.04,4.92,1.53,10.03,1.43,14.89-.37,1.16.04,2.33.09,3.49.14,6.92,1.58,13.57.86,20.02-1.12,2.69-.83,5.23-1.48,5.53-4.27.18-1.68,2.88-3.29,4.72-4.77,1.53-1.24,10.55.98,13.25.09,3.86-1.29-10.01-6.94-12.89-7.02Z"
      />
    </svg>
  );
}
