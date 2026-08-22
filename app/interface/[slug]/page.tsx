import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyView } from "@/components/work/CaseStudyView";
import { getCaseStudy, getCaseStudySlugs } from "@/lib/mdx";

export function generateStaticParams() {
  return getCaseStudySlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { frontmatter } = await getCaseStudy(slug);
    return {
      title: frontmatter.title,
      description: frontmatter.subtitle,
    };
  } catch {
    return { title: "Case Study" };
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!getCaseStudySlugs().includes(slug)) notFound();

  const { content, frontmatter, readingMinutes } = await getCaseStudy(slug);

  return (
    <CaseStudyView
      slug={slug}
      frontmatter={frontmatter}
      readingMinutes={readingMinutes}
    >
      {content}
    </CaseStudyView>
  );
}
