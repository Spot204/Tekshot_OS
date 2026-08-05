import { useMemo, useState } from "react";
import type { TableSort } from "../components/ui/Table";

/** Phần khoá sắp xếp của một cột. `Column<T>` thoả sẵn interface này. */
export interface SortSpec<T> {
  id: string;
  accessor?: keyof T;
  sortValue?: (row: T) => string | number;
}

const collator = new Intl.Collator("vi", {
  numeric: true,
  sensitivity: "base",
});

const compare = (a: unknown, b: unknown): number => {
  // Ô trống luôn xuống cuối, bất kể chiều sắp xếp
  const aEmpty = a === null || a === undefined || a === "";
  const bEmpty = b === null || b === undefined || b === "";
  if (aEmpty || bEmpty) return aEmpty === bEmpty ? 0 : aEmpty ? 1 : -1;

  if (typeof a === "number" && typeof b === "number") return a - b;
  return collator.compare(String(a), String(b));
};

/**
 * Sắp xếp client-side theo cột. Bấm lần 3 vào cùng cột thì bỏ sắp xếp.
 * Khi có API thì thay bằng tham số truyền lên server.
 */
export function useTableSort<T>(rows: T[], columns: SortSpec<T>[]) {
  const [sort, setSort] = useState<TableSort | null>(null);

  const onSortChange = (columnId: string) =>
    setSort((prev) => {
      if (prev?.columnId !== columnId) return { columnId, direction: "asc" };
      return prev.direction === "asc" ? { columnId, direction: "desc" } : null;
    });

  const sorted = useMemo(() => {
    if (!sort) return rows;

    const column = columns.find((c) => c.id === sort.columnId);
    if (!column) return rows;

    const { sortValue, accessor } = column;
    if (!sortValue && !accessor) return rows;

    const keyOf = (row: T) => (sortValue ? sortValue(row) : row[accessor!]);

    const factor = sort.direction === "asc" ? 1 : -1;
    // Không sort tại chỗ — rows là mảng gốc của trang
    return [...rows].sort((a, b) => compare(keyOf(a), keyOf(b)) * factor);
  }, [rows, columns, sort]);

  return { sort, sorted, onSortChange };
}
