import type { BadgeVariant } from "../components/ui/Badge";
import type { StockLevel } from "../types/stockItem";

export const STOCK_LEVELS: Record<
  StockLevel,
  { label: string; variant: BadgeVariant }
> = {
  ok: { label: "Còn hàng", variant: "success" },
  low: { label: "Sắp hết", variant: "warning" },
  out: { label: "Hết hàng", variant: "danger" },
};

export const STOCK_LEVEL_OPTIONS = [
  { value: "", label: "Tất cả trạng thái" },
  ...Object.entries(STOCK_LEVELS).map(([value, { label }]) => ({
    value,
    label,
  })),
];
