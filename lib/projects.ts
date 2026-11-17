import { fetchGraphQL } from "@/lib/wp/client";
import { mapProject } from "@/lib/wp/mappers";
import {
  ALL_PROJECTS_QUERY,
  PROJECT_BY_SLUG_QUERY,
  PROJECT_SLUGS_QUERY,
} from "@/lib/wp/queries";
import type {
  AllProjectsResponse,
  Project,
  ProjectBySlugResponse,
  ProjectSlugsResponse,
} from "@/lib/wp/types";

export { getSimilarProjects } from "@/lib/similar";

export async function getAllProjects(): Promise<Project[]> {
  // TODO: Switch to cursor pagination once the portfolio exceeds 100 projects.
  const data = await fetchGraphQL<AllProjectsResponse>(ALL_PROJECTS_QUERY);
  return (data.projects?.nodes ?? []).map(mapProject);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const data = await fetchGraphQL<ProjectBySlugResponse>(PROJECT_BY_SLUG_QUERY, { slug });
  return data.project ? mapProject(data.project) : null;
}

export async function getSlugs(): Promise<string[]> {
  const data = await fetchGraphQL<ProjectSlugsResponse>(PROJECT_SLUGS_QUERY);
  return (data.projects?.nodes ?? [])
    .map((project) => project.slug)
    .filter((slug): slug is string => Boolean(slug));
}

export function getProjectsByCategory(projects: Project[], category?: string | null): Project[] {
  if (!category || category === "all") return projects;
  return projects.filter((project) => project.categories.includes(category));
}

export function getNextProject(projects: Project[], currentSlug: string): Project | null {
  if (projects.length === 0) return null;
  const index = projects.findIndex((project) => project.slug === currentSlug);
  const safeIndex = index >= 0 ? index : 0;
  return projects[(safeIndex + 1) % projects.length] ?? null;
}
