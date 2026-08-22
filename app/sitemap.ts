import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { getCaseStudySlugs } from "@/lib/mdx";

export default function sitemap(): MetadataRoute.Sitemap {
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
    lastModified: new Date(),
  }));
}
