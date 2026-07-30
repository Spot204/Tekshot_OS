import type { BadgeVariant } from "../components/ui/Badge";
import type { ProductStatus } from "../types/product";

/** Dưới ngưỡng này thì coi là sắp hết hàng */
export const LOW_STOCK_THRESHOLD = 15;

export const PRODUCT_STATUSES: Record<
  ProductStatus,
  { label: string; variant: BadgeVariant }
> = {
  selling: { label: "Đang bán", variant: "success" },
  low: { label: "Sắp hết hàng", variant: "warning" },
  stopped: { label: "Ngừng kinh doanh", variant: "secondary" },
};

export const UNITS = ["Cái", "Chiếc", "Hộp", "Ly", "Phần", "Kg"];

/** Ngành hàng -> nhóm hàng -> loại hàng, dùng cho 3 select nối tầng ở form */
export const INDUSTRIES: Record<string, Record<string, string[]>> = {
  "Đồng phục": {
    "Áo bếp": ["Áo bếp ngắn tay", "Áo bếp dài tay"],
    "Áo phục vụ": ["Áo phục vụ nam", "Áo phục vụ nữ"],
  },
  "Đồ uống": {
    "Cà phê": ["Cà phê pha máy", "Cà phê pha phin"],
    "Trà": ["Trà trái cây", "Trà sữa"],
  },
  "Bao bì": {
    "Hộp giấy": ["Hộp pizza", "Hộp cơm"],
    "Túi": ["Túi nilon", "Túi giấy"],
  },
};

export const MENUS = ["Thực đơn chính", "Thực đơn phụ", "Không hiển thị"];

const options = (values: string[], placeholder: string) => [
  { value: "", label: placeholder },
  ...values.map((value) => ({ value, label: value })),
];

export const MENU_OPTIONS = options(MENUS, "-- Chọn --");
export const UNIT_OPTIONS = options(UNITS, "-- Chọn --");
export const INDUSTRY_OPTIONS = options(Object.keys(INDUSTRIES), "-- Chọn --");

export const STATUS_FORM_OPTIONS = [
  { value: "", label: "-- Chọn --" },
  ...Object.entries(PRODUCT_STATUSES).map(([value, { label }]) => ({
    value,
    label,
  })),
];

export const STATUS_FILTER_OPTIONS = [
  { value: "", label: "Trạng thái" },
  ...Object.entries(PRODUCT_STATUSES).map(([value, { label }]) => ({
    value,
    label,
  })),
];
