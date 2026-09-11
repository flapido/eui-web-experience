# HIPNOSIS — Web Experience — pre-development report

## Mandate and status

- Project: `eui-web-experience`
- Project ID: `09a76d73-4ec4-4c8a-bb77-171ab1f6853e`
- Canonical lifecycle at intake: `Planning` / `PENDING` acceptance.
- Development is authorized by the Owner Execution Mandate.

## Verified facts

- The primary identity is HIPNOSIS (the work/universe); EUI is a related musical project.
- The Bandcamp page for *EUI* verifies a self-titled release dated 26 August 2017 and credits its composition, production and recording to Ezequiel Flehner.
- Apple Music verifies *Umbral* as an Eui single released 15 February 2024, copyright Ezequiel Flehner.
- The supplied YouTube URL is a visual-language reference; no metadata from it is presented as a release fact.

## V1 scope

Build a single-page, responsive audiovisual experience for HIPNOSIS — a vinyl, image and space installation — with EUI as a secondary project section. Entry sequence, full-viewport HIPNOSIS hero, vinyl/sleeve scene, selected works, EUI archive section, listening room with custom demo audio controls and an accessible generative canvas visualizer. It must remain useful with animation disabled.

## Assumptions and boundaries

- No Owner image asset was present in the repository. Visual artwork is therefore abstract, generated in CSS/canvas, with silhouette language rather than a portrait; it does not purport to depict Ezequiel or recreate release artwork.
- No licensed local music was present. The player produces a subtle, locally synthesized **demo tone** only after user interaction; it never downloads, streams, or redistributes EUI music.
- Release artwork is not recreated. Release cards use abstract demo compositions.
- V1 excludes CMS, analytics, contact-form delivery, account features, remote deployment and unauthorised asset acquisition.

## Acceptance mapping

| Area | Verifiable V1 criterion |
| --- | --- |
| Entry | Enter control starts the visual experience and optional demo sound only after activation. |
| Identity | HIPNOSIS is the primary hero and entry identity; Ezequiel Flehner appears only as a secondary credit. EUI is clearly secondary. |
| Music | HIPNOSIS is the latest work scene and EUI is a related project linked to the supplied Spotify profile. |
| Audio | Play/pause and mute are keyboard-accessible, clearly labelled, and affect only the demo synthesizer. |
| Visual | Vinyl, sleeve, light palette, horse/silhouette layers and canvas respond with restrained motion; reduced motion preserves usable static composition. |
| Responsive | Layout works at phone, tablet and desktop widths without horizontal overflow. |
| Accessibility | Landmark structure, focus states, labels, contrast, external-link labels and motion preference support. |

## Risks

- External streaming destinations can change; only official URLs supplied by the Owner are linked.
- AudioContext can be unavailable or blocked; the UI reports this safely and stays functional.
- Canvas is progressively enhanced; no information is stored only in the visualizer.

## Decision

The experience is built with vanilla HTML/CSS/JS served by a local Python HTTP server, using native CSS animations, Canvas, and Web Audio.
