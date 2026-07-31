import type { StockItem, StockItemRow } from "../../types/stockItem";
import { toStockRows } from "./stockRows";

export type ReorderSource = "supply" | "material";

export interface ReorderRow extends StockItemRow {
  source: ReorderSource;
  /** Số lượng gợi ý gọi thêm */
  suggested: number;
}

/**
 * Gọi bù về gấp đôi định mức tối thiểu — đủ đệm cho một chu kỳ nhập tiếp theo.
 * Món còn trên định mức thì gợi ý 0, người dùng vẫn tự nhập được.
 */
const suggestFor = (item: StockItem): number =>
  item.stock <= item.minStock ? Math.max(item.minStock * 2 - item.stock, 0) : 0;

export const toReorderRows = (
  supplies: StockItem[],
  materials: StockItem[],
): ReorderRow[] => [
  ...toStockRows(supplies).map((row) => ({
    ...row,
    source: "supply" as const,
    suggested: suggestFor(row),
  })),
  ...toStockRows(materials).map((row) => ({
    ...row,
    source: "material" as const,
    suggested: suggestFor(row),
  })),
];

export interface SupplierGroup {
  supplier: string;
  items: { row: ReorderRow; quantity: number }[];
  total: number;
}

/**
 * Mỗi nhà cung cấp là một đơn gọi hàng riêng, nên gom theo nhà cung cấp
 * thay vì trả về một danh sách phẳng.
 */
export const groupBySupplier = (
  picked: { row: ReorderRow; quantity: number }[],
): SupplierGroup[] => {
  const groups = new Map<string, SupplierGroup>();

  picked.forEach((entry) => {
    const key = entry.row.supplier || "Chưa có nhà cung cấp";
    const group = groups.get(key) ?? { supplier: key, items: [], total: 0 };
    group.items.push(entry);
    group.total += entry.row.price * entry.quantity;
    groups.set(key, group);
  });

  return [...groups.values()].sort((a, b) =>
    a.supplier.localeCompare(b.supplier, "vi"),
  );
};
