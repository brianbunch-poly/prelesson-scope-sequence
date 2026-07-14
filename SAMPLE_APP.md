# Fly High: Prelesson Game — Complete Self-Contained Specification

> **This is the only document you receive.** Everything needed to build, recreate, or adapt this game is in this file — narrative logic, full Lesson 1 copy, code architecture, asset lists, CONFIG values, n8n contracts, UI strings, timings, and file layout. No other repo files are required.

> **Deliverable:** One `index.html` (inline CSS + JS) plus asset folders described in Section 23. Target: ~3rd-grade pre-lesson browser game.

> **How to use this doc:**
> - **Sections 1–2** — Reusable template + adaptation logic (read first for new lessons).
> - **Sections 3–23** — Lesson 1 instance (insects / farm / Mr. Grasshopper) in full technical detail.
> - **Sections 24–30** — Complete copy, CONFIG expansions, n8n payloads, and implementation blueprint (build from these).

---

## v5 Production Asset Model (scope-and-sequence lessons)

> **For agents rebuilding lessons from `AGENT_INSTRUCTIONS.md` / `generate_scope_sequence.py`:** The **deployed asset plan** no longer uses the split popup files documented below for Lesson 1. Use this model instead when creating art for any new lesson.

| Moment | v5 asset | Folder | Notes |
|--------|----------|--------|-------|
| Pre-game popup | `pregame_popup.webp` | `quest/` | Popup frame, PolyPal bubble, character (if any) |
| Pre-game audio | `pregame_popup_audio.mp3` | `audio/` | Pre-game popup sting |
| Post-game popup | `postgame_popup.webp` | `quest/` | Mission complete + Module Map handoff; antagonist taunt if present |
| Post-game audio | `postgame_popup_audio.mp3` | `audio/` | Post-game popup sting |
| Exit transition | `bg_ending_transition.webp` | `ending/` | Pushed on after player exits game map |
| Module Map full | `bg_ending_main.webp` | `ending/` | Full Module Map — all modules visible |
| Module cover-up | `bg_ending_1.webp` … `bg_ending_N.webp` | `ending/` | Each overlay covers one more module (leaves, clouds, etc.) |
| Map character animation | `[slug]_spritesheet.webp` | `antagonist/` | Only when villain/helper present |

**Ending scene order:** exit → `bg_ending_transition` → `postgame_popup` → Continue → `bg_ending_main` → `bg_ending_1`…`N`. Full spec: `AGENT_INSTRUCTIONS.md` §0.5.

**Do not produce for v5 lessons:** `popup_step1/2`, `speech_bubble_01/02`, `[character]_intro`, `_intro_speech_01/02`, `_ending`, `_ending_speech`, `screen_base`, `screen_transition`, `slideshow_##`.

**In-game popup flow is unchanged:** still 2 text steps (`quest1` / `quest2` copy) before the intro video; only the **art pipeline** is simplified to one `pregame_popup` image (engine may still advance two text steps over the same art or use two states — implement per build).

**Lesson 1 v5 narrative:** Collect **ant token**, **bee token**, **butterfly token** at ant hill / beehive / butterfly area (not ant crumbs / honey jar / flower cup). See `lesson_designs.py` → `FH_U1_L1`.

Sections below retain the **original Lesson 1 template** file names for engine reference.

---

## 1. Game Concept

### What This Product Is (Template)

A browser-based **pre-lesson** game for ~3rd-grade students. It is **not** the main lesson — it is a short, playful **on-ramp** that:

1. Introduces the lesson topic through story, video, and activities
2. Lets the student **explore a map** and complete **2–3 small missions** tied to the unit
3. Uses a **PolyPal** (video-chat HUD) as tutor and conversation partner
4. Ends by **unlocking the Module Map** — a bridge to **in-class Module Map games** where students continue the broader lesson goal (e.g. Poly School activities)

The **code structure is a template**. The **farm, truck, tokens, and Mr. Grasshopper are Lesson 1 choices** — chosen because this unit is about **insects**. Other lessons should replace setting, optional antagonist, mission rewards, mission content, and agent script while keeping the same **beats** (Section 2).

### Two-Tier Goals (Template — Every Lesson)

| Goal | Scope | Resolved in prelesson? |
|------|-------|------------------------|
| **Module Goal** | Overall narrative across prelesson + Module Map class games | **No** — continues in class |
| **Prelesson Goal** | Complete 3 missions → collect rewards → unlock exit → reach Module Map | **Yes** |

### Lesson 1 Instance (Current Build)

**Fly High: Lesson 1** — topic: **insects**. Setting: **farm/orchard**. Antagonist: **Mr. Grasshopper** *(optional pattern — this lesson uses a villain)*. Player: **orange delivery truck**. Mission rewards: **3 farm tokens**. Art: playful 3D-ish illustration, warm browns and greens.

**Lesson 1 Module Goal:** Stop Mr. Grasshopper from making all the insects hop (continues on Module Map in class).

**Lesson 1 Prelesson Goal:** Complete 3 insect missions, collect the farm tokens, unlock the gate, and reach the Module Map.

**Lesson 1 story (surface):** Mr. Grasshopper stole the tokens and hid them at mission spots. The student drives the truck, completes 3 insect-themed activities, recovers the tokens, opens the exit gate, unlocks the Module Map — then sees slides pointing to classroom Module Map games where they will continue stopping Mr. Grasshopper and saving the insects.

### Core Loop (Template — Same for Every Lesson)

1. Load assets → tap to start
2. **Pre-game cinematic:** player enters map → **quest/problem reveal** (villain optional) → **mission rewards deploy to mission zones** → **intro video** (lesson hook)
3. **Main gameplay:** drive to glowing zones → complete **lesson-aligned activity** → earn **one reward per mission**
4. **Finale:** all rewards collected → **prelesson goal completes** (exit unlocks) → player reaches **Module Map**
5. **Extended ending:** transition + optional antagonist/celebration beat + **slideshow** + **Module Map unlock** teasing in-class continuation

Lesson 1 names: Grasshopper intro, farm tokens, R1_video, 13 ending slides, Module Map unlock. Other lessons swap these; the **sequence stays**.

---

## 2. Narrative Template & Adaptation Guide

This section explains **the logic behind every narrative beat** so a future agent knows what is fixed (structure) vs swappable (content).

### 2.1 Two-Tier Goals & Narrative Formulas

Every adaptation must define **both** goals:

| Goal | Question to answer | Lesson 1 |
|------|-------------------|----------|
| **Module Goal** | What is the student working toward across the whole lesson module (prelesson + Module Map)? | Stop Mr. Grasshopper from making all the insects hop |
| **Prelesson Goal** | What does the student achieve in this one home game? | Collect 3 tokens, unlock the gate, reach the Module Map |

**With villain (optional):**
> **Module Goal:** Stop [antagonist] from [bad outcome].
> **Prelesson Goal:** Complete 3 [topic] missions, collect [rewards], unlock [exit], reach the Module Map.

**Without villain:**
> **Module Goal:** [Achieve something important — e.g., prepare the town, restore balance, learn enough to help].
> **Prelesson Goal:** Complete 3 [topic] missions, collect [rewards], unlock [exit], reach the Module Map.

**Lesson 1 example:**
> **Module Goal:** Stop Mr. Grasshopper from making all the insects hop.
> **Prelesson Goal:** Complete 3 insect missions, collect the farm tokens, unlock the gate, and reach the Module Map.

**Hypothetical — Water Cycle (no villain):**
> **Module Goal:** Help the town understand the water cycle before the dry season.
> **Prelesson Goal:** Complete 3 water missions, collect weather badges, open the floodgate, and reach the Module Map.

**Hypothetical — Community Helpers (with villain):**
> **Module Goal:** Stop the Power Outage gremlin from keeping the town in the dark.
> **Prelesson Goal:** Complete 3 helper missions, find service keys, open the community center, and reach the Module Map.

The **beat structure is fixed**. The **nouns, rewards, villain presence, and goals** change per lesson.

---

### 2.2 Narrative Roles (Template) vs Lesson 1 Fill-Ins

| Narrative role | What it **does** (logic — keep this) | Lesson 1 instance | How to adapt for another lesson |
|----------------|--------------------------------------|-------------------|----------------------------------|
| **Setting / map** | Explorable space with **landmarks** where missions live; collision paths guide movement | Farm / orchard (`background_main.png`) | Any coherent place: city, reef, human body, museum, planet surface — map art + masks must match |
| **Player avatar** | Student **agency** — they move through the world to find missions | Orange delivery truck | **Required:** vehicle or **non-humanoid** avatar only (truck, boat, rover, submarine, etc.). No humanoid characters — student converses with PolyPal instead. Must have top-down sprite. |
| **Antagonist** *(optional)* | Creates **stakes** when a villain fits the topic; appears in pre-game + ending | **Mr. Grasshopper** | Pick only when it strengthens the topic. **Not required.** Use drought spirit, gremlin, etc. — or skip entirely |
| **Problem / quest** *(required)* | Explains **why** missions exist — with or without a villain | Grasshopper stole tokens / hopping curse | Always define a clear need: something to fix, collect, prepare, or unlock |
| **Mission rewards** | **Progress tracker** (HUD slots), **reward per mission**, **key to exit** when all collected | 3 farm tokens | Rename and redraw: badges, keys, crystals, seeds, map pieces — **not always tokens** |
| **Mission zones** | **Anchors on the map** linking geography to activities | Ant hill, beehive, butterfly tree | Rename + reposition to match **new map landmarks**; zone names should hint at mission content |
| **PolyPal** | **Tutor + companion**; opens missions, gives hints, receives reading/quiz chat | Friendly agent in video HUD | Same **role** every lesson; adjust tone, `LINES`, and `MISSION_CONTEXTS` to topic and essential question |
| **Intro video** | **Front-loads the unit hook**; may contain clues for missions; plays **before** free exploration | intro_video/R1_video.mp4 (insect/lesson hook) | New MP4 per lesson; agent script says “watch first — it may help with [rewards/topic]” |
| **Essential question (EQ)** | **Thread** through agent lines, Module Goal, ending CTA | Saving insects from Grasshopper’s hopping curse; Module Map games finish the fight | EQ drives Module Goal; prelesson only starts it |
| **Prelesson exit** | **Prelesson Goal payoff** — opens when all rewards collected | Top gate on farm | Thematic: gate, portal, dock, door — same code behavior |
| **Module Map unlock** | **End of prelesson** — student earns the Module Map | Slideshow reveals Module Map; agent announces unlock | Every lesson ends here; class games continue Module Goal |
| **Ending slideshow** | **Bridge to Module Map games** — not full Module Goal resolution | 13 slides + Module Map / Poly School CTA | New slide set per unit |

**Rule for agents:** If an element does not serve one of these roles, do not add it. Mr. Grasshopper is **replaceable skin** on the optional **Antagonist** role — not required for all games. **Module Map unlock** and **two-tier goals** are required for every lesson.

---

### 2.3 Why Each Story Beat Exists (Pre-Game → Ending)

Use this when rewriting flow for a new lesson. **Keep the beat; change the dressing.**

| Beat | Narrative logic (why it’s here) | Lesson 1 dressing | Adaptation notes |
|------|----------------------------------|---------------------|------------------|
| **Loading + welcome** | Establish Agent as guide before play | “Welcome! We need to get to the Module Map.” | Welcome should mention **lesson goal** or **journey**, not farm-specific text unless topic is farm |
| **Title card** | Brand the lesson (`Fly High: Lesson N`) | “Fly High: Lesson 1 / Concept Game Sample” | Update lesson number + subtitle per unit |
| **Entrance animation** | **Cinematic arrival** — student enters the world | Truck drives up from bottom; map frames | Same animation system; swap map PNGs for new setting |
| **Auto-drive to exit (pre-game)** | **Foreshadow the goal** before explaining the problem; creates “where we’re going” | Truck rushes to farm gate, stops | Can keep or simplify; goal is “show exit early” |
| **Quest reveal (2 steps)** | **Step 1:** problem/goal (+ villain if used). **Step 2:** what player must do + reward previews | Grasshopper popups + 3 token previews | Replace art and headlines; **keep 2-step structure**. Works with or without villain |
| **Mission rewards fly to zones** | Visually links **each mission** to a **map place** and HUD tracker | Tokens fly from popup to ant hill / hive / tree | New reward art; same number of flights as `CONFIG.ZONES.length` |
| **Antagonist exits map** *(optional)* | Villain **leaves** so student can explore; optional spectacle | Grasshopper spritesheet hops away | Skip if no villain; optional character exit animation |
| **Intro video** | **Pedagogical hook** before gameplay; optional clues | Insect lesson video | Required per lesson if unit has hook video; agent prompts watch-first |
| **Gameplay start** | Reset player to **exploration spawn**; state quest clearly | “Let’s go find those tokens!” | Agent line = restate **prelesson quest** in kid-friendly language |
| **Near-zone + enter mission** | Map **discovery** → **structured activity** | Zone names: Find It!, Reading Challenge!, Words I Know! | Zone names = **mission type + topic flavor** |
| **Per-mission reward to HUD** | **Immediate reward**; shows progress toward prelesson goal | Reward flies to top-left slot | Same mechanic; new icons (tokens, keys, badges, etc.) |
| **All missions → exit unlock** | **Prelesson Goal payoff** — rewards open the path to Module Map | Rewards fly to gate; exit backgrounds | Swap exit art; keep reward-fly + mask swap logic |
| **Reach Module Map** | **Physical completion** of prelesson; Module Map earned | Truck exits top / gate opens | Same trigger; narratively framed as unlocking Module Map |
| **Ending chain** | **Module Map unlock** + **handoff to class** | Grasshopper scenes, truck on ending screen, 13 slides | Replace beats and slides; **keep:** transition → optional villain/celebration → slideshow → Module Map unlock → continue in class |

---

### 2.4 Mission Types (Template) vs Lesson 1 Content

Mission **formats** are reusable across lessons. Mission **content** must change every time.

| Slot | Format (logic) | Completion gate (code) | Lesson 1 content | Adaptation |
|------|----------------|------------------------|------------------|------------|
| **Mission 1** | **Visual search / identification** — find all items in a scene | All hotspots found (`FINDIT_OBJECTS`) | Find 7 **insects** in `insects.png` | New scene image + mask colors + labels for **lesson entities** (planets, tools, body parts, etc.) |
| **Mission 2** | **Read-aloud / guided dialogue** — student reads parts of an **original** short story to Agent via chat | `missionChatCount >= 5` | **Original** caterpillar → butterfly 4-part story *(inspired by insect topic — not the textbook story)* | Write a **new** short story inspired by the lesson topic; 4 parts + illustration; update `MISSION_CONTEXTS[2]` |
| **Mission 3** | **Vocabulary / knowledge check** — questions with image support | `quizAllAnswered` | 10 **Words I Know** fill-in-blank items | New `QUIZ_QUESTIONS` + question images from **unit word list** |

**Agent rule:** Missions should **practice what the main lesson teaches**, not random trivia. Mission 1 = recognize/discriminate; Mission 2 = fluency/comprehension; Mission 3 = vocabulary or concept check — adjust formats if unit needs (e.g. swap Mission 1 for “sorting” only if template is extended).

Mission count is **3 in this build** but the pattern generalizes: **one mission reward + one zone + one activity per learning chunk**. Changing count requires updating `CONFIG.ZONES`, HUD slots, and exit sequence loops.

**Mission 2 story rule:** Do **not** use the textbook passage from the curriculum. Write an **original** short story inspired by the lesson topic, essential question, and vocabulary themes. Keep it short, simple, and age-appropriate. Lesson 1's caterpillar story is original — it is not "Creep Low, Fly High" from the student book.

---

### 2.5 Text & AI Layers to Rewrite Per Lesson

These are the **primary narrative edit surfaces** — not the game engine.

| Layer | Location in code | What to change |
|-------|------------------|----------------|
| **Local agent script** | `LINES` object | Every welcome, near-zone, mission-done, antagonist, exit, ending line — **no farm/insect wording** unless topic requires it |
| **Mission openers (AI)** | `MISSION_CONTEXTS` | Full prompt per mission: topic, rules, story parts, quiz Q&A — **must match new activities** |
| **Intro video AI** | `primeIntroVideoContext()` string | Why watch video; what clues it might give — tied to **new hook** |
| **Intro video end remarks** | `setupIntroVideo()` → `endRemarks` array | 3 short local lines after video |
| **Zone names & descriptions** | `CONFIG.ZONES`, modal `descEl.textContent` in `openMission()` | Display names tied to landmarks |
| **UI copy** | HTML overlays: `#intro-overlay`, `#grasshopper-intro` headlines, `#ending-transition-message`, carnival text | Lesson title, antagonist headlines, class CTA |
| **n8n system prompt** (external) | n8n workflow | Tell AI the **lesson title, EQ, grade level**, and to treat `MISSION CONTEXT:` as instructions |

**PolyPal behavior rules (keep across lessons):**
- Short sentences (1–3) for young learners
- Encourage; don’t give away answers (Find It: clues OK, not coordinates; Quiz: hints OK, not answers)
- Mission 2: structured read-aloud pacing
- Ending: announce **Module Map unlock**; point to **class Module Map games** — not solo completion of the Module Goal

---

### 2.6 Choosing Setting, Goals, and Missions (Checklist)

When adapting, work **topic → EQ → Module Goal → Prelesson Goal → setting → missions**, in that order:

1. **Essential question** — What should the student wonder or be able to do after the **full unit**?
2. **Module Goal** — What narrative arc continues on the Module Map in class? (Prelesson only **starts** this.)
3. **Prelesson Goal** — What does the home game achieve? (Complete 3 missions → collect rewards → unlock exit → reach Module Map.)
4. **Villain?** — Optional. Use only when it strengthens the topic. Otherwise define a clear **problem/quest** without an antagonist.
5. **Setting** — Where does this quest naturally live? Map art follows setting.
6. **Mission rewards** — What collectible fits the world? (Tokens, keys, badges, etc.)
7. **Three mission payloads** — Mission 1: visual topic set. Mission 2: **original** short story. Mission 3: unit vocabulary.
8. **Intro video** — Unit hook or phenomenon clip.
9. **Module Map ending** — Slideshow + CTA: Module Map unlocked; in class you will continue [Module Goal].

**Anti-patterns for agents:**
- Reusing Mr. Grasshopper or farm map for non-insect units without deliberate reason
- Forcing a villain when a non-villain quest fits better
- Using textbook story text in Mission 2
- Missions unrelated to the lesson essential question
- Resolving the Module Goal entirely in the prelesson
- Agent `MISSION_CONTEXTS` still describing insects after content swap
- Humanoid player avatars (vehicle or non-humanoid only)

### 2.7 Lesson 1 Quick Reference — Topic Binding

Why specific Lesson 1 choices were made (so agents know what to uncouple):

| Element | Bound to insect topic because… |
|---------|--------------------------------|
| Mr. Grasshopper | Insect villain; comic “hopping” curse fits character |
| Farm / orchard | Natural habitat context for insects; delivery truck fits “farm run” |
| Find It insects | Visual discrimination of species / specimens |
| Original butterfly story | **New** insect life-cycle story for Mission 2 — inspired by topic, not textbook |
| Words I Know | Unit vocabulary list from curriculum |
| Ambient ants/bees/butterflies on map | Decorative **thematic flavor** at each zone — optional pattern for other units |
| Ending Module Map unlock | Prelesson Goal complete; Module Goal continues on Module Map in class |

For Lesson 2+, replace each row with the new unit’s topic binding; keep column one’s **structural purpose** from Section 2.2.

---

## 3. Technical Architecture

| Property | Value |
|----------|-------|
| Structure | Single file: `index.html` (inline `<style>` + `<script>`) |
| Framework | None — vanilla HTML5, CSS3, ES6+ JavaScript |
| Rendering | HTML5 `<canvas id="gameCanvas">` for map, truck, zones |
| Overlays | DOM layers for HUD, modals, transitions, ending slideshow |
| Fonts | Google Fonts: **Fredoka One** (headings), **Nunito** (body) |
| External deps | Google Fonts CDN only |
| Server requirement | **Local web server required** for collision masks and Find It click detection (`canvas.getImageData` blocked on `file://`) |

### Image Path Rule

Filenames with spaces (e.g. `speaking agent.png`, `ending screen.png`, `findit_object location_mask.png`) **must** use `encodeURI(path)` when setting `.src` in JavaScript.

### Positioning Rule

Zone positions, spawn point, and exit use **fractions 0.0–1.0** of canvas width/height so the game scales to any viewport.

---

## 4. Complete Game Flow (Chronological)

> **Instance note:** Steps below describe **Lesson 1** (farm, truck, Mr. Grasshopper, insect missions). For the **purpose of each beat** when adapting, see **Section 2.3**.

```
[1] LOADING SCREEN
    • Preload all images via Promise.all (loadAll)
    • Show game title images, spinner, "Loading…"
    • When done: hide spinner, show "▶ Tap to Start"
    • Agent HUD appears; agent says LINES.titleWelcome
    • User taps Start → startGameFromTitle()

[2] TITLE OVERLAY (3 seconds)
    • Game screen shown; canvas sized to window
    • Orange truck (user1/red) auto-selected — NO vehicle picker in current build
    • Overlay: "Fly High: Lesson 1" / "Concept Game Sample"
    • STATE = 'intro_text'

[3] ENTRANCE ANIMATION (~2.4 s + drive-in)
    • STATE = 'intro_anim'
    • Swap collision mask → collision_mask_entrance.png
    • Map frames (600 ms each):
        background_main → background_enter2 → background_enter3
    • On enter3: truck spawns bottom-center, auto-drives up to START_Y
    • On arrival: background_enter4 (600 ms) → background_main
    • Play car stop SFX; swap mask → collision_mask.png

[4] PRE-GAME AUTO-DRIVE TO EXIT (preGameMode = true)
    • STATE = 'driving_to_exit'
    • Truck auto-drives fast to exit gate (EXIT_X, EXIT_Y)
    • Slam-brake bounce animation at gate
    • 1.5 s pause → canvas fades slightly

[5] MR. GRASSHOPPER INTRO (2-step popup)
    • showGrasshopperIntro()
    • Step 1: speech bubble 1, headline, agent LINES.grasshopperIntroPopup1
    • Continue → truck hidden, step 2: speech bubble 2, 3 token images shown
    • Continue → tokens fly from popup to map zones

[6] TOKEN FLY TO ZONES
    • STATE = 'token_fly'
    • Mr. Grasshopper intro sprite appears on map center
    • 3 tokens fly (staggered 220 ms) from popup positions to zone circles
    • On land: zone.tokenArrived = true (token image visible in circle)
    • Grasshopper spritesheet hops away (7-frame animation, waypoint path)
    • Mission tracker (top-left token slots) unhidden
    • Floating "Continue →" button (center screen)

[7] INTRO VIDEO SCREEN
    • User taps Continue → intro-video-screen
    • n8n primeIntroVideoContext() → agent opening remark
    • User taps ▶ on video → intro_video/R1_video.mp4 plays
    • On video end: random local agent remark; Continue button after 4 s
    • User taps Continue → startGame() (actual gameplay begins)

[8] MAIN GAMEPLAY
    • Truck respawns at START_X/START_Y (bottom of map)
    • All zones visible with tokens; agent: "Let's go find those tokens!"
    • STATE = 'driving'
    • Student drives (WASD/arrows or touch buttons)
    • Near zone: bottom notification + agent nearZone line (8 s cooldown)
    • Enter zone: tap circle (must be within ZONE_TRIGGER) OR press SPACE
    • Mission modal opens → complete activity → Complete Mission
    • Token pops above zone → flies to HUD slot
    • Repeat until 3/3 missions done

[9] ALL MISSIONS COMPLETE
    • Last mission: triggerTokenExitSequence()
    • Fanfare SFX (all missions complete)
    • 3 HUD tokens fly to exit gate (staggered)
    • Map → background_exit1 (1 s) → background_exit2 (700 ms)
    • Mask → collision_mask_exit.png
    • exitUnlocked = true; bouncing green EXIT ↑ arrow at top
    • Agent: LINES.allTokensUnlocked

[10] DRIVE OFF MAP / REACH MODULE MAP
    • Top canvas boundary opens when exitUnlocked
    • player.y < -CAR_SIZE * 0.3 → showGameOver()
    • Narratively: prelesson goal complete; student has earned the Module Map

[11] ENDING SEQUENCE (multi-stage, ~30+ seconds)
    • Game canvas slides down; transition layer pushes up
    • Truck sprite moves to bottom-center of transition screen
    • Mr. Grasshopper ending popup → spritesheet hops off top (optional if no villain)
    • Truck drives off top of transition
    • Fade to ending background; ambient insects animate on ending-decor-canvas
    • Truck drops onto ending screen from top
    • Ending grasshopper scene popup → corner hop animation (optional)
    • 13-slide ending slideshow (ending screen_1 … ending screen_13)
    • **Module Map unlock** revealed; agent announces student can continue in class
    • Final slide: agent LINES.endingScreenActivities + Module Map / class continuation message
    • Ending song loops; background music stopped
```

---

## 5. State Machine

| STATE | Description |
|-------|-------------|
| `loading` | Assets loading |
| `intro_text` | 3 s title overlay after tap to start |
| `intro_anim` | Map entrance frames + truck drive-in |
| `driving_to_exit` | Pre-game auto-drive to exit gate |
| `gh_intro_pre` | Pause before grasshopper popup |
| `token_fly` | Tokens flying to zones; grasshopper on map |
| `driving` | Normal player-controlled driving |
| `mission` | Mission modal open (truck frozen, touch controls hidden) |
| `complete` | Ending sequence started; game loop stops |

### Key Flags

| Variable | Purpose |
|----------|---------|
| `preGameMode` | `true` until intro video Continue → `startGame()` |
| `preGameTruckVisible` | Truck drawn during pre-game except step 1 of GH intro |
| `zonesVisible` | Zone circles hidden until token fly |
| `zoneDecorJumping` | Ambient insects bounce only after GH intro step 2 Continue |
| `exitUnlocked` | Gate open; top boundary removed |
| `chosenCar` | `'red'` (user1 orange truck) — hardcoded default |
| `SESSION_ID` | `'game-' + random` — sent to n8n per session |

---

## 6. Controls

| Input | Action |
|-------|--------|
| W / ↑ | Accelerate forward |
| S / ↓ | Reverse (max 45% of forward speed) |
| A / ← | Steer left (direction follows speed sign) |
| D / → | Steer right |
| SPACE | Open mission when near active zone |
| Tap zone circle | Open mission (must be within ZONE_TRIGGER of truck) |
| Escape | Close mission modal |
| Touch buttons | ▲▼◀▶ bottom-right (same as arrow keys) |

Friction decelerates when no key pressed. Canvas edges are walls except top when exit unlocked.

---

## 7. Mission Zones (CONFIG.ZONES)

| ID | Name | x | y | Color | Map Landmark | Token Asset |
|----|------|---|---|-------|--------------|-------------|
| 1 | Find It! | 0.06 | 0.76 | `#f44336` | In front of ant hill | `mission1_findit_token.png` |
| 2 | Reading Challenge! | 0.83 | 0.30 | `#ff8f00` | In front of beehive | `mission2_readingchallenge_token.png` |
| 3 | Words I Know! | 0.06 | 0.32 | `#8e24aa` | Behind butterfly tree | `mission3_wordsiknow_token.png` |

| Config Key | Value | Meaning |
|------------|-------|---------|
| `ZONE_RADIUS` | 44 px | Visual circle radius |
| `ZONE_TRIGGER` | 68 px | Proximity for notification + mission access |
| `START_X` / `START_Y` | 0.50 / 0.78 | Gameplay spawn after intro video |
| `EXIT_X` / `EXIT_Y` | 0.50 / 0.17 | Exit gate / arrow position |
| `EXIT_RADIUS` | 40 | Reserved |

Each zone object: `{ id, name, x, y, color, icon, icon2, completed, tokenArrived }`.

---

## 8. Mission Activities (Detailed)

### Mission 1 — Find It!

**Goal:** Tap all 7 insects in a scene image.

| File | Role |
|------|------|
| `mission1_findit/images/insects.png` | Main scene displayed in modal |
| `mission1_findit/images/findit_object location_mask.png` | Color-coded click hotspots (same dimensions as insects.png) |
| `mission1_findit/images/{insect}_text.png` | Label overlay revealed per find |

**Insects and mask colors (±30 RGB tolerance):**

| Key | Mask Color | Text Image |
|-----|------------|------------|
| ant | `#f54f37` | ant_text.png |
| bee | `#521ef4` | bee_text.png |
| butterfly | `#f363e9` | butterfly_text.png |
| caterpillar | `#fc82e7` | caterpillar_text.png |
| fly | `#1ef4ec` | fly_text.png |
| grasshopper | `#52a5f8` | grasshopper_text.png |
| ladybug | `#f3636f` | ladybug_text.png |

**Behavior:**
- Click maps to mask pixel via offscreen canvas + cached RGBA array
- Wrong click: silly honk sound (`playFindItHonk`)
- Correct click: chime (`playFindItSound`), label gets CSS class `revealed`, progress "Found: X / 7"
- Random local praise via `agentSay` (clears queue to avoid pile-up)
- n8n opening remark via `primeMissionContext(1)`
- **Complete Mission unlocks when:** `FINDIT_OBJECTS.every(o => o.found)`

---

### Mission 2 — Reading Challenge!

**Goal:** Student reads a 4-part **original** short story aloud to the agent via chat (typed or mic).

> **Template rule:** Mission 2 always uses a **new story written for the game**, inspired by the lesson topic — not the textbook Story 1 or Story 2. Lesson 1 below is an original insect life-cycle tale (not "Creep Low, Fly High" from the student book).

| File | Role |
|------|------|
| `mission2_readingchallenge/butterflystory.png` | Illustrated 4-part story in modal |

**Story text (4 parts):**
1. "Once upon a time, a small green caterpillar named Pip loved to eat big green leaves."
2. "One day, Pip felt very tired. He made a soft, warm bed called a chrysalis."
3. "He fell fast asleep inside. After many days, the bed opened up. Pip did not have tiny legs anymore."
4. "Instead, he had big, colorful wings! Pip was now a beautiful butterfly, and he flew high into the sky."

**Agent conversation flow (via n8n MISSION_CONTEXTS[2]):**
1. Opening → ask to read Part 1
2. After Part 1 read → compliment → ask Part 2
3. After Part 2 → compliment → ask Part 3
4. After Part 3 → compliment → ask Part 4
5. After Part 4 → compliment → ask "Did you like the story?"
6. After answer → brief closing compliment only (no more questions)

**Complete Mission unlocks when:** `missionChatCount >= 5` (5 user chat sends via n8n)
- On 5th send, game appends hidden `[SYSTEM NOTE: …]` to n8n payload instructing agent to tell student to tap Complete Mission

---

### Mission 3 — Words I Know!

**Goal:** 10-question fill-in-the-blank vocabulary quiz with illustration per question.

| File | Role |
|------|------|
| `mission3_wordsiknow/question images/{word}.png` | Illustration per question |

**Questions (QUIZ_QUESTIONS array):**

| # | Sentence | Choices | Answer | Image File |
|---|----------|---------|--------|------------|
| 1 | I ________ my sister by telling her jokes. | hum, cheer up, dip | cheer up | cheer up.png |
| 2 | I do not like it when my sister ________ about her good test scores. | boasts, wraps, fields | boasts | boast.png |
| 3 | I watched the cat slowly ________ under the bed. | save, dip, creep | creep | creep.png |
| 4 | My mom ________ the presents with pretty paper. | wraps, fancy, hums | wraps | wrap.png |
| 5 | The deer ran across the large ________ of grass. | fancy, field, missing | field | field.png |
| 6 | I like to ________ along to the songs that I listen to. | hum, boast, save | hum | hum.png |
| 7 | The girl looked for her ________ dog, but she could not find it. | fancy, missing, wrap | missing | missing.png |
| 8 | She wore a ________ dress and a pretty necklace. | fancy, field, dip | fancy | fancy.png |
| 9 | The front of the boat ________ below the surface of the water. | cheer ups, boasts, dips | dips | dip.png |
| 10 | The superhero ________ many people from danger. | saved, creeped, hummed | saved | save.png |

**Behavior:**
- Correct: green highlight, ding sound, advance after 1.4 s
- Wrong: red highlight, show correct answer, advance after 1.8 s (student sees answer but still progresses)
- After Q10: celebration emoji + agent congrats
- n8n opening via `primeMissionContext(3)`; agent stays quiet unless student asks
- Agent may give clues but NOT confirm answers
- **Complete Mission unlocks when:** `quizAllAnswered = true`

---

## 9. PolyPal System

### HUD Layout (top-right, always visible after loading)

```
[ Chat Panel 195×195px ] [ Video Frame 138×148px ]
```

**Chat panel:**
- Header: "POLYPAL" + 🔊 TTS toggle + LIVE badge
- Scrollable `#chat-history` (agent/user bubbles)
- `#chat-thinking` indicator while n8n waits
- Input row (if webhook configured): 🎤 mic, text input, ▶ send

**Video frame:**
- PolyPal avatar image (`Assets/speaking agent.png` in Lesson 1 — legacy filename; new builds may use `polypal.png`) with breathing animation
- `.speaking` glow class while message displayed
- Signal bars + "Connected" footer

### Message Queue

`agentSay(text, ms)` queues messages sequentially. Each message:
1. Appended to chat history
2. Spoken via TTS
3. Video frame glows for `ms` milliseconds (default 5500)

`clearAgentQueue()` stops TTS and clears pending messages (used when entering missions).

### Text-to-Speech

- Primary: OpenAI TTS API (`tts-1`, voice from `CONFIG.OPENAI_TTS_VOICE`, default `echo`)
- Fallback: browser `speechSynthesis` (prefer English female voice)
- Toggle: 🔊/🔇 button in chat header
- **CONFIG keys:** `OPENAI_TTS_KEY` (empty = browser fallback), `OPENAI_TTS_VOICE`

### Speech-to-Text

- Web Speech API (`SpeechRecognition` / `webkitSpeechRecognition`)
- Mic button: tap to start, transcript auto-sends to n8n
- Stops TTS before listening

### n8n Webhook Integration

**CONFIG:** `N8N_WEBHOOK_URL` — empty string disables chat input row.

**Request format (all calls):**
```json
{
  "chatInput": "<string>",
  "sessionId": "<string>"
}
```

**Session IDs:**

| Context | sessionId |
|---------|-----------|
| Intro video | `{SESSION_ID}_intro` |
| Mission 1/2/3 open + chat | `{SESSION_ID}_m1` / `_m2` / `_m3` |
| Free chat on map | `{SESSION_ID}` |

**When n8n is called:**

| Function | Trigger |
|----------|---------|
| `primeIntroVideoContext()` | Intro video screen opens |
| `primeMissionContext(id)` | Mission modal opens |
| `sendToN8n(message)` | User sends chat (type, Enter, or mic) |

**Response parsing:** First non-empty of `output`, `text`, `message`, `response`, or string body.

**Local-only vs n8n:** Most agent speech is local (`LINES`, hardcoded arrays). n8n is used only for: intro video open, mission open, and player chat. Full verbatim strings are in **Sections 24–25**.

### n8n system notes (appended to player chat, invisible in UI)

When `missionChatCount` is about to become **5** in Mission 2 (last required chat turn):

- **If last remaining mission on map:**
  ```
  [SYSTEM NOTE: This was the very last mission. Respond with ONE very short sentence only — a quick cheer or congratulations (e.g. "Whoa, you did it!" or "Great job!"). Tell the student to tap Complete Mission. No more than one sentence total. Do not ask a question.]
  ```
- **Otherwise:**
  ```
  [SYSTEM NOTE: End of this mission. Give one brief compliment, then tell them to tap Complete Mission. One sentence maximum. Do not ask a question.]
  ```

**On n8n error:** Agent says locally: `Oops — I couldn't reach the chatbot right now. Check the webhook URL in CONFIG.`

### Recommended n8n workflow setup (external to game)

1. **Chat Trigger** webhook — receives `{ chatInput, sessionId }`.
2. **AI node** system prompt should include:
   - Grade level (~3rd grade), lesson title (e.g. Fly High: Lesson 1)
   - Messages starting with `MISSION CONTEXT:` are **instructions**, not student speech — respond with the opening remark only
   - Keep replies 1–3 sentences, encouraging, simple vocabulary
3. Return JSON with `output` (or `text` / `message` / `response`) field containing agent reply.

If `N8N_WEBHOOK_URL` is empty: chat input row hidden; intro video uses local fallback only; mission openers silent on API failure.

---

## 10. Collision & Path Restriction

**CONFIG.PATH_MODE:** `'mask'` (use PNG alpha) or `'none'` (free roam)

| Mask File | When Used |
|-----------|-----------|
| `Assets/collision_mask.png` | Normal gameplay |
| `Assets/collision_mask_entrance.png` | Entrance animation (opening at bottom) |
| `Assets/collision_mask_exit.png` | After all missions (opening at top ~50% x, ~17% y) |

**Rules:** Opaque pixel (alpha > `MASK_ALPHA_THRESHOLD` 128) = blocked. Transparent = drivable.

**Implementation:**
- `_buildMaskCache(img)` reads all pixels once into `Uint8ClampedArray`
- `isPositionBlocked(cx, cy)` probes 13 points on truck footprint
- Display size: `CAR_SIZE * 1.5`; probe grid scaled by `COLLISION_SCALE` (0.50)
- `swapMask(img)` re-caches when mask changes

**Creating collision_mask.png:** Paint opaque over non-drivable areas on a layer matching `background_main.png` dimensions; export transparent PNG of that layer only.

---

## 11. Canvas Rendering Order

Each frame in `render(t)`:

1. Map background (`currentMapImg` or `IMG.map`)
2. Zone ambient insect decorations (`drawZoneDecorations`)
3. Mission zone circles (`drawZone`) — pulsing glow + token image
4. Exit arrow (`drawExitArrow`) when `exitUnlocked`
5. Player truck (`drawPlayer`) — top-down sprite rotated by `player.angle + π/2`
6. Foreground overlay (`background_overlay.png`) — drawn **on top of truck**
7. Zone name labels (`drawZoneLabel`) — **after overlay** so text stays visible
8. Map grasshopper sprite during `token_fly` (`drawMapGrasshopper`)

---

## 12. Vehicle (Player Avatar)

**Rule:** The player must **always** be a **vehicle or non-humanoid** avatar (truck, boat, rover, submarine, etc.). No humanoid characters — the student talks to **PolyPal** for conversation and guidance.

Current build **auto-selects** orange truck — no car selection UI.

| Internal Key | Front (unused) | Top-Down (map) | Notes |
|--------------|----------------|----------------|-------|
| `red` | user1_front.png | user1_top.png | **DEFAULT_PLAYER_CAR** |
| `blue` | user2_front.png | user2_top.png | Loaded but unused |
| `yellow` | user3_front.png | user3_top.png | Loaded but unused |

### Physics (CONFIG)

| Key | Value |
|-----|-------|
| MAX_SPEED | 3.70 px/frame |
| ACCELERATION | 0.159 |
| FRICTION | 0.88 |
| TURN_SPEED | 0.045 rad/frame |
| CAR_SIZE | 82 px (collision reference) |
| COLLISION_SCALE | 0.50 |

---

## 13. Complete Asset Catalog

### Assets/ — Core Game

| File | Purpose |
|------|---------|
| `game title.png` | Loading screen title (large) |
| `game_name.png` | Loading screen subtitle image |
| `speaking agent.png` | PolyPal avatar in HUD (display name: PolyPal) |
| `background_main.png` | Orchard/farm map (gameplay) |
| `background_overlay.png` | Foreground trees/objects drawn over truck |
| `background_enter2.png` | Entrance anim frame 2 |
| `background_enter3.png` | Entrance anim frame 3 (truck drives in) |
| `background_enter4.png` | Entrance anim frame 4 |
| `background_exit1.png` | Exit anim — gate begins opening |
| `background_exit2.png` | Exit anim — gate fully open |
| `collision_mask.png` | Normal gameplay collision |
| `collision_mask_entrance.png` | Entrance collision |
| `collision_mask_exit.png` | Exit collision |
| `user1_front.png` / `user1_top.png` | Orange truck (default player) |
| `user2_front.png` / `user2_top.png` | Blue truck |
| `user3_front.png` / `user3_top.png` | Yellow truck |
| `ending screen.png` | Base ending / carnival screen |
| `ending screen_transition.png` | Transition push layer |
| `mission1_findit_token.png` | Zone 1 token icon |
| `mission2_readingchallenge_token.png` | Zone 2 token icon |
| `mission3_wordsiknow_token.png` | Zone 3 token icon |

### Assets/ — Mr. Grasshopper (Lesson 1 template — see v5 model above)

> **v5 production:** Use `pregame_popup.webp`, `postgame_popup.webp`, and `mr_grasshopper_spritesheet.webp` only. The split files below are **legacy template** reference.

| File | Purpose |
|------|---------|
| `mrgrasshopper_intro.png` | *(legacy)* Intro popup + map intro sprite + ending corner |
| `mrgrasshopper_intro_speech1.png` | *(legacy)* Intro popup speech bubble step 1 |
| `mrgrasshopper_intro_speech2.png` | *(legacy)* Intro popup speech bubble step 2 |
| `mrgrasshopper_ending.png` | *(legacy)* Ending popup + transition small sprite |
| `mrgrasshopper_ending_speech.png` | *(legacy)* Ending popup speech bubble |
| `mrgrasshopper_endingscreen_speech.png` | *(legacy)* Ending scene speech bubble |
| `mr.grasshopper_spritesheet.png` | 7 frames × 512 px wide — hop animation (**still required in v5**) |

### Assets/ — Ambient Insects (Zone Decor)

Three PNGs per species, bouncing near mission zones:

| Zone | Files | Direction |
|------|-------|-----------|
| 1 (ants) | ant_1.png, ant_2.png, ant_3.png | Below-right of zone |
| 2 (bees) | bee_1.png, bee_2.png, bee_3.png (75% size) | Below-left |
| 3 (butterflies) | butterfly_1.png, butterfly_2.png, butterfly_3.png | Above-right |

Also on ending screen (`ENDING_DECOR`): ant, bee, butterfly clusters + fly_1/2/3 + dragonfly_1/2/3 at configured x/y fractions.

### Assets/ending images/

`ending screen_1.png` through `ending screen_13.png` — slideshow after game complete.
(Also `ending screen_0.png` exists on disk but is **not** referenced in code.)

### Assets/sounds/

| File | When Played |
|------|-------------|
| `background sounds.mp3` | Loop after first user click (volume 0.22) |
| `car stop.mp3` | Entrance animation completes |
| `pregame_popup_audio.mp3` | **(v5)** Pre-game popup sting |
| `postgame_popup_audio.mp3` | **(v5)** Post-game ending popup sting |
| `mrgrasshopper_intro sound.mp3` | *(legacy template)* Grasshopper intro popup |
| `mrgrasshopper_ending_audio.mp3` | *(legacy template)* Transition grasshopper ending scene |
| `mission complete sound.mp3` | Each mission completed |
| `all missions complete.mp3` | Tokens fly to exit gate |
| `delivery complete.mp3` | One-shot before ending song |
| `ending song.mp3` | Loop during ending slideshow (volume ~0.34) |

**Procedural sounds (Web Audio API, no files):** correct quiz ding, wrong quiz buzz, Find It chime, Find It wrong honk.

### intro_video/

| File | Purpose |
|------|---------|
| `R1_video.mp4` | Pre-game intro video (manual play, no autoplay) |

### mission1_findit/images/

| File | Purpose |
|------|---------|
| `insects.png` | Find It scene |
| `findit_object location_mask.png` | Click detection mask |
| `ant_text.png`, `bee_text.png`, `butterfly_text.png`, `caterpillar_text.png`, `fly_text.png`, `grasshopper_text.png`, `ladybug_text.png` | Revealed labels |

### mission2_readingchallenge/

| File | Purpose |
|------|---------|
| `butterflystory.png` | 4-part illustrated story |

### mission3_wordsiknow/question images/

`cheer up.png`, `boast.png`, `creep.png`, `wrap.png`, `field.png`, `hum.png`, `missing.png`, `fancy.png`, `dip.png`, `save.png`

---

## 14. DOM Structure (Key Elements)

| ID | Role |
|----|------|
| `#loading-screen` | Initial load + Tap to Start |
| `#intro-video-screen` | Pre-game video |
| `#game-screen` | Canvas + overlays |
| `#gameCanvas` | Main game canvas |
| `#intro-overlay` | 3 s title card |
| `#mission-tracker` | Top-left token slots (3) |
| `#zone-notif` | Bottom-center proximity hint |
| `#mission-modal` | Mission activity popup |
| `#complete-mission-btn` | Gated until activity done |
| `#mission-bypass-btn` | Testing bypass (hidden by default in flow) |
| `#agent-hud` | PolyPal overlay |
| `#grasshopper-intro` | Pre-game GH popup |
| `#grasshopper-ending` | Transition GH popup |
| `#pregame-continue-btn` | After token fly |
| `#canvas-overlay` | Dark fade during GH intro |
| `#exit-combined-layer` | Transition push images |
| `#exit-truck-layer` | Truck sprite during ending |
| `#exit-gh-canvas` | Grasshopper hop animation canvas |
| `#ending-decor-canvas` | Ambient insects on ending bg |
| `#ending-bg-fade` | Fade to ending background |
| `#ending-screen-gh-scene` | Mid-ending GH popup |
| `#carnival-screen` | Ending slideshow container |
| `#ending-slide-13-layer` | Final slide overlay |
| `#ending-transition-message` | Closing text on slide 13 |
| `#btn-forward/backward/left/right` | Touch controls |

---

## 15. Color Palette & Typography

| Role | Color |
|------|-------|
| Page background | `#3d1e06` |
| Primary accent (gold) | `#c4922a` |
| Panel brown | `#4e2a08` / `#8b5a2b` borders |
| Text cream | `#f5deb3` |
| Mission tracker bg | `#faf3e6` |
| Live indicator | `#ef5350` |
| Exit arrow green | `#22c55e` |

Headings: **Fredoka One**. Body/UI: **Nunito**.

---

## 16. Key JavaScript Functions

| Function | Role |
|----------|------|
| `init()` | Load assets, show start button |
| `loadAll()` | Preload all IMG + SFX |
| `startGameFromTitle()` | Music + selectCar(red) |
| `selectCar(color)` | Setup canvas, title overlay, entrance |
| `startEntranceAnim()` | Map frame sequence |
| `updateDriveToExit()` | Pre-game auto-drive |
| `showGrasshopperIntro()` | 2-step popup |
| `flyTokensToZones()` | Pre-game token animation |
| `setupIntroVideo()` | Video play/end handlers |
| `startGame()` | Begin real gameplay after video |
| `openMission(zone)` | Build modal content per mission |
| `checkMissionComplete()` | Unlock Complete button |
| `completeMission()` | Mark done, collectToken, maybe exit sequence |
| `collectToken(zone)` | Pop + fly token to HUD |
| `triggerTokenExitSequence()` | Fly HUD tokens to gate |
| `update()` / `render(t)` | Game loop |
| `showGameOver()` | Start ending chain |
| `startEndingSlideshow()` | 13 slides with crossfade |
| `agentSay()` / `sendToN8n()` / `primeMissionContext()` | Agent comms |
| `speakText()` | OpenAI TTS or speechSynthesis |

---

## 17. Token Animation System

**flyToken(src, fromX, fromY, toX, toY, opts):**
- Creates fixed-position `<img>` at start
- CSS transform translate + scale + optional fade
- Default duration 900 ms, cubic-bezier easing
- Used for: pre-game token deploy, mission completion → HUD, HUD → exit gate

**collectToken(zone):**
1. Pop token above zone (scale 0.2 → 1, 1.6 s hold)
2. Fly to `#token-slot-{id}` in mission tracker
3. Fill slot with earned token image

---

## 18. Antagonist Exit Animation (Lesson 1: Mr. Grasshopper)

> **Template role:** Optional **antagonist departure spectacle** after mission rewards deploy to the map. Lesson 1 uses a grasshopper spritesheet; another lesson can swap art and keep the waypoint hop logic (`MAP_GH_WAYPOINTS`, `#exit-gh-canvas`). Skip entirely if the lesson has no villain.

**Spritesheet:** `mr.grasshopper_spritesheet.png` — 7 frames, each 512 px wide.

**Waypoint grid** (center = 0,0; +y = up on screen):
```
(0,0) → (-0.5,0.9) → (0,1.8) → (-0.5,2.7) → (0,3.6) → (-0.5,4.5)
```
- Even segments: quadratic bezier air arc
- Odd segments: ease-out landing with brief hold
- Frame cycling: 1 full cycle before y=1.8, 1 before y=3.6, half cycle on final exit

Used on map during pre-game exit AND on `#exit-gh-canvas` during ending transition.

---

## 19. CONFIG Object (Full Reference)

See **Section 26** for the complete expanded CONFIG including `ZONES`, `ZONE_DECOR`, and `ENDING_DECOR`. Secrets (`N8N_WEBHOOK_URL`, `OPENAI_TTS_KEY`) are empty strings in new builds until configured.

---

## 20. How to Run

```bash
# From project root — REQUIRED for masks and Find It clicks
npx serve .
# or
python -m http.server 8080
```

Open `http://localhost:3000` (or :8080) in Chrome, Edge, or Firefox.

**Without a server:** Game loads but collision and Find It tapping fail silently.

---

## 21. Recreation & Adaptation Checklist

### Recreate Lesson 1 (same topic)

1. Create single `index.html` with embedded CSS matching brown/gold orchard theme
2. Implement CONFIG, STATE machine, and asset preloader with `encodeURI`
3. Build canvas game loop: update physics → render map/truck/zones/overlay
4. Implement 3 collision masks with swap on entrance/exit
5. Build Agent HUD: chat history, TTS, n8n fetch, mic STT
6. Implement pre-game sequence: entrance → drive to exit → antagonist intro → token fly → video → startGame
7. Implement 3 mission modals with distinct completion gates
8. Implement token collect + exit unlock + drive-off detection
9. Implement multi-stage ending (transition, antagonist hops, slideshow)
10. Place all assets in folder structure from Section 13
11. Calibrate zone x/y against `background_main.png`
12. Create `findit_object location_mask.png` matching scene image dimensions
13. Configure n8n webhook + optional OpenAI TTS key in CONFIG

### Adapt for a new lesson (new topic / EQ / story)

1. **Define** essential question, Module Goal, Prelesson Goal, optional villain, setting, and 3 mission payloads (Section 2.6)
2. **Rewrite** all narrative text layers: `LINES`, `MISSION_CONTEXTS`, HTML headlines, Module Map ending CTA (Section 2.5)
3. **Replace** map, overlay, entrance/exit backgrounds, and collision masks for new setting
4. **Replace** quest/villain popup art + speech bubbles (reuse `#grasshopper-intro` structure as generic quest overlay)
5. **Replace** mission reward PNGs (one per mission) and HUD slot labels
6. **Replace** intro video MP4 + `primeIntroVideoContext` / `endRemarks` copy
7. **Replace** Mission 1 scene + mask + label images; update `FINDIT_OBJECTS`
8. **Write** original Mission 2 story + image; update `MISSION_CONTEXTS[2]` (not textbook text)
9. **Replace** Mission 3 `QUIZ_QUESTIONS` + question images
10. **Replace** ending slideshow PNGs (`ENDING_SLIDES`) and `#ending-transition-message` (Module Map unlock)
11. **Update** zone names/positions in `CONFIG.ZONES` to match new map landmarks
12. **Optional:** player sprite, ambient decor (`ZONE_DECOR`, `ENDING_DECOR`), color palette in CSS
13. **Verify** n8n workflow system prompt references new lesson title and rules

---

## 22. Known Quirks & Implementation Notes

- **Mr. Grasshopper, farm, and truck** are Lesson 1 content — not required for other lessons (see Section 2). **Villains are optional** for all lessons.
- **PolyPal** is the tutor name in all UI and n8n prompts (not "Speaking Agent").
- **Mission 2** always uses an **original** story — never textbook Story 1/2 from the curriculum.
- **Ending** always unlocks the **Module Map**; Module Goal continues in class.
- **Player avatar** must always be a vehicle or non-humanoid — never a humanoid character.
- **No vehicle selection screen** in current code — truck is always `red` (user1).
- **Mission 3 wrong answers still advance** to the next question after showing the correct answer.
- **Mission bypass button** exists for testing (`#mission-bypass-btn` completes mission instantly).
- **`#mission-list`** in tracker is `display:none` — only token slots are visible.
- **Quiz image filenames** in code (`boast.png`, `wrap.png`, `dip.png`, `save.png`) differ slightly from some doc filenames (`boasts.png`, `wraps.png`, etc.) — match what's on disk.
- **Secrets:** Replace API keys in CONFIG before committing; use empty strings for offline-only play.

---

## 23. File Tree (What You Must Produce)

```
project_root/
├── index.html                          ← Single file: all HTML, CSS, JS
│
├── Assets/
│   ├── game title.png, game_name.png
│   ├── speaking agent.png
│   ├── background_main.png, background_overlay.png
│   ├── background_enter2/3/4.png
│   ├── background_exit1/2.png
│   ├── collision_mask.png, collision_mask_entrance.png, collision_mask_exit.png
│   ├── user1/2/3_front.png, user1/2/3_top.png
│   ├── ending screen.png, ending screen_transition.png
│   ├── mission1/2/3 *_token.png
│   ├── mrgrasshopper_*.png, mr.grasshopper_spritesheet.png
│   ├── ant_1/2/3.png, bee_1/2/3.png, butterfly_1/2/3.png
│   ├── fly_1/2/3.png, dragonfly_1/2/3.png
│   ├── ending images/ending screen_0..13.png
│   └── sounds/*.mp3
│
├── intro_video/R1_video.mp4
│
├── mission1_findit/images/
│   ├── insects.png, findit_object location_mask.png
│   └── *_text.png (7 insects)
│
├── mission2_readingchallenge/butterflystory.png
│
└── mission3_wordsiknow/question images/*.png (10 images)
```

---

## 24. Complete Local Script & UI Copy (Lesson 1)

All verbatim text the game displays or speaks locally (not from n8n).

### 24.1 `LINES` object (copy into `<script>`)

```javascript
const LINES = {
  titleWelcome:
    "Welcome! We need to get to the Module Map. Let's get started!",

  grasshopperIntroPopup1:
    "Mr. Grasshopper says he's the king of all the insects — and he's making every bug hop just like him! " +
    "We have to stop him!",

  grasshopperIntroPopup2:
    "Mr. Grasshopper hid all three tokens somewhere on the farm! " +
    "We need to find every token and unlock the exit gate so we can stop him!",

  tokensHiddenLine:
    "Mr. Grasshopper hid the tokens somewhere on the farm — we have to find them!",

  nearZone: (n) => {
    const variants = [
      `You're close to ${n}.`,
      `${n} is close by.`,
      `We're near ${n}.`,
      `Looks like ${n} is just ahead.`,
      `${n} is right around here.`,
      `Hey, ${n} is nearby!`,
      `We're almost at ${n}.`,
    ];
    return variants[Math.floor(Math.random() * variants.length)];
  },

  missionStart: (n) =>
    `Alright, starting the ${n} mission. Let's see what you've got!`,

  missionDone: (n, left) =>
    left > 0
      ? `Nice work at ${n}! ${left} mission${left > 1 ? 's' : ''} left — keep going!`
      : `Last mission done — incredible work!`,

  allTokensUnlocked:
    "You got all the tokens! The exit gate is open — you can leave whenever you're ready!",

  grasshopperEndingSpeak:
    "You have to stop Mr. Grasshopper so the animals can stop hopping!",

  endingScreenActivities:
    "You need to finish the extra activities so you can stop Mr. Grasshopper and free the insects! " +
    "You can do all the activities with your class at Poly School.",

  nearExit:
    "You've completed every mission! Drive through the exit to finish — keep going!",
};
```

*(Unused in current flow but defined in code: `grasshopperBackstory`, `lastTokenCollected`, `headsForExit`, `grasshopperDefeated` — safe to omit or repurpose when adapting.)*

### 24.2 HTML overlay copy (hardcoded in DOM)

| Element | Text |
|---------|------|
| `#intro-overlay h1` | Fly High: Lesson 1 |
| `#intro-overlay .game-subtitle` | Concept Game Sample |
| `#load-text` | Loading… |
| `#start-btn` | ▶ Tap to Start |
| `#intro-video-screen .iv-video-heading` | Let's watch the video together! |
| `#iv-continue-btn` | Continue ▶ |
| `#mission-tracker h4` | Tokens |
| `#zone-notif .nz-hint` | Press SPACEBAR to start the mission! (wrap `SPACEBAR` in `<kbd>`) |
| `#mission-locked-hint` | Complete the activity above to unlock this button… |
| `#complete-mission-btn` | ✓ Complete Mission |
| `#ctrl-hint` | WASD / ↑↓←→ — Drive · SPACE — Interact |
| `#gh-intro-headline` (step 1) | Mr. Grasshopper is making all the insects hop like him! |
| `#gh-intro-headline` (step 2) | You must find the three tokens to unlock the gate and stop Mr. Grasshopper! (allow `<br>`) |
| `#gh-intro-btn` / `#pregame-continue-btn` | Continue → |
| `#gh-ending-headline` | Stop Mr. Grasshopper and free the insects! |
| `#ending-gh-scene-text` | Complete the extra activities with your class to face Mr. Grasshopper and save the insects! |
| `#ending-transition-message` | Good job! Now you can do the extra activities in class at Poly! Finish them all to beat Mr. Grasshopper and save the insects. |
| `#carnival-unlock-text` | 🌿 You Finished! / Great work completing all your missions! |
| `#ending-unlock-popup` | You Unlocked the Activities Map! / Amazing work — you completed all 3 missions! |
| `#chat-thinking` | PolyPal is thinking… |
| `#chat-input` placeholder | Ask PolyPal… |
| PolyPal HUD header | POLYPAL |
| Video frame name | POLYPAL |

### 24.3 Other hardcoded agent strings

| Moment | Text |
|--------|------|
| `startGame()` after intro video | "Let's go find those tokens! Head to each glowing circle on the map to start a mission!" |
| Tap zone from too far | "Drive your truck over to the circle first, then tap it to begin!" |
| Find It praise (random) | Great find! / Nice job! / You found one! / Keep going! / Excellent! / Wow, good eye! |
| Find It all found (not last mission) | "You found all the insects! Tap Complete Mission to keep going!" |
| Find It all found (last mission) | "Whoa — you found them all! Great job! Tap Complete Mission!" |
| Quiz complete (not last) | "Great job on the vocabulary! Tap Complete Mission to keep going!" |
| Quiz complete (last) | "Congratulations — you know all the words! Tap Complete Mission!" |
| Intro video end (`endRemarks`, pick 1) | "Interesting! That might just help us. Okay — let's go get those tokens!" / "Good to know! That could come in handy. Alright, let's start looking!" / "Hmm, useful! Let's keep that in mind as we go. Let's get moving!" |
| Intro video n8n fallback | "First, let's watch this video — it might give us some clues to help us find the tokens. Press play when you're ready!" |
| STT mic denied | "I need microphone permission to hear you. Please allow mic access in your browser and try again." |
| STT error | "Hmm, I had trouble hearing you. Try tapping the mic again!" |

### 24.4 Mission modal descriptions (`openMission` → `descEl.textContent`)

| Mission | Description |
|---------|-------------|
| 1 | Find and tap all the insects hiding in the image! |
| 2 | Read each part of the story to your PolyPal! |
| 3 | Pick the right word to complete each sentence! |

---

## 25. Complete n8n Payloads (Lesson 1)

### 25.1 Intro video — `primeIntroVideoContext()` → `chatInput`

```
MISSION CONTEXT: You are the PolyPal in an educational game called Fly High: Lesson 1. The student needs to watch a short video before starting the game. Tell the student they should watch the video first because it might have clues to help find the tokens. Do NOT act surprised. Do NOT say the video will explain everything. Keep it calm and brief — 1-2 sentences. For example: "Let's watch this video first — it might give us some clues about finding the tokens. Press play when you're ready!"
```

**sessionId:** `{SESSION_ID}_intro`

### 25.2 Mission 1 — `MISSION_CONTEXTS[1]`

```
MISSION CONTEXT: You are the PolyPal in an educational game called Fly High: Lesson 1. The student just entered the "Find It!" mission. They are looking at an image of an insect scene. The image contains 7 insects they need to find and tap: ant, bee, butterfly, caterpillar, fly, grasshopper, and ladybug. Respond NOW with a short, excited opening remark and tell the student to try to find all the insects in the image and tap them. Example: "Look at all these insects hiding in the picture! Can you find and tap all 7 of them?" IMPORTANT RULES: - You CAN give clues about where an insect might be hiding (e.g., "Look near the flowers" or "Check the bottom left"). - You CANNOT point to the exact location or just say the answer. - If the student asks for help finding a specific insect, give a creative clue about that insect's typical habitat or appearance. - Keep replies to 1-3 sentences. This is a young learner — stay simple and encouraging.
```

### 25.3 Mission 2 — `MISSION_CONTEXTS[2]`

```
MISSION CONTEXT: You are the PolyPal in an educational game called Fly High: Lesson 1. The student just entered the "Reading Challenge!" mission. They are looking at an illustrated story split into 4 numbered parts on screen. Here are the 4 parts: Part 1: "Once upon a time, a small green caterpillar named Pip loved to eat big green leaves." Part 2: "One day, Pip felt very tired. He made a soft, warm bed called a chrysalis." Part 3: "He fell fast asleep inside. After many days, the bed opened up. Pip did not have tiny legs anymore." Part 4: "Instead, he had big, colorful wings! Pip was now a beautiful butterfly, and he flew high into the sky." Guide the student through reading all 4 parts one at a time. Here is exactly how the conversation should go: Opening (respond NOW): Give a warm, excited remark and ask the student to try reading Part 1 to you. Example: "I love stories! Try reading Part 1 to me." After student reads Part 1: Short compliment, then ask them to read Part 2. After student reads Part 2: Short compliment, then ask them to read Part 3. After student reads Part 3: Short compliment, then ask them to read Part 4. After student reads Part 4: Short compliment, then ask: "Did you like the story?" After they answer that final question: The mission is complete — give a brief closing compliment only, do not ask another question. Keep every response to 1-3 sentences. This is a young learner — stay simple and very encouraging.
```

### 25.4 Mission 3 — `MISSION_CONTEXTS[3]`

```
MISSION CONTEXT: You are the PolyPal in an educational game called Fly High: Lesson 1. The student just entered the "Words I Know!" mission. They are about to take a 10-question vocabulary quiz. Each question is a fill-in-the-blank sentence, and they pick the correct word from 3 choices. Here are all 10 questions, correct answers, and distractors for your reference: Q1: "I ________ my sister by telling her jokes." Choices: hum, cheer up, dip. Answer: cheer up. Q2: "I do not like it when my sister ________ about her good test scores." Choices: boasts, wraps, fields. Answer: boasts. Q3: "I watched the cat slowly ________ under the bed." Choices: save, dip, creep. Answer: creep. Q4: "My mom ________ the presents with pretty paper." Choices: wraps, fancy, hums. Answer: wraps. Q5: "The deer ran across the large ________ of grass." Choices: fancy, field, missing. Answer: field. Q6: "I like to ________ along to the songs that I listen to." Choices: hum, boast, save. Answer: hum. Q7: "The girl looked for her ________ dog, but she could not find it." Choices: fancy, missing, wrap. Answer: missing. Q8: "She wore a ________ dress and a pretty necklace." Choices: fancy, field, dip. Answer: fancy. Q9: "The front of the boat ________ below the surface of the water." Choices: cheer ups, boasts, dips. Answer: dips. Q10: "The superhero ________ many people from danger." Choices: saved, creeped, hummed. Answer: saved. Respond NOW with a short, enthusiastic opening remark introducing the quiz — something like: "Time to show off how much we know! Let's see how many of these vocabulary words you get right!" IMPORTANT RULES: - After your opening remark, stay QUIET unless the student types a question to you. - If asked for help, you CAN give a clue about the meaning of a word (e.g., a definition, an example sentence, or a hint). - You CANNOT give or confirm the correct answer. - When the student finishes all 10 questions, congratulate them warmly. - Keep every reply to 1-3 sentences. This is a young learner — stay simple and encouraging.
```

**sessionId for missions:** `{SESSION_ID}_m1`, `_m2`, `_m3`

---

## 26. Full CONFIG, Data Arrays & Asset Load List

### 26.1 Complete `CONFIG` (Lesson 1)

```javascript
const CONFIG = {
  MAX_SPEED: 3.70,
  ACCELERATION: 0.159,
  FRICTION: 0.88,
  TURN_SPEED: 0.045,
  CAR_SIZE: 82,
  COLLISION_SCALE: 0.50,
  START_X: 0.50,
  START_Y: 0.78,
  PATH_MODE: 'mask',
  MASK_FILE: 'Assets/collision_mask.png',
  MASK_CACHE_BUST: '2026-04-08',
  MASK_ALPHA_THRESHOLD: 128,
  ZONES: [
    { id: 1, name: 'Find It!',          x: 0.06, y: 0.76, color: '#f44336', icon: '🐜', icon2: '🍑' },
    { id: 2, name: 'Reading Challenge!', x: 0.83, y: 0.30, color: '#ff8f00', icon: '🐝', icon2: '🍊' },
    { id: 3, name: 'Words I Know!',      x: 0.06, y: 0.32, color: '#8e24aa', icon: '🦋', icon2: '🍎' },
  ],
  ZONE_RADIUS: 44,
  ZONE_TRIGGER: 68,
  ZONE_DECOR_SIZE: 39,
  ZONE_DECOR: {
    1: {
      screenNudge: { dx: 0.05, dy: -0.01 },
      files: ['Assets/ant_1.png', 'Assets/ant_2.png', 'Assets/ant_3.png'],
      offsets: [{ dx: 68, dy: 62 }, { dx: 104, dy: 88 }, { dx: 140, dy: 114 }],
      bounce: [
        { period: 920,  phase: 0,   height: 22 },
        { period: 1080, phase: 340, height: 26 },
        { period: 1240, phase: 710, height: 20 },
      ],
    },
    2: {
      screenNudge: { dx: -0.10, dy: -0.08 },
      sizeScale: 0.75,
      files: ['Assets/bee_1.png', 'Assets/bee_2.png', 'Assets/bee_3.png'],
      offsets: [{ dx: -68, dy: 62 }, { dx: -104, dy: 88 }, { dx: -140, dy: 114 }],
      bounce: [
        { period: 980,  phase: 180, height: 24 },
        { period: 1120, phase: 520, height: 28 },
        { period: 1300, phase: 860, height: 21 },
      ],
    },
    3: {
      screenNudge: { dx: 0.02, dy: 0 },
      files: ['Assets/butterfly_1.png', 'Assets/butterfly_2.png', 'Assets/butterfly_3.png'],
      offsets: [{ dx: 68, dy: -62 }, { dx: 104, dy: -88 }, { dx: 140, dy: -114 }],
      bounce: [
        { period: 900,  phase: 260, height: 23 },
        { period: 1050, phase: 600, height: 27 },
        { period: 1180, phase: 940, height: 19 },
      ],
    },
  },
  ENDING_DECOR_SIZE: 32,
  ENDING_DECOR: [
    { id: 'ant', x: 0.14, y: 0.80, files: ['Assets/ant_1.png','Assets/ant_2.png','Assets/ant_3.png'],
      offsets: [{dx:0,dy:0},{dx:34,dy:28},{dx:68,dy:56}],
      bounce: [{period:920,phase:0,height:14},{period:1080,phase:340,height:16},{period:1240,phase:710,height:12}] },
    { id: 'bee', x: 0.86, y: 0.78, sizeScale: 0.75, files: ['Assets/bee_1.png','Assets/bee_2.png','Assets/bee_3.png'],
      offsets: [{dx:0,dy:0},{dx:-34,dy:28},{dx:-68,dy:56}],
      bounce: [{period:980,phase:180,height:15},{period:1120,phase:520,height:17},{period:1300,phase:860,height:13}] },
    { id: 'butterfly', x: 0.16, y: 0.24, files: ['Assets/butterfly_1.png','Assets/butterfly_2.png','Assets/butterfly_3.png'],
      offsets: [{dx:0,dy:0},{dx:34,dy:-28},{dx:68,dy:-56}],
      bounce: [{period:900,phase:260,height:14},{period:1050,phase:600,height:16},{period:1180,phase:940,height:12}] },
    { id: 'fly', x: 0.84, y: 0.22, files: ['Assets/fly_1.png','Assets/fly_2.png','Assets/fly_3.png'],
      offsets: [{dx:0,dy:0},{dx:-34,dy:-28},{dx:-68,dy:-56}],
      bounce: [{period:860,phase:120,height:13},{period:1010,phase:480,height:15},{period:1160,phase:800,height:11}] },
    { id: 'dragonfly', x: 0.52, y: 0.58, files: ['Assets/dragonfly_1.png','Assets/dragonfly_2.png','Assets/dragonfly_3.png'],
      offsets: [{dx:0,dy:0},{dx:36,dy:26},{dx:72,dy:52}],
      bounce: [{period:940,phase:400,height:14},{period:1100,phase:150,height:16},{period:1280,phase:620,height:12}] },
  ],
  EXIT_X: 0.50,
  EXIT_Y: 0.17,
  EXIT_RADIUS: 40,
  N8N_WEBHOOK_URL: '',
  OPENAI_TTS_KEY: '',
  OPENAI_TTS_VOICE: 'echo',
};
```

### 26.2 `FINDIT_OBJECTS`

```javascript
const FINDIT_OBJECTS = [
  { key: 'ant',         maskColor: '#f54f37', textImg: 'ant_text.png',         found: false },
  { key: 'bee',         maskColor: '#521ef4', textImg: 'bee_text.png',         found: false },
  { key: 'butterfly',   maskColor: '#f363e9', textImg: 'butterfly_text.png',   found: false },
  { key: 'caterpillar', maskColor: '#fc82e7', textImg: 'caterpillar_text.png', found: false },
  { key: 'fly',         maskColor: '#1ef4ec', textImg: 'fly_text.png',         found: false },
  { key: 'grasshopper', maskColor: '#52a5f8', textImg: 'grasshopper_text.png', found: false },
  { key: 'ladybug',     maskColor: '#f3636f', textImg: 'ladybug_text.png',     found: false },
];
```

**Click detection:** Map click (x,y) on displayed image → scale to mask pixel coords → read RGBA → match `maskColor` with ±30 per channel tolerance → transparent or no match = wrong click.

### 26.3 `QUIZ_QUESTIONS`

```javascript
const QUIZ_QUESTIONS = [
  { q: 'I ________ my sister by telling her jokes.',                               img: 'cheer up.png', options: ['hum','cheer up','dip'],             answer: 'cheer up' },
  { q: 'I do not like it when my sister ________ about her good test scores.',     img: 'boast.png',    options: ['boasts','wraps','fields'],           answer: 'boasts'   },
  { q: 'I watched the cat slowly ________ under the bed.',                         img: 'creep.png',    options: ['save','dip','creep'],                answer: 'creep'    },
  { q: 'My mom ________ the presents with pretty paper.',                          img: 'wrap.png',     options: ['wraps','fancy','hums'],              answer: 'wraps'    },
  { q: 'The deer ran across the large ________ of grass.',                         img: 'field.png',    options: ['fancy','field','missing'],           answer: 'field'    },
  { q: 'I like to ________ along to the songs that I listen to.',                  img: 'hum.png',      options: ['hum','boast','save'],                answer: 'hum'      },
  { q: 'The girl looked for her ________ dog, but she could not find it.',         img: 'missing.png',  options: ['fancy','missing','wrap'],            answer: 'missing'  },
  { q: 'She wore a ________ dress and a pretty necklace.',                         img: 'fancy.png',    options: ['fancy','field','dip'],               answer: 'fancy'    },
  { q: 'The front of the boat ________ below the surface of the water.',           img: 'dip.png',      options: ['cheer ups','boasts','dips'],         answer: 'dips'     },
  { q: 'The superhero ________ many people from danger.',                          img: 'save.png',     options: ['saved','creeped','hummed'],          answer: 'saved'    },
];
```

Image path per question: `mission3_wordsiknow/question images/` + `q.img` (use `encodeURI`).

### 26.4 `ENDING_SLIDES`

```javascript
const ENDING_SLIDES = [
  'Assets/ending images/ending screen_1.png',
  'Assets/ending images/ending screen_2.png',
  // … through …
  'Assets/ending images/ending screen_13.png',
];
```

Slideshow: crossfade 250 ms, hold 250 ms per slide. Slide 13 shows above truck layer + `#ending-transition-message` + agent `LINES.endingScreenActivities`.

### 26.5 `loadAll()` — every preloaded path

```
Assets/background_main.png
Assets/background_enter2.png, enter3, enter4
Assets/background_exit1.png, exit2
Assets/background_overlay.png
Assets/speaking agent.png
Assets/collision_mask.png (+ cache bust)
Assets/collision_mask_entrance.png, collision_mask_exit.png
Assets/ending screen_transition.png
Assets/user2_front.png, user2_top.png  (blue)
Assets/user1_front.png, user1_top.png  (red — default)
Assets/user3_front.png, user3_top.png  (yellow)
Assets/mrgrasshopper_intro.png
Assets/mr.grasshopper_spritesheet.png
Assets/mrgrasshopper_ending.png
Assets/mission1_findit_token.png
Assets/mission2_readingchallenge_token.png
Assets/mission3_wordsiknow_token.png
All ZONE_DECOR pngs (9 ants/bees/butterflies)
All ENDING_DECOR pngs (15 insect sprites)
```

**Audio (not in loadAll — instantiated separately):**
```
Assets/sounds/background sounds.mp3  (loop, vol 0.22)
Assets/sounds/car stop.mp3
Assets/sounds/mrgrasshopper_intro sound.mp3
Assets/sounds/mrgrasshopper_ending_audio.mp3
Assets/sounds/mission complete sound.mp3
Assets/sounds/all missions complete.mp3
Assets/sounds/delivery complete.mp3
Assets/sounds/ending song.mp3  (loop, vol ~0.34)
```

**Mission assets (loaded on demand when modal opens):**
```
mission1_findit/images/insects.png
mission1_findit/images/findit_object location_mask.png
mission1_findit/images/*_text.png
mission2_readingchallenge/butterflystory.png
mission3_wordsiknow/question images/*.png
intro_video/R1_video.mp4  (HTML <video> src, not IMG preload)
```

### 26.6 Constants

```javascript
const DEFAULT_PLAYER_CAR = 'red';
const SESSION_ID = 'game-' + Math.random().toString(36).slice(2, 10);
const NEAR_ZONE_COOLDOWN = 8000;
const GHS_FRAME_W = 512;
const GHS_FRAME_COUNT = 7;
const MAP_GH_SEGMENT_MS = 720;
const MAP_GH_LAND_HOLD_MS = 140;
```

---

## 27. Code Implementation Blueprint

Build **one** `index.html` with three blocks: `<style>`, `<body>` (all screens), `<script>`.

### 27.1 HTML structure (required screens)

1. `#loading-screen` — title imgs, spinner, `#start-btn`
2. `#intro-video-screen` — heading, `<video id="intro-video">`, play overlay, continue btn
3. `#game-screen` — `#gameCanvas`, intro overlay, mission tracker, zone notif, mission modal, touch buttons
4. `#canvas-overlay` — fade tint during antagonist intro
5. `#pregame-continue-btn` — floating center button
6. `#grasshopper-intro` — antagonist 2-step popup (rename IDs when adapting)
7. `#grasshopper-ending` — transition antagonist popup
8. `#exit-gh-canvas` — full-screen hop animation
9. `#agent-hud` — chat panel + video frame (fixed top-right, z-index ~2100)
10. `#exit-combined-layer` — transition images + small antagonist
11. `#ending-bg-fade`, `#ending-decor-canvas`, `#exit-truck-layer`
12. `#ending-screen-gh-scene`, `#ending-corner-grasshopper`, `#ending-slide-13-layer`
13. `#carnival-screen` — dual `<img class="carnival-slide">` for crossfade slideshow
14. `#ending-unlock-popup`, `#ending-transition-message`

### 27.2 Script module order

1. `CONFIG`, `LINES`, `MISSION_CONTEXTS`, `FINDIT_OBJECTS`, `QUIZ_QUESTIONS`, `ENDING_SLIDES`
2. Sound helpers (`playCorrectSound`, `playFindItSound`, etc.)
3. `IMG` object + `loadImg()` + `loadAll()`
4. Game state variables + `zones` array (clone CONFIG.ZONES + `completed`, `tokenArrived`)
5. Mask cache: `initMask`, `swapMask`, `isPositionBlocked`
6. Entrance / pre-game: `startEntranceAnim`, `updateDriveToExit`, `showGrasshopperIntro`, `flyTokensToZones`, `setupIntroVideo`, `startGame`
7. Input: keydown/keyup, touch buttons, canvas click/tap for zones
8. Agent: `agentSay`, queue, TTS hook, `sendToN8n`, `primeMissionContext`, `primeIntroVideoContext`
9. Missions: `openMission`, `renderQuizQuestion`, `checkMissionComplete`, `closeMissionModal`, `completeMission`
10. Tokens: `collectToken`, `triggerTokenExitSequence`, `flyToken`
11. Ending: `showGameOver` chain, `startEndingSlideshow`, decor animation
12. Loop: `update`, `render`, `gameLoop`
13. `init()` on load; wire `#complete-mission-btn` click

### 27.3 `checkMissionComplete()` logic

```javascript
function checkMissionComplete() {
  if (STATE !== 'mission') return;
  let unlocked = false;
  switch (activeMissionId) {
    case 1: unlocked = FINDIT_OBJECTS.every(o => o.found); break;
    case 2: unlocked = missionChatCount >= 5; break;
    case 3: unlocked = quizAllAnswered; break;
    default: unlocked = true;
  }
  if (unlocked) {
    show #complete-mission-btn; hide #mission-locked-hint;
    // first unlock: optional agentSay for mission 1
  }
}
```

Call after: Find It tap, n8n chat response (`sendToN8n` finally), quiz Q10 done.

### 27.4 `completeMission()` flow

1. `zone.completed = true`
2. `closeMissionModal()` → STATE = `driving`
3. `playSFX(missionDone)`
4. If missions remain: `agentSay(LINES.missionDone)` + `collectToken(zone)`
5. If last mission: `collectToken` then `triggerTokenExitSequence()`

### 27.5 `openMission()` — Mission 1 HTML template

```html
<div class="findit-wrap">
  <img id="findit-img" class="findit-main-img" src="mission1_findit/images/insects.png">
  <div class="findit-text-overlays" id="findit-labels">
    <!-- per insect: -->
    <div class="findit-text-item" id="fi-ant">
      <img src="mission1_findit/images/ant_text.png">
    </div>
    <!-- … -->
  </div>
</div>
<p class="findit-progress" id="findit-progress">Found: 0 / 7</p>
```

CSS: `.findit-text-item` hidden by default; `.revealed` shows label with pop animation.

Mission 2: single `<img class="mission-img" src="mission2_readingchallenge/butterflystory.png">`.

Mission 3: rendered by `renderQuizQuestion()` — progress line, image, sentence, 3 buttons, feedback line.

Add class `modal-wide` to `.modal-box` for missions 1–3.

### 27.6 Find It mask authoring

1. Open scene PNG (e.g. `insects.png`) in image editor.
2. New layer: paint **unique solid color** over each clickable object (colors in Section 26.2).
3. Export **only that layer** as PNG with transparency elsewhere.
4. **Must match scene pixel dimensions exactly.**
5. Filename example: `findit_object location_mask.png` (space in name — use `encodeURI`).

### 27.7 Map collision mask authoring

1. Same dimensions as `background_main.png`.
2. Opaque paint = blocked (buildings, water, off-path).
3. Transparent = drivable paths.
4. Separate masks for entrance (hole at bottom) and exit (hole at top ~50% x, ~17% y).

### 27.8 Google Fonts (in `<head>`)

```html
<link href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet">
```

`<title>Fly High: Lesson 1</title>` — change per lesson.

---

## 28. Timing & Animation Reference

| Event | Duration / delay |
|-------|------------------|
| Title overlay | 3000 ms |
| Entrance map frame | 600 ms each (main→enter2→enter3→drive→enter4→main) |
| Intro drive target | `START_Y * canvas.height` |
| Pre-game exit bounce | spring: vel *= 0.6, stiffness 0.2 |
| Pause before GH popup | 1500 ms |
| GH popup fade out | 700 ms |
| Token fly to zone | 1100 ms, stagger 220 ms |
| Pre-game Continue delay | 1400 ms after grasshopper exit |
| Intro video Continue after end | 4000 ms |
| Near-zone agent cooldown | 8000 ms |
| Token pop before HUD fly | 1600 ms |
| HUD token fly | 650 ms |
| Exit sequence delay before gate tokens | 2000 + 2200 ms |
| Gate token fly | 950 ms, stagger 180 ms |
| Exit bg swap | 1000 ms then exit2 at +700 ms |
| Game over canvas push | 1700 ms |
| Transition pause | 700 ms |
| GH ending scene delay | 1000 ms |
| Ending slideshow fade/hold | 250 ms / 250 ms |
| Quiz correct advance | 1400 ms |
| Quiz wrong advance | 1800 ms |
| Agent default message display | 5500 ms (`agentSay` ms arg overrides) |

**Grasshopper spritesheet:** 7 frames × 512 px; `GHS_FRAME_W = 512`. Rotate -90° when drawn on map exit.

**Token fly default:** 900 ms, `cubic-bezier(0.4,0,0.2,1)`, scale to 0.55, fade last 35%.

---

## 29. Adaptation Quick-Map (When Building Lesson 2+)

| Keep unchanged (engine) | Rewrite per lesson |
|-------------------------|-------------------|
| State machine beats (Section 4) | All `LINES`, `MISSION_CONTEXTS`, HTML headlines |
| Driving physics, collision, canvas loop | Map, overlay, masks, entrance/exit PNGs |
| Mission **formats** (find / read / quiz) | Mission **content** (images, story, questions) |
| Reward fly, HUD slots, exit unlock code | Reward artwork, zone names/positions |
| Agent HUD + TTS + n8n wire protocol | Intro video MP4 + primeIntroVideo string |
| `checkMissionComplete` gate **types** | Count of zones/missions if not 3 |
| n8n JSON shape `{ chatInput, sessionId }` | n8n AI system prompt lesson title/EQ |
| Module Map unlock ending beat | Module Goal + Prelesson Goal copy |

**Minimum asset set for a new lesson:** `index.html`, map PNGs (main + overlay + enter/exit frames), 3 collision masks, 3 mission reward icons, quest/villain popup art (if used), PolyPal avatar, player vehicle/non-humanoid sprites, 3 mission content folders, intro video (optional), ending slides + Module Map unlock art, sounds (can reuse or replace).

---

## 30. Document Index

| Section | Contents |
|---------|----------|
| 1 | Game concept — template vs Lesson 1 |
| 2 | Narrative adaptation guide |
| 3–6 | Architecture, flow, state, controls, zones |
| 7–8 | Mission activities (full Lesson 1 content) |
| 9 | PolyPal + n8n |
| 10–18 | Collision, render, vehicle, assets, DOM, colors, functions, tokens, antagonist anim |
| 19–23 | CONFIG pointer, run instructions, checklists, file tree |
| 24 | **All local script & UI copy** |
| 25 | **All n8n payload strings** |
| 26 | **Full CONFIG + data arrays + load list** |
| 27 | **Implementation blueprint** |
| 28 | **Timings** |
| 29 | **Adaptation quick-map** |
| 30 | This index |

---

*End of specification — self-contained. Build or adapt Fly High prelesson games using only this document.*
