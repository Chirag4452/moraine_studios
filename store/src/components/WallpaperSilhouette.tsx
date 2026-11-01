"use client";

import React from "react";

interface WallpaperSilhouetteProps {
  colors: string[];
  gradientStyle?: "linear" | "radial" | "conic" | "mesh" | "minimal-grid" | "layers" | "circles" | "stacks";
  className?: string;
  isHovered?: boolean;
}

export function WallpaperSilhouette({
  colors,
  gradientStyle = "radial",
  className = "",
  isHovered = false,
}: WallpaperSilhouetteProps) {
  const c0 = colors[0] || "#111111";
  const c1 = colors[1] || "#222222";
  const c2 = colors[2] || "#333333";
  const c3 = colors[3] || "#555555";

  const id = React.useId().replace(/:/g, "_");

  return (
    <div
      className={`relative w-full h-full overflow-hidden transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] ${
        isHovered ? "scale-[1.05]" : "scale-100"
      } ${className}`}
    >
      <svg
        className="w-full h-full object-cover"
        viewBox="0 0 600 600"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`grad-linear-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={c0} />
            <stop offset="35%" stopColor={c1} />
            <stop offset="65%" stopColor={c2} />
            <stop offset="100%" stopColor={c3} />
          </linearGradient>

          <radialGradient id={`grad-radial-${id}`} cx="50%" cy="45%" r="60%">
            <stop offset="0%" stopColor={c3} />
            <stop offset="40%" stopColor={c2} />
            <stop offset="75%" stopColor={c1} />
            <stop offset="100%" stopColor={c0} />
          </radialGradient>

          <filter id={`blur-${id}`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="50" />
          </filter>
          <filter id={`blur-sm-${id}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="25" />
          </filter>
        </defs>

        {/* Base fill */}
        <rect width="100%" height="100%" fill={c0} />

        {gradientStyle === "radial" && (
          <g>
            <rect width="100%" height="100%" fill={`url(#grad-radial-${id})`} />
            <circle cx="300" cy="270" r="200" fill={c2} filter={`url(#blur-${id})`} opacity="0.6" />
            <circle cx="450" cy="180" r="140" fill={c3} filter={`url(#blur-${id})`} opacity="0.4" />
          </g>
        )}

        {gradientStyle === "linear" && (
          <g>
            <rect width="100%" height="100%" fill={`url(#grad-linear-${id})`} />
            <path d="M 0,400 Q 150,250 300,380 T 600,280 L 600,600 L 0,600 Z" fill={c1} opacity="0.7" />
            <path d="M 0,500 Q 200,350 400,460 T 600,400 L 600,600 L 0,600 Z" fill={c0} opacity="0.8" />
          </g>
        )}

        {gradientStyle === "mesh" && (
          <g>
            <rect width="100%" height="100%" fill={c0} />
            <circle cx="150" cy="150" r="200" fill={c1} filter={`url(#blur-${id})`} opacity="0.85" />
            <circle cx="480" cy="200" r="220" fill={c2} filter={`url(#blur-${id})`} opacity="0.7" />
            <circle cx="350" cy="420" r="200" fill={c3} filter={`url(#blur-${id})`} opacity="0.6" />
            <circle cx="180" cy="420" r="160" fill={c1} filter={`url(#blur-${id})`} opacity="0.7" />
          </g>
        )}

        {gradientStyle === "conic" && (
          <g>
            <rect width="100%" height="100%" fill={c0} />
            <path d="M 300,300 L 600,0 L 600,600 Z" fill={c1} opacity="0.5" />
            <path d="M 300,300 L 0,600 L 600,600 Z" fill={c2} opacity="0.4" />
            <circle cx="300" cy="300" r="160" fill={c2} filter={`url(#blur-${id})`} opacity="0.8" />
            <circle cx="300" cy="300" r="80" fill={c3} filter={`url(#blur-${id})`} opacity="0.9" />
          </g>
        )}

        {gradientStyle === "minimal-grid" && (
          <g>
            <rect width="100%" height="100%" fill={c0} />
            <circle cx="300" cy="300" r="240" fill={c1} opacity="0.3" filter={`url(#blur-${id})`} />
            <g stroke={c3} strokeWidth="0.5" opacity="0.2">
              <line x1="120" y1="0" x2="120" y2="600" />
              <line x1="240" y1="0" x2="240" y2="600" />
              <line x1="360" y1="0" x2="360" y2="600" />
              <line x1="480" y1="0" x2="480" y2="600" />
              <line x1="0" y1="120" x2="600" y2="120" />
              <line x1="0" y1="240" x2="600" y2="240" />
              <line x1="0" y1="360" x2="600" y2="360" />
              <line x1="0" y1="480" x2="600" y2="480" />
            </g>
          </g>
        )}

        {gradientStyle === "layers" && (
          <g>
            <rect width="100%" height="100%" fill={c0} />
            <rect x="0" y="0" width="600" height="200" fill={c1} opacity="0.7" />
            <path d="M 0,150 Q 300,250 600,150 L 600,350 Q 300,450 0,350 Z" fill={c2} opacity="0.6" filter={`url(#blur-sm-${id})`} />
            <path d="M 0,300 Q 300,400 600,300 L 600,500 Q 300,600 0,500 Z" fill={c3} opacity="0.5" filter={`url(#blur-sm-${id})`} />
            <circle cx="300" cy="300" r="100" fill={c3} filter={`url(#blur-${id})`} opacity="0.4" />
          </g>
        )}

        {gradientStyle === "circles" && (
          <g>
            <rect width="100%" height="100%" fill={c0} />
            <circle cx="200" cy="200" r="120" fill="none" stroke={c1} strokeWidth="30" opacity="0.6" />
            <circle cx="400" cy="350" r="100" fill="none" stroke={c2} strokeWidth="25" opacity="0.5" />
            <circle cx="300" cy="250" r="160" fill="none" stroke={c3} strokeWidth="20" opacity="0.4" />
            <circle cx="450" cy="150" r="80" fill={c2} filter={`url(#blur-sm-${id})`} opacity="0.6" />
          </g>
        )}

        {gradientStyle === "stacks" && (
          <g>
            <rect width="100%" height="100%" fill={c0} />
            <rect x="100" y="100" width="180" height="180" rx="20" fill={c1} opacity="0.7" transform="rotate(15,190,190)" />
            <rect x="250" y="150" width="180" height="180" rx="20" fill={c2} opacity="0.6" transform="rotate(-10,340,240)" />
            <rect x="300" y="280" width="180" height="180" rx="20" fill={c3} opacity="0.7" transform="rotate(5,390,370)" />
            <circle cx="200" cy="400" r="100" fill={c2} filter={`url(#blur-${id})`} opacity="0.5" />
          </g>
        )}
      </svg>
    </div>
  );
}
