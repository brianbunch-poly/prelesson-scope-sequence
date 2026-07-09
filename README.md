# Prelesson Game Scope & Sequence

Static dashboard with shared asset checklist progress via Cloudflare Workers + KV.

## Cloudflare Workers setup

This project deploys as a **Worker with static assets** (not classic Pages Functions).

### Build / deploy settings in Cloudflare

- **Framework preset:** None
- **Build command:** empty
- **Deploy command:** `npx wrangler deploy`
- **Build output directory:** `public` (if the field is shown)

### KV binding (required for shared checkboxes)

Configured in `wrangler.toml` as `ASSET_PROGRESS` with your Workers KV namespace ID. Redeploy after changing the ID.

### What gets deployed

- `public/index.html` — the dashboard
- `src/index.js` — Worker API at `/api/asset-progress`
- Checkboxes sync through KV; Asset Lists polls every 3 seconds while open
