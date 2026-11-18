"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

import { ProjectCard } from "@/components/ProjectCard";
import { chunkRows } from "@/lib/layout-rows";
import { filterLabels, introParagraph, portfolioHeadings } from "@/lib/strings";
import type { Project } from "@/lib/wp/types";

const perPage = 13;

type BrowserState = {
  category: string;
  page: number;
};

function readLocation(): BrowserState {
  const params = new URLSearchParams(window.location.search);
  const requestedCategory = params.get("category") ?? "all";
  const category = filterLabels.some((filter) => filter.slug === requestedCategory) ? requestedCategory : "all";
  const requestedPage = Number.parseInt(params.get("page") ?? "1", 10);
  return { category, page: Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1 };
}

function pageHref(category: string, page: number): string {
  const query = new URLSearchParams();
  if (category !== "all") query.set("category", category);
  if (page > 1) query.set("page", String(page));
  const search = query.toString();
  return search ? `/projects?${search}` : "/projects";
}

export function ProjectsBrowser({ projects }: { projects: Project[] }) {
  const [state, setState] = useState<BrowserState>({ category: "all", page: 1 });
  const filteredProjects = useMemo(
    () => state.category === "all" ? projects : projects.filter((project) => project.categories.includes(state.category)),
    [projects, state.category],
  );
  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / perPage));
  const safePage = Math.min(state.page, totalPages);
  const pageData = filteredProjects.slice((safePage - 1) * perPage, safePage * perPage);
  const rows = chunkRows(pageData);

  useEffect(() => {
    const syncFromLocation = () => setState(readLocation());
    syncFromLocation();
    window.addEventListener("popstate", syncFromLocation);
    return () => window.removeEventListener("popstate", syncFromLocation);
  }, []);

  const navigate = useCallback((category: string, page: number) => {
    const href = pageHref(category, page);
    window.history.pushState(null, "", href);
    setState({ category, page });
  }, []);

  const handleNavigation = (event: React.MouseEvent<HTMLAnchorElement>, category: string, page: number) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    navigate(category, page);
  };

  const categoryCounts = new Map(
    filterLabels.map((filter) => [
      filter.slug,
      filter.slug === "all" ? projects.length : projects.filter((project) => project.categories.includes(filter.slug)).length,
    ]),
  );

  return (
    <>
      <section className="px-[clamp(20px,6vw,80px)]">
        <div className="flex flex-wrap items-end justify-between gap-8 pb-[clamp(40px,6vw,88px)] pt-[clamp(40px,6vw,88px)]">
          <div className="min-w-[280px] flex-1 basis-[560px]">
            <p className="mb-5 text-[14px] font-medium uppercase tracking-[0.14em] text-[var(--accent)]">Portfolio</p>
            <h1 className="text-[clamp(40px,6.6vw,96px)] font-semibold leading-[1] tracking-[-0.045em] text-[#0B0B0C]">
              {portfolioHeadings[state.category] ?? portfolioHeadings.all}
            </h1>
          </div>
          <div className="max-w-[420px] flex-1 text-[18px] leading-[1.55] text-[var(--text-2)]">{introParagraph}</div>
        </div>
      </section>

      <section className="px-[clamp(20px,5.5vw,80px)]">
        <nav aria-label="Project categories" className="border-y border-[var(--line)]">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-0">
            {filterLabels.map((filter) => (
              <Link
                key={filter.slug}
                href={filter.slug === "all" ? "/projects" : `/projects?category=${filter.slug}`}
                onClick={(event) => handleNavigation(event, filter.slug, 1)}
                aria-current={filter.slug === state.category ? "page" : undefined}
                className={`inline-flex min-h-[56px] items-center gap-2 border-b-[3px] px-0 text-[16px] font-medium ${
                  filter.slug === state.category ? "border-[var(--accent)] text-[#0B0B0C]" : "border-transparent text-[#5B6068]"
                }`}
              >
                <span>{filter.label}</span>
                <span className="text-[12px] text-[#5B6068]">{categoryCounts.get(filter.slug) ?? 0}</span>
              </Link>
            ))}
          </div>
        </nav>
      </section>

      <p className="px-[clamp(20px,5.5vw,80px)] pt-5 text-[14px] text-[var(--muted)]">
        Showing {filteredProjects.length === 0 ? 0 : (safePage - 1) * perPage + 1} to{" "}
        {Math.min(safePage * perPage, filteredProjects.length)} of {filteredProjects.length} results
      </p>

      <section className="px-[clamp(20px,5.5vw,80px)] pb-4 pt-14">
        {rows.map((row, rowIndex) => (
          <div key={`${rowIndex}-${row[0]?.slug ?? "empty"}`} className="mb-[56px] flex flex-wrap gap-x-[28px] gap-y-[56px]">
            {row.map((project, projectIndex) => (
              <div
                key={project.slug}
                className={`min-w-[min(100%,300px)] ${row.length === 3 ? "flex-[1_1_calc((100%_-_56px)_/_3)]" : "flex-[1_1_calc((100%_-_28px)_/_2)]"}`}
              >
                <ProjectCard project={project} layout={row.length === 2 ? "wide" : "regular"} priority={rowIndex === 0 && projectIndex === 0} />
              </div>
            ))}
          </div>
        ))}
        {filteredProjects.length === 0 && (
          <div className="py-16 text-center">
            <p className="mb-4 text-[18px] text-[var(--text-2)]">No projects in this category yet.</p>
            <Link href="/projects" onClick={(event) => handleNavigation(event, "all", 1)} className="font-semibold text-[var(--accent)] underline underline-offset-4">
              View all projects
            </Link>
          </div>
        )}
      </section>

      {filteredProjects.length > perPage && (
        <nav aria-label="Project pages" className="flex justify-center gap-3 pb-8 pt-2 text-[15px] font-medium text-[#0B0B0C]">
          <Link
            href={safePage > 1 ? pageHref(state.category, safePage - 1) : "#"}
            onClick={(event) => safePage > 1 && handleNavigation(event, state.category, safePage - 1)}
            aria-disabled={safePage <= 1}
            className={`inline-flex min-h-[44px] items-center rounded-full border border-[var(--btn-border)] px-[20px] ${safePage <= 1 ? "cursor-not-allowed opacity-40" : "opacity-100"}`}
          >
            Previous
          </Link>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <Link
              key={page}
              href={pageHref(state.category, page)}
              onClick={(event) => handleNavigation(event, state.category, page)}
              aria-current={page === safePage ? "page" : undefined}
              className={`inline-flex h-[44px] w-[44px] items-center justify-center rounded-full border ${
                page === safePage ? "border-[#0B0B0C] bg-[#0B0B0C] text-white" : "border-[var(--btn-border)] bg-white text-[#0B0B0C]"
              }`}
            >
              {page}
            </Link>
          ))}
          <Link
            href={safePage < totalPages ? pageHref(state.category, safePage + 1) : "#"}
            onClick={(event) => safePage < totalPages && handleNavigation(event, state.category, safePage + 1)}
            aria-disabled={safePage >= totalPages}
            className={`inline-flex min-h-[44px] items-center rounded-full border border-[var(--btn-border)] px-[20px] ${safePage >= totalPages ? "cursor-not-allowed opacity-40" : "opacity-100"}`}
          >
            Next
          </Link>
        </nav>
      )}
    </>
  );
}
