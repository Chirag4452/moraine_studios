"""Render flattened marketplace images from local licensed Pixeden PSD layers.

Requires Pillow, numpy, psd-tools. Reads ../wallpaper(processed)/manifest.json.
Original PSDs stay unchanged and are never copied into public/. Screen geometry
is fitted to the actual black display opening in each PSD's device layer. This
is a local raster compositor, not a Photoshop smart-object document updater.
"""
from pathlib import Path
import json
import zipfile
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from psd_tools import PSDImage

ROOT = Path(__file__).resolve().parents[2]
PROCESSED = ROOT / 'wallpaper(processed)'
OUTPUT = ROOT / 'store/public/wallpapers/duo-landscapes'
REVIEW = PROCESSED / 'mockups'
SIZE = 4096
WEB_SIZE = 2400
SCALE = SIZE / 4800
RESAMPLE = Image.Resampling.LANCZOS


def layer_image(layer):
    return layer.topil().convert('RGBA').resize(
        (round(layer.width*SCALE), round(layer.height*SCALE)), RESAMPLE)


def place(scene, image, layer, origin):
    scene.alpha_composite(image, (round((layer.left-origin[0])*SCALE),
                                  round((layer.top-origin[1])*SCALE)))


def background():
    yy, xx = np.mgrid[:1600, :1600]
    light = np.maximum(0, 1 - np.sqrt(((xx-800)/1300)**2 + ((yy-600)/1400)**2))
    rgb = np.clip(np.array([224,218,214]) + light[...,None]*np.array([21,20,18]),0,255)
    return Image.fromarray(rgb.astype('uint8')).convert('RGBA').resize((SIZE,SIZE), RESAMPLE)


def screen_mask(frame):
    a = np.asarray(frame)
    black = (a[:,:,:3].max(2)<8) & (a[:,:,3]>250)
    mask = Image.fromarray(black.astype('uint8')*255).copy()
    ImageDraw.floodfill(mask, (frame.width//2, frame.height//2), 128)
    result = Image.fromarray((np.asarray(mask)==128).astype('uint8')*255)
    if result.getbbox() is None:
        raise ValueError('Device display opening not found')
    # Convex envelopes per leaf remove threshold notches while preserving the
    # fold's concave top/bottom. Coordinates are measured from this PSD itself.
    a = np.asarray(result)
    yy, xx = np.nonzero(a)
    split = (xx.min()+xx.max())//2
    def hull(points):
        points = sorted(set(points))
        def cross(o,a,b):return (a[0]-o[0])*(b[1]-o[1])-(a[1]-o[1])*(b[0]-o[0])
        lower=[];upper=[]
        for pt in points:
            while len(lower)>1 and cross(lower[-2],lower[-1],pt)<=0:lower.pop()
            lower.append(pt)
        for pt in reversed(points):
            while len(upper)>1 and cross(upper[-2],upper[-1],pt)<=0:upper.pop()
            upper.append(pt)
        return lower[:-1]+upper[:-1]
    clean=Image.new('L',frame.size)
    d=ImageDraw.Draw(clean)
    for lo,hi in [(int(xx.min()),int(split)),(int(split),int(xx.max()))]:
        points=[]
        for x in range(lo,hi+1):
            ys=np.flatnonzero(a[:,x])
            if len(ys):points.extend([(x,int(ys[0])),(x,int(ys[-1]))])
        d.polygon(hull(points),fill=255)
    return clean.filter(ImageFilter.GaussianBlur(.6))


def map_screen(art, mask, folded):
    """Map art into fitted panel boundaries, then apply exact rounded opening."""
    m = np.asarray(mask)>0
    x0,y0,x1,y1 = mask.getbbox()
    hinge = x0+(x1-x0)*.50
    columns = np.arange(mask.width)
    top = np.argmax(m,axis=0)
    bottom = mask.height-1-np.argmax(m[::-1],axis=0)
    def fit(lo,hi,values):
        indices=columns[(columns>=lo)&(columns<hi)]
        return np.polyfit(indices,values[indices],1)
    w=x1-x0
    if folded:
        # The left leaf recedes into the hinge, while the right leaf is front-on.
        hinge=x0+w*.50
        lt=fit(x0+w*.14,x0+w*.41,top); lb=fit(x0+w*.14,x0+w*.41,bottom)
        rt=fit(x0+w*.60,x0+w*.85,top); rb=fit(x0+w*.60,x0+w*.85,bottom)
        tt=np.where(columns<hinge,np.polyval(lt,columns),np.polyval(rt,columns))
        bb=np.where(columns<hinge,np.polyval(lb,columns),np.polyval(rb,columns))
        u=np.where(columns<hinge,(columns-x0)/(hinge-x0)*.5,
                   .5+(columns-hinge)/(x1-hinge)*.5)
    else:
        tt=np.polyval(fit(x0+w*.12,x0+w*.78,top),columns)
        bb=np.polyval(fit(x0+w*.12,x0+w*.78,bottom),columns)
        u=(columns-x0)/w
    src=np.asarray(art.convert('RGB'),dtype=np.float32)
    rgb_out=np.empty((mask.height,mask.width,3),dtype=np.uint8)
    for ystart in range(0,mask.height,128):
        yy,xx=np.mgrid[ystart:min(mask.height,ystart+128),:mask.width]
        v=(yy-tt[None,:])/np.maximum(1,bb-tt)[None,:]
        sx=np.broadcast_to(np.clip(u,0,1)*(art.width-1),v.shape)
        sy=np.clip(v,0,1)*(art.height-1)
        xi=sx.astype(int);yi=sy.astype(int)
        dx=(sx-xi)[...,None];dy=(sy-yi)[...,None]
        xj=np.minimum(xi+1,art.width-1);yj=np.minimum(yi+1,art.height-1)
        rgb=(src[yi,xi]*(1-dx)*(1-dy)+src[yi,xj]*dx*(1-dy)+
             src[yj,xi]*(1-dx)*dy+src[yj,xj]*dx*dy)
        sheen=np.maximum(0,1-np.abs(xx-mask.width*.22)/(mask.width*.48))*.035
        if folded:
            rgb*=np.where(xx<hinge,.90+.10*(xx/max(1,hinge)),1.0)[...,None]
        rgb=rgb*(1-sheen[...,None])+255*sheen[...,None]
        rgb_out[ystart:ystart+len(yy)]=np.clip(rgb,0,255).astype('uint8')
    result=Image.fromarray(rgb_out).convert('RGBA')
    result.putalpha(mask)
    return result


def template(path, folded):
    psd=PSDImage.open(path)
    layers=list(psd.descendants())
    frame_layer=next(l for l in layers if l.name=='iPhone Duo')
    frame=layer_image(frame_layer)
    mask=screen_mask(frame)
    origin=(1000,450) if folded else (1000,650)
    scene=background()
    shadow=Image.new('RGBA',(SIZE,SIZE))
    draw=ImageDraw.Draw(shadow)
    if folded:
        draw.ellipse(tuple(round(v*SIZE/1600) for v in (280,1160,1330,1300)),fill=(29,27,25,58))
    else:
        draw.ellipse(tuple(round(v*SIZE/1600) for v in (480,1030,1320,1470)),fill=(29,27,25,30))
    scene=Image.alpha_composite(scene,shadow.filter(ImageFilter.GaussianBlur(40*SIZE/1600)))
    place(scene,frame,frame_layer,origin)
    extras=[]
    if not folded:
        for l in layers:
            if l.name in ('Hand','cam'):
                extras.append((l,layer_image(l)))
    return scene,frame_layer,mask,origin,extras


def main():
    OUTPUT.mkdir(parents=True,exist_ok=True);REVIEW.mkdir(parents=True,exist_ok=True)
    specs=json.loads((PROCESSED/'manifest.json').read_text())
    sheets=[]
    for pose, folder in [
        ('handheld','Hand-Held-iPhone-Duo-Foldable-Smartphone-Free-PSD-Mockup'),
        ('folded','Foldable-iPhone-Duo-Opening-Up-Free-PSD-Mockup')]:
        path=next((ROOT/folder).glob('*.psd'))
        scene,layer,mask,origin,extras=template(path,pose=='folded')
        for spec in specs:
            slug=spec['slug']; src=PROCESSED/slug
            art=Image.open(src/('mockup-inner.jpg' if pose=='folded' else 'mockup-outer.jpg'))
            result=scene.copy()
            place(result,map_screen(art,mask,pose=='folded'),layer,origin)
            for extra,image in extras:place(result,image,extra,origin)
            rgb=result.convert('RGB')
            rgb.save(REVIEW/f'{slug}-{pose}.jpg',quality=95,subsampling=0)
            rgb.resize((WEB_SIZE,WEB_SIZE),RESAMPLE).save(OUTPUT/f'{slug}-{pose}.webp',quality=92,method=6)
            thumb=rgb.resize((400,400),RESAMPLE)
            sheets.append((pose,slug,thumb))
            print(f'Rendered {slug}: {pose}',flush=True)
    sheet=Image.new('RGB',(1600,860),'#efebe6')
    d=ImageDraw.Draw(sheet)
    for i,(pose,slug,thumb) in enumerate(sheets):
        x=(i%4)*400;y=(i//4)*430
        sheet.paste(thumb,(x,y));d.text((x+15,y+405),f'{slug} / {pose}',fill='#252525')
    sheet.save(REVIEW/'all-mockups.jpg',quality=92)
    setup='''Moraine Studio — Mountain Landscapes for iPhone Duo

Four JPEG wallpapers: Fuji at Dusk, Cloud Peaks, Violet Valley, Alpine Meadow.
Each design is one continuous landscape image, not a separate image per screen.

1. Save a JPEG to Photos on your iPhone.
2. Open it, tap Share, and choose Use as Wallpaper.
3. Adjust the framing, then follow iOS's prompts to finish.
4. Check the image with the phone open and closed and adjust if needed.

The supplied images retain their original crop resolution; they are not 4K.
Website device mockups illustrate the composition. Actual framing can vary
with iOS settings and device orientation.
'''
    with zipfile.ZipFile(PROCESSED/'mountain-landscapes-duo.zip','w',zipfile.ZIP_DEFLATED) as archive:
        for spec in specs:
            archive.write(PROCESSED/spec['slug']/'master.jpg',spec['slug']+'.jpg')
        archive.writestr('START-HERE.txt',setup)


if __name__=='__main__': main()
