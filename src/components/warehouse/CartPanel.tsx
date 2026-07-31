import Card from "../ui/Card";
import Button from "../ui/Button";

export interface CartItem {
    id: number;
    name: string;
    image: string;
    quantity: number;
    unitPrice: number;
}

export interface ImportCartPanelProps {
    items: CartItem[];
    onQuantityChange: (id: number, quantity: number) => void;
    onRemove: (id: number) => void;
    discountPercent: number;
    onDiscountPercentChange: (value: number) => void;
    note: string;
    onNoteChange: (value: string) => void;
    onCancel: () => void;
    onSave: () => void;
}

const formatCurrency = (value: number) => `${value.toLocaleString("vi-VN")}đ`;

export default function ImportCartPanel({
    items,
    onQuantityChange,
    onRemove,
    discountPercent,
    onDiscountPercentChange,
    note,
    onNoteChange,
    onCancel,
    onSave,
}: ImportCartPanelProps) {
    const totalProducts = items.length;
    const totalQuantity = items.reduce((sum, i) => sum + i.quantity, 0);
    const totalAmount = items.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0);
    const discountAmount = Math.round((totalAmount * discountPercent) / 100);
    const finalTotal = totalAmount - discountAmount;

    return (
        <Card className="mt-3">
            <div className="fs-5 fw-bold mb-3">Thông tin nhập hàng</div>

            {items.length === 0 ? (
                <div className="text-center py-4">
                    <div
                        className="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary-subtle text-primary mb-3"
                        style={{ width: 72, height: 72 }}
                    >
                        <i className="bi bi-clipboard2-check fs-2" />
                    </div>
                    <div className="fw-bold mb-1">Chưa có sản phẩm nào</div>
                    <div className="text-muted small">
                        Hãy chọn sản phẩm từ danh sách bên trái để thêm vào phiếu nhập.
                    </div>
                </div>
            ) : (
                <div className="mb-3" style={{ maxHeight: 280, overflowY: "auto" }}>
                    {items.map((item) => (
                        <div key={item.id} className="d-flex align-items-center gap-2 mb-2">
                            <img
                                src={item.image}
                                alt={item.name}
                                width={40}
                                height={40}
                                className="rounded-2 object-fit-cover bg-light flex-shrink-0"
                            />
                            <div className="flex-grow-1" style={{ minWidth: 0 }}>
                                <div className="fw-semibold small text-truncate">{item.name}</div>
                                <div className="text-muted small">{formatCurrency(item.unitPrice)}</div>
                            </div>
                            <div className="d-flex align-items-center gap-1 flex-shrink-0">
                                <button
                                    type="button"
                                    className="btn btn-sm btn-light border"
                                    onClick={() => onQuantityChange(item.id, Math.max(1, item.quantity - 1))}
                                >
                                    -
                                </button>
                                <span className="px-1" style={{ minWidth: 20, textAlign: "center" }}>
                                    {item.quantity}
                                </span>
                                <button
                                    type="button"
                                    className="btn btn-sm btn-light border"
                                    onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                                >
                                    +
                                </button>
                            </div>
                            <button
                                type="button"
                                className="btn btn-sm text-danger"
                                onClick={() => onRemove(item.id)}
                            >
                                <i className="bi bi-trash" />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <div className="d-flex justify-content-between small mb-2">
                <span className="text-muted">Tổng số sản phẩm</span>
                <span>{totalProducts}</span>
            </div>
            <div className="d-flex justify-content-between small mb-2">
                <span className="text-muted">Tổng số lượng</span>
                <span>{totalQuantity}</span>
            </div>
            <div className="d-flex justify-content-between small mb-2">
                <span className="text-muted">Tổng tiền hàng</span>
                <span>{formatCurrency(totalAmount)}</span>
            </div>

            <div className="d-flex justify-content-between align-items-center small mb-2">
                <span className="text-muted d-flex align-items-center gap-1">
                    Chiết khấu <i className="bi bi-info-circle" />
                </span>
                <div className="d-flex align-items-center gap-1" style={{ width: 130 }}>
                    <input
                        type="number"
                        className="form-control form-control-sm"
                        value={discountPercent}
                        min={0}
                        max={100}
                        onChange={(e) => onDiscountPercentChange(Number(e.target.value))}
                    />
                    <span className="text-muted">%</span>
                    <span className="text-nowrap">{formatCurrency(discountAmount)}</span>
                </div>
            </div>

            <div className="d-flex justify-content-between align-items-center bg-primary-subtle text-primary rounded-3 px-3 py-2 fw-bold mb-3">
                <span>Tổng thanh toán</span>
                <span>{formatCurrency(finalTotal)}</span>
            </div>

            <label className="form-label">Ghi chú</label>
            <textarea
                className="form-control mb-3 rounded-4 shadow-sm"
                rows={3}
                placeholder="Nhập ghi chú (nếu có)..."
                value={note}
                onChange={(e) => onNoteChange(e.target.value)}
            />

            <div className="d-flex gap-2">
                <Button customVariant="secondary" className="flex-grow-1 rounded-4" onClick={onCancel}>
                    Hủy
                </Button>
                <Button customVariant="primary" className="flex-grow-1 rounded-4" onClick={onSave}>
                    Lưu
                </Button>
            </div>
        </Card>
    );
}