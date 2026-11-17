import type { GraphQLResponse } from "./types";

const endpoint = process.env.WP_GRAPHQL_URL;

export async function fetchGraphQL<T>(
  query: string,
  variables?: Record<string, string>,
): Promise<T> {
  if (!endpoint) {
    throw new Error("WP_GRAPHQL_URL is missing. Set it in .env.local to the WordPress GraphQL endpoint.");
  }

  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 300, tags: ["projects"] },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown network error";
    throw new Error(`Could not reach WordPress GraphQL at ${endpoint}: ${message}`);
  }

  if (!response.ok) {
    throw new Error(`WordPress GraphQL returned HTTP ${response.status} ${response.statusText}.`);
  }

  let payload: GraphQLResponse<T>;
  try {
    payload = (await response.json()) as GraphQLResponse<T>;
  } catch {
    throw new Error("WordPress GraphQL returned an invalid JSON response.");
  }

  if (payload.errors?.length) {
    throw new Error(`WordPress GraphQL error: ${payload.errors.map((error) => error.message).join("; ")}`);
  }

  if (!payload.data) {
    throw new Error("WordPress GraphQL response did not contain data.");
  }

  return payload.data;
}
