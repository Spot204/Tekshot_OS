import { useMemo, useState } from "react";
import Icon from "../../components/ui/Icon";
import type { Combo } from "../../types/combo";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import ComboBox from "../../components/ui/ComboBox";
import Button from "../../components/ui/Button";
import Table from "../../components/ui/Table";
import TablePagination from "../../components/ui/TablePagination";
import ComboFormModal from "./ComboFormModal";
import { createComboColumns, comboSortSpec } from "./comboColumns";
import { toComboRows } from "./comboRows";
import { toProductRows } from "../products/productRows";
import { useTableSort } from "../../hooks/useTableSort";
import { combos as seedCombos } from "../../mocks/combos";
import { products } from "../../mocks/products";
import { formatCurrency, formatNumber } from "../../utils/format";

const STATUS_OPTIONS = [
  { value: "", label: "Tất cả trạng thái" },
  { value: "selling", label: "Đang bán" },
  { value: "stopped", label: "Ngừng bán" },
];

export default function CombosPage() {
  const [items, setItems] = useState<Combo[]>(seedCombos);
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const variants = useMemo(() => toProductRows(products), []);
  const rows = useMemo(() => toComboRows(items, variants), [items, variants]);

  // Lọc/phân trang cắt mảng ở client — thay bằng request khi có API
  const filtered = useMemo(() => {
    const needle = keyword.trim().toLowerCase();

    return rows.filter((combo) => {
      if (status && combo.status !== status) return false;
      if (!needle) return true;
      return [combo.name, combo.id, combo.description].some((field) =>
        field.toLowerCase().includes(needle),
      );
    });
  }, [rows, keyword, status]);

  const { sort, sorted, onSortChange } = useTableSort(filtered, comboSortSpec);
  const visible = sorted.slice((page - 1) * pageSize, page * pageSize);

  const totalSaving = rows.reduce((sum, combo) => sum + combo.saving, 0);
  const sellingCount = rows.filter(
    (combo) => combo.status === "selling",
  ).length;

  const withPageReset =
    <T,>(setter: (value: T) => void) =>
    (value: T) => {
      setter(value);
      setPage(1);
    };

  const columns = createComboColumns({
    onEdit: (combo) => console.log("Sửa combo", combo.id),
    onDelete: (combo) => console.log("Xóa combo", combo.id),
  });

  return (
    <>
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-2">
        <div className="d-flex align-items-center gap-3">
          <span className="product-page-icon">
            <Icon name="layers" size={24} />
          </span>
          <div>
            <h4 className="fw-bold mb-0">Combo</h4>
            <p className="text-secondary small mb-0">Hàng hóa · Combo</p>
          </div>
        </div>

        <Button
          className="d-inline-flex align-items-center gap-2"
          onClick={() => setShowForm(true)}
        >
          <Icon name="plus-lg" size={18} />
          Thêm combo
        </Button>
      </div>

      <div className="row g-2 mb-2">
        <div className="col-md-4">
          <Card shadow bordered={false} padding="p-4">
            <div className="text-secondary small">Tổng combo</div>
            <div className="h4 fw-bold mb-0">{formatNumber(rows.length)}</div>
          </Card>
        </div>
        <div className="col-md-4">
          <Card shadow bordered={false} padding="p-4">
            <div className="text-secondary small">Đang bán</div>
            <div className="h4 fw-bold mb-0">{formatNumber(sellingCount)}</div>
          </Card>
        </div>
        <div className="col-md-4">
          <Card shadow bordered={false} padding="p-4">
            <div className="text-secondary small">Tổng mức tiết kiệm</div>
            <div
              className="h4 fw-bold mb-0"
              style={{ color: "var(--chart-success)" }}
            >
              {formatCurrency(totalSaving)}
            </div>
          </Card>
        </div>
      </div>

      <Card shadow bordered={false} padding="p-4" className="mb-2">
        <div className="row g-3">
          <div className="col-xl-6 col-md-6">
            <Input
              placeholder="Tìm theo tên combo, mã, mô tả..."
              aria-label="Tìm kiếm combo"
              value={keyword}
              onChange={(e) => withPageReset(setKeyword)(e.target.value)}
              leftIcon={<Icon name="search" size={18} />}
            />
          </div>

          <div className="col-xl-3 col-md-6">
            <ComboBox
              options={STATUS_OPTIONS}
              aria-label="Trạng thái combo"
              value={status}
              onChange={(e) => withPageReset(setStatus)(e.target.value)}
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
          emptyMessage="Không tìm thấy combo phù hợp"
        />

        <div className="mt-4">
          <TablePagination
            page={page}
            pageSize={pageSize}
            total={filtered.length}
            onPageChange={setPage}
            onPageSizeChange={withPageReset(setPageSize)}
            itemLabel="combo"
          />
        </div>
      </Card>

      <ComboFormModal
        show={showForm}
        variants={variants}
        onClose={() => setShowForm(false)}
        onSubmit={(combo) => {
          setItems((prev) => [
            { ...combo, id: `CB-${String(prev.length + 1).padStart(3, "0")}` },
            ...prev,
          ]);
          setPage(1);
        }}
      />
    </>
  );
}
