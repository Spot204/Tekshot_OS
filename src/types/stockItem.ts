/** Ba nhóm dùng chung một hình dạng: vật tư, nguyên liệu, dụng cụ */
export type StockItemKind = "supply" | "material" | "tool";

/** Suy từ tồn kho so với định mức tối thiểu, không lưu sẵn */
export type StockLevel = "ok" | "low" | "out";

export interface StockItem {
  /** Mã vật phẩm, vd VT-001 */
  id: string;
  name: string;
  unit: string;
  stock: number;
  /** Định mức tối thiểu; dưới mức này là cần nhập thêm */
  minStock: number;
  price: number;
  supplier: string;
  /** Kho hoặc vị trí đang giữ */
  location: string;
  updatedAt: string;
}

export interface StockItemRow extends StockItem {
  level: StockLevel;
}
