import {type Column } from "../components/ui/Table";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Label from "../components/ui/Label";
import Table from "../components/ui/Table";

interface Transaction {
  id: string;
  date: string;
  time: string;
  type: string;
  content: string;
  method: string;
  income: string;
  expense: string;
  balance: string;
  user: string;
}

export default function CashBook() {
  const transactions: Transaction[] = [
    {
      id: "PT-280726-001",
      date: "28/07/2026",
      time: "09:30",
      type: "Thu",
      content: "Thu tiền bán hàng",
      method: "Tiền mặt",
      income: "2.707.000đ",
      expense: "-",
      balance: "3.381.000đ",
      user: "admin",
    },
    {
      id: "PC-280726-002",
      date: "28/07/2026",
      time: "09:15",
      type: "Chi",
      content: "Chi mua hàng hóa",
      method: "Tiền mặt",
      income: "-",
      expense: "1.250.000đ",
      balance: "674.000đ",
      user: "admin",
    },
    {
      id: "PT-270726-003",
      date: "27/07/2026",
      time: "16:45",
      type: "Thu",
      content: "Thu tiền khách đặt cọc",
      method: "Chuyển khoản",
      income: "1.500.000đ",
      expense: "-",
      balance: "1.924.000đ",
      user: "nhanvien1",
    },
    {
      id: "PC-270726-004",
      date: "27/07/2026",
      time: "11:20",
      type: "Chi",
      content: "Chi phí vận chuyển",
      method: "Tiền mặt",
      income: "-",
      expense: "250.000đ",
      balance: "424.000đ",
      user: "nhanvien1",
    },
    {
      id: "PT-260726-005",
      date: "26/07/2026",
      time: "18:05",
      type: "Thu",
      content: "Thu tiền bán hàng",
      method: "QR Code",
      income: "850.000đ",
      expense: "-",
      balance: "674.000đ",
      user: "admin",
    },
  ];

  const columns: Column<Transaction>[] = [
    {
      key: "date",
      header: "Ngày giờ",
      render: (row) => (
        <>
          <div>{row.date}</div>
          <small className="text-secondary">{row.time}</small>
        </>
      ),
    },
    {
      key: "id",
      header: "Mã phiếu",
      render: (row) => (
        <span className="text-primary fw-semibold">{row.id}</span>
      ),
    },
    {
      key: "type",
      header: "Loại giao dịch",
      render: (row) => (
        <span
          className={`badge rounded-pill px-3 py-2 ${
            row.type === "Thu"
              ? "bg-success-subtle text-success"
              : "bg-danger-subtle text-danger"
          }`}
        >
          {row.type}
        </span>
      ),
    },
    {
      key: "content",
      header: "Nội dung",
    },
    {
      key: "method",
      header: "Phương thức",
      render: (row) => {
        let cls = "bg-primary-subtle text-primary";

        if (row.method === "Chuyển khoản")
          cls = "bg-info-subtle text-info";

        if (row.method === "QR Code")
          cls = "bg-warning-subtle text-warning";

        return (
          <span className={`badge rounded-pill px-3 py-2 ${cls}`}>
            {row.method}
          </span>
        );
      },
    },
    {
      key: "income",
      header: "Thu",
      align: "end",
      render: (row) => (
        <span className="fw-semibold text-success">{row.income}</span>
      ),
    },
    {
      key: "expense",
      header: "Chi",
      align: "end",
      render: (row) => (
        <span className="fw-semibold text-danger">{row.expense}</span>
      ),
    },
    {
      key: "balance",
      header: "Số dư",
      align: "end",
    },
    {
      key: "user",
      header: "Người thực hiện",
    },
    {
      key: "id",
      header: "Thao tác",
      align: "center",
      render: () => (
        <div className="dropdown">
          <button
            className="btn btn-light border rounded-3 shadow-sm"
            data-bs-toggle="dropdown"
          >
            <i className="bi bi-three-dots-vertical"></i>
          </button>

          <ul className="dropdown-menu dropdown-menu-end shadow">
            <li>
              <button className="dropdown-item">
                <i className="bi bi-pencil me-2 text-primary"></i>
                Sửa
              </button>
            </li>

            <li>
              <button className="dropdown-item text-danger">
                <i className="bi bi-trash me-2"></i>
                Xóa
              </button>
            </li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <div className="container-fluid mt-5 pt-5">
        <h2>Sổ quỹ</h2>
      {/* Filter */}
      <Card className="p-4 shadow-sm border-0 mb-4">
        <div className="row g-3">

          <div className="col-lg-3">
            <Label>Khoảng thời gian</Label>
            <Input placeholder="01/07/2026 - 28/07/2026" />
          </div>

          <div className="col-lg-2">
            <Label>Loại giao dịch</Label>

            <select className="form-select">
              <option>Tất cả</option>
              <option>Thu</option>
              <option>Chi</option>
            </select>
          </div>

          <div className="col-lg-2">
            <Label>Phương thức</Label>

            <select className="form-select">
              <option>Tất cả</option>
              <option>Tiền mặt</option>
              <option>Chuyển khoản</option>
              <option>QR Code</option>
            </select>
          </div>

          <div className="col-lg-3">
            <Label>&nbsp;</Label>
            <Input
              leftIcon={<i className="bi bi-search"></i>}
              placeholder="Tìm kiếm mô tả, mã phiếu..."
            />
          </div>

          <div className="col-lg-2 d-flex align-items-end gap-2">

            <button className="btn btn-primary flex-fill">
              <i className="bi bi-funnel me-2"></i>
              Lọc
            </button>

            <button className="btn btn-outline-secondary">
              <i className="bi bi-download me-2"></i>
              Excel
            </button>

          </div>

        </div>
      </Card>

      {/* Table */}
      <Card className="p-4 shadow-sm border-0">

        <Table
          columns={columns}
          data={transactions}
          rowKey="id"
        />

        <div className="d-flex justify-content-between align-items-center mt-4">

          <small className="text-secondary">
            Hiển thị 1 đến 5 trong 24 giao dịch
          </small>

          <nav>
            <ul className="pagination pagination-sm mb-0">

              <li className="page-item">
                <button className="page-link">
                  <i className="bi bi-chevron-left"></i>
                </button>
              </li>

              <li className="page-item active">
                <button className="page-link">1</button>
              </li>

              <li className="page-item">
                <button className="page-link">2</button>
              </li>

              <li className="page-item">
                <button className="page-link">3</button>
              </li>

              <li className="page-item disabled">
                <span className="page-link">...</span>
              </li>

              <li className="page-item">
                <button className="page-link">5</button>
              </li>

              <li className="page-item">
                <button className="page-link">
                  <i className="bi bi-chevron-right"></i>
                </button>
              </li>

            </ul>
          </nav>

        </div>

      </Card>

    </div>
  );
}