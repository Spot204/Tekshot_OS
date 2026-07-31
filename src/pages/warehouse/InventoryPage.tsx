import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, Warehouse as WarehouseIcon } from "lucide-react";
import type { Column } from "../../components/ui/Table";
import type { Warehouse } from "../../types/warehouse";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import ComboBox from "../../components/ui/ComboBox";
import Button from "../../components/ui/Button";
import Table from "../../components/ui/Table";
import TablePagination from "../../components/ui/TablePagination";
import Avatar from "../../components/ui/Avatar";
import Badge from "../../components/ui/Badge";
import { useTableSort } from "../../hooks/useTableSort";
import {
  WAREHOUSE_COLORS,
  WAREHOUSE_KIND_OPTIONS,
  WAREHOUSE_STATUSES,
  WAREHOUSE_STATUS_OPTIONS,
} from "../../constants/warehouse";
import { warehouses } from "../../mocks/warehouses";
import { formatDateTime, formatNumber } from "../../utils/format";

const SORT = [
  { id: "name", accessor: "name" as const },
  { id: "productCount", accessor: "productCount" as const },
  { id: "createdAt", accessor: "createdAt" as const },
];

const createColumns = (
  onView: (warehouse: Warehouse) => void,
): Column<Warehouse>[] => [
  {
    id: "name",
    header: "Kho hàng",
    accessor: "name",
    sortable: true,
    render: (warehouse) => {
      const index = warehouses.findIndex((item) => item.id === warehouse.id);

      return (
        <div className="d-flex align-items-center gap-3">
          <span
            className="warehouse-icon"
            style={
              {
                "--warehouse-color":
                  WAREHOUSE_COLORS[index % WAREHOUSE_COLORS.length],
              } as React.CSSProperties
            }
          >
            <WarehouseIcon size={20} aria-hidden="true" />
          </span>
          <div>
            <div className="fw-semibold">{warehouse.name}</div>
            <div className="text-secondary small">Mã kho: {warehouse.id}</div>
          </div>
        </div>
      );
    },
  },
  {
    id: "detail",
    header: "Chi tiết",
    render: (warehouse) => (
      <Button
        customVariant="secondary"
        size="sm"
        onClick={() => onView(warehouse)}
      >
        Xem
      </Button>
    ),
  },
  {
    id: "productCount",
    header: "Tồn kho",
    accessor: "productCount",
    sortable: true,
    render: (warehouse) => (
      <div>
        <div className="fw-semibold">{formatNumber(warehouse.productCount)}</div>
        <div className="text-secondary small">sản phẩm</div>
      </div>
    ),
  },
  {
    id: "status",
    header: "Trạng thái",
    render: (warehouse) => (
      <Badge variant={WAREHOUSE_STATUSES[warehouse.status].variant} size="sm">
        {WAREHOUSE_STATUSES[warehouse.status].label}
      </Badge>
    ),
  },
  {
    id: "createdBy",
    header: "Người tạo",
    render: (warehouse) => (
      <span className="d-inline-flex align-items-center gap-2">
        <Avatar name={warehouse.createdBy} size={28} />
        {warehouse.createdBy}
      </span>
    ),
  },
  {
    id: "createdAt",
    header: "Thời gian tạo",
    accessor: "createdAt",
    sortable: true,
    render: (warehouse) => formatDateTime(warehouse.createdAt),
  },
];

export default function InventoryPage() {
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("");
  const [kind, setKind] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Lọc/phân trang cắt mảng ở client — thay bằng request khi có API
  const filtered = useMemo(() => {
    const needle = keyword.trim().toLowerCase();

    return warehouses.filter((warehouse) => {
      if (status && warehouse.status !== status) return false;
      if (kind && warehouse.kind !== kind) return false;
      if (!needle) return true;
      return [warehouse.name, warehouse.id].some((field) =>
        field.toLowerCase().includes(needle),
      );
    });
  }, [keyword, status, kind]);

  const { sort, sorted, onSortChange } = useTableSort(filtered, SORT);
  const visible = sorted.slice((page - 1) * pageSize, page * pageSize);

  // Đổi bộ lọc mà không về trang 1 thì bảng render rỗng
  const withPageReset =
    <T,>(setter: (value: T) => void) =>
    (value: T) => {
      setter(value);
      setPage(1);
    };

  const columns = createColumns((warehouse) =>
    console.log("Xem kho", warehouse.id),
  );

  return (
    <>
      <div className="d-flex align-items-center gap-3 mb-2">
        <span className="warehouse-page-icon">
          <WarehouseIcon size={24} />
        </span>
        <div>
          <h4 className="fw-bold mb-0">Tồn kho</h4>
          <p className="text-secondary small mb-0">Kho hàng · Tồn kho</p>
        </div>
      </div>

      <Card shadow bordered={false} padding="p-4" className="mb-2">
        <div className="row g-3">
          <div className="col-xl-4 col-md-6">
            <Input
              placeholder="Tìm kiếm kho hàng..."
              aria-label="Tìm kiếm kho hàng"
              value={keyword}
              onChange={(e) => withPageReset(setKeyword)(e.target.value)}
              leftIcon={<Search size={18} />}
            />
          </div>

          <div className="col-xl-3 col-md-6">
            <ComboBox
              options={WAREHOUSE_STATUS_OPTIONS}
              aria-label="Trạng thái"
              value={status}
              onChange={(e) => withPageReset(setStatus)(e.target.value)}
            />
          </div>

          <div className="col-xl-3 col-md-6">
            <ComboBox
              options={WAREHOUSE_KIND_OPTIONS}
              aria-label="Loại kho"
              value={kind}
              onChange={(e) => withPageReset(setKind)(e.target.value)}
            />
          </div>

          <div className="col-xl-2">
            <Button
              customVariant="secondary"
              className="d-inline-flex align-items-center gap-2 text-nowrap"
            >
              <SlidersHorizontal size={16} aria-hidden="true" />
              Bộ lọc
            </Button>
          </div>
        </div>
      </Card>

      <Card shadow bordered={false} padding="p-4">
        <Table
          columns={columns}
          data={visible}
          rowKey="id"
          currentPage={page}
          pageSize={pageSize}
          sort={sort}
          onSortChange={onSortChange}
          emptyMessage="Không tìm thấy kho hàng phù hợp"
        />

        <div className="mt-4">
          <TablePagination
            page={page}
            pageSize={pageSize}
            total={filtered.length}
            onPageChange={setPage}
            onPageSizeChange={withPageReset(setPageSize)}
            itemLabel="kho hàng"
          />
        </div>
      </Card>
    </>
  );
}
