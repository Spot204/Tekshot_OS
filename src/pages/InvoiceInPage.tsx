import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Table,
  Form,
  Badge,
  Pagination,
  Collapse,
  InputGroup,
  Dropdown,
} from "react-bootstrap";
import {
  FileText,
  Plus,
  Send,
  Filter,
  RotateCcw,
  Search,
  Calendar,
  MoreVertical,
  ChevronUp,
} from "lucide-react";
import Button from "../components/ui/Button";

// --- Định nghĩa Interface cho dữ liệu ---
interface Invoice {
  id: string;
  time: string;
  orderId: string;
  customer: string;
  phone: string;
  date: string;
  hour: string;
  total: string;
  discount: string;
  tax: string;
  grandTotal: string;
  status: "Đã thanh toán" | "Một phần" | "Chưa thanh toán" | string;
}

const InvoiceInPage: React.FC = () => {
  const [showFilter, setShowFilter] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Dữ liệu mẫu (Mock data)
  const invoices: Invoice[] = [
    {
      id: "00000026",
      time: "28/07/2026 10:15",
      orderId: "DH0001248",
      customer: "Nguyễn Văn An",
      phone: "0901 234 567",
      date: "28/07/2026",
      hour: "10:15",
      total: "2.450.000",
      discount: "0",
      tax: "245.000",
      grandTotal: "2.695.000",
      status: "Đã thanh toán",
    },
    {
      id: "00000025",
      time: "28/07/2026 09:22",
      orderId: "DH0001247",
      customer: "Trần Thị Bích",
      phone: "0902 345 678",
      date: "28/07/2026",
      hour: "09:22",
      total: "1.800.000",
      discount: "0",
      tax: "180.000",
      grandTotal: "1.980.000",
      status: "Đã thanh toán",
    },
    {
      id: "00000024",
      time: "27/07/2026 16:45",
      orderId: "DH0001246",
      customer: "Công ty TNHH ABC",
      phone: "0312345678",
      date: "27/07/2026",
      hour: "16:45",
      total: "12.500.000",
      discount: "250.000",
      tax: "1.225.000",
      grandTotal: "13.475.000",
      status: "Một phần",
    },
    {
      id: "00000023",
      time: "27/07/2026 11:05",
      orderId: "DH0001245",
      customer: "Lê Minh Tuấn",
      phone: "0903 456 789",
      date: "27/07/2026",
      hour: "11:05",
      total: "980.000",
      discount: "0",
      tax: "98.000",
      grandTotal: "1.078.000",
      status: "Chưa thanh toán",
    },
  ];

  // Hàm hiển thị Badge trạng thái
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Đã thanh toán":
        return (
          <Badge
            bg="success-subtle"
            className="text-success border border-success-subtle px-3 py-2 fw-medium"
          >
            Đã thanh toán
          </Badge>
        );
      case "Một phần":
        return (
          <Badge
            bg="warning-subtle"
            className="text-warning border border-warning-subtle px-3 py-2 fw-medium"
          >
            Một phần
          </Badge>
        );
      case "Chưa thanh toán":
        return (
          <Badge
            bg="danger-subtle"
            className="text-danger border border-danger-subtle px-3 py-2 fw-medium"
          >
            Chưa thanh toán
          </Badge>
        );
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="p-4 bg-light min-vh-100">
      {/* HEADER SECTION */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center gap-3">
          <div className="p-3 rounded-3 bg-white shadow-sm border border-warning-subtle text-warning">
            <FileText size={28} />
          </div>
          <div>
            <h4 className="fw-bold mb-0">Hóa đơn đầu ra</h4>
            <p className="text-muted small mb-0">
              Quản lý và theo dõi tất cả hóa đơn bán hàng.
            </p>
          </div>
        </div>

        <div className="d-flex gap-2">
          <Button
            customVariant="secondary"
            onClick={() => console.log("Thêm hóa đơn click")}
          >
            <Plus size={18} className="me-1" /> Thêm hóa đơn
          </Button>
          <Button
            customVariant="primary"
            onClick={() => console.log("Phát hành click")}
          >
            <Send size={18} className="me-1" /> Phát hành
          </Button>
        </div>
      </div>

      {/* FILTER BUTTON & COLLAPSE */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body>
          <div className="d-flex justify-content-end align-items-center">
            <div className="d-flex gap-2">
              <Button
                customVariant="secondary"
                onClick={() => setShowFilter(!showFilter)}
              >
                <Filter size={18} className="me-1" /> Bộ lọc
              </Button>
              <Button
                variant="link"
                className="text-decoration-none text-dark d-flex align-items-center"
                onClick={() => {
                  setSearchQuery("");
                  console.log("Đặt lại lọc");
                }}
              >
                <RotateCcw size={18} className="me-1" /> Đặt lại
              </Button>
            </div>
          </div>

          <Collapse in={showFilter}>
            <div className="mt-4 border-top pt-4">
              <Row className="g-3">
                <Col md={3}>
                  <Form.Group>
                    <InputGroup>
                      <Form.Control type="text" placeholder="01/07/2026" />
                      <InputGroup.Text className="bg-white">
                        <Calendar size={16} />
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <InputGroup>
                      <Form.Control type="text" placeholder="28/07/2026" />
                      <InputGroup.Text className="bg-white">
                        <Calendar size={16} />
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col md={2}>
                  <Form.Select>
                    <option>Chọn trạng thái</option>
                    <option value="paid">Đã thanh toán</option>
                    <option value="unpaid">Chưa thanh toán</option>
                  </Form.Select>
                </Col>
                <Col md={4}>
                  <InputGroup>
                    <Form.Control
                      placeholder="Tìm theo số hóa đơn, khách hàng, mã đơn..."
                      value={searchQuery}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setSearchQuery(e.target.value)
                      }
                    />
                    <InputGroup.Text className="bg-white">
                      <Search size={18} />
                    </InputGroup.Text>
                  </InputGroup>
                </Col>
              </Row>
            </div>
          </Collapse>
        </Card.Body>
      </Card>

      {/* TABLE SECTION */}
      <Card className="border-0 shadow-sm overflow-hidden">
        <Table hover responsive className="mb-0">
          <thead className="bg-light text-muted small">
            <tr>
              <th className="ps-4 py-3">
                <Form.Check type="checkbox" />
              </th>
              <th className="py-3">Số hóa đơn</th>
              <th className="py-3">Mã đơn</th>
              <th className="py-3">Khách hàng</th>
              <th className="py-3">
                Ngày hóa đơn <ChevronUp size={14} className="ms-1" />
              </th>
              <th className="py-3">Tổng tiền</th>
              <th className="py-3">Giảm giá</th>
              <th className="py-3">Tiền thuế</th>
              <th className="py-3">Tổng tiền TT</th>
              <th className="py-3">Trạng thái</th>
              <th className="py-3 text-center pe-4">Thao tác</th>
            </tr>
          </thead>
          <tbody className="small">
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="align-middle border-bottom">
                <td className="ps-4">
                  <Form.Check type="checkbox" />
                </td>
                <td>
                  <div
                    className="text-primary fw-bold mb-0 cursor-pointer"
                    onClick={() =>
                      console.log("Xem chi tiết hóa đơn:", invoice.id)
                    }
                  >
                    {invoice.id}
                  </div>
                  <div className="text-muted" style={{ fontSize: "11px" }}>
                    {invoice.time}
                  </div>
                </td>
                <td>{invoice.orderId}</td>
                <td>
                  <div className="fw-semibold text-dark">
                    {invoice.customer}
                  </div>
                  <div className="text-muted" style={{ fontSize: "11px" }}>
                    {invoice.phone}
                  </div>
                </td>
                <td>
                  <div className="fw-semibold text-dark">{invoice.date}</div>
                  <div className="text-muted" style={{ fontSize: "11px" }}>
                    {invoice.hour}
                  </div>
                </td>
                <td>{invoice.total}</td>
                <td>{invoice.discount}</td>
                <td>{invoice.tax}</td>
                <td className="fw-bold">{invoice.grandTotal}</td>
                <td>{getStatusBadge(invoice.status)}</td>
                <td className="text-center pe-4">
                  <Dropdown align="end">
                    <Dropdown.Toggle
                      as="div"
                      className="p-1 cursor-pointer no-caret"
                    >
                      <MoreVertical size={18} className="text-muted" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="shadow-sm border-0">
                      <Dropdown.Item onClick={() => console.log("Xem")}>
                        Xem chi tiết
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => console.log("In")}>
                        In hóa đơn
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item
                        className="text-danger"
                        onClick={() => console.log("Hủy")}
                      >
                        Hủy hóa đơn
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* PAGINATION SECTION */}
        <div className="p-3 d-flex justify-content-between align-items-center bg-white border-top">
          <div className="text-muted small">
            Hiển thị 1 đến {invoices.length} trong 128 hóa đơn
          </div>
          <div className="d-flex align-items-center gap-3">
            <Pagination className="mb-0 pagination-sm shadow-none">
              <Pagination.Prev disabled />
              <Pagination.Item active>{1}</Pagination.Item>
              <Pagination.Item>{2}</Pagination.Item>
              <Pagination.Item>{3}</Pagination.Item>
              <Pagination.Ellipsis />
              <Pagination.Item>{16}</Pagination.Item>
              <Pagination.Next />
            </Pagination>
            <Form.Select
              size="sm"
              style={{ width: "120px" }}
              className="bg-light border-0"
            >
              <option>10 / trang</option>
              <option>20 / trang</option>
              <option>50 / trang</option>
            </Form.Select>
          </div>
        </div>
      </Card>

      <style>{`
        .cursor-pointer { cursor: pointer; }
        .no-caret::after { display: none !important; }
        .bg-success-subtle { background-color: #d1e7dd !important; }
        .bg-warning-subtle { background-color: #fff3cd !important; }
        .bg-danger-subtle { background-color: #f8d7da !important; }
        .text-success { color: #0f5132 !important; }
        .text-warning { color: #664d03 !important; }
        .text-danger { color: #842029 !important; }
        
        table thead th { 
          font-weight: 600; 
          background-color: #f8f9fa !important;
          color: #4b5563 !important;
          border-bottom: 1px solid #e5e7eb !important;
        }
        
        table tbody td { 
          padding: 1rem 0.5rem !important;
          color: #4b5563;
        }

        .pagination .page-link {
          color: #4b5563;
          border: none;
          margin: 0 2px;
          border-radius: 4px;
        }

        .pagination .page-item.active .page-link {
          background-color: #084298;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default InvoiceInPage;
