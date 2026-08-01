import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { Info } from "lucide-react";
import Card from "../../components/ui/Card";
import ChangeBadge from "./ChangeBadge";
import { formatCurrency } from "../../utils/format";
import {
  revenueTrend,
  totalRevenue,
  totalRevenueChange,
} from "../../mocks/report";

/** Card doanh thu tổng — nền gradient, biểu đồ tràn sát đáy */
export default function RevenueHero() {
  return (
    <Card
      shadow
      bordered={false}
      padding="p-4"
      className="report-hero h-100 d-flex flex-column overflow-hidden"
    >
      <div className="d-flex align-items-center gap-2 mb-2">
        <span className="small opacity-75">Tổng doanh thu</span>
        <Info size={14} className="opacity-50" aria-hidden="true" />
      </div>

      <div className="display-6 fw-bold mb-2">
        {formatCurrency(totalRevenue)}
      </div>

      <div className="d-flex align-items-center gap-2 mb-3">
        <span className="bg-white bg-opacity-25 rounded-pill px-2 py-1">
          <ChangeBadge percent={totalRevenueChange} onHero />
        </span>
        <span className="small opacity-75">so với kỳ trước</span>
      </div>

      <div className="report-hero-chart mt-auto" style={{ height: 180 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={revenueTrend}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          >
            <defs>
              <linearGradient id="heroRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--hero-on)"
                  stopOpacity={0.35}
                />
                <stop
                  offset="100%"
                  stopColor="var(--hero-on)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--hero-on)"
              strokeWidth={2}
              fill="url(#heroRevenue)"
              dot={false}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
