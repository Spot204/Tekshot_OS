import type { Column } from "../../components/ui/Table";
import type { SortSpec } from "../../hooks/useTableSort";
import type { StockItemRow } from "../../types/stockItem";
import Badge from "../../components/ui/Badge";
import RowActions from "../../components/ui/RowActions";
import { STOCK_LEVELS } from "../../constants/stockItem";
import { formatCurrency, formatDate, formatNumber } from "../../utils/format";

const SORT = {
  name: { id: "name", accessor: "name" },
  stock: { id: "stock", accessor: "stock" },
  price: { id: "price", accessor: "price" },
} satisfies Record<string, SortSpec<StockItemRow>>;

export const stockSortSpec: SortSpec<StockItemRow>[] = Object.values(SORT);

const SUPPLIER_COLUMN: Column<StockItemRow> = {
  id: "supplier",
  header: "Nhà cung cấp",
  accessor: "supplier",
};

interface Options {
  /** Dụng cụ mua theo lô thiết bị nên không hiện cột nhà cung cấp */
  showSupplier: boolean;
  onEdit: (row: StockItemRow) => void;
  onDelete: (row: StockItemRow) => void;
}

export const createStockItemColumns = ({
  showSupplier,
  onEdit,
  onDelete,
}: Options): Column<StockItemRow>[] => {
  const leading: Column<StockItemRow>[] = [
    {
      ...SORT.name,
      header: "Tên",
      sortable: true,
      render: (row) => (
        <div>
          <div className="fw-semibold">{row.name}</div>
          <div className="text-secondary small">{row.id}</div>
        </div>
      ),
    },
    { id: "unit", header: "Đơn vị", accessor: "unit" },
    {
      ...SORT.stock,
      header: "Tồn kho",
      sortable: true,
      align: "end",
      // Hiện kèm định mức tối thiểu để thấy ngay vì sao bị coi là sắp hết
      render: (row) => (
        <div className="text-nowrap">
          <span className="fw-semibold">{formatNumber(row.stock)}</span>
          <span className="text-secondary small">
            {" / "}
            {formatNumber(row.minStock)}
          </span>
        </div>
      ),
    },
    {
      id: "level",
      header: "Trạng thái",
      render: (row) => (
        <Badge variant={STOCK_LEVELS[row.level].variant} size="sm">
          {STOCK_LEVELS[row.level].label}
        </Badge>
      ),
    },
    {
      ...SORT.price,
      header: "Đơn giá",
      sortable: true,
      align: "end",
      render: (row) => (
        <span className="text-nowrap">{formatCurrency(row.price)}</span>
      ),
    },
  ];

  const trailing: Column<StockItemRow>[] = [
    { id: "location", header: "Vị trí", accessor: "location" },
    {
      id: "updatedAt",
      header: "Cập nhật",
      render: (row) => formatDate(row.updatedAt),
    },
    {
      id: "actions",
      header: "Thao tác",
      align: "center",
      width: "90px",
      render: (row) => (
        <RowActions
          actions={[
            { label: "Sửa", icon: "pencil", onClick: () => onEdit(row) },
            {
              label: "Xóa",
              icon: "trash",
              danger: true,
              dividerBefore: true,
              onClick: () => onDelete(row),
            },
          ]}
        />
      ),
    },
  ];

  return [...leading, ...(showSupplier ? [SUPPLIER_COLUMN] : []), ...trailing];
};
