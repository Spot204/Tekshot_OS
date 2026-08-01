import { ClipboardList, Minus, Plus, X } from "lucide-react";
import type { ProductRow } from "../../types/product";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { toNumber } from "../vouchers/voucherLine";
import { formatCurrency, formatNumber } from "../../utils/format";

export interface InboundLine {
  row: ProductRow;
  quantity: number;
}

interface InboundSummaryProps {
  lines: InboundLine[];
  discountPercent: number;
  note: string;
  onQuantityChange: (variantId: string, quantity: number) => void;
  onRemove: (variantId: string) => void;
  onDiscountChange: (percent: number) => void;
  onNoteChange: (note: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export default function InboundSummary({
  lines,
  discountPercent,
  note,
  onQuantityChange,
  onRemove,
  onDiscountChange,
  onNoteChange,
  onSubmit,
  onCancel,
}: InboundSummaryProps) {
  const totalQuantity = lines.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = lines.reduce(
    (sum, line) => sum + line.row.price * line.quantity,
    0,
  );
  const discount = Math.round((subtotal * discountPercent) / 100);

  return (
    <Card shadow bordered={false} padding="p-4" className="h-100">
      <h2 className="h6 fw-semibold mb-3">Thông tin nhập hàng</h2>

      {lines.length === 0 ? (
        <div className="inbound-empty">
          <ClipboardList
            size={40}
            className="text-secondary"
            aria-hidden="true"
          />
          <div className="fw-semibold mt-2">Chưa có sản phẩm nào</div>
          <p className="text-secondary small mb-0">
            Hãy chọn sản phẩm từ danh sách bên trái để thêm vào phiếu nhập.
          </p>
        </div>
      ) : (
        <ul className="list-unstyled d-flex flex-column gap-2 mb-3">
          {lines.map(({ row, quantity }) => (
            <li key={row.id} className="border rounded-3 p-2">
              <div className="d-flex align-items-start gap-2">
                <div className="min-w-0 me-auto">
                  <div className="small fw-semibold text-truncate">
                    {row.productName}
                  </div>
                  <div
                    className="text-secondary"
                    style={{ fontSize: "var(--fs-micro)" }}
                  >
                    {row.sku} · {formatCurrency(row.price)}
                  </div>
                </div>

                <button
                  type="button"
                  className="app-icon-toggle text-danger"
                  aria-label={`Bỏ ${row.productName}`}
                  onClick={() => onRemove(row.id)}
                >
                  <X size={14} />
                </button>
              </div>

              <div className="d-flex align-items-center gap-2 mt-2">
                <button
                  type="button"
                  className="app-header-icon-btn border"
                  style={{ width: 30, height: 30 }}
                  aria-label={`Giảm số lượng ${row.productName}`}
                  onClick={() => onQuantityChange(row.id, quantity - 1)}
                >
                  <Minus size={14} />
                </button>

                <Input
                  size="sm"
                  inputMode="numeric"
                  aria-label={`Số lượng ${row.productName}`}
                  className="text-center"
                  style={{ width: 64 }}
                  value={String(quantity)}
                  onChange={(e) =>
                    onQuantityChange(row.id, toNumber(e.target.value))
                  }
                />

                <button
                  type="button"
                  className="app-header-icon-btn border"
                  style={{ width: 30, height: 30 }}
                  aria-label={`Tăng số lượng ${row.productName}`}
                  onClick={() => onQuantityChange(row.id, quantity + 1)}
                >
                  <Plus size={14} />
                </button>

                <span className="ms-auto fw-semibold small">
                  {formatCurrency(row.price * quantity)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}

      <dl className="mb-0">
        <div className="inbound-row">
          <dt className="fw-normal text-secondary">Tổng số sản phẩm</dt>
          <dd className="mb-0 fw-semibold">{formatNumber(lines.length)}</dd>
        </div>

        <div className="inbound-row">
          <dt className="fw-normal text-secondary">Tổng số lượng</dt>
          <dd className="mb-0 fw-semibold">{formatNumber(totalQuantity)}</dd>
        </div>

        <div className="inbound-row">
          <dt className="fw-normal text-secondary">Tổng tiền hàng</dt>
          <dd className="mb-0 fw-semibold">{formatCurrency(subtotal)}</dd>
        </div>

        <div className="inbound-row">
          <dt className="fw-normal text-secondary">Chiết khấu</dt>
          <dd className="mb-0 d-flex align-items-center gap-2">
            <Input
              size="sm"
              inputMode="numeric"
              aria-label="Chiết khấu phần trăm"
              className="text-end"
              style={{ width: 72 }}
              value={String(discountPercent)}
              // Chiết khấu quá 100% sẽ cho tổng âm
              onChange={(e) =>
                onDiscountChange(Math.min(100, toNumber(e.target.value)))
              }
            />
            <span className="text-secondary small">%</span>
            <span className="fw-semibold">{formatCurrency(discount)}</span>
          </dd>
        </div>
      </dl>

      <div className="inbound-total">
        <span className="fw-semibold">Tổng thanh toán</span>
        <span
          className="h5 fw-bold mb-0"
          style={{ color: "var(--chart-brand)" }}
        >
          {formatCurrency(subtotal - discount)}
        </span>
      </div>

      <label htmlFor="inbound-note" className="form-label fw-semibold mt-3">
        Ghi chú
      </label>
      <textarea
        id="inbound-note"
        className="form-control"
        rows={3}
        placeholder="Nhập ghi chú (nếu có)..."
        value={note}
        onChange={(e) => onNoteChange(e.target.value)}
      />

      <div className="d-flex gap-2 mt-3">
        <Button
          customVariant="secondary"
          className="flex-fill"
          onClick={onCancel}
        >
          Hủy
        </Button>
        <Button
          className="flex-fill"
          disabled={lines.length === 0}
          onClick={onSubmit}
        >
          Lưu
        </Button>
      </div>
    </Card>
  );
}
