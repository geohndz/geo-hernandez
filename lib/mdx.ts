import fs from "node:fs";
import path from "node:path";
import { compileMDX } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx";

export type CaseFrontmatter = {
  slug: string;
  kicker: string;
  title: string;
  eyebrow: string;
  subtitle: string;
  description?: string;
  role: string;
  timeline: string;
  type: string;
  tools: string[];
  overview: {
    background: string;
    problem: string;
    solution: string;
    outcome: string;
  };
  disclaimer?: string;
  toc: { id: string; label: string }[];
};

const dir = path.join(process.cwd(), "content/case-studies");

export function getCaseStudySlugs() {
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

const WORDS_PER_MINUTE = 225;

const COMPONENT_COPY: Record<string, string[]> = {
  WhyBuildIt: ["components/mdx.tsx"],
  MapTypes: ["components/mdx.tsx"],
  Opportunity: ["components/mdx.tsx"],
  ResearchClusters: ["components/mdx.tsx"],
  Pause: ["components/mdx.tsx"],
  VisualRefinements: ["components/mdx.tsx"],
  ResearchBoard: ["components/work/ResearchBoard.tsx"],
  Constraints: ["components/work/Constraints.tsx"],
  DecisionGlobe: ["components/work/DesignDecisions.tsx"],
  PhaseCarousel: ["components/work/PhaseCarousel.tsx"],
  TeacherTools: ["components/work/TeacherTools.tsx"],
  InternalTools: [
    "components/work/InternalTools.tsx",
    "components/work/WorkflowClock.tsx",
  ],
  Validation: ["components/work/StudyClose.tsx"],
  Impact: ["components/work/StudyClose.tsx"],
  Reflection: ["components/work/StudyClose.tsx"],
  F1Why: ["components/work/F1Study.tsx"],
  F1Opportunity: ["components/work/F1Study.tsx"],
  F1Solution: ["components/work/F1Study.tsx"],
  F1Constraints: ["components/work/F1Study.tsx"],
  F1Direction: ["components/work/F1Study.tsx"],
  F1Validation: ["components/work/F1Study.tsx"],
  F1Reflection: ["components/work/F1Study.tsx"],
  F1Research: ["components/work/F1Research.tsx"],
  F1SpatialModel: ["components/work/F1SpatialModel.tsx"],
  F1Modules: ["components/work/F1Modules.tsx"],
};

function wordCount(text: string) {
  return text.match(/[A-Za-z0-9]+(?:['’][A-Za-z]+)?/g)?.length ?? 0;
}

function isUtilityClassString(value: string) {
  const tokens = value.trim().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return true;
  return tokens.every((token) =>
    /^(sm:|md:|lg:|xl:|2xl:|hover:|focus(?:-visible)?:|active:|aria-|data-|group-hover:|dark:)?[a-z0-9-\[\]/%.,_]+$/.test(
      token,
    ),
  );
}

function isSkippableString(value: string, before: string) {
  if (/^\s*(https?:|\/media\/|\/framer\/|@\/)/.test(value)) return true;
  if (/(?:^|[\s,{])(?:alt|src|href|className|class|aria-label|aria-labelledby|role)\s*[:=]\s*$/.test(before)) {
    return true;
  }
  if (!/[A-Za-z]/.test(value)) return true;
  if (!/\s/.test(value) && value.length < 28) return true;
  if (isUtilityClassString(value)) return true;
  return false;
}

function proseFromQuotedStrings(source: string) {
  const withoutComments = source
    .replace(/\/\*[\s\S]*?\*\//g, " ")
    .replace(/^\s*\/\/.*$/gm, " ");
  const collected: string[] = [];
  const pattern = /(["'`])((?:\\.|(?!\1)[\s\S])*?)\1/g;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(withoutComments))) {
    const raw = match[2].replace(/\\n/g, " ").replace(/\\'/g, "'").replace(/\\"/g, '"');
    const before = withoutComments.slice(Math.max(0, match.index - 24), match.index);
    if (isSkippableString(raw, before)) continue;
    collected.push(raw);
  }
  return collected.join(" ");
}

function proseFromMdxBody(body: string) {
  const fromProps = [...body.matchAll(/\b(?:title|problem|solution|why|body|label|caption)="([^"]+)"/gi)]
    .map((match) => match[1])
    .join(" ");
  const fromMarkup = body
    .replace(/<[^>]+>/g, " ")
    .replace(/[#*_`>~]/g, " ");
  return `${fromMarkup} ${fromProps}`;
}

function componentCopyFor(body: string) {
  const names = new Set(
    [...body.matchAll(/<([A-Z][A-Za-z0-9]*)/g)].map((match) => match[1]),
  );
  const files = new Set<string>();
  for (const name of names) {
    for (const file of COMPONENT_COPY[name] ?? []) files.add(file);
  }
  return [...files]
    .map((file) =>
      proseFromQuotedStrings(fs.readFileSync(path.join(process.cwd(), file), "utf8")),
    )
    .join(" ");
}

function readingMinutesFrom(source: string, frontmatter: CaseFrontmatter) {
  const body = source.replace(/^---[\s\S]*?---\n/, "");
  const fromMeta = [
    frontmatter.title,
    frontmatter.eyebrow,
    frontmatter.subtitle,
    frontmatter.description ?? "",
    frontmatter.role,
    frontmatter.timeline,
    frontmatter.type,
    frontmatter.overview.background,
    frontmatter.overview.problem,
    frontmatter.overview.solution,
    frontmatter.overview.outcome,
  ].join(" ");
  const words = wordCount(
    `${proseFromMdxBody(body)} ${fromMeta} ${componentCopyFor(body)}`,
  );
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

export async function getCaseStudy(slug: string) {
  const source = fs.readFileSync(path.join(dir, `${slug}.mdx`), "utf8");
  const { content, frontmatter } = await compileMDX<CaseFrontmatter>({
    source,
    options: { parseFrontmatter: true },
    components: mdxComponents,
  });
  return {
    content,
    frontmatter,
    readingMinutes: readingMinutesFrom(source, frontmatter),
  };
}
