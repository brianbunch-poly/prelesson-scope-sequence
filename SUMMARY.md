# Scope & Sequence — Prelesson Game Planning Brief

> **v5 update:** See `AGENT_INSTRUCTIONS.md` §0 for current quest narrative format, popup assets (`pregame_popup` / `postgame_popup`), mission labels, and regeneration workflow. Section 2.9 below reflects the v5 asset model.

> **Purpose of this document:** Tell a future agent exactly how to read the curriculum, understand the sample game, and produce a complete Excel scope-and-sequence file with detailed prelesson-app plans for **every lesson at every level**.

> **This is preparation only.** No games are built from this file. This file is the instruction set for the Excel-planning agent.

---

## 1. Project Overview

### What we are building (eventually)

A **browser-based prelesson game** for each lesson in our ESL curriculum. South Korean students in **1st–3rd grade** play at **home on our online platform** before coming to class. The game is a short, playful **on-ramp** — not the main lesson.

### What the future agent must deliver now

One **Excel workbook** (`.xlsx`) containing a detailed creative and production plan for every prelesson app. Each row = one lesson instance for one **level code** (see Section 3). The plan must be specific enough that a separate build agent could later create `index.html`, assets, and n8n prompts from that row alone.

### Source files in this folder

| File | Role |
|------|------|
| `wonders_lessons.md` | **Curriculum source of truth** — essential questions, vocabulary, support/challenge words, and full story texts for every lesson |
| `SAMPLE_APP.md` | **Game template source of truth** — complete specification for the Fly High prelesson game (Lesson 1: insects / farm / Mr. Grasshopper). Read **entirely** before planning any lesson |
| `SUMMARY.md` | **This file** — instructions for the Excel-planning agent |

---

## 2. The Sample Game — What Must Be Understood

The future agent must read `SAMPLE_APP.md` thoroughly. Below is a condensed reference; the full spec in `SAMPLE_APP.md` overrides this summary if anything conflicts.

### 2.1 Product shape

- Single-file `index.html` (inline CSS + vanilla JS), plus asset folders
- ~3rd-grade reading level; short PolyPal sentences (1–3 lines)
- **PolyPal** HUD (video-chat style tutor): TTS, optional n8n chat, mic STT
- Student completes the game at home; ending **unlocks the Module Map** and bridges to **in-class games** at Poly School (does not fully resolve the module goal)

### 2.2 Two-tier goal structure (every lesson must define both)

Every prelesson game has **two connected goals**:

| Goal layer | Scope | Resolved when? | Example (Lesson 1) |
|------------|-------|----------------|---------------------|
| **Module Goal** | The **overall narrative arc** across the whole lesson module — prelesson + Module Map games in class | **Not** in the prelesson alone — students continue on the Module Map in class | Stop Mr. Grasshopper from making all the insects hop |
| **Prelesson Goal** | What the student achieves **in this one home game** by finishing all 3 missions | **Yes** — end of prelesson | Unlock the farm gate and reach the Module Map |

The prelesson **starts** the Module Goal. The student **completes** the Prelesson Goal. Class activities on the **Module Map** continue the Module Goal through additional games.

**Non-villain example (hypothetical — Community Helpers):**
- **Module Goal:** Get the neighborhood ready for the big community fair
- **Prelesson Goal:** Collect three helper badges and open the community center door to unlock the Module Map

**Villain example (Lesson 1):**
- **Module Goal:** Stop Mr. Grasshopper from making all the insects hop
- **Prelesson Goal:** Find three farm tokens, unlock the gate, and reach the Module Map

### 2.3 Fixed game structure (do not change across lessons)

Every adapted lesson keeps the **same beats**. Narrative dressing is flexible; the sequence is not.

```
Load → Tap to Start → Title card → Map entrance animation
→ Pre-game drive toward exit/Module Map → Quest reveal (2 steps; villain optional)
→ Mission rewards deploy to zones → Intro video
→ Free exploration on map → 3 missions → Earn one reward per mission
→ Prelesson goal completes (exit/gate opens) → Reach Module Map
→ Ending sequence → Slideshow → Module Map unlock + class CTA
```

> **Villain is optional.** If there is no antagonist, the 2-step pre-game beat becomes a **problem/quest reveal** (what's wrong or what needs doing → what the student must complete). The code slot used for antagonist popups in Lesson 1 can hold any quest framing.

> **Mission rewards are flexible.** Lesson 1 uses three **tokens**, but other lessons may use keys, badges, power cells, map pieces, seeds, or any thematic collectible. The engine still tracks **one reward per mission** in HUD slots — only the story name and art change.

### 2.4 Swappable content (changes every lesson)

| Narrative role | What it does | Lesson 1 example |
|----------------|--------------|------------------|
| **Setting / map** | Explorable world with landmarks | Farm / orchard |
| **Player avatar** | Student moves through the world (vehicle or non-humanoid only) | Orange delivery truck |
| **Antagonist** *(optional)* | Creates stakes when a villain fits the topic | Mr. Grasshopper |
| **Problem / quest** *(required)* | Explains why missions exist — with or without a villain | Grasshopper's hopping curse / stolen tokens |
| **Mission rewards** | Progress collectibles (1 per mission, typically 3) | 3 farm tokens |
| **Mission zones** | Map anchors linking place → activity | Ant hill, beehive, butterfly tree |
| **PolyPal** | Tutor + companion in video-chat HUD; TTS, n8n chat, mission guidance | PolyPal in HUD |
| **Intro video** | Unit hook before gameplay | `R1_video.mp4` |
| **Essential question** | Thread through PolyPal lines and Module Map arc | What insects do you know? How are they alike and different? |
| **Prelesson exit** | Physical goal of the home game; opens when all rewards collected | Top farm gate |
| **Module Map unlock** | End payoff — student earned access to in-class game hub | Module Map revealed at ending |
| **Ending slideshow** | Teases Module Map games and class continuation | 13 slides + Poly School CTA |

### 2.5 Narrative formulas (pick the pattern that fits)

**With villain:**
> **Module Goal:** Stop [antagonist] from [bad outcome tied to EQ].
> **Prelesson Goal:** Complete 3 missions about [topic] to recover [rewards], unlock [exit], and reach the Module Map.

**Without villain:**
> **Module Goal:** [Achieve something important tied to EQ — e.g., restore balance, prepare for event, solve community problem].
> **Prelesson Goal:** Complete 3 missions about [topic] to collect [rewards], unlock [exit], and reach the Module Map.

**Lesson 1 example:**
> **Module Goal:** Stop Mr. Grasshopper from making all the insects hop.
> **Prelesson Goal:** Complete 3 insect missions, collect the farm tokens, unlock the gate, and reach the Module Map.

### 2.6 Three mission formats (fixed mechanics, swappable content)

| Mission | Format | Completion gate | Lesson 1 content |
|---------|--------|-----------------|------------------|
| **Mission 1 — Find It!** | Visual search: tap all items in a scene | All hotspots found | Find 7 insects in scene image |
| **Mission 2 — Reading Challenge!** | Read-aloud story to PolyPal (4 parts, ~5 chat turns) | `missionChatCount >= 5` | Original short caterpillar → butterfly story |
| **Mission 3 — Words I Know!** | 10-question fill-in-blank vocab quiz with images | All questions answered | Unit vocabulary words |

**Pedagogical rule:** Mission content must **practice what the main lesson teaches** — not random trivia.
- Mission 1 = recognize / discriminate (visual identification tied to topic/vocab)
- Mission 2 = fluency / comprehension (guided reading of an **original** story)
- Mission 3 = vocabulary / concept check (unit word list from curriculum)

### 2.7 Mission 2 — Original story rule (critical)

**Mission 2 does NOT use the textbook stories from `wonders_lessons.md`.**

The future agent must **write a new, original short story** for every lesson that is:
- **Inspired by** the lesson topic, essential question, and vocabulary themes
- **Short and simple** — 4 parts, read aloud to PolyPal
- **Age- and level-appropriate** for the row's grade band (see Section 7)
- Thematically related to the lesson, but **not a retelling** of Story 1 or Story 2 from the textbook

Use `wonders_lessons.md` stories only as **context** — to understand tone, topic, and what students will see in class. Do not copy or paraphrase textbook passages into Mission 2.

**Lesson 1 example:** The sample game's caterpillar-to-butterfly story is an **original** insect life-cycle tale. It is *not* the textbook story "Creep Low, Fly High."

### 2.8 Text layers the build agent will rewrite per lesson

From `SAMPLE_APP.md` Sections 2.5, 24, 25:
- `LINES` — all local PolyPal speech
- `MISSION_CONTEXTS` — n8n prompts for intro video + each mission
- HTML overlay headlines (antagonist intro, ending CTA)
- Zone names and mission modal descriptions
- `FINDIT_OBJECTS`, reading story parts, `QUIZ_QUESTIONS`

### 2.9 Asset categories per lesson (v5 production model)

The Excel plan and `build_asset_manifest()` in `generate_scope_sequence.py` list assets per lesson. **`SAMPLE_APP.md` Section 13** documents the original Lesson 1 template (split popups); **v5 production uses the simplified popup model below** (see also `AGENT_INSTRUCTIONS.md` §0.4).

**Core map & game**
- `bg_main.webp`, `bg_overlay.webp`
- Entrance frames (`bg_enter_02/03/04.webp`)
- Exit frames (`bg_exit_01/02.webp`)
- 3 collision masks (main, entrance, exit)
- `player_vehicle.webp` in `quest/` (top-down vehicle or non-humanoid — required)
- 3 mission reward icons from `reward_desc` (listed in `M1_Assets`, `M2_Assets`, `M3_Assets`)
- `game_title.webp`, `game_subtitle.webp` (Title Screen Assets)
- `bg_ending_transition.webp`, `bg_ending_main.webp`, `bg_ending_1` … `bg_ending_N.webp`

**Quest popups & player** *(every lesson — in `quest/` folder)*
- `player_vehicle.webp` — top-down player vehicle sprite
- `pregame_popup.webp` — combined pre-game popup art
- `postgame_popup.webp` — mission-complete popup + Module Map handoff (antagonist taunt baked in if present)
- `pregame_popup_audio.mp3`, `postgame_popup_audio.mp3`

**Ending scene** *(after player exits through gate — see `AGENT_INSTRUCTIONS.md` §0.5)*
- `bg_ending_transition.webp` — push layer as player leaves game map
- `bg_ending_main.webp` — full Module Map (all modules visible)
- `bg_ending_1.webp` … `bg_ending_N.webp` — sequential overlays; each covers one more module with lesson-themed layer (leaves, clouds, etc.); **N = 16** (GT1/GT2) or **14** (GT3/MGT)
- `ending_song.mp3` — music during cover-up sequence

**Character / antagonist** *(only when `antagonist` is set)*
- `[slug]_spritesheet.webp` — hop/exit map animation only
- Character visuals for pre/post popups are baked into `pregame_popup.webp` / `postgame_popup.webp`

**Removed in v5** (do not plan these):
- `popup_step1/2.webp`, `speech_bubble_01/02.webp`
- `[character]_intro.webp`, `_intro_speech_01/02.webp`, `_ending.webp`, `_ending_speech.webp`
- `[character]_intro.mp3`, `[character]_ending.mp3`
- `screen_base`, `screen_transition`, `slideshow_##` (renamed to `bg_ending_*`)

**Ambient decor** (optional per lesson)
- Map sprites (e.g. `ant.webp`, `bee.webp`, `butterfly.webp` on Fly High L1; `tribal_person.webp` on L7 tribal village)
- Ending screen decor sprites

**Mission 1** — Find It / What's Missing / Memory Match (per level)
- Scene, mask/cards, per-item art, plus `reward_m1_*.webp`

**Mission 2 — Reading Challenge**
- `story_4panel.webp`, plus `reward_m2_*.webp`

**Mission 3 — Words I Know**
- 10 `quiz_[word].webp` illustrations, plus `reward_m3_*.webp`

**Intro video**
- `intro.mp4`

**Other audio**
- `bg_music.mp3`, `vehicle_stop.mp3`, `mission_complete.mp3`, `all_missions_complete.mp3`, `exit_unlock.mp3`, `ending_song.mp3`

---

## 3. Curriculum Structure — Levels & Lessons

### 3.1 Audience

- **Students:** South Korean 1st–3rd grade ESL learners
- **Context:** At-home prelesson on online platform → in-class lesson at Poly School
- **Textbooks extracted in `wonders_lessons.md`:** McGraw-Hill Fly High (G1), All Aboard (G2), Set Sail (G2), Into the Horizon (G3)

### 3.2 Level codes (11 levels)

| Level | Approx. grade | Textbook units covered | Lesson count |
|-------|---------------|------------------------|--------------|
| **GT1-1** | 1st grade | Fly High Units 1–2, Lessons 1–8 | 8 |
| **GT1-2** | 1st grade | Fly High Unit 3 (L9–12) + All Aboard Unit 1 (L1–4) | 12 |
| **MGT1-1** | 1st grade (modified) | Same content as GT1-2 | 12 |
| **GT2-1** | 2nd grade | All Aboard Units 2–3, Lessons 5–12 | 8 |
| **MGT1-2** | 1st grade modified / bridge | Same content as GT2-1 | 8 |
| **GT2-2** | 2nd grade | Set Sail Units 1–2, Lessons 1–8 | 8 |
| **MGT2-1** | 2nd grade (modified) | Same content as GT2-2 | 8 |
| **GT3-1** | 3rd grade | Set Sail Unit 3 (L9–12) + Into the Horizon Unit 1 (L1–4) | 12 |
| **MGT2-2** | 2nd grade modified / bridge | Same content as GT3-1 | 12 |
| **GT3-2** | 3rd grade | Into the Horizon Units 2–3, Lessons 5–12 | 8 |
| **MGT3-1** | 3rd grade (modified) | Same content as GT3-2 | 8 |

**Total Excel rows: 104** (one row per level × lesson instance).

> **Shared content rule (GT / MGT pairs):** When two levels share the same lesson text (e.g. GT1-2 and MGT1-1 both use "Lesson 9: My Helpers"), the **prelesson game plan must be identical** — same narrative, missions, PolyPal copy, assets, and difficulty. Do **not** scaffold or simplify MGT rows differently from their GT partner. The Excel still needs **separate rows** per level (104 total), but MGT rows should duplicate the GT partner's plan. Use `Depends_On_Row` on the MGT row to point at the GT row it mirrors (e.g. `MGT1-1_L09` → `GT1-2_L09`).

### 3.3 Lesson inventory (48 unique curriculum lessons)

Each lesson in `wonders_lessons.md` follows this structure:

```
### Lesson N: [Title] — [Level tag(s)]

#### Essential Question
#### Vocabulary (10 words typical)
#### Support Words
#### Challenge Words
#### Story 1: [Title] (Genre, full text)
#### Story 2: [Title] (Genre, full text)
```

**Complete lesson list by textbook:**

| Textbook | Unit | Lessons | Level tags |
|----------|------|---------|------------|
| G1 Fly High | 1 | L1 Bug Me! – L4 Night and Day | GT1-1 |
| G1 Fly High | 2 | L5 A New Idea – L8 Make It Happen! | GT1-1 |
| G1 Fly High | 3 | L9 My Helpers – L12 Red, White, and Blue | GT1-2, MGT1-1 |
| G2 All Aboard | 1 | L1 Friends Help Each Other – L4 Caring for Animals | GT1-2, MGT1-1 |
| G2 All Aboard | 2 | L5 Animal Survival – L8 Animal Babies and Parents | GT2-1, MGT1-2 |
| G2 All Aboard | 3 | L9 The Earth Affects Us – L12 Weather Affects Us | GT2-1, MGT1-2 |
| G2 Set Sail | 1 | L1 New Places – L4 Stories About Nature | GT2-2, MGT2-1 |
| G2 Set Sail | 2 | L5 Good Citizens – L8 Rules | GT2-2, MGT2-1 |
| G2 Set Sail | 3 | L9 Plant Myths – L12 Money | GT3-1, MGT2-2 |
| G3 Into the Horizon | 1 | L1 Read and Learn – L4 Inventing Something New | GT3-1, MGT2-2 |
| G3 Into the Horizon | 2 | L5 Working Together – L8 Saving Animals | GT3-2, MGT3-1 |
| G3 Into the Horizon | 3 | L9 Special Qualities – L12 Ideas From Nature | GT3-2, MGT3-1 |

### 3.4 How to read a lesson from `wonders_lessons.md`

For each row in the Excel, the agent must extract:

1. **Level code** — from the lesson header tag (e.g. `GT1-1`)
2. **Global lesson number** — sequential number within that level's sequence (1–8 or 1–12)
3. **Textbook lesson title** — e.g. "Bug Me!"
4. **Textbook / unit** — e.g. "G1 Fly High Unit 1"
5. **Essential question** — verbatim from `#### Essential Question`
6. **Vocabulary list** — all 10 (or available) words with definitions; these feed Mission 3
7. **Support words** — optional extras for agent hints or Find It objects
8. **Challenge words** — optional extras for agent hints or harder quiz distractors
9. **Story 1 & Story 2** — **context only** for understanding lesson themes; **do not** use as Mission 2 text (see Section 2.7)

**What textbook stories are for:**
- Understanding what students will read in the main lesson
- Informing the **topic inspiration** for Mission 2's original story
- Suggesting Find It objects, villain motives, or Module Goal ideas

**What textbook stories are NOT for:**
- Mission 2 read-aloud text (always write an original 4-part story)
- Direct copying into quiz sentences unless using vocabulary words properly in new sentences

---

## 4. Excel Deliverable Specification

### 4.1 Workbook structure

Create one `.xlsx` file named:

```
Prelesson_Game_Scope_Sequence.xlsx
```

**Recommended sheets:**

| Sheet name | Contents |
|------------|----------|
| `Master_Plan` | All 104 rows — primary working sheet |
| `GT_Levels` | Filtered view: GT1-1 through GT3-2 |
| `MGT_Levels` | Filtered view: MGT1-1 through MGT3-1 |
| `Asset_Summary` | Pivot/count of unique assets across all lessons |
| `Shared_Lessons` | GT/MGT pairs that share identical game plans — verify MGT row matches GT partner |
| `README` | Column definitions, workflow, quality checklist |

Alternatively, a single `Master_Plan` sheet with filters is acceptable if all 104 rows are present.

### 4.2 Required columns (Master_Plan sheet)

Every column below must be filled for every row. Use wrapped text cells for long content.

#### A. Identification

| Column | Description | Example |
|--------|-------------|---------|
| `Row_ID` | Unique ID | `GT1-1_L01` |
| `Level` | Level code | `GT1-1` |
| `Grade` | US grade equivalent | `1` |
| `Level_Type` | `GT` or `MGT` | `GT` |
| `Seq_Lesson_Num` | Lesson number within this level (1–12) | `1` |
| `Textbook` | Source book | `G1 Fly High` |
| `Unit` | Unit number and name | `Unit 1` |
| `Lesson_Title` | From wonders_lessons.md | `Bug Me!` |
| `Game_Title` | Branded in-game title | `Fly High: Lesson 1` |
| `Curriculum_Lesson_Key` | Cross-level content key | `FH_U1_L1` |

#### B. Pedagogical purpose

| Column | Description |
|--------|-------------|
| `Essential_Question` | Verbatim from curriculum |
| `Game_Purpose` | 2–4 sentences: what the prelesson achieves before class |
| `Learning_Objectives` | 3 bullet points aligned to missions |
| `In_Class_Bridge` | How Module Map games in class continue the Module Goal |
| `Vocabulary_Words` | Comma-separated list (all unit vocab) |
| `Support_Words` | Comma-separated |
| `Challenge_Words` | Comma-separated |
| `Missing_Source_Data` | **Required.** List any missing or incomplete curriculum data from `wonders_lessons.md` (e.g. fragmented Story 1, missing vocab definitions, `_Not found_` genre, OCR gaps). Use `None` if source is complete. Do not invent missing data — flag it here for the user to fill in later. |

#### C. Narrative design

| Column | Description |
|--------|-------------|
| `Module_Goal` | Overall narrative arc across prelesson + Module Map (may extend beyond this class session) |
| `Prelesson_Goal` | What student achieves in the home game by completing 3 missions |
| `Has_Antagonist` | `Yes` or `No` |
| `One_Sentence_Quest` | Kid-friendly summary of the prelesson quest (Section 2.5) |
| `Setting_Location` | Map theme / place |
| `Setting_Description` | Visual tone, landmarks, color palette notes |
| `Player_Avatar` | **Required:** vehicle or other **non-humanoid** avatar the student drives/controls (truck, boat, rover, submarine, etc.). No humanoid characters — student talks to PolyPal instead of controlling a person. |
| `Antagonist_Name` | Villain name, or `N/A` if no villain |
| `Antagonist_Motivation` | Why the villain blocks progress; link to EQ; or `N/A` |
| `Problem_Or_Quest` | The conflict or need driving missions (required even without a villain) |
| `Quest_Intro_Step1` | Pre-game popup 1 headline + agent line (problem/goal reveal) |
| `Quest_Intro_Step2` | Pre-game popup 2 headline + agent line (what student must do) |
| `Mission_Reward_Name` | What collectibles are called (tokens, keys, badges, etc.) |
| `Mission_Reward_Count` | Usually `3` |
| `Mission_Reward_Description` | Visual concept per reward (one unique icon per mission) |
| `Prelesson_Exit_Description` | Gate, door, portal, dock — what unlocks when all rewards collected |
| `Module_Map_Unlock` | How the ending reveals/unlocks the Module Map; what student sees |
| `Module_Map_Class_Goal` | What students will work toward in Module Map games during class |
| `Ending_Beat` | Transition moment (villain farewell, celebration, etc.); optional if no villain |
| `Ending_Slideshow_Theme` | 10–13 slide arc bridging to Module Map |
| `Ending_CTA_Text` | Final message: Module Map unlocked + continue in class |

#### D. Intro video

| Column | Description |
|--------|-------------|
| `Video_Topic` | Subject of the intro video |
| `Video_Purpose` | Why student watches before playing |
| `Video_Content_Summary` | Scene-by-scene or topic outline (30–90 sec) |
| `Video_Connection_To_Missions` | What clues or context the video provides |
| `Video_Source_Notes` | Original / licensed / needs production / stock |

#### E. Mission 1 — Find It!

| Column | Description |
|--------|-------------|
| `M1_Zone_Name` | Activity label: `Find It!`, `What's Missing?`, or `Memory Match` (by level) |
| `M1_Zone_Landmark` | Map location (e.g. "Ant hill", "Flower garden") |
| `M1_Zone_X` | Suggested map position fraction 0.0–1.0 (optional) |
| `M1_Zone_Y` | Suggested map position fraction |
| `M1_Activity_Description` | What student does |
| `M1_Scene_Concept` | Find It image description for artist |
| `M1_Objects_To_Find` | List every findable item (5–10 items) |
| `M1_Object_Labels` | English label per object |
| `M1_Curriculum_Alignment` | Which vocab/EQ/story content this practices |

#### F. Mission 2 — Reading Challenge

| Column | Description |
|--------|-------------|
| `M2_Zone_Name` | `Reading Challenge` |
| `M2_Zone_Landmark` | Map location description |
| `M2_Zone_X` | Optional position fraction |
| `M2_Zone_Y` | Optional position fraction |
| `M2_Story_Type` | Always `Original` — inspired by lesson topic, not from textbook |
| `M2_Story_Title` | Title of the new original story |
| `M2_Story_Inspiration` | Which lesson themes/EQ/vocab inspired this story |
| `M2_Story_Genre` | Fiction / Informational (fiction preferred for read-aloud) |
| `M2_Part_1` | Read-aloud text part 1 |
| `M2_Part_2` | Read-aloud text part 2 |
| `M2_Part_3` | Read-aloud text part 3 |
| `M2_Part_4` | Read-aloud text part 4 |
| `M2_Illustration_Concept` | Description for story image artist |
| `M2_Agent_Conversation_Flow` | Step-by-step agent prompts |
| `M2_Curriculum_Alignment` | EQ / comprehension skill targeted |

#### G. Mission 3 — Words I Know

| Column | Description |
|--------|-------------|
| `M3_Zone_Name` | `Words I Know` |
| `M3_Zone_Landmark` | Map location description |
| `M3_Zone_X` | Optional position fraction |
| `M3_Zone_Y` | Optional position fraction |
| `M3_Quiz_Question_Count` | Usually `10` |
| `M3_Q1` through `M3_Q10` | Each cell: `Sentence | choice1, choice2, choice3 | correct_answer` |
| `M3_Illustration_Notes` | Image needed per question word |
| `M3_Curriculum_Alignment` | Vocabulary skill targeted |

> **Tip:** If 10 question columns make the sheet too wide, use one `M3_All_Questions` column with numbered list format instead. Every question must still be present.

#### H. PolyPal copy

| Column | Description |
|--------|-------------|
| `Agent_Welcome_Line` | Loading screen welcome |
| `Agent_Gameplay_Start` | Line after intro video |
| `Agent_Near_Zone_Examples` | 2–3 example proximity lines |
| `Agent_Mission_Done_Examples` | Progress encouragement lines |
| `Agent_Exit_Unlocked` | All rewards collected / prelesson goal achieved line |
| `Agent_Module_Map_Line` | Module Map unlock announcement |
| `Agent_Ending_Line` | Final class-bridge line |
| `N8N_Intro_Video_Prompt` | Full MISSION CONTEXT string for intro video |
| `N8N_M1_Prompt` | Full MISSION CONTEXT for Mission 1 |
| `N8N_M2_Prompt` | Full MISSION CONTEXT for Mission 2 |
| `N8N_M3_Prompt` | Full MISSION CONTEXT for Mission 3 |

Follow format and rules from `SAMPLE_APP.md` Section 25. All n8n prompts must identify the tutor as **PolyPal** (e.g. `You are PolyPal in…`).

#### I. Assets

| Column | Description |
|--------|-------------|
| `Title_Screen_Assets` | List: `game_title.webp`, `game_subtitle.webp` (loading / branding) |
| `Map_Assets` | List: backgrounds, overlays, enter/exit frames, collision masks, lesson map sprites |
| `Quest_Assets` | `player_vehicle.webp`, `pregame_popup.webp`, `postgame_popup.webp` |
| `Antagonist_Assets` | `[slug]_spritesheet.webp` when character present; otherwise `N/A` |
| `M1_Assets` | Mission 1 scene/items **plus** `reward_m1_*.webp` |
| `M2_Assets` | `story_4panel.webp` **plus** `reward_m2_*.webp` |
| `M3_Assets` | Quiz question images **plus** `reward_m3_*.webp` |
| `Ending_Assets` | `bg_ending_transition`, `bg_ending_main`, `bg_ending_1`…`N` (Module Map reveal + cover-up overlays) |
| `Video_Assets` | Intro MP4 filename |
| `Audio_Assets` | `bg_music`, mission/exit stings, `ending_song`, `pregame_popup_audio`, `postgame_popup_audio` |
| `Asset_Count_Total` | Numeric estimate |
| `Reuse_From_Template` | Which SAMPLE_APP assets can be reused unchanged |
| `New_Assets_Required` | Count of lesson-specific new art/audio/video |

#### J. Production metadata

| Column | Description |
|--------|-------------|
| `Status` | `Planned` / `Needs Review` / `Ready for Build` |
| `Complexity` | `Low` / `Medium` / `High` |
| `Build_Estimate_Hours` | Rough dev + asset time |
| `Notes` | Cultural context for Korea, production flags, other comments |
| `Depends_On_Row` | For MGT rows sharing a GT partner: GT `Row_ID` this plan duplicates (e.g. `GT1-2_L09`). `N/A` for GT rows and GT1-1 (no partner). |
| `Sample_App_Reference` | Which SAMPLE_APP.md sections apply |

---

## 5. Step-by-Step Workflow for the Future Agent

For **each of the 104 rows**, execute this workflow in order:

### Step 1 — Load lesson data

1. Open `wonders_lessons.md`
2. Find the lesson matching this row's `Level` and `Seq_Lesson_Num` using Section 3 tables
3. Copy essential question, all vocabulary, support/challenge words, both stories
4. Fill `Missing_Source_Data`: note anything absent, fragmented, or unreliable in the source (see Section 9). Do not guess or invent missing curriculum text.

### Step 2 — Define pedagogical frame

1. Write `Game_Purpose`: what should the student know, recognize, or wonder **before class**?
2. Write **`Module_Goal`**: the extended narrative students continue on the Module Map in class
3. Write **`Prelesson_Goal`**: what the home game alone achieves (complete 3 missions → unlock exit → reach Module Map)
4. Choose `In_Class_Bridge`: prelesson **starts** the Module Goal; Module Map games in class **continue** it (never full resolution at home)

### Step 3 — Design narrative skin (topic → EQ → module goal → prelesson goal → setting)

Work in this order:

1. **Essential question** — already from curriculum
2. **Module Goal** — what students work toward across prelesson + Module Map
3. **Decide: villain or no villain?** — antagonist is optional; problem/quest is required
4. **Prelesson Goal** — what 3 missions unlock (exit + Module Map access)
5. **Setting** — where the quest naturally lives
6. **Mission rewards** — thematic collectibles (not always tokens)
7. **Player avatar** — **vehicle or non-humanoid only** (truck, boat, rover, etc.); must fit setting; no humanoid characters

**Anti-patterns to avoid:**
- Reusing Mr. Grasshopper / farm for non-insect lessons
- Forcing a villain when the topic fits a non-villain quest better
- Missions unrelated to essential question or vocabulary
- Resolving the Module Goal entirely in the prelesson

### Step 4 — Plan intro video

1. Define `Video_Topic` tied to unit hook or phenomenon
2. Video plays **after** quest reveal, **before** free exploration
3. Agent script says watch first — may contain clues (per SAMPLE_APP.md)
4. Specify whether video is new production, adapted stock, or repurposed curriculum media

### Step 5 — Plan Mission 1 (Find It!)

1. Choose 5–10 visual targets from lesson topic (vocab objects, topic icons, setting elements)
2. Scene must match `Setting_Location`
3. Each object needs: English label, mask color (note for artist), curriculum tie-in
4. Zone name should hint at activity + topic (e.g. "Bug Hunt!", "Helper Spot!")

### Step 6 — Plan Mission 2 (Reading Challenge)

1. **Write an original 4-part story** inspired by the lesson topic — do NOT use textbook Story 1 or Story 2
2. Keep parts short and level-appropriate (see Section 7)
3. Write `M2_Story_Inspiration`: which EQ/vocab/topic elements shaped the story
4. Write `M2_Illustration_Concept`: one image with 4 numbered panels
5. Draft full `N8N_M2_Prompt` with conversation flow (opening → Part 1–4 → "Did you like the story?" → close)

### Step 7 — Plan Mission 3 (Words I Know)

1. Build 10 fill-in-blank sentences using **unit vocabulary** from `wonders_lessons.md`
2. Each question: sentence with blank, 3 choices, 1 correct answer, illustration concept
3. Distractors should be other unit vocab words when possible
4. If vocab is incomplete in source, note gaps in `Missing_Source_Data` and use only confirmed words

### Step 8 — Write PolyPal copy

1. All `LINES`-style strings: short, encouraging, 1st–3rd grade appropriate
2. No farm/insect wording unless topic requires it
3. Write all 4 `N8N_*_Prompt` blocks following SAMPLE_APP.md Section 25 format
4. PolyPal must not give away Find It coordinates or quiz answers

### Step 9 — Plan ending and Module Map unlock

1. `Module_Map_Unlock`: describe the visual/narrative moment the student earns access to the Module Map
2. `Module_Map_Class_Goal`: restate what Module Map games will continue toward in class
3. `Ending_Slideshow_Theme`: ~13 slides teasing Module Map activities (not full Module Goal resolution)
4. `Ending_CTA_Text`: Module Map is unlocked — continue the adventure in class at Poly School
5. Optional `Ending_Beat` if lesson uses a villain

### Step 10 — Inventory assets

1. List every file the build agent would need (Section 2.9 categories)
2. Mark `Reuse_From_Template` where generic sounds/UI/PolyPal avatar carry over
3. Count `New_Assets_Required`
4. Zone positions: suggest x/y fractions for artist/developer calibration

### Step 11 — GT / MGT duplicate rows (when applicable)

When the row is **MGT** and shares curriculum with a **GT** partner:

1. Fill `Depends_On_Row` with the GT partner's `Row_ID`
2. Copy the **identical** game plan from the GT row — narrative, missions, PolyPal copy, assets, counts, and difficulty
3. Only change identification columns (`Row_ID`, `Level`, `Level_Type`, `Grade`)

GT1-1 has no GT/MGT partner — plan independently.

### Step 12 — Quality check before marking row complete

Use the checklist in Section 6.

---

## 6. Quality Checklist (Every Row)

Before setting `Status` = `Ready for Build`, verify:

- [ ] `Module_Goal` and `Prelesson_Goal` are both defined and distinct
- [ ] Essential question appears in `Game_Purpose`, narrative, and Module Map class goal
- [ ] If `Has_Antagonist` = Yes, villain motivation connects to lesson topic
- [ ] If `Has_Antagonist` = No, `Problem_Or_Quest` still gives clear stakes
- [ ] All 3 missions practice lesson content (topic, original story theme, vocab)
- [ ] Mission 3 uses **curriculum vocabulary words** — not invented words
- [ ] Mission 2 is an **original story** — not copied from `wonders_lessons.md`
- [ ] Mission 2 story parts are age-appropriate for the grade band
- [ ] `Player_Avatar` is a vehicle or non-humanoid (not a person)
- [ ] `Missing_Source_Data` filled — `None` or explicit list of gaps
- [ ] `One_Sentence_Quest` describes the prelesson quest clearly
- [ ] `Module_Map_Unlock` is described in ending plan
- [ ] Module Goal is **not** fully resolved in the prelesson
- [ ] Intro video topic connects to unit hook
- [ ] Zone names are unique on the map and hint at mission type
- [ ] Mission rewards are thematic (tokens not required)
- [ ] All 4 n8n MISSION CONTEXT prompts are written in full
- [ ] Asset list is complete enough to produce art without guessing
- [ ] No copied Lesson 1 (insect/farm/grasshopper) content unless lesson is Bug Me!
- [ ] Korean 1st–3rd grade ESL: short sentences, familiar contexts where possible
- [ ] MGT rows are **identical** to GT partner (no scaffolding)

---

## 7. Grade & Level Calibration Guide

Use the **grade band** of the row's level for difficulty. GT and MGT rows sharing the same lesson use the **same** calibration.

| Level band | Reading level | Find It count | Quiz count | M2 part length (original story) | PolyPal vocabulary |
|------------|---------------|---------------|------------|--------------------------------|-------------------|
| GT1-1 | Emerging 1st | 5–7 objects | 8–10 questions | 1 short sentence/part | Very simple |
| GT1-2 / MGT1-1 | Developing 1st | 6–8 | 8–10 | 1 sentence/part | Simple |
| GT2-1 / MGT1-2 | Early 2nd | 7–8 | 10 | 1–2 sentences/part | Grade 2 |
| GT2-2 / MGT2-1 | Developing 2nd | 7–9 | 10 | 1–2 sentences/part | Grade 2 |
| GT3-1 / MGT2-2 | Early 3rd | 7–10 | 10 | 2 sentences/part | Grade 3 |
| GT3-2 / MGT3-1 | Developing 3rd | 8–10 | 10 | 2–3 sentences/part | Grade 3 |

**M2 original story rules by level:**
- Use simple plots: one character, one problem, one resolution across 4 parts
- Draw vocabulary and themes from the lesson, but write fresh sentences
- Grade 1 bands: familiar settings (home, school, park, farm); Grade 3: slightly richer plots OK

---

## 8. Reference — Lesson 1 as Gold Standard

`SAMPLE_APP.md` is the fully built instance of **GT1-1, Lesson 1: Bug Me!**

The Excel-planning agent should treat Lesson 1 as the **quality bar**, not the **content template**:

| Lesson 1 element | Use for all lessons? |
|------------------|----------------------|
| Game flow / state machine | **Yes — keep identical** |
| 3 mission format types | **Yes — keep identical** |
| Two-tier goal (Module + Prelesson) | **Yes — define both every lesson** |
| Module Map unlock ending | **Yes — keep identical payoff** |
| PolyPal + n8n pattern | **Yes — keep identical** |
| Player as vehicle / non-humanoid | **Yes — required every lesson** |
| Villain / antagonist | **No — optional per lesson** |
| Mission rewards as tokens | **No — any thematic collectible** |
| Farm setting | **No — lesson-specific** |
| Mr. Grasshopper | **No — lesson-specific (optional)** |
| Insect Find It scene | **No — lesson-specific** |
| Original caterpillar/butterfly story | **No — write new original per lesson** |
| Bug Me! vocabulary quiz | **No — lesson-specific** |

When planning GT1-1 Lesson 1, the row should closely match SAMPLE_APP.md (validates the pipeline). All other rows adapt the template.

---

## 9. Missing & Imperfect Source Data in `wonders_lessons.md`

The future agent **must not invent** missing curriculum content. When source data is absent or unreliable, record it in `Missing_Source_Data` and plan around what is available. The user will supply full data later.

**Always flag in `Missing_Source_Data` when you find:**

| Issue | Example | What to do |
|-------|---------|------------|
| **Fragmented story text** | OCR gaps, broken paragraphs, missing sentences | Note which story (Story 1 / Story 2); use fragments only as topic context; write original Mission 2 regardless |
| **Missing story** | Story section empty or `_Not found_` | Note `Missing: Story 1` or `Story 2`; plan narrative from EQ and vocab only |
| **Missing vocabulary** | Fewer than expected words, blank definitions | List missing words; build quiz only from confirmed vocab |
| **Swapped definitions** | Definition text clearly belongs to another word | Note the word; cross-check meaning; use corrected meaning in quiz or flag for user |
| **Genre missing** | `Genre: _Not found_` | Note in missing data; infer only for planning context |
| **Incomplete essential question** | Empty or garbled EQ | Note `Missing: Essential Question`; do not invent — flag for user |

**Do not** patch textbook text into Mission 2. **Do not** fill gaps with invented vocab or story passages. Flag and move on.

**Also note:** Duplicate lesson numbers across books are normal — use `Curriculum_Lesson_Key` (e.g. `FH_U1_L1` vs `AB_U1_L1`) to avoid confusion; `Seq_Lesson_Num` is per-level only.

---

## 10. Output Format & Conventions

### Excel formatting

- Header row: bold, freeze panes
- Column widths: auto-fit with max width ~60 for text columns
- Use wrap text for all narrative/prompt columns
- `Row_ID` format: `{Level}_L{nn}` — e.g. `GT2-1_L05`, `MGT3-1_L12`
- `Curriculum_Lesson_Key` format: `{BookCode}_U{unit}_L{lesson}` — e.g. `SS_U2_L06`, `ITH_U3_L12`

### Book codes

| Code | Textbook |
|------|----------|
| `FH` | G1 Fly High |
| `AB` | G2 All Aboard |
| `SS` | G2 Set Sail |
| `ITH` | G3 Into the Horizon |

### Status workflow

```
Planned → Needs Review → Ready for Build
```

All 104 rows should reach at least `Planned` before delivery. Flag high-complexity rows (`Complexity` = `High`) for human review.

---

## 11. What the Future Agent Must NOT Do

- **Do not** build `index.html` or game code
- **Do not** create image or audio files
- **Do not** invent missing curriculum data — flag gaps in `Missing_Source_Data` instead
- **Do not** create different plans for GT vs MGT rows sharing the same lesson
- **Do not** use humanoid player avatars — vehicle or non-humanoid only
- **Do not** skip rows — all 104 level × lesson instances required
- **Do not** change the game structure (mission types, beat order, 3-mission default)
- **Do not** fully resolve the Module Goal in the prelesson — always bridge to Module Map class games
- **Do not** use placeholder image URLs (placehold.co, etc.) in asset plans — describe assets textually

---

## 12. Delivery Checklist for the Excel Agent

Before submitting the workbook:

- [ ] File named `Prelesson_Game_Scope_Sequence.xlsx`
- [ ] 104 rows in `Master_Plan` (11 levels × their lesson counts)
- [ ] Every required column from Section 4.2 populated (or documented reason in `Notes`)
- [ ] GT1-1 Lesson 1 row aligns with `SAMPLE_APP.md` (Bug Me! / insects)
- [ ] All 48 unique curriculum lessons covered across levels
- [ ] MGT rows are **identical** to GT partner rows (no scaffolding)
- [ ] `Missing_Source_Data` populated on every row (`None` or explicit gap list)
- [ ] `Player_Avatar` is vehicle or non-humanoid on every row
- [ ] PolyPal named in all copy and n8n prompts (not "Speaking Agent")
- [ ] README sheet explains columns and workflow
- [ ] No Lesson 1 insect/farm content leaked into unrelated lessons
- [ ] All n8n prompts written in full (not "TBD")
- [ ] Every row defines both `Module_Goal` and `Prelesson_Goal`
- [ ] Every Mission 2 story is original (not from textbook)
- [ ] Module Map unlock described in every row
- [ ] Asset lists are actionable for a future art/dev team

---

## 13. What Happens After This Excel Exists

A separate **build agent** (future work, not now) will:

1. Read one Excel row + `SAMPLE_APP.md`
2. Produce one `index.html` + asset folder per lesson per level (or per shared content key)
3. Configure n8n workflow with row's prompts
4. QA in browser per `SAMPLE_APP.md` Section 20

This SUMMARY.md and the Excel are the **Scope & Sequence** layer. The SAMPLE_APP.md is the **engine template**. The wonders_lessons.md is the **curriculum content**.

---

*End of planning brief. Future agent: read `SAMPLE_APP.md` and `wonders_lessons.md` in full, then produce `Prelesson_Game_Scope_Sequence.xlsx` per this document.*
