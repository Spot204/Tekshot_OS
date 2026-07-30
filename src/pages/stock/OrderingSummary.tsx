import { ClipboardList, Truck } from "lucide-react";
import type { ReorderRow, SupplierGroup } from "./orderingRows";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { formatCurrency, formatNumber } from "../../utils/format";

interface OrderingSummaryProps {
  groups: SupplierGroup[];
  note: string;
  onNoteChange: (note: string) => void;
  onRemove: (row: ReorderRow) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export default function OrderingSummary({
  groups,
  note,
  onNoteChange,
  onRemove,
  onSubmit,
  onCancel,
}: OrderingSummaryProps) {
  const itemCount = groups.reduce((sum, group) => sum + group.items.length, 0);
  const total = groups.reduce((sum, group) => sum + group.total, 0);

  return (
    <Card shadow bordered={false} padding="p-4" className="h-100">
      <h2 className="h6 fw-semibold mb-3">Đơn gọi hàng</h2>

      {groups.length === 0 ? (
        <div className="inbound-empty">
          <ClipboardList size={40} className="text-secondary" aria-hidden="true" />
          <div className="fw-semibold mt-2">Chưa chọn vật phẩm nào</div>
          <p className="text-secondary small mb-0">
            Tick vào các dòng cần gọi thêm ở bảng bên trái.
          </p>
        </div>
      ) : (
        <div className="d-flex flex-column gap-3 mb-3">
          {groups.map((group) => (
            <div key={group.supplier} className="border rounded-3 p-3">
              <div className="d-flex align-items-center gap-2 mb-2">
                <Truck size={16} className="text-secondary" aria-hidden="true" />
                <span className="small fw-semibold text-truncate me-auto">
                  {group.supplier}
                </span>
                <span className="small fw-semibold text-nowrap">
                  {formatCurrency(group.total)}
                </span>
              </div>

              <ul className="list-unstyled mb-0 d-flex flex-column gap-1">
                {group.items.map(({ row, quantity }) => (
                  <li
                    key={row.id}
                    className="d-flex align-items-center gap-2"
                    style={{ fontSize: "var(--fs-desc)" }}
                  >
                    <span className="text-truncate me-auto">{row.name}</span>
                    <span className="text-secondary text-nowrap">
                      {formatNumber(quantity)} {row.unit}
                    </span>
                    <button
                      type="button"
                      className="app-icon-toggle text-danger"
                      aria-label={`Bỏ ${row.name}`}
                      onClick={() => onRemove(row)}
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      <dl className="mb-0">
        <div className="inbound-row">
          <dt className="fw-normal text-secondary">Số nhà cung cấp</dt>
          <dd className="mb-0 fw-semibold">{formatNumber(groups.length)}</dd>
        </div>
        <div className="inbound-row">
          <dt className="fw-normal text-secondary">Số vật phẩm</dt>
          <dd className="mb-0 fw-semibold">{formatNumber(itemCount)}</dd>
        </div>
      </dl>

      <div className="inbound-total">
        <span className="fw-semibold">Giá trị dự kiến</span>
        <span className="h5 fw-bold mb-0" style={{ color: "var(--chart-brand)" }}>
          {formatCurrency(total)}
        </span>
      </div>

      <label htmlFor="ordering-note" className="form-label fw-semibold mt-3">
        Ghi chú
      </label>
      <textarea
        id="ordering-note"
        className="form-control"
        rows={3}
        placeholder="Nhập ghi chú gửi nhà cung cấp (nếu có)..."
        value={note}
        onChange={(e) => onNoteChange(e.target.value)}
      />

      <div className="d-flex gap-2 mt-3">
        <Button customVariant="secondary" className="flex-fill" onClick={onCancel}>
          Hủy
        </Button>
        <Button
          className="flex-fill"
          disabled={groups.length === 0}
          onClick={onSubmit}
        >
          Tạo {formatNumber(groups.length)} đơn
        </Button>
      </div>
    </Card>
  );
}
