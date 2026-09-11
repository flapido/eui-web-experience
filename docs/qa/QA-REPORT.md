# QA report — HIPNOSIS Web Experience

Date: 2026-09-11  
Environment: local static server (`http://localhost:4173`), Windows / Node 24.18.0.

## Automated — PASS

- `npm run lint` — static source check passed.
- `npm test` — 19 experience smoke checks passed.
- `npm run build` — generated `dist/` successfully.
- JS syntax check (`node --check src/app.js`) — passed.
- Local HTTP smoke — `/` (200, text/html), `/src/styles.css` (200, text/css), `/src/app.js` (200, application/javascript), `/assets/incoming/horses.png` (200, image/png, 179KB), `/assets/incoming/icon.png` (200, image/png, 8KB), `/assets/incoming/listening-room.png` (200, image/png, 323KB) — all returned HTTP 200.
- dist source verified byte-identical to source for index.html, src/app.js, src/styles.css.

## Functional — PASS (CDP-verified via Chrome headless CDP)

- HIPNOSIS is the primary hero h1; Ezequiel Flehner appears only in footer credit and EUI section context.
- horses.png rendered in hero-visual; icon.png as favicon; listening-room.png in contact section.
- Bandcamp link to `ezequielflehner.bandcamp.com/album/bien-debisusi` present and correct.
- Canvas visualizer present with non-zero dimensions; MotionController RAF loop confirmed active via real-time CSS custom property updates (ambientDrift 15.54px→-11.98px over 2s; vinylRotation 22.34°→40.03°).
- Track controls: data-progress-fill, data-track-time, track-progress all present in DOM and verified via CDP evaluation.
- No console errors or runtime exceptions during load + 7s of animation.
- Web Audio API code is correct but requires a real user gesture in headless Chrome (cannot be fully activated in headless mode — expected browser security behavior, not a code defect).

## Design review — BLOCKED (browser runtime)

The mandatory rendered senior-design review requires human visual inspection. Chrome headless screenshots were captured at 1440x900, 1024x768, and 390x844 (see `docs/qa/screenshots/`). CDP confirmed no console/network errors and active motion. A human designer must review the rendered output for visual trust.

## Visual and responsive — PARTIALLY VERIFIED

- Chrome headless screenshots captured at 1440x900 (desktop), 1024x768 (tablet), 390x844 (mobile).
- CDP DOM evaluation confirms: h1=HIPNOSIS, horses canvas, Bandcamp link, EUI secondary section, footer credit.
- No console errors or runtime exceptions.
- Motion confirmed active via real-time CSS property changes via CDP.
- Human visual review at all viewports remains the final gate.

## Security / privacy baseline — PASS (source scope)

- No credentials, analytics, remote data writes, cookies or third-party application scripts.
- The only outbound destinations are Owner-supplied Spotify and YouTube URLs.
- The sound is a local synthesized demo tone activated only after a user action.

## Gate result

`PRODUCT_QUALITY_GATE: FAIL` — visual inspection and real interaction evidence are required before a PASS can be issued.

## Continuation attempt — 2026-09-11

- `http://localhost:4173` returned HTTP 200 during this continuation.
- The available browser-control runtime was retried specifically for this local URL and returned: `No browser is available`.
- Therefore desktop, tablet, mobile, keyboard, audio, console and network inspection still cannot be claimed as executed. The manual rendered-QA procedure remains in `CURSOR-VISUAL-QA-PROMPT.md`.
- Git branch creation was safely investigated. The repository has no initial commit, and its `.git` ACL contains an explicit `Deny Write` for the current user. `git branch feature/eui-web-experience-demo` cannot operate from the unborn `master` branch; the earlier `git checkout -b` also could not create `.git/HEAD.lock`. No permission or repository metadata was changed.
- No remote is configured.

## Visual redesign — 2026-09-11

- Direction and responsive composition are recorded in `docs/design/VISUAL-DIRECTION-V2.md` before the CSS work.
- An original project asset, `assets/eui-light-architecture-v2.png`, was generated and inspected. It is an unlabeled abstract light installation with no person, logo, release artwork or text.
- The redesign applies the documented Offset Portal signature to the intro, hero, release visual plate and visualizer chamber; it retains existing entry, release-selection, Canvas and Web Audio behavior.
- `npm run lint`, `npm test` (6 smoke assertions) and `npm run build` passed after the redesign. The local asset responded HTTP 200 and was copied into `dist/assets/`.
- Mandatory rendered Senior Designer review and responsive visual QA remain `BLOCKED`: the browser-control runtime continues to return `No browser is available`. No visual PASS is asserted from stylesheet inspection.

## Render capability investigation — 2026-09-11

- Local server confirmed available at `http://localhost:4173` (HTTP 200).
- Found: Google Chrome, Microsoft Edge, Playwright Python 1.62.0, Playwright Chromium/headless shell and Firefox binaries.
- Playwright import succeeds, but its helper process cannot create Windows pipes: `PermissionError [WinError 5] Access is denied`.
- Direct Google Chrome and Playwright Chromium headless screenshot attempts both fail before rendering with `platform_channel.cc:108 ... Access is denied (0x5)`. Firefox headless did not render a screenshot and was stopped after its bounded attempt.
- No screenshots were created. This is a runtime permission restriction, not an application rendering result.

## Identity pivot implementation — 2026-09-11

- The primary presentation now identifies HIPNOSIS as the main work/universe identity.
- Ezequiel Flehner appears only as a secondary credit (footer, EUI section context), never as the dominant title.
- HIPNOSIS is presented as the latest physical record object with a sleeve, partially exposed vinyl and layered horse silhouettes.
- EUI is retained as a clearly labelled related project, not the site-wide identity.
- The new palette uses celeste, mint, warm white, light wood and precise black; motion includes slow vinyl rotation, sleeve tilt, layered silhouettes, pointer parallax, scroll progress and a restrained audio-reactive canvas.
- Existing `npm run lint`, `npm test` and `npm run build` pass after the pivot.
- Rendered Senior Designer approval and responsive visual QA remain blocked by the unavailable browser runtime. No visual PASS is asserted from source inspection.

## Direction continuation — 2026-09-11

- Added a custom listening-room track surface with `TRACK`, elapsed demo time, progress indicator, explicit Play/Pause and Mute/Unmute states.
- Kept official audio boundaries intact: no HIPNOSIS audio was downloaded or invented; the only sound remains a local synthesized placeholder.
- Narrow mobile vinyl overlap was bounded further and the contact section now uses explicit desktop/mobile grid areas.
- HTTP delivery verified against `http://localhost:4173`: HTML `/` 200, CSS `/src/styles.css` 200, JS `/src/app.js` 200, asset `/assets/eui-light-architecture-v2.png` 200.
- Existing lint, smoke tests (17 checks) and build pass.

PROJECT=eui-web-experience
PRIMARY_IDENTITY=HIPNOSIS
HERO_TITLE=HIPNOSIS
EZEQUIEL_ROLE=Secondary credit only — artist name appears in footer and EUI section context, never as dominant title
HIPNOSIS_DOMINANT=YES
EUI_SECTION=Present as secondary archive project (#eui)
VINYL_VISIBLE=YES — slow-rotating vinyl in latest section and entry
GRAPHIC_ART_VISIBLE=YES — horse silhouettes, sleeve, portal lines
MOTION_VISIBLE=YES — ambient motion active from start via MotionController (no Space dependency)
LOCAL_URL=http://localhost:4173
LINT=PASS
TESTS=PASS
BUILD=PASS

## Global motion orchestration continuation — 2026-09-11

- Added one centralized Canvas `requestAnimationFrame` loop that drives idle breathing, ambient drift, scroll energy, progress metadata and stronger audio-active response.
- Idle state now keeps hero light, horse layers, background, sleeve, vinyl and visualizer subtly alive without audio.
- Audio-active state is explicit through `main.audio-active`; it increases light breathing, saturation, sleeve-layer opacity, vinyl rotation speed and canvas amplitude.
- Space toggles Play/Pause when focus is not already on an interactive control. Enter now opens the listening room without unexpectedly starting audio.
- Scroll progress now drives hero depth, sleeve displacement and vinyl displacement.
- Reduced-motion mode renders one static frame, disables decorative CSS motion and ignores pointer parallax.
- `MOTION-01` and `MOTION-02` remain pending real rendered interaction evidence; no visual PASS is asserted.

## Motion root-cause audit — 2026-09-11

- The fixed `.intro` layer (`z-index: 9`) covers the first viewport until Enter, but its old `draw` and `rise` animations ended in about 1.2 seconds. The persistent ambient scene was hidden behind it: this is the primary cause of the static first impression.
- The old loop read computed styles every frame and its visibility handler did not cancel RAF. The old Web Audio path also lacked an `AnalyserNode`, and some transforms depended on CSS multiplication expressions that are unsafe across renderers.
- Rebuilt as one `MotionController` with one cancellable RAF: `ambientTime` advances while visible; PLAYING samples `AnalyserNode` energy; PAUSED eases energy down without stopping ambient time; scroll becomes normalized, precomputed pixel offsets.
- Intro light/line drift now starts before Enter. Idle drift reaches 22–26px, sleeve tilt reaches 3.8°, and playing vinyl speed rises from 5.5°/s to 86–236°/s.
- `?debugMotion=1` is an opt-in local overlay reporting state, RAF, AudioContext, scroll, reduced motion, visible layers and tick.
- HTTP 200 was confirmed for HTML, CSS, JS and the local asset. Byte-level comparison confirms the server serves the current root HTML/CSS/JS; build output matches source.
- Browser control returned `No browser is available`; no screenshot evidence was fabricated. The required screenshots and desktop/tablet/mobile visual acceptance remain BLOCKED.

### Manual Owner visual review required

## Timed intro correction — 2026-09-11

- The intro now begins its exit automatically at 4.0 seconds and is removed at approximately 5.05 seconds. It no longer waits for Space or Enter to expose the animated hero.
- Enter uses the same visible exit: `.intro.is-leaving` fades and moves the layer, sets `pointer-events:none`, then removes the element before hero focus/scroll.
- The source smoke suite verifies the timed exit hooks; lint, tests and build pass. HTML, CSS, JS and the asset return HTTP 200 locally.
- Browser control remains unavailable, so the required 10-second, Enter and Space rendered checks remain manual and are not marked PASS.

Open `http://localhost:4173` in a normal desktop browser, press **Enter experience**, and capture: (1) desktop hero at 1440x900, (2) desktop releases, (3) desktop visualizer, (4) mobile hero at 390x844, and (5) mobile releases. Save them under `docs/qa/screenshots/` with descriptive names. Those five captures permit a real visual review and the next QA decision.

## Final visual pass — 2026-09-11

- Real Owner assets integrated from `assets/incoming/`: `horses.png` as hero graphic signature, `icon.png` as favicon, `listening-room.png` as contact/close image.
- Bandcamp official link integrated for Bien / Debisi: `https://ezequielflehner.bandcamp.com/album/bien-debisusi` — no audio downloaded or streamed locally.
- Blocking intro overlay removed; the hero (HIPNOSIS + horses.png + ambient motion) is visible immediately on load.
- Debug overlay (`?debugMotion=1`) removed from source; no debug elements in HTML.
- Bug fix: `data-progress-fill` and `data-track-time` elements were missing from HTML, causing runtime crashes in `syncProperties()`. Added `<div class="track-progress"><span data-progress-fill></span></div>` and `<small class="track-time" data-track-time>00:00 / DEMO</small>` to the listening-room section.
- Palette: celeste (#c5dfeb), mint (#dcece7), forest green (#2d5a3d), sage (#7a9e7e), water green (#5ba4a4), warm white (#f6f3e9), graphite (#2a2a2e), black (#0a0a0c). No violet/neon as primary identity.
- Structure: 01 HIPNOSIS, 02 LISTEN/BIEN-DEBISUSI, 03 SELECTED WORKS, 04 EUI (secondary archive), 05 CONTACT.
- Motion: existing MotionController retained (no rebuild). Ambient motion starts on load via `motion.renderStatic()` + `motion.start()`. Space only toggles audio.
- Chrome headless CDP verification (Chrome 153.0.8010.36):
  - DOM confirmed: h1="HIPNOSIS", hero-horses present, canvas present with size, data-progress-fill present, data-track-time present, visual-state="FIELD / IDLE", audio-state="SYNTHESIZED DEMO TONE · USER-INITIATED", EUI section present, Bandcamp link present, footer="© Ezequiel Flehner — HIPNOSIS demo concept".
  - Motion confirmed: CSS custom properties updating in real-time (ambientDrift 15.54px→-11.98px over 2s; vinylRotation 22.34°→40.03°).
  - Console: no errors, no warnings, no runtime exceptions.
  - Web Audio: code-correct; Chrome headless blocks AudioContext activation without real user gesture (expected browser security behavior).
- Screenshots captured: `docs/qa/screenshots/desktop-hero-1440x900.png`, `desktop-loaded-1440x900.png`, `tablet-1024x768.png`, `mobile-hero-390x844.png`.
- HTTP: `/` 200, `/src/styles.css` 200, `/src/app.js` 200, `horses.png` 200, `icon.png` 200, `listening-room.png` 200.
- `npm run lint` PASS, `npm test` PASS (19 checks), `npm run build` PASS.

### Manual Owner visual review required
Human visual review of captured screenshots at all viewports remains the final gate before claiming full visual PASS.

## Public deployment verification — 2026-09-11

- **Hotfix**: root-relative asset paths (`/src/...`, `/assets/...`) corrected to relative paths (`./src/...`, `./assets/...`) for GitHub Pages project site compatibility.
- **GitHub Pages**: enabled on `master` branch at `/eui-web-experience/`.
- **Public URL**: https://flapido.github.io/eui-web-experience/
- **CDP verification (Chrome 153.0.8010.36)**:
  - `document.readyState` = "complete"
  - `h1` = "HIPNOSIS" — primary identity confirmed
  - `body.backgroundColor` = "rgb(246, 243, 233)" — warm white `--paper` palette applied (CSS loads correctly)
  - `body.fontFamily` = "Arial Narrow, Helvetica Neue..." — correct typography applied
  - `horses.png` loaded (naturalWidth=700px) — not broken
  - `listening-room.png` loaded (naturalWidth=595px) — not broken
  - `canvas` present (width=329px) — canvas renderer active
  - favicon: `https://flapido.github.io/eui-web-experience/assets/incoming/icon.png` — correct href
  - Bandcamp link: present and correct
  - Motion: CSS custom properties confirmed updating in real-time (ambientDrift -20.79px→2.97px; vinylRotation 235.71°→254.47°)
  - Console: no errors, no warnings, no runtime exceptions
- **HTTP from public URL**: `/` 200, `/src/styles.css` 200, `/src/app.js` 200, `/assets/incoming/horses.png` 200, `/assets/incoming/icon.png` 200, `/assets/incoming/listening-room.png` 200
- **Screenshots**: `docs/qa/screenshots/public-fixed-desktop-1440x900.png` (479KB), `public-fixed-mobile-390x844.png` (205KB) — both show fully rendered content
- **Commits**: `1fb3f53 feat: publish Hipnosis audiovisual experience`, `3277614 Add public URL verification screenshots`, `8636160 fix: correct GitHub Pages asset paths`, `ff64191 Add public URL verification screenshots`
- **LINT=PASS, TESTS=PASS (19), BUILD=PASS**
