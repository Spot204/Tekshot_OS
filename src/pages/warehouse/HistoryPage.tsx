import { useMemo, useState } from "react";
import clsx from "clsx";
import type { Column } from "../../components/ui/Table";
import type { MovementKind, StockMovement } from "../../types/warehouse";
import Card from "../../components/ui/Card";
import Icon from "../../components/ui/Icon";
import Input from "../../components/ui/Input";
import ComboBox from "../../components/ui/ComboBox";
import Button from "../../components/ui/Button";
import Table from "../../components/ui/Table";
import TablePagination from "../../components/ui/TablePagination";
import Badge from "../../components/ui/Badge";
import RowActions from "../../components/ui/RowActions";
import DateRangeInput from "../../components/ui/DateRangeInput";
import { useTableSort } from "../../hooks/useTableSort";
import { MOVEMENTS, MOVEMENT_OPTIONS } from "../../constants/warehouse";
import { stockMovements, warehouses } from "../../mocks/warehouses";
import {
  formatCurrency,
  formatDate,
  formatTime,
  isWithinRange,
} from "../../utils/format";

const TABS: { id: "" | MovementKind; label: string }[] = [
  { id: "", label: "Tất cả" },
  { id: "in", label: "Nhập" },
  { id: "out", label: "Xuất" },
  { id: "adjust", label: "Điều chỉnh" },
  { id: "transfer", label: "Chuyển kho" },
];

const SORT = [{ id: "createdAt", accessor: "createdAt" as const }];

const warehouseName = (id?: string) =>
  warehouses.find((warehouse) => warehouse.id === id)?.name ?? "--";

const ICONS: Record<MovementKind, string> = {
  in: "download",
  out: "upload",
  adjust: "arrow-left-right",
  transfer: "arrow-left-right",
};

const createColumns = (
  onDetail: (movement: StockMovement) => void,
): Column<StockMovement>[] => [
  {
    id: "flag",
    header: "",
    width: "56px",
    render: (movement) => (
      <span
        className="warehouse-icon"
        style={
          {
            "--warehouse-color": MOVEMENTS[movement.kind].color,
          } as React.CSSProperties
        }
      >
        <Icon name={ICONS[movement.kind]} size={18} />
      </span>
    ),
  },
  {
    id: "id",
    header: "Mã phiếu",
    render: (movement) => (
      <div>
        <button
          type="button"
          className="btn btn-link p-0 fw-semibold"
          onClick={() => onDetail(movement)}
        >
          {movement.id}
        </button>
        <div className="text-secondary small">
          {MOVEMENTS[movement.kind].long}
        </div>
      </div>
    ),
  },
  {
    id: "kind",
    header: "Loại",
    render: (movement) => (
      <Badge variant={MOVEMENTS[movement.kind].variant} size="sm">
        {MOVEMENTS[movement.kind].label}
      </Badge>
    ),
  },
  {
    id: "warehouse",
    header: "Kho",
    render: (movement) =>
      movement.toWarehouseId ? (
        <div className="small">
          <div>{warehouseName(movement.warehouseId)} →</div>
          <div>{warehouseName(movement.toWarehouseId)}</div>
        </div>
      ) : (
        warehouseName(movement.warehouseId)
      ),
  },
  {
    id: "partner",
    header: "Đối tác",
    render: (movement) =>
      movement.partner || <span className="text-secondary">--</span>,
  },
  {
    id: "createdAt",
    header: "Ngày tạo",
    accessor: "createdAt",
    sortable: true,
    render: (movement) => (
      <div className="text-nowrap">
        <div>{formatDate(movement.createdAt)}</div>
        <div className="text-secondary small">
          {formatTime(movement.createdAt)}
        </div>
      </div>
    ),
  },
  {
    id: "amount",
    header: "Tổng tiền",
    align: "end",
    render: (movement) => (
      <span
        className={clsx(
          "fw-semibold text-nowrap",
          movement.amount < 0 && "text-danger",
        )}
      >
        {formatCurrency(movement.amount)}
      </span>
    ),
  },
  {
    id: "status",
    header: "Trạng thái",
    render: () => (
      <span className="d-inline-flex align-items-center gap-2 text-success small fw-semibold">
        <span
          className="report-dot"
          style={{ backgroundColor: "currentColor" }}
        />
        Hoàn thành
      </span>
    ),
  },
  { id: "createdBy", header: "Người tạo", accessor: "createdBy" },
  {
    id: "actions",
    header: "Thao tác",
    align: "center",
    width: "90px",
    render: (movement) => (
      <RowActions
        actions={[
          {
            label: "Xem chi tiết",
            icon: "eye",
            onClick: () => onDetail(movement),
          },
          {
            label: "In phiếu",
            icon: "printer",
            onClick: () => onDetail(movement),
          },
        ]}
      />
    ),
  },
];

export default function HistoryPage() {
  const [tab, setTab] = useState<"" | MovementKind>("");
  const [kind, setKind] = useState("");
  const [range, setRange] = useState<[Date | null, Date | null]>([
    new Date("2026-07-01"),
    new Date("2026-07-28"),
  ]);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [from, to] = range;

  // Lọc/phân trang cắt mảng ở client — thay bằng request khi có API
  const filtered = useMemo(() => {
    const needle = keyword.trim().toLowerCase();
    // Tab và ô "Loại" cùng lọc một trường; tab thắng khi đang chọn
    const wanted = tab || kind;

    return stockMovements.filter((movement) => {
      if (!isWithinRange(movement.createdAt, from, to)) return false;
      if (wanted && movement.kind !== wanted) return false;
      if (!needle) return true;
      return [movement.id, movement.partner].some((field) =>
        field.toLowerCase().includes(needle),
      );
    });
  }, [tab, kind, from, to, keyword]);

  const { sort, sorted, onSortChange } = useTableSort(filtered, SORT);
  const visible = sorted.slice((page - 1) * pageSize, page * pageSize);

  const withPageReset =
    <T,>(setter: (value: T) => void) =>
    (value: T) => {
      setter(value);
      setPage(1);
    };

  const columns = createColumns((movement) =>
    console.log("Chi tiết phiếu", movement.id),
  );

  return (
    <>
      <div className="d-flex align-items-center gap-3 mb-2">
        <span className="warehouse-page-icon" style={{ width: 56, height: 56 }}>
          <Icon name="clock-history" size={24} />
        </span>
        <div>
          <h4 className="fw-bold mb-0">Lịch sử</h4>
          <p className="text-secondary small mb-0">Kho hàng · Lịch sử</p>
        </div>
      </div>

      <Card shadow bordered={false} padding="p-4" className="mb-2">
        <div className="row g-3 align-items-center">
          <div className="col-xl-2 col-md-6">
            <ComboBox
              options={MOVEMENT_OPTIONS}
              aria-label="Loại phiếu"
              value={kind}
              onChange={(e) => withPageReset(setKind)(e.target.value)}
            />
          </div>

          <div className="col-xl-3 col-md-6">
            <DateRangeInput
              startDate={from}
              endDate={to}
              onChange={withPageReset(setRange)}
            />
          </div>

          <div className="col-xl-4 col-md-6">
            <Input
              placeholder="Tìm kiếm theo mã phiếu, nhà cung cấp..."
              aria-label="Tìm kiếm phiếu kho"
              value={keyword}
              onChange={(e) => withPageReset(setKeyword)(e.target.value)}
              leftIcon={<Icon name="search" size={18} />}
            />
          </div>

          <div className="col-xl-3 d-flex gap-2 justify-content-xl-end">
            <Button
              customVariant="secondary"
              className="d-inline-flex align-items-center gap-2 text-nowrap"
            >
              <Icon name="sliders" size={16} />
              Bộ lọc
            </Button>
            <Button className="text-nowrap">Apply</Button>
          </div>
        </div>
      </Card>

      <Card shadow bordered={false} padding="p-4">
        <div className="app-tabs mb-3" role="tablist">
          {TABS.map((item) => (
            <button
              key={item.id || "all"}
              type="button"
              role="tab"
              aria-selected={tab === item.id}
              className={clsx("app-tab", tab === item.id && "is-active")}
              onClick={() => withPageReset(setTab)(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <Table
          columns={columns}
          data={visible}
          rowKey="id"
          currentPage={page}
          pageSize={pageSize}
          sort={sort}
          onSortChange={onSortChange}
          emptyMessage="Không có bản ghi phù hợp"
        />

        <div className="mt-4">
          <TablePagination
            page={page}
            pageSize={pageSize}
            total={filtered.length}
            onPageChange={setPage}
            onPageSizeChange={withPageReset(setPageSize)}
            itemLabel="bản ghi"
          />
        </div>
      </Card>
    </>
  );
}
