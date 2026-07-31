import type { BadgeVariant } from "../components/ui/Badge";
import type {
  MovementKind,
  WarehouseKind,
  WarehouseStatus,
} from "../types/warehouse";

export const WAREHOUSE_STATUSES: Record<
  WarehouseStatus,
  { label: string; variant: BadgeVariant }
> = {
  active: { label: "Đang hoạt động", variant: "success" },
  paused: { label: "Tạm dừng", variant: "secondary" },
};

export const WAREHOUSE_KINDS: Record<WarehouseKind, string> = {
  store: "Kho cửa hàng",
  online: "Kho online",
  backup: "Kho dự phòng",
  material: "Kho nguyên liệu",
};

/** Màu ô icon từng kho, xoay vòng theo thứ tự trong danh sách */
export const WAREHOUSE_COLORS = [
  "var(--chart-brand)",
  "var(--chart-success)",
  "var(--chart-purple)",
  "var(--chart-accent)",
  "var(--danger)",
  "var(--chart-muted)",
];

export const MOVEMENTS: Record<
  MovementKind,
  { label: string; long: string; variant: BadgeVariant; color: string }
> = {
  in: {
    label: "Nhập",
    long: "Nhập hàng",
    variant: "success",
    color: "var(--chart-success)",
  },
  out: {
    label: "Xuất",
    long: "Xuất hàng",
    variant: "warning",
    color: "var(--chart-accent)",
  },
  adjust: {
    label: "Điều chỉnh",
    long: "Điều chỉnh",
    variant: "danger",
    color: "var(--danger)",
  },
  transfer: {
    label: "Chuyển kho",
    long: "Chuyển kho",
    variant: "primary",
    color: "var(--chart-brand)",
  },
};

const options = (entries: [string, string][], allLabel: string) => [
  { value: "", label: allLabel },
  ...entries.map(([value, label]) => ({ value, label })),
];

export const WAREHOUSE_STATUS_OPTIONS = options(
  Object.entries(WAREHOUSE_STATUSES).map(([id, { label }]) => [id, label]),
  "Trạng thái",
);

export const WAREHOUSE_KIND_OPTIONS = options(
  Object.entries(WAREHOUSE_KINDS),
  "Loại kho",
);

export const MOVEMENT_OPTIONS = options(
  Object.entries(MOVEMENTS).map(([id, { long }]) => [id, long]),
  "Tất cả",
);
