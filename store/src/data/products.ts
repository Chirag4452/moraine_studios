export interface Product {
  id: string;
  slug: string;
  title: string;
  price: number;
  compareAtPrice?: number;
  isBestSeller?: boolean;
  isSale?: boolean;
  isFeatured?: boolean;
  gallery?: { src: string; alt: string; label?: string; view?: string }[];
  downloadSummary?: { label: string; value: string }[];
  previewNote?: string;
  creator?: string;
  description?: string[];
  included?: string[];
  designs?: { title: string; description: string }[];
  imageColors: string[]; // Colors used for the placeholder product image
  gradientStyle: "linear" | "radial" | "conic" | "mesh" | "minimal-grid" | "layers" | "circles" | "stacks";
}

export const PRODUCTS: Product[] = [
  {
    id: "ps-01",
    slug: "the-wallpaper-bundle",
    title: "The Wallpaper Bundle",
    price: 12500,
    compareAtPrice: 33700,
    isSale: true,
    imageColors: ["#1a1a3e", "#2c3e8a", "#4169c4", "#7db4e0"],
    gradientStyle: "layers",
  },
  {
    id: "ps-02",
    slug: "musicwall-for-mac",
    title: "MusicWall for Mac",
    price: 1400,
    imageColors: ["#c2540a", "#d4710a", "#e88c2a", "#f0a84a"],
    gradientStyle: "radial",
  },
  {
    id: "ps-03",
    slug: "moraine-studio-wallpapers-app",
    title: "Moraine Studio Wallpapers App",
    price: 500,
    imageColors: ["#f5f5f5", "#e8e8e8", "#d0d0d0", "#b8b8b8"],
    gradientStyle: "minimal-grid",
  },
  {
    id: "ps-04",
    slug: "3d-stacks-wallpaper-pack",
    title: "3D Stacks Wallpaper Pack",
    price: 1900,
    imageColors: ["#000000", "#1a0030", "#3d0066", "#6600aa"],
    gradientStyle: "stacks",
  },
  {
    id: "ps-05",
    slug: "3d-circles-wallpaper-pack",
    title: "3D Circles Wallpaper Pack",
    price: 1900,
    imageColors: ["#e8d0f0", "#d4a0e8", "#c080d8", "#a060c8"],
    gradientStyle: "circles",
  },
  {
    id: "ps-06",
    slug: "ecliptic-wallpaper-pack",
    title: "Ecliptic Wallpaper Pack",
    price: 1600,
    imageColors: ["#0a1628", "#1a2a48", "#2a4a78", "#4a7ab8"],
    gradientStyle: "radial",
  },
  {
    id: "ps-07",
    slug: "chroma-wallpaper-pack",
    title: "Chroma Wallpaper Pack",
    price: 1600,
    isBestSeller: true,
    imageColors: ["#ff6b35", "#ff3864", "#b91cff", "#4d21ff"],
    gradientStyle: "conic",
  },
  {
    id: "ps-08",
    slug: "color-layers-wallpaper-pack",
    title: "Color Layers Wallpaper Pack",
    price: 1600,
    imageColors: ["#0052d4", "#4364f7", "#6fb1fc", "#a0d2ff"],
    gradientStyle: "layers",
  },
  {
    id: "ps-09",
    slug: "devices-wallpapers-pack",
    title: "Devices Wallpapers Pack",
    price: 1600,
    imageColors: ["#1a1a2e", "#2d2d44", "#414158", "#5a5a70"],
    gradientStyle: "minimal-grid",
  },
  {
    id: "ps-10",
    slug: "dark-layers-wallpaper-pack",
    title: "Dark Layers Wallpaper Pack",
    price: 1600,
    imageColors: ["#0a0a12", "#1a1a2e", "#2a2a44", "#3a3a5a"],
    gradientStyle: "layers",
  },
  {
    id: "ps-11",
    slug: "ferrari-488-wallpaper-pack",
    title: "Ferrari 488 Wallpaper Pack",
    price: 900,
    imageColors: ["#8b0000", "#cc0000", "#e83030", "#ff6060"],
    gradientStyle: "radial",
  },
  {
    id: "ps-12",
    slug: "influx-wallpaper-pack",
    title: "Influx Wallpaper Pack",
    price: 1600,
    imageColors: ["#1a0a30", "#3a1a60", "#6030a0", "#8a50d0"],
    gradientStyle: "mesh",
  },
  {
    id: "ps-13",
    slug: "lo-fi-setups-wallpaper-pack",
    title: "Lo-fi Setups Wallpaper Pack",
    price: 1600,
    imageColors: ["#2a3a1a", "#4a5a2a", "#6a7a3a", "#8a9a4a"],
    gradientStyle: "radial",
  },
  {
    id: "ps-14",
    slug: "blur-wallpapers-01",
    title: "Blur Wallpapers 01",
    price: 900,
    isBestSeller: true,
    imageColors: ["#1a2a4a", "#2a4a7a", "#4a6aaa", "#7a9ada"],
    gradientStyle: "mesh",
  },
  {
    id: "ps-15",
    slug: "plant-wallpaper-pack",
    title: "Plant Wallpaper Pack",
    price: 900,
    imageColors: ["#1a3a1a", "#2a5a2a", "#3a7a3a", "#5aaa5a"],
    gradientStyle: "radial",
  },
  {
    id: "ps-16",
    slug: "distortion-wallpaper-pack",
    title: "Distortion Wallpaper Pack",
    price: 1600,
    imageColors: ["#0a2a2a", "#1a5050", "#2a8080", "#40b0b0"],
    gradientStyle: "conic",
  },
  {
    id: "ps-17",
    slug: "gradient-blur-wallpaper-pack",
    title: "Gradient Blur Wallpaper Pack",
    price: 1600,
    imageColors: ["#00b4d8", "#0096c7", "#0077b6", "#023e8a"],
    gradientStyle: "mesh",
  },
  {
    id: "ps-18",
    slug: "color-waves-wallpaper-pack",
    title: "Color Waves Wallpaper Pack",
    price: 1600,
    imageColors: ["#ff6b00", "#ff8c38", "#ffad60", "#ffd088"],
    gradientStyle: "linear",
  },
  {
    id: "ps-19",
    slug: "abstract-shapes-pack",
    title: "Abstract Shapes Pack",
    price: 1200,
    imageColors: ["#ff0080", "#ff4da6", "#ff80c0", "#ffb3da"],
    gradientStyle: "conic",
  },
  {
    id: "ps-20",
    slug: "ocean-gradient-pack",
    title: "Ocean Gradient Pack",
    price: 900,
    imageColors: ["#001233", "#001845", "#002855", "#003566"],
    gradientStyle: "linear",
  },
  {
    id: "ps-21",
    slug: "neon-glow-wallpaper-pack",
    title: "Neon Glow Wallpaper Pack",
    price: 1600,
    imageColors: ["#0d0221", "#250541", "#3a0663", "#6b0f9b"],
    gradientStyle: "radial",
  },
  {
    id: "ps-22",
    slug: "sunset-gradient-pack",
    title: "Sunset Gradient Pack",
    price: 1200,
    imageColors: ["#ff6b6b", "#ee5a6f", "#d43d71", "#b91c72"],
    gradientStyle: "linear",
  },
  {
    id: "ps-23",
    slug: "minimal-lines-pack",
    title: "Minimal Lines Pack",
    price: 900,
    imageColors: ["#f0f0f0", "#d8d8d8", "#c0c0c0", "#a8a8a8"],
    gradientStyle: "minimal-grid",
  },
  {
    id: "ps-24",
    slug: "aurora-wallpaper-pack",
    title: "Aurora Wallpaper Pack",
    price: 1600,
    imageColors: ["#004d40", "#00695c", "#00897b", "#26a69a"],
    gradientStyle: "mesh",
  },
  {
    id: "ps-25",
    slug: "texture-wallpaper-pack",
    title: "Texture Wallpaper Pack",
    price: 1200,
    imageColors: ["#3e2723", "#4e342e", "#5d4037", "#6d4c41"],
    gradientStyle: "radial",
  },
  {
    id: "ps-26",
    slug: "cosmic-dust-pack",
    title: "Cosmic Dust Pack",
    price: 1600,
    imageColors: ["#0b0033", "#1a0066", "#2a0099", "#4400cc"],
    gradientStyle: "mesh",
  },
  {
    id: "ps-27",
    slug: "pastel-dreams-pack",
    title: "Pastel Dreams Pack",
    price: 900,
    imageColors: ["#fce4ec", "#f8bbd0", "#f48fb1", "#ec407a"],
    gradientStyle: "mesh",
  },
  {
    id: "ps-28",
    slug: "dark-matter-pack",
    title: "Dark Matter Pack",
    price: 1600,
    imageColors: ["#0a0a0a", "#1a1a1a", "#2a2a2a", "#3a3a3a"],
    gradientStyle: "radial",
  },
  {
    id: "ps-29",
    slug: "tropical-vibes-pack",
    title: "Tropical Vibes Pack",
    price: 1200,
    imageColors: ["#00b09b", "#96c93d", "#c0e218", "#e8f500"],
    gradientStyle: "linear",
  },
  {
    id: "ps-30",
    slug: "glass-morphism-pack",
    title: "Glass Morphism Pack",
    price: 1600,
    imageColors: ["#667eea", "#764ba2", "#8b5cf6", "#a78bfa"],
    gradientStyle: "mesh",
  },
  {
    id: "ps-31",
    slug: "mountain-peaks-pack",
    title: "Mountain Landscapes for iPhone Duo",
    downloadSummary: [
      { label: "Files", value: "4 JPEG wallpapers + setup guide" },
      { label: "Resolution", value: "552 × 388 to 853 × 600 px; varies by wallpaper" },
      { label: "Layout", value: "One landscape image per design for open and closed iPhone Duo displays" },
    ],
    previewNote: "Phone frames, clock, and controls are shown for illustration. Your download contains the wallpaper artwork and setup guide.",
    price: 900,
    isFeatured: true,
    creator: "Moraine Studio",
    gallery: [
      { src: "/wallpapers/duo-landscapes/fuji-at-dusk-night-sky-closed.webp", alt: "Fuji at Dusk lock-screen wallpaper on a closed Night Sky iPhone Duo", label: "Fuji at Dusk · Closed", view: "Closed" },
      { src: "/wallpapers/duo-landscapes/fuji-at-dusk-night-sky-open.webp", alt: "Fuji at Dusk lock-screen wallpaper on a fully open Night Sky iPhone Duo", label: "Fuji at Dusk · Fully open", view: "Fully open" },
      { src: "/wallpapers/duo-landscapes/cloud-peaks-handheld.webp", alt: "Cloud Peaks wallpaper on a closed iPhone Duo held in a hand", label: "Cloud Peaks · Closed", view: "Closed" },
      { src: "/wallpapers/duo-landscapes/cloud-peaks-folded.webp", alt: "Cloud Peaks wallpaper across a partially open iPhone Duo", label: "Cloud Peaks · Partially open", view: "Partially open" },
      { src: "/wallpapers/duo-landscapes/violet-valley-handheld.webp", alt: "Violet Valley wallpaper on a closed iPhone Duo held in a hand", label: "Violet Valley · Closed", view: "Closed" },
      { src: "/wallpapers/duo-landscapes/violet-valley-folded.webp", alt: "Violet Valley wallpaper across a partially open iPhone Duo", label: "Violet Valley · Partially open", view: "Partially open" },
      { src: "/wallpapers/duo-landscapes/alpine-meadow-handheld.webp", alt: "Alpine Meadow wallpaper on a closed iPhone Duo held in a hand", label: "Alpine Meadow · Closed", view: "Closed" },
      { src: "/wallpapers/duo-landscapes/alpine-meadow-folded.webp", alt: "Alpine Meadow wallpaper across a partially open iPhone Duo", label: "Alpine Meadow · Partially open", view: "Partially open" },
    ],
    description: [
      "Four mountain landscapes, from violet valleys and cloud-covered peaks to sunlit meadows and Fuji at dusk.",
      "Each design is one continuous landscape image with its subject kept visible in a central portrait crop. Save the image to Photos and choose Use as Wallpaper, then adjust the framing to your preference.",
      "Images are supplied at their original crop resolution. These are not 4K files. Device mockups illustrate the compositions; your wallpaper framing can vary with iOS settings and orientation.",
    ],
    included: [
      "4 landscape JPEG wallpapers",
      "Violet Valley, Cloud Peaks, Alpine Meadow, and Fuji at Dusk",
      "One image per design for both display shapes",
      "Simple wallpaper setup instructions",
    ],
    imageColors: ["#1b2838", "#2c3e50", "#34495e", "#4a6572"],
    gradientStyle: "layers",
  },
  {
    "id": "ps-36",
    "slug": "mountain-landscapes-ii-iphone-duo",
    "title": "Mountain Landscapes II for iPhone Duo",
    "price": 900,
    "isFeatured": true,
    "creator": "Moraine Studio",
    "gallery": [
      {
        "src": "/wallpapers/duo-mountains-ii/aurora-snowfields-closed.webp",
        "alt": "Aurora Snowfields wallpaper with lock-screen time and controls on a closed Night Sky iPhone Duo",
        "label": "Aurora Snowfields · Closed",
        "view": "Closed"
      },
      {
        "src": "/wallpapers/duo-mountains-ii/aurora-snowfields-open.webp",
        "alt": "Aurora Snowfields wallpaper with lock-screen time and controls on a fully open Night Sky iPhone Duo",
        "label": "Aurora Snowfields · Fully open",
        "view": "Fully open"
      },
      {
        "src": "/wallpapers/duo-mountains-ii/fuji-cherry-blossoms-closed.webp",
        "alt": "Fuji Cherry Blossoms wallpaper with lock-screen time and controls on a closed Star White iPhone Duo",
        "label": "Fuji Cherry Blossoms · Closed",
        "view": "Closed"
      },
      {
        "src": "/wallpapers/duo-mountains-ii/fuji-cherry-blossoms-open.webp",
        "alt": "Fuji Cherry Blossoms wallpaper with lock-screen time and controls on a fully open Star White iPhone Duo",
        "label": "Fuji Cherry Blossoms · Fully open",
        "view": "Fully open"
      },
      {
        "src": "/wallpapers/duo-mountains-ii/alpine-rainbow-valley-closed.webp",
        "alt": "Alpine Rainbow Valley wallpaper with lock-screen time and controls on a closed Star White iPhone Duo",
        "label": "Alpine Rainbow Valley · Closed",
        "view": "Closed"
      },
      {
        "src": "/wallpapers/duo-mountains-ii/alpine-rainbow-valley-open.webp",
        "alt": "Alpine Rainbow Valley wallpaper with lock-screen time and controls on a fully open Star White iPhone Duo",
        "label": "Alpine Rainbow Valley · Fully open",
        "view": "Fully open"
      },
      {
        "src": "/wallpapers/duo-mountains-ii/fuji-violet-twilight-closed.webp",
        "alt": "Fuji Violet Twilight wallpaper with lock-screen time and controls on a closed Night Sky iPhone Duo",
        "label": "Fuji Violet Twilight · Closed",
        "view": "Closed"
      },
      {
        "src": "/wallpapers/duo-mountains-ii/fuji-violet-twilight-open.webp",
        "alt": "Fuji Violet Twilight wallpaper with lock-screen time and controls on a fully open Night Sky iPhone Duo",
        "label": "Fuji Violet Twilight · Fully open",
        "view": "Fully open"
      }
    ],
    "downloadSummary": [
      {
        "label": "Files",
        "value": "4 landscape PNG wallpapers"
      },
      {
        "label": "Resolution",
        "value": "1515 × 1038 px (Aurora); 1494 × 1052 px (other designs)"
      },
      {
        "label": "Layout",
        "value": "One landscape artwork per design, composed for an open display and a central portrait crop"
      },
      {
        "label": "Previews",
        "value": "8 device views: closed and fully open for each design"
      }
    ],
    "previewNote": "Device frames, time, and controls appear only in the previews. The wallpaper artwork is supplied without interface elements. Framing may vary with your wallpaper settings.",
    "description": [
      "From the hush of a snow-covered night to cherry blossoms beneath Mount Fuji, four mountain scenes follow the light through changing seasons. Cool aurora, soft spring colour, sunlit valley mist, and violet twilight give each screen a different atmosphere.",
      "Each wallpaper is a continuous landscape composition with its focal mountain kept near the centre. Explore all four designs in closed and fully open views, then adjust the framing to suit your screen.",
      "These are AI-recreated landscapes, supplied at their generated dimensions. The 2400 × 2400 px device previews are presentation images; the wallpaper files are the landscape PNGs listed above."
    ],
    "designs": [
      {
        "title": "Aurora Snowfields",
        "description": "A ribbon of aurora drifts above a quiet, snow-covered ridge. Deep blues and luminous sky bring a little of the stillness of a winter night to your screen."
      },
      {
        "title": "Fuji Cherry Blossoms",
        "description": "Mount Fuji rises beyond a frame of delicate cherry blossoms. Soft pinks, clear air, and the snow-capped summit capture the gentle colour of spring."
      },
      {
        "title": "Alpine Rainbow Valley",
        "description": "Sunlight opens through the mist above a green mountain valley, leaving a trace of rainbow in the haze. Layered ridges and woodland give this scene its depth and quiet warmth."
      },
      {
        "title": "Fuji Violet Twilight",
        "description": "Mount Fuji settles into the violet light of evening. A restrained palette and an open sky let the mountain hold the scene as daylight fades."
      }
    ],
    "included": [
      "4 landscape PNG wallpaper artworks",
      "Aurora Snowfields, Fuji Cherry Blossoms, Alpine Rainbow Valley, and Fuji Violet Twilight",
      "Clean artwork without device frames, clocks, or controls",
      "One composition per design, with screen framing adjustable during setup"
    ],
    "imageColors": [
      "#19394d",
      "#977cae",
      "#b9cfc3",
      "#edd7dd"
    ],
    "gradientStyle": "layers"
  },
  {
    "id": "ps-37",
    "slug": "acrylic-studies-iphone-duo",
    "title": "Acrylic Studies for iPhone Duo",
    "price": 900,
    "isFeatured": true,
    "creator": "Moraine Studio",
    "gallery": [
      {
        "src": "/wallpapers/duo-acrylic-studies/electric-sweep-closed.webp",
        "alt": "Electric Sweep acrylic wallpaper with lock-screen time and controls on a closed Night Sky iPhone Duo",
        "label": "Electric Sweep \u00b7 Closed",
        "view": "Closed"
      },
      {
        "src": "/wallpapers/duo-acrylic-studies/electric-sweep-open.webp",
        "alt": "Electric Sweep acrylic wallpaper with lock-screen time and controls on a fully open Night Sky iPhone Duo",
        "label": "Electric Sweep \u00b7 Fully open",
        "view": "Fully open"
      },
      {
        "src": "/wallpapers/duo-acrylic-studies/moss-folds-closed.webp",
        "alt": "Moss Folds acrylic wallpaper with lock-screen time and controls on a closed Star White iPhone Duo",
        "label": "Moss Folds \u00b7 Closed",
        "view": "Closed"
      },
      {
        "src": "/wallpapers/duo-acrylic-studies/moss-folds-open.webp",
        "alt": "Moss Folds acrylic wallpaper with lock-screen time and controls on a fully open Star White iPhone Duo",
        "label": "Moss Folds \u00b7 Fully open",
        "view": "Fully open"
      },
      {
        "src": "/wallpapers/duo-acrylic-studies/orbit-pop-closed.webp",
        "alt": "Orbit Pop acrylic wallpaper with lock-screen time and controls on a closed Night Sky iPhone Duo",
        "label": "Orbit Pop \u00b7 Closed",
        "view": "Closed"
      },
      {
        "src": "/wallpapers/duo-acrylic-studies/orbit-pop-open.webp",
        "alt": "Orbit Pop acrylic wallpaper with lock-screen time and controls on a fully open Night Sky iPhone Duo",
        "label": "Orbit Pop \u00b7 Fully open",
        "view": "Fully open"
      },
      {
        "src": "/wallpapers/duo-acrylic-studies/woven-horizons-closed.webp",
        "alt": "Woven Horizons acrylic wallpaper with lock-screen time and controls on a closed Night Sky iPhone Duo",
        "label": "Woven Horizons \u00b7 Closed",
        "view": "Closed"
      },
      {
        "src": "/wallpapers/duo-acrylic-studies/woven-horizons-open.webp",
        "alt": "Woven Horizons acrylic wallpaper with lock-screen time and controls on a fully open Night Sky iPhone Duo",
        "label": "Woven Horizons \u00b7 Fully open",
        "view": "Fully open"
      },
      {
        "src": "/wallpapers/duo-acrylic-studies/meadow-atlas-closed.webp",
        "alt": "Meadow Atlas acrylic wallpaper with lock-screen time and controls on a closed Star White iPhone Duo",
        "label": "Meadow Atlas \u00b7 Closed",
        "view": "Closed"
      },
      {
        "src": "/wallpapers/duo-acrylic-studies/meadow-atlas-open.webp",
        "alt": "Meadow Atlas acrylic wallpaper with lock-screen time and controls on a fully open Star White iPhone Duo",
        "label": "Meadow Atlas \u00b7 Fully open",
        "view": "Fully open"
      },
      {
        "src": "/wallpapers/duo-acrylic-studies/saffron-orchard-closed.webp",
        "alt": "Saffron Orchard acrylic wallpaper with lock-screen time and controls on a closed Night Sky iPhone Duo",
        "label": "Saffron Orchard \u00b7 Closed",
        "view": "Closed"
      },
      {
        "src": "/wallpapers/duo-acrylic-studies/saffron-orchard-open.webp",
        "alt": "Saffron Orchard acrylic wallpaper with lock-screen time and controls on a fully open Night Sky iPhone Duo",
        "label": "Saffron Orchard \u00b7 Fully open",
        "view": "Fully open"
      },
      {
        "src": "/wallpapers/duo-acrylic-studies/quiet-eddies-closed.webp",
        "alt": "Quiet Eddies acrylic wallpaper with lock-screen time and controls on a closed Star White iPhone Duo",
        "label": "Quiet Eddies \u00b7 Closed",
        "view": "Closed"
      },
      {
        "src": "/wallpapers/duo-acrylic-studies/quiet-eddies-open.webp",
        "alt": "Quiet Eddies acrylic wallpaper with lock-screen time and controls on a fully open Star White iPhone Duo",
        "label": "Quiet Eddies \u00b7 Fully open",
        "view": "Fully open"
      },
      {
        "src": "/wallpapers/duo-acrylic-studies/tidal-reverie-closed.webp",
        "alt": "Tidal Reverie acrylic wallpaper with lock-screen time and controls on a closed Star White iPhone Duo",
        "label": "Tidal Reverie \u00b7 Closed",
        "view": "Closed"
      },
      {
        "src": "/wallpapers/duo-acrylic-studies/tidal-reverie-open.webp",
        "alt": "Tidal Reverie acrylic wallpaper with lock-screen time and controls on a fully open Star White iPhone Duo",
        "label": "Tidal Reverie \u00b7 Fully open",
        "view": "Fully open"
      }
    ],
    "downloadSummary": [
      {
        "label": "Files",
        "value": "8 landscape PNG wallpaper artworks"
      },
      {
        "label": "Resolution",
        "value": "1493\u20131496 \u00d7 1051\u20131054 px; varies by design"
      },
      {
        "label": "Layout",
        "value": "One continuous landscape per design, composed for open and closed displays"
      },
      {
        "label": "Previews",
        "value": "16 device views, with four designs paired with each phone finish"
      }
    ],
    "previewNote": "Phone frames, time, and controls appear only in the previews. Artwork framing may vary with your wallpaper settings.",
    "description": [
      "Eight acrylic studies move between bold colour and quieter places: electric brushwork, woven stripes, moss-green ridges, small painted fields, and a sunlit inlet. Each has its own rhythm, from the energy of overlapping arcs to the stillness of three simple green planes.",
      "The centre of each composition holds a complete scene on the closed display. Open the phone and the painting continues into broader fields, longer lines, and sweeping colour. Four designs are shown on Night Sky and four on the white finish.",
      "These AI-created artworks are presented at their current generated dimensions, around 1.5K wide. Each design is supplied as one landscape PNG. The larger device previews illustrate the layout; they do not add detail to the artwork."
    ],
    "designs": [
      {
        "title": "Electric Sweep",
        "description": "A current of cyan and coral cuts through midnight blue, with a fine flash of yellow along its edge. Raised brush marks turn this sweep of colour into something you can almost feel."
      },
      {
        "title": "Moss Folds",
        "description": "Three broad planes of sage, moss, and forest green settle beneath a blue sky. Long, quiet ridges give the closed screen a simple rhythm and open into a wider painted landscape."
      },
      {
        "title": "Orbit Pop",
        "description": "Tangerine, fuchsia, and turquoise arcs loop across a deep plum ground. Their overlapping brushwork holds a lively composition at the centre, with more colour revealed as the screen opens."
      },
      {
        "title": "Woven Horizons",
        "description": "Ochre, rust, cream, and smoky blue meet in bands of softly worn paint. A central weave of small rectangles interrupts the horizon, bringing warmth and a measured rhythm to the darker palette."
      },
      {
        "title": "Meadow Atlas",
        "description": "A peach-coloured path winds through combed green fields towards a cluster of pale cottages. Olive slopes, rust-tipped trees, and tiny flowers make a quiet countryside out of painted lines."
      },
      {
        "title": "Saffron Orchard",
        "description": "Three golden trees stand where saffron fields meet a cobalt sky. Vermilion hills and scattered violet flowers give this small painted world its bright, late-summer warmth."
      },
      {
        "title": "Quiet Eddies",
        "description": "Sage, peach, ivory, and blue-grey turn in slow, combed curves, touched with butter yellow. Fine ridges of acrylic paint give the soft colours movement without losing their calm."
      },
      {
        "title": "Tidal Reverie",
        "description": "An ivory sun hangs above a wind-shaped pine and a still teal inlet. Broad strokes of seafoam and cream carry its reflection towards the shore, catching the light in thick layers of paint."
      }
    ],
    "included": [
      "8 landscape PNG wallpaper artworks",
      "Electric Sweep, Moss Folds, Orbit Pop, and Woven Horizons",
      "Meadow Atlas, Saffron Orchard, Quiet Eddies, and Tidal Reverie",
      "Clean artwork with one composition per design for both screen shapes"
    ],
    "imageColors": [
      "#142c48",
      "#66833f",
      "#e8b987",
      "#acc3b5"
    ],
    "gradientStyle": "layers"
  },
  {
    id: "ps-32",
    slug: "retro-wave-pack",
    title: "Retro Wave Pack",
    price: 1600,
    imageColors: ["#2b0040", "#590060", "#8b0080", "#c000a0"],
    gradientStyle: "linear",
  },
  {
    id: "ps-33",
    slug: "earth-tones-pack",
    title: "Earth Tones Pack",
    price: 1200,
    imageColors: ["#5d4037", "#795548", "#8d6e63", "#a1887f"],
    gradientStyle: "radial",
  },
  {
    id: "ps-34",
    slug: "electric-blue-pack",
    title: "Electric Blue Pack",
    price: 900,
    imageColors: ["#0d47a1", "#1565c0", "#1976d2", "#1e88e5"],
    gradientStyle: "linear",
  },
  {
    id: "ps-35",
    slug: "silk-flow-pack",
    title: "Silk Flow Pack",
    price: 1600,
    imageColors: ["#880e4f", "#ad1457", "#c2185b", "#d81b60"],
    gradientStyle: "mesh",
  },
];

export const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Best selling", value: "best-selling" },
  { label: "Alphabetically, A-Z", value: "title-asc" },
  { label: "Alphabetically, Z-A", value: "title-desc" },
  { label: "Price, low to high", value: "price-asc" },
  { label: "Price, high to low", value: "price-desc" },
  { label: "Date, old to new", value: "date-asc" },
  { label: "Date, new to old", value: "date-desc" },
] as const;
