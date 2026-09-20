import type { MetadataRoute } from "next";
import { pageUpdated, site } from "@/content/site";
import { caseStudies } from "@/content/projects";
import { getCaseStudySlugs } from "@/lib/mdx";

export default function sitemap(): MetadataRoute.Sitemap {
  const studyUpdated = Object.fromEntries(
    caseStudies.map((study) => [study.href, study.updated]),
  );
  const pages = [
    "",
    "/about",
    "/applications",
    "/websites",
    "/creative-explorations",
    ...getCaseStudySlugs().map((slug) => `/interface/${slug}`),
  ];

  return pages.map((path) => ({
    url: `${site.url}${path}`,
    lastModified:
      studyUpdated[path] ??
      pageUpdated[path as keyof typeof pageUpdated] ??
      site.updated,
  }));
}
