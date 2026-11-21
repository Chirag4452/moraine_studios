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
  summary?: string;
  designsHeading?: string;
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
    "id": "ps-31",
    "slug": "mountain-peaks-pack",
    "title": "Mountain Landscapes for iPhone Duo",
    "price": 900,
    "isFeatured": true,
    "creator": "Moraine Studio",
    "summary": "Six mountain studies in red alpenglow, violet dusk, and starlight.",
    "gallery": [
      {
        "src": "/wallpapers/duo-landscapes/vermilion-ridge-closed.webp",
        "alt": "Vermilion Ridge wallpaper on a closed Night Sky iPhone Duo",
        "label": "Vermilion Ridge · Closed",
        "view": "Closed"
      },
      {
        "src": "/wallpapers/duo-landscapes/vermilion-ridge-open.webp",
        "alt": "Vermilion Ridge wallpaper on a fully open Night Sky iPhone Duo",
        "label": "Vermilion Ridge · Fully open",
        "view": "Fully open"
      },
      {
        "src": "/wallpapers/duo-landscapes/last-light-closed.webp",
        "alt": "Last Light wallpaper on a closed Night Sky iPhone Duo",
        "label": "Last Light · Closed",
        "view": "Closed"
      },
      {
        "src": "/wallpapers/duo-landscapes/last-light-open.webp",
        "alt": "Last Light wallpaper on a fully open Night Sky iPhone Duo",
        "label": "Last Light · Fully open",
        "view": "Fully open"
      },
      {
        "src": "/wallpapers/duo-landscapes/violet-hour-closed.webp",
        "alt": "Violet Hour wallpaper on a closed Night Sky iPhone Duo",
        "label": "Violet Hour · Closed",
        "view": "Closed"
      },
      {
        "src": "/wallpapers/duo-landscapes/violet-hour-open.webp",
        "alt": "Violet Hour wallpaper on a fully open Night Sky iPhone Duo",
        "label": "Violet Hour · Fully open",
        "view": "Fully open"
      },
      {
        "src": "/wallpapers/duo-landscapes/rose-cirrus-closed.webp",
        "alt": "Rose Cirrus wallpaper on a closed Star White iPhone Duo",
        "label": "Rose Cirrus · Closed",
        "view": "Closed"
      },
      {
        "src": "/wallpapers/duo-landscapes/rose-cirrus-open.webp",
        "alt": "Rose Cirrus wallpaper on a fully open Star White iPhone Duo",
        "label": "Rose Cirrus · Fully open",
        "view": "Fully open"
      },
      {
        "src": "/wallpapers/duo-landscapes/starlit-basin-closed.webp",
        "alt": "Starlit Basin wallpaper on a closed Star White iPhone Duo",
        "label": "Starlit Basin · Closed",
        "view": "Closed"
      },
      {
        "src": "/wallpapers/duo-landscapes/starlit-basin-open.webp",
        "alt": "Starlit Basin wallpaper on a fully open Star White iPhone Duo",
        "label": "Starlit Basin · Fully open",
        "view": "Fully open"
      },
      {
        "src": "/wallpapers/duo-landscapes/copper-monolith-closed.webp",
        "alt": "Copper Monolith wallpaper on a closed Star White iPhone Duo",
        "label": "Copper Monolith · Closed",
        "view": "Closed"
      },
      {
        "src": "/wallpapers/duo-landscapes/copper-monolith-open.webp",
        "alt": "Copper Monolith wallpaper on a fully open Star White iPhone Duo",
        "label": "Copper Monolith · Fully open",
        "view": "Fully open"
      }
    ],
    "downloadSummary": [
      {
        "label": "Files",
        "value": "6 landscape PNG wallpapers"
      },
      {
        "label": "Resolution",
        "value": "1494–1495 × 1052 px, depending on the design"
      },
      {
        "label": "Layout",
        "value": "One continuous landscape per design for the closed and open displays"
      }
    ],
    "previewNote": "The gallery shows each wallpaper on the closed and fully open Duo. Framing may vary with your wallpaper settings.",
    "description": [
      "Six mountain landscapes follow the changing light from copper desert cliffs to a snow peak beneath the stars. Vermilion and rose catch the ridges, while violet mist and deep blue skies give the collection its quieter scenes.",
      "The closed Duo frames the main summit beneath the clock. Open it to see the surrounding ridges, valleys, and reflections extend across the wider display."
    ],
    "designsHeading": "Explore the six landscapes",
    "designs": [
      {
        "title": "Vermilion Ridge",
        "description": "A scarlet ridge cuts across a muted teal sky. The sunlit face glows against the deep shadow on the opposite slope."
      },
      {
        "title": "Last Light",
        "description": "A thin line of copper sunlight traces the serrated snow peaks. The low ridge leaves a wide stretch of deep blue above it."
      },
      {
        "title": "Violet Hour",
        "description": "An angular summit stands against a magenta horizon. Violet mist settles between the ridges and softens the foreground."
      },
      {
        "title": "Rose Cirrus",
        "description": "Peach cirrus streams above a blue snow peak. Low cloud threads through the valleys between darker ridges."
      },
      {
        "title": "Starlit Basin",
        "description": "A broad snow peak with dark bands of rock rises between shadowed slopes. Small ripples catch its reflection beneath a quiet star field."
      },
      {
        "title": "Copper Monolith",
        "description": "Late sunlight picks out the vertical grooves of a sandstone tower. Wind-rippled sand leads toward the rock, with scattered clouds against a cool blue sky."
      }
    ],
    "included": [
      "Six AI-recreated landscape PNG wallpapers",
      "One clean artwork per design for both display shapes"
    ],
    "imageColors": [
      "#17223e",
      "#2b727c",
      "#be3936",
      "#e78e60"
    ],
    "gradientStyle": "layers"
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
    "id": "ps-38",
    "slug": "dial-studies-iphone-duo",
    "title": "Dial Studies for iPhone Duo",
    "price": 900,
    "isFeatured": true,
    "creator": "Moraine Studio",
    "summary": "Six Rolex dial-inspired designs, from luminous pearl and brushed florals to colourful bubbles.",
    "designsHeading": "Six expressions of the dial",
    "gallery": [
      {
        "src": "/wallpapers/duo-dial-studies/blue-floral-closed.webp",
        "alt": "Blue Floral wallpaper on a closed Night Sky iPhone Duo, with clock and controls",
        "label": "Blue Floral · Closed",
        "view": "Closed"
      },
      {
        "src": "/wallpapers/duo-dial-studies/blue-floral-open.webp",
        "alt": "Blue Floral wallpaper on a fully open Night Sky iPhone Duo, with clock and controls",
        "label": "Blue Floral · Fully open",
        "view": "Fully open"
      },
      {
        "src": "/wallpapers/duo-dial-studies/meteorite-silver-closed.webp",
        "alt": "Meteorite Silver wallpaper on a closed Night Sky iPhone Duo, with clock and controls",
        "label": "Meteorite Silver · Closed",
        "view": "Closed"
      },
      {
        "src": "/wallpapers/duo-dial-studies/meteorite-silver-open.webp",
        "alt": "Meteorite Silver wallpaper on a fully open Night Sky iPhone Duo, with clock and controls",
        "label": "Meteorite Silver · Fully open",
        "view": "Fully open"
      },
      {
        "src": "/wallpapers/duo-dial-studies/mother-of-pearl-closed.webp",
        "alt": "Mother of Pearl wallpaper on a closed Star White iPhone Duo, with clock and controls",
        "label": "Mother of Pearl · Closed",
        "view": "Closed"
      },
      {
        "src": "/wallpapers/duo-dial-studies/mother-of-pearl-open.webp",
        "alt": "Mother of Pearl wallpaper on a fully open Star White iPhone Duo, with clock and controls",
        "label": "Mother of Pearl · Fully open",
        "view": "Fully open"
      },
      {
        "src": "/wallpapers/duo-dial-studies/olive-floral-closed.webp",
        "alt": "Olive Floral wallpaper on a closed Night Sky iPhone Duo, with clock and controls",
        "label": "Olive Floral · Closed",
        "view": "Closed"
      },
      {
        "src": "/wallpapers/duo-dial-studies/olive-floral-open.webp",
        "alt": "Olive Floral wallpaper on a fully open Night Sky iPhone Duo, with clock and controls",
        "label": "Olive Floral · Fully open",
        "view": "Fully open"
      },
      {
        "src": "/wallpapers/duo-dial-studies/palm-champagne-closed.webp",
        "alt": "Palm Champagne wallpaper on a closed Star White iPhone Duo, with clock and controls",
        "label": "Palm Champagne · Closed",
        "view": "Closed"
      },
      {
        "src": "/wallpapers/duo-dial-studies/palm-champagne-open.webp",
        "alt": "Palm Champagne wallpaper on a fully open Star White iPhone Duo, with clock and controls",
        "label": "Palm Champagne · Fully open",
        "view": "Fully open"
      },
      {
        "src": "/wallpapers/duo-dial-studies/celebrations-closed.webp",
        "alt": "Celebrations wallpaper on a closed Star White iPhone Duo, with clock and controls",
        "label": "Celebrations · Closed",
        "view": "Closed"
      },
      {
        "src": "/wallpapers/duo-dial-studies/celebrations-open.webp",
        "alt": "Celebrations wallpaper on a fully open Star White iPhone Duo, with clock and controls",
        "label": "Celebrations · Fully open",
        "view": "Fully open"
      }
    ],
    "downloadSummary": [
      {
        "label": "Files",
        "value": "6 landscape artworks: 4 JPG and 2 PNG"
      },
      {
        "label": "Dimensions",
        "value": "4096 × 2882 px per artwork"
      },
      {
        "label": "Layout",
        "value": "One continuous composition per design for open and closed displays"
      },
      {
        "label": "Detail",
        "value": "Blue Floral and Celebrations are upscaled from 1495 × 1052 px"
      }
    ],
    "previewNote": "Phone frames, time, and controls appear only in the previews. Framing varies with wallpaper settings. A darker clock colour pairs well with the lighter designs.",
    "description": [
      "The character of a watch dial, reimagined across a wider canvas. Inspired by Rolex dials, Dial Studies brings together crystalline silver, luminous pearl, metallic florals, champagne palm leaves, and a bright gathering of coloured bubbles. Six distinct surfaces, each with its own way of catching the eye.",
      "The patterns fill the closed screen and continue across the open display. Blue Floral, Meteorite Silver, and Olive Floral are shown on Night Sky; Mother of Pearl, Palm Champagne, and Celebrations are paired with Star White. Choose quiet texture, rich colour, or something more playful.",
      "An independent, AI-created wallpaper collection by Moraine Studio, inspired by Rolex dial aesthetics. Not affiliated with or endorsed by Rolex."
    ],
    "designs": [
      {
        "title": "Blue Floral",
        "description": "Brushed blue petals overlap like engraved metal, moving from steel to midnight. Small jewel-like centres bring a precise glint to the soft floral pattern."
      },
      {
        "title": "Meteorite Silver",
        "description": "Crisscrossing silver striations form a fractured, crystalline surface. Pale highlights and graphite shadows give this monochrome design its depth."
      },
      {
        "title": "Mother of Pearl",
        "description": "Clouds of ivory carry hints of rose, lilac, and sea green. The pearlescent texture feels soft and luminous, with new colour appearing across the wider display."
      },
      {
        "title": "Olive Floral",
        "description": "Layered olive and forest-green petals combine fine grain with smooth metallic shading. Bright, jewel-like centres punctuate the repeating pattern."
      },
      {
        "title": "Palm Champagne",
        "description": "Sweeping palm fronds cross a warm champagne ground. Satin gold tones and crisp leaf edges bring an understated tropical rhythm to the screen."
      },
      {
        "title": "Celebrations",
        "description": "Tangerine, pink, yellow, and deep green bubbles gather beneath an airy turquoise field. Bold black outlines make the colours feel playful and graphic, with more of the gathering revealed when unfolded."
      }
    ],
    "included": [
      "Six wallpaper artworks at 4096 × 2882 px",
      "Blue Floral, Meteorite Silver, Mother of Pearl, Olive Floral, Palm Champagne, and Celebrations",
      "One clean landscape artwork per design; no clock, controls, or phone frame",
      "Blue Floral and Celebrations are interpolated upscales; export dimensions do not represent native 4K detail"
    ],
    "imageColors": [
      "#243c56",
      "#566633",
      "#d2b98b",
      "#9ae9e4"
    ],
    "gradientStyle": "layers"
  },
  {
    "id": "ps-39",
    "slug": "prismatic-glass-iphone-duo",
    "title": "Prismatic Glass for iPhone Duo",
    "price": 900,
    "isFeatured": true,
    "creator": "Moraine Studio",
    "summary": "Four wallpapers shaped by the way light bends through glass.",
    "description": [
      "Prismatic Glass studies four ways light moves through glass. Opalescent lenses split white light into colour, amber and cyan run along a dark seam, and broad folds range from vivid orange to cool blue.",
      "The closed display frames the central reflection. Open the phone to see each pattern continue across the wider screen."
    ],
    "designsHeading": "Explore the glass studies",
    "designs": [
      {
        "title": "Opal Lenses",
        "description": "Slanted glass lenses catch pools of opalescent colour against a dark ground. The central lens stays in view when the phone is closed, while the pattern continues across the open screen."
      },
      {
        "title": "Aurora Current",
        "description": "Cyan and gold reflections follow a sweeping curve through dark glass. Tiny bubbles sit along the bright seam beneath the clock."
      },
      {
        "title": "Solar Fold",
        "description": "Orange and electric blue meet along glossy folds. The brightest band crosses the centre, then widens into pools of colour as the phone opens."
      },
      {
        "title": "Glacier Silk",
        "description": "Icy blue glass ripples in soft folds with silver highlights. The central curl carries the composition on the closed screen."
      }
    ],
    "gallery": [
      {
        "src": "/wallpapers/duo-prismatic-glass/opal-lenses-closed.webp",
        "alt": "Opal Lenses on a closed Night Sky iPhone Duo",
        "label": "Opal Lenses · Closed",
        "view": "Closed"
      },
      {
        "src": "/wallpapers/duo-prismatic-glass/opal-lenses-open.webp",
        "alt": "Opal Lenses on a fully open Night Sky iPhone Duo",
        "label": "Opal Lenses · Fully open",
        "view": "Fully open"
      },
      {
        "src": "/wallpapers/duo-prismatic-glass/aurora-current-closed.webp",
        "alt": "Aurora Current on a closed Night Sky iPhone Duo",
        "label": "Aurora Current · Closed",
        "view": "Closed"
      },
      {
        "src": "/wallpapers/duo-prismatic-glass/aurora-current-open.webp",
        "alt": "Aurora Current on a fully open Night Sky iPhone Duo",
        "label": "Aurora Current · Fully open",
        "view": "Fully open"
      },
      {
        "src": "/wallpapers/duo-prismatic-glass/solar-fold-closed.webp",
        "alt": "Solar Fold on a closed Night Sky iPhone Duo",
        "label": "Solar Fold · Closed",
        "view": "Closed"
      },
      {
        "src": "/wallpapers/duo-prismatic-glass/solar-fold-open.webp",
        "alt": "Solar Fold on a fully open Night Sky iPhone Duo",
        "label": "Solar Fold · Fully open",
        "view": "Fully open"
      },
      {
        "src": "/wallpapers/duo-prismatic-glass/glacier-silk-closed.webp",
        "alt": "Glacier Silk on a closed Star White iPhone Duo",
        "label": "Glacier Silk · Closed",
        "view": "Closed"
      },
      {
        "src": "/wallpapers/duo-prismatic-glass/glacier-silk-open.webp",
        "alt": "Glacier Silk on a fully open Star White iPhone Duo",
        "label": "Glacier Silk · Fully open",
        "view": "Fully open"
      }
    ],
    "downloadSummary": [
      {
        "label": "Files",
        "value": "4 landscape PNG wallpapers"
      },
      {
        "label": "Dimensions",
        "value": "1495 × 1052 or 1496 × 1051 px, depending on the design"
      },
      {
        "label": "Layout",
        "value": "One continuous composition per design for both displays"
      }
    ],
    "previewNote": "The gallery shows each wallpaper on the closed and fully open Duo. The artwork files contain only the glass composition.",
    "included": [
      "Four AI-created landscape PNG wallpapers",
      "Opal Lenses, Aurora Current, Solar Fold, and Glacier Silk"
    ],
    "imageColors": [
      "#101c31",
      "#4589d0",
      "#ef8a2a",
      "#94cee6"
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
