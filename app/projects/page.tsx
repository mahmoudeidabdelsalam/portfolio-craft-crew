import Link from "next/link";

import { ProjectsBrowser } from "@/components/ProjectsBrowser";
import { getAllProjects } from "@/lib/projects";
import { contacts, mainSiteUrl, navLinks } from "@/lib/site";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-[22px] font-bold tracking-[-0.02em] text-[#0B0B0C]">
      <span className="font-[family-name:var(--font-display)] lowercase">craft crew</span>
    </Link>
  );
}

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#0B0B0C]">
      <header className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-b border-[var(--line)] px-[clamp(20px,5.5vw,80px)] py-6">
        <Logo />

        <nav aria-label="Main navigation" className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[15px] font-medium text-[#0B0B0C]">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={link.label === "Projects" ? "border-b-2 border-[#0B0B0C] pb-1" : "text-[#3D4249]"}
            >
              {link.label}
            </Link>
          ))}
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
        <ProjectsBrowser projects={projects} />

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
          <a href={contacts.egypt.tel} className="block pb-1 text-[#3D4249]">{contacts.egypt.phone}</a>
          <a href={contacts.egypt.whatsapp} className="text-[#3D4249] underline decoration-current underline-offset-4">WhatsApp</a>
        </div>
        <div className="min-w-[180px]">
          <h3 className="mb-3 text-[14px] font-semibold text-[#0B0B0C]">Saudi Arabia</h3>
          <a href={contacts.saudi.tel} className="block pb-1 text-[#3D4249]">{contacts.saudi.phone}</a>
          <a href={contacts.saudi.whatsapp} className="text-[#3D4249] underline decoration-current underline-offset-4">WhatsApp</a>
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
