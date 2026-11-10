import { Product } from "@/data/products";
import { ProductCard } from "./ProductCard";

export function RelatedProducts({ products }: { products: Product[] }) {
  return <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-7">
    {products.slice(0, 4).map((product, index) => <div key={product.id} className={`min-w-0 ${index > 1 ? "hidden lg:block" : ""}`}>
      <ProductCard product={product} interactivePreview />
    </div>)}
  </div>;
}
