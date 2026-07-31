import { useState } from "react";
import ReportToolbar from "./ReportToolbar";
import RevenueHero from "./RevenueHero";
import PerformanceOverview from "./PerformanceOverview";
import RevenueGoal from "./RevenueGoal";
import PeriodComparison from "./PeriodComparison";
import MetricChanges from "./MetricChanges";
import ChannelRevenue from "./ChannelRevenue";
import TopProducts from "./TopProducts";
import RecentActivity from "./RecentActivity";
import { reportRange } from "../../mocks/report";

export default function ReportPage() {
  // Khoảng ngày chưa lọc dữ liệu — mock là số liệu tổng hợp sẵn của một kỳ
  const [range, setRange] = useState<[Date | null, Date | null]>([
    new Date(reportRange.from),
    new Date(reportRange.to),
  ]);

  return (
    <>
      <ReportToolbar range={range} onRangeChange={setRange} />

      <div className="row g-2 mb-2">
        <div className="col-xl-5">
          <RevenueHero />
        </div>
        <div className="col-xl-4">
          <PerformanceOverview />
        </div>
        <div className="col-xl-3">
          <RevenueGoal />
        </div>
      </div>

      <div className="row g-2 mb-2">
        <div className="col-xl-8">
          <PeriodComparison />
        </div>
        <div className="col-xl-4">
          <MetricChanges />
        </div>
      </div>

      <div className="row g-2">
        <div className="col-xl-4">
          <ChannelRevenue />
        </div>
        <div className="col-xl-4">
          <TopProducts />
        </div>
        <div className="col-xl-4">
          <RecentActivity />
        </div>
      </div>
    </>
  );
}
