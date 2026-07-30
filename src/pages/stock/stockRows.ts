import type { StockItem, StockItemRow, StockLevel } from "../../types/stockItem";

/** Hết sạch là "out"; chạm hoặc dưới định mức tối thiểu là "low" */
const levelOf = (stock: number, minStock: number): StockLevel => {
  if (stock === 0) return "out";
  return stock <= minStock ? "low" : "ok";
};

export const toStockRows = (items: StockItem[]): StockItemRow[] =>
  items.map((item) => ({ ...item, level: levelOf(item.stock, item.minStock) }));
