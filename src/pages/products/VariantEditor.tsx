import { Plus, Trash2 } from "lucide-react";
import type { ProductVariant } from "../../types/product";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { toNumber } from "../vouchers/voucherLine";
import { emptyVariant } from "./productForm";

interface VariantEditorProps {
  variants: ProductVariant[];
  onChange: (variants: ProductVariant[]) => void;
  /** Lỗi theo id biến thể */
  errors: Record<string, string>;
}

export default function VariantEditor({
  variants,
  onChange,
  errors,
}: VariantEditorProps) {
  const patch = (id: string, value: Partial<ProductVariant>) =>
    onChange(variants.map((v) => (v.id === id ? { ...v, ...value } : v)));

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h3 className="h6 fw-semibold mb-0">Biến thể sản phẩm</h3>
        <Button
          customVariant="secondary"
          className="d-inline-flex align-items-center gap-2"
          onClick={() => onChange([...variants, emptyVariant(`v-${Date.now()}`)])}
        >
          <Plus size={16} aria-hidden="true" />
          Thêm biến thể
        </Button>
      </div>

      <div className="d-flex flex-column gap-3">
        {variants.map((variant, index) => (
          <div key={variant.id} className="border rounded-3 p-3">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <span className="fw-semibold">Biến thể #{index + 1}</span>
              <Button
                variant="outline-danger"
                size="sm"
                className="d-inline-flex align-items-center gap-2"
                disabled={variants.length === 1}
                onClick={() => onChange(variants.filter((v) => v.id !== variant.id))}
              >
                <Trash2 size={14} aria-hidden="true" />
                Xóa biến thể
              </Button>
            </div>

            <div className="row g-3">
              <div className="col-md-3">
                <label className="form-label fw-semibold">
                  Tên biến thể <span className="text-danger">*</span>
                </label>
                <Input
                  placeholder="Nhập tên biến thể"
                  aria-label={`Tên biến thể ${index + 1}`}
                  value={variant.name}
                  onChange={(e) => patch(variant.id, { name: e.target.value })}
                  state={errors[variant.id] ? "error" : "none"}
                  message={errors[variant.id]}
                />
              </div>

              <div className="col-md-3">
                <label className="form-label fw-semibold">SKU</label>
                <Input
                  placeholder="Nhập SKU"
                  aria-label={`SKU biến thể ${index + 1}`}
                  value={variant.sku}
                  onChange={(e) => patch(variant.id, { sku: e.target.value })}
                />
              </div>

              <div className="col-md-3">
                <label className="form-label fw-semibold">
                  Giá bán <span className="text-danger">*</span>
                </label>
                <Input
                  inputMode="numeric"
                  placeholder="Nhập giá"
                  aria-label={`Giá bán biến thể ${index + 1}`}
                  value={String(variant.price)}
                  onChange={(e) =>
                    patch(variant.id, { price: toNumber(e.target.value) })
                  }
                />
              </div>

              <div className="col-md-3">
                <label className="form-label fw-semibold">VAT (%)</label>
                <Input
                  inputMode="numeric"
                  placeholder="Nhập VAT"
                  aria-label={`VAT biến thể ${index + 1}`}
                  value={String(variant.vat)}
                  onChange={(e) =>
                    patch(variant.id, { vat: toNumber(e.target.value) })
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
