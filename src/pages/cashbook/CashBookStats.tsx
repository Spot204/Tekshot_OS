import { ArrowDown, ArrowUp, FileText, Wallet } from "lucide-react";
import type { ReactNode } from "react";
import Card from "../../components/ui/Card";
import { formatCurrency, formatDateTime, formatNumber } from "../../utils/format";

interface StatProps {
  icon: ReactNode;
  color: string;
  label: string;
  value: string;
  note: string;
}

function Stat({ icon, color, label, value, note }: StatProps) {
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
          <div className="h4 fw-bold mb-1" style={{ color }}>
            {value}
          </div>
          <div className="text-secondary small">{note}</div>
        </div>
      </div>
    </Card>
  );
}

interface CashBookStatsProps {
  balance: number;
  totalIn: number;
  totalOut: number;
  count: number;
  /** ISO của giao dịch mới nhất, null khi chưa có giao dịch nào */
  updatedAt: string | null;
  periodLabel: string;
}

export default function CashBookStats({
  balance,
  totalIn,
  totalOut,
  count,
  updatedAt,
  periodLabel,
}: CashBookStatsProps) {
  return (
    <div className="row g-2 mb-2">
      <div className="col-xl-3 col-md-6">
        <Stat
          icon={<Wallet size={20} />}
          color="var(--chart-brand)"
          label="Tổng quỹ hiện tại"
          value={formatCurrency(balance)}
          note={
            updatedAt
              ? `Cập nhật lúc ${formatDateTime(updatedAt)}`
              : "Chưa có giao dịch"
          }
        />
      </div>

      <div className="col-xl-3 col-md-6">
        <Stat
          icon={<ArrowUp size={20} />}
          color="var(--chart-success)"
          label="Tổng thu"
          value={formatCurrency(totalIn)}
          note={periodLabel}
        />
      </div>

      <div className="col-xl-3 col-md-6">
        <Stat
          icon={<ArrowDown size={20} />}
          color="var(--danger)"
          label="Tổng chi"
          value={formatCurrency(totalOut)}
          note={periodLabel}
        />
      </div>

      <div className="col-xl-3 col-md-6">
        <Stat
          icon={<FileText size={20} />}
          color="var(--chart-purple)"
          label="Số giao dịch"
          value={formatNumber(count)}
          note={periodLabel}
        />
      </div>
    </div>
  );
}
