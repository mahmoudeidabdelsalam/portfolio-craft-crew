import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <meta httpEquiv="refresh" content="0;url=/projects" />
      <p>
        Redirecting to the portfolio.{" "}
        <Link href="/projects" className="underline">
          Continue to projects
        </Link>
      </p>
    </main>
  );
}
