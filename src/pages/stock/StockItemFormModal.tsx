import { useState } from "react";
import { Modal } from "react-bootstrap";
import type { StockItem } from "../../types/stockItem";
import Input from "../../components/ui/Input";
import ComboBox from "../../components/ui/ComboBox";
import Button from "../../components/ui/Button";
import { UNIT_OPTIONS } from "../../constants/product";
import { toNumber } from "../vouchers/voucherLine";
import { warehouses } from "../../mocks/warehouses";

const LOCATION_OPTIONS = warehouses.map((warehouse) => ({
  value: warehouse.name,
  label: warehouse.name,
}));

interface StockItemFormModalProps {
  show: boolean;
  title: string;
  showSupplier: boolean;
  onClose: () => void;
  onSubmit: (item: Omit<StockItem, "id">) => void;
}

type Errors = Partial<Record<"name" | "unit" | "price", string>>;

const EMPTY = {
  name: "",
  unit: "",
  stock: 0,
  minStock: 0,
  price: 0,
  supplier: "",
  location: LOCATION_OPTIONS[0].value,
};

export default function StockItemFormModal({
  show,
  title,
  showSupplier,
  onClose,
  onSubmit,
}: StockItemFormModalProps) {
  const [draft, setDraft] = useState(EMPTY);
  const [errors, setErrors] = useState<Errors>({});

  const patch = (value: Partial<typeof EMPTY>) => {
    setDraft((prev) => ({ ...prev, ...value }));
    // Xoá lỗi của đúng ô vừa sửa, nếu không gõ đúng rồi ô vẫn đỏ
    setErrors(({ ...rest }) => {
      Object.keys(value).forEach((key) => delete rest[key as keyof Errors]);
      return rest;
    });
  };

  const close = () => {
    setDraft(EMPTY);
    setErrors({});
    onClose();
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();

    const found: Errors = {};
    if (!draft.name.trim()) found.name = "Chưa nhập tên";
    if (!draft.unit) found.unit = "Chưa chọn đơn vị";
    if (draft.price <= 0) found.price = "Đơn giá phải lớn hơn 0";

    setErrors(found);
    if (Object.keys(found).length) return;

    onSubmit({
      ...draft,
      name: draft.name.trim(),
      updatedAt: new Date().toISOString(),
    });
    close();
  };

  return (
    <Modal show={show} onHide={close} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title className="h5 fw-bold">{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form id="stock-item-form" onSubmit={submit} noValidate>
          <div className="row g-3">
            <div className="col-md-8">
              <label htmlFor="stock-name" className="form-label fw-semibold">
                Tên <span className="text-danger">*</span>
              </label>
              <Input
                id="stock-name"
                placeholder="Nhập tên"
                value={draft.name}
                onChange={(e) => patch({ name: e.target.value })}
                state={errors.name ? "error" : "none"}
                message={errors.name}
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="stock-unit" className="form-label fw-semibold">
                Đơn vị <span className="text-danger">*</span>
              </label>
              <ComboBox
                id="stock-unit"
                options={UNIT_OPTIONS}
                value={draft.unit}
                onChange={(e) => patch({ unit: e.target.value })}
                state={errors.unit ? "error" : "none"}
                message={errors.unit}
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="stock-qty" className="form-label fw-semibold">
                Tồn kho
              </label>
              <Input
                id="stock-qty"
                inputMode="numeric"
                value={String(draft.stock)}
                onChange={(e) => patch({ stock: toNumber(e.target.value) })}
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="stock-min" className="form-label fw-semibold">
                Định mức tối thiểu
              </label>
              <Input
                id="stock-min"
                inputMode="numeric"
                value={String(draft.minStock)}
                onChange={(e) => patch({ minStock: toNumber(e.target.value) })}
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="stock-price" className="form-label fw-semibold">
                Đơn giá <span className="text-danger">*</span>
              </label>
              <Input
                id="stock-price"
                inputMode="numeric"
                value={String(draft.price)}
                onChange={(e) => patch({ price: toNumber(e.target.value) })}
                state={errors.price ? "error" : "none"}
                message={errors.price}
              />
            </div>

            {showSupplier && (
              <div className="col-md-6">
                <label
                  htmlFor="stock-supplier"
                  className="form-label fw-semibold"
                >
                  Nhà cung cấp
                </label>
                <Input
                  id="stock-supplier"
                  placeholder="Nhập nhà cung cấp"
                  value={draft.supplier}
                  onChange={(e) => patch({ supplier: e.target.value })}
                />
              </div>
            )}

            <div className={showSupplier ? "col-md-6" : "col-md-12"}>
              <label
                htmlFor="stock-location"
                className="form-label fw-semibold"
              >
                Vị trí
              </label>
              <ComboBox
                id="stock-location"
                options={LOCATION_OPTIONS}
                value={draft.location}
                onChange={(e) => patch({ location: e.target.value })}
              />
            </div>
          </div>
        </form>
      </Modal.Body>

      <Modal.Footer>
        <Button customVariant="secondary" onClick={close}>
          Hủy
        </Button>
        <Button type="submit" form="stock-item-form">
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
