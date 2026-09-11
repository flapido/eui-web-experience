# Rendered QA handoff — EUI Web Experience

Start locally from the project root:

```powershell
npm run dev
```

Open `http://localhost:4173` and inspect at 100% zoom. Do not deploy.

## Required interaction checks

1. At 1440x900: click **Enter the listening room**; confirm the intro clears, the HIPNOSIS hero is readable, and sound only starts after this action. Test Play/Pause and Mute/Unmute.
2. At 1024x768 and 390x844: inspect the HIPNOSIS sleeve/vinyl composition, selected works and EUI secondary section with no clipped content or horizontal scrolling.
3. At 390x844: ensure touch controls are comfortably tappable and navigation, Spotify and contact/reference links work.
4. Keyboard: Tab through Enter, nav, release buttons, player buttons and links. Confirm visible focus and sensible order.
5. Enable reduced motion in the browser/OS; confirm the page remains legible and usable without animated movement.
6. Inspect Console and Network after the route loads and while activating audio; report any errors or failed requests.

## Acceptance

Capture desktop, tablet and mobile screenshots. If every check passes and no critical console/network errors occur, update `VISUAL-01` and `AUDIO-01` in `docs/qa/SCENARIOS.md` to `PASS`, write the evidence into `QA-REPORT.md`, and rerun the product-quality gate.
