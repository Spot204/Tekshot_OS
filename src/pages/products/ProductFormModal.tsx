import { useState } from "react";
import { Collapse, Modal } from "react-bootstrap";
import { ChevronDown, Upload } from "lucide-react";
import type { Product, ProductVariant } from "../../types/product";
import Input from "../../components/ui/Input";
import ComboBox from "../../components/ui/ComboBox";
import Button from "../../components/ui/Button";
import CascadingCategory from "./CascadingCategory";
import type { CategoryValue } from "./CascadingCategory";
import VariantEditor from "./VariantEditor";
import { emptyVariant } from "./productForm";
import {
  MENU_OPTIONS,
  STATUS_FORM_OPTIONS,
  UNIT_OPTIONS,
} from "../../constants/product";

const EMPTY_CATEGORY: CategoryValue = { industry: "", group: "", kind: "" };

interface ProductFormModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (product: Product) => void;
}

type Errors = { name?: string; variants?: Record<string, string> };

export default function ProductFormModal({
  show,
  onClose,
  onSubmit,
}: ProductFormModalProps) {
  const [name, setName] = useState("");
  const [shortName, setShortName] = useState("");
  const [menu, setMenu] = useState("");
  const [unit, setUnit] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState(EMPTY_CATEGORY);
  const [fileName, setFileName] = useState("");
  const [showExtra, setShowExtra] = useState(false);
  const [variants, setVariants] = useState<ProductVariant[]>([
    emptyVariant("v-1"),
  ]);
  const [errors, setErrors] = useState<Errors>({});

  const close = () => {
    setName("");
    setShortName("");
    setMenu("");
    setUnit("");
    setStatus("");
    setCategory(EMPTY_CATEGORY);
    setFileName("");
    setVariants([emptyVariant("v-1")]);
    setErrors({});
    onClose();
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();

    const variantErrors: Record<string, string> = {};
    variants.forEach((variant) => {
      if (!variant.name.trim()) variantErrors[variant.id] = "Chưa nhập tên";
      else if (variant.price <= 0)
        variantErrors[variant.id] = "Giá phải lớn hơn 0";
    });

    const found: Errors = {};
    if (!name.trim()) found.name = "Chưa nhập tên sản phẩm";
    if (Object.keys(variantErrors).length) found.variants = variantErrors;

    setErrors(found);
    if (found.name || found.variants) return;

    onSubmit({
      id: `P-${Date.now()}`,
      name: name.trim(),
      shortName: shortName.trim() || name.trim(),
      // Loại hàng cụ thể nhất được chọn làm danh mục hiển thị
      category: category.kind || category.group || category.industry || "Khác",
      unit: unit || "Cái",
      variants,
    });
    close();
  };

  return (
    <Modal show={show} onHide={close} size="lg" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title className="h5 fw-bold">Tạo sản phẩm</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form id="product-form" onSubmit={submit} noValidate>
          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="product-name" className="form-label fw-semibold">
                Tên sản phẩm <span className="text-danger">*</span>
              </label>
              <Input
                id="product-name"
                placeholder="Nhập tên sản phẩm"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setErrors((prev) => ({ ...prev, name: undefined }));
                }}
                state={errors.name ? "error" : "none"}
                message={errors.name}
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="product-short" className="form-label fw-semibold">
                Tên ngắn
              </label>
              <Input
                id="product-short"
                placeholder="Nhập tên ngắn"
                value={shortName}
                onChange={(e) => setShortName(e.target.value)}
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="product-menu" className="form-label fw-semibold">
                Menu
              </label>
              <ComboBox
                id="product-menu"
                options={MENU_OPTIONS}
                value={menu}
                onChange={(e) => setMenu(e.target.value)}
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="product-unit" className="form-label fw-semibold">
                Đơn vị tính
              </label>
              <ComboBox
                id="product-unit"
                options={UNIT_OPTIONS}
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              />
            </div>

            <div className="col-md-4">
              <label
                htmlFor="product-status"
                className="form-label fw-semibold"
              >
                Trạng thái
              </label>
              <ComboBox
                id="product-status"
                options={STATUS_FORM_OPTIONS}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
            </div>

            <CascadingCategory value={category} onChange={setCategory} />

            <div className="col-12">
              {/* Nhãn thật là <label> bọc input file bên dưới, đây chỉ là tiêu đề */}
              <span className="form-label fw-semibold d-block">
                Ảnh sản phẩm
              </span>
              <label className="product-file-picker">
                <span className="product-file-btn">
                  <Upload size={16} aria-hidden="true" />
                  Chọn tệp
                </span>
                <span className="text-secondary small text-truncate">
                  {fileName || "Không có tệp nào được chọn"}
                </span>
                <input
                  type="file"
                  accept=".jpg,.png"
                  className="d-none"
                  onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
                />
              </label>
            </div>

            <div className="col-12">
              <div className="border rounded-3">
                <button
                  type="button"
                  className="voucher-collapse-toggle"
                  aria-expanded={showExtra}
                  onClick={() => setShowExtra((open) => !open)}
                >
                  <ChevronDown
                    size={16}
                    className={
                      showExtra ? undefined : "menu-chevron is-collapsed"
                    }
                    aria-hidden="true"
                  />
                  Thông tin thêm
                </button>

                <Collapse in={showExtra}>
                  <div>
                    <div className="px-3 pb-3">
                      <label
                        htmlFor="product-note"
                        className="form-label fw-semibold"
                      >
                        Mô tả
                      </label>
                      <Input
                        id="product-note"
                        placeholder="Nhập mô tả sản phẩm"
                      />
                    </div>
                  </div>
                </Collapse>
              </div>
            </div>

            <div className="col-12">
              <VariantEditor
                variants={variants}
                onChange={(next) => {
                  setVariants(next);
                  setErrors((prev) => ({ ...prev, variants: undefined }));
                }}
                errors={errors.variants ?? {}}
              />
            </div>
          </div>
        </form>
      </Modal.Body>

      <Modal.Footer>
        <Button customVariant="secondary" onClick={close}>
          Hủy
        </Button>
        <Button type="submit" form="product-form">
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
