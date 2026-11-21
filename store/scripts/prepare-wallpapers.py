"""Legacy import/export helper; does not perform the required AI enhancement.

Run with Python + Pillow. Source: ../wallpaper(raw).
Preserves composition and existing masters. Renderer creates working previews.
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
    'matterhorn': ('matterhorn', 'Matterhorn', .54),
    'kirkjufell-aurora': ('kirkjufell-aurora', 'Kirkjufell Aurora', .29),
    'mount-cook': ('mount-cook', 'Mount Cook', .49),
    'mountain-scenery': ('mountain-scenery', 'Mountain Scenery', .56),
    'mount-kailash': ('mount-kailash', 'Mount Kailash', .43),
    'mount-fuji-sunrise-4k': ('mount-fuji-sunrise', 'Mount Fuji Sunrise', .73),
}
OUT.mkdir(exist_ok=True)
rows = []
manifest_path = OUT/'manifest.json'
previous_manifest = json.loads(manifest_path.read_text()) if manifest_path.exists() else []
manifest = []
for path in sorted(SOURCE.iterdir()):
    if path.stem not in SPECS or path.suffix.lower() not in {'.jpg', '.jpeg', '.png', '.webp'}:
        continue
    slug, title, focus_y = SPECS[path.stem]
    dest = OUT / slug
    dest.mkdir(exist_ok=True)
    image = ImageOps.exif_transpose(Image.open(path)).convert('RGB')
    w, h = image.size
    if (dest/'master.jpg').exists():
        master = Image.open(dest/'master.jpg').convert('RGB')
    else:
        master = image.copy()
        master.save(dest/'master.jpg', quality=98, subsampling=0)
    cw, ch = master.size
    left, top = 0, 0
    # Central portrait window from the SAME master, never a separate composition.
    outer_w = round(ch*1398/2034)
    outer = master.crop(((cw-outer_w)//2, 0, (cw-outer_w)//2+outer_w, ch))
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
                     'download':'master.jpg',
                     'mockupInputs':['master.jpg'],
                     'note': ('AI recreation generated at 941 x 1672 and upscaled to 2160 x 3840 before cropping; not native 4K detail. '
                              if slug == 'mount-fuji-sunrise' else '') +
                            'Renderer reads the master and creates temporary working previews.'})
sheet = Image.new('RGB',(1400,520*len(rows)), '#f0efeb')
for i,row in enumerate(rows): sheet.paste(row,(0,i*520))
sheet.save(OUT/'crop-review.jpg',quality=90)
# Preserve AI-prepared designs and their provenance outside the legacy import list.
updated_slugs = {entry['slug'] for entry in manifest}
manifest.extend(entry for entry in previous_manifest if entry['slug'] not in updated_slugs)
manifest_path.write_text(json.dumps(manifest,indent=2)+'\n')
(OUT/'README.md').write_text('# Wallpaper assets\n\nPreserve raw originals in `../wallpaper(raw)/`.\nEach design folder retains one high-quality `master.jpg` only.\nThe renderer reads the master and creates temporary previews and device crops.\nDo not retain separate preview, inner, or outer artwork files.\n\nProcessing defaults to AI recreation or enhancement; the legacy preparation\nscript only imports/exports files and does not perform AI enhancement.\nExisting masters are preserved by that helper, including legacy landscape crops.\nConsult the root AGENTS.md for composition and review requirements.\nThe manifest records sources and dimensions. Upscaling does not add native detail.\n')
print(json.dumps(manifest,indent=2))
