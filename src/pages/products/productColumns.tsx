import type { Column } from "../../components/ui/Table";
import type { SortSpec } from "../../hooks/useTableSort";
import type { ProductRow } from "../../types/product";
import Icon from "../../components/ui/Icon";
import Badge from "../../components/ui/Badge";
import RowActions from "../../components/ui/RowActions";
import { PRODUCT_STATUSES } from "../../constants/product";
import { formatCurrency, formatNumber } from "../../utils/format";

const SORT = {
  product: { id: "product", accessor: "productName" },
  sku: { id: "sku", accessor: "sku" },
  price: { id: "price", accessor: "price" },
  stock: { id: "stock", accessor: "stock" },
} satisfies Record<string, SortSpec<ProductRow>>;

export const productSortSpec: SortSpec<ProductRow>[] = Object.values(SORT);

interface Options {
  selectedIds: Set<string>;
  onToggle: (id: string) => void;
  onToggleAll: () => void;
  allSelected: boolean;
  onEdit: (row: ProductRow) => void;
  onDelete: (row: ProductRow) => void;
}

export const createProductColumns = ({
  selectedIds,
  onToggle,
  onToggleAll,
  allSelected,
  onEdit,
  onDelete,
}: Options): Column<ProductRow>[] => [
  {
    id: "select",
    width: "48px",
    header: (
      <input
        type="checkbox"
        className="form-check-input"
        checked={allSelected}
        onChange={onToggleAll}
        aria-label="Chọn tất cả sản phẩm"
      />
    ),
    render: (row) => (
      <input
        type="checkbox"
        className="form-check-input"
        checked={selectedIds.has(row.id)}
        onChange={() => onToggle(row.id)}
        aria-label={`Chọn ${row.productName}`}
      />
    ),
  },
  {
    ...SORT.product,
    header: "Sản phẩm",
    sortable: true,
    render: (row) => (
      <div className="d-flex align-items-center gap-3">
        <span className="product-thumb">
          {row.imageUrl ? (
            <img src={row.imageUrl} alt="" />
          ) : (
            <Icon name="box-seam" size={18} />
          )}
        </span>
        <div className="min-w-0">
          <div className="fw-semibold text-truncate">{row.productName}</div>
          <div className="text-secondary small text-truncate">{row.name}</div>
        </div>
      </div>
    ),
  },
  { ...SORT.sku, header: "SKU", sortable: true },
  { id: "category", header: "Danh mục", accessor: "category" },
  {
    ...SORT.price,
    header: "Giá bán",
    sortable: true,
    align: "end",
    render: (row) => formatCurrency(row.price),
  },
  {
    ...SORT.stock,
    header: "Tồn kho",
    sortable: true,
    align: "center",
    render: (row) => (
      <Badge variant={PRODUCT_STATUSES[row.status].variant} size="sm">
        {formatNumber(row.stock)}
      </Badge>
    ),
  },
  {
    id: "status",
    header: "Trạng thái",
    render: (row) => (
      <Badge variant={PRODUCT_STATUSES[row.status].variant} size="sm">
        {PRODUCT_STATUSES[row.status].label}
      </Badge>
    ),
  },
  {
    id: "actions",
    header: "Thao tác",
    align: "center",
    width: "90px",
    render: (row) => (
      <RowActions
        actions={[
          {
            label: "Sửa sản phẩm",
            icon: "pencil",
            onClick: () => onEdit(row),
          },
          {
            label: "Xóa sản phẩm",
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
