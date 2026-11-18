interface RevalidationEnvironment {
  REVALIDATE_SECRET: string;
  CLOUDFLARE_DEPLOY_HOOK_URL: string;
}

interface RevalidationPayload {
  tags?: unknown;
}

export async function onRequestPost({
  request,
  env,
}: {
  request: Request;
  env: RevalidationEnvironment;
}): Promise<Response> {
  if (!env.REVALIDATE_SECRET || !env.CLOUDFLARE_DEPLOY_HOOK_URL) {
    return Response.json({ error: "Revalidation is not configured." }, { status: 503 });
  }

  const supplied = new TextEncoder().encode(request.headers.get("x-revalidate-secret") ?? "");
  const expected = new TextEncoder().encode(env.REVALIDATE_SECRET);
  let mismatch = supplied.length ^ expected.length;
  for (let index = 0; index < Math.max(supplied.length, expected.length); index += 1) {
    mismatch |= (supplied[index] ?? 0) ^ (expected[index] ?? 0);
  }
  if (mismatch !== 0) {
    return Response.json({ error: "Invalid revalidation secret." }, { status: 401 });
  }

  let payload: RevalidationPayload;
  try {
    payload = (await request.json()) as RevalidationPayload;
  } catch {
    return Response.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  if (!Array.isArray(payload.tags) || !payload.tags.includes("projects")) {
    return Response.json({ error: "The projects cache tag is required." }, { status: 400 });
  }

  const deployResponse = await fetch(env.CLOUDFLARE_DEPLOY_HOOK_URL, { method: "POST" });
  if (!deployResponse.ok) {
    return Response.json({ error: "Cloudflare could not start a new Pages deployment." }, { status: 502 });
  }

  return Response.json({ revalidated: true, deploymentTriggered: true });
}
