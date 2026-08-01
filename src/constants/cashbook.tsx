import type { BadgeVariant } from "../components/ui/Badge";
import type { CashFlow, PaymentMethod, VoucherStatus } from "../types/cashbook";

export const FLOWS: Record<CashFlow, { label: string; variant: BadgeVariant }> =
  {
    in: { label: "Thu", variant: "success" },
    out: { label: "Chi", variant: "danger" },
  };

export const METHODS: Record<
  PaymentMethod,
  { label: string; variant: BadgeVariant }
> = {
  cash: { label: "Tiền mặt", variant: "primary" },
  transfer: { label: "Chuyển khoản", variant: "purple" },
  qr: { label: "QR Code", variant: "warning" },
};

export const VOUCHER_STATUSES: Record<
  VoucherStatus,
  { label: string; variant: BadgeVariant }
> = {
  completed: { label: "Hoàn thành", variant: "success" },
  cancelled: { label: "Đã hủy", variant: "secondary" },
};

/** Nhãn dài cho cột "Loại phiếu", khác nhãn ngắn Thu/Chi ở badge */
export const VOUCHER_KINDS: Record<CashFlow, string> = {
  in: "Phiếu thu",
  out: "Phiếu chi",
};

const options = (entries: [string, string][], allLabel: string) => [
  { value: "", label: allLabel },
  ...entries.map(([value, label]) => ({ value, label })),
];

export const FLOW_OPTIONS = options(
  Object.entries(FLOWS).map(([id, { label }]) => [id, label]),
  "Tất cả",
);

export const METHOD_OPTIONS = options(
  Object.entries(METHODS).map(([id, { label }]) => [id, label]),
  "Tất cả",
);

export const STATUS_OPTIONS = options(
  Object.entries(VOUCHER_STATUSES).map(([id, { label }]) => [id, label]),
  "Tất cả",
);

const PICK_ONE = "- Chọn một giá trị -";

/** Dùng trong form tạo phiếu: bắt buộc chọn nên không có mục "Tất cả" */
export const VOUCHER_KIND_OPTIONS = [
  { value: "", label: PICK_ONE },
  ...Object.entries(VOUCHER_KINDS).map(([value, label]) => ({ value, label })),
];

export const PAYMENT_OPTIONS = [
  { value: "", label: PICK_ONE },
  ...Object.entries(METHODS).map(([value, { label }]) => ({ value, label })),
];
