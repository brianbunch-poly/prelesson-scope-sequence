# Agent Instructions — Prelesson Game Narrative Redesign

> **Audience:** Future Cursor agents working on this project.
> **Primary deliverable:** Keep lesson designs, the Excel workbook, and the **deployed dashboard** (`public/index.html`) in sync. Edit `lesson_designs.py` / `emerge_lesson_designs.py` first, then regenerate content with the Python scripts below.

---

## 0. v5 Production Conventions (current)

These rules reflect the **live** scope-and-sequence dashboard and the asset model used when rebuilding prelesson games.

### 0.1 Deployed dashboard (not just Excel)

| File | Role |
|------|------|
| `public/index.html` | **Deployed** scope-and-sequence dashboard (Cloudflare Workers + KV). Git tracks this file. |
| `lesson_designs.py` | Narrative designs for Wonders lessons (local; gitignored). |
| `emerge_lesson_designs.py` | Narrative designs for Emerge lessons (local; gitignored). |
| `generate_scope_sequence.py` | Regenerates Wonders rows + asset manifest into xlsx. |
| `apply_quest_updates.py` | Syncs quest narratives, mission labels, landmarks, and agent copy into `public/index.html`. |
| `sync_asset_lists.py` | Rebuilds `Asset_Lists` in `public/index.html` from `build_asset_manifest()`. |
| `generate_dashboard.py` | Regenerates standalone `prelesson_scope_sequence.html` from xlsx (optional local review). |

**Typical sync after design edits:**
```bash
python apply_quest_updates.py
python sync_asset_lists.py
```
Then commit `public/index.html` if deploying.

`.gitignore` only tracks deploy files (`public/`, `src/`, `wrangler.toml`, `package.json`, `README.md`). Python sources stay local.

### 0.2 Quest Details narrative format (`Purpose_And_Goals`)

The dashboard **Quest Details** field (`Purpose_And_Goals`) is **story-only**. Mini-games are not part of the narrative except as parenthetical activity labels.

**Structure (built by `expand_quest_problem()` in `lesson_designs.py`):**
1. **Opening hook** — `problem` field (what is wrong / what is needed).
2. **Three mission beats** — why the player visits each map area and what they collect or do there.
3. **Activity tag in parentheses only** — `(Find It!)`, `(Reading Challenge)`, or `(Words I Know)`.
4. **Closing beat** — collect rewards/actions, unlock exit, reach Module Map (+ lesson-specific payoff).

**Custom beats:** Set `m1_quest_beat`, `m2_quest_beat`, `m3_quest_beat` in the design dict when auto-generated copy is wrong (actions, gates, repairs, etc.).

**Do not** write bureaucratic copy like “Complete Find It! to build background knowledge…” in Quest Details.

**Quest popups (`quest1` / `quest2`):** Short 2-step pre-game popup **text** (Headline | PolyPal). Separate from Quest Details; pairs with `pregame_popup.webp` art.

### 0.3 Mission labels vs map locations

| Dashboard label | Excel / sheet field | Value |
|-----------------|---------------------|-------|
| UI label | — | **Mission** (was “Zone”) |
| Mission 1 name | `M1_Zone_Name` | Activity type only: `Find It!`, `What's Missing?`, or `Memory Match` (by level) |
| Mission 2 name | `M2_Zone_Name` | `Reading Challenge` |
| Mission 3 name | `M3_Zone_Name` | `Words I Know` |
| Map location | `M1_Zone_Landmark`, `M2_Zone_Landmark`, `M3_Zone_Landmark` | **Where on the map** the mission happens (ant hill, fruit stand, shipyard island, etc.) |

Set `m1_landmark`, `m2_landmark`, `m3_landmark` in the design dict. `m1_zone` is legacy flavor text; zone **display names** in the dashboard use activity types.

### 0.4 Simplified popup & character assets

**Replaced** the old split popup / speech-bubble / character-intro image set with **one image per moment**:

| Asset | Folder | Purpose |
|-------|--------|---------|
| `pregame_popup.webp` | `quest/` | Single combined pre-game popup art (background + PolyPal bubble + character **if present** in the artwork) |
| `postgame_popup.webp` | `quest/` | Single combined post-game popup art (mission complete + Module Map handoff; character **if present**) |
| `player_vehicle.webp` | `quest/` | Top-down player vehicle sprite (driving); renamed from `vehicle_top.webp` |

**Removed per lesson** (do not list in asset manifests):
- `popup_step1.webp`, `popup_step2.webp`
- `speech_bubble_01.webp`, `speech_bubble_02.webp`
- `[character]_intro.webp`, `[character]_intro_speech_01.webp`, `[character]_intro_speech_02.webp`
- `[character]_ending.webp`, `[character]_ending_speech.webp`

**When a lesson has a villain or named helper** (`antagonist` set, not `N/A`):
- **Antagonist_Assets:** `[slug]_spritesheet.webp` only (hop/exit map animation).
- Character appearance in intro/ending popups is **baked into** `pregame_popup.webp` / `postgame_popup.webp` art.

**When no character:** `Antagonist_Assets` = `N/A`; popup art has no character.

**Audio (all lessons):**

| Asset | Purpose |
|-------|---------|
| `pregame_popup_audio.mp3` | Pre-game popup sting (replaces `[character]_intro.mp3`) |
| `postgame_popup_audio.mp3` | Post-game popup sting (replaces `[character]_ending.mp3`) |

Defined in `build_asset_manifest()` in `generate_scope_sequence.py`.

### 0.5 Ending scene flow & assets

After the student finishes all 3 missions, they drive through the **exit gate** and leave the game map. The ending scene plays in this order:

```
Exit gate → bg_ending_transition (push on screen)
         → postgame_popup (mission complete + Module Map CTA; antagonist taunt if present)
         → [Continue] → bg_ending_main (full Module Map revealed)
         → bg_ending_1 … bg_ending_N (sequential overlays — modules slowly covered)
         → Module Map unlocked for E-Poly after-class activities
```

**Beat-by-beat:**

1. **`bg_ending_transition.webp`** (`ending/`) — Pushed onto the screen as the player exits the game area.
2. **`postgame_popup.webp`** (`quest/`) — Appears over the transition. Tells the student they finished the three missions and must continue on the **Module Map** to complete the full lesson goal. If there is an antagonist, the popup art/copy should convey that the villain is heading to the **end of the Module Map** and the student must complete every module in E-Poly to catch/stop them.
3. **Continue button** — Student dismisses the popup; background shifts from `bg_ending_transition` to **`bg_ending_main.webp`**.
4. **`bg_ending_main.webp`** (`ending/`) — The **full Module Map** (all modules visible). This is **not** a carnival screen — it is the Module Map layout for the lesson.
5. **`bg_ending_1.webp` … `bg_ending_N.webp`** (`ending/`) — Sequential overlays on top of `bg_ending_main`. Each image is the same Module Map with **one more module covered** by a lesson-themed layer (leaves, clouds, snow, etc.). Played in order until every module is hidden — visual metaphor that the map awaits the student in class.
6. **`ending_song.mp3`** — Music during the cover-up sequence.

**Overlay count (`N`):** from `slideshow_count()` in `generate_scope_sequence.py` — **16** for GT1/GT2, **14** for GT3/MGT.

| Asset | Folder | Purpose |
|-------|--------|---------|
| `bg_ending_transition.webp` | `ending/` | Exit push layer after player leaves through gate |
| `bg_ending_main.webp` | `ending/` | Full Module Map background (all modules visible) |
| `bg_ending_1.webp` … `bg_ending_N.webp` | `ending/` | Module map overlays — each covers one more module with themed layer |
| `postgame_popup.webp` | `quest/` | Post-mission popup (see step 2 above) |

**Removed / renamed (do not use):** `screen_base`, `screen_transition`, `slideshow_##`, carnival wording.

### 0.6 Fly High Lessons 1–8 — mission map locations (current)

| Lesson | Find It (`m1_landmark`) | Reading Challenge (`m2_landmark`) | Words I Know (`m3_landmark`) |
|--------|-------------------------|-----------------------------------|------------------------------|
| L1 | Ant hill | Beehive | Near the butterflies |
| L2 | Hat store | Pet store | Post office |
| L3 | Chicken pen | Pig pen | Cow pen |
| L4 | Watermill | Bridge | Palace |
| L5 | Genetics lab | Robot lab | Metal lab |
| L6 | Merch stand | Food stand | Backstage area |
| L7 | Shipyard island | Tribal village | Volcano island |
| L8 | Flower garden | Fruit stand | Lemonade stand |

### 0.7 Notable Fly High narrative notes

- **L1:** Mr. Grasshopper’s hopping spell; collect **ant token**, **bee token**, **butterfly token** at the three map areas; map sprites `ant.webp`, `bee.webp`, `butterfly.webp`; unlock farm gate; chase on Module Map.
- **L3:** Close **pen gates** in the prelesson (not collect signs); Strawbert opened pens; rewards ordered chicken → pig → cow. On the Module Map, Strawbert escapes into town, mixes up signs, and the student fixes them and stops Strawbert at the end.
- **L7:** Ripped sail; repair at shipyard, help tribe build yurt at tribal village, recover treasure map on volcano island; rewards: ship frame section, yurt canvas, treasure map; `tribal_person.webp` map sprite on tribal village.
- **L8:** Public park picnic; basket at flower garden, picnic fruits at fruit stand, drink cooler at lemonade stand; **picnic pavilion** is the finale exit (not a mission loot zone).

### 0.8 Dashboard asset sections (`Asset_Lists` columns)

| Column | Folder | Contents |
|--------|--------|----------|
| `Title_Screen_Assets` | `title_screen/` | `game_title.webp`, `game_subtitle.webp` (loading / branding) |
| `Map_Assets` | `map/` | Map backgrounds, masks, enter/exit frames; lesson-specific map sprites (e.g. `ant.webp`, `bee.webp`, `butterfly.webp` on Fly High L1) |
| `Quest_Assets` | `quest/` | `player_vehicle.webp`, `pregame_popup.webp`, `postgame_popup.webp` |
| `Antagonist_Assets` | `antagonist/` | `[slug]_spritesheet.webp` when character present; otherwise `N/A` |
| `M1_Assets` | `mission1_*` | Mission 1 scene/items **plus** `reward_m1_*.webp` |
| `M2_Assets` | `mission2_reading/` | `story_4panel.webp` **plus** `reward_m2_*.webp` |
| `M3_Assets` | `mission3_vocab/` | Quiz illustrations **plus** `reward_m3_*.webp` |
| `Ending_Assets` | `ending/` | `bg_ending_transition`, `bg_ending_main`, `bg_ending_1`…`N` |
| `Video_Assets` | `video/` | `intro.mp4` |
| `Audio_Assets` | `audio/` | Music, SFX, popup stings |

**Removed columns:** `UI_Assets` (renamed → `Title_Screen_Assets`), `Player_Assets` (merged into `Quest_Assets`), `Reward_Assets` (split into `M1_Assets` / `M2_Assets` / `M3_Assets`).

**Renamed file:** `vehicle_top.webp` → `player_vehicle.webp` (now listed under Quest Assets).

---

## 1. Project Context

This project plans **browser-based prelesson games** for an ESL curriculum (South Korean students, grades 1–3). Students play at home on the **E-Poly** online platform **before class**.

Each lesson has:
- A **topic**
- An **essential question (EQ)**
- **Story texts** (context/inspiration only — not Mission 2 copy)
- Vocabulary and related curriculum data

The prelesson game must:
1. Stay within the **general topic** of its lesson
2. Use the **story texts** and **essential question** as guides for narrative flow
3. Be **fun, creative, and playful** for young ESL learners
4. Use **simple language** (short sentences, familiar words)

### Fixed game structure (do not change)

Every prelesson keeps the same beats and mission formats:

```
Load → Start → Title → Map entrance → Quest reveal (2 steps)
→ Mission rewards deploy → Intro video → Explore map
→ 3 missions (1 reward/action each) → Prelesson goal complete
→ Unlock Module Map → Ending / class CTA
```

| Mission | Format |
|---------|--------|
| Mission 1 | Visual search / identification (Find It / What's Missing / Memory Match by level) |
| Mission 2 | Original 4-part read-aloud story to PolyPal (never textbook Story 1/2) |
| Mission 3 | Vocabulary quiz (Words I Know) |

Player avatar must be a **vehicle or non-humanoid** only. PolyPal is the tutor.

### Two-tier goals (required every lesson)

| Layer | What it is | Resolved when? |
|-------|------------|----------------|
| **Prelesson Goal** | What the student achieves in the home game by finishing 3 missions | End of prelesson |
| **Module Goal** | Broader narrative arc across prelesson + Module Map after-class activities | End of Module Map (after E-Poly after-class activities) |

**Critical rule:** The prelesson **starts** the Module Goal. It must **not** fully resolve it. Completing the prelesson **unlocks the Module Map**. Students advance on the Module Map by completing **after-class activities on E-Poly**. The Module Map ends with a meaningful achievement that continues the prelesson story.

---

## 2. Current Task (Narrative Redesign)

### Goal

Improve **all prelesson game narratives** so they are:
- Fun and creative for grades 1–3 ESL
- Written in simple language
- Built around a clear **main prelesson goal**
- Driven by **3 missions**, each producing a **meaningful collectible or action**
- Tightly **connected** to the Module Map payoff

### Source of truth for editing now

| File | Role |
|------|------|
| `Prelesson_Game_Scope_Sequence_v5.xlsx` | Workbook the user reviews (edit this; keep tabs in sync) |
| `lesson_designs.py` | Narrative designs for Wonders / Fly High / All Aboard / Set Sail / Into the Horizon lessons |
| `emerge_lesson_designs.py` | Narrative designs for Emerge (S1 / MAG) lessons |
| `generate_scope_sequence.py` | Regenerates Wonders rows into the xlsx + `build_asset_manifest()` |
| `apply_quest_updates.py` | Syncs narratives / mission labels / landmarks → `public/index.html` |
| `sync_asset_lists.py` | Syncs asset lists from manifest → `public/index.html` |
| `update_emerge_rows.py` / `append_emerge_rows.py` | Refresh Emerge rows in the xlsx |
| `wonders_lessons.md` / `emerge_lessons.md` | Curriculum context (EQ, stories, vocab) |
| `SAMPLE_APP.md` | Engine/template reference |
| `SUMMARY.md` | Original planning brief (structure still applies) |

### Do not invent a second story

- Prefer editing designs → run `apply_quest_updates.py` + `sync_asset_lists.py` → commit `public/index.html` for deploy
- Or: designs → regenerate Excel → `generate_dashboard.py` for local `prelesson_scope_sequence.html` review
- Do not hand-edit narrative JSON inside `public/index.html` without updating `lesson_designs.py` first

### Workflow for this phase

1. Read curriculum context (topic, EQ, story summaries) for each lesson.
2. Redesign narrative fields in `lesson_designs.py` / `emerge_lesson_designs.py` (preferred), **or** edit the xlsx directly if regenerating is not possible — but keep all related columns/tabs consistent.
3. Regenerate / update `Prelesson_Game_Scope_Sequence_v5.xlsx` with:
   - `python generate_scope_sequence.py` (48 Wonders rows)
   - `python append_emerge_rows.py` (24 Emerge rows; use `update_emerge_rows.py` only when Emerge rows already exist and you are refreshing in place)
4. After regenerate, clear **Game_Overview** review fills to white if the user wants a clean overview tab (do **not** change narrative text there unless asked).
5. Present changes for user review and iterate.
6. After Excel approval (or when asked): run `python apply_quest_updates.py` and `python sync_asset_lists.py`, then commit `public/index.html` for Cloudflare deploy. Optionally run `python generate_dashboard.py` for local xlsx-based HTML.

### Cross-tab sync rule (required)

`Game_Overview` narrative concepts are the source of truth for story. When regenerating, every other tab must stay aligned:

| Tab | Must match Game_Overview |
|-----|--------------------------|
| `Agent_Details` | PolyPal lines reference the same setting, rewards, characters, exit, and Module Map ending |
| `Asset_Lists` | Reward filenames match `reward_desc`; quest = `pregame_popup` + `postgame_popup`; ending = `bg_ending_*` layers (§0.5); antagonist = spritesheet only when character present |
| `Video_Information` | Topic + mission connection mention the same rewards / theme |
| `Mission_*_Details` | `M1/M2/M3_Zone_Name` = activity labels; `M1/M2/M3_Zone_Landmark` = map locations from `m1/2/3_landmark` |
| `Dev_Details` | Notes/complexity stay consistent with the design dict |

Do **not** invent a second story in Agent/Assets that conflicts with Game_Overview.

---

## 3. Narrative Design Rules (Must Follow)

### 3.1 Main prelesson goal + three missions

Every lesson needs:

1. **One clear Prelesson Goal** (what the student finishes at home)
2. **Three missions** that each contribute something **necessary** to that goal
3. After mission 3, the prelesson goal completes and the **Module Map unlocks**

### 3.2 Meaningful rewards / actions (anti-arbitrary rule)

**Do not** use arbitrary collectibles such as:
- Generic tokens, badges, stars, stamps-as-points, “mission markers,” or themed stickers that do not actually help the goal

**Do** use one of these patterns:

**Pattern A — Meaningful parts / tools**
> Goal: Launch a rocket that is missing parts.  
> Missions collect: fuel cell, astronaut suit, steering wheel (or similar real needs).

**Pattern B — Meaningful actions**
> Goal: Find buried treasure.  
> Missions: build a pirate ship → help a tribe raise a yurt → recover the treasure map.

**Pattern C — Help a character / stop a villain (preferred when it fits)**
> Inventor lost invention parts → student finds them → invention still needs Module Map work.  
> Or villain causes trouble in 3 missions → flees to the end of the Module Map.

Each mission reward must answer: **“Why does the main goal need this?”**  
If the answer is only “to fill a HUD slot,” redesign it.

**Uniqueness rule:** Mission reward items must **not repeat** across lessons (case-insensitive). Before finalizing a reward name, check all other `reward_desc` values in `lesson_designs.py` and `emerge_lesson_designs.py`.

**Variety within a lesson:** The three rewards/actions should feel different from each other (not “left bolt / middle bolt / right bolt”). Prefer three distinct objects or three distinct jobs.

**Fit rule:** Rewards must logically fix the stated problem. If sun/moon/star parts do not explain how a cracked screen is repaired, change the problem **or** the rewards until they match.

### 3.3 Prelesson ↔ Module Map continuity (required)

The prelesson and Module Map must feel like **one story**:

| After prelesson | On Module Map |
|-----------------|---------------|
| Student unlocks the map | Student completes after-class E-Poly activities to advance |
| Story is started, not finished | Story continues zone by zone |
| Final Module Map node | **Specific narrative event** that completes the same goal |

**Module Map ending must be a concrete event**, not a vague learning slogan.

| Bad ending | Good ending |
|------------|-------------|
| “…they learn about the sky” | “…they fly all the way home to Earth with Captain Nova” |
| “…they understand trade” | “…they load the cargo boat with Trader Omar and send the goods” |
| “…they learn how stories teach lessons” | “…they start Tale Night with Amara and share stories from many places” |

This is especially important for **Emerge** lessons, which previously overused “learn/understand” endings. Wonders lessons already follow the concrete-event pattern — match that quality for Emerge.

**Good example (treasure):**
- Prelesson Mission 3 recovers the **treasure map** and unlocks the Module Map
- Module Map end = dig up / open the **buried treasure** after all after-class activities

**Good example (villain):**
- Prelesson: stop the villain’s immediate mischief / recover what they stole
- Module Map end: confront and finally stop the villain

**Good example (helper / inventor):**
- Prelesson: gather missing parts
- Module Map end: invention finally works / character’s problem is fully solved

### 3.4 Antagonist / helper character (strongly preferred)

- Prefer including either a **villain** or a **helper character** the student aids
- Use when it fits the topic and EQ (do not force a villain onto every lesson)
- Connect them to both prelesson missions and Module Map payoff
- If unused, still define a clear problem/quest

**Antagonist column rule (asset planning):**
- List **villains and helper characters** in the Excel `Antagonist` column
- Format: `Name — short motivation / role`
- Set design fields `antagonist` + `antagonist_motivation` even for helpers (`has_antagonist=True` only for true villains/antagonists; helpers can use `has_antagonist=False` but still fill `antagonist`)
- The build pipeline treats a named `antagonist` as needing character assets

### 3.5 Language & tone

- Grades 1–3 ESL: short, clear sentences
- Playful, imaginative, kid-friendly
- Avoid abstract academic wording in quest copy (“demonstrate,” “analyze,” etc.)
- Keep pedagogical intent in Learning Objectives; keep quest copy story-like
- Prefer easy vocabulary in reward names when the audience is early ESL (e.g. “thick rope” / “steel nails” over “cable tool” / “metal rivets”)

### 3.6 Curriculum alignment

- Topic + EQ guide the quest
- Story texts inspire setting, characters, and Mission 2 themes
- Mission 2 remains an **original** story (not textbook text)
- Mission 3 uses unit vocabulary
- Do not invent missing curriculum data; flag gaps if found

### 3.7 Problem-cause variety (anti-repetition)

Do **not** overuse the same setup across lessons:
- Vehicle crash / flat tire / tipped truck / ran out of gas

Those causes are fine a **few** times total across the whole workbook. Prefer varied causes such as:
- Wind, rain, fog, freeze, animals, glitches, locked doors, missing props, storms, characters who need help

### 3.8 Region / setting specificity

When the setting is a world fair, island, or multi-region map, make rewards **region-specific** (e.g. arctic snowshoes, desert sand scarf, beach flippers) rather than generic clothing that could belong anywhere.

---

## 4. Excel Sync Requirements

Primary narrative column:
- `Game_Overview` → `Purpose_And_Goals` (includes Module Map continuation)

### Game_Overview column layout

| Column | Content |
|--------|---------|
| `ID` / `Lesson_Key` / `Lesson_Title` / `Activity_Name` | Unchanged identifiers + activity title |
| `Setting` | Setting name + description |
| `Player_Avatar` | Vehicle / non-humanoid avatar |
| `Purpose_And_Goals` | **Quest Details** — story narrative with `(Find It!)` / `(Reading Challenge)` / `(Words I Know)` tags; see §0.2 |
| `Mission_Rewards` | 3× reward category + semicolon-separated item list from `reward_desc` |
| `Antagonist` | Villain or helper character |
| `Quest_Flow` | Six-step explanatory quest flow (not the in-game 2-step popup) |

Removed from this tab: `Learning_Objectives`, `Prelesson_Exit`, `Quest_Intro`, `Ending_Summary`, `Quest_Details` (renamed).

When `Purpose_And_Goals` (or underlying design fields) change, sync related content in:

| Sheet | Columns to keep aligned |
|-------|-------------------------|
| `Game_Overview` | `Purpose_And_Goals`, `Mission_Rewards`, `Setting`, `Player_Avatar`, `Antagonist`, `Quest_Flow`, `Activity_Name` |
| `Agent_Details` | Welcome / start / exit / module map / ending lines; n8n prompts that mention rewards or quest |
| `Asset_Lists` | `Quest_Assets`, `M1_Assets`, `M2_Assets`, `M3_Assets`, `Antagonist_Assets`, ending assets if story payoff changes |
| `Video_Information` | Video connection lines that mention rewards/quest |
| `Mission_*_Details` | Only if zone names or mission framing must match new narrative |
| `Dev_Details` | Notes if complexity/story approach changed |

### Preferred regeneration path

1. Edit `lesson_designs.py` / `emerge_lesson_designs.py`
2. Snapshot the current xlsx cell values (for yellow highlighting)
3. Run `python generate_scope_sequence.py` (Wonders rows)
4. Run `python append_emerge_rows.py` or `python update_emerge_rows.py` (Emerge rows)
5. **Yellow-highlight every cell whose value changed** (`FFFF00` fill). Do **not** recolor unchanged cells.
6. Spot-check `Game_Overview`, `Agent_Details`, `Asset_Lists`, `Antagonist`

### Change-highlight rule (user review aid)

Whenever you edit `Prelesson_Game_Scope_Sequence_v5.xlsx`:
1. Compare old vs new cell values after regeneration / in-place update
2. Apply a review fill **only** to cells that actually changed in that pass
3. Leave all other cells’ formatting alone (do not clear earlier review colors)
4. Color convention used in this project:
   - First major redesign pass: **yellow** (`FFFF00`)
   - Character-trim pass: **orange** (`FFA500`)
   - Later revision passes: **light blue** (`ADD8E6`) when requested, so new edits are easy to spot against older review colors
5. Prefer in-place row updates for selected lesson keys when possible, so unrelated review colors are preserved
6. When writing selected rows in place, restore previous fills on unchanged cells after the write

---

## 5. Design Field Checklist (per lesson)

For every curriculum key, define:

- [ ] `activity_name` — playful title
- [ ] `problem` — kid-friendly setup (stakes + what is wrong/needed); cause is not overused crash/flat-tire
- [ ] `rewards` — category name (not “tokens/badges” unless truly meaningful objects)
- [ ] `reward_desc` — exactly 3 meaningful, **unique-across-workbook**, distinct items/actions
- [ ] Rewards logically fix the problem (fit test)
- [ ] `prelesson_goal` — what home play completes
- [ ] `module_goal` — **concrete Module Map event** (not “learn/understand X”)
- [ ] `exit` — what opens when all 3 rewards/actions are done
- [ ] `antagonist` + `antagonist_motivation` — villain **or** helper character listed for assets when used
- [ ] `m1_landmark`, `m2_landmark`, `m3_landmark` — map areas for each mission (see §0.5 for Fly High L1–8)
- [ ] `m1_quest_beat`, `m2_quest_beat`, `m3_quest_beat` — optional custom story beats when auto-gen is wrong
- [ ] `quest1` / `quest2` — 2-step pre-game popup copy (`Headline: … | PolyPal: …`)
- [ ] Agent lines — mention real rewards/actions; align with Quest Details story
- [ ] `Purpose_And_Goals` — expanded quest narrative (§0.2); includes Module Map unlock + payoff

### Quality bar questions

1. Can a 7-year-old explain what they are trying to do?
2. Does each mission give something the goal actually needs?
3. Is the Module Map ending the **same story**, as a **specific event**?
4. Are rewards concrete, unique, and not arbitrary tokens/badges?
5. Is language simple enough for ESL grades 1–3?
6. Are problem causes varied (not another crash/flat tire unless rare)?
7. If a character is helped or opposed, are they listed in `Antagonist` for asset creation?

---

## 6. Examples of Desired vs Undesired Rewards

| Undesired | Desired |
|-----------|---------|
| Generic “mission marker” with no story reason | Ant token at ant hill because Mr. Grasshopper hid it there (L1) |
| Blanket at recycling center / basket at random map spot | Picnic basket at flower garden, fruits at fruit stand, cooler at lemonade stand (L8) |
| Desert survival badge | Desert water pouch / arctic fur sample / rainforest canopy (unique per lesson) |
| Voyage token (vague) | Ship frame section, yurt canvas, treasure map (L7) |
| Left/middle/right bolt | Loose bolt tightened; cracked plank replaced; safety rope tied |
| Generic gifts | Handmade bookmark; thank-you letter; shared storybook |

---

## 7. Out of Scope

- Building or editing the **playable game** `index.html` (use `SAMPLE_APP.md` as engine reference; scope dashboard is `public/index.html`)
- Creating art/audio assets
- Changing mission format types or core engine beats
- Inventing missing textbook content

---

## 8. Delivery Expectations

When finishing a narrative pass:

1. Update designs + run `apply_quest_updates.py` + `sync_asset_lists.py` (or regenerate xlsx and highlight changes).
2. Yellow-highlight only changed cells when doing Excel review passes.
3. Confirm no duplicate mission rewards across the workbook.
4. Commit `public/index.html` when deploying; optionally run `generate_dashboard.py` for local xlsx HTML.
5. Confirm Emerge `Purpose_And_Goals` / `module_goal` lines are concrete events.
6. Summarize for the user:
   - How many lessons changed
   - Patterns used (parts / actions / villain / helper)
   - Notable Module Map bridges
   - Any lessons still needing human taste review

---

*End of agent instructions. Follow this file for narrative redesign work on the prelesson scope-and-sequence.*
