# HIPNOSIS — Web Experience

## Goal

Single-page audiovisual experience for HIPNOSIS — a vinyl, image and space installation — with EUI presented as a secondary project.

## Status

Implementation complete. Lint, tests (19 checks) and build pass. HTTP 200 verified for HTML, CSS, JS and all three real assets. Chrome headless CDP confirms no console/runtime errors and active ambient motion.

## Scope

- Artist-first single-page experience for HIPNOSIS.
- Latest vinyl object scene with sleeve, partially exposed vinyl and layered horse silhouettes.
- Native Canvas visualizer and user-initiated synthesized demo audio.
- Official outbound links only; visual artwork is CSS-generated and intentionally unlabeled as release artwork.

## Out of scope

- No deployment, merge, ticket creation, CMS, contact-form delivery or licensed music.

## Technical decisions

- Keep the experience light, tactile and editorial: celeste, mint, warm white, light wood and precise black.
- Preserve reduced-motion support and safe local-only demo audio.

## Run

```text
npm run dev
```

## Test

```text
npm run lint
npm test
npm run build
```

## Next steps

- [x] Define requirements
- [x] Create first implementation
- [x] Add smoke tests
- [x] Complete rendered browser QA (Chrome headless CDP + screenshots; human visual review pending)
