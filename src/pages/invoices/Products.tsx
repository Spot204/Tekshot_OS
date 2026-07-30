import StatCard from "../../components/invoices/products/StatCard"
import Card from "../../components/ui/Card"
import Input from "../../components/ui/Input"
import Label from "../../components/ui/Label"
import Table from "../../components/ui/Table"
import { useState } from "react"
import type { Column } from "../../components/ui/Table"
import Button from "../../components/ui/Button"
import Pagination from "../../components/ui/Pagination"

interface Product {
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

const mockProducts: Product[] = [
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

function Products () {
    const [keyword, setKeyword] = useState("");
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(8);

    const pageData = mockProducts.slice((page - 1) * pageSize, page * pageSize);

    const columns: Column<Product>[] = [
        {
            key: "id",
            header: "",
            render: () => <input type="checkbox" className="form-check-input" />,
        },
        {
            key: "name",
            header: "Sản phẩm",
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
            header: "Tồn kho",
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
                <button className="btn btn-sm btn-primary border me-3 rounded-4">
                    <i className="bi bi-three-dots-vertical" />
                </button>
            ),
        },
    ];

    return (
        <div className="p-3 bg-light">
            <div className="fs-4 fw-bold mb-3">
                <i className="bi bi-box-seam text-warning"/> Sản phẩm
            </div>

            <div className="row row-cols-2 row-cols-sm-3 row-cols-lg-5 row-cols-xl-5 g-3 mb-3">
                <div className="col">
                    <StatCard
                        icon={<i className="bi bi-box-seam" />}
                        iconBgClassName="bg-primary-subtle text-primary"
                        label="Tổng sản phẩm"
                        value="1,247"
                        change={{ value: "12.6%", direction: "up" }}
                    />
                </div>

                <div className="col">
                    <StatCard
                        icon={<i className="bi bi-tag" />}
                        iconBgClassName="bg-success-subtle text-success"
                        label="Giá trị tồn kho"
                        value="2.450.000.000đ"
                        change={{ value: "8.4%", direction: "up" }}
                    />
                </div>

                <div className="col">
                    <StatCard
                        icon={<i className="bi bi-bag" />}
                        iconBgClassName=""
                        iconStyle={{ backgroundColor: "#f3e8ff", color: "#9333ea" }}
                        label="Đang bán"
                        value="986"
                        change={{ value: "10.3%", direction: "up" }}
                    />
                </div>

                <div className="col">
                    <StatCard
                        icon={<i className="bi bi-exclamation-triangle" />}
                        iconBgClassName="bg-warning-subtle text-warning"
                        label="Sắp hết hàng"
                        value="72"
                        change={{ value: "4.2%", direction: "down" }}
                    />
                </div>

                <div className="col">
                    <StatCard
                        icon={<i className="bi bi-slash-circle" />}
                        iconBgClassName=""
                        iconStyle={{ backgroundColor: "#d1f5f0", color: "#0d9488" }}
                        label="Ngừng kinh doanh"
                        value="24"
                        change={{ value: "2.1%", direction: "down" }}
                    />
                </div>
            </div>

            <div >
                <Card className="mb-3">
                    <div className="d-flex flex-wrap align-items-center gap-2">
                        <div className="flex-grow-1" style={{ minWidth: "220px" }}>
                            <Input state="none" leftIcon={<i className="bi bi-search"/>} placeholder="Tìm kiếm sản phẩm..." value={keyword} onChange={(e) => setKeyword(e.target.value)}></Input>
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

                        <Button customVariant="primary" className="rounded-4">
                            <i className="bi bi-plus-lg me-1" /> Thêm mới
                        </Button>

                        <Button customVariant="secondary" className="rounded-4">
                            <i className="bi bi-gear" />
                        </Button>
                    </div>
                </Card>
                
                <Table<Product>
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
                    totalItems={mockProducts.length}
                    onPageChange={setPage}
                    onPageSizeChange={(size) => {
                        setPageSize(size);
                        setPage(1);
                    }}
                    itemLabel="sản phẩm"
                />
            </div>
        </div>
    )
}


export default Products;