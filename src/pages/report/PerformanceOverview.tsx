import type { ReactNode } from "react";
import Icon from "../../components/ui/Icon";
import SectionCard from "./SectionCard";
import ChangeBadge from "./ChangeBadge";
import { formatCurrency, formatNumber } from "../../utils/format";
import { performanceMetrics } from "../../mocks/report";

const ICONS: Record<string, ReactNode> = {
  orders: <Icon name="cart" size={20} />,
  aov: <Icon name="calendar-check" size={20} />,
  customers: <Icon name="people" size={20} />,
  products: <Icon name="box" size={20} />,
};

/** Lưới 2x2 các chỉ số chính của kỳ */
export default function PerformanceOverview() {
  return (
    <SectionCard title="Tổng quan hiệu suất" className="h-100">
      <div className="row g-2">
        {performanceMetrics.map((metric) => (
          <div key={metric.id} className="col-sm-6">
            <div className="border rounded-3 p-3 h-100 d-flex gap-3">
              <span className="report-icon">{ICONS[metric.id]}</span>

              <div className="min-w-0">
                <div className="text-secondary small">{metric.label}</div>
                <div className="h4 fw-bold mb-1">
                  {metric.unit === "currency"
                    ? formatCurrency(metric.value)
                    : formatNumber(metric.value)}
                </div>
                <ChangeBadge percent={metric.changePercent} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
