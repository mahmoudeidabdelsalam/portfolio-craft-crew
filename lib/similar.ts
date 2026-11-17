import type { Project } from "@/lib/wp/types";

export function getSimilarProjects(current: Project, projects: Project[]): Project[] {
  const others = projects.filter((project) => project.slug !== current.slug);
  const related = current.relatedSlugs
    .map((slug) => others.find((project) => project.slug === slug))
    .filter((project): project is Project => Boolean(project));

  if (related.length > 0) {
    const relatedSlugs = new Set(related.map((project) => project.slug));
    const newest = others
      .filter((project) => !relatedSlugs.has(project.slug))
      .sort((a, b) => b.date.localeCompare(a.date) || a.order - b.order);
    return [...related, ...newest].slice(0, 3);
  }

  const serviceSlugs = new Set(current.services.map((service) => service.slug));
  const ranked = [...others].sort((a, b) => {
    const aOverlap = a.services.filter((service) => serviceSlugs.has(service.slug)).length;
    const bOverlap = b.services.filter((service) => serviceSlugs.has(service.slug)).length;
    return (
      bOverlap - aOverlap ||
      (aOverlap === 0 ? b.date.localeCompare(a.date) : 0) ||
      a.order - b.order
    );
  });

  return ranked.slice(0, 3);
}
