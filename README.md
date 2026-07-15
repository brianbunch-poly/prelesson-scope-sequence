# Prelesson Game Scope & Sequence

Static dashboard with shared asset checklist progress via Cloudflare Workers + KV.

**Agent docs:** Read `AGENT_INSTRUCTIONS.md` first — especially **§0 v5 Production Conventions** (quest narrative format, popup assets, mission labels, regeneration workflow).

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

- `public/index.html` — the scope-and-sequence dashboard (lesson data + UI)
- `src/index.js` — Worker API at `/api/asset-progress`
- Checkboxes sync through KV; Asset Lists polls every 3 seconds while open

Checkbox state is keyed by asset path (e.g. `quest/player_vehicle.webp`, `quest/pregame_popup.webp`). Renaming assets after deploy may require re-checking boxes.

## Regenerating lesson content (local)

Python sources (`lesson_designs.py`, `generate_scope_sequence.py`, etc.) are **gitignored** but required locally.

After editing `lesson_designs.py` or `emerge_lesson_designs.py`:

```bash
python apply_quest_updates.py   # quest narratives, mission labels, landmarks, agent copy → public/index.html
python sync_asset_lists.py      # asset manifests → public/index.html
```

Optional Excel / local HTML path:

```bash
python generate_scope_sequence.py
python generate_dashboard.py      # → prelesson_scope_sequence.html from xlsx
```

Commit and push `public/index.html` to deploy dashboard changes.

## Key v5 conventions (summary)

| Topic | Convention |
|-------|------------|
| Quest Details | Story narrative; activity names only in parentheses — `(Find It!)`, `(Reading Challenge)`, `(Words I Know)` |
| Mission UI label | **Mission** (not Zone) |
| Zone display names | Activity types: Find It! / Reading Challenge / Words I Know |
| Map locations | `M1/M2/M3_Zone_Landmark` from `m1/2/3_landmark` in designs |
| Pre-game popup art | `pregame_popup.webp` (`quest/`) |
| Post-game popup art | `postgame_popup.webp` (`quest/`) |
| Ending backgrounds | `bg_ending_transition`, `bg_ending_main`, `bg_ending_1`…`N` (`ending/`) |
| Character on map | `[slug]_spritesheet.webp` only when antagonist/helper present |
| Popup audio | `pregame_popup_audio.mp3`, `postgame_popup_audio.mp3` |

See `AGENT_INSTRUCTIONS.md` §0.5 for the full ending scene flow (exit → transition → postgame popup → Module Map reveal → cover-up overlays).
