import type { Column } from "../../components/ui/Table";
import type { CashRow } from "../../types/cashbook";
import Badge from "../../components/ui/Badge";
import RowActions from "../../components/ui/RowActions";
import { FLOWS, METHODS } from "../../constants/cashbook";
import { formatCurrency, formatDate, formatTime } from "../../utils/format";

interface Options {
  onDetail: (row: CashRow) => void;
  onPrint: (row: CashRow) => void;
}

/** Cột tiền để trống bằng gạch ngang, khỏi nhầm với số 0 */
const dash = <span className="text-secondary">-</span>;

export const createCashBookColumns = ({
  onDetail,
  onPrint,
}: Options): Column<CashRow>[] => [
  {
    id: "at",
    header: "Ngày giờ",
    render: (row) => (
      <div>
        <div>{formatDate(row.at)}</div>
        <div className="text-secondary small">{formatTime(row.at)}</div>
      </div>
    ),
  },
  {
    id: "id",
    header: "Mã phiếu",
    render: (row) => (
      <button
        type="button"
        className="btn btn-link p-0 fw-semibold"
        onClick={() => onDetail(row)}
      >
        {row.id}
      </button>
    ),
  },
  {
    id: "flow",
    header: "Loại giao dịch",
    render: (row) => (
      <Badge variant={FLOWS[row.flow].variant} size="sm">
        {FLOWS[row.flow].label}
      </Badge>
    ),
  },
  {
    id: "description",
    header: "Nội dung",
    accessor: "description",
  },
  {
    id: "method",
    header: "Phương thức",
    render: (row) => (
      <Badge variant={METHODS[row.method].variant} size="sm">
        {METHODS[row.method].label}
      </Badge>
    ),
  },
  {
    id: "in",
    header: "Thu",
    render: (row) =>
      row.flow === "in" ? (
        <span className="fw-semibold text-success">
          {formatCurrency(row.amount)}
        </span>
      ) : (
        dash
      ),
  },
  {
    id: "out",
    header: "Chi",
    render: (row) =>
      row.flow === "out" ? (
        <span className="fw-semibold text-danger">
          {formatCurrency(row.amount)}
        </span>
      ) : (
        dash
      ),
  },
  {
    id: "balance",
    header: "Số dư",
    render: (row) => formatCurrency(row.balance),
  },
  {
    id: "performedBy",
    header: "Người thực hiện",
    accessor: "performedBy",
  },
  {
    id: "actions",
    header: "Thao tác",
    align: "center",
    width: "90px",
    render: (row) => (
      <RowActions
        actions={[
          { label: "Xem chi tiết", icon: "bi-eye", onClick: () => onDetail(row) },
          { label: "In phiếu", icon: "bi-printer", onClick: () => onPrint(row) },
        ]}
      />
    ),
  },
];
