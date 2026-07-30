import type { Product, ProductRow, ProductStatus } from "../../types/product";
import { LOW_STOCK_THRESHOLD } from "../../constants/product";

/** Trạng thái suy từ tồn kho, không lưu sẵn trong mock */
const statusOf = (stock: number): ProductStatus => {
  if (stock === 0) return "stopped";
  return stock <= LOW_STOCK_THRESHOLD ? "low" : "selling";
};

/** Bảng liệt kê theo biến thể vì SKU, giá và tồn kho đều thuộc biến thể */
export const toProductRows = (items: Product[]): ProductRow[] =>
  items.flatMap((product) =>
    product.variants.map((variant) => ({
      ...variant,
      productId: product.id,
      productName: `${product.name} - ${variant.name.split(", ").pop()}`,
      category: product.category,
      imageUrl: product.imageUrl,
      status: statusOf(variant.stock),
    })),
  );
