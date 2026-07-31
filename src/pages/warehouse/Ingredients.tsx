import Card from "../../components/ui/Card"
import Input from "../../components/ui/Input"
import Label from "../../components/ui/Label"
import Table from "../../components/ui/Table"
import { useState } from "react"
import type { Column } from "../../components/ui/Table"
import Button from "../../components/ui/Button"
import Pagination from "../../components/ui/Pagination"

interface IngredientProps {
    id: number;
    name: string;
    variant: string;
    image: string;
    sku: string;
    category: string;
    price: number;
    stock: number;
    status: "active" | "low_stock";
    statusText: string;
}

const mockIngredients: IngredientProps[] = [
    { id: 1, name: "Áo bếp Pizza - XS", variant: "Màu đen, Size XS", image: "/images/ao-bep-1.png", sku: "BEPPIZZA-XS", category: "Áo bếp Pizza", price: 235000, stock: 25, status: "active", statusText: "Đang bán" },
    { id: 2, name: "Áo bếp Pizza - S", variant: "Màu đen, Size S", image: "/images/ao-bep-1.png", sku: "BEPPIZZA-S", category: "Áo bếp Pizza", price: 235000, stock: 18, status: "active", statusText: "Đang bán" },
    { id: 3, name: "Áo bếp Pizza - M", variant: "Màu đen, Size M", image: "/images/ao-bep-1.png", sku: "BEPPIZZA-M", category: "Áo bếp Pizza", price: 235000, stock: 30, status: "active", statusText: "Đang bán" },
    { id: 4, name: "Áo bếp Pizza - L", variant: "Màu đen, Size L", image: "/images/ao-bep-1.png", sku: "BEPPIZZA-L", category: "Áo bếp Pizza", price: 235000, stock: 12, status: "low_stock", statusText: "Sắp hết hàng" },
    { id: 5, name: "Áo bếp Pizza - XL", variant: "Màu đen, Size XL", image: "/images/ao-bep-1.png", sku: "BEPPIZZA-XL", category: "Áo bếp Pizza", price: 235000, stock: 8, status: "low_stock", statusText: "Sắp hết hàng" },
    { id: 6, name: "Áo bếp Pizza - XS", variant: "Màu đen, Size XS", image: "/images/ao-bep-1.png", sku: "BEPPIZZA-XS", category: "Áo bếp Pizza", price: 235000, stock: 25, status: "active", statusText: "Đang bán" },
    { id: 7, name: "Áo bếp Pizza - S", variant: "Màu đen, Size S", image: "/images/ao-bep-1.png", sku: "BEPPIZZA-S", category: "Áo bếp Pizza", price: 235000, stock: 18, status: "active", statusText: "Đang bán" },
    { id: 8, name: "Áo bếp Pizza - M", variant: "Màu đen, Size M", image: "/images/ao-bep-1.png", sku: "BEPPIZZA-M", category: "Áo bếp Pizza", price: 235000, stock: 30, status: "active", statusText: "Đang bán" },
    { id: 9, name: "Áo bếp Pizza - L", variant: "Màu đen, Size L", image: "/images/ao-bep-1.png", sku: "BEPPIZZA-L", category: "Áo bếp Pizza", price: 235000, stock: 12, status: "low_stock", statusText: "Sắp hết hàng" },
    { id: 10, name: "Áo bếp Pizza - XL", variant: "Màu đen, Size XL", image: "/images/ao-bep-1.png", sku: "BEPPIZZA-XL", category: "Áo bếp Pizza", price: 235000, stock: 8, status: "low_stock", statusText: "Sắp hết hàng" },
    { id: 11, name: "Áo bếp Pizza - XS", variant: "Màu đen, Size XS", image: "/images/ao-bep-1.png", sku: "BEPPIZZA-XS", category: "Áo bếp Pizza", price: 235000, stock: 25, status: "active", statusText: "Đang bán" },
    { id: 12, name: "Áo bếp Pizza - S", variant: "Màu đen, Size S", image: "/images/ao-bep-1.png", sku: "BEPPIZZA-S", category: "Áo bếp Pizza", price: 235000, stock: 18, status: "active", statusText: "Đang bán" },
    { id: 13, name: "Áo bếp Pizza - M", variant: "Màu đen, Size M", image: "/images/ao-bep-1.png", sku: "BEPPIZZA-M", category: "Áo bếp Pizza", price: 235000, stock: 30, status: "active", statusText: "Đang bán" },
    { id: 14, name: "Áo bếp Pizza - L", variant: "Màu đen, Size L", image: "/images/ao-bep-1.png", sku: "BEPPIZZA-L", category: "Áo bếp Pizza", price: 235000, stock: 12, status: "low_stock", statusText: "Sắp hết hàng" },
    { id: 15, name: "Áo bếp Pizza - XL", variant: "Màu đen, Size XL", image: "/images/ao-bep-1.png", sku: "BEPPIZZA-XL", category: "Áo bếp Pizza", price: 235000, stock: 8, status: "low_stock", statusText: "Sắp hết hàng" },
    { id: 16, name: "Áo bếp Pizza - XS", variant: "Màu đen, Size XS", image: "/images/ao-bep-1.png", sku: "BEPPIZZA-XS", category: "Áo bếp Pizza", price: 235000, stock: 25, status: "active", statusText: "Đang bán" },
    { id: 17, name: "Áo bếp Pizza - S", variant: "Màu đen, Size S", image: "/images/ao-bep-1.png", sku: "BEPPIZZA-S", category: "Áo bếp Pizza", price: 235000, stock: 18, status: "active", statusText: "Đang bán" },
    { id: 18, name: "Áo bếp Pizza - M", variant: "Màu đen, Size M", image: "/images/ao-bep-1.png", sku: "BEPPIZZA-M", category: "Áo bếp Pizza", price: 235000, stock: 30, status: "active", statusText: "Đang bán" },
    { id: 19, name: "Áo bếp Pizza - L", variant: "Màu đen, Size L", image: "/images/ao-bep-1.png", sku: "BEPPIZZA-L", category: "Áo bếp Pizza", price: 235000, stock: 12, status: "low_stock", statusText: "Sắp hết hàng" },
    { id: 20, name: "Áo bếp Pizza - XL", variant: "Màu đen, Size XL", image: "/images/ao-bep-1.png", sku: "BEPPIZZA-XL", category: "Áo bếp Pizza", price: 235000, stock: 8, status: "low_stock", statusText: "Sắp hết hàng" },
];

const formatCurrency = (value: number) => (value === 0 ? "0đ" : `${value.toLocaleString("vi-VN")}đ`);

const stockVariant = (stock: number): "success" | "warning" | "danger" => {
    if (stock <= 10) return "danger";
    if (stock <= 15) return "warning";
    return "success";
};

function Ingredients () {
    const [keyword, setKeyword] = useState("");
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(8);

    const pageData = mockIngredients.slice((page - 1) * pageSize, page * pageSize);

    const columns: Column<IngredientProps>[] = [
        {
            key: "id",
            header: "",
            render: () => <input type="checkbox" className="form-check-input" />,
        },
        {
            key: "name",
            header: "Tên nguyên liệu",
            render: (row) => (
                <div className="d-flex align-items-center gap-2">
                    <img
                        src={row.image}
                        alt={row.name}
                        width={40}
                        height={40}
                        className="rounded-2 object-fit-cover bg-light"
                    />
                    <div>
                        <div className="fw-semibold text-dark">{row.name}</div>
                        <div className="text-muted small">{row.variant}</div>
                    </div>
                </div>
            ),
        },
        { key: "sku", header: "SKU" },
        { key: "category", header: "Danh mục" },
        {
            key: "price",
            header: "Giá bán",
            render: (row) => formatCurrency(row.price),
        },
        {
            key: "stock",
            header: "Số lượng",
            align: "center",
            render: (row) => (
                <Label variant={stockVariant(row.stock)} size="sm">
                    {row.stock}
                </Label>
            ),
        },
        {
            key: "statusText",
            header: "Trạng thái",
            render: (row) => (
                <Label variant={row.status === "active" ? "success" : "warning"} size="sm">
                    {row.statusText}
                </Label>
            ),
        },
        {
            key: "id",
            header: "Thao tác",
            align: "end",
            render: () => (
                <button className="btn btn-sm btn-primary border rounded-4">
                    <i className="bi bi-three-dots-vertical" />
                </button>
            ),
        },
    ];

    return (
        <div className="bg-light mt-5 pt-5">
            <div className="fs-4 fw-bold mb-3">
                <i className="bi bi-box-seam text-warning"/> Tồn kho
            </div>

            <div >
                <Card className="mb-3">
                    <div className="d-flex flex-wrap align-items-center gap-2">
                        <div className="flex-grow-1" style={{ minWidth: "220px" }}>
                            <Input state="none" leftIcon={<i className="bi bi-search"/>} placeholder="Tìm kiếm nguyên liệu..." value={keyword} onChange={(e) => setKeyword(e.target.value)}></Input>
                        </div>

                        <select className="form-select rounded-4" style={{ width: "160px" }}>
                            <option>Danh mục</option>
                        </select>

                        <select className="form-select rounded-4" style={{ width: "160px" }}>
                            <option>Trạng thái</option>
                        </select>
                        
                        <select className="form-select rounded-4" style={{ width: "160px" }}>
                            <option>Thương hiệu</option>
                        </select>

                        <Button customVariant="secondary" className="rounded-4">
                            <i className="bi bi-funnel me-1" /> Bộ lọc
                        </Button>

                        <Button customVariant="secondary" className="rounded-4">
                            <i className="bi bi-gear" />
                        </Button>
                    </div>
                </Card>
                
                <Table<IngredientProps>
                    columns={columns}
                    data={pageData}
                    rowKey="id"
                    showIndex
                    currentPage={page}
                    pageSize={pageSize}
                />

                <Pagination 
                    currentPage={page}
                    pageSize={pageSize}
                    totalItems={mockIngredients.length}
                    onPageChange={setPage}
                    onPageSizeChange={(size) => {
                        setPageSize(size);
                        setPage(1);
                    }}
                    itemLabel="nguyên liệu"
                />
            </div>
        </div>
    )
}


export default Ingredients;