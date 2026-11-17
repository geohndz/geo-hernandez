import Link from "next/link";
import { Eye, Heart, Repeat2, Send } from "lucide-react";
import { cn } from "@/lib/cn";
import { GraphicPosters } from "@/components/graphic/GraphicPosters";
import { projectPoster, type GraphicProject, type GraphicStat } from "@/content/graphic";

export function GraphicWork({ projects }: { projects: GraphicProject[] }) {
  const featured = featuredTitles
    .map((title) => projects.find((project) => project.title === title))
    .filter((project): project is GraphicProject => Boolean(project));
  const more = projects.filter((project) => project.group === "more");
  const stories = projects.filter((project) => project.group === "story");

  return (
    <>
      <section id="work" className="scroll-mt-16 border-t border-[var(--gd-rule)]">
        <div className="mx-auto w-full max-w-[1440px] px-5 py-16 md:px-10 md:py-24 lg:px-14">
          <h2 className="font-medium text-[1.75rem] leading-none tracking-[-0.03em] md:text-[2rem]">
            Work
          </h2>
          <ol className="mt-10 md:mt-14">
            {featured.map((project, i) => (
              <li key={project.title} className="border-t border-[var(--gd-rule)]">
                <ProjectRow project={project} index={i} />
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="more-work" className="scroll-mt-16 border-t border-[var(--gd-rule)]">
        <div className="mx-auto w-full max-w-[1440px] px-5 py-16 md:px-10 md:py-24 lg:px-14">
          <h2 className="font-medium text-[1.75rem] leading-none tracking-[-0.03em] md:text-[2rem]">
            More work
          </h2>
          <ol className="mt-10 md:mt-14">
            {more.map((project) => {
              const frames = framesFor(project);
              return (
                <li key={project.title} className="border-t border-[var(--gd-rule)] py-8 md:py-10">
                  <h3 className="font-medium text-[1.15rem] leading-none tracking-[-0.03em] md:text-[1.35rem]">
                    {project.title}
                  </h3>
                  <div className="mt-5">
                    <GraphicPosters
                      frames={frames}
                      projectTitle={project.title}
                      gridClassName={moreGrid(frames.length)}
                      sizes="(min-width: 768px) 22vw, 50vw"
                    />
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {stories.map((project) => (
        <StoryCard key={project.title} project={project} />
      ))}
    </>
  );
}

const featuredTitles = [
  "Milwaukee Divers | Sports Mascot & Identity",
  "Pensacola Christian College | Athletics",
  "Pepsi | Gracias Leo",
  "Delta Psi Delta Raiders | Mascot Expansion",
];

function framesFor(project: GraphicProject) {
  const poster = projectPoster(project);
  return project.images?.length ? project.images : poster ? [poster] : [];
}

function moreGrid(count: number) {
  if (count >= 3) return "grid grid-cols-3 gap-3 sm:gap-4";
  return "grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4";
}

function StoryCard({ project }: { project: GraphicProject }) {
  return (
    <section className="border-t border-[var(--gd-rule)]">
      <div className="mx-auto w-full max-w-[1440px] px-5 py-16 md:px-10 md:py-24 lg:px-14">
        <article className="border border-[var(--gd-rule)] p-5 md:p-8 lg:p-10">
          <div className="flex items-center gap-3 text-[13px] font-medium tracking-[-0.01em]">
            <p style={{ color: project.accent }}>Story</p>
            <p className="text-[var(--gd-muted)]">Coming soon</p>
          </div>
          <h2 className="mt-3 max-w-[18ch] font-medium text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.05] tracking-[-0.03em]">
            {project.title}
          </h2>
          {project.lede ? (
            <p className="mt-4 max-w-[36ch] text-[16px] leading-[1.45] text-[var(--gd-muted)]">{project.lede}</p>
          ) : null}
          <div className="mt-8">
            <GraphicPosters
              frames={framesFor(project)}
              projectTitle={project.title}
              gridClassName="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5"
              sizes="(min-width: 1024px) 16vw, (min-width: 640px) 30vw, 45vw"
            />
          </div>
        </article>
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
        <span className="font-medium leading-none" style={{ color: project.accent }}>
          {number}
        </span>
        {project.year ? <span>{project.year}</span> : null}
      </div>
      <h3 className="mt-5 font-medium text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.05] tracking-[-0.03em]">
        {project.title}
      </h3>
      <ProjectCopy project={project} />
      {project.stats ? <ProjectStats stats={project.stats} /> : null}
      {project.studyHref ? (
        <Link
          href={project.studyHref}
          className="mt-6 inline-flex items-center border border-[var(--gd-ink)] px-4 py-2.5 text-[13px] font-medium tracking-[-0.01em] transition-colors hover:bg-[var(--gd-ink)] hover:text-[var(--gd-paper)]"
        >
          Case study
        </Link>
      ) : null}
    </div>
  );

  const feature = project.presentation === "collage" || project.presentation === "band";
  const gallery = series ? (
    <div className="md:col-span-12 md:mt-2">
      <GraphicPosters
        frames={frames}
        projectTitle={project.title}
        layout={feature ? project.presentation : undefined}
        gridClassName={
          feature
            ? undefined
            : cn("grid gap-3 sm:gap-4", pair ? "grid-cols-2" : "grid-cols-2 md:grid-cols-3")
        }
        sizes={
          feature
            ? "(min-width: 768px) 46vw, 100vw"
            : pair
              ? "(min-width: 768px) 45vw, 50vw"
              : "(min-width: 768px) 30vw, 50vw"
        }
      />
    </div>
  ) : (
    <div className={cn("md:col-span-7 md:row-start-1", flip ? "md:col-start-1" : "md:col-start-6")}>
      {frames[0] ? (
        <GraphicPosters
          frames={frames}
          projectTitle={project.title}
          sizes="(min-width: 768px) 55vw, 100vw"
        />
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

function ProjectCopy({ project }: { project: GraphicProject }) {
  return (
    <p className="mt-4 max-w-[46ch] text-[15px] leading-[1.55] text-[var(--gd-muted)]">{project.copy}</p>
  );
}

const statIcons = {
  views: Eye,
  likes: Heart,
  shares: Send,
  reshares: Repeat2,
} as const;

function ProjectStats({ stats }: { stats: readonly GraphicStat[] }) {
  return (
    <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2.5">
      {stats.map((stat) => {
        const Icon = statIcons[stat.icon];
        return (
          <li key={stat.icon} className="flex items-center gap-1.5 text-[13px] leading-none">
            <Icon aria-hidden className="size-4 shrink-0" strokeWidth={1.7} />
            <span className="tabular-nums tracking-[-0.02em]">{stat.value}</span>
            <span className="text-[var(--gd-muted)]">{stat.label}</span>
          </li>
        );
      })}
    </ul>
  );
}
