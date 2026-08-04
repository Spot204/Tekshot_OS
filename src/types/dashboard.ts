export interface MetricSummary {
  label: string;
  value: string;
  trend: number; // Tỷ lệ phần trăm tăng/giảm
  note?: string;
}

export interface PageMetric {
  id: string;
  name: string;
  views: number;
  viewers: number;
  visits: number;
  followers: number;
}

export interface SidebarChange {
  label: string;
  growth: string;
  valueChange: string;
  icon: string;
  color: "success" | "primary";
}

export interface PerformanceStat {
  label: string;
  value: string;
  trend: string;
  icon: string;
  color: string;
}
