import type { StatVariant } from "../components/ui/StatCard";

export type OrderStatus = "Hoàn thành" | "Đang xử lý" | "Đã hủy";

export type PaymentMethod = "Tiền mặt" | "Chuyển khoản";

export interface Order {
  id: string;
  customer: string;
  status: OrderStatus;
  payment: PaymentMethod;
  /** Số nguyên VND — định dạng ở tầng hiển thị, không lưu sẵn chuỗi */
  total: number;
  /** ISO datetime */
  createdAt: string;
}

/** Một dòng sản phẩm trong đơn */
export interface OrderLine {
  name: string;
  quantity: number;
  topping: number;
  discount: number;
  price: number;
}

export interface OrderStat {
  id: string;
  label: string;
  value: number;
  variant: StatVariant;
  /** Tên icon Bootstrap Icons, vd "bi-receipt-cutoff" */
  icon: string;
  trend: {
    direction: "up" | "down";
    value: string;
    note?: string;
  };
}
