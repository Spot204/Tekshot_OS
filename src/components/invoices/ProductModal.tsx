import { useRef, useState } from "react";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";
import DropdownSection from "../ui/DropdownSection";

export interface ProductModalProps {
    open: boolean;
    onClose: () => void;
    onSave: (data: unknown) => void;
}

interface Variant {
    id: number;
    name: string;
    sku: string;
    price: string;
    vat: string;
}

interface AttributeRow {
    id: number;
    type: string;
    value: string;
}

interface PriceRow {
    id: number;
    formType: string;   // Loại hình
    unit: string;       // Đơn vị
    quantity: string;   // Định lượng
    baseUnit: string;   // Đơn vị gốc
    unitPrice: string;  // Đơn giá
}

interface IngredientRow {
    id: number;
    material: string; // Nguyên liệu
    quantity: string; // Số lượng
    unit: string;      // Đơn vị
}

export default function ProductModal({ open, onClose, onSave }: ProductModalProps) {
    // Các trường chính
    const [name, setName] = useState("");
    const [shortName, setShortName] = useState("");
    const [menu, setMenu] = useState("");
    const [unit, setUnit] = useState("");
    const [status, setStatus] = useState("");

    // 3 select phụ thuộc nhau: chọn Ngành hàng xong mới bật Nhóm hàng, chọn Nhóm hàng xong mới bật Loại hàng
    const [industry, setIndustry] = useState("");
    const [group, setGroup] = useState("");
    const [type, setType] = useState("");

    // Ảnh sản phẩm
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState("");

    // Thông tin thêm
    const [brand, setBrand] = useState("");
    const [origin, setOrigin] = useState("");
    const [warrantyEnabled, setWarrantyEnabled] = useState(false);
    const [warrantyValue, setWarrantyValue] = useState("");
    const [warrantyUnit, setWarrantyUnit] = useState("");
    const [maintenanceEnabled, setMaintenanceEnabled] = useState(false);
    const [maintenanceValue, setMaintenanceValue] = useState("");
    const [maintenanceUnit, setMaintenanceUnit] = useState("");
    const [description, setDescription] = useState("");

    // Thuộc tính - danh sách động
    const nextAttributeId = useRef(2);
    const [attributes, setAttributes] = useState<AttributeRow[]>([{ id: 1, type: "", value: "" }]);

    const addAttribute = () => {
        setAttributes((prev) => [...prev, { id: nextAttributeId.current++, type: "", value: "" }]);
    };
    const removeAttribute = (id: number) => {
        setAttributes((prev) => prev.filter((a) => a.id !== id));
    };
    const updateAttribute = (id: number, field: keyof Omit<AttributeRow, "id">, value: string) => {
        setAttributes((prev) => prev.map((a) => (a.id === id ? { ...a, [field]: value } : a)));
    };

    // Giá mua vào - danh sách động
    const nextPurchaseId = useRef(2);
    const [purchasePrices, setPurchasePrices] = useState<PriceRow[]>([
        { id: 1, formType: "", unit: "", quantity: "", baseUnit: "", unitPrice: "" },
    ]);

    const addPurchasePrice = () => {
        setPurchasePrices((prev) => [
            ...prev,
            { id: nextPurchaseId.current++, formType: "", unit: "", quantity: "", baseUnit: "", unitPrice: "" },
        ]);
    };
    const removePurchasePrice = (id: number) => {
        setPurchasePrices((prev) => prev.filter((p) => p.id !== id));
    };
    const updatePurchasePrice = (id: number, field: keyof Omit<PriceRow, "id">, value: string) => {
        setPurchasePrices((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
    };

    // Giá bán ra - danh sách động
    const nextSellingId = useRef(2);
    const [sellingPrices, setSellingPrices] = useState<PriceRow[]>([
        { id: 1, formType: "", unit: "", quantity: "", baseUnit: "", unitPrice: "" },
    ]);

    const addSellingPrice = () => {
        setSellingPrices((prev) => [
            ...prev,
            { id: nextSellingId.current++, formType: "", unit: "", quantity: "", baseUnit: "", unitPrice: "" },
        ]);
    };
    const removeSellingPrice = (id: number) => {
        setSellingPrices((prev) => prev.filter((p) => p.id !== id));
    };
    const updateSellingPrice = (id: number, field: keyof Omit<PriceRow, "id">, value: string) => {
        setSellingPrices((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
    };

    // Thành phần - danh sách động
    const nextIngredientId = useRef(2);
    const [ingredients, setIngredients] = useState<IngredientRow[]>([
        { id: 1, material: "", quantity: "", unit: "" },
    ]);

    const addIngredient = () => {
        setIngredients((prev) => [...prev, { id: nextIngredientId.current++, material: "", quantity: "", unit: "" }]);
    };
    const removeIngredient = (id: number) => {
        setIngredients((prev) => prev.filter((i) => i.id !== id));
    };
    const updateIngredient = (id: number, field: keyof Omit<IngredientRow, "id">, value: string) => {
        setIngredients((prev) => prev.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
    };

    // Biến thể sản phẩm - danh sách động, thêm/xoá được
    const nextVariantId = useRef(2);
    const [variants, setVariants] = useState<Variant[]>([
        { id: 1, name: "", sku: "", price: "", vat: "" },
    ]);

    const addVariant = () => {
        setVariants((prev) => [
            ...prev,
            { id: nextVariantId.current++, name: "", sku: "", price: "", vat: "" },
        ]);
    };

    const removeVariant = (id: number) => {
        setVariants((prev) => prev.filter((v) => v.id !== id));
    };

    const updateVariant = (id: number, field: keyof Omit<Variant, "id">, value: string) => {
        setVariants((prev) => prev.map((v) => (v.id === id ? { ...v, [field]: value } : v)));
    };

    const handleChooseFile = () => fileInputRef.current?.click();

    const handleSave = () => {
        onSave({
            name, shortName, menu, unit, status,
            industry, group, type, fileName,
            brand, origin, warrantyEnabled, warrantyValue, warrantyUnit,
            maintenanceEnabled, maintenanceValue, maintenanceUnit, description,
            attributes, purchasePrices, sellingPrices, ingredients,
            variants,
        });
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            title="Tạo sản phẩm"
            size="lg"
            footer={
                <>
                    <Button customVariant="secondary" className="rounded-4" onClick={onClose}>Hủy</Button>
                    <Button customVariant="primary" className="rounded-4" onClick={handleSave}>Lưu</Button>
                </>
            }
        >
            {/* Tên sản phẩm / Tên ngắn */}
            <div className="row g-3 mb-3">
                <div className="col-md-6">
                    <label className="form-label">
                        Tên sản phẩm <span className="text-danger">*</span>
                    </label>
                    <Input placeholder="Nhập tên sản phẩm" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Tên ngắn</label>
                    <Input placeholder="Nhập tên ngắn" value={shortName} onChange={(e) => setShortName(e.target.value)} />
                </div>
            </div>

            {/* Menu / Đơn vị tính / Trạng thái */}
            <div className="row g-3 mb-3">
                <div className="col-md-4">
                    <label className="form-label">Menu</label>
                    <select className="form-select rounded-4" value={menu} onChange={(e) => setMenu(e.target.value)}>
                        <option value="">-- Chọn --</option>
                    </select>
                </div>
                <div className="col-md-4">
                    <label className="form-label">Đơn vị tính</label>
                    <select className="form-select rounded-4" value={unit} onChange={(e) => setUnit(e.target.value)}>
                        <option value="">-- Chọn --</option>
                    </select>
                </div>
                <div className="col-md-4">
                    <label className="form-label">Trạng thái</label>
                    <select className="form-select rounded-4" value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="">-- Chọn --</option>
                    </select>
                </div>
            </div>

            {/* Ngành hàng -> Nhóm hàng -> Loại hàng (phụ thuộc nhau) */}
            <div className="row g-3 mb-3">
                <div className="col-md-4">
                    <label className="form-label">Ngành hàng</label>
                    <select
                        className="form-select rounded-4"
                        value={industry}
                        onChange={(e) => {
                            setIndustry(e.target.value);
                            setGroup(""); // đổi ngành hàng thì reset lựa chọn của 2 cấp sau
                            setType("");
                        }}
                    >
                        <option value="">-- Chọn --</option>
                    </select>
                </div>
                <div className="col-md-4">
                    <label className="form-label">Nhóm hàng</label>
                    <select
                        className="form-select rounded-4"
                        value={group}
                        disabled={!industry}
                        onChange={(e) => {
                            setGroup(e.target.value);
                            setType("");
                        }}
                    >
                        <option value="">
                            {industry ? "-- Chọn --" : "-- Chọn ngành hàng trước --"}
                        </option>
                    </select>
                </div>
                <div className="col-md-4">
                    <label className="form-label">Loại hàng</label>
                    <select
                        className="form-select rounded-4"
                        value={type}
                        disabled={!group}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="">
                            {group ? "-- Chọn --" : "-- Chọn nhóm hàng trước --"}
                        </option>
                    </select>
                </div>
            </div>

            {/* Ảnh sản phẩm */}
            <div className="mb-3">
                <label className="form-label">Ảnh sản phẩm</label>
                <div className="d-flex align-items-center border rounded-4 overflow-hidden">
                    <button
                        type="button"
                        className="btn btn-light border-0 rounded-0 d-flex align-items-center gap-1 px-3 py-2"
                        onClick={handleChooseFile}
                    >
                        <i className="bi bi-upload" /> Chọn tệp
                    </button>
                    <span className="text-muted small px-2">
                        {fileName || "Không có tệp nào được chọn"}
                    </span>
                </div>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
                />
            </div>

            {/* Thông tin thêm - đóng mặc định */}
            <DropdownSection title="Thông tin thêm">
                <div className="row g-3 mb-3">
                    <div className="col-md-6">
                        <label className="form-label">Hãng</label>
                        <select className="form-select rounded-4" value={brand} onChange={(e) => setBrand(e.target.value)}>
                            <option value="">-- Chọn --</option>
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Xuất xứ</label>
                        <select className="form-select rounded-4" value={origin} onChange={(e) => setOrigin(e.target.value)}>
                            <option value="">-- Chọn --</option>
                        </select>
                    </div>
                </div>

                <div className="row g-3 mb-3">
                    <div className="col-md-6">
                        <div className="form-check form-switch mb-2">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                checked={warrantyEnabled}
                                onChange={(e) => setWarrantyEnabled(e.target.checked)}
                            />
                            <label className="form-check-label">Bảo hành</label>
                        </div>
                        <div className="d-flex gap-2">
                            <Input
                                disabled={!warrantyEnabled}
                                value={warrantyValue}
                                onChange={(e) => setWarrantyValue(e.target.value)}
                            />
                            <select
                                className="form-select rounded-4"
                                style={{ maxWidth: "140px" }}
                                disabled={!warrantyEnabled}
                                value={warrantyUnit}
                                onChange={(e) => setWarrantyUnit(e.target.value)}
                            >
                                <option value="">-- Chọn --</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-check form-switch mb-2">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                checked={maintenanceEnabled}
                                onChange={(e) => setMaintenanceEnabled(e.target.checked)}
                            />
                            <label className="form-check-label">Bảo trì</label>
                        </div>
                        <div className="d-flex gap-2">
                            <Input
                                disabled={!maintenanceEnabled}
                                value={maintenanceValue}
                                onChange={(e) => setMaintenanceValue(e.target.value)}
                            />
                            <select
                                className="form-select rounded-4"
                                style={{ maxWidth: "140px" }}
                                disabled={!maintenanceEnabled}
                                value={maintenanceUnit}
                                onChange={(e) => setMaintenanceUnit(e.target.value)}
                            >
                                <option value="">-- Chọn --</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div>
                    <label className="form-label">Mô tả</label>
                    <textarea
                        className="form-control rounded-4"
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
            </DropdownSection>

            <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="fw-bold fs-5">Biến thể sản phẩm</div>
                <Button customVariant="secondary" className="rounded-4" onClick={addVariant}>
                    <i className="bi bi-plus-lg me-1" /> Thêm biến thể
                </Button>
            </div>

            {variants.map((variant, index) => (
                <div key={variant.id} className="border rounded-3 p-3 mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="fw-semibold">Biến thể #{index + 1}</div>
                        {variants.length > 1 && (
                            <button
                                type="button"
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => removeVariant(variant.id)}
                            >
                                <i className="bi bi-trash me-1" /> Xóa biến thể
                            </button>
                        )}
                    </div>

                    <div className="row g-3">
                        <div className="col-md-3">
                            <label className="form-label">
                                Tên biến thể <span className="text-danger">*</span>
                            </label>
                            <Input
                                placeholder="Nhập tên biến thể"
                                value={variant.name}
                                onChange={(e) => updateVariant(variant.id, "name", e.target.value)}
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">SKU</label>
                            <Input
                                placeholder="Nhập SKU"
                                value={variant.sku}
                                onChange={(e) => updateVariant(variant.id, "sku", e.target.value)}
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">
                                Giá bán <span className="text-danger">*</span>
                            </label>
                            <Input
                                placeholder="Nhập giá"
                                rightIcon={<span className="small text-muted">VND</span>}
                                value={variant.price}
                                onChange={(e) => updateVariant(variant.id, "price", e.target.value)}
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">VAT (%)</label>
                            <Input
                                placeholder="Nhập VAT"
                                value={variant.vat}
                                onChange={(e) => updateVariant(variant.id, "vat", e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            ))}

            {/* Thuộc tính */}
            <DropdownSection title="Thuộc tính" defaultOpen>
                {attributes.map((attr) => (
                    <div key={attr.id} className="row g-2 mb-2 align-items-end">
                        <div className="col-md-5">
                            <label className="form-label">Loại thuộc tính</label>
                            <select
                                className="form-select rounded-4"
                                value={attr.type}
                                onChange={(e) => updateAttribute(attr.id, "type", e.target.value)}
                            >
                                <option value="">-- Chọn --</option>
                            </select>
                        </div>
                        <div className="col-md-5">
                            <label className="form-label">Giá trị</label>
                            <Input
                                value={attr.value}
                                onChange={(e) => updateAttribute(attr.id, "value", e.target.value)}
                            />
                        </div>
                        <div className="col-md-2">
                            <button
                                type="button"
                                className="btn btn-outline-danger w-20 rounded-4"
                                onClick={() => removeAttribute(attr.id)}
                                disabled={attributes.length <= 1}
                            >
                                <i className="bi bi-x-lg" />
                            </button>
                        </div>
                    </div>
                ))}
                <Button customVariant="secondary" className="rounded-4" onClick={addAttribute}>
                    <i className="bi bi-plus-lg me-1" /> Thêm thuộc tính
                </Button>
            </DropdownSection>

            {/* Giá mua vào */}
            <DropdownSection title="Giá mua vào" defaultOpen>
                {purchasePrices.map((p) => (
                    <div key={p.id} className="row g-2 mb-2 align-items-end">
                        <div className="col-md-2">
                            <label className="form-label">Loại hình</label>
                            <select
                                className="form-select rounded-4"
                                value={p.formType}
                                onChange={(e) => updatePurchasePrice(p.id, "formType", e.target.value)}
                            >
                                <option value="">-- Chọn --</option>
                            </select>
                        </div>
                        <div className="col-md-2">
                            <label className="form-label">Đơn vị</label>
                            <select
                                className="form-select rounded-4"
                                value={p.unit}
                                onChange={(e) => updatePurchasePrice(p.id, "unit", e.target.value)}
                            >
                                <option value="">-- Chọn --</option>
                            </select>
                        </div>
                        <div className="col-md-2">
                            <label className="form-label">Định lượng</label>
                            <Input
                                value={p.quantity}
                                onChange={(e) => updatePurchasePrice(p.id, "quantity", e.target.value)}
                            />
                        </div>
                        <div className="col-md-2">
                            <label className="form-label">Đơn vị gốc</label>
                            <select
                                className="form-select rounded-4"
                                value={p.baseUnit}
                                onChange={(e) => updatePurchasePrice(p.id, "baseUnit", e.target.value)}
                            >
                                <option value="">-- Chọn --</option>
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Đơn giá</label>
                            <Input
                                value={p.unitPrice}
                                onChange={(e) => updatePurchasePrice(p.id, "unitPrice", e.target.value)}
                            />
                        </div>
                        <div className="col-md-1">
                            <button
                                type="button"
                                className="btn btn-outline-danger w-20 rounded-4"
                                onClick={() => removePurchasePrice(p.id)}
                                disabled={purchasePrices.length <= 1}
                            >
                                <i className="bi bi-x-lg" />
                            </button>
                        </div>
                    </div>
                ))}
                <Button customVariant="secondary" className="rounded-4" onClick={addPurchasePrice}>
                    <i className="bi bi-plus-lg me-1" /> Thêm giá mua
                </Button>
            </DropdownSection>

            {/* Giá bán ra */}
            <DropdownSection title="Giá bán ra">
                {sellingPrices.map((p) => (
                    <div key={p.id} className="row g-2 mb-2 align-items-end">
                        <div className="col-md-2">
                            <label className="form-label">Loại hình</label>
                            <select
                                className="form-select rounded-4"
                                value={p.formType}
                                onChange={(e) => updateSellingPrice(p.id, "formType", e.target.value)}
                            >
                                <option value="">-- Chọn --</option>
                            </select>
                        </div>
                        <div className="col-md-2">
                            <label className="form-label">Đơn vị</label>
                            <select
                                className="form-select rounded-4"
                                value={p.unit}
                                onChange={(e) => updateSellingPrice(p.id, "unit", e.target.value)}
                            >
                                <option value="">-- Chọn --</option>
                            </select>
                        </div>
                        <div className="col-md-2">
                            <label className="form-label">Định lượng</label>
                            <Input
                                value={p.quantity}
                                onChange={(e) => updateSellingPrice(p.id, "quantity", e.target.value)}
                            />
                        </div>
                        <div className="col-md-2">
                            <label className="form-label">Đơn vị gốc</label>
                            <select
                                className="form-select rounded-4"
                                value={p.baseUnit}
                                onChange={(e) => updateSellingPrice(p.id, "baseUnit", e.target.value)}
                            >
                                <option value="">-- Chọn --</option>
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Đơn giá</label>
                            <Input
                                value={p.unitPrice}
                                onChange={(e) => updateSellingPrice(p.id, "unitPrice", e.target.value)}
                            />
                        </div>
                        <div className="col-md-1">
                            <button
                                type="button"
                                className="btn btn-outline-danger w-20 rounded-4"
                                onClick={() => removeSellingPrice(p.id)}
                                disabled={sellingPrices.length <= 1}
                            >
                                <i className="bi bi-x-lg" />
                            </button>
                        </div>
                    </div>
                ))}
                <Button customVariant="secondary" className="rounded-4" onClick={addSellingPrice}>
                    <i className="bi bi-plus-lg me-1" /> Thêm giá bán
                </Button>
            </DropdownSection>

            {/* Thành phần */}
            <DropdownSection title="Thành phần" defaultOpen>
                {ingredients.map((ing) => (
                    <div key={ing.id} className="row g-2 mb-2 align-items-end">
                        <div className="col-md-6">
                            <label className="form-label">Nguyên liệu</label>
                            <select
                                className="form-select rounded-4"
                                value={ing.material}
                                onChange={(e) => updateIngredient(ing.id, "material", e.target.value)}
                            >
                                <option value="">-- Chọn --</option>
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Số lượng</label>
                            <Input
                                value={ing.quantity}
                                onChange={(e) => updateIngredient(ing.id, "quantity", e.target.value)}
                            />
                        </div>
                        <div className="col-md-2">
                            <label className="form-label">Đơn vị</label>
                            <select
                                className="form-select rounded-4"
                                value={ing.unit}
                                onChange={(e) => updateIngredient(ing.id, "unit", e.target.value)}
                            >
                                <option value="">-- Chọn --</option>
                            </select>
                        </div>
                        <div className="col-md-1">
                            <button
                                type="button"
                                className="btn btn-outline-danger w-20 rounded-4"
                                onClick={() => removeIngredient(ing.id)}
                                disabled={ingredients.length <= 1}
                            >
                                <i className="bi bi-x-lg" />
                            </button>
                        </div>
                    </div>
                ))}
                <Button customVariant="secondary" className="rounded-4" onClick={addIngredient}>
                    <i className="bi bi-plus-lg me-1" /> Thêm thành phần
                </Button>
            </DropdownSection>
        </Modal>
    );
}