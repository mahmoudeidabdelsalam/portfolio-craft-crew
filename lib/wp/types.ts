export type WPConnection<T> = {
  nodes: T[] | null;
};

export type WPMediaItem = {
  sourceUrl: string;
  altText: string | null;
  mediaDetails: {
    width: number | null;
    height: number | null;
  } | null;
};

export type WPMediaConnection = {
  node: WPMediaItem | null;
} | null;

export type WPProjectDetails = {
  clientName: string | null;
  shortIntro: string | null;
  industry: string | null;
  projectYear: string | null;
  websiteUrl: string | null;
  cardBackground: string | null;
  thumbnailFocus: string | string[] | null;
  heroImage?: WPMediaConnection;
  gallery?: WPConnection<WPMediaItem> | null;
  relatedProjects?: WPConnection<{ slug: string | null; title: string | null }> | null;
} | null;

export type WPTerm = {
  slug: string | null;
  name: string | null;
};

export type WPProjectNode = {
  databaseId: number;
  slug: string;
  title: string;
  menuOrder: number | null;
  date: string | null;
  featuredImage: WPMediaConnection;
  projectServices: WPConnection<WPTerm> | null;
  projectCategories: WPConnection<WPTerm> | null;
  projectDetails: WPProjectDetails;
};

export type AllProjectsResponse = {
  projects: WPConnection<WPProjectNode> | null;
};

export type ProjectBySlugResponse = {
  project: WPProjectNode | null;
};

export type ProjectSlugsResponse = {
  projects: WPConnection<{ slug: string | null }> | null;
};

export type GraphQLResponse<T> = {
  data?: T;
  errors?: Array<{ message: string }>;
};

export type ImageAsset = {
  url: string;
  alt: string;
  width: number;
  height: number;
};

export type ProjectService = {
  slug: string;
  name: string;
};

export type Project = {
  id: number;
  slug: string;
  title: string;
  clientName: string;
  shortIntro: string;
  industry?: string;
  year?: string;
  websiteUrl?: string;
  domain?: string;
  cardBackground: string;
  thumbnailFocus: "top" | "center" | "bottom";
  thumbnail?: ImageAsset;
  hero?: ImageAsset;
  gallery: ImageAsset[];
  services: ProjectService[];
  categories: string[];
  relatedSlugs: string[];
  order: number;
  date: string;
};
