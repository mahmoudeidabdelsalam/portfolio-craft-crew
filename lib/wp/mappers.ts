import type { ImageAsset, Project, WPProjectNode, WPMediaItem } from "./types";

const DEFAULT_BACKGROUND = "#EEF0F4";

function mapImage(image: WPMediaItem | null | undefined, fallbackAlt: string): ImageAsset | undefined {
  if (!image?.sourceUrl) return undefined;

  return {
    url: image.sourceUrl,
    alt: image.altText?.trim() || fallbackAlt,
    width: image.mediaDetails?.width || 1600,
    height: image.mediaDetails?.height || 1000,
  };
}

function normalizeFocus(focus: string | string[] | null | undefined): Project["thumbnailFocus"] {
  const value = Array.isArray(focus) ? focus[0] : focus;
  return value === "center" || value === "bottom" ? value : "top";
}

function normalizeWebsite(url: string | null | undefined): { websiteUrl?: string; domain?: string } {
  if (!url?.trim()) return {};

  try {
    const parsedUrl = new URL(url);
    return {
      websiteUrl: url,
      domain: parsedUrl.hostname.replace(/^www\./, ""),
    };
  } catch {
    return {};
  }
}

export function mapProject(node: WPProjectNode): Project {
  const details = node.projectDetails;
  const clientName = details?.clientName?.trim() || node.title;
  const fallbackAlt = `${clientName} project screenshot`;
  const featuredImage = mapImage(node.featuredImage?.node, fallbackAlt);
  const heroImage = mapImage(details?.heroImage?.node, fallbackAlt);
  const website = normalizeWebsite(details?.websiteUrl);

  return {
    id: node.databaseId,
    slug: node.slug,
    title: clientName || node.title,
    clientName,
    shortIntro: details?.shortIntro?.trim() || "",
    industry: details?.industry?.trim() || undefined,
    year: details?.projectYear?.trim() || undefined,
    websiteUrl: website.websiteUrl,
    domain: website.domain,
    cardBackground: details?.cardBackground || DEFAULT_BACKGROUND,
    thumbnailFocus: normalizeFocus(details?.thumbnailFocus),
    thumbnail: featuredImage,
    hero: heroImage || featuredImage,
    gallery: (details?.gallery?.nodes ?? [])
      .map((image) => mapImage(image, fallbackAlt))
      .filter((image): image is ImageAsset => Boolean(image)),
    services: (node.projectServices?.nodes ?? [])
      .filter((term): term is { slug: string; name: string } => Boolean(term.slug && term.name))
      .map((term) => ({ slug: term.slug, name: term.name })),
    categories: (node.projectCategories?.nodes ?? [])
      .map((term) => term.slug)
      .filter((slug): slug is string => Boolean(slug)),
    relatedSlugs: (details?.relatedProjects?.nodes ?? [])
      .map((related) => related.slug)
      .filter((slug): slug is string => Boolean(slug)),
    order: node.menuOrder ?? Number.MAX_SAFE_INTEGER,
    date: node.date ?? "",
  };
}
