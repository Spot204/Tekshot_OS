import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import SectionCard from "./SectionCard";
import { formatCurrency } from "../../utils/format";
import { revenueGoal } from "../../mocks/report";

const RING_HEIGHT = 210;

/** Vòng tròn tiến độ so với mục tiêu doanh thu */
export default function RevenueGoal() {
  // Làm tròn xuống: 72.5% hiển thị 72%, không khoe vượt mức chưa đạt
  const percent = Math.floor((revenueGoal.achieved / revenueGoal.target) * 100);

  // Pie cần dữ liệu dạng phần, không nhận trực tiếp phần trăm
  const slices = [
    { id: "achieved", value: percent },
    { id: "remaining", value: 100 - percent },
  ];

  return (
    <SectionCard title="Mục tiêu doanh thu" className="h-100">
      <div className="position-relative" style={{ height: RING_HEIGHT }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <defs>
              {/* Mockup chuyển màu dọc cung — linearGradient là xấp xỉ gần nhất */}
              <linearGradient id="goalArc" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--chart-brand)" />
                <stop offset="100%" stopColor="var(--chart-accent)" />
              </linearGradient>
            </defs>

            <Pie
              data={slices}
              dataKey="value"
              innerRadius="72%"
              outerRadius="92%"
              startAngle={90}
              endAngle={-270}
              stroke="none"
              cornerRadius={8}
              isAnimationActive={false}
            >
              <Cell fill="url(#goalArc)" />
              <Cell fill="var(--surface-subtle)" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="position-absolute top-50 start-50 translate-middle text-center">
          <div className="h2 fw-bold mb-0">{percent}%</div>
          <div className="text-secondary small">Đã đạt mục tiêu</div>
        </div>
      </div>

      <div className="d-flex justify-content-between gap-3 mt-3">
        <div>
          <span className="d-flex align-items-center gap-2 text-secondary small">
            <span
              className="report-dot"
              style={{ backgroundColor: "var(--chart-brand)" }}
            />
            Đã đạt
          </span>
          <div className="fw-semibold">{formatCurrency(revenueGoal.achieved)}</div>
        </div>

        <div className="text-end">
          <span className="d-flex align-items-center gap-2 text-secondary small justify-content-end">
            <span
              className="report-dot"
              style={{ backgroundColor: "var(--chart-muted)" }}
            />
            Mục tiêu
          </span>
          <div className="fw-semibold">{formatCurrency(revenueGoal.target)}</div>
        </div>
      </div>
    </SectionCard>
  );
}
