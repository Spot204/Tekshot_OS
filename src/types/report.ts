/** Màu chuỗi dữ liệu — trỏ tới token --chart-* trong global.css */
export type ChartColor = "brand" | "accent" | "success" | "purple" | "muted";

export interface TrendPoint {
  date: string;
  value: number;
}

export interface ComparisonPoint {
  date: string;
  current: number;
  previous: number;
}

/** Chu kỳ gộp của biểu đồ so sánh */
export type ComparisonGrain = "day" | "week" | "month";

export interface PerformanceMetric {
  id: string;
  label: string;
  value: number;
  /** currency thì qua formatCurrency, number thì qua formatNumber */
  unit: "currency" | "number";
  changePercent: number;
}

export interface MetricChange {
  id: string;
  label: string;
  changePercent: number;
  /** Chênh lệch tuyệt đối, vd 61500000 hoặc 276 */
  delta: number;
  deltaUnit: "currency" | "đơn" | "khách";
  color: ChartColor;
  trend: TrendPoint[];
}

export interface RevenueGoal {
  achieved: number;
  target: number;
}

export interface ChannelRevenue {
  id: string;
  label: string;
  amount: number;
  percent: number;
  color: ChartColor;
}

export interface TopProduct {
  id: string;
  name: string;
  emoji: string;
  quantity: number;
  unit: string;
  changePercent: number;
}

export type ActivityKind = "order" | "stock" | "customer" | "promotion";

export interface ActivityItem {
  id: string;
  kind: ActivityKind;
  title: string;
  detail: string;
  at: string;
}
