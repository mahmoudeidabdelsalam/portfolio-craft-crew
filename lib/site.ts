export const mainSiteUrl = process.env.NEXT_PUBLIC_MAIN_SITE_URL ?? "https://www.craft-crew.com";

export const navLinks = [
  { label: "Home", href: `${mainSiteUrl}/` },
  { label: "About", href: `${mainSiteUrl}/about` },
  { label: "Services", href: `${mainSiteUrl}/services` },
  { label: "Solutions", href: `${mainSiteUrl}/solutions` },
  { label: "Projects", href: "/projects", current: true },
  { label: "Clients", href: `${mainSiteUrl}/clients` },
  { label: "Team", href: `${mainSiteUrl}/team` },
];

export const portfolioCategories = [
  { slug: "all", label: "All", title: "Our work" },
  { slug: "web", label: "Web Design & Development", title: "Web Design & Development" },
  { slug: "erp", label: "ERP & Software", title: "ERP & Software Solutions" },
  { slug: "mobile", label: "Mobile Apps", title: "Mobile Apps" },
  { slug: "branding", label: "Branding", title: "Branding" },
  { slug: "social", label: "Social Media", title: "Social Media" },
  { slug: "profile", label: "Company Profile", title: "Company Profile" },
] as const;

export const contacts = {
  egypt: {
    phone: "+20 110 324 9933",
    tel: "tel:+201103249933",
    whatsapp: "https://wa.me/201103249933?text=Hello%20Craft%20Crew%2C%20I%27d%20like%20to%20discuss%20a%20project.",
  },
  saudi: {
    phone: "+966 56 055 1730",
    tel: "tel:+966560551730",
    whatsapp: "https://wa.me/966560551730?text=Hello%20Craft%20Crew%2C%20I%27d%20like%20to%20discuss%20a%20project.",
  },
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/craftcreweg" },
    { label: "X", href: "https://x.com/craftcreweg" },
    { label: "Facebook", href: "https://www.facebook.com/Craftcrewltd" },
    { label: "Instagram", href: "https://www.instagram.com/craftcreweg" },
  ],
};
