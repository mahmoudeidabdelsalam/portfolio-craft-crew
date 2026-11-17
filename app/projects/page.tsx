import Link from "next/link";
import { redirect } from "next/navigation";

import { ProjectCard } from "@/components/ProjectCard";
import { chunkRows } from "@/lib/layout-rows";
import { getAllProjects, getProjectsByCategory } from "@/lib/projects";
import { contacts, mainSiteUrl, navLinks } from "@/lib/site";
import { filterLabels, introParagraph, portfolioHeadings } from "@/lib/strings";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-[22px] font-bold tracking-[-0.02em] text-[#0B0B0C]">
      <span className="font-[family-name:var(--font-display)] lowercase">craft crew</span>
    </Link>
  );
}

function pageHref(category: string, page: number): string {
  const query = new URLSearchParams();
  if (category !== "all") query.set("category", category);
  query.set("page", String(page));
  return `/projects?${query.toString()}`;
}

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string; page?: string }>;
}) {
  const params = searchParams ? await searchParams : {};
  const allProjects = await getAllProjects();
  const activeCategory = filterLabels.some((filter) => filter.slug === params.category)
    ? params.category ?? "all"
    : "all";
  const parsedPage = Number.parseInt(params.page ?? "1", 10);
  const currentPageNumber = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const filteredProjects = getProjectsByCategory(allProjects, activeCategory);
  const perPage = 13;
  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / perPage));
  const safePage = Math.min(currentPageNumber, totalPages);
  if (currentPageNumber > totalPages) {
    redirect(pageHref(activeCategory, totalPages));
  }
  const pageData = filteredProjects.slice((safePage - 1) * perPage, safePage * perPage);
  const rows = chunkRows(pageData);
  const categoryCounts = new Map(
    filterLabels.map((filter) => [
      filter.slug,
      filter.slug === "all"
        ? allProjects.length
        : allProjects.filter((project) => project.categories.includes(filter.slug)).length,
    ]),
  );

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#0B0B0C]">
      <header className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-b border-[var(--line)] px-[clamp(20px,5.5vw,80px)] py-6">
        <Logo />

        <nav aria-label="Main navigation" className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[15px] font-medium text-[#0B0B0C]">
          {navLinks.map((link) => {
            const isCurrent = link.label === "Projects";
            return (
              <Link
                key={link.label}
                href={link.href}
                className={isCurrent ? "border-b-2 border-[#0B0B0C] pb-1" : "text-[#3D4249]"}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4 text-[15px] font-medium text-[#0B0B0C]">
          <button type="button" className="bg-transparent text-[#0B0B0C]">
            English
          </button>
          <Link
            href={`${mainSiteUrl}/contact`}
            className="inline-flex items-center justify-center rounded-full bg-[#0B0B0C] px-[22px] py-[14px] text-white"
          >
            Discuss your project
          </Link>
        </div>
      </header>

      <main className="pb-12">
        <section className="flex flex-wrap items-end justify-between gap-8 px-[clamp(20px,5.5vw,80px)] pb-[clamp(40px,6vw,88px)] pt-[clamp(40px,6vw,88px)]">
          <div className="min-w-[280px] flex-1 basis-[560px]">
            <p className="mb-5 text-[14px] font-medium uppercase tracking-[0.14em] text-[var(--accent)]">Portfolio</p>
            <h1 className="text-[clamp(40px,6.6vw,96px)] font-semibold leading-[1] tracking-[-0.045em] text-[#0B0B0C]">
              {portfolioHeadings[activeCategory] ?? portfolioHeadings.all}
            </h1>
          </div>

          <div className="max-w-[420px] flex-1 text-[18px] leading-[1.55] text-[var(--text-2)]">
            {introParagraph}
          </div>
        </section>

        <nav aria-label="Project categories" className="border-y border-[var(--line)]">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-0 px-[clamp(20px,5.5vw,80px)]">
            {filterLabels.map((filter) => {
              const count = categoryCounts.get(filter.slug) ?? 0;
              const isActive = filter.slug === activeCategory;
              return (
                <Link
                  key={filter.slug}
                  href={filter.slug === "all" ? "/projects" : `/projects?category=${filter.slug}`}
                  aria-current={isActive ? "page" : undefined}
                  className={`inline-flex min-h-[56px] items-center gap-2 border-b-[3px] px-0 text-[16px] font-medium ${
                    isActive ? "border-[var(--accent)] text-[#0B0B0C]" : "border-transparent text-[#5B6068]"
                  }`}
                >
                  <span>{filter.label}</span>
                  <span className="text-[12px] text-[#5B6068]">{count}</span>
                </Link>
              );
            })}
          </div>
        </nav>

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
              <Link href="/projects" className="font-semibold text-[var(--accent)] underline underline-offset-4">
                View all projects
              </Link>
            </div>
          )}
        </section>

        {filteredProjects.length > 13 && (
          <div className="flex justify-center gap-3 pb-8 pt-2 text-[15px] font-medium text-[#0B0B0C]">
            <Link
              href={safePage > 1 ? pageHref(activeCategory, safePage - 1) : "#"}
              aria-disabled={safePage <= 1}
              className={`inline-flex min-h-[44px] items-center rounded-full border border-[var(--btn-border)] px-[20px] ${
                safePage <= 1 ? "cursor-not-allowed opacity-40" : "opacity-100"
              }`}
            >
              Previous
            </Link>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <Link
                key={page}
                href={pageHref(activeCategory, page)}
                aria-current={page === safePage ? "page" : undefined}
                className={`inline-flex h-[44px] w-[44px] items-center justify-center rounded-full border ${
                  page === safePage ? "border-[#0B0B0C] bg-[#0B0B0C] text-white" : "border-[var(--btn-border)] bg-white text-[#0B0B0C]"
                }`}
              >
                {page}
              </Link>
            ))}

            <Link
              href={safePage < totalPages ? pageHref(activeCategory, safePage + 1) : "#"}
              aria-disabled={safePage >= totalPages}
              className={`inline-flex min-h-[44px] items-center rounded-full border border-[var(--btn-border)] px-[20px] ${
                safePage >= totalPages ? "cursor-not-allowed opacity-40" : "opacity-100"
              }`}
            >
              Next
            </Link>
          </div>
        )}

        <section className="px-[clamp(20px,5.5vw,80px)] pb-12 pt-8">
          <div className="flex flex-wrap items-end justify-between gap-8 rounded-[32px] bg-[#0B0B0C] px-[clamp(36px,6vw,88px)] py-[clamp(36px,6vw,88px)] text-white">
            <div className="min-w-[220px] flex-1">
              <p className="mb-3 text-[14px] font-medium uppercase tracking-[0.14em] text-[var(--on-dark-muted)]">Have a project?</p>
              <h2 className="text-[clamp(40px,6vw,88px)] font-semibold leading-[1] tracking-[-0.045em] text-white">Let&apos;s talk.</h2>
            </div>

            <div className="max-w-[420px] flex-1">
              <p className="mb-6 text-[17px] leading-[1.55] text-[#B4BAC6]">
                Tell us about the platform, workflow, integration, or technical team you need. We&apos;ll help define the right
                delivery approach and next steps.
              </p>

              <div className="flex flex-wrap items-center gap-5">
                <Link href={`${mainSiteUrl}/contact`} className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-[30px] py-[18px] text-[16px] font-semibold text-white">
                  Let&apos;s Talk!
                </Link>
                <a href="mailto:info@craft-crew.com" className="text-[16px] font-medium text-white underline decoration-[var(--on-dark-muted)] underline-offset-4">
                  info@craft-crew.com
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-wrap items-start justify-between gap-8 px-[clamp(20px,5.5vw,80px)] pb-12 pt-8 text-[14px] text-[#3D4249]">
        <div className="min-w-[240px] flex-1">
          <Logo />
          <p className="mt-4 max-w-[360px]">© 2026 Craft Crew for Information Technology. All rights reserved.</p>
        </div>

        <div className="min-w-[180px]">
          <h3 className="mb-3 text-[14px] font-semibold text-[#0B0B0C]">Egypt</h3>
          <a href={contacts.egypt.tel} className="block pb-1 text-[#3D4249]">
            {contacts.egypt.phone}
          </a>
          <a href={contacts.egypt.whatsapp} className="text-[#3D4249] underline decoration-current underline-offset-4">
            WhatsApp
          </a>
        </div>

        <div className="min-w-[180px]">
          <h3 className="mb-3 text-[14px] font-semibold text-[#0B0B0C]">Saudi Arabia</h3>
          <a href={contacts.saudi.tel} className="block pb-1 text-[#3D4249]">
            {contacts.saudi.phone}
          </a>
          <a href={contacts.saudi.whatsapp} className="text-[#3D4249] underline decoration-current underline-offset-4">
            WhatsApp
          </a>
        </div>

        <div className="min-w-[160px]">
          <h3 className="mb-3 text-[14px] font-semibold text-[#0B0B0C]">Follow</h3>
          <div className="flex flex-col gap-2">
            {contacts.socials.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="text-[#3D4249] hover:text-[#0B0B0C]">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
