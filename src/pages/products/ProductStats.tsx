import type { ReactNode } from "react";
import Icon from "../../components/ui/Icon";
import Card from "../../components/ui/Card";
import ChangeBadge from "../report/ChangeBadge";
import { formatCurrency, formatNumber } from "../../utils/format";
import { productStats } from "../../mocks/products";

interface StatProps {
  icon: ReactNode;
  color: string;
  label: string;
  value: string;
  change: number;
}

function Stat({ icon, color, label, value, change }: StatProps) {
  return (
    <Card shadow bordered={false} padding="p-4" className="h-100">
      <div className="d-flex align-items-start gap-3">
        <span
          className="report-icon"
          style={{ "--report-icon-color": color } as React.CSSProperties}
        >
          {icon}
        </span>
        <div className="min-w-0">
          <div className="text-secondary small">{label}</div>
          <div className="h4 fw-bold mb-1">{value}</div>
          <ChangeBadge percent={change} note="so với kỳ trước" />
        </div>
      </div>
    </Card>
  );
}

export default function ProductStats() {
  return (
    <div className="row g-2 mb-2">
      <div className="col-xl col-md-6">
        <Stat
          icon={<Icon name="box-seam" size={20} />}
          color="var(--chart-brand)"
          label="Tổng sản phẩm"
          value={formatNumber(productStats.total)}
          change={productStats.totalChange}
        />
      </div>
      <div className="col-xl col-md-6">
        <Stat
          icon={<Icon name="tag" size={20} />}
          color="var(--chart-success)"
          label="Giá trị tồn kho"
          value={formatCurrency(productStats.inventoryValue)}
          change={productStats.inventoryValueChange}
        />
      </div>
      <div className="col-xl col-md-6">
        <Stat
          icon={<Icon name="ticket-detailed" size={20} />}
          color="var(--chart-purple)"
          label="Đang bán"
          value={formatNumber(productStats.selling)}
          change={productStats.sellingChange}
        />
      </div>
      <div className="col-xl col-md-6">
        <Stat
          icon={<Icon name="exclamation-circle" size={20} />}
          color="var(--warning)"
          label="Sắp hết hàng"
          value={formatNumber(productStats.lowStock)}
          change={productStats.lowStockChange}
        />
      </div>
      <div className="col-xl col-md-6">
        <Stat
          icon={<Icon name="slash-circle" size={20} />}
          color="var(--chart-muted)"
          label="Ngừng kinh doanh"
          value={formatNumber(productStats.stopped)}
          change={productStats.stoppedChange}
        />
      </div>
    </div>
  );
}
