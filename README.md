# Prelesson Game Scope & Sequence

Static dashboard for browsing prelesson game scope & sequence content, with shared asset checklist progress via Cloudflare KV.

## Cloudflare Pages setup

1. Connect this repository in Cloudflare Pages.
2. Build settings:
   - **Framework preset:** None
   - **Build command:** leave empty
   - **Build output directory:** `public`
3. Entry point is `public/index.html`. Functions live in `/functions` at the repo root.

### Shared asset progress (required)

1. In Cloudflare Dashboard → **Storage & Databases** → **KV** → create a namespace (e.g. `prelesson-asset-progress`).
2. Open your Pages project → **Settings** → **Bindings** → **KV namespace bindings**.
3. Add a binding:
   - **Variable name:** `ASSET_PROGRESS` (must match exactly)
   - **KV namespace:** the namespace you created
4. Redeploy the site after adding the binding.

Checkboxes call `/api/asset-progress` (Pages Function). Progress is stored in KV so all users see the same checks. While the Asset Lists page is open, the browser polls every 3 seconds (paused when the tab is hidden). Other pages do not poll. localStorage is only a short-term cache if the API is unreachable.
