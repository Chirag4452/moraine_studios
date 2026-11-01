"use client";

import React, { useState } from "react";
import Link from "next/link";
import { WallpaperSilhouette } from "@/components/WallpaperSilhouette";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS } from "@/data/products";
import { 
  ArrowRight, 
  Check, 
  Copy, 
  Layers, 
  Monitor, 
  Palette, 
  Sparkles, 
  Sliders, 
  Maximize2, 
  Smartphone,
  Eye,
  Type,
  Grid,
  ShieldCheck,
  Search,
  ShoppingBag
} from "lucide-react";

interface ColorToken {
  name: string;
  role: string;
  hex: string;
  rgb: string;
  category: "core" | "neutral" | "accent";
  textColor?: string;
  border?: boolean;
}

const COLOR_TOKENS: ColorToken[] = [
  // Core
  { name: "Void Black", role: "Primary text, primary CTA, logo", hex: "#000000", rgb: "0, 0, 0", category: "core", textColor: "text-white" },
  { name: "Pure White", role: "Page surface, card backgrounds", hex: "#ffffff", rgb: "255, 255, 255", category: "core", textColor: "text-black", border: true },
  { name: "Obsidian Footer", role: "Deep contrast footer & contrast panels", hex: "#1a1a1a", rgb: "26, 26, 26", category: "core", textColor: "text-white" },
  
  // Neutrals
  { name: "Neutral 50", role: "Subtle card & panel backing", hex: "#fafafa", rgb: "250, 250, 250", category: "neutral", textColor: "text-black", border: true },
  { name: "Neutral 100", role: "Hover fills, soft tag backgrounds", hex: "#f5f5f5", rgb: "245, 245, 245", category: "neutral", textColor: "text-black", border: true },
  { name: "Neutral 200", role: "Hairline borders, dividers, keylines", hex: "#e5e5e5", rgb: "229, 229, 229", category: "neutral", textColor: "text-black", border: true },
  { name: "Neutral 400", role: "Secondary labels, strikethroughs, placeholders", hex: "#a3a3a3", rgb: "163, 163, 163", category: "neutral", textColor: "text-black" },
  { name: "Neutral 500", role: "Muted navigation, helper texts", hex: "#737373", rgb: "115, 115, 115", category: "neutral", textColor: "text-white" },
  { name: "Neutral 600", role: "Subdued body text, prices", hex: "#525252", rgb: "82, 82, 82", category: "neutral", textColor: "text-white" },
  { name: "Neutral 800", role: "High-emphasis copy & icons", hex: "#262626", rgb: "38, 38, 38", category: "neutral", textColor: "text-white" },

  // Accents
  { name: "Signal Crimson", role: "Sale badges, discount pricing", hex: "#ef4444", rgb: "239, 68, 68", category: "accent", textColor: "text-white" },
  { name: "Trust Emerald", role: "Live customer trust beacon", hex: "#22c55e", rgb: "34, 197, 94", category: "accent", textColor: "text-white" },
  { name: "Selection Invert", role: "Text selection highlight", hex: "#000000", rgb: "0, 0, 0", category: "accent", textColor: "text-white" },
];

const PRESET_PALETTES = [
  { name: "Deep Space Indigo", colors: ["#1a1a3e", "#2c3e8a", "#4169c4", "#7db4e0"] },
  { name: "Sunset Ember", colors: ["#c2540a", "#d4710a", "#e88c2a", "#f0a84a"] },
  { name: "Display P3 Chroma", colors: ["#ff6b35", "#ff3864", "#b91cff", "#4d21ff"] },
  { name: "Ecliptic Azure", colors: ["#0a1628", "#1a2a48", "#2a4a78", "#4a7ab8"] },
  { name: "AMOLED Obsidian", colors: ["#0a0a12", "#1a1a2e", "#2a2a44", "#3a3a5a"] },
  { name: "Nordic Minimalist", colors: ["#f5f5f5", "#e8e8e8", "#d0d0d0", "#b8b8b8"] },
];

const SHADER_MODES = [
  { id: "radial", label: "Radial Glow", description: "Atmospheric depth with Gaussian dispersion" },
  { id: "linear", label: "Linear Wave", description: "Contour curves and organic topographic flow" },
  { id: "mesh", label: "Diffuse Mesh", description: "Multi-point chromatic studio diffusion" },
  { id: "conic", label: "Conic Warp", description: "Angular focal sweep with chromatic rotation" },
  { id: "minimal-grid", label: "Drafting Grid", description: "Architectural 120px Cartesian coordinate lines" },
  { id: "layers", label: "Topographic Layers", description: "Stratified elevation geometry with blur transitions" },
  { id: "circles", label: "Concentric Rings", description: "Precision stroke rings with varied line weights" },
  { id: "stacks", label: "3D Offset Stacks", description: "Rotated rounded rectangular silhouette planes" },
] as const;

export default function DesignLanguagePage() {
  const [selectedShader, setSelectedShader] = useState<typeof SHADER_MODES[number]["id"]>("mesh");
  const [activePaletteIndex, setActivePaletteIndex] = useState(2);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const sampleProduct = PRODUCTS[0];

  const handleCopy = (hex: string) => {
    navigator.clipboard?.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1800);
  };

  return (
    <div className="w-full bg-white text-neutral-900 pb-28">
      {/* Hero Header */}
      <section className="border-b border-neutral-200 bg-neutral-50/50 py-16 sm:py-24">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="badge-pill bg-black text-white font-medium">
                Design System Spec
              </span>
              <span className="text-[12px] font-mono text-neutral-400">
                v1.2 — Display P3 Calibrated
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-black leading-[1.08] mb-6">
              The Moraine Studio Design Language
            </h1>

            <p className="text-[15px] sm:text-base text-neutral-600 leading-relaxed font-normal">
              A high-precision design system engineered for high-resolution screens and digital hardware accessories. 
              Built on Swiss graphic clarity, rigorous 13px typographic hierarchies, zero-radius product canvases, 
              and procedural SVG gradient shaders calibrated to Display P3 wide color gamut.
            </p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 pt-8 border-t border-neutral-200">
              <div>
                <p className="text-[11px] font-mono uppercase text-neutral-400 tracking-wider">Canvas Ratio</p>
                <p className="text-lg font-bold text-black mt-0.5">1:1 Square</p>
                <p className="text-[12px] text-neutral-500">Zero border-radius</p>
              </div>
              <div>
                <p className="text-[11px] font-mono uppercase text-neutral-400 tracking-wider">Base Type</p>
                <p className="text-lg font-bold text-black mt-0.5">13px Regular</p>
                <p className="text-[12px] text-neutral-500">Inter & Apple System</p>
              </div>
              <div>
                <p className="text-[11px] font-mono uppercase text-neutral-400 tracking-wider">Color Gamut</p>
                <p className="text-lg font-bold text-black mt-0.5">Display P3</p>
                <p className="text-[12px] text-neutral-500">6K native master files</p>
              </div>
              <div>
                <p className="text-[11px] font-mono uppercase text-neutral-400 tracking-wider">Grid Constraint</p>
                <p className="text-lg font-bold text-black mt-0.5">1400px Max</p>
                <p className="text-[12px] text-neutral-500">Fluid 2–5 column matrix</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nav Anchor Strip */}
      <div className="sticky top-[60px] z-30 bg-white/95 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-10 h-12 flex items-center gap-6 overflow-x-auto scrollbar-hide text-[13px]">
          <a href="#principles" className="text-neutral-500 hover:text-black whitespace-nowrap transition-colors">1. Core Principles</a>
          <a href="#colors" className="text-neutral-500 hover:text-black whitespace-nowrap transition-colors">2. Color System</a>
          <a href="#typography" className="text-neutral-500 hover:text-black whitespace-nowrap transition-colors">3. Typography</a>
          <a href="#procedural-shaders" className="text-neutral-500 hover:text-black whitespace-nowrap transition-colors">4. Procedural Shaders</a>
          <a href="#components" className="text-neutral-500 hover:text-black whitespace-nowrap transition-colors">5. UI Components</a>
          <a href="#hardware" className="text-neutral-500 hover:text-black whitespace-nowrap transition-colors">6. Apple Hardware Renders</a>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-10 pt-16 space-y-24">

        {/* 1. Core Principles */}
        <section id="principles">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono uppercase text-neutral-400">Section 01</span>
            <div className="h-px bg-neutral-200 flex-1" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-black mb-8">
            Studio Design Principles
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-lg border border-neutral-200 bg-neutral-50/30 flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center mb-4">
                  <Monitor className="w-4 h-4" />
                </div>
                <h3 className="text-[15px] font-bold text-black mb-2">Hardware-Native Precision</h3>
                <p className="text-[13px] text-neutral-600 leading-relaxed">
                  Every product is conceived not merely as an image, but as digital hardware meant to live on 
                  Studio Displays, Pro Display XDRs, and high-DPI OLED screens. Zero compression banding, native 6K density, 
                  and pure true black (#000000) for OLED energy efficiency.
                </p>
              </div>
              <span className="text-[11px] font-mono text-neutral-400 mt-6 block">Standard: 6016 × 3384 P3</span>
            </div>

            <div className="p-6 rounded-lg border border-neutral-200 bg-neutral-50/30 flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center mb-4">
                  <Eye className="w-4 h-4" />
                </div>
                <h3 className="text-[15px] font-bold text-black mb-2">Restrained Swiss Brutalism</h3>
                <p className="text-[13px] text-neutral-600 leading-relaxed">
                  Zero decorative clutter. Flat 1px hairline keylines, razor-sharp square containers (0px corner radius), 
                  monochrome chrome, and strict 13px functional micro-typography. The product artwork is the sole hero of the interface.
                </p>
              </div>
              <span className="text-[11px] font-mono text-neutral-400 mt-6 block">Standard: Zero decorative borders</span>
            </div>

            <div className="p-6 rounded-lg border border-neutral-200 bg-neutral-50/30 flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center mb-4">
                  <Sliders className="w-4 h-4" />
                </div>
                <h3 className="text-[15px] font-bold text-black mb-2">Fluid Micro-Interactions</h3>
                <p className="text-[13px] text-neutral-600 leading-relaxed">
                  Hover states respond with a custom cubic bezier easing curve <code className="text-[11px] bg-neutral-200 px-1 py-0.5 rounded">cubic-bezier(0.33, 1, 0.68, 1)</code> that creates a gentle, hardware-like inertia. Drawers, modals, and instant currency switches respond in &lt;100ms.
                </p>
              </div>
              <span className="text-[11px] font-mono text-neutral-400 mt-6 block">Standard: 500ms smooth inertia</span>
            </div>
          </div>
        </section>

        {/* 2. Color System */}
        <section id="colors">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono uppercase text-neutral-400">Section 02</span>
            <div className="h-px bg-neutral-200 flex-1" />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-black">
                Color Architecture & Chromatic Palette
              </h2>
              <p className="text-[13px] text-neutral-500 mt-1">
                Click any swatch to copy its hexadecimal token code to clipboard.
              </p>
            </div>
            {copiedHex && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-black text-white text-[11px] font-mono rounded">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copied {copiedHex}</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {COLOR_TOKENS.map((token) => (
              <button
                key={token.name}
                onClick={() => handleCopy(token.hex)}
                className="group p-3 rounded-lg border border-neutral-200 hover:border-black transition-all text-left flex flex-col justify-between bg-white shadow-sm hover:shadow"
              >
                <div
                  className={`w-full h-20 rounded-md mb-3 relative flex items-end justify-end p-2 ${
                    token.border ? "border border-neutral-200" : ""
                  }`}
                  style={{ backgroundColor: token.hex }}
                >
                  <span className={`text-[10px] font-mono uppercase opacity-0 group-hover:opacity-100 transition-opacity px-1.5 py-0.5 rounded bg-black/60 text-white`}>
                    Copy Hex
                  </span>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-semibold text-black">{token.name}</span>
                    <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-600">
                      {token.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-500 mt-1 line-clamp-1">{token.role}</p>
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-neutral-100 font-mono text-[11px] text-neutral-400">
                    <span>{token.hex}</span>
                    <span className="text-[10px]">rgb({token.rgb})</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* 3. Typography */}
        <section id="typography">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono uppercase text-neutral-400">Section 03</span>
            <div className="h-px bg-neutral-200 flex-1" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-black mb-2">
            Typographic Scale & Hierarchy
          </h2>
          <p className="text-[13px] text-neutral-500 mb-8">
            Built primarily around 13px Inter and Apple System Sans, emphasizing clarity and dense, functional beauty.
          </p>

          <div className="border border-neutral-200 rounded-lg overflow-hidden divide-y divide-neutral-200">
            {/* Specimen row 1 */}
            <div className="p-6 bg-white flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="lg:w-1/3">
                <span className="text-[11px] font-mono text-neutral-400 uppercase">Display Headline 1</span>
                <p className="text-xs text-neutral-500 font-mono mt-0.5">32px–48px / Bold / Tracking Tight / 1.1 Line-Height</p>
              </div>
              <div className="lg:w-2/3">
                <p className="text-3xl sm:text-4xl font-bold tracking-tight text-black leading-[1.1]">
                  High-Dynamic Display Hardware.
                </p>
              </div>
            </div>

            {/* Specimen row 2 */}
            <div className="p-6 bg-white flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="lg:w-1/3">
                <span className="text-[11px] font-mono text-neutral-400 uppercase">Collection Title / H2</span>
                <p className="text-xs text-neutral-500 font-mono mt-0.5">24px–32px / Semi-bold / Leading Tight</p>
              </div>
              <div className="lg:w-2/3">
                <p className="text-2xl sm:text-[2rem] font-semibold text-black leading-tight">
                  Wallpapers & Digital Presets
                </p>
              </div>
            </div>

            {/* Specimen row 3 */}
            <div className="p-6 bg-white flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="lg:w-1/3">
                <span className="text-[11px] font-mono text-neutral-400 uppercase">Brand Wordmark</span>
                <p className="text-xs text-neutral-500 font-mono mt-0.5">15px / Bold / Tracking 0.04em / All Caps</p>
              </div>
              <div className="lg:w-2/3 flex items-center gap-2">
                <div className="w-[22px] h-[22px] rounded-full bg-black flex items-center justify-center">
                  <div className="w-[10px] h-[10px] rounded-full border-2 border-white" />
                </div>
                <span className="font-bold text-[15px] tracking-[0.04em] text-black">
                  MORAINE STUDIO
                </span>
              </div>
            </div>

            {/* Specimen row 4 */}
            <div className="p-6 bg-white flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="lg:w-1/3">
                <span className="text-[11px] font-mono text-neutral-400 uppercase">Primary Interface Base (Workhorse)</span>
                <p className="text-xs text-neutral-500 font-mono mt-0.5">13px / Regular & Medium / 1.3 Line-Height</p>
              </div>
              <div className="lg:w-2/3">
                <p className="text-[13px] text-neutral-800 leading-normal">
                  The Wallpaper Bundle — Complete studio catalogue featuring 120+ Display P3 high-density assets.
                </p>
              </div>
            </div>

            {/* Specimen row 5 */}
            <div className="p-6 bg-white flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="lg:w-1/3">
                <span className="text-[11px] font-mono text-neutral-400 uppercase">Badge & Micro Label</span>
                <p className="text-xs text-neutral-500 font-mono mt-0.5">10px–11px / Semi-bold / Tracking 0.06em / Uppercase</p>
              </div>
              <div className="lg:w-2/3 flex items-center gap-3">
                <span className="bg-white text-black border border-neutral-200 text-[10px] font-semibold tracking-[0.06em] uppercase px-3 py-1 rounded-sm shadow-sm">
                  BEST SELLER
                </span>
                <span className="bg-red-500 text-white text-[10px] font-semibold tracking-[0.04em] uppercase px-2.5 py-1 rounded-sm">
                  SALE
                </span>
                <span className="badge-pill bg-black text-white text-[11px]">
                  STUDIO ARCHIVE
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Procedural SVG Shaders */}
        <section id="procedural-shaders">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono uppercase text-neutral-400">Section 04</span>
            <div className="h-px bg-neutral-200 flex-1" />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-black">
                Procedural SVG Wallpaper Engine
              </h2>
              <p className="text-[13px] text-neutral-500 mt-1">
                8 mathematical SVG generators that create responsive, zero-bandwidth vector textures and wallpapers.
              </p>
            </div>
          </div>

          {/* Interactive Shader Explorer */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start p-6 rounded-xl border border-neutral-200 bg-neutral-50/50">
            {/* Live Preview Canvas */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div className="w-full max-w-[420px] aspect-square rounded-none overflow-hidden shadow-2xl border border-neutral-300 relative group bg-neutral-100">
                <WallpaperSilhouette
                  colors={PRESET_PALETTES[activePaletteIndex].colors}
                  gradientStyle={selectedShader}
                  isHovered={false}
                />
                <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-md text-white px-2.5 py-1 rounded text-[11px] font-mono flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>SVG Style: {selectedShader}</span>
                </div>
              </div>

              {/* Color Swatch Dots */}
              <div className="mt-4 flex items-center gap-2">
                <span className="text-[11px] font-mono text-neutral-400 mr-1">Active Palette:</span>
                {PRESET_PALETTES[activePaletteIndex].colors.map((c, i) => (
                  <span
                    key={i}
                    className="w-4 h-4 rounded-full border border-black/10 shadow-sm"
                    style={{ backgroundColor: c }}
                    title={c}
                  />
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="lg:col-span-6 space-y-6">
              {/* Shader Selector */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-3">
                  Select Generator Shader Mode
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {SHADER_MODES.map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => setSelectedShader(mode.id)}
                      className={`p-3 rounded-lg text-left border transition-all ${
                        selectedShader === mode.id
                          ? "bg-black text-white border-black shadow"
                          : "bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400"
                      }`}
                    >
                      <p className="text-[13px] font-semibold leading-tight">{mode.label}</p>
                      <p className={`text-[11px] mt-1 leading-snug ${selectedShader === mode.id ? "text-neutral-300" : "text-neutral-500"}`}>
                        {mode.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Palette Selector */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-3">
                  Select Chromatic Color Set
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {PRESET_PALETTES.map((pal, idx) => (
                    <button
                      key={pal.name}
                      onClick={() => setActivePaletteIndex(idx)}
                      className={`p-2.5 rounded-lg border text-left flex flex-col gap-2 transition-all ${
                        activePaletteIndex === idx
                          ? "border-black bg-white ring-1 ring-black"
                          : "border-neutral-200 bg-white hover:border-neutral-300"
                      }`}
                    >
                      <span className="text-[12px] font-medium text-black line-clamp-1">{pal.name}</span>
                      <div className="flex h-3 w-full rounded overflow-hidden">
                        {pal.colors.map((col, ci) => (
                          <div key={ci} className="flex-1 h-full" style={{ backgroundColor: col }} />
                        ))}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. UI Components Specimen */}
        <section id="components">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono uppercase text-neutral-400">Section 05</span>
            <div className="h-px bg-neutral-200 flex-1" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-black mb-2">
            Component Architecture & Specimens
          </h2>
          <p className="text-[13px] text-neutral-500 mb-8">
            Modular, reusable components built with zero excess abstraction and strict keyboard accessibility.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Component 1: Product Card */}
            <div className="p-5 rounded-lg border border-neutral-200 bg-white flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono text-neutral-400 uppercase block mb-3">Product Card Specimen</span>
                <div className="w-full max-w-[240px] mx-auto">
                  <ProductCard product={sampleProduct} />
                </div>
              </div>
              <p className="text-[11px] text-neutral-500 mt-4 pt-3 border-t border-neutral-100">
                1:1 Aspect ratio, scale-[1.05] hover zoom, badges positioned at top-center and bottom-left.
              </p>
            </div>

            {/* Component 2: Action Buttons */}
            <div className="p-5 rounded-lg border border-neutral-200 bg-white flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono text-neutral-400 uppercase block mb-3">Button Variants</span>
                <div className="space-y-3">
                  <button className="w-full py-3 px-5 bg-black text-white text-[13px] font-semibold rounded-md hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2">
                    <span>Add to Bag — Rs. 1,600.00</span>
                    <ShoppingBag className="w-4 h-4" />
                  </button>

                  <button className="w-full py-3 px-5 bg-white text-black border border-neutral-300 text-[13px] font-semibold rounded-md hover:bg-neutral-50 transition-colors flex items-center justify-center gap-2">
                    <span>Instant Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button className="w-full py-2.5 px-4 text-neutral-600 hover:text-black text-[13px] font-medium transition-colors">
                    Continue Browsing
                  </button>
                </div>
              </div>
              <p className="text-[11px] text-neutral-500 mt-4 pt-3 border-t border-neutral-100">
                6px border radius, high-contrast dark primary with white text, crisp secondary stroke.
              </p>
            </div>

            {/* Component 3: Search Bar Specimen */}
            <div className="p-5 rounded-lg border border-neutral-200 bg-white flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono text-neutral-400 uppercase block mb-3">Modal / Search Input</span>
                <div className="p-3 bg-neutral-50 rounded-md border border-neutral-200">
                  <div className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-neutral-400 shrink-0" />
                    <input 
                      type="text" 
                      readOnly 
                      value="Wallpapers & Presets" 
                      className="bg-transparent text-[13px] text-black w-full focus:outline-none" 
                    />
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-neutral-300 text-neutral-400">
                      ESC
                    </span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-neutral-50 rounded-md border border-neutral-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-[12px] text-neutral-600">Trusted by 100,000+ customers</span>
                  </div>
                  <ShieldCheck className="w-4 h-4 text-neutral-400" />
                </div>
              </div>
              <p className="text-[11px] text-neutral-500 mt-4 pt-3 border-t border-neutral-100">
                Command palette aesthetic with keyboard accelerator indicators and live status beacons.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Hardware Renders & Ecosystem */}
        <section id="hardware">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono uppercase text-neutral-400">Section 06</span>
            <div className="h-px bg-neutral-200 flex-1" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-black mb-2">
            Apple Hardware Renders & Mockups
          </h2>
          <p className="text-[13px] text-neutral-500 mb-8">
            How the project integrates physical Apple hardware frames from <code className="text-black font-mono">Bezel-iPhone-Duo</code> and <code className="text-black font-mono">apple-ios-27-ui-kit</code>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-neutral-50 p-8 rounded-xl border border-neutral-200">
            <div>
              <span className="badge-pill bg-black text-white mb-3">Hardware Framing</span>
              <h3 className="text-xl font-bold text-black mb-3">
                Precision Dual-State iPhone Duo Renders
              </h3>
              <p className="text-[13px] text-neutral-600 leading-relaxed space-y-3">
                Included in the workspace repository are photorealistic Apple Design Resources for 
                <strong> iPhone Duo</strong> in <em>Night Sky</em> and <em>Star White</em> finishes. 
                These encompass Inner Open, Outer Closed, Landscape, and Portrait perspectives.
              </p>
              <ul className="mt-4 space-y-2 text-[12px] text-neutral-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-black" />
                  <span>Provides pixel-accurate screen clipping paths for wallpaper previews.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-black" />
                  <span>Employs official iOS 27 lock screen widget and typography alignments.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-black" />
                  <span>Enables high-fidelity marketing banners and social asset generation.</span>
                </li>
              </ul>
            </div>

            <div className="flex justify-center">
              <div className="p-4 bg-white rounded-lg border border-neutral-200 shadow-sm text-center">
                <div className="w-48 h-64 bg-neutral-900 rounded-3xl p-3 border-4 border-neutral-800 shadow-inner flex flex-col justify-between items-center relative overflow-hidden">
                  <div className="w-16 h-3 bg-black rounded-full z-10" />
                  <div className="absolute inset-0">
                    <WallpaperSilhouette
                      colors={["#ff6b35", "#ff3864", "#b91cff", "#4d21ff"]}
                      gradientStyle="conic"
                    />
                  </div>
                  <div className="z-10 text-white/90 text-center">
                    <span className="text-[20px] font-semibold tracking-tight">09:41</span>
                    <p className="text-[9px] text-white/70">Monday, October 19</p>
                  </div>
                  <div className="w-20 h-1 bg-white/80 rounded-full z-10" />
                </div>
                <span className="text-[11px] font-mono text-neutral-400 mt-3 block">
                  Simulated iPhone Bezel Frame
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Back Link */}
        <div className="pt-12 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-[15px] font-bold text-black">Moraine Studio</h4>
            <p className="text-[12px] text-neutral-500">The premium digital product marketplace.</p>
          </div>
          <Link
            href="/collections/wallpapers"
            className="inline-flex items-center gap-2 py-3 px-6 bg-black text-white text-xs font-semibold rounded-btn hover:bg-neutral-800 transition-colors"
          >
            <span>Explore Wallpapers Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
