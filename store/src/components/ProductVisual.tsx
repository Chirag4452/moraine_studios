import Image from "next/image";
import { Product } from "@/data/products";
import { WallpaperSilhouette } from "./WallpaperSilhouette";

export function ProductVisual({
  product,
  index = 0,
  isHovered = false,
  priority = false,
  loading,
  onLoad,
  onError,
  sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px",
}: {
  product: Product;
  index?: number;
  isHovered?: boolean;
  priority?: boolean;
  loading?: "eager" | "lazy";
  onLoad?: () => void;
  onError?: () => void;
  sizes?: string;
}) {
  const image = product.gallery?.[index] ?? product.gallery?.[0];

  return image ? (
    <div className="relative h-full w-full overflow-hidden">
      <Image
        key={image.src}
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        loading={loading}
        onLoad={onLoad}
        onError={onError}
        className={`object-contain transition-transform duration-500 ${isHovered ? "scale-105" : "scale-100"}`}
      />
    </div>
  ) : (
    <WallpaperSilhouette
      colors={product.imageColors}
      gradientStyle={product.gradientStyle}
      isHovered={isHovered}
    />
  );
}
