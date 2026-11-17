import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";

export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    return Response.json({ error: "Revalidation secret is not configured." }, { status: 503 });
  }

  const suppliedSecret = request.headers.get("x-revalidate-secret") ?? "";
  const expected = Buffer.from(secret);
  const supplied = Buffer.from(suppliedSecret);
  if (expected.length !== supplied.length || !timingSafeEqual(expected, supplied)) {
    return Response.json({ error: "Invalid revalidation secret." }, { status: 401 });
  }

  let payload: { tags?: unknown };
  try {
    payload = (await request.json()) as { tags?: unknown };
  } catch {
    return Response.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  if (!Array.isArray(payload.tags) || !payload.tags.includes("projects")) {
    return Response.json({ error: "The projects cache tag is required." }, { status: 400 });
  }

  revalidateTag("projects", "max");
  return Response.json({ revalidated: true, tag: "projects" });
}
