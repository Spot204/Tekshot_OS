export type ComboStatus = "selling" | "stopped";

export interface ComboItem {
  /** Trỏ tới ProductVariant.id */
  variantId: string;
  quantity: number;
}

export interface Combo {
  id: string;
  name: string;
  description: string;
  items: ComboItem[];
  /** Giá bán combo; giá gốc và mức tiết kiệm đều tính ra từ thành phần */
  price: number;
  status: ComboStatus;
}

export interface ComboLine extends ComboItem {
  name: string;
  sku: string;
  unitPrice: number;
}

export interface ComboRow extends Combo {
  lines: ComboLine[];
  originalPrice: number;
  saving: number;
  savingPercent: number;
}
