import { useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { Minus, Plus, X } from "lucide-react";
import type { Combo, ComboItem } from "../../types/combo";
import type { ProductRow } from "../../types/product";
import Input from "../../components/ui/Input";
import ComboBox from "../../components/ui/ComboBox";
import Button from "../../components/ui/Button";
import { toNumber } from "../vouchers/voucherLine";
import { formatCurrency } from "../../utils/format";

const STATUS_OPTIONS = [
  { value: "selling", label: "Đang bán" },
  { value: "stopped", label: "Ngừng bán" },
];

interface ComboFormModalProps {
  show: boolean;
  variants: ProductRow[];
  onClose: () => void;
  onSubmit: (combo: Omit<Combo, "id">) => void;
}

type Errors = Partial<Record<"name" | "price" | "items", string>>;

export default function ComboFormModal({
  show,
  variants,
  onClose,
  onSubmit,
}: ComboFormModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [status, setStatus] = useState("selling");
  const [items, setItems] = useState<ComboItem[]>([]);
  const [picked, setPicked] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  const byId = useMemo(
    () => new Map(variants.map((variant) => [variant.id, variant])),
    [variants],
  );

  const originalPrice = items.reduce(
    (sum, item) => sum + (byId.get(item.variantId)?.price ?? 0) * item.quantity,
    0,
  );

  const variantOptions = [
    { value: "", label: "-- Chọn sản phẩm để thêm --" },
    ...variants
      .filter((variant) => !items.some((item) => item.variantId === variant.id))
      .map((variant) => ({
        value: variant.id,
        label: `${variant.productName} · ${formatCurrency(variant.price)}`,
      })),
  ];

  const add = (variantId: string) => {
    if (!variantId) return;
    setItems((prev) => [...prev, { variantId, quantity: 1 }]);
    setPicked("");
    setErrors(({ items: _dropped, ...rest }) => rest);
  };

  // Giảm về 0 là bỏ khỏi combo, không giữ dòng số lượng 0
  const setQuantity = (variantId: string, quantity: number) =>
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((item) => item.variantId !== variantId)
        : prev.map((item) =>
            item.variantId === variantId ? { ...item, quantity } : item,
          ),
    );

  const close = () => {
    setName("");
    setDescription("");
    setPrice(0);
    setStatus("selling");
    setItems([]);
    setPicked("");
    setErrors({});
    onClose();
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();

    const found: Errors = {};
    if (!name.trim()) found.name = "Chưa nhập tên combo";
    if (price <= 0) found.price = "Giá combo phải lớn hơn 0";
    if (!items.length) found.items = "Combo cần ít nhất một thành phần";

    setErrors(found);
    if (Object.keys(found).length) return;

    onSubmit({
      name: name.trim(),
      description: description.trim(),
      items,
      price,
      status: status as Combo["status"],
    });
    close();
  };

  return (
    <Modal show={show} onHide={close} size="lg" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title className="h5 fw-bold">Tạo combo</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form id="combo-form" onSubmit={submit} noValidate>
          <div className="row g-3">
            <div className="col-md-7">
              <label htmlFor="combo-name" className="form-label fw-semibold">
                Tên combo <span className="text-danger">*</span>
              </label>
              <Input
                id="combo-name"
                placeholder="Nhập tên combo"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setErrors(({ name: _dropped, ...rest }) => rest);
                }}
                state={errors.name ? "error" : "none"}
                message={errors.name}
              />
            </div>

            <div className="col-md-5">
              <label htmlFor="combo-status" className="form-label fw-semibold">
                Trạng thái
              </label>
              <ComboBox
                id="combo-status"
                options={STATUS_OPTIONS}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
            </div>

            <div className="col-12">
              <label htmlFor="combo-desc" className="form-label fw-semibold">
                Mô tả
              </label>
              <Input
                id="combo-desc"
                placeholder="Nhập mô tả ngắn"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="col-12">
              <label htmlFor="combo-pick" className="form-label fw-semibold">
                Thành phần <span className="text-danger">*</span>
              </label>
              <ComboBox
                id="combo-pick"
                options={variantOptions}
                value={picked}
                onChange={(e) => add(e.target.value)}
              />
              {errors.items && (
                <div className="text-danger small mt-1">{errors.items}</div>
              )}
            </div>

            {items.length > 0 && (
              <div className="col-12">
                <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
                  {items.map((item) => {
                    const variant = byId.get(item.variantId);

                    return (
                      <li
                        key={item.variantId}
                        className="border rounded-3 p-2 d-flex align-items-center gap-2"
                      >
                        <div className="min-w-0 me-auto">
                          <div className="small fw-semibold text-truncate">
                            {variant?.productName}
                          </div>
                          <div
                            className="text-secondary"
                            style={{ fontSize: "var(--fs-micro)" }}
                          >
                            {variant?.sku} · {formatCurrency(variant?.price ?? 0)}
                          </div>
                        </div>

                        <button
                          type="button"
                          className="app-header-icon-btn border"
                          style={{ width: 30, height: 30 }}
                          aria-label={`Giảm ${variant?.productName}`}
                          onClick={() =>
                            setQuantity(item.variantId, item.quantity - 1)
                          }
                        >
                          <Minus size={14} />
                        </button>

                        <Input
                          size="sm"
                          inputMode="numeric"
                          className="text-center"
                          style={{ width: 60 }}
                          aria-label={`Số lượng ${variant?.productName}`}
                          value={String(item.quantity)}
                          onChange={(e) =>
                            setQuantity(item.variantId, toNumber(e.target.value))
                          }
                        />

                        <button
                          type="button"
                          className="app-header-icon-btn border"
                          style={{ width: 30, height: 30 }}
                          aria-label={`Tăng ${variant?.productName}`}
                          onClick={() =>
                            setQuantity(item.variantId, item.quantity + 1)
                          }
                        >
                          <Plus size={14} />
                        </button>

                        <button
                          type="button"
                          className="app-icon-toggle text-danger"
                          aria-label={`Bỏ ${variant?.productName}`}
                          onClick={() => setQuantity(item.variantId, 0)}
                        >
                          <X size={14} />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            <div className="col-md-6">
              <label className="form-label fw-semibold">Giá gốc</label>
              <Input
                readOnly
                value={formatCurrency(originalPrice)}
                aria-label="Giá gốc, tính từ thành phần"
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="combo-price" className="form-label fw-semibold">
                Giá combo <span className="text-danger">*</span>
              </label>
              <Input
                id="combo-price"
                inputMode="numeric"
                placeholder="Nhập giá bán"
                value={String(price)}
                onChange={(e) => {
                  setPrice(toNumber(e.target.value));
                  setErrors(({ price: _dropped, ...rest }) => rest);
                }}
                state={errors.price ? "error" : "none"}
                message={errors.price}
              />

              {/* Không dùng message của Input: nó chỉ render khi state khác
                  "none", còn đây là cảnh báo mềm, không chặn lưu */}
              {!errors.price && originalPrice > 0 && price > originalPrice && (
                <div className="text-warning small mt-1">
                  Giá combo đang cao hơn tổng thành phần
                </div>
              )}
            </div>
          </div>
        </form>
      </Modal.Body>

      <Modal.Footer>
        <Button customVariant="secondary" onClick={close}>
          Hủy
        </Button>
        <Button type="submit" form="combo-form">
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
