import clsx from "clsx";
import type { Column } from "../../components/ui/Table";
import type { SortSpec } from "../../hooks/useTableSort";
import type { ComboRow } from "../../types/combo";
import Badge from "../../components/ui/Badge";
import RowActions from "../../components/ui/RowActions";
import { formatCurrency, formatNumber } from "../../utils/format";

const SORT = {
  name: { id: "name", accessor: "name" },
  price: { id: "price", accessor: "price" },
  saving: { id: "saving", sortValue: (row) => row.saving },
} satisfies Record<string, SortSpec<ComboRow>>;

export const comboSortSpec: SortSpec<ComboRow>[] = Object.values(SORT);

interface Options {
  onEdit: (combo: ComboRow) => void;
  onDelete: (combo: ComboRow) => void;
}

export const createComboColumns = ({
  onEdit,
  onDelete,
}: Options): Column<ComboRow>[] => [
  {
    ...SORT.name,
    header: "Combo",
    sortable: true,
    render: (combo) => (
      <div className="min-w-0">
        <div className="fw-semibold">{combo.name}</div>
        <div className="text-secondary small text-truncate">
          {combo.id} · {combo.description}
        </div>
      </div>
    ),
  },
  {
    id: "items",
    header: "Thành phần",
    render: (combo) => (
      <ul className="list-unstyled mb-0 small">
        {combo.lines.map((line) => (
          <li key={line.variantId} className="text-nowrap">
            {line.name}
            <span className="text-secondary"> ×{formatNumber(line.quantity)}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    id: "originalPrice",
    header: "Giá gốc",
    align: "end",
    render: (combo) => (
      <span className="text-secondary text-decoration-line-through text-nowrap">
        {formatCurrency(combo.originalPrice)}
      </span>
    ),
  },
  {
    ...SORT.price,
    header: "Giá combo",
    sortable: true,
    align: "end",
    render: (combo) => (
      <span className="fw-semibold text-nowrap">
        {formatCurrency(combo.price)}
      </span>
    ),
  },
  {
    ...SORT.saving,
    header: "Tiết kiệm",
    sortable: true,
    align: "end",
    // Giá combo cao hơn tổng thành phần là cấu hình sai, tô đỏ cho thấy ngay
    render: (combo) => (
      <span
        className={clsx(
          "fw-semibold text-nowrap",
          combo.saving < 0 ? "text-danger" : "text-success",
        )}
      >
        {formatCurrency(combo.saving)}
        <span className="fw-normal small"> ({combo.savingPercent}%)</span>
      </span>
    ),
  },
  {
    id: "status",
    header: "Trạng thái",
    render: (combo) => (
      <Badge
        variant={combo.status === "selling" ? "success" : "secondary"}
        size="sm"
      >
        {combo.status === "selling" ? "Đang bán" : "Ngừng bán"}
      </Badge>
    ),
  },
  {
    id: "actions",
    header: "Thao tác",
    align: "center",
    width: "90px",
    render: (combo) => (
      <RowActions
        actions={[
          { label: "Sửa combo", icon: "bi-pencil", onClick: () => onEdit(combo) },
          {
            label: "Xóa combo",
            icon: "bi-trash",
            danger: true,
            dividerBefore: true,
            onClick: () => onDelete(combo),
          },
        ]}
      />
    ),
  },
];
