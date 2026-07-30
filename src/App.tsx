import Input from './components/ui/Input'
import DateInput from './components/ui/DateInput'
import { useState } from 'react'
import Table from './components/ui/Table'
import type { Column } from './components/ui/Table'
// import Sidebar from "./layout/Sidebar";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";


interface Order {
    id: number;
    code: string;
    customer: string;
    status: "completed" | "processing" | "cancelled";
    statusText: string;
    total: number;
}

const mockOrders: Order[] = [
    { id: 1, code: "#2", customer: "Khách vãng lai", status: "completed", statusText: "Hoàn thành", total: 308000 },
    { id: 2, code: "#1", customer: "Nguyễn Văn A", status: "processing", statusText: "Đang xử lý", total: 256000 },
    { id: 3, code: "#200", customer: "Trần Thị B", status: "completed", statusText: "Hoàn thành", total: 450000 },
    { id: 4, code: "#199", customer: "Lê Văn C", status: "processing", statusText: "Đang xử lý", total: 189000 },
    { id: 5, code: "#198", customer: "Phạm Thị D", status: "cancelled", statusText: "Đã huỷ", total: 120000 },
    { id: 6, code: "#197", customer: "Hoàng Văn E", status: "completed", statusText: "Hoàn thành", total: 320000 },
    { id: 7, code: "#196", customer: "Đỗ Thị F", status: "completed", statusText: "Hoàn thành", total: 275000 },
    { id: 8, code: "#195", customer: "Vũ Văn G", status: "processing", statusText: "Đang xử lý", total: 610000 },
];

const statusBadgeClass: Record<Order["status"], string> = {
    completed: "text-bg-success",
    processing: "text-bg-info",
    cancelled: "text-bg-danger",
};

const formatCurrency = (value: number) => `${value.toLocaleString("vi-VN")}đ`;

function App() {
    const [date, setDate] = useState<Date | null>(null);
    const [keyword, setKeyword] = useState("");
    const [page, setPage] = useState(1);
    const pageSize = 8;

    const filtered = mockOrders.filter(
        (o) =>
            o.customer.toLowerCase().includes(keyword.toLowerCase()) ||
            o.code.toLowerCase().includes(keyword.toLowerCase())
    );

    const pageData = filtered.slice((page - 1) * pageSize, page * pageSize);

    const columns: Column<Order>[] = [
        { key: "code", header: "Mã đơn hàng" },
        { key: "customer", header: "Khách hàng" },
        {
            key: "statusText",
            header: "Trạng thái",
            render: (row) => (
                <span className={`badge rounded-pill ${statusBadgeClass[row.status]}`}>
                    {row.statusText}
                </span>
            ),
        },
        {
            key: "total",
            header: "Tổng tiền",
            align: "end",
            render: (row) => formatCurrency(row.total),
        },
        {
            key: "id",
            header: "",
            align: "end",
            render: () => (
                <button className="btn btn-sm btn-outline-secondary">
                    <i className="bi bi-three-dots-vertical" />
                </button>
            ),
        },
    ];

    return (
        <div className="row g-2 m-3">
            <div>
                <Header></Header>
                {/* <Sidebar></Sidebar> */}
            </div>
            <div className="col-6"><Input placeholder="Không icon"/></div>
            <div className="col-6"><Input placeholder="Tìm kiếm" leftIcon={<i className="bi bi-search"/>} state="success"/></div>
            <div className="col-6">
                <Input
                    placeholder="Email"
                    state="error"
                    message="Email không đúng định dạng"
                    leftIcon={<i className="bi bi-envelope" />}
                />
            </div>

            <div className="col-6"><DateInput selected={date} onChange={setDate} /></div>
            <div className="col-6"><Input placeholder="Tên" /></div>
            <div className="col-6"><Input placeholder="Email" /></div>
            <div className="col-6"><Input placeholder="SĐT" /></div>
            <div className="col-6"><Input placeholder="Địa chỉ" /></div>

            <div>
                <Table<Order>
                title="Danh sách đơn hàng"
                searchValue={keyword}
                onSearchChange={(value) => {
                    setKeyword(value);
                    setPage(1);
                }}
                searchPlaceholder="Tìm theo mã đơn, khách hàng..."
                showIndex
                currentPage={page}
                pageSize={pageSize}
                columns={columns}
                data={pageData}
                rowKey="id"
                />

                <div className="mt-2 d-flex gap-2">
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => setPage((p) => Math.max(1, p - 1))}>
                        Trang trước
                    </button>
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => setPage((p) => p + 1)}>
                        Trang sau
                    </button>
                </div>
            </div>
        </div>

        
    )
  const [activeTab, setActiveTab] = useState("don-hang");

  return (
    <div className="vh-100 overflow-hidden">
      <Header />

      <div
        className="d-flex"
        style={{
          height: "calc(100vh - 100px)",
          marginTop: "100px",
        }}
      >
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <main className="flex-grow-1 overflow-auto p-4">
          <p>{activeTab}</p>
        </main>
      </div>
    </div>
  );
}

export default App