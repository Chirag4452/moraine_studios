"""Portable, review-only closed/open wallpaper renderer. See --help."""
import argparse
import importlib.util
import json
import re
import shutil
import subprocess
import tempfile
from datetime import datetime, timezone
from pathlib import Path
from xml.sax.saxutils import escape

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageOps

ROOT = Path(__file__).resolve().parents[2]
SPEC = importlib.util.spec_from_file_location('approved_template', Path(__file__).with_name('render-apple-duo-sample.py'))
TEMPLATE = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(TEMPLATE)
POSES = [('closed', 'Outer Closed Portrait', (88,80,1486,2114), (772,1123)),
         ('open', 'Inner Open Landscape', (120,120,2973,2127), (1576,1109))]


def fit_box(size, ratio, focus_x, focus_y):
    """Cover a screen without changing the master or stretching its pixels."""
    w, h = size
    cw, ch = (max(1, round(h*ratio)), h) if w/h > ratio else (w, max(1, round(w/ratio)))
    left, top = round((w-cw)*focus_x), round((h-ch)*focus_y)
    return left, top, left+cw, top+ch


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('--master', '--input', dest='master', type=Path, required=True, help='Prepared master file or design directory under wallpaper(processed)/')
    p.add_argument('--name', required=True)
    p.add_argument('--finish', choices=['night-sky', 'star-white'], default='night-sky')
    p.add_argument('--output', type=Path, help='New review directory; existing directories are never overwritten')
    p.add_argument('--focus-x', type=float, default=.5, help='Horizontal screen crop position, 0=left, 1=right')
    p.add_argument('--focus-y', type=float, default=.5, help='Vertical screen crop position, 0=top, 1=bottom')
    p.add_argument('--depth-mask', type=Path, help='Optional grayscale mask matching the EXIF-oriented master: white hides clock, black shows it')
    p.add_argument('--keep-sources', action='store_true', help='Keep 4096px PNGs, editable SVGs and masks in sources/')
    p.add_argument('--review', action='store_true', help='Also save review.jpg and draft.json')
    args = p.parse_args()
    if not all(0 <= v <= 1 for v in [args.focus_x, args.focus_y]):
        p.error('Crop focus must be between 0 and 1')
    if not args.name.strip(): p.error('Name must not be empty')
    slug = re.sub(r'[^a-z0-9]+', '-', args.name.lower()).strip('-') or 'wallpaper'
    stamp = datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%S%fZ')
    dest = (args.output or ROOT / 'wallpaper(processed)' / 'reviews' / f'{slug}-{args.finish}-{stamp}').resolve()
    if dest.exists(): p.error(f'Output already exists: {dest}')
    if not shutil.which('node'): p.error('Node.js is required. Run npm ci --prefix store first.')
    masterpath = args.master.expanduser().resolve()
    if masterpath.is_dir():
        candidates = [f for f in masterpath.glob('master.*') if f.suffix.lower() in {'.png','.jpg','.jpeg','.webp'}]
        if len(candidates) != 1: p.error('Design directory must contain exactly one master image')
        masterpath = candidates[0]
    if (ROOT/'wallpaper(processed)').resolve() not in masterpath.parents or masterpath.stem != 'master':
        p.error('Use a prepared master under wallpaper(processed)/<slug>/master.*; raw files belong to preparation')
    if not masterpath.is_file(): p.error(f'Master not found: {masterpath}')
    src = ImageOps.exif_transpose(Image.open(masterpath)).convert('RGB')
    depth = None
    if args.depth_mask:
        depth = ImageOps.exif_transpose(Image.open(args.depth_mask)).convert('L')
        if depth.size != src.size: p.error('Depth mask dimensions must match the oriented master')
    finish = {'night-sky':'Night Sky', 'star-white':'Star White'}[args.finish]
    ui_path = ROOT/'store/scripts/assets/duo-reference-ui.json'
    shapes = json.loads(ui_path.read_text())
    dest.parent.mkdir(parents=True, exist_ok=True)
    # Stage the whole job so failed runs never leave a seemingly complete package.
    with tempfile.TemporaryDirectory(prefix='.render-', dir=dest.parent) as tmp:
        out = Path(tmp)
        work = out/'working'; work.mkdir()
        crop_boxes = {}
        outputs = []
        render_size = 4096 if args.keep_sources else 2400
        for pose, label, box, ref in POSES:
            framepath = ROOT/f'Bezel-iPhone-Duo/PNG/iPhone Duo - {finish} - {label}.png'
            frame = Image.open(framepath).convert('RGBA'); fw,fh = frame.size
            x,y,r,b = box; sw,sh = r-x,b-y
            crop = fit_box(src.size, sw/sh, args.focus_x, args.focus_y)
            crop_boxes[pose] = crop
            art = work/f'{pose}-art.png'
            src.crop(crop).save(art)
            art_uri = TEMPLATE.uri(art, 'image/png')
            alpha = np.asarray(frame)[:,:,3]
            flood = Image.fromarray((alpha<128).astype('uint8')*255).copy()
            ImageDraw.floodfill(flood, (fw//2,fh//2), 128)
            mask = Image.fromarray((np.asarray(flood)==128).astype('uint8')*255).filter(ImageFilter.MaxFilter(5))
            if mask.getpixel((0,0)) or not mask.getpixel((fw//2,fh//2)):
                raise ValueError(f'{pose}: screen mask leaked outside the frame')
            maskpath = out/f'{pose}-screen-mask.png'; mask.save(maskpath)
            clock, controls = TEMPLATE.ui(shapes, pose, art_uri)
            depthdef = ''; clockmask = ''
            if depth is not None:
                dp = out/'clock-visibility.png'; ImageOps.invert(depth.crop(crop)).save(dp)
                depthdef = f'<mask id="clock-visible" maskUnits="userSpaceOnUse" x="0" y="0" width="{ref[0]}" height="{ref[1]}"><image href="{TEMPLATE.uri(dp,"image/png")}" width="{ref[0]}" height="{ref[1]}" preserveAspectRatio="xMidYMid slice"/></mask>'
                clockmask = ' mask="url(#clock-visible)"'
            scale = min(3300/fw,3300/fh); tx=(4096-fw*scale)/2; ty=(4096-fh*scale)/2
            svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="4096" height="4096" viewBox="0 0 4096 4096"><title>{escape(args.name)} — {finish} — {pose}</title><defs><filter id="glass-blur" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="5"/></filter><linearGradient id="clock-color" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#eafbff"/><stop offset="1" stop-color="#fffde9"/></linearGradient><mask id="screen-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="{fw}" height="{fh}"><image href="{TEMPLATE.uri(maskpath,'image/png')}" width="{fw}" height="{fh}"/></mask></defs><rect width="4096" height="4096" fill="#e6e5e7"/><g id="device" transform="translate({tx} {ty}) scale({scale})"><g mask="url(#screen-mask)"><image id="wallpaper" href="{art_uri}" x="{x}" y="{y}" width="{sw}" height="{sh}" preserveAspectRatio="xMidYMid slice"/><g id="lock-screen" transform="translate({x} {y}) scale({sw/ref[0]} {sh/ref[1]})"><defs>{depthdef}</defs><g id="clock"{clockmask}>{clock}</g><g id="date-and-controls">{controls}</g></g></g><image id="apple-frame-with-camera" href="{TEMPLATE.uri(framepath,'image/png')}" width="{fw}" height="{fh}"/></g></svg>'''
            sp = out/f'{pose}.svg'; sp.write_text(svg)
            subprocess.run(['node',str(Path(__file__).with_name('render-svg.cjs')),str(sp),str(out/f'{pose}.png'),str(render_size)],check=True)
            with Image.open(out/f'{pose}.png') as rendered:
                if rendered.size != (render_size,render_size): raise ValueError('Unexpected render dimensions')
                rendered.convert('RGB').resize((2400,2400),Image.Resampling.LANCZOS).save(out/f'{pose}.webp',quality=95,method=6)
            entry = {'view':pose, 'preview':f'{pose}.webp'}
            if args.keep_sources:
                entry.update(master=f'sources/{pose}.png', editable=f'sources/{pose}.svg')
            outputs.append(entry)
        if args.review:
            contact = Image.new('RGB',(1800,950),'#e6e5e7'); draw = ImageDraw.Draw(contact)
            for i,(pose,*_) in enumerate(POSES):
                with Image.open(out/f'{pose}.png') as im:
                    contact.paste(im.convert('RGB').resize((900,900),Image.Resampling.LANCZOS),(i*900,0))
                draw.text((30+i*900,915),f'{finish} / {pose}',fill='#37393c')
            contact.save(out/'review.jpg',quality=95)
        working_files = list(out.glob('*.svg')) + [f for f in out.glob('*.png')]
        if args.keep_sources:
            sources = out/'sources'; sources.mkdir()
            for f in working_files: f.rename(sources/f.name)
        else:
            for f in working_files: f.unlink()
        shutil.rmtree(work)
        report = {'status':'draft-awaiting-laptop-review','name':args.name,'finish':args.finish,
                  'master':str(masterpath.relative_to(ROOT)), 'masterSize':src.size, 'screenCropBoxes':crop_boxes,
                  'fitting':'Each screen uses a temporary cover crop from the unchanged master; illustrative mockup',
                  'depthMask':bool(depth is not None),'clock':'9:41','date':'Wed Apr 1',
                  'outputs':outputs,
                  'previewSize':[2400,2400], 'keptSources':args.keep_sources,
                  'notes':['Mockup dimensions do not increase source wallpaper detail.',
                           'UI and device frame are preview-only. Review composition before publishing.'],
                  'sourceDetailWarning':src.width<2853 or src.height<2007}
        if args.review: (out/'draft.json').write_text(json.dumps(report,indent=2)+'\n')
        out.rename(dest)
    print(dest)

if __name__ == '__main__': main()
