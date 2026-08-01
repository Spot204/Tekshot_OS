import { ArrowDown, ArrowUp } from "lucide-react";
import type { Column } from "../../components/ui/Table";
import type { SortSpec } from "../../hooks/useTableSort";
import type { CashEntry } from "../../types/cashbook";
import Badge from "../../components/ui/Badge";
import RowActions from "../../components/ui/RowActions";
import {
  FLOWS,
  METHODS,
  VOUCHER_KINDS,
  VOUCHER_STATUSES,
} from "../../constants/cashbook";
import { formatCurrency, formatDate, formatTime } from "../../utils/format";

const SORT = {
  createdAt: { id: "createdAt", accessor: "at" },
} satisfies Record<string, SortSpec<CashEntry>>;

export const voucherSortSpec: SortSpec<CashEntry>[] = Object.values(SORT);

const dash = <span className="text-secondary">-</span>;

interface Options {
  onDetail: (voucher: CashEntry) => void;
  onCancel: (voucher: CashEntry) => void;
}

export const createVoucherColumns = ({
  onDetail,
  onCancel,
}: Options): Column<CashEntry>[] => [
  {
    id: "flag",
    header: "",
    width: "56px",
    render: (voucher) => (
      <span
        className="voucher-flag"
        style={
          {
            "--voucher-flag-color":
              voucher.flow === "in" ? "var(--chart-success)" : "var(--danger)",
          } as React.CSSProperties
        }
      >
        {voucher.flow === "in" ? (
          <ArrowDown size={18} />
        ) : (
          <ArrowUp size={18} />
        )}
      </span>
    ),
  },
  {
    id: "id",
    header: "Mã phiếu",
    render: (voucher) => (
      <div>
        <button
          type="button"
          className="btn btn-link p-0 fw-semibold"
          onClick={() => onDetail(voucher)}
        >
          {voucher.id}
        </button>
        <div className="text-secondary small">
          {VOUCHER_KINDS[voucher.flow]}
        </div>
      </div>
    ),
  },
  {
    id: "kind",
    header: "Loại phiếu",
    render: (voucher) => (
      <Badge variant={FLOWS[voucher.flow].variant} size="sm">
        {FLOWS[voucher.flow].label}
      </Badge>
    ),
  },
  {
    ...SORT.createdAt,
    header: "Ngày tạo",
    sortable: true,
    render: (voucher) => (
      <div>
        <div>{formatDate(voucher.at)}</div>
        <div className="text-secondary small">{formatTime(voucher.at)}</div>
      </div>
    ),
  },
  {
    id: "description",
    header: "Nội dung",
    accessor: "description",
  },
  {
    id: "performedBy",
    header: "Người thực hiện",
    accessor: "performedBy",
  },
  {
    id: "in",
    header: "Thu",
    render: (voucher) =>
      voucher.flow === "in" ? (
        <span className="fw-semibold text-success">
          {formatCurrency(voucher.amount)}
        </span>
      ) : (
        dash
      ),
  },
  {
    id: "out",
    header: "Chi",
    render: (voucher) =>
      voucher.flow === "out" ? (
        <span className="fw-semibold text-danger">
          {formatCurrency(voucher.amount)}
        </span>
      ) : (
        dash
      ),
  },
  {
    id: "method",
    header: "Phương thức",
    render: (voucher) => (
      <Badge variant={METHODS[voucher.method].variant} size="sm">
        {METHODS[voucher.method].label}
      </Badge>
    ),
  },
  {
    id: "status",
    header: "Trạng thái",
    render: (voucher) => (
      <Badge variant={VOUCHER_STATUSES[voucher.status].variant} size="sm">
        {VOUCHER_STATUSES[voucher.status].label}
      </Badge>
    ),
  },
  {
    id: "actions",
    header: "Thao tác",
    align: "center",
    width: "90px",
    render: (voucher) => (
      <RowActions
        actions={[
          {
            label: "Xem chi tiết",
            icon: "bi-eye",
            onClick: () => onDetail(voucher),
          },
          {
            label: "Hủy phiếu",
            icon: "bi-x-circle",
            danger: true,
            dividerBefore: true,
            onClick: () => onCancel(voucher),
          },
        ]}
      />
    ),
  },
];
