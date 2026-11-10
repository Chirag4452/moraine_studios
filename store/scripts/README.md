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
