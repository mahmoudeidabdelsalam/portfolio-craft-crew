# Craft Crew Portfolio Frontend

Next.js portfolio frontend backed by WordPress WPGraphQL and deployed as a static site to Cloudflare Pages.

## Local development

1. Run the WordPress site and activate the portfolio schema:

   ```sh
   wp --path=/path/to/craft-portfolio-wp plugin activate wp-graphql wpgraphql-acf craft-portfolio-core
   wp --path=/path/to/craft-portfolio-wp craft seed
   ```

2. Copy `.env.example` to `.env.local` and set `WP_GRAPHQL_URL`, `WP_IMAGE_HOST`, and `NEXT_PUBLIC_SITE_URL`.
3. Install and start the frontend:

   ```sh
   pnpm install
   pnpm dev
   ```

The local `pnpm` scripts enable Node's system certificate store so Valet's local HTTPS certificate can be verified; TLS verification remains enabled. Production WordPress must use a publicly trusted certificate.

The Pages build fetches public project data from WordPress and exports the homepage, project listing, project detail pages, sitemap, and robots file to `out/`. Category filters and pagination run in the browser. Images are served directly from WordPress. Content updates require a new Pages build.

## Cloudflare Pages deployment

This project uses Next.js static export; it does not require a Worker runtime for page rendering.

- Connect the repository to Cloudflare Pages.
- Set the build command to `pnpm cf:build` and the build output directory to `out`.
- The included `.nvmrc` selects Node.js 22 for the Pages build.
- Set these build environment variables in Pages:
  - `WP_GRAPHQL_URL` — public WordPress GraphQL endpoint.
  - `WP_IMAGE_HOST` — WordPress media hostname, without protocol or path.
  - `WP_IMAGE_PROTOCOL` — `https` for production.
  - `NEXT_PUBLIC_SITE_URL` — the deployed `https://<project>.pages.dev` URL or your custom domain.
  - `NEXT_PUBLIC_MAIN_SITE_URL` — the main Craft Crew site.
- Add the Pages Function secrets `REVALIDATE_SECRET` and `CLOUDFLARE_DEPLOY_HOOK_URL` in the Pages project settings. Create a deploy hook in the Pages project and keep its URL secret.
- Configure WordPress with the matching `REVALIDATE_SECRET` and `FRONTEND_URL`. WordPress project edits then trigger a new static Pages build through `functions/api/revalidate.ts`.

For local Pages preview after a successful build, run `pnpm cf:preview`. To deploy manually, run `pnpm cf:deploy` after authenticating Wrangler with Cloudflare.

Because this is static hosting, project data is read at build time. WordPress must be reachable during the build; the Pages Function starts a new build on content changes rather than mutating cached server-rendered pages.

## Checks

```sh
pnpm lint
pnpm test
pnpm build
```
