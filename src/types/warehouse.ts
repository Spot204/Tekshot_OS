export type WarehouseStatus = "active" | "paused";

export type WarehouseKind = "store" | "online" | "backup" | "material";

export interface Warehouse {
  /** Mã kho, vd KHO-001 */
  id: string;
  name: string;
  kind: WarehouseKind;
  status: WarehouseStatus;
  productCount: number;
  createdBy: string;
  createdAt: string;
}

export type MovementKind = "in" | "out" | "adjust" | "transfer";

export interface StockMovement {
  /** Mã phiếu, vd PN-28072026-001 */
  id: string;
  kind: MovementKind;
  warehouseId: string;
  /** Chỉ phiếu chuyển kho mới có kho đích */
  toWarehouseId?: string;
  /** Nhà cung cấp hoặc kênh bán; điều chỉnh/chuyển kho để trống */
  partner: string;
  createdAt: string;
  /** Điều chỉnh giảm mang giá trị âm */
  amount: number;
  createdBy: string;
}
