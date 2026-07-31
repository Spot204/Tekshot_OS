import type { ProductVariant } from "../../types/product";

export const emptyVariant = (id: string): ProductVariant => ({
  id,
  name: "",
  sku: "",
  price: 0,
  vat: 0,
  stock: 0,
});
