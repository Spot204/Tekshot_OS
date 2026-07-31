import { useState } from "react";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import DateInput from "../../components/ui/DateInput";
import PickCard from "../../components/warehouse/PickCard";
import CartPanel from "../../components/warehouse/CartPanel";
import type { CartItem } from "../../components/warehouse/CartPanel";

interface Product {
    id: number;
    name: string;
    sku: string;
    image: string;
    stock: number;
    price: number;
}

const mockCatalog: Product[] = [
    { id: 1, name: "Vỏ hộp pizza - M", sku: "NB-VHPM", image: "/images/vo-hop-pizza-m.png", stock: 25, price: 5000 },
    { id: 2, name: "Vỏ hộp pizza - L", sku: "NB-VHPL", image: "/images/vo-hop-pizza-l.png", stock: 18, price: 6000 },
    { id: 3, name: "Túi nilon", sku: "DC-TUINILON", image: "/images/tui-nilon.png", stock: 150, price: 500 },
    { id: 4, name: "Cốc trà sữa - 500ml", sku: "NB-CTSS00", image: "/images/coc-tra-sua-500.png", stock: 64, price: 1200 },
    { id: 5, name: "Cốc trà sữa - 700ml", sku: "NB-CTS700", image: "/images/coc-tra-sua-700.png", stock: 32, price: 1500 },
    { id: 6, name: "Áo phục vụ - M", sku: "NB-APVM", image: "/images/ao-phuc-vu.png", stock: 12, price: 150000 },
    { id: 7, name: "Áo phục vụ - L", sku: "NB-APVXL", image: "/images/ao-phuc-vu.png", stock: 8, price: 150000 },
    { id: 8, name: "Áo phục vụ - XL", sku: "NB-APVXL", image: "/images/ao-phuc-vu.png", stock: 6, price: 150000 },
    { id: 9, name: "Vỏ hộp pizza - M", sku: "NB-VHPM", image: "/images/vo-hop-pizza-m.png", stock: 25, price: 5000 },
    { id: 10, name: "Vỏ hộp pizza - L", sku: "NB-VHPL", image: "/images/vo-hop-pizza-l.png", stock: 18, price: 6000 },
    { id: 11, name: "Túi nilon", sku: "DC-TUINILON", image: "/images/tui-nilon.png", stock: 150, price: 500 },
    { id: 12, name: "Cốc trà sữa - 500ml", sku: "NB-CTSS00", image: "/images/coc-tra-sua-500.png", stock: 64, price: 1200 },
    { id: 13, name: "Cốc trà sữa - 700ml", sku: "NB-CTS700", image: "/images/coc-tra-sua-700.png", stock: 32, price: 1500 },
    { id: 14, name: "Áo phục vụ - M", sku: "NB-APVM", image: "/images/ao-phuc-vu.png", stock: 12, price: 150000 },
    { id: 15, name: "Áo phục vụ - L", sku: "NB-APVXL", image: "/images/ao-phuc-vu.png", stock: 8, price: 150000 },
    { id: 16, name: "Áo phục vụ - XL", sku: "NB-APVXL", image: "/images/ao-phuc-vu.png", stock: 6, price: 150000 },
];

const PAGE_STEP = 8;

function Imports() {
    const [warehouse, setWarehouse] = useState("main");
    const [importDate, setImportDate] = useState<Date | null>(new Date());

    const [keyword, setKeyword] = useState("");
    const [category, setCategory] = useState("all");
    const [visibleCount, setVisibleCount] = useState(PAGE_STEP);

    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [discountPercent, setDiscountPercent] = useState(0);
    const [note, setNote] = useState("");

    const filteredCatalog = mockCatalog.filter((p) =>
        p.name.toLowerCase().includes(keyword.toLowerCase()) || p.sku.toLowerCase().includes(keyword.toLowerCase())
    );
    const visibleCatalog = filteredCatalog.slice(0, visibleCount);
    const hasMore = visibleCount < filteredCatalog.length;

    const handleAddToCart = (product: Product) => {
        setCartItems((prev) => {
            const existing = prev.find((i) => i.id === product.id);
            if (existing) {
                return prev.map((i) => (i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i));
            }
            return [...prev, { id: product.id, name: product.name, image: product.image, quantity: 1, unitPrice: product.price }];
        });
    };

    const handleQuantityChange = (id: number, quantity: number) => {
        setCartItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity } : i)));
    };

    const handleRemove = (id: number) => {
        setCartItems((prev) => prev.filter((i) => i.id !== id));
    };

    const handleCancel = () => {
        setCartItems([]);
        setDiscountPercent(0);
        setNote("");
    };

    const handleSave = () => {
        console.log("Lưu phiếu nhập:", { warehouse, importDate, discountPercent, note, cartItems }); // thay bằng gọi API sau
    };

    return (
        <div className="pt-5 mt-5">
            <div className="fs-4 fw-bold">
                <i className="bi bi-file-earmark-plus text-warning" /> Nhập hàng
            </div>

            <div className="row g-3">
                {/* Cột trái: chọn kho, ngày, tìm kiếm, lưới sản phẩm */}
                <div className="col-lg-8">
                    <Card className="mt-3">
                        <div className="col-md-6">
                            <label className="form-label">
                                Kho nhập hàng <span className="text-danger">*</span>
                            </label>
                            <select
                                className="form-select rounded-4"
                                value={warehouse}
                                onChange={(e) => setWarehouse(e.target.value)}
                            >
                                <option value="main">Kho chính</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">
                                Ngày nhập <span className="text-danger">*</span>
                            </label>
                            <DateInput
                                selected={importDate}
                                onChange={setImportDate}
                            />
                        </div>
                    </Card>

                    <Card className="mb-3 mt-3">
                        <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
                            <div className="flex-grow-1" style={{ minWidth: "220px" }}>
                                <Input
                                    placeholder="Tìm kiếm sản phẩm, SKU, mã vạch..."
                                    leftIcon={<i className="bi bi-search" />}
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                />
                            </div>
                            <select
                                className="form-select rounded-4"
                                style={{ width: "180px" }}
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="all">Tất cả danh mục</option>
                            </select>
                            <button className="btn btn-light border rounded-4">
                                <i className="bi bi-funnel" />
                            </button>
                        </div>

                        <div className="row row-cols-2 row-cols-md-3 row-cols-xl-4 g-3">
                            {visibleCatalog.map((product) => (
                                <div className="col" key={product.id}>
                                    <PickCard
                                        name={product.name}
                                        sku={product.sku}
                                        image={product.image}
                                        stock={product.stock}
                                        onAdd={() => handleAddToCart(product)}
                                    />
                                </div>
                            ))}
                        </div>
                    
                        {hasMore && (
                            <div className="text-center mt-3">
                                <Button
                                    customVariant="secondary" className="rounded-4"
                                    onClick={() => setVisibleCount((c) => c + PAGE_STEP)}
                                >
                                    Xem thêm sản phẩm <i className="bi bi-chevron-down ms-1" />
                                </Button>
                            </div>
                        )}
                    </Card>
                </div>

                {/* Cột phải: giỏ nhập hàng */}
                <div className="col-lg-4">
                    <CartPanel
                        items={cartItems}
                        onQuantityChange={handleQuantityChange}
                        onRemove={handleRemove}
                        discountPercent={discountPercent}
                        onDiscountPercentChange={setDiscountPercent}
                        note={note}
                        onNoteChange={setNote}
                        onCancel={handleCancel}
                        onSave={handleSave}
                    />
                </div>
            </div>
        </div>
    );
}

export default Imports;