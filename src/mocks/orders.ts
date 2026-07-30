import type { Order, OrderLine, OrderStat } from "../types/order";

/**
 * Dữ liệu mẫu. Khi có API thì thay bằng service fetch, các trang không phải
 * đổi gì ngoài chỗ lấy dữ liệu.
 */
export const orders: Order[] = [
  { id: "#2", customer: "Khách vãng lai", status: "Hoàn thành", payment: "Tiền mặt", total: 308000, createdAt: "2026-06-29T11:49:00" },
  { id: "#1", customer: "Nguyễn Văn A", status: "Đang xử lý", payment: "Tiền mặt", total: 256000, createdAt: "2026-06-29T10:12:00" },
  { id: "#200", customer: "Trần Thị B", status: "Hoàn thành", payment: "Chuyển khoản", total: 450000, createdAt: "2026-06-28T19:05:00" },
  { id: "#199", customer: "Lê Văn C", status: "Đang xử lý", payment: "Tiền mặt", total: 189000, createdAt: "2026-06-28T18:30:00" },
  { id: "#198", customer: "Phạm Thị D", status: "Đã hủy", payment: "Chuyển khoản", total: 120000, createdAt: "2026-06-28T17:45:00" },
  { id: "#197", customer: "Hoàng Minh E", status: "Hoàn thành", payment: "Chuyển khoản", total: 675000, createdAt: "2026-06-28T16:20:00" },
  { id: "#196", customer: "Vũ Thị F", status: "Hoàn thành", payment: "Tiền mặt", total: 234000, createdAt: "2026-06-28T15:10:00" },
  { id: "#195", customer: "Đặng Văn G", status: "Đang xử lý", payment: "Chuyển khoản", total: 890000, createdAt: "2026-06-28T14:00:00" },
  { id: "#194", customer: "Bùi Thị H", status: "Hoàn thành", payment: "Tiền mặt", total: 156000, createdAt: "2026-06-28T12:35:00" },
  { id: "#193", customer: "Ngô Văn I", status: "Đã hủy", payment: "Tiền mặt", total: 98000, createdAt: "2026-06-28T11:15:00" },
  { id: "#192", customer: "Công ty TNHH Sao Mai", status: "Hoàn thành", payment: "Chuyển khoản", total: 2450000, createdAt: "2026-06-27T17:40:00" },
  { id: "#191", customer: "Dương Thị K", status: "Đang xử lý", payment: "Tiền mặt", total: 312000, createdAt: "2026-06-27T16:05:00" },
];

/** Các dòng sản phẩm của đơn đang xem — mock chung cho mọi đơn */
export const orderLines: OrderLine[] = [
  { name: "Pizza 4 vị phô mai - S", quantity: 1, topping: 0, discount: 0, price: 59000 },
  { name: "Pizza 4 vị phô mai - M", quantity: 1, topping: 0, discount: 0, price: 99000 },
  { name: "Pizza 4 vị phô mai - L", quantity: 1, topping: 0, discount: 0, price: 150000 },
];

/** Số liệu tổng quan đầu trang — độc lập với danh sách ở trên */
export const orderStats: OrderStat[] = [
  {
    id: "total",
    label: "Tổng đơn hàng",
    value: 246,
    variant: "primary",
    icon: "bi-receipt-cutoff",
    trend: { direction: "up", value: "16.8%", note: "so với hôm qua" },
  },
  {
    id: "completed",
    label: "Đơn hoàn thành",
    value: 198,
    variant: "success",
    icon: "bi-check-circle",
    trend: { direction: "up", value: "14.3%", note: "so với hôm qua" },
  },
  {
    id: "processing",
    label: "Đang xử lý",
    value: 32,
    variant: "warning",
    icon: "bi-clock-history",
    trend: { direction: "up", value: "8.2%", note: "so với hôm qua" },
  },
  {
    id: "cancelled",
    label: "Đã hủy",
    value: 16,
    variant: "danger",
    icon: "bi-x-circle",
    trend: { direction: "down", value: "4.7%", note: "so với hôm qua" },
  },
];
