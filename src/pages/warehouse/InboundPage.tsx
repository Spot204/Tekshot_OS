import { useMemo, useState } from "react";
import Card from "../../components/ui/Card";
import Icon from "../../components/ui/Icon";
import Input from "../../components/ui/Input";
import ComboBox from "../../components/ui/ComboBox";
import Button from "../../components/ui/Button";
import DateInput from "../../components/ui/DateInput";
import InboundSummary from "./InboundSummary";
import type { InboundLine } from "./InboundSummary";
import { toProductRows } from "../products/productRows";
import { products } from "../../mocks/products";
import { warehouses } from "../../mocks/warehouses";
import { formatNumber } from "../../utils/format";

const PAGE_STEP = 8;

const WAREHOUSE_OPTIONS = warehouses.map((warehouse) => ({
  value: warehouse.id,
  label: warehouse.name,
}));

export default function InboundPage() {
  const [warehouseId, setWarehouseId] = useState(warehouses[0].id);
  const [date, setDate] = useState<Date | null>(new Date("2026-07-28"));
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [shown, setShown] = useState(PAGE_STEP);
  const [lines, setLines] = useState<InboundLine[]>([]);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [note, setNote] = useState("");

  const rows = useMemo(() => toProductRows(products), []);

  const categoryOptions = useMemo(
    () => [
      { value: "", label: "Tất cả danh mục" },
      ...[...new Set(rows.map((row) => row.category))].map((value) => ({
        value,
        label: value,
      })),
    ],
    [rows],
  );

  const filtered = useMemo(() => {
    const needle = keyword.trim().toLowerCase();

    return rows.filter((row) => {
      if (category && row.category !== category) return false;
      if (!needle) return true;
      return [row.productName, row.sku].some((field) =>
        field.toLowerCase().includes(needle),
      );
    });
  }, [rows, keyword, category]);

  const visible = filtered.slice(0, shown);

  const addLine = (variantId: string) => {
    const row = rows.find((item) => item.id === variantId);
    if (!row) return;

    setLines((prev) => {
      const existing = prev.find((line) => line.row.id === variantId);
      if (existing) {
        return prev.map((line) =>
          line.row.id === variantId
            ? { ...line, quantity: line.quantity + 1 }
            : line,
        );
      }
      return [...prev, { row, quantity: 1 }];
    });
  };

  // Giảm về 0 nghĩa là bỏ khỏi phiếu, không giữ dòng số lượng 0
  const setQuantity = (variantId: string, quantity: number) =>
    setLines((prev) =>
      quantity <= 0
        ? prev.filter((line) => line.row.id !== variantId)
        : prev.map((line) =>
            line.row.id === variantId ? { ...line, quantity } : line,
          ),
    );

  const reset = () => {
    setLines([]);
    setDiscountPercent(0);
    setNote("");
  };

  return (
    <>
      <div className="d-flex align-items-center gap-3 mb-2">
        <span className="warehouse-page-icon" >
          <Icon name="box-arrow-in-down" size={24} />
        </span>
        <div>
          <h4 className="fw-bold mb-0">Nhập hàng</h4>
          <p className="text-secondary small mb-0">Kho hàng · Nhập hàng</p>
        </div>
      </div>

      <div className="row g-2">
        <div className="col-xl-8">
          <Card shadow bordered={false} padding="p-4" className="mb-2">
            <div className="row g-3">
              <div className="col-md-6">
                <label
                  htmlFor="inbound-warehouse"
                  className="form-label fw-semibold"
                >
                  Kho nhập hàng <span className="text-danger">*</span>
                </label>
                <ComboBox
                  id="inbound-warehouse"
                  options={WAREHOUSE_OPTIONS}
                  value={warehouseId}
                  onChange={(e) => setWarehouseId(e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label
                  htmlFor="inbound-date"
                  className="form-label fw-semibold"
                >
                  Ngày nhập <span className="text-danger">*</span>
                </label>
                <DateInput
                  id="inbound-date"
                  selected={date}
                  onChange={setDate}
                />
              </div>
            </div>
          </Card>

          <Card shadow bordered={false} padding="p-4">
            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <Input
                  placeholder="Tìm kiếm sản phẩm, SKU, mã vạch..."
                  aria-label="Tìm kiếm sản phẩm"
                  value={keyword}
                  onChange={(e) => {
                    setKeyword(e.target.value);
                    setShown(PAGE_STEP);
                  }}
                  leftIcon={<Icon name="search" size={18} />}
                />
              </div>

              <div className="col-md-4">
                <ComboBox
                  options={categoryOptions}
                  aria-label="Danh mục"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setShown(PAGE_STEP);
                  }}
                />
              </div>

              <div className="col-md-2">
                <button
                  type="button"
                  className="app-header-icon-btn border"
                  aria-label="Bộ lọc"
                >
                  <Icon name="sliders" size={18} />
                </button>
              </div>
            </div>

            {visible.length === 0 ? (
              <p className="text-secondary text-center py-4 mb-0">
                Không tìm thấy sản phẩm phù hợp
              </p>
            ) : (
              <div className="row g-3">
                {visible.map((row) => (
                  <div key={row.id} className="col-xl-3 col-md-4 col-sm-6">
                    <div className="inbound-card">
                      <div className="inbound-thumb">
                        <Icon name="box-arrow-in-down" size={28} />
                      </div>

                      <div className="small fw-semibold text-truncate">
                        {row.productName}
                      </div>
                      <div
                        className="text-secondary text-truncate"
                        style={{ fontSize: "var(--fs-micro)" }}
                      >
                        {row.sku}
                      </div>

                      <div className="d-flex align-items-center gap-2 mt-2">
                        <span className="small text-success me-auto">
                          Tồn kho: {formatNumber(row.stock)}
                        </span>
                        <button
                          type="button"
                          className="app-header-icon-btn border"
                          style={{ width: 32, height: 32 }}
                          aria-label={`Thêm ${row.productName}`}
                          onClick={() => addLine(row.id)}
                        >
                          <Icon name="plus-lg" size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {shown < filtered.length && (
              <div className="text-center mt-4">
                <Button
                  customVariant="secondary"
                  className="d-inline-flex align-items-center gap-2"
                  onClick={() => setShown((value) => value + PAGE_STEP)}
                >
                  Xem thêm sản phẩm
                  <Icon name="chevron-down" size={16} />
                </Button>
              </div>
            )}
          </Card>
        </div>

        <div className="col-xl-4">
          <InboundSummary
            lines={lines}
            discountPercent={discountPercent}
            note={note}
            onQuantityChange={setQuantity}
            onRemove={(id) => setQuantity(id, 0)}
            onDiscountChange={setDiscountPercent}
            onNoteChange={setNote}
            onCancel={reset}
            onSubmit={() => {
              console.log("Lưu phiếu nhập", { warehouseId, date, lines, note });
              reset();
            }}
          />
        </div>
      </div>
    </>
  );
}
