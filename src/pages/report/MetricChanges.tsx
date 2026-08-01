import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { DollarSign, ShoppingCart, Users } from "lucide-react";
import type { ReactNode } from "react";
import type { MetricChange } from "../../types/report";
import SectionCard from "./SectionCard";
import { chartColor } from "./chartTheme";
import {
  formatCurrency,
  formatNumber,
  formatPercent,
} from "../../utils/format";
import { metricChanges } from "../../mocks/report";

const ICONS: Record<string, ReactNode> = {
  revenue: <DollarSign size={20} />,
  orders: <ShoppingCart size={20} />,
  customers: <Users size={20} />,
};

const formatDelta = ({ delta, deltaUnit }: MetricChange) =>
  deltaUnit === "currency"
    ? `+${formatCurrency(delta)}`
    : `+${formatNumber(delta)} ${deltaUnit}`;

/** Ba chỉ số chính kèm sparkline xu hướng */
export default function MetricChanges() {
  return (
    <SectionCard title="Chỉ số thay đổi" className="h-100">
      <div className="d-flex flex-column gap-3">
        {metricChanges.map((metric) => {
          const color = chartColor[metric.color];

          return (
            <div
              key={metric.id}
              className="border rounded-3 p-3 d-flex align-items-center gap-3"
            >
              <span
                className="report-icon"
                style={{ "--report-icon-color": color } as React.CSSProperties}
              >
                {ICONS[metric.id]}
              </span>

              <div className="min-w-0">
                <div className="text-secondary small">{metric.label}</div>
                <div className="h5 fw-bold mb-0" style={{ color }}>
                  {formatPercent(metric.changePercent)}
                </div>
                <div className="small" style={{ color }}>
                  {formatDelta(metric)}
                </div>
              </div>

              <div className="ms-auto" style={{ width: 110, height: 56 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={metric.trend}
                    margin={{ top: 4, right: 0, bottom: 0, left: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id={`spark-${metric.id}`}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="0%" stopColor={color} stopOpacity={0.3} />
                        <stop offset="100%" stopColor={color} stopOpacity={0} />
                      </linearGradient>
                    </defs>

                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke={color}
                      strokeWidth={2}
                      fill={`url(#spark-${metric.id})`}
                      dot={false}
                      isAnimationActive={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}
