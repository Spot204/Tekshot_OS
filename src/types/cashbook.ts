export type CashFlow = "in" | "out";

export type PaymentMethod = "cash" | "transfer" | "qr";

export type VoucherStatus = "completed" | "cancelled";

/** Một dòng nội dung trong phiếu; thành tiền nhập tay, không nhân từ số lượng */
export interface VoucherLine {
  id: string;
  content: string;
  unit: string;
  quantity: number;
  amount: number;
  note: string;
}

export interface CashEntry {
  /** Mã phiếu, vd PT-280726-001 */
  id: string;
  at: string;
  flow: CashFlow;
  description: string;
  method: PaymentMethod;
  amount: number;
  performedBy: string;
  status: VoucherStatus;
  /** Chỉ phiếu tạo từ form mới có; phiếu cũ trong mock để trống */
  lines?: VoucherLine[];
}

/** Bản ghi kèm số dư luỹ kế — tính ra, không lưu trong mock */
export interface CashRow extends CashEntry {
  balance: number;
}
