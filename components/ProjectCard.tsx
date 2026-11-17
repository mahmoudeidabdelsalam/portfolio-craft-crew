import Link from "next/link";
import Image from "next/image";

import { PlaceholderArt } from "@/components/PlaceholderArt";
import type { Project } from "@/lib/wp/types";

interface ProjectCardProps {
  project: Project;
  layout?: "regular" | "wide";
  priority?: boolean;
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M5 19 19 5" strokeLinecap="round" />
      <path d="M8 5h11v11" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ProjectCard({ project, layout = "regular", priority = false }: ProjectCardProps) {
  const useWide = layout === "wide";
  const visibleServices = project.services.slice(0, 3);
  const extraCount = Math.max(0, project.services.length - visibleServices.length);

  return (
    <article className="group flex min-w-[min(100%,300px)] flex-col gap-3">
      <div className="overflow-hidden rounded-[20px]" style={{ background: project.cardBackground }}>
        <div className="project-zoom h-full w-full overflow-hidden rounded-[20px]">
          <div className={`relative overflow-hidden ${useWide ? "aspect-[16/10]" : "aspect-[4/3]"}`} style={{ background: project.cardBackground }}>
            {project.thumbnail ? (
              <Image
                src={project.thumbnail.url}
                alt={project.thumbnail.alt}
                fill
                priority={priority}
                sizes={useWide ? "(min-width: 1000px) 50vw, 100vw" : "(min-width: 1000px) 33vw, 100vw"}
                className="object-cover"
                style={{ objectPosition: project.thumbnailFocus }}
              />
            ) : (
              <PlaceholderArt seed={project.slug} />
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className={`font-[family-name:var(--font-display)] font-semibold tracking-[-0.025em] text-[#0B0B0C] ${useWide ? "text-[30px] leading-[1.15]" : "text-[24px] leading-[1.15]"}`}>
          {project.title}
        </h3>

        <div className="flex flex-wrap gap-2">
          {visibleServices.map((service) => (
            <span key={service.slug} className="inline-flex items-center rounded-full border border-[var(--pill)] px-[12px] py-[5px] text-[12px] font-medium text-[#3D4249]">
              {service.name}
            </span>
          ))}
          {extraCount > 0 && (
            <span className="inline-flex items-center rounded-full border border-[var(--pill-2)] px-[12px] py-[5px] text-[12px] font-medium text-[#5B6068]">
              +{extraCount}
            </span>
          )}
        </div>

        <Link
          href={`/projects/${project.slug}`}
          className="project-link inline-flex items-center gap-[8px] text-[15px] font-semibold text-[#0B0B0C] transition-all duration-200"
        >
          <span>Show project</span>
          <span className="flex h-5 items-center justify-center">
            <ArrowIcon />
          </span>
        </Link>
      </div>
    </article>
  );
}
