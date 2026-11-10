"""Original editable SVG mockups: no Apple/Pixeden device pixels.

Use --wallpaper PATH --name NAME --finish night-sky|star-white --ui home|clean.
Defaults produce two sample sets. UI is illustrative, not an iOS screenshot.
"""
from pathlib import Path
import argparse,base64,subprocess
from PIL import Image,ImageDraw
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'wallpaper(processed)/original-mockups'

def path(w,h,r,left=None):
    l=r if left is None else left
    return f'M {l},0 H {w-r} Q {w},0 {w},{r} V {h-r} Q {w},{h} {w-r},{h} H {l} Q 0,{h} 0,{h-l} V {l} Q 0,0 {l},0 Z'

def ui(w,h,home):
    if not home: return ''
    # All interface geometry lives in a separate, editable SVG group.
    symbols='''<g fill="white"><rect x="0" y="13" width="4" height="5" rx="1"/><rect x="6" y="9" width="4" height="9" rx="1"/><rect x="12" y="5" width="4" height="13" rx="1"/><rect x="18" y="1" width="4" height="17" rx="1"/></g><g transform="translate(31 1)" fill="none" stroke="white" stroke-width="2.8" stroke-linecap="round"><path d="M0 5 Q10 -3 20 5 M4 10 Q10 5 16 10 M8 15 Q10 13 12 15"/></g><g transform="translate(63 2)"><rect width="29" height="15" rx="4" fill="none" stroke="white" stroke-width="1.7"/><rect x="3" y="3" width="21" height="9" rx="2" fill="white"/><path d="M32 5 V10" stroke="white" stroke-width="2"/></g>'''
    s=f'<g id="system-ui" font-family="Helvetica,Arial,sans-serif" fill="white"><text x="30" y="42" font-size="20" font-weight="600">9:41</text><g transform="translate({w-178} 24)">{symbols}</g><rect x="{w/2-66}" y="{h-19}" width="132" height="5" rx="2.5" opacity=".9"/>'
    if home:
        icons=[('#42b966','Phone','<path d="M19 13 Q10 26 29 40 Q39 46 43 35 L34 29 L28 34 Q18 28 23 22Z" fill="white"/>'),('#2fa8e5','Browser','<circle cx="28" cy="28" r="19" fill="none" stroke="white" stroke-width="2"/><path d="M35 17 L31 31 L20 39 L24 25Z" fill="white"/>'),('#48c768','Messages','<path d="M12 15 H44 V37 H25 L17 44 V37 H12Z" fill="white"/>'),('#8b909b','Camera','<rect x="9" y="18" width="38" height="27" rx="6" fill="#202733"/><path d="M19 18 L22 12 H35 L39 18" fill="#202733"/><circle cx="28" cy="31" r="9" fill="none" stroke="white" stroke-width="2"/>')]
        x=w/2-166;y=h-126
        s+=f'<g id="app-dock" transform="translate({x} {y})"><rect x="-15" y="-13" width="362" height="102" rx="30" fill="#edf2ff" fill-opacity=".18" stroke="white" stroke-opacity=".14"/>'
        for i,(color,label,icon) in enumerate(icons):
            s+=f'<g transform="translate({i*92} 0)"><rect width="56" height="56" rx="14" fill="{color}"/>{icon}<text x="28" y="75" text-anchor="middle" font-size="11">{label}</text></g>'
        s+='</g>'
    return s+'</g>'

def document(art,finish,pose,home):
    white=finish=='star-white';colors=['#929694','#fcfcf2','#858986','#e6e6dd','#6c7274'] if white else ['#607184','#1b2837','#718093','#14202e','#48576a']
    stops=''.join(f'<stop offset="{i/4}" stop-color="{c}"/>' for i,c in enumerate(colors))
    data=base64.b64encode(art.read_bytes()).decode()
    w,h=(580,844) if pose=='closed' else (1200,844)
    r=68 if pose=='closed' else 54
    corner=10 if pose=='closed' else r
    screen=path(w,h,r,corner)
    body=f'''<g id="device"><g id="shell" transform="translate(-14 -14)"><path d="{path(w+28,h+28,r+14,corner+5)}" fill="url(#metal)" stroke="#79818a" stroke-width="1.5"/><path transform="translate(5 5)" d="{path(w+18,h+18,r+9,corner+3)}" fill="#10141b" stroke="url(#rim)" stroke-width="3"/></g>
<clipPath id="screen"><path d="{screen}"/></clipPath><g id="wallpaper-and-ui" clip-path="url(#screen)"><image id="wallpaper" href="data:image/jpeg;base64,{data}" width="{w}" height="{h}" preserveAspectRatio="xMidYMid slice"/><rect width="{w}" height="85" fill="url(#status-shade)"/>{ui(w,h,home)}</g><path d="{screen}" fill="none" stroke="#080c12" stroke-width="3"/>
'''
    if pose=='closed':
        body+=f'<g id="cover-camera"><circle cx="{w-37}" cy="40" r="12" fill="#07090e"/><circle cx="{w-37}" cy="40" r="5" fill="#172338"/><circle cx="{w-38}" cy="38" r="1.6" fill="#495b78"/></g><path d="M-19 22 V820" stroke="url(#rim)" stroke-width="6"/>'
    else:
        body+='<rect id="fold-reflection" x="593" width="14" height="844" fill="url(#crease)"/><path d="M596 -14 H604 M596 858 H604" stroke="#101820" stroke-width="6"/>'
    body+=f'<g id="hardware-details"><path d="M{w+15} 235 V310 M{w+15} 352 V399" stroke="url(#rim)" stroke-width="5" stroke-linecap="round"/><path d="M100 -13 V-7 M{w-100} -13 V-7 M100 {h+7} V{h+14} M{w-100} {h+7} V{h+14}" stroke="#8b939c" stroke-width="4" opacity=".7"/></g></g>'
    if pose=='closed':placement=f'<g transform="translate(510 360)">{body}</g>'
    elif pose=='open':placement=f'<g transform="translate(200 360)">{body}</g>'
    else:
        # One shared screen/UI projected onto two adjoining leaves. The hinge
        # matches at x=600; outer corners remain rounded, inner seam stays whole.
        placement=f'<defs><g id="flat-device">{body}</g><clipPath id="left-leaf"><rect x="-30" y="-30" width="630" height="910"/></clipPath><clipPath id="right-leaf"><rect x="600" y="-30" width="630" height="910"/></clipPath></defs><g transform="translate(260 300)"><g transform="matrix(.8 .16 0 1 0 0)" clip-path="url(#left-leaf)"><use href="#flat-device"/></g><g transform="matrix(1 0 0 1 -120 96)" clip-path="url(#right-leaf)"><use href="#flat-device"/></g></g>'
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="4096" height="4096" viewBox="0 0 1600 1600"><title>Moraine Studio original device / {finish} / {pose}</title><defs><linearGradient id="metal" x2="1" y2=".7">{stops}</linearGradient><linearGradient id="rim"><stop stop-color="#cfd7dd"/><stop offset=".3" stop-color="#38404c"/><stop offset=".65" stop-color="#7a8794"/><stop offset="1" stop-color="#e6e9e4"/></linearGradient><linearGradient id="status-shade" x2="0" y2="1"><stop stop-color="#08101e" stop-opacity=".28"/><stop offset="1" stop-color="#08101e" stop-opacity="0"/></linearGradient><linearGradient id="crease"><stop stop-color="#000" stop-opacity="0"/><stop offset=".5" stop-color="#10131a" stop-opacity=".16"/><stop offset=".7" stop-color="#fff" stop-opacity=".09"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient><radialGradient id="bg"><stop stop-color="#f7f5f1"/><stop offset="1" stop-color="#e8e4de"/></radialGradient><filter id="shadow" x="-50%" y="-100%" width="200%" height="300%"><feGaussianBlur stdDeviation="22"/></filter></defs><rect width="1600" height="1600" fill="url(#bg)"/><ellipse cx="800" cy="1250" rx="{340 if pose=='closed' else 550}" ry="34" fill="#151d29" opacity=".17" filter="url(#shadow)"/>{placement}</svg>'''

def main():
    p=argparse.ArgumentParser();p.add_argument('--wallpaper',type=Path);p.add_argument('--name',default='custom');p.add_argument('--finish',choices=['night-sky','star-white'],default='night-sky');p.add_argument('--ui',choices=['home','clean'],default='home');a=p.parse_args()
    OUT.mkdir(parents=True,exist_ok=True)
    specs=[(a.name,a.wallpaper,a.finish)] if a.wallpaper else [('fuji-at-dusk',ROOT/'wallpaper(processed)/fuji-at-dusk/master.jpg','night-sky'),('alpine-meadow',ROOT/'wallpaper(processed)/alpine-meadow/master.jpg','star-white')]
    files=[]
    for name,art,finish in specs:
        for pose in ['closed','partial','open']:
            f=OUT/f'{name}-{finish}-{pose}.svg';f.write_text(document(art,finish,pose,a.ui=='home'));files.append(f)
    subprocess.run(['qlmanage','-t','-s','4096','-o',str(OUT),*[str(f) for f in files]],check=True)
    sheet=Image.new('RGB',(1500,1060),'#eeeae5');d=ImageDraw.Draw(sheet)
    for i,f in enumerate(files):
        png=f.with_suffix('.svg.png');target=f.with_suffix('.png');png.replace(target)
        im=Image.open(target).convert('RGB');im.resize((2400,2400),Image.Resampling.LANCZOS).save(f.with_suffix('.webp'),quality=93,method=6)
        x=(i%3)*500;y=(i//3)*530;sheet.paste(im.resize((500,500),Image.Resampling.LANCZOS),(x,y));d.text((x+18,y+505),f.stem,fill='#30343a')
    sheet.save(OUT/'review.jpg',quality=94)
    print(OUT)
if __name__=='__main__':main()
