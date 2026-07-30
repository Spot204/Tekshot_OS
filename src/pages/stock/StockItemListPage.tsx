import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import type { ReactNode } from "react";
import type { StockItem } from "../../types/stockItem";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import ComboBox from "../../components/ui/ComboBox";
import Button from "../../components/ui/Button";
import Table from "../../components/ui/Table";
import TablePagination from "../../components/ui/TablePagination";
import StockItemFormModal from "./StockItemFormModal";
import { createStockItemColumns, stockSortSpec } from "./stockItemColumns";
import { toStockRows } from "./stockRows";
import { useTableSort } from "../../hooks/useTableSort";
import { STOCK_LEVEL_OPTIONS } from "../../constants/stockItem";
import { formatCurrency, formatNumber } from "../../utils/format";

export interface StockItemListPageProps {
  title: string;
  subtitle: string;
  icon: ReactNode;
  /** Tiền tố mã khi thêm mới, vd "VT" */
  idPrefix: string;
  createLabel: string;
  itemLabel: string;
  searchPlaceholder: string;
  seed: StockItem[];
  showSupplier?: boolean;
}

/**
 * Thân chung của vật tư / nguyên liệu / dụng cụ — ba trang chỉ khác nhãn và
 * việc có hiện nhà cung cấp hay không.
 */
export default function StockItemListPage({
  title,
  subtitle,
  icon,
  idPrefix,
  createLabel,
  itemLabel,
  searchPlaceholder,
  seed,
  showSupplier = true,
}: StockItemListPageProps) {
  const [items, setItems] = useState(seed);
  const [keyword, setKeyword] = useState("");
  const [level, setLevel] = useState("");
  const [location, setLocation] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const rows = useMemo(() => toStockRows(items), [items]);

  const locationOptions = useMemo(
    () => [
      { value: "", label: "Tất cả vị trí" },
      ...[...new Set(items.map((item) => item.location))].map((value) => ({
        value,
        label: value,
      })),
    ],
    [items],
  );

  // Lọc/phân trang cắt mảng ở client — thay bằng request khi có API
  const filtered = useMemo(() => {
    const needle = keyword.trim().toLowerCase();

    return rows.filter((row) => {
      if (level && row.level !== level) return false;
      if (location && row.location !== location) return false;
      if (!needle) return true;
      return [row.name, row.id, row.supplier].some((field) =>
        field.toLowerCase().includes(needle),
      );
    });
  }, [rows, keyword, level, location]);

  const { sort, sorted, onSortChange } = useTableSort(filtered, stockSortSpec);
  const visible = sorted.slice((page - 1) * pageSize, page * pageSize);

  const lowCount = rows.filter((row) => row.level !== "ok").length;
  const totalValue = rows.reduce((sum, row) => sum + row.price * row.stock, 0);

  // Đổi bộ lọc mà không về trang 1 thì bảng render rỗng
  const withPageReset =
    <T,>(setter: (value: T) => void) =>
    (value: T) => {
      setter(value);
      setPage(1);
    };

  const columns = createStockItemColumns({
    showSupplier,
    onEdit: (row) => console.log("Sửa", row.id),
    onDelete: (row) => console.log("Xóa", row.id),
  });

  return (
    <>
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
        <div className="d-flex align-items-center gap-3">
          <span className="warehouse-page-icon">{icon}</span>
          <div>
            <h4 className="fw-bold mb-0">{title}</h4>
            <p className="text-secondary small mb-0">{subtitle}</p>
          </div>
        </div>

        <Button
          className="d-inline-flex align-items-center gap-2"
          onClick={() => setShowForm(true)}
        >
          <Plus size={18} aria-hidden="true" />
          {createLabel}
        </Button>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <Card shadow bordered={false} padding="p-4">
            <div className="text-secondary small">Tổng danh mục</div>
            <div className="h4 fw-bold mb-0">{formatNumber(rows.length)}</div>
          </Card>
        </div>
        <div className="col-md-4">
          <Card shadow bordered={false} padding="p-4">
            <div className="text-secondary small">Cần nhập thêm</div>
            <div
              className="h4 fw-bold mb-0"
              style={{ color: lowCount ? "var(--danger)" : undefined }}
            >
              {formatNumber(lowCount)}
            </div>
          </Card>
        </div>
        <div className="col-md-4">
          <Card shadow bordered={false} padding="p-4">
            <div className="text-secondary small">Giá trị tồn kho</div>
            <div className="h4 fw-bold mb-0">{formatCurrency(totalValue)}</div>
          </Card>
        </div>
      </div>

      <Card shadow bordered={false} padding="p-4" className="mb-4">
        <div className="row g-3">
          <div className="col-xl-5 col-md-6">
            <Input
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
              value={keyword}
              onChange={(e) => withPageReset(setKeyword)(e.target.value)}
              leftIcon={<Search size={18} />}
            />
          </div>

          <div className="col-xl-3 col-md-6">
            <ComboBox
              options={STOCK_LEVEL_OPTIONS}
              aria-label="Trạng thái tồn kho"
              value={level}
              onChange={(e) => withPageReset(setLevel)(e.target.value)}
            />
          </div>

          <div className="col-xl-4 col-md-6">
            <ComboBox
              options={locationOptions}
              aria-label="Vị trí"
              value={location}
              onChange={(e) => withPageReset(setLocation)(e.target.value)}
            />
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
          emptyMessage={`Không tìm thấy ${itemLabel} phù hợp`}
        />

        <div className="mt-4">
          <TablePagination
            page={page}
            pageSize={pageSize}
            total={filtered.length}
            onPageChange={setPage}
            onPageSizeChange={withPageReset(setPageSize)}
            itemLabel={itemLabel}
          />
        </div>
      </Card>

      <StockItemFormModal
        show={showForm}
        title={createLabel}
        showSupplier={showSupplier}
        onClose={() => setShowForm(false)}
        onSubmit={(item) => {
          setItems((prev) => [
            { ...item, id: `${idPrefix}-${String(prev.length + 1).padStart(3, "0")}` },
            ...prev,
          ]);
          setPage(1);
        }}
      />
    </>
  );
}
