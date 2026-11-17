import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <p className="mb-4 text-sm font-medium uppercase tracking-[0.14em] text-[var(--accent)]">Project not found</p>
      <h1 className="mb-6 text-4xl font-semibold">This project may have moved.</h1>
      <Link href="/projects" className="rounded-full bg-[var(--ink)] px-6 py-3 font-semibold text-white">
        Back to all projects
      </Link>
    </main>
  );
}
