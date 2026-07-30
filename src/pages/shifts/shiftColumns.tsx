import clsx from "clsx";
import type { Column } from "../../components/ui/Table";
import type { SortSpec } from "../../hooks/useTableSort";
import type { ShiftClosingRow } from "../../types/shift";
import { formatCurrency, formatDate, formatTime } from "../../utils/format";

const SORT = {
  id: { id: "id", accessor: "id" },
  startedAt: { id: "startedAt", accessor: "startedAt" },
} satisfies Record<string, SortSpec<ShiftClosingRow>>;

export const shiftSortSpec: SortSpec<ShiftClosingRow>[] = Object.values(SORT);

/** "28/07/2026 - 08:00" tách hai dòng cho đỡ vỡ cột */
const stamp = (iso: string) => (
  <div className="text-nowrap">
    <div>{formatDate(iso)}</div>
    <div className="text-secondary small">{formatTime(iso)}</div>
  </div>
);

const money = (value: number) => (
  <span className="text-nowrap">{formatCurrency(value)}</span>
);

interface Options {
  onDetail: (shift: ShiftClosingRow) => void;
}

export const createShiftColumns = ({
  onDetail,
}: Options): Column<ShiftClosingRow>[] => [
  {
    ...SORT.id,
    header: "Tiêu đề",
    sortable: true,
    render: (shift) => (
      <button
        type="button"
        className="btn btn-link p-0 fw-semibold text-nowrap"
        onClick={() => onDetail(shift)}
      >
        {shift.id}
      </button>
    ),
  },
  {
    ...SORT.startedAt,
    header: "Bắt đầu ca",
    sortable: true,
    render: (shift) => stamp(shift.startedAt),
  },
  {
    id: "closedAt",
    header: "Thời gian chốt ca",
    render: (shift) => stamp(shift.closedAt),
  },
  {
    id: "revenue",
    header: "Doanh thu",
    align: "end",
    render: (shift) => money(shift.revenue),
  },
  {
    id: "transferSales",
    header: "Chuyển khoản",
    align: "end",
    render: (shift) => money(shift.transferSales),
  },
  {
    id: "cashSales",
    header: "Tiền mặt bán hàng",
    align: "end",
    render: (shift) => money(shift.cashSales),
  },
  {
    id: "openingCash",
    header: "Đầu ca",
    align: "end",
    render: (shift) => money(shift.openingCash),
  },
  {
    id: "expectedCash",
    header: "Tổng tiền mặt",
    align: "end",
    render: (shift) => money(shift.expectedCash),
  },
  {
    id: "countedCash",
    header: "Tiền thực tế",
    align: "end",
    render: (shift) => money(shift.countedCash),
  },
  {
    id: "cashOut",
    header: "Chi tiền mặt",
    align: "end",
    render: (shift) => money(shift.cashOut),
  },
  {
    id: "variance",
    header: "Chênh lệch",
    align: "end",
    render: (shift) => (
      <span
        className={clsx(
          "text-nowrap fw-semibold",
          shift.variance === 0 ? "text-secondary" : "text-danger",
        )}
      >
        {shift.variance > 0 && "+"}
        {formatCurrency(shift.variance)}
      </span>
    ),
  },
  {
    id: "note",
    header: "Ghi chú",
    render: (shift) =>
      shift.note || <span className="text-secondary">-</span>,
  },
];
