# Craft Crew Portfolio Frontend

Next.js portfolio frontend backed by the local WordPress WPGraphQL API.

## Local development

1. Run the WordPress site and activate the portfolio schema:

   ```sh
   wp --path=/path/to/craft-portfolio-wp plugin activate wp-graphql wpgraphql-acf craft-portfolio-core
   wp --path=/path/to/craft-portfolio-wp craft seed
   ```

2. Copy `.env.example` to `.env.local` and set `WP_GRAPHQL_URL` and `WP_IMAGE_HOST` to the WordPress site.
3. Install and start the frontend:

   ```sh
   pnpm install
   pnpm dev
   ```

The local `pnpm` scripts enable Node's system certificate store so Valet's local HTTPS certificate can be verified; TLS verification remains enabled. Production WordPress must use a publicly trusted certificate.

The frontend requests public project data on the server and caches it for five minutes under the `projects` tag. The site needs WPGraphQL, WPGraphQL for ACF, and ACF PRO (or a compatible ACF distribution). Project thumbnails and case-study images are uploaded from WordPress; missing images use the local decorative placeholder.

## Checks

```sh
pnpm lint
pnpm test
pnpm build
```
