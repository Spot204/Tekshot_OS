export type InvoiceStatus =
  | "Đã thanh toán"
  | "Một phần"
  | "Chưa thanh toán";

export interface Invoice {
  /** Số hóa đơn */
  id: string;
  /** Mã đơn hàng liên quan */
  orderId: string;
  customer: string;
  phone: string;
  /** ISO datetime — ngày hóa đơn */
  issuedAt: string;
  total: number;
  discount: number;
  tax: number;
  grandTotal: number;
  status: InvoiceStatus;
}
