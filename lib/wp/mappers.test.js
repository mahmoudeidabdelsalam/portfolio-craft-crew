import assert from "node:assert/strict";
import test from "node:test";

import { mapProject } from "./mappers.ts";

test("maps nullable WordPress fields to safe project defaults", () => {
  const project = mapProject({
    databaseId: 7,
    slug: "sample-project",
    title: "Sample Project",
    menuOrder: null,
    date: null,
    featuredImage: null,
    projectServices: null,
    projectCategories: null,
    projectDetails: null,
  });

  assert.equal(project.id, 7);
  assert.equal(project.clientName, "Sample Project");
  assert.equal(project.cardBackground, "#EEF0F4");
  assert.equal(project.thumbnailFocus, "top");
  assert.deepEqual(project.services, []);
  assert.deepEqual(project.categories, []);
  assert.deepEqual(project.gallery, []);
  assert.equal(project.thumbnail, undefined);
  assert.equal(project.order, Number.MAX_SAFE_INTEGER);
});

test("maps WordPress image metadata and select field values", () => {
  const project = mapProject({
    databaseId: 8,
    slug: "image-project",
    title: "Image Project",
    menuOrder: 2,
    date: "2026-01-02T10:00:00",
    featuredImage: {
      node: {
        sourceUrl: "https://wordpress.example/uploads/project.jpg",
        altText: "",
        mediaDetails: { width: 1200, height: 900 },
      },
    },
    projectServices: { nodes: [{ slug: "web-dev", name: "Web Dev" }] },
    projectCategories: { nodes: [{ slug: "web", name: "Web Design & Development" }] },
    projectDetails: {
      clientName: "Image Client",
      shortIntro: "A sample project.",
      industry: null,
      projectYear: "2026",
      websiteUrl: "https://www.client.example/path",
      cardBackground: "#DDF3E8",
      thumbnailFocus: ["bottom"],
    },
  });

  assert.equal(project.clientName, "Image Client");
  assert.equal(project.thumbnail?.alt, "Image Client project screenshot");
  assert.deepEqual([project.thumbnail?.width, project.thumbnail?.height], [1200, 900]);
  assert.equal(project.thumbnailFocus, "bottom");
  assert.equal(project.domain, "client.example");
  assert.deepEqual(project.categories, ["web"]);
});
