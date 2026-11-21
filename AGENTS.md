# Moraine Studio working agreements

## Wallpaper assets

- Preserve raw originals in `wallpaper(raw)/`; never overwrite them.
- Keep one high-quality master per design in `wallpaper(processed)/<slug>/`. Do not retain a separate preview or inner/outer artwork file.
- The renderer reads the master and creates any working preview, crop, or resize in memory or temporary storage. Persist only requested mockup outputs.
- “Process images” defaults to AI recreation or enhancement using the imagegen skill, preserving the recognizable subject and intended photographic character. Plain resizing or format conversion alone does not fulfill this request.
- Duo wallpapers require a landscape master, targeting width:height 2853:2007 (approximately 1.42:1). Portrait references must be AI-expanded or recomposed into this landscape canvas; do not preserve their portrait aspect ratio. Preserve the recognizable subject and photographic character.
- Verify landscape orientation and target ratio before accepting a generated master. Never stretch or merely crop a portrait reference as a substitute for AI recreation. Minor ratio differences from generation must be disclosed and checked in both views.
- Keep the focal subject within the central approximately 48% of the landscape width so the closed portrait crop retains it. Place the summit around 45–50% of image height, below the approved clock overlay. Leave natural scenery across the full width for the open screen.
- Once approved, preserve the master composition and dimensions. The renderer creates temporary screen-fitting crops only; it does not regenerate artwork.
- Do not generate extra formats, sizes, variants, or mockups unless requested.
- Keep the preparation script and manifest consistent with these rules.
- Distinguish export dimensions from native image detail; identify AI recreation and upscaling accurately.

## Collaboration

- Check existing project rules and workflows before making changes.
- Ask focused questions when a visual preference is unresolved; record agreed answers here for future work.
- Preserve unrelated work already present in the checkout.
- Finish local files autonomously. Ask before publishing or changing store listings.
- Create or update UX documentation only when explicitly requested.
- Do not use browser automation unless explicitly requested.

## Wallpaper composition

- Before AI recreation or enhancement, research the subject and the relevant target-device lock-screen layout using authoritative references. Inspect the source image and account for the actual clock position rather than assuming one universal layout.
- Keep the focal subject horizontally near the middle, with its main feature slightly below the clock. Leave enough clear space for the time to remain readable.
- Make the sky/top and foreground/bottom transition naturally around the subject, with coherent light, color, depth, and texture. Avoid abrupt extensions, distracting edge detail, and artificial gradients.
- Check the final master in the renderer with the clock and bottom controls visible. Adjust the artwork composition when necessary, without baking interface elements into the master.
