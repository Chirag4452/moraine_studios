# Moraine Studio workspace

| Folder | Purpose |
| --- | --- |
| `wallpaper(raw)/` | Original inputs and generation prompts; preserve originals |
| `wallpaper(processed)/<design>/` | One prepared master per wallpaper |
| `wallpaper(processed)/reviews/` | Closed/open mockup exports for laptop review |
| `Bezel-iPhone-Duo/` | Apple frame PNGs, editable source assets and license |
| `store/` | Website source and published image assets |
| `store/scripts/` | Rendering tools and command instructions |
| `archive/` | Recoverable older experiments and redundant exports; local only |
| `.venv-render/` | Installed Python rendering environment; local only |

Use the portable renderer described in `store/scripts/README.md`.
Project working agreements are in `AGENTS.md`.
Cleanup archives include a manifest of original paths. Website publication remains
an explicit review step.
