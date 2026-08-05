import { useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import clsx from "clsx";
import type { TooltipContentProps, TooltipValueType } from "recharts";
import type { ComparisonGrain } from "../../types/report";
import SectionCard from "./SectionCard";
import { AXIS_TICK, CHART_GRID } from "./chartTheme";
import { formatCompact, formatCurrency, formatDate } from "../../utils/format";
import { comparisonSeries } from "../../mocks/report";

const GRAINS: { id: ComparisonGrain; label: string }[] = [
  { id: "day", label: "Theo ngày" },
  { id: "week", label: "Theo tuần" },
  { id: "month", label: "Theo tháng" },
];

const shortDate = (iso: string) => formatDate(iso).slice(0, 5);

/** Tooltip của recharts khoá cứng generic <ValueType, NameType> */
function ComparisonTooltip({
  active,
  payload,
  label,
}: TooltipContentProps<TooltipValueType, number | string>) {
  if (!active || !payload?.length) return null;

  return (
    <div className="report-tooltip">
      <div className="small fw-semibold mb-2">{formatDate(String(label))}</div>

      {payload.map((entry) => (
        <div
          key={String(entry.dataKey)}
          className="d-flex align-items-center gap-2 small"
        >
          <span
            className="report-dot"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-secondary me-auto">
            {entry.dataKey === "current" ? "Kỳ hiện tại" : "Kỳ trước"}
          </span>
          <span className="fw-semibold">
            {formatCurrency(Number(entry.value))}
          </span>
        </div>
      ))}
    </div>
  );
}

/** Đường doanh thu kỳ này (liền) so với kỳ trước (nét đứt) */
export default function PeriodComparison() {
  const [grain, setGrain] = useState<ComparisonGrain>("day");
  const data = comparisonSeries[grain];

  return (
    <SectionCard title="So sánh với kỳ trước" className="h-100">
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-3">
        <div className="d-flex gap-1">
          {GRAINS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={clsx("report-tab", grain === item.id && "is-active")}
              aria-pressed={grain === item.id}
              onClick={() => setGrain(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="d-flex flex-wrap gap-3 small text-secondary">
          <span className="d-flex align-items-center gap-2">
            <span
              className="report-dot"
              style={{ backgroundColor: "var(--chart-brand)" }}
            />
            Kỳ hiện tại
          </span>
          <span className="d-flex align-items-center gap-2">
            <span
              className="report-dot opacity-50"
              style={{ backgroundColor: "var(--chart-brand)" }}
            />
            Kỳ trước
          </span>
        </div>
      </div>

      <div style={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 8, right: 8, bottom: 0, left: 0 }}
          >
            <CartesianGrid
              stroke={CHART_GRID}
              strokeDasharray="4 4"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              tickFormatter={shortDate}
              tick={AXIS_TICK}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tickFormatter={formatCompact}
              tick={AXIS_TICK}
              tickLine={false}
              axisLine={false}
              width={48}
            />
            {/* Truyền tham chiếu component, không phải element — recharts v3
                bắt buộc đủ props nếu viết <ComparisonTooltip /> */}
            <Tooltip
              content={ComparisonTooltip}
              cursor={{ stroke: CHART_GRID }}
            />

            <Line
              type="monotone"
              dataKey="current"
              stroke="var(--chart-brand)"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5 }}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="previous"
              stroke="var(--chart-brand)"
              strokeWidth={2}
              strokeDasharray="6 5"
              strokeOpacity={0.55}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </SectionCard>
  );
}
