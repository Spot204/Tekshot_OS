import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import SectionCard from "./SectionCard";
import SectionLink from "./SectionLink";
import { chartColor } from "./chartTheme";
import { formatCurrency } from "../../utils/format";
import { channelRevenue } from "../../mocks/report";

/** Vòng tròn tỉ trọng doanh thu theo kênh bán */
export default function ChannelRevenue() {
  const total = channelRevenue.reduce((sum, item) => sum + item.amount, 0);

  return (
    <SectionCard
      title="Doanh thu theo kênh"
      action={<SectionLink label="Xem chi tiết" />}
      className="h-100"
    >
      <div className="row align-items-center g-3">
        <div className="col-sm-5">
          <div className="position-relative" style={{ height: 190 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={channelRevenue}
                  dataKey="amount"
                  innerRadius="68%"
                  outerRadius="92%"
                  paddingAngle={2}
                  stroke="none"
                  isAnimationActive={false}
                >
                  {channelRevenue.map((channel) => (
                    <Cell key={channel.id} fill={chartColor[channel.color]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div className="position-absolute top-50 start-50 translate-middle text-center">
              <div className="text-secondary" style={{ fontSize: "var(--fs-micro)" }}>
                Tổng doanh thu
              </div>
              <div className="fw-bold">{formatCurrency(total)}</div>
            </div>
          </div>
        </div>

        <div className="col-sm-7">
          <ul className="list-unstyled d-flex flex-column gap-3 mb-0">
            {channelRevenue.map((channel) => (
              <li key={channel.id} className="d-flex align-items-center gap-2 small">
                <span
                  className="report-dot"
                  style={{ backgroundColor: chartColor[channel.color] }}
                />
                <span className="text-secondary me-auto">{channel.label}</span>
                <span className="fw-semibold">{channel.percent}%</span>
                <span className="fw-semibold text-nowrap">
                  {formatCurrency(channel.amount)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionCard>
  );
}
