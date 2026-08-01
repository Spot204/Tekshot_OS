import { useMemo, useState } from "react";
import {
  Package,
  Plus,
  Search,
  Settings,
  SlidersHorizontal,
} from "lucide-react";
import type { Product } from "../../types/product";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import ComboBox from "../../components/ui/ComboBox";
import Button from "../../components/ui/Button";
import Table from "../../components/ui/Table";
import TablePagination from "../../components/ui/TablePagination";
import ProductStats from "./ProductStats";
import ProductFormModal from "./ProductFormModal";
import { createProductColumns, productSortSpec } from "./productColumns";
import { toProductRows } from "./productRows";
import { useTableSort } from "../../hooks/useTableSort";
import { STATUS_FILTER_OPTIONS } from "../../constants/product";
import { products as seedProducts } from "../../mocks/products";

export default function ProductsPage() {
  const [items, setItems] = useState<Product[]>(seedProducts);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const rows = useMemo(() => toProductRows(items), [items]);

  const categoryOptions = useMemo(
    () => [
      { value: "", label: "Danh mục" },
      ...[...new Set(items.map((p) => p.category))].map((value) => ({
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
      if (category && row.category !== category) return false;
      if (status && row.status !== status) return false;
      if (!needle) return true;
      return [row.productName, row.sku, row.name].some((field) =>
        field.toLowerCase().includes(needle),
      );
    });
  }, [rows, keyword, category, status]);

  const { sort, sorted, onSortChange } = useTableSort(
    filtered,
    productSortSpec,
  );
  const visible = sorted.slice((page - 1) * pageSize, page * pageSize);

  const toggle = (id: string) =>
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (!next.delete(id)) next.add(id);
      return next;
    });

  const allSelected =
    visible.length > 0 && visible.every((row) => selectedIds.has(row.id));

  const toggleAll = () =>
    setSelectedIds((prev) => {
      const next = new Set(prev);
      visible.forEach((row) =>
        allSelected ? next.delete(row.id) : next.add(row.id),
      );
      return next;
    });

  // Đổi bộ lọc mà không về trang 1 thì bảng render rỗng
  const withPageReset =
    <T,>(setter: (value: T) => void) =>
    (value: T) => {
      setter(value);
      setPage(1);
    };

  const columns = createProductColumns({
    selectedIds,
    onToggle: toggle,
    onToggleAll: toggleAll,
    allSelected,
    onEdit: (row) => console.log("Sửa", row.sku),
    onDelete: (row) => console.log("Xóa", row.sku),
  });

  return (
    <>
      <div className="d-flex align-items-center gap-3 mb-2">
        <span className="product-page-icon">
          <Package size={24} />
        </span>
        <div>
          <h4 className="fw-bold mb-0">Hàng hóa</h4>
          <p className="text-secondary small mb-0">Mục phân loại · Hàng hóa</p>
        </div>
      </div>

      <ProductStats />

      <Card shadow bordered={false} padding="p-4" className="mb-2">
        <div className="row g-3 align-items-center">
          <div className="col-xl-4 col-md-6">
            <Input
              placeholder="Tìm kiếm hàng hóa, SKU, mã vạch..."
              aria-label="Tìm kiếm hàng hóa"
              value={keyword}
              onChange={(e) => withPageReset(setKeyword)(e.target.value)}
              leftIcon={<Search size={18} />}
            />
          </div>

          <div className="col-xl-2 col-md-6">
            <ComboBox
              options={categoryOptions}
              aria-label="Danh mục"
              value={category}
              onChange={(e) => withPageReset(setCategory)(e.target.value)}
            />
          </div>

          <div className="col-xl-2 col-md-6">
            <ComboBox
              options={STATUS_FILTER_OPTIONS}
              aria-label="Trạng thái"
              value={status}
              onChange={(e) => withPageReset(setStatus)(e.target.value)}
            />
          </div>

          <div className="col-xl-4 d-flex justify-content-xl-end gap-2">
            <Button
              customVariant="secondary"
              className="d-inline-flex align-items-center gap-2 text-nowrap"
            >
              <SlidersHorizontal size={16} aria-hidden="true" />
              Bộ lọc
            </Button>

            <Button
              className="d-inline-flex align-items-center gap-2 text-nowrap"
              onClick={() => setShowForm(true)}
            >
              <Plus size={16} aria-hidden="true" />
              Thêm mới
            </Button>

            <button
              type="button"
              className="app-header-icon-btn border"
              aria-label="Cấu hình bảng"
            >
              <Settings size={18} />
            </button>
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
          emptyMessage="Không tìm thấy hàng hóa phù hợp"
        />

        <div className="mt-4">
          <TablePagination
            page={page}
            pageSize={pageSize}
            total={filtered.length}
            onPageChange={setPage}
            onPageSizeChange={withPageReset(setPageSize)}
            itemLabel="sản phẩm"
          />
        </div>
      </Card>

      <ProductFormModal
        show={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={(product) => {
          setItems((prev) => [product, ...prev]);
          setPage(1);
        }}
      />
    </>
  );
}
