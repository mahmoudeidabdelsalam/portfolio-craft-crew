import type { MetadataRoute } from "next";

import { getSlugs } from "@/lib/projects";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const slugs = await getSlugs();

  return [
    { url: `${baseUrl}/projects`, changeFrequency: "weekly", priority: 1 },
    ...slugs.map((slug) => ({
      url: `${baseUrl}/projects/${encodeURIComponent(slug)}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
