export const ALL_PROJECTS_QUERY = `
  query AllProjects {
    projects(
      first: 100
      where: {
        status: PUBLISH
        orderby: [
          { field: MENU_ORDER, order: ASC }
          { field: DATE, order: DESC }
        ]
      }
    ) {
      nodes {
        databaseId
        slug
        title
        menuOrder
        date
        featuredImage {
          node {
            sourceUrl
            altText
            mediaDetails { width height }
          }
        }
        projectServices { nodes { slug name } }
        projectCategories { nodes { slug name } }
        projectDetails {
          clientName
          shortIntro
          industry
          projectYear
          websiteUrl
          cardBackground
          thumbnailFocus
          heroImage {
            node {
              sourceUrl
              altText
              mediaDetails { width height }
            }
          }
        }
      }
    }
  }
`;

export const PROJECT_BY_SLUG_QUERY = `
  query ProjectBySlug($slug: ID!) {
    project(id: $slug, idType: SLUG) {
      databaseId
      slug
      title
      menuOrder
      date
      featuredImage {
        node {
          sourceUrl
          altText
          mediaDetails { width height }
        }
      }
      projectServices { nodes { slug name } }
      projectCategories { nodes { slug name } }
      projectDetails {
        clientName
        shortIntro
        industry
        projectYear
        websiteUrl
        cardBackground
        thumbnailFocus
        heroImage {
          node {
            sourceUrl
            altText
            mediaDetails { width height }
          }
        }
        gallery {
          nodes {
            sourceUrl
            altText
            mediaDetails { width height }
          }
        }
        relatedProjects { nodes { ... on Project { slug title } } }
      }
    }
  }
`;

export const PROJECT_SLUGS_QUERY = `
  query ProjectSlugs {
    projects(first: 200, where: { status: PUBLISH }) {
      nodes { slug }
    }
  }
`;
