# HIPNOSIS — Visual Direction V3: Listening Objects

## Intent

The redesign is an editorial audiovisual experience centered on HIPNOSIS — a work/universe of vinyl, image and space. EUI is one related project inside the practice. Light, paper, wood and the physical record act as the visual architecture.

## Typography

- **Display:** condensed neo-grotesk direction — `Arial Narrow`, `Helvetica Neue Condensed`, system sans fallback. Large, tight artist name and work titles; no rounded type.
- **Text / controls:** a precise monospace (`ui-monospace`, Consolas fallback), 10–12px with deliberate tracking.
- **Scale:** display 80–280px desktop, 68–160px tablet, 70–128px mobile; body 15–17px with 1.55 line-height.
- **Rhythm:** display uses -0.08em tracking; labels use 0.16em. Text never competes with the wordmark.

## Colour and material

| Token | Purpose |
| --- | --- |
| `#050506` | absolute black field |
| `#101015` | elevated paper / dark matter |
| `#f1f0ec` | warm-cold editorial white |
| `#99989f` | quiet metadata |
| `#8b7cff` | ultraviolet active state |
| `#b7ddff` | controlled blue-white light |

Grain, vignette, hairline borders, soft bloom and a halftone image field replace generic gradients. Accent colour shifts only with release selection.

## Grid and composition

- **Desktop 1440:** 12 columns, 48px outer margin, 24px gutters. Hero wordmark deliberately breaks grid; metadata stays locked to it.
- **Tablet 1024 portrait:** 8 columns, 32px margins, 18px gutters. Text and visual field interleave vertically rather than shrinking side by side.
- **Mobile 390:** 4 columns, 18px margins, 12px gutters. Wordmark is a cropped typographic event; controls stay in a dedicated, reachable lower zone.
- Vertical rhythm: 8px unit; sections use 112–180px desktop, 80–112px tablet, 72–96px mobile.

## Screen direction

- **Intro:** black aperture, a single luminous portal builds from four asymmetrical rails. EUI appears as a large cut-out wordmark. Enter is a quiet editorial control, never a pill CTA.
- **Hero:** enormous off-axis EUI typography overlays a vertical light architecture. A diffuse, generated art field lives on the right; metadata is small and anchored to the lower grid.
- **Releases:** a numbered index on the left controls a full editorial plate. Artwork is a generated abstract crop, half outside the frame; release text is oversized and paced separately from the index.
- **Selected release:** colour is environmental, applied to the architecture and graphic plate rather than a card.
- **Visualizer:** treated as an instrument panel behind a translucent dark scrim, with a thin measurement frame and large section numeral—not a Canvas demo box.
- **About / contact:** sparse end-credit composition: name at monumental scale, verified note and links aligned to a fine rule.

## Motion language

- 700–1100ms cubic-bezier(.22, .61, .36, 1) for reveals; 10–18s linear drift for environment.
- Lines scan slowly, then rest. Wordmark reveals through clip-path; release changes crossfade the environment rather than flipping cards.
- Pointer parallax moves the light architecture by a maximum of 14px. Canvas line displacement is restrained and becomes slightly more active only during demo audio.
- `prefers-reduced-motion` disables all nonessential travel and preserves the final composition.

## Artist signature

**The Listening Object:** an incomplete rail, circular record and layered silhouette recur across the intro, hero, HIPNOSIS sleeve and visualizer. It is a material language for the artist, not a literal EUI logo.

## Implementation limits

No external photos, false release artwork or downloaded music. The hero/release visual is an original, unlabeled abstract art asset marked `DEMO VISUAL`, combined with native grain and CSS geometry.
