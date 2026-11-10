"""Prepare local wallpaper assets; no AI edits and no changes to raw originals.

Run with Python + Pillow. Source: ../wallpaper(raw).
Masters retain native crop resolution. Enlarged PSD inputs are preview assets only.
"""
from pathlib import Path
import json
from PIL import Image, ImageOps, ImageDraw

ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / 'wallpaper(raw)'
OUT = ROOT / 'wallpaper(processed)'
SPECS = {
    '4289ADE9-F2BC-4F3D-A06E-2F1357A38EEA': ('violet-valley', 'Violet Valley', .46),
    '5D26EA72-6DCC-422A-81B3-290E0C5B613D': ('cloud-peaks', 'Cloud Peaks', .53),
    '825C8AD7-2E85-4D81-9CDE-702AB6BEAF5A': ('alpine-meadow', 'Alpine Meadow', .50),
    'B371369A-8B85-4CA4-B855-A5CDCF514030_1_105_c': ('fuji-at-dusk', 'Fuji at Dusk', .66),
}
OUT.mkdir(exist_ok=True)
rows = []
manifest = []
for path in sorted(SOURCE.iterdir()):
    if path.stem not in SPECS:
        continue
    slug, title, focus_y = SPECS[path.stem]
    dest = OUT / slug
    dest.mkdir(exist_ok=True)
    image = ImageOps.exif_transpose(Image.open(path)).convert('RGB')
    w, h = image.size
    ratio = 2670 / 1878
    cw, ch = (w, round(w / ratio)) if w / h < ratio else (round(h * ratio), h)
    left = (w-cw)//2
    top = max(0, min(h-ch, round(h*focus_y-ch/2)))
    master = image.crop((left, top, left+cw, top+ch))
    master.save(dest/'master.jpg', quality=95, subsampling=0)
    # Central portrait window from the SAME master, never a separate composition.
    outer_w = round(ch*1398/2034)
    outer = master.crop(((cw-outer_w)//2, 0, (cw-outer_w)//2+outer_w, ch))
    master.resize((2670,1878), Image.Resampling.LANCZOS).save(dest/'mockup-inner.jpg', quality=93)
    outer.resize((1398,2034), Image.Resampling.LANCZOS).save(dest/'mockup-outer.jpg', quality=93)
    web = master.copy()
    web.thumbnail((1200,1200), Image.Resampling.LANCZOS)
    web.save(dest/'preview.webp', quality=85)
    tile = Image.new('RGB', (1400, 520), '#f0efeb')
    draw = ImageDraw.Draw(tile)
    draw.text((24,16), f'{title} | original {w} x {h} | master {cw} x {ch}', fill='#20242a')
    def place(im, box):
        im = im.copy(); im.thumbnail(box[2:], Image.Resampling.LANCZOS)
        tile.paste(im, (box[0]+(box[2]-im.width)//2, box[1]+(box[3]-im.height)//2))
    place(image,(20,55,310,420))
    place(master,(350,55,660,420))
    place(outer,(1040,55,310,420))
    draw.text((80,490),'Original',fill='#20242a')
    draw.text((580,490),'Open / partially open',fill='#20242a')
    draw.text((1100,490),'Closed crop',fill='#20242a')
    rows.append(tile)
    manifest.append({'slug':slug,'title':title,'source':str(path.relative_to(ROOT)),
                     'originalSize':[w,h],'masterSize':list(master.size),
                     'cropBox':[left,top,left+cw,top+ch],
                     'download':'master.jpg','webPreview':'preview.webp',
                     'mockupInputs':['mockup-outer.jpg','mockup-inner.jpg'],
                     'note':'Mockup inputs are enlarged for PSD placement; master retains native crop resolution.'})
sheet = Image.new('RGB',(1400,520*len(rows)), '#f0efeb')
for i,row in enumerate(rows): sheet.paste(row,(0,i*520))
sheet.save(OUT/'crop-review.jpg',quality=90)
(OUT/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
(OUT/'README.md').write_text('''# Wallpaper assets

Source of truth: `../wallpaper(raw)/`. Raw files are never overwritten.

Each design includes:
- `master.jpg`: landscape crop at native resolution, one image for the wallpaper.
- `preview.webp`: compressed web preview.
- `mockup-inner.jpg`: enlarged landscape artwork for the foldable PSD screen.
- `mockup-outer.jpg`: central portrait crop of that same artwork for the handheld PSD.

Mockup inputs are presentation assets, not separate customer wallpapers. Enlarging
them does not create additional detail. These originals are below native Duo
resolution; avoid describing the pack as 4K or native-resolution quality.

`crop-review.jpg` shows original, open crop, and central closed crop for each design.
`manifest.json` records sources and crop boxes for repeatable exports.

For the first site version, use the handheld PSD as the cover image and the
partially open PSD as the second gallery image. Replace `PUT YOUR SCREEN HERE`
using the matching mockup input, remove sample text, retain device/hand/highlights,
and export flattened web images. Keep PSD source files outside public assets.
''')
print(json.dumps(manifest,indent=2))
