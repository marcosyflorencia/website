# Marcos & Florencia

React app powered by Vite and deployed to Cloudflare Workers with Static Assets.

## Local development

```sh
npm install
npm run dev
```

Copy `.env.example` to `.env.local` before running the app. The Wix values are
public browser configuration; never add a Wix API key or client secret.

## Deploy to Cloudflare

Authenticate once, then deploy:

```sh
npx wrangler login
npm run deploy
```

The production build is uploaded from `dist` to the Worker configured in
`wrangler.jsonc`. Cloudflare provides a `workers.dev` URL after deployment.

To connect the domain later, open the Worker in the Cloudflare dashboard, go to
**Settings > Domains & Routes**, and add the custom domain.
