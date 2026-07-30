import type { CashEntry, CashRow } from "../../types/cashbook";

/**
 * Cộng dồn số dư theo thứ tự phát sinh rồi đảo lại để hiện mới nhất trước.
 * Phải tính trên TOÀN BỘ dữ liệu: lọc theo ngày/loại không được làm đổi số dư
 * của một dòng, nếu không cùng một phiếu sẽ hiện số khác nhau tuỳ bộ lọc.
 */
export const toCashRows = (
  entries: CashEntry[],
  opening: number,
): CashRow[] => {
  let balance = opening;

  return entries
    .filter((entry) => entry.status !== "cancelled")
    .sort((a, b) => a.at.localeCompare(b.at))
    .map((entry) => {
      balance += entry.flow === "in" ? entry.amount : -entry.amount;
      return { ...entry, balance };
    })
    .reverse();
};

export interface CashSummary {
  totalIn: number;
  totalOut: number;
  count: number;
}

/** Tổng thu/chi trong kỳ đang chọn */
export const summarize = (rows: CashRow[]): CashSummary =>
  rows.reduce<CashSummary>(
    (acc, row) => ({
      totalIn: acc.totalIn + (row.flow === "in" ? row.amount : 0),
      totalOut: acc.totalOut + (row.flow === "out" ? row.amount : 0),
      count: acc.count + 1,
    }),
    { totalIn: 0, totalOut: 0, count: 0 },
  );
