import React, { useState, useMemo } from "react";
import { createPortal } from "react-dom";
import Icon from "../../components/ui/Icon";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import ComboBox from "../../components/ui/ComboBox";
import type { Invoice } from "../../types/invoice";

interface InvoiceItem {
  id: string;
  name: string;
  sku: string;
  unit: string;
  quantity: number;
  price: number;
  discount: number;
  taxRate: string;
  type: string;
}

interface InvoiceActionProps {
  invoice: Invoice | null;
  mode: "view" | "edit";
  onClose: () => void;
}

export default function InvoiceAction({
  invoice,
  mode,
  onClose,
}: InvoiceActionProps) {
  const [items, setItems] = useState<InvoiceItem[]>([
    {
      id: "1",
      name: "Hàng hóa/dịch vụ 1",
      sku: "HH001",
      unit: "Cái",
      quantity: 5,
      price: 10000,
      discount: 0,
      taxRate: "0%",
      type: "Hàng hóa/dịch vụ",
    },
    {
      id: "2",
      name: "Hàng hóa/dịch vụ 2",
      sku: "HH002",
      unit: "Cái",
      quantity: 9,
      price: 1000,
      discount: 0,
      taxRate: "0%",
      type: "Hàng hóa/dịch vụ",
    },
    {
      id: "3",
      name: "Ghi chú/diễn giải",
      sku: "GC001",
      unit: "Cái",
      quantity: 1,
      price: 1000,
      discount: 0,
      taxRate: "0%",
      type: "Ghi chú/diễn giải",
    },
  ]);

  const totals = useMemo(() => {
    const subtotal = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
    const discount = 100000;
    return { subtotal, discount, total: subtotal - discount };
  }, [items]);

  const renderEditContent = () => (
    <div className="row g-3">
      {/* Sidebar trái: Thông tin hóa đơn */}
      <div className="col-lg-3">
        <Card padding="p-3" className="border-0 shadow-sm h-100">
          <div className="fw-bold mb-3 d-flex align-items-center gap-2">
            <Icon name="file-earmark-text" className="text-primary" /> Thông tin
            hóa đơn
          </div>
          <div className="mb-3">
            <label className="smaller fw-bold mb-1">Nhãn *</label>
            <Input defaultValue="Hóa đơn bán hàng" />
          </div>
          <div className="mb-3">
            <label className="smaller fw-bold mb-1">Đơn vị</label>
            <Input placeholder="Nhập đơn vị" />
          </div>
          <div className="mb-3">
            <label className="smaller fw-bold mb-1">Khách hàng *</label>
            <Input
              defaultValue="Bán hàng cho người tiêu dùng"
              rightIcon={<Icon name="person" />}
            />
          </div>
          <div className="mb-3">
            <label className="smaller fw-bold mb-1">Số điện thoại</label>
            <Input placeholder="Nhập số điện thoại" />
          </div>
          <div className="mb-3">
            <label className="smaller fw-bold mb-1">Mã số thuế</label>
            <Input placeholder="Nhập mã số thuế" />
          </div>
          <div className="mb-3">
            <label className="smaller fw-bold mb-1">Địa chỉ</label>
            <Input placeholder="Nhập địa chỉ" />
          </div>
          <div className="mb-3">
            <label className="smaller fw-bold mb-1">
              Phương thức thanh toán
            </label>
            <select className="form-select">
              <option>TM</option>
              <option>CK</option>
              <option>TM/CK</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="smaller fw-bold mb-1">Invoice store *</label>
            <select className="form-select">
              <option>Test OS (13)</option>
            </select>
          </div>
          <div className="d-flex justify-content-between align-items-center border-top pt-3">
            <div className="smaller">
              <div className="fw-bold">Trạng thái</div>
              <div className="text-primary">Đang hoạt động</div>
            </div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                defaultChecked
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Nội dung chính: Chi tiết hóa đơn */}
      <div className="col-lg-9">
        <Card padding="p-3" className="border-0 shadow-sm mb-3">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className="fw-bold mb-0">Chi tiết hóa đơn</h6>
            <div className="d-flex gap-2">
              <button className="btn btn-outline-secondary btn-sm">
                <Icon name="upload" /> Import từ excel
              </button>
              <button className="btn btn-outline-secondary btn-sm">
                <Icon name="layout-three-columns" />
              </button>
            </div>
          </div>
          <button className="btn btn-primary btn-sm mb-3 d-flex align-items-center gap-2 px-3">
            <Icon name="plus-lg" /> Thêm sản phẩm
          </button>

          <div className="table-responsive">
            <table className="table table-bordered align-middle text-center smaller">
              <thead className="bg-light">
                <tr>
                  <th style={{ width: 40 }}>STT</th>
                  <th className="text-start">Sản phẩm</th>
                  <th>Đơn vị</th>
                  <th>Số lượng</th>
                  <th>Đơn giá</th>
                  <th>Chiết khấu</th>
                  <th>Thuế</th>
                  <th>Thành tiền</th>
                  <th>Loại</th>
                  <th style={{ width: 50 }}>Tác vụ</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, idx) => (
                  <tr key={item.id}>
                    <td>
                      <div className="d-flex align-items-center gap-1">
                        <Icon
                          name="grip-vertical"
                          className="text-muted smaller"
                        />
                        {idx + 1}
                      </div>
                    </td>
                    <td className="text-start">
                      <div className="fw-bold">{item.name}</div>
                      <div className="smaller text-muted">{item.sku}</div>
                    </td>
                    <td>{item.unit}</td>
                    <td>
                      <input
                        type="number"
                        className="form-control form-control-sm text-center mx-auto"
                        style={{ width: 60 }}
                        defaultValue={item.quantity}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm text-end"
                        defaultValue={item.price.toLocaleString()}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm text-end"
                        defaultValue={item.discount}
                      />
                    </td>
                    <td>
                      <select className="form-select form-select-sm">
                        <option>{item.taxRate}</option>
                      </select>
                    </td>
                    <td className="fw-bold">
                      {(item.price * item.quantity).toLocaleString()}
                    </td>
                    <td>
                      <select className="form-select form-select-sm">
                        <option>-Chọn một giá trị-</option>
                        <option>Hàng hóa/ Dịch vụ</option>
                        <option>Khuyến mãi</option>
                        <option>Ghi chú/ Diễn giải</option>
                        <option>Chiết khấu thương mại</option>
                        <option>Hàng hóa đặc thù</option>
                      </select>
                    </td>
                    <td>
                      <button className="btn btn-outline-danger btn-sm border-0">
                        <Icon name="trash" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="btn btn-link btn-sm text-decoration-none fw-bold">
            + Thêm dòng ghi chú
          </button>
        </Card>

        {/* Tổng kết */}
        <div className="row g-3">
          <div className="col-md-6">
            <Card className="border-0 shadow-sm p-3 h-100">
              <div className="d-flex justify-content-between mb-2">
                <span>Tạm tính</span>
                <span className="fw-bold">
                  {totals.subtotal.toLocaleString()} đ
                </span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Chiết khấu</span>
                <span className="fw-bold">
                  {totals.discount.toLocaleString()} đ
                </span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Tiền thuế</span>
                <span className="fw-bold">0 đ</span>
              </div>
            </Card>
          </div>
          <div className="col-md-6">
            <Card className="border-0 shadow-sm p-3 h-100 bg-primary bg-opacity-10">
              <div className="text-primary small fw-bold mb-1 text-uppercase">
                Tổng thanh toán
              </div>
              <div className="h3 fw-bold text-primary mb-1">
                {totals.total.toLocaleString()} đ
              </div>
              <div className="smaller text-muted fst-italic">
                Bằng chữ: Năm mươi tám nghìn đồng chẵn.
              </div>
            </Card>
          </div>
          <div className="col-12 mt-3">
            <label className="smaller fw-bold mb-1">Ghi chú hóa đơn</label>
            <textarea
              className="form-control shadow-sm"
              placeholder="Nhập ghi chú..."
              rows={2}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );

  const renderViewContent = () => (
    <div className="animate-fade-in">
      {/* Info Cards Row */}
      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <Card className="border-0 shadow-sm p-3 d-flex flex-row align-items-center gap-3">
            <div className="p-3 bg-primary bg-opacity-10 rounded-circle text-primary">
              <Icon name="person" size={24} />
            </div>
            <div>
              <div className="smaller text-muted">Người mua</div>
              <div className="fw-bold">Bán hàng cho người tiêu dùng</div>
            </div>
          </Card>
        </div>
        <div className="col-md-6">
          <Card className="border-0 shadow-sm p-3 d-flex flex-row align-items-center gap-3">
            <div className="p-3 bg-success bg-opacity-10 rounded-circle text-success">
              <Icon name="credit-card" size={24} />
            </div>
            <div>
              <div className="smaller text-muted">Phương thức thanh toán</div>
              <div className="fw-bold">TM</div>
            </div>
          </Card>
        </div>
        <div className="col-md-4">
          <Card className="border-0 shadow-sm p-3 d-flex flex-row align-items-center gap-3">
            <div className="p-3 bg-info bg-opacity-10 rounded-circle text-info">
              <Icon name="file-earmark-text" size={24} />
            </div>
            <div>
              <div className="smaller text-muted">Trạng thái</div>
              <div className="fw-bold">HĐ bản thảo</div>
            </div>
          </Card>
        </div>
        <div className="col-md-4">
          <Card className="border-0 shadow-sm p-3 d-flex flex-row align-items-center gap-3">
            <div className="p-3 bg-warning bg-opacity-10 rounded-circle text-warning">
              <Icon name="calendar-event" size={24} />
            </div>
            <div>
              <div className="smaller text-muted">Ngày</div>
              <div className="fw-bold">2026-08-04 15:44:33</div>
            </div>
          </Card>
        </div>
        <div className="col-md-4">
          <Card className="border-0 shadow-sm p-3 d-flex flex-row align-items-center gap-3">
            <div className="p-3 bg-secondary bg-opacity-10 rounded-circle text-secondary">
              <Icon name="file-earmark-check" size={24} />
            </div>
            <div>
              <div className="smaller text-muted">Trạng thái CQT</div>
              <div className="fw-bold">Chưa gửi CQT</div>
            </div>
          </Card>
        </div>
      </div>

      {/* Table Readonly */}
      <Card className="border-0 shadow-sm p-0 mb-4 overflow-hidden">
        <table className="table align-middle mb-0">
          <thead className="bg-light fw-bold text-muted smaller">
            <tr>
              <th>Tên</th>
              <th>Đơn vị</th>
              <th>Số lượng</th>
              <th>Đơn giá</th>
              <th>Chiết khấu</th>
              <th>Thuế</th>
              <th>Tiền thuế</th>
              <th className="text-end">Tổng tiền</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="d-flex align-items-center gap-2">
                <img
                  src="https://via.placeholder.com/30"
                  className="rounded"
                  alt=""
                />{" "}
                Pizza 4 vị phô mai - S
              </td>
              <td>Chiếc</td>
              <td>1</td>
              <td>59.000</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td className="text-end fw-bold text-primary">59.000</td>
            </tr>
            <tr>
              <td className="d-flex align-items-center gap-2">
                <img
                  src="https://via.placeholder.com/30"
                  className="rounded"
                  alt=""
                />{" "}
                Pizza 4 vị phô mai - M
              </td>
              <td>Chiếc</td>
              <td>1</td>
              <td>99.000</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td className="text-end fw-bold text-primary">99.000</td>
            </tr>
            <tr>
              <td className="d-flex align-items-center gap-2">
                <div className="p-2 bg-danger bg-opacity-10 rounded text-danger">
                  <Icon name="tag-fill" />
                </div>{" "}
                Giảm giá
              </td>
              <td>Lần</td>
              <td>1</td>
              <td>100.000</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td className="text-end fw-bold text-primary">100.000</td>
            </tr>
          </tbody>
        </table>
      </Card>

      {/* View Summary */}
      <Card className="border-0 shadow-sm p-4 bg-primary bg-opacity-10">
        <div className="row align-items-center">
          <div className="col-md-3 text-center border-end border-white border-2">
            <div className="bg-white rounded-circle d-inline-flex p-3 text-primary shadow-sm">
              <Icon name="calculator" size={40} />
            </div>
          </div>
          <div className="col-md-9 ps-5">
            <div className="d-flex justify-content-between mb-2">
              <span>Thành tiền</span>
              <span className="fw-bold">158.000</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Chiết khấu</span>
              <span className="fw-bold">100.000</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Tiền trước thuế</span>
              <span className="fw-bold">58.000</span>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <span>Tiền thuế</span>
              <span className="fw-bold">0</span>
            </div>
            <div className="d-flex justify-content-between h4 fw-bold text-primary border-top border-white pt-3 mt-2">
              <span>Tổng thanh toán</span>
              <span>58.000</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  return createPortal(
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-black bg-opacity-50"
      style={{ zIndex: 2000 }}
    >
      <div
        className="app-shell rounded-3 shadow-lg d-flex flex-column"
        style={{ width: "95vw", height: "95vh", backgroundColor: "#f6f8fb" }}
      >
        {/* Modal Header */}
        <div className="p-3 bg-white border-bottom d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-3">
            <button className="btn btn-link p-0 text-dark" onClick={onClose}>
              <Icon name="arrow-left" size={24} />
            </button>
            <h4 className="fw-bold mb-0">Hóa đơn bán hàng</h4>
            <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2">
              {invoice?.id || "HD00025"}
            </span>
          </div>

          {mode === "edit" ? (
            <div className="d-flex gap-2">
              <button
                className="btn btn-outline-secondary px-4"
                onClick={onClose}
              >
                Hủy
              </button>
              <button className="btn btn-primary px-4">Lưu</button>
              <button className="btn btn-brand px-4 d-flex align-items-center gap-2">
                <Icon name="printer" /> Lưu & In
              </button>
              <button className="btn btn-danger px-4 d-flex align-items-center gap-2">
                <Icon name="trash" /> Xóa
              </button>
            </div>
          ) : (
            <div className="d-flex gap-4"></div>
          )}
        </div>

        {/* Modal Body */}
        <div className="flex-grow-1 overflow-auto p-4 app-shell">
          {mode === "edit" ? renderEditContent() : renderViewContent()}
        </div>

        {/* Footer ẩn cho chế độ Edit */}
        {mode === "edit" && (
          <div className="p-2 border-top bg-white d-flex justify-content-end pr-4">
            <button
              className="btn btn-light border px-4 mr-3"
              style={{ backgroundColor: "#eef2f7" }}
              onClick={onClose}
            >
              Cập nhật
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
