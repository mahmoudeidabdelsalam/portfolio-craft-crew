import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { PlaceholderArt } from "@/components/PlaceholderArt";
import { ProjectCard } from "@/components/ProjectCard";
import { getAllProjects, getNextProject, getProjectBySlug, getSimilarProjects, getSlugs } from "@/lib/projects";
import { contacts, mainSiteUrl, navLinks } from "@/lib/site";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-[22px] font-bold tracking-[-0.02em] text-[#0B0B0C]">
      <span className="font-[family-name:var(--font-display)] lowercase">craft crew</span>
    </Link>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { title: "Project not found | Craft Crew Portfolio" };
  }

  const socialImage = project.thumbnail ?? project.hero;
  return {
    title: `${project.clientName} | Craft Crew Portfolio`,
    description: project.shortIntro,
    openGraph: {
      title: `${project.clientName} | Craft Crew Portfolio`,
      description: project.shortIntro,
      images: socialImage ? [socialImage.url] : [],
    },
  };
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [project, allProjects] = await Promise.all([getProjectBySlug(slug), getAllProjects()]);

  if (!project) {
    notFound();
  }

  const nextProject = getNextProject(allProjects, project.slug);
  const similarProjects = getSimilarProjects(project, allProjects);
  const portfolioUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.clientName,
    description: project.shortIntro,
    image: (project.thumbnail ?? project.hero)?.url,
    url: `${portfolioUrl}/projects/${encodeURIComponent(project.slug)}`,
    creator: { "@type": "Organization", name: "Craft Crew" },
  };
  const metadataRows: Array<{ label: string; value: React.ReactNode }> = [
    {
      label: "Task",
      value: (
        <div className="flex flex-wrap gap-2">
          {project.services.map((service) => (
            <span key={service.slug} className="inline-flex items-center rounded-full border border-[var(--pill)] px-[12px] py-[5px] text-[12px] font-medium text-[#3D4249]">
              {service.name}
            </span>
          ))}
        </div>
      ),
    },
    { label: "Client", value: project.clientName },
    ...(project.industry ? [{ label: "Industry", value: project.industry }] : []),
    ...(project.year ? [{ label: "Date", value: project.year }] : []),
  ];
  const websiteDomain = project.domain;
  const caseStudyImages = project.gallery;

  return (
    <div className="min-h-screen bg-white text-[#0B0B0C]">
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

      <main className="pb-20">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
        <div className="px-6 py-7">
          <Link href="/projects" className="inline-flex items-center gap-2 text-[14px] font-medium text-[#3D4249]">
            <span aria-hidden="true">←</span>
            <span>All projects</span>
          </Link>
        </div>

        <section className="px-[clamp(20px,5.5vw,104px)]">
          <div className="flex flex-row-reverse flex-wrap items-start gap-x-[56px] gap-y-[48px]">
            <aside className="min-w-[300px] flex-1 basis-[340px] max-w-[440px] xl:sticky xl:top-6">
              <p className="mb-3 text-[14px] font-medium uppercase tracking-[0.14em] text-[var(--accent)]">Case study</p>
              <h1 className="mb-6 text-[clamp(48px,5.8vw,88px)] font-semibold leading-[0.96] tracking-[-0.05em] text-[#0B0B0C]">
                {project.clientName}
              </h1>
              <p className="mb-9 text-[18px] leading-[1.55] text-[var(--text-2)]">{project.shortIntro}</p>

              <dl className="border-t border-[var(--line-2)]">
                {metadataRows.map((row, index) => (
                  <div key={row.label} className={`flex flex-wrap items-start gap-x-5 gap-y-2 border-b border-[var(--line-2)] py-[18px] ${index === metadataRows.length - 1 ? "last:border-b" : ""}`}>
                    <dt className="w-[96px] text-[14px] font-medium text-[#5B6068]">{row.label}</dt>
                    <dd className="flex flex-1 flex-wrap gap-2 text-[16px] font-semibold text-[#0B0B0C]">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 flex flex-col gap-4">
                {project.websiteUrl && websiteDomain && (
                  <a
                    href={project.websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0B0B0C] px-[28px] py-[16px] text-[15px] font-semibold text-white"
                  >
                    <span>Visit {websiteDomain}</span>
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M7 17 17 7" strokeLinecap="round" />
                      <path d="M8 7h9v9" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                )}
                <Link href={`${mainSiteUrl}/contact`} className="text-[16px] font-medium text-[#0B0B0C] underline decoration-current underline-offset-4">
                  Planning something similar? Let&apos;s talk
                </Link>
              </div>
            </aside>

            <div className="min-w-0 flex-[2.4_1_560px]">
              <div className="relative aspect-[16/10] overflow-hidden" style={{ background: project.cardBackground }}>
                {project.hero ? (
                  <Image
                    src={project.hero.url}
                    alt={project.hero.alt}
                    fill
                    priority
                    sizes="(min-width: 1000px) 60vw, 100vw"
                    className="object-cover"
                    style={{ objectPosition: project.thumbnailFocus }}
                  />
                ) : (
                  <PlaceholderArt seed={project.slug} />
                )}
              </div>

              {caseStudyImages.map((image, index) => (
                <div key={`${image.url}-${index}`} className="mt-5 overflow-hidden bg-[#EEF0F4]">
                  <Image
                    src={image.url}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    sizes="(min-width: 1000px) 60vw, 100vw"
                    className="h-auto w-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {nextProject && <section className="px-[clamp(20px,5.5vw,96px)] pb-0 pt-14">
          <Link
            href={`/projects/${nextProject.slug}`}
            className="flex flex-wrap items-center justify-between gap-8 rounded-[32px] bg-[#0B0B0C] px-[clamp(24px,4vw,56px)] py-[clamp(24px,4vw,56px)] text-white"
          >
            <div className="min-w-[260px] flex-1 basis-[320px]">
              <p className="mb-2 text-[14px] font-medium uppercase tracking-[0.14em] text-[var(--on-dark-muted)]">Next project</p>
              <h2 className="text-[clamp(40px,5.6vw,80px)] font-semibold leading-[1] tracking-[-0.045em] text-white">
                {nextProject.title}
              </h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {nextProject.services.slice(0, 2).map((service) => (
                  <span key={service.slug} className="inline-flex items-center rounded-full border border-[#4A4F5C] px-[12px] py-[5px] text-[12px] font-medium text-[#D6DAE3]">
                    {service.name}
                  </span>
                ))}
              </div>
              <span className="mt-5 inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-[18px] py-[10px] text-[15px] font-semibold text-white">
                Show project
              </span>
            </div>

            <div className="min-w-[260px] flex-[1.3_1_360px] overflow-hidden rounded-sm" style={{ background: nextProject.cardBackground }}>
              <div className="project-zoom aspect-[16/10] overflow-hidden rounded-sm relative">
                {nextProject.thumbnail ? (
                  <Image
                    src={nextProject.thumbnail.url}
                    alt={nextProject.thumbnail.alt}
                    fill
                    sizes="(min-width: 1000px) 45vw, 100vw"
                    className="object-cover"
                    style={{ objectPosition: nextProject.thumbnailFocus }}
                  />
                ) : (
                  <PlaceholderArt seed={nextProject.slug} />
                )}
              </div>
            </div>
          </Link>
        </section>}

        <section className="px-[clamp(20px,5.5vw,96px)] pt-16">
          <div className="mb-8 flex items-center justify-between gap-6">
            <h2 className="text-[clamp(32px,4vw,56px)] font-semibold leading-[1] tracking-[-0.04em] text-[#0B0B0C]">
              Similar projects
            </h2>
            <Link href="/projects" className="text-[15px] font-semibold text-[#0B0B0C] underline underline-offset-2">
              View all projects
            </Link>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {similarProjects.map((item) => (
              <ProjectCard key={item.slug} project={item} layout="regular" />
            ))}
          </div>
        </section>

        <section className="px-[clamp(20px,5.5vw,72px)] pb-0 pt-16">
          <div className="flex flex-wrap items-end justify-between gap-8 rounded-[32px] bg-[var(--accent)] px-[clamp(36px,6vw,88px)] py-[clamp(36px,6vw,88px)] text-white">
            <div className="min-w-[220px] flex-1">
              <p className="mb-3 text-[14px] font-medium uppercase tracking-[0.14em] text-white/80">Planning something similar?</p>
              <h2 className="text-[clamp(40px,6vw,88px)] font-semibold leading-[1] tracking-[-0.045em] text-white">
                Have a project? Let&apos;s talk.
              </h2>
            </div>

            <div className="max-w-[420px] flex-1">
              <div className="flex flex-wrap items-center gap-5">
                <Link href={`${mainSiteUrl}/contact`} className="inline-flex items-center justify-center rounded-full bg-[#0B0B0C] px-[30px] py-[18px] text-[16px] font-semibold text-white">
                  Let&apos;s Talk!
                </Link>
                <a href="mailto:info@craft-crew.com" className="text-[16px] font-medium text-white underline underline-offset-4">
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
