import type { ReactNode } from "react";
import type { ActivityKind } from "../../types/report";
import Icon from "../../components/ui/Icon";
import SectionCard from "./SectionCard";
import SectionLink from "./SectionLink";
import { chartColor } from "./chartTheme";
import { formatRelativeTime } from "../../utils/format";
import { recentActivities } from "../../mocks/report";

const ICONS: Record<ActivityKind, ReactNode> = {
  order: <Icon name="receipt-cutoff" size={18} />,
  stock: <Icon name="box-arrow-in-down" size={18} />,
  customer: <Icon name="person-plus" size={18} />,
  promotion: <Icon name="tag" size={18} />,
};

const COLORS: Record<ActivityKind, string> = {
  order: chartColor.brand,
  stock: chartColor.success,
  customer: chartColor.accent,
  promotion: chartColor.purple,
};

/** Dòng thời gian hoạt động, nhãn thời gian tính lại mỗi lần render */
export default function RecentActivity() {
  return (
    <SectionCard
      title="Hoạt động gần đây"
      action={<SectionLink label="Xem tất cả" />}
      className="h-100"
    >
      <ul className="list-unstyled d-flex flex-column gap-3 mb-0">
        {recentActivities.map((activity) => (
          <li key={activity.id} className="d-flex align-items-center gap-3">
            <span
              className="report-icon"
              style={
                {
                  "--report-icon-color": COLORS[activity.kind],
                } as React.CSSProperties
              }
            >
              {ICONS[activity.kind]}
            </span>

            <div className="min-w-0">
              <div className="small fw-semibold">{activity.title}</div>
              <div
                className="text-secondary"
                style={{ fontSize: "var(--fs-desc)" }}
              >
                {activity.detail} · {formatRelativeTime(activity.at)}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
