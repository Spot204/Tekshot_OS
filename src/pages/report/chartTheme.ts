import type { ChartColor } from "../../types/report";

/** Trỏ sang token trong global.css — đổi màu biểu đồ không phải sửa TS */
export const chartColor: Record<ChartColor, string> = {
  brand: "var(--chart-brand)",
  accent: "var(--chart-accent)",
  success: "var(--chart-success)",
  purple: "var(--chart-purple)",
  muted: "var(--chart-muted)",
};

export const CHART_GRID = "var(--chart-grid)";
export const AXIS_TICK = { fill: "var(--text-secondary)", fontSize: 12 };
