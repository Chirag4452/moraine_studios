# Wallpaper mockup exports

The raw source folder is `../../wallpaper(raw)/`. Originals and licensed PSDs
remain local; only flattened WebP product previews go into `public/wallpapers/`.

1. Run `python store/scripts/prepare-wallpapers.py` with Python and Pillow to
   prepare crops and `wallpaper(processed)/manifest.json`.
2. Install `requirements-mockups.txt` into a Python environment.
3. From the workspace root, run `python store/scripts/render-wallpaper-mockups.py`.

The renderer extracts the real device and hand pixels from the two Pixeden PSDs,
fits the screen artwork to their display openings, retains rounded corners and
camera detail, and adds consistent warm neutral backgrounds. It does not modify
the original PSD smart objects. Rendered compositions are static illustrations,
not a verified simulation of iOS cropping or hinge animation.

Exports:
- `store/public/wallpapers/duo-landscapes/`: eight 2400px WebP images used by the store.
- `wallpaper(processed)/mockups/`: 4096px JPEG exports and a contact sheet for review.

Product: `/products/mountain-peaks-pack`. Its existing price is retained, and it
is featured first in the default collection sort. All eight images are in its
gallery; product cards, search, and cart use its cover image.

The current source JPEGs are low resolution. The listing avoids 4K/6K claims.
Only the four wallpaper masters and setup instructions belong in the customer
download; licensed PSD source files and mockup renders do not.


## Original editable frame and basic interface

Run `python store/scripts/render-original-mockups.py` on macOS to generate six
sample compositions (Fuji / Night Sky and Alpine Meadow / Star White, each in
closed, partially folded, and inner fully open poses). Quick Look renders the
SVGs locally; no browser automation is used.

Outputs: `wallpaper(processed)/original-mockups/`, with editable SVG, 4096px PNG,
2400px WebP and `review.jpg`. These are review assets; the existing store gallery
continues to use the corrected Pixeden compositions.

To swap artwork or finish:

```sh
python store/scripts/render-original-mockups.py --wallpaper '/absolute/path/image.jpg' --name sample --finish star-white --ui home
```

Use `--ui clean` to remove interface overlays. JPEG input is embedded in the SVG.
Editable groups include `shell`, `wallpaper-and-ui`, `system-ui`, `app-dock`,
`cover-camera`, and `hardware-details`. App icons are original simple vectors.
The original frame uses reference proportions, asymmetrical closed corners,
a cover camera, thin rim, and hinge details. It contains no supplied Apple or
Pixeden device pixels. This is an illustrative design, not official hardware
geometry or an exact iOS screenshot. The supplied Outer Open reference depicts
the rear and cover screen; our fully open pose depicts the inner screen.

The PSD renderer now fits convex screen boundaries separately per leaf to
remove ragged black mask artifacts. 4096px exports improve hardware edges, but
cannot recover missing detail from the small wallpaper sources. Use larger
original wallpaper files for sharper artwork; do not market these as 4K wallpapers.

## Portable wallpaper renderer

Requires Python 3.9+ and Node.js 20+. One-time setup from the repository root:

```sh
python3 -m venv .venv-render
.venv-render/bin/pip install -r store/scripts/requirements-render.txt
npm ci --prefix store
```

Prepare one approved high-quality master per design in
`wallpaper(processed)/<slug>/master.jpg` (PNG or WebP also accepted).
AI recreation/enhancement is a preparation step governed by the root AGENTS.md;
the renderer itself performs deterministic compositing. Preserve master composition
and dimensions, and keep UI out of the artwork. The legacy preparation helper is
an importer, not an AI enhancement pipeline.

```sh
.venv-render/bin/python store/scripts/render_wallpaper.py \
  --master 'wallpaper(processed)/mount-fuji-sunrise' \
  --name 'Mount Fuji Sunrise' --finish night-sky
```

A master file path is also accepted. `--input` remains an alias for `--master`,
but raw input is rejected to prevent bypassing the prepared master workflow.
Use `--finish star-white` for the light frame.

Each run creates a fresh folder under `wallpaper(processed)/reviews/` and saves
only `closed.webp` and `open.webp` at 2400px. `--output PATH` chooses a new output
folder; existing folders are refused. The master is read only, never re-exported.
Each device screen receives an independent temporary cover crop of that master,
with no stretching. `--focus-x` and `--focus-y` position both screen crops from
0 (left/top) to 1 (right/bottom), default 0.5. These positions control placement
within the excess artwork; they are not subject coordinates. Device fitting is
an illustrative composition, not verified system wallpaper behavior.

Optional flags:

- `--review`: add `review.jpg` and `draft.json` with master dimensions, screen crop
  boxes and draft status.
- `--keep-sources`: render at 4096px and retain PNGs, editable self-contained SVGs
  and masks in `sources/`, alongside the 2400px WebPs.
- `--depth-mask mask.png`: grayscale mask matching the EXIF-oriented master,
  white for foreground that hides the clock, black for visible clock. It follows
  the corresponding device crop. Without it, the clock is fully visible.

Clock (9:41), date (Wed Apr 1), network ring, flashlight, camera and home indicator
use the approved vector overlay. The frame preserves the lens; no crease is added.
Apple frame PNGs, committed UI vectors and installed dependencies are required.
No clipboard image, simulator, Quick Look, PSD or browser is required.

Working crops and intermediates are removed before the completed job is promoted
from staging. The script does not edit listings, upload, commit or publish.
Review the composition on the laptop before publishing. Export size does not
increase native source detail. Cloud jobs must retain/export their output folder.
