# HIPNOSIS — Web Experience

IDENTITY-01 · Open the experience → HIPNOSIS is the primary hero identity and EUI is visibly secondary · PASS (CDP-verified: h1=HIPNOSIS; Ezequiel only in footer credit) · 2026-09-11

LATEST-01 · Inspect HIPNOSIS object scene → sleeve, partially exposed rotating vinyl and contact links are present at responsive widths · IMPLEMENTED · 2026-09-11

AUDIO-02 · Use listening-room track controls → custom play/pause, mute, track metadata and progress indicator are visible; demo state remains explicit · PASS (CDP-verified: track-progress, data-progress-fill, data-track-time all present in DOM) · 2026-09-11

MOTION-01 · Compare idle and audio-active states → ambient motion remains alive without audio; Play/Space increases vinyl, light, layer and visualizer energy; Pause returns to ambient state · PARTIALLY_VERIFIED (CDP confirmed real-time CSS updates: ambientDrift 15.54px→-11.98px, vinylRotation 22.34°→40.03°; audio-active requires real user gesture in browser) · 2026-09-11

MOTION-02 · Toggle Space and scroll → Space controls Play/Pause without hijacking buttons; scroll shifts scenes, objects and color without abrupt movement · NEEDS_RENDERED_RECHECK · 2026-09-11

MOTION-03 · Enable reduced motion → decorative RAF/CSS loops stop while the static visualizer, controls and content remain usable · SOURCE_IMPLEMENTED · 2026-09-11

DESIGN-01 · Review Light Architecture redesign in rendered browser → typography, portal signature and editorial compositions feel intentional at all target sizes · PARTIALLY_VERIFIED (CDP confirmed: correct font-family Arial Narrow, warm white body bg, 700px horses, 595px listening-room, 329px canvas; screenshots at 1440x900, 1024x768, 390x844 from public URL) · 2026-09-11

ENTRY-01 · Activate Enter experience → removes entry layer and exposes hero · PASS · 2026-09-11
MUSIC-01 · Select a verified release → selected metadata and visual accent change · PASS · 2026-09-11
AUDIO-01 · Use play/pause and mute controls → user-initiated demo oscillator responds or safe unavailable state appears · NEEDS_RECHECK (code-correct; Web Audio API requires real user gesture, blocked in headless Chrome) · 2026-09-11
NAV-01 · Use internal and official outbound links → destinations and in-page navigation are available · PASS · 2026-09-11
A11Y-01 · Enable reduced motion → animations and transitions reduce while content remains present · PASS · 2026-09-11
VISUAL-01 · Inspect phone, tablet and desktop layouts at default zoom → no visual defects or inaccessible controls · PARTIALLY_VERIFIED (screenshots captured at 1440x900, 1024x768, 390x844; human visual review still required) · 2026-09-11
