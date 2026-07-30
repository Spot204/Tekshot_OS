import type { ReactNode } from "react";
import Card from "./Card";

export type StatVariant = "primary" | "success" | "warning" | "danger";

export interface StatCardProps {
  icon: ReactNode;
  variant: StatVariant;
  label: string;
  value: string | number;
  trend?: {
    direction: "up" | "down";
    /** Vd "16.8%" */
    value: string;
    note?: string;
  };
}

/**
 * Ô số liệu ở đầu trang. Tách ra vì bản trước lặp lại nguyên khối 4 lần
 * trong OrdersPage, chỉ khác màu và nhãn.
 */
export default function StatCard({
  icon,
  variant,
  label,
  value,
  trend,
}: StatCardProps) {
  return (
    <Card shadow bordered={false} className="h-100">
      <div className="d-flex align-items-center">
        <div
          className={`bg-${variant} bg-opacity-10 text-${variant} rounded-2 d-flex align-items-center justify-content-center me-3 flex-shrink-0`}
          style={{ width: "56px", height: "56px" }}
        >
          {icon}
        </div>

        <div>
          <div className="text-secondary small">{label}</div>
          <h3 className="fw-bold mb-1">{value}</h3>

          {trend && (
            <small
              className={
                trend.direction === "up" ? "text-success" : "text-danger"
              }
            >
              <i
                className={`bi bi-arrow-${trend.direction} me-1`}
                aria-hidden="true"
              />
              {trend.value}
              {trend.note && (
                <span className="text-body ms-1">{trend.note}</span>
              )}
            </small>
          )}
        </div>
      </div>
    </Card>
  );
}
