export type ProductStatus = "selling" | "low" | "stopped";

/** Biến thể là đơn vị thực sự được bán: có SKU, giá và tồn kho riêng */
export interface ProductVariant {
  id: string;
  /** Vd "Màu đen, Size XS" */
  name: string;
  sku: string;
  price: number;
  vat: number;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  shortName: string;
  category: string;
  unit: string;
  imageUrl?: string;
  variants: ProductVariant[];
}

/** Một dòng bảng = một biến thể, kèm tên sản phẩm cha để hiển thị */
export interface ProductRow extends ProductVariant {
  productId: string;
  productName: string;
  category: string;
  imageUrl?: string;
  status: ProductStatus;
}
