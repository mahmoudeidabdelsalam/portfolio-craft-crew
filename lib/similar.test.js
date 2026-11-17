import assert from "node:assert/strict";
import test from "node:test";

import { getSimilarProjects } from "./similar.ts";

function project(slug, { services = [], relatedSlugs = [], order = 0, date = "2026-01-01" } = {}) {
  return {
    id: order,
    slug,
    title: slug,
    clientName: slug,
    shortIntro: "",
    cardBackground: "#EEF0F4",
    thumbnailFocus: "top",
    gallery: [],
    services: services.map((name) => ({ slug: name, name })),
    categories: [],
    relatedSlugs,
    order,
    date,
  };
}

test("uses explicit related projects first and fills from newest", () => {
  const current = project("current", { relatedSlugs: ["explicit"] });
  const newest = project("newest", { date: "2026-04-01", order: 4 });
  const explicit = project("explicit", { date: "2025-01-01", order: 9 });
  const older = project("older", { date: "2025-03-01", order: 2 });

  assert.deepEqual(
    getSimilarProjects(current, [current, older, explicit, newest]).map(({ slug }) => slug),
    ["explicit", "newest", "older"],
  );
});

test("ranks service overlap first and breaks ties by menu order", () => {
  const current = project("current", { services: ["web", "ux"] });
  const lowerOrder = project("lower-order", { services: ["web"], order: 1 });
  const strongerMatch = project("stronger", { services: ["web", "ux"], order: 8 });
  const higherOrder = project("higher-order", { services: ["ux"], order: 3 });
  const noMatch = project("no-match", { services: ["hosting"], order: 0 });

  assert.deepEqual(
    getSimilarProjects(current, [current, lowerOrder, strongerMatch, higherOrder, noMatch]).map(({ slug }) => slug),
    ["stronger", "lower-order", "higher-order"],
  );
});
