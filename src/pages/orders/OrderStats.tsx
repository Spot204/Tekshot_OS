import StatCard from "../../components/ui/StatCard";
import type { OrderStat } from "../../types/order";
import { formatNumber } from "../../utils/format";

interface OrderStatsProps {
  stats: OrderStat[];
}

export default function OrderStats({ stats }: OrderStatsProps) {
  return (
    <div className="row g-4 mb-4">
      {stats.map((stat) => (
        <div key={stat.id} className="col-md-6 col-xl-3">
          <StatCard
            variant={stat.variant}
            label={stat.label}
            value={formatNumber(stat.value)}
            trend={stat.trend}
            icon={<i className={`bi ${stat.icon} fs-3`} aria-hidden="true" />}
          />
        </div>
      ))}
    </div>
  );
}
