import Card from "../components/ui/Card";
import Table, { type Column } from "../components/ui/Table";
import Input from "../components/ui/Input";
import Label from "../components/ui/Label";
import Button from "../components/ui/Button"

interface Order {
  id: string;
  customer: string;
  status: string;
  total: string;
}

export default function OrdersPage() {
  const orders = [
    {
      id: "#2",
      customer: "Khách vãng lai",
      status: "Hoàn thành",
      total: "308.000đ",
      payment: "Tiền mặt",
    },
    {
      id: "#1",
      customer: "Nguyễn Văn A",
      status: "Đang xử lý",
      total: "256.000đ",
      payment: "Tiền mặt",
    },
    {
      id: "#200",
      customer: "Trần Thị B",
      status: "Hoàn thành",
      total: "450.000đ",
      payment: "Chuyển khoản",
    },
    {
      id: "#199",
      customer: "Lê Văn C",
      status: "Đang xử lý",
      total: "189.000đ",
      payment: "Tiền mặt",
    },
    {
      id: "#198",
      customer: "Phạm Thị D",
      status: "Đã hủy",
      total: "120.000đ",
      payment: "Chuyển khoản",
    },
  ];

  const products = [
    {
      name: "Pizza 4 vị phô mai - S",
      quantity: 1,
      topping: 0,
      discount: "0đ",
      price: "59.000đ",
    },
    {
      name: "Pizza 4 vị phô mai - M",
      quantity: 1,
      topping: 0,
      discount: "0đ",
      price: "99.000đ",
    },
    {
      name: "Pizza 4 vị phô mai - L",
      quantity: 1,
      topping: 0,
      discount: "0đ",
      price: "150.000đ",
    },
  ];
  const orderColumns: Column<Order>[] = [
    {
      key: "id",
      header: "Mã đơn hàng",
    },
    {
      key: "customer",
      header: "Khách hàng",
    },
    {
      key: "status",
      header: "Trạng thái",
    },
    {
      key: "total",
      header: "Tổng tiền",
      align: "end",
    },
    {
      key: "id", // chỉ cần một key bất kỳ có trong Order
      header: "Thao tác",
      align: "center",
      render: (row) => (
        <div className="dropdown">
          <button
            className="btn btn-light btn-sm border rounded-3"
            type="button"
            data-bs-toggle="dropdown"
          >
            <i className="bi bi-three-dots-vertical"></i>
          </button>

          <ul className="dropdown-menu dropdown-menu-end shadow-sm">
            <li>
              <button className="dropdown-item" onClick={() => handleEdit(row)}>
                <i className="bi bi-pencil me-2 text-primary"></i>
                Sửa
              </button>
            </li>

            <li>
              <button
                className="dropdown-item text-danger"
                onClick={() => handleDelete(row)}
              >
                <i className="bi bi-trash me-2"></i>
                Xóa
              </button>
            </li>
          </ul>
        </div>
      ),
    },
  ];

  const handleEdit = (order: Order) => {
    console.log("Edit:", order);
  };

  const handleDelete = (order: Order) => {
    console.log("Delete:", order);
  };

  const productColumns: Column<(typeof products)[number]>[] = [
    {
      key: "name",
      header: "Sản phẩm",
    },
    {
      key: "quantity",
      header: "SL",
      align: "center",
    },
    {
      key: "topping",
      header: "Topping",
      align: "center",
    },
    {
      key: "discount",
      header: "Giảm",
      align: "center",
    },
    {
      key: "price",
      header: "Thành tiền",
      align: "end",
    },
  ];
  const badge = (status: string) => {
    switch (status) {
      case "Hoàn thành":
        return "bg-success-subtle text-success";
      case "Đang xử lý":
        return "bg-primary-subtle text-primary";
      case "Đã hủy":
        return "bg-danger-subtle text-danger";
      default:
        return "bg-secondary";
    }
  };

  return (
    <div className="container-fluid mt-5 pt-3 position-fixed " style={{width: "85%"}} >
      {/* ======= Statistic ======= */}

      <div className="row g-4 mb-4">
        {/* Tổng đơn hàng */}
        <div className="col-md-6 col-lg-3">
          <Card className="shadow-sm border-0 h-100">
            <div className="card-body d-flex align-items-center">
              <div
                className="bg-primary bg-opacity-10 rounded-4 d-flex align-items-center justify-content-center me-3"
                style={{ width: "56px", height: "56px" }}
              >
                <i className="bi bi-receipt-cutoff fs-3 text-primary"></i>
              </div>

              <div>
                <Label className="text-muted">Tổng đơn hàng</Label>
                <h3 className="fw-bold mb-1">246</h3>
                <small className="text-success">
                  <i className="bi bi-arrow-up"></i> 16.8%{" "}
                  <span className="text-black">so với hôm qua</span>
                </small>
              </div>
            </div>
          </Card>
        </div>

        {/* Đơn hoàn thành */}
        <div className="col-md-6 col-lg-3">
          <Card className="shadow-sm border-0 h-100">
            <div className="card-body d-flex align-items-center">
              <div
                className="bg-success bg-opacity-10 rounded-4 d-flex align-items-center justify-content-center me-3"
                style={{ width: "56px", height: "56px" }}
              >
                <i className="bi bi-check-circle fs-3 text-success"></i>
              </div>

              <div>
                <Label className="text-muted">Đơn hoàn thành</Label>
                <h3 className="fw-bold mb-1">198</h3>
                <small className="text-success">
                  <i className="bi bi-arrow-up"></i> 14.3%{" "}
                  <span className="text-black">so với hôm qua</span>
                </small>
              </div>
            </div>
          </Card>
        </div>

        {/* Đang xử lý */}
        <div className="col-md-6 col-lg-3">
          <Card className="shadow-sm border-0 h-100">
            <div className="card-body d-flex align-items-center">
              <div
                className="bg-warning bg-opacity-10 rounded-4 d-flex align-items-center justify-content-center me-3"
                style={{ width: "56px", height: "56px" }}
              >
                <i className="bi bi-clock-history fs-3 text-warning"></i>
              </div>

              <div>
                <Label className="text-muted">Đang xử lý</Label>
                <h3 className="fw-bold mb-1">32</h3>
                <small className="text-warning">
                  <i className="bi bi-arrow-up"></i> 8.2%{" "}
                  <span className="text-black">so với hôm qua</span>
                </small>
              </div>
            </div>
          </Card>
        </div>

        {/* Đã hủy */}
        <div className="col-md-6 col-lg-3">
          <Card className="shadow-sm border-0 h-100">
            <div className="card-body d-flex align-items-center">
              <div
                className="bg-danger bg-opacity-10 rounded-4 d-flex align-items-center justify-content-center me-3"
                style={{ width: "56px", height: "56px" }}
              >
                <i className="bi bi-x-circle fs-3 text-danger"></i>
              </div>

              <div>
                <Label className="text-muted">Đã hủy</Label>
                <h3 className="fw-bold mb-1">16</h3>
                <small className="text-danger">
                  <i className="bi bi-arrow-down"></i> 4.7%{" "}
                  <span className="text-black">so với hôm qua</span>
                </small>
              </div>
            </div>
          </Card>
        </div>
      </div>
      {/* ======= Content ======= */}

      <div className="row">
        {/* LEFT */}

        <div className="col-lg-7">
          <Card className="p-4 shadow-sm border-0">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <Label background={false} className="fw-bold fs-4 text-dark">
                Danh sách đơn hàng
              </Label>

              <div style={{ width: "360px" }}>
                <Input state="none" leftIcon={<i className="bi bi-search"/>} placeholder="Tìm kiếm sản phẩm..."></Input>
              </div>
               <Button customVariant="secondary" > <i className="bi bi-printer "></i>Tạo đơn với OCR</Button>
                <Button > <i className="bi bi-funnel"></i>Lọc</Button>
            </div>

            {/* Table */}
            <Table columns={orderColumns} data={orders} rowKey="id" showIndex />

            {/* Footer */}
            <div className="d-flex justify-content-between align-items-center mt-4">
              <small className="text-secondary">
                Hiển thị 1-8 trong 246 đơn hàng
              </small>

              <nav>
                <ul className="pagination pagination-sm mb-0">
                  <li className="page-item">
                    <button className="page-link">&lt;</button>
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
                    <button className="page-link">31</button>
                  </li>

                  <li className="page-item">
                    <button className="page-link">&gt;</button>
                  </li>
                </ul>
              </nav>
            </div>
          </Card>
        </div>

        {/* RIGHT */}

        <div className="col-lg-5">
          <Card className="p-3">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <Label>Chi tiết đơn #2</Label>

                <div className="text-secondary small">11:49 29/06/2026</div>
              </div>

              <span className="badge bg-success">Hoàn thành</span>
            </div>

            <Table columns={productColumns} data={products} rowKey="name" />

            <hr />

            <div className="d-flex justify-content-between mb-2">
              <span>Tổng</span>
              <strong>3</strong>
            </div>

            <div className="d-flex justify-content-between mb-2">
              <span>Giảm giá</span>
              <span>0đ</span>
            </div>

            <div className="d-flex justify-content-between mb-2">
              <span>VAT</span>
              <span>0đ</span>
            </div>

            <hr />

            <div className="d-flex justify-content-between align-items-center">
              <h5>Tổng tiền</h5>

              <h3 className="text-danger fw-bold">308.000đ</h3>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
