"""One approved Fuji sample, using supplied Apple PNG frames and traced reference UI.
Local review only. No website updates. Outputs layered SVG and 4096px PNG.
"""
from pathlib import Path
import base64,json,subprocess,math
import numpy as np
from PIL import Image,ImageDraw,ImageFilter
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'wallpaper(processed)/apple-duo-fuji-review'
ASSETS=ROOT/'store/scripts/assets'
REF=Path('/var/folders/x_/p8f6_97s21z6bw3x5dncp2vm0000gn/T/codex-clipboard-468e2e33-5f4c-4506-9983-d39567b91de3.png')

def simplify(p,eps=.65):
    if len(p)<3:return p
    a=np.array(p[0]);b=np.array(p[-1]);v=b-a
    pts=np.array(p);den=np.linalg.norm(v)
    ds=np.abs(v[0]*(pts[:,1]-a[1])-v[1]*(pts[:,0]-a[0]))/den if den else np.linalg.norm(pts-a,axis=1)
    k=int(np.argmax(ds))
    if ds[k]<=eps:return [p[0],p[-1]]
    return simplify(p[:k+1],eps)[:-1]+simplify(p[k:],eps)

def trace(mask):
    edges={};h,w=mask.shape
    def edge(a,b):edges.setdefault(a,[]).append(b)
    for y,x in zip(*np.nonzero(mask)):
        x=int(x);y=int(y)
        if y==0 or not mask[y-1,x]:edge((x,y),(x+1,y))
        if x==w-1 or not mask[y,x+1]:edge((x+1,y),(x+1,y+1))
        if y==h-1 or not mask[y+1,x]:edge((x+1,y+1),(x,y+1))
        if x==0 or not mask[y,x-1]:edge((x,y+1),(x,y))
    paths=[]
    while edges:
        start=next(iter(edges));cur=start;points=[start]
        while True:
            nxt=edges[cur].pop()
            if not edges[cur]:del edges[cur]
            cur=nxt;points.append(cur)
            if cur==start:break
        if len(points)<7:continue
        # Split closed contour before simplification, preserving enclosed holes.
        mid=len(points)//2
        pts=simplify(points[:mid+1])+simplify(points[mid:])[1:-1]
        if len(pts)<3:continue
        mids=[((pts[i][0]+pts[(i+1)%len(pts)][0])/2,(pts[i][1]+pts[(i+1)%len(pts)][1])/2) for i in range(len(pts))]
        d=f'M{mids[-1][0]:.2f},{mids[-1][1]:.2f}'
        for p,m in zip(pts,mids):d+=f' Q{p[0]},{p[1]} {m[0]:.2f},{m[1]:.2f}'
        paths.append(d+'Z')
    return ' '.join(paths)

def shapes():
    f=ASSETS/'duo-reference-ui.json'
    if f.exists():return json.loads(f.read_text())
    a=np.asarray(Image.open(REF).convert('RGB'))
    boxes={'clock':(1788,582,2165,895),'date':(1886,526,2068,573),'network':(2647,502,2726,579),'torch':(945,1343,973,1393),'camera':(934,1457,984,1503)}
    result={}
    for name,(x,y,r,b) in boxes.items():
        mask=a[y:b,x:r].min(2)>220
        # Suppress single-pixel video/threshold stair steps before vector fitting.
        mask=np.asarray(Image.fromarray(mask.astype('uint8')*255).filter(ImageFilter.GaussianBlur(.65)))>127
        result[name]={'width':r-x,'height':b-y,'path':trace(mask),'sourceBox':[x,y,r,b]}
    ASSETS.mkdir(exist_ok=True);f.write_text(json.dumps(result,indent=2));return result

def uri(p,mime):return f'data:{mime};base64,'+base64.b64encode(p.read_bytes()).decode()

def ui(sh,pose,art_uri):
    closed=pose=='closed';ox,oy=(267,454) if closed else (1190,461)
    def glyph(name,x,y,w=None,h=None,fill='white'):
        v=sh[name];w=v['width'] if w is None else w;h=v['height'] if h is None else h
        return f'<g transform="translate({x-ox} {y-oy}) scale({w/v["width"]} {h/v["height"]})"><path d="{v["path"]}" fill="{fill}" fill-rule="evenodd"/></g>'
    # Clock from unobstructed open reference, fitted to the closed clock width.
    clock=glyph('clock',391 if closed else 1788,574 if closed else 582,399 if closed else None,fill='url(#clock-color)')
    date=glyph('date',501 if closed else 1886,519 if closed else 526)
    network=glyph('network',920 if closed else 2647,590 if closed else 502)
    cx=958 if closed else 2686;cy=1367 if closed else 1361
    controls=''
    for name,y in [('torch',cy),('camera',cy+112)]:
        rw,rh=(772,1123) if closed else (1576,1109)
        controls+=f'<defs><clipPath id="glass-{name}"><circle cx="{cx-ox}" cy="{y-oy}" r="40"/></clipPath></defs><g clip-path="url(#glass-{name})"><image href="{art_uri}" width="{rw}" height="{rh}" preserveAspectRatio="xMidYMid slice" filter="url(#glass-blur)"/></g>'
        controls+=f'<circle cx="{cx-ox}" cy="{y-oy+1}" r="41" fill="#131820" opacity=".14"/><circle cx="{cx-ox}" cy="{y-oy}" r="40" fill="#e5dfd3" fill-opacity=".24" stroke="#fff9e9" stroke-opacity=".48" stroke-width="1.4"/>'
        # Preserve the captured glyph contours; align their original centers.
        controls+=glyph(name,cx-(13 if name=='torch' else 24),y-(24 if name=='torch' else 22))
    x,y,w,h=(515,1556,275,8) if closed else (1752,1547,452,10)
    home=f'<rect x="{x-ox}" y="{y-oy}" width="{w}" height="{h}" rx="{h/2}" fill="#fffef8"/>'
    return clock,date+network+controls+home

def main():
    OUT.mkdir(parents=True,exist_ok=True);sh=shapes();renders=[]
    art=ROOT/'wallpaper(processed)/fuji-at-dusk/master.jpg'
    for pose,label,box,refsize in [('closed','Outer Closed Portrait',(88,80,1486,2114),(772,1123)),('open','Inner Open Landscape',(120,120,2973,2127),(1576,1109))]:
        fp=ROOT/f'Bezel-iPhone-Duo/PNG/iPhone Duo - Night Sky - {label}.png'
        frame=Image.open(fp).convert('RGBA');fw,fh=frame.size;x,y,r,b=box;sw,shh=r-x,b-y
        # Isolate only the connected transparent display. Preserve source frame
        # alpha, corner antialiasing and camera pixels above the wallpaper.
        aa=np.asarray(frame)[:,:,3]
        flood=Image.fromarray((aa<128).astype('uint8')*255).copy()
        ImageDraw.floodfill(flood,(fw//2,fh//2),128)
        mask=Image.fromarray((np.asarray(flood)==128).astype('uint8')*255).filter(ImageFilter.MaxFilter(5))
        mp=OUT/f'{pose}-screen-mask.png';mask.save(mp)
        clock,other=ui(sh,pose,uri(art,'image/jpeg'))
        # Hand-fitted Fuji skyline in original master coordinates, saved as a
        # separate mask. It only occludes the clock, never the other controls.
        skyline=[(0,304),(54,292),(100,283),(147,270),(192,255),(229,244),(270,225),(309,205),(335,186),(352,183),(368,184),(380,181),(394,188),(430,211),(465,233),(510,257),(552,273),(610,286),(670,295),(724,304)]
        # Actual center crop: the portrait image is 349.8px wide in the 724px master.
        cropw=509*sw/shh;cropx=(724-cropw)/2
        points=' '.join(f'{(xx-cropx)/cropw*refsize[0]:.3f},{yy/509*refsize[1]:.3f}' for xx,yy in skyline)
        depth=f'<clipPath id="sky-only"><polygon points="{-1000},-10 {refsize[0]+1000},-10 '+ ' '.join(reversed(points.split()))+'"/></clipPath>' if pose=='closed' else ''
        clocklayer=f'<g id="clock"'+(' clip-path="url(#sky-only)"' if pose=='closed' else '')+f'>{clock}</g>'
        # Same scale in x/y to preserve original frame proportions. Square canvas.
        scale=min(3300/fw,3300/fh);tx=(4096-fw*scale)/2;ty=(4096-fh*scale)/2
        svg=f'''<svg xmlns="http://www.w3.org/2000/svg" width="4096" height="4096" viewBox="0 0 4096 4096"><title>Fuji at Dusk — Night Sky — {pose}</title><defs><filter id="glass-blur" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="5"/></filter><linearGradient id="clock-color" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#eafbff"/><stop offset="1" stop-color="#fffde9"/></linearGradient><mask id="screen-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="{fw}" height="{fh}"><image href="{uri(mp,'image/png')}" width="{fw}" height="{fh}"/></mask></defs><rect width="4096" height="4096" fill="#e6e5e7"/><g id="device" transform="translate({tx} {ty}) scale({scale})"><g mask="url(#screen-mask)"><image id="wallpaper" href="{uri(art,'image/jpeg')}" x="{x}" y="{y}" width="{sw}" height="{shh}" preserveAspectRatio="xMidYMid slice"/><g id="lock-screen" transform="translate({x} {y}) scale({sw/refsize[0]} {shh/refsize[1]})"><defs>{depth}</defs>{clocklayer}<g id="date-and-controls">{other}</g></g></g><image id="apple-frame-with-camera" href="{uri(fp,'image/png')}" width="{fw}" height="{fh}"/></g></svg>'''
        f=OUT/f'fuji-at-dusk-night-sky-{pose}.svg';f.write_text(svg);renders.append(f)
    subprocess.run(['qlmanage','-t','-s','4096','-o',str(OUT),*[str(p) for p in renders]],check=True)
    sheet=Image.new('RGB',(1800,950),'#e6e5e7');d=ImageDraw.Draw(sheet)
    devices=[]
    for i,p in enumerate(renders):
        target=p.with_suffix('.png');p.with_suffix('.svg.png').replace(target)
        im=Image.open(target).convert('RGB');im.resize((2400,2400),Image.Resampling.LANCZOS).save(p.with_suffix('.webp'),quality=95,method=6)
        # Crop the known centered device canvas for a common-height comparison.
        fw,fh=((1574,2194) if i==0 else (3093,2247));sc=min(3300/fw,3300/fh)
        bx=(4096-fw*sc)/2;by=(4096-fh*sc)/2
        devices.append(im.crop((round(bx),round(by),round(bx+fw*sc),round(by+fh*sc))))
        sheet.paste(im.resize((900,900),Image.Resampling.LANCZOS),(i*900,0));d.text((i*900+30,915),'Fuji at Dusk / Night Sky / '+('Closed' if i==0 else 'Fully open'),fill='#37393c')
    sheet.save(OUT/'individual-review.jpg',quality=96)
    paired=Image.new('RGB',(4096,2450),'#e6e5e7')
    h=1780;x=180;y=320
    for device in devices:
        w=round(h*device.width/device.height);paired.paste(device.resize((w,h),Image.Resampling.LANCZOS),(x,y));x+=w+150
    paired.save(OUT/'fuji-at-dusk-pair.png')
    paired.resize((1800,1077),Image.Resampling.LANCZOS).save(OUT/'review-pair.jpg',quality=96)
    print(OUT)
if __name__=='__main__':main()
