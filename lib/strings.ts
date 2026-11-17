export const portfolioHeadings: Record<string, string> = {
  all: "Our work",
  web: "Web Design & Development",
  erp: "ERP & Software Solutions",
  mobile: "Mobile Apps",
  branding: "Branding",
  social: "Social Media",
  profile: "Company Profile",
};

export const filterLabels = [
  { slug: "all", label: "All" },
  { slug: "web", label: "Web Design & Development" },
  { slug: "erp", label: "ERP & Software" },
  { slug: "mobile", label: "Mobile Apps" },
  { slug: "branding", label: "Branding" },
  { slug: "social", label: "Social Media" },
  { slug: "profile", label: "Company Profile" },
] as const;

export const introParagraph =
  "Websites, ERP systems, mobile apps and brand work, each built around how the client actually operates.";
