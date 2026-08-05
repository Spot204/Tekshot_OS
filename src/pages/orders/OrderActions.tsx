import React, { useState, useMemo } from "react";
import Icon from "../../components/ui/Icon";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import { createPortal } from "react-dom";

interface Topping {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface OrderItem {
  id: string;
  name: string;
  sku: string;
  price: number;
  quantity: number;
  discount: number;
  discountUnit: "%" | "VND";
  vat: number;
  toppings: Topping[];
  isExpanded: boolean;
}
interface OrderActionsProps {
  onClose: () => void;
  mode: null | "edit" | "create" | "print" | "cancel" | "delete";
}
export default function OrderActions({ onClose, mode }: OrderActionsProps) {
  const [subModal, setSubModal] = useState<
    null | "print" | "cancel" | "delete"
  >(mode === "print" || mode === "cancel" || mode === "delete" ? mode : null);

  const [items, setItems] = useState<OrderItem[]>([
    {
      id: "1",
      name: "Pizza bò băm - L",
      sku: "SP-1467",
      price: 150000,
      quantity: 1,
      discount: 0,
      discountUnit: "VND",
      vat: 0,
      isExpanded: true,
      toppings: [
        { id: "t1", name: "Trân Châu Trắng", price: 5000, quantity: 1 },
      ],
    },
    {
      id: "2",
      name: "Pizza bò băm - M",
      sku: "SP-1466",
      price: 99000,
      quantity: 1,
      discount: 0,
      discountUnit: "VND",
      vat: 0,
      isExpanded: false,
      toppings: [],
    },
  ]);

  const [showAddMenu, setShowAddMenu] = useState(false);
  const [globalDiscount, setGlobalDiscount] = useState(50);

  // --- Logic Xử lý ---

  const handleCloseSubModal = () => {
    if (mode !== "edit") {
      onClose();
    } else {
      setSubModal(null);
    }
  };

  const toggleExpand = (id: string) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, isExpanded: !item.isExpanded } : item,
      ),
    );
  };

  const collapseAll = () => {
    setItems(items.map((item) => ({ ...item, isExpanded: false })));
  };

  const updateItemQty = (id: string, delta: number) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item,
      ),
    );
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  // --- Tính toán tổng tiền ---
  const totals = useMemo(() => {
    const subtotal = items.reduce((acc, item) => {
      const itemBase = item.price * item.quantity;
      const toppingTotal = item.toppings.reduce(
        (tAcc, t) => tAcc + t.price * t.quantity,
        0,
      );
      return acc + itemBase + toppingTotal;
    }, 0);

    const discountAmount = (subtotal * globalDiscount) / 100;
    const finalTotal = subtotal - discountAmount;

    return { subtotal, discountAmount, finalTotal };
  }, [items, globalDiscount]);

  // --- HÀM RENDER POPUP CON (IN, HỦY, XÓA) ---
  const renderSubModal = () => {
    if (!subModal) return null;

    return (
      <div
        className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-black bg-opacity-50"
        style={{ zIndex: 3000 }}
      >
        <div
          className="bg-white rounded shadow-lg overflow-hidden"
          style={{ width: subModal === "print" ? "450px" : "400px" }}
        >
          <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
            <span className="fw-bold">
              {subModal === "print" ? "Print order" : "Xác nhận"}
            </span>
            <button
              className="btn btn-sm btn-light border"
              onClick={handleCloseSubModal}
            >
              <Icon name="x-lg" size={14} />
            </button>
          </div>

          <div className="p-4">
            {subModal === "print" ? (
              /* GIAO DIỆN BIÊN LAI TRONG ẢNH */
              <div className="animate-fade-in">
                <div className="text-end mb-3">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => window.print()}
                  >
                    <Icon name="printer" /> In
                  </button>
                </div>
                <div
                  className="border p-4  mx-auto shadow-sm"
                  style={{
                    maxWidth: "350px",
                    fontFamily: "monospace",
                    fontSize: "13px",
                  }}
                >
                  <div className="text-center mb-3">
                    <div className="smaller">Mã đơn hàng</div>
                    <div className="h4 fw-bold">HIPS-3</div>
                    <div>
                      Chào mừng quý khách đến với <br /> <b>Test OS</b>
                    </div>
                  </div>
                  <hr style={{ borderStyle: "dashed" }} />
                  <div className="mb-3">
                    <div>
                      <b>Khách hàng:</b> Khách vãng lai
                    </div>
                    <div>
                      <b>Ngày tháng:</b> 17:34 08/07/2026
                    </div>
                    <div>
                      <b>Hình thức:</b> Mang về
                    </div>
                    <div>
                      <b>Thanh toán:</b> Tiền mặt
                    </div>
                  </div>
                  <table className="w-100 mb-2">
                    <thead className="border-bottom">
                      <tr>
                        <th className="text-start">Sản phẩm</th>
                        <th>SL</th>
                        <th className="text-end">Tổng</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((i) => (
                        <tr key={i.id}>
                          <td className="py-1">{i.name}</td>
                          <td className="text-center">{i.quantity}</td>
                          <td className="text-end">
                            {(i.price * i.quantity).toLocaleString()}đ
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="border-top pt-2">
                    <div className="d-flex justify-content-between">
                      <span>Tổng</span>
                      <span>{totals.subtotal.toLocaleString()}đ</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span>Giảm giá</span>
                      <span>{totals.discountAmount.toLocaleString()}đ</span>
                    </div>
                    <div className="d-flex justify-content-between fw-bold h6 mt-2 pt-2 border-top">
                      <span>Tổng tiền</span>
                      <span>{totals.finalTotal.toLocaleString()}đ</span>
                    </div>
                  </div>
                  <div className="text-center mt-4 smaller text-muted">
                    Mọi thắc mắc xin vui lòng liên hệ <br /> Cửa hàng. Cảm ơn
                    quý khách!
                  </div>
                </div>
              </div>
            ) : (
              /* GIAO DIỆN HỦY / XÓA */
              <div className="text-center">
                <Icon
                  name={subModal === "delete" ? "trash" : "x-circle"}
                  size={48}
                  className={
                    subModal === "delete"
                      ? "text-danger mb-3"
                      : "text-warning mb-3"
                  }
                />
                <p className="mb-4">
                  Bạn có muốn <b>{subModal === "delete" ? "xóa" : "hủy"}</b> đơn
                  này không?
                </p>
                <div className="d-flex justify-content-center gap-2">
                  <button
                    className="btn btn-light border px-4"
                    onClick={handleCloseSubModal}
                  >
                    Bỏ qua
                  </button>
                  <button
                    className={`btn btn-${subModal === "delete" ? "danger" : "warning"} px-4`}
                    onClick={() => {
                      alert("Thành công");
                      onClose();
                    }}
                  >
                    Đồng ý
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (
    mode === "print" ||
    mode == "create" ||
    mode === "cancel" ||
    mode === "delete"
  ) {
    return createPortal(renderSubModal(), document.body);
  }

  return createPortal(
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-black bg-opacity-50"
      style={{ zIndex: 2000 }}
    >
      <div
        className="app-surface rounded-3 shadow-lg d-flex flex-column"
        style={{ width: "98vw", height: "95vh" }}
      >
        {/* Header */}
        <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
          <h5 className="fw-bold mb-0">Đơn hàng</h5>
          <button className="btn btn-light rounded-circle" onClick={onClose}>
            <Icon name="x-lg" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-grow-1 overflow-auto p-3 app-shell">
          <div className="row g-3 h-100">
            {/* Cột trái: Danh sách món */}
            <div className="col-lg-9">
              <Card padding="p-3" className="h-100 border-0 shadow-sm">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="fw-bold">Danh sách món</div>
                  <div className="d-flex gap-3 align-items-center">
                    <div className="position-relative" style={{ width: 300 }}>
                      <Input
                        placeholder="Tìm món (tên hoặc mã SP)..."
                        onFocus={() => setShowAddMenu(true)}
                        onBlur={() =>
                          setTimeout(() => setShowAddMenu(false), 200)
                        }
                        leftIcon={<Icon name="search" />}
                      />
                      {showAddMenu && (
                        <div
                          className="position-absolute w-100 bg-white shadow rounded-2 mt-1 border"
                          style={{
                            zIndex: 10,
                            maxHeight: 300,
                            overflowY: "auto",
                          }}
                        >
                          {[
                            "Bánh mì chảo",
                            "Pizza 4 vị phô mai - L",
                            "Pizza hải sản",
                          ].map((m) => (
                            <div
                              key={m}
                              className="p-2 hover-bg-light cursor-pointer border-bottom small"
                            >
                              {m}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <button className="btn btn-success d-flex align-items-center gap-2">
                      <Icon name="plus-lg" /> Thêm món
                    </button>
                  </div>
                </div>

                <div className="small text-secondary mb-2 d-flex justify-content-between">
                  <span>Đang hiển thị {items.length} chi tiết</span>
                  <span
                    className="text-primary cursor-pointer"
                    onClick={collapseAll}
                  >
                    Thu gọn tất cả
                  </span>
                </div>

                {/* Table Header */}
                <div className=" p-2 rounded-2 d-flex fw-bold smaller text-secondary mb-2 text-center">
                  <div className="text-start" style={{ flex: 3 }}>
                    Món ăn
                  </div>
                  <div style={{ flex: 1 }}>Đơn giá</div>
                  <div style={{ flex: 1 }}>SL</div>
                  <div style={{ flex: 1.5 }}>Giảm giá</div>
                  <div style={{ flex: 0.5 }}>VAT</div>
                  <div style={{ flex: 1 }}>Toppings</div>
                  <div style={{ flex: 1 }}>Thành tiền</div>
                  <div style={{ flex: 0.5 }}>Thao tác</div>
                </div>

                {/* Items List */}
                {items.map((item) => (
                  <div key={item.id} className="border-bottom mb-3 pb-2">
                    <div className="d-flex align-items-center text-center py-2">
                      <div
                        className="text-start d-flex gap-2 align-items-center"
                        style={{ flex: 3 }}
                      >
                        <img
                          src="https://via.placeholder.com/40"
                          className="rounded border"
                          alt="pizza"
                        />
                        <div>
                          <div className="fw-bold smaller">{item.name}</div>
                          <div className="smaller text-muted  px-1 rounded d-inline-block">
                            Mã SP: {item.sku}
                          </div>
                        </div>
                      </div>
                      <div className="fw-bold" style={{ flex: 1 }}>
                        {item.price.toLocaleString()}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div
                          className="input-group input-group-sm mx-auto"
                          style={{ width: 80 }}
                        >
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => updateItemQty(item.id, -1)}
                          >
                            -
                          </button>
                          <input
                            className="form-control text-center p-0"
                            value={item.quantity}
                            readOnly
                          />
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => updateItemQty(item.id, 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div style={{ flex: 1.5 }} className="px-1">
                        <div className="input-group input-group-sm">
                          <input className="form-control" defaultValue={0} />
                          <button className="btn btn-outline-secondary dropdown-toggle px-1">
                            {item.discountUnit}
                          </button>
                        </div>
                      </div>
                      <div style={{ flex: 0.5 }}>
                        <span className="badge text-dark border">0%</span>
                      </div>
                      <div style={{ flex: 1 }} className="smaller">
                        {item.toppings.length} topping
                      </div>
                      <div className="fw-bold text-dark" style={{ flex: 1 }}>
                        {(item.price * item.quantity).toLocaleString()} VND
                      </div>
                      <div
                        className="d-flex gap-2 justify-content-center"
                        style={{ flex: 0.5 }}
                      >
                        <Icon
                          name="trash"
                          className="text-danger cursor-pointer"
                          onClick={() => removeItem(item.id)}
                        />
                        <Icon
                          name={item.isExpanded ? "chevron-up" : "chevron-down"}
                          className="text-secondary cursor-pointer"
                          onClick={() => toggleExpand(item.id)}
                        />
                      </div>
                    </div>

                    {/* Topping Section */}
                    {item.isExpanded && (
                      <div className="ms-5 p-3 rounded-3 mt-2 border">
                        <div className="fw-bold smaller mb-2">
                          Toppings ({item.toppings.length})
                        </div>
                        <div className="d-flex smaller text-secondary fw-bold mb-2 text-center">
                          <div className="text-start" style={{ flex: 4 }}>
                            Tên topping
                          </div>
                          <div style={{ flex: 1 }}>Giá</div>
                          <div style={{ flex: 1 }}>SL</div>
                          <div style={{ flex: 1 }}>Thành tiền</div>
                          <div style={{ flex: 0.5 }}>Thao tác</div>
                        </div>
                        {item.toppings.map((t) => (
                          <div
                            key={t.id}
                            className="d-flex align-items-center text-center py-1"
                          >
                            <div style={{ flex: 4 }} className="text-start">
                              <select className="form-select form-select-sm">
                                <option>{t.name}</option>
                              </select>
                            </div>
                            <div style={{ flex: 1 }} className="fw-bold">
                              {t.price.toLocaleString()}
                            </div>
                            <div style={{ flex: 1 }}>
                              <div
                                className="input-group input-group-sm mx-auto"
                                style={{ width: 70 }}
                              >
                                <button className="btn btn-outline-secondary">
                                  -
                                </button>
                                <input
                                  className="form-control text-center p-0"
                                  value={t.quantity}
                                  readOnly
                                />
                                <button className="btn btn-outline-secondary">
                                  +
                                </button>
                              </div>
                            </div>
                            <div style={{ flex: 1 }} className="fw-bold">
                              {(t.price * t.quantity).toLocaleString()} VND
                            </div>
                            <div style={{ flex: 0.5 }}>
                              <Icon
                                name="trash"
                                className="text-danger cursor-pointer"
                              />
                            </div>
                          </div>
                        ))}
                        <button className="btn btn-outline-success btn-sm mt-2 fw-bold">
                          + Thêm topping
                        </button>
                      </div>
                    )}
                  </div>
                ))}

                <div className="mt-auto pt-3 border-top d-flex justify-content-between align-items-center smaller text-secondary">
                  <span>
                    Hiển thị {items.length}/{items.length} món ăn. Sử dụng tìm
                    kiếm để lọc nhanh hơn.
                  </span>
                  <span className="fw-bold text-dark">
                    Tổng số món: {items.length}
                  </span>
                </div>
              </Card>
            </div>

            {/* Cột phải: Sidebar Tổng kết & Thông tin */}
            <div className="col-lg-3 d-flex flex-column gap-3">
              {/* Card Tổng kết */}
              <Card padding="p-3" className="border-0 shadow-sm">
                <div className="fw-bold mb-3 d-flex align-items-center gap-2">
                  <Icon name="list-check" /> Tổng kết đơn hàng
                </div>
                <div className="d-flex justify-content-between smaller mb-2">
                  <span>Tạm tính</span>
                  <span className="fw-bold">
                    {totals.subtotal.toLocaleString()} VND
                  </span>
                </div>
                <div className="d-flex justify-content-between align-items-center smaller mb-3">
                  <span>Giảm giá đơn hàng</span>
                  <div className="d-flex gap-1" style={{ width: 120 }}>
                    <input
                      className="form-control form-control-sm text-end"
                      value={globalDiscount}
                      onChange={(e) =>
                        setGlobalDiscount(Number(e.target.value))
                      }
                    />
                    <select className="form-select form-select-sm">
                      <option>%</option>
                    </select>
                  </div>
                </div>
                <hr />
                <div className="d-flex justify-content-between smaller mb-1">
                  <span>Tổng phụ</span>
                  <span>{totals.subtotal.toLocaleString()} VND</span>
                </div>
                <div className="d-flex justify-content-between smaller mb-1 text-danger">
                  <span>Tổng giảm giá</span>
                  <span>-{totals.discountAmount.toLocaleString()} VND</span>
                </div>
                <div className="d-flex justify-content-between smaller mb-3">
                  <span>Tổng VAT</span>
                  <span>0 VND</span>
                </div>
                <div className="d-flex justify-content-between fw-bold text-success border-top pt-3 h5">
                  <span>Tổng thanh toán</span>
                  <span>{totals.finalTotal.toLocaleString()} VND</span>
                </div>
              </Card>

              {/* Card Khách hàng */}
              <Card padding="p-3" className="border-0 shadow-sm">
                <div className="fw-bold mb-3 d-flex align-items-center gap-2">
                  <Icon name="person" /> Thông tin khách hàng
                </div>
                <div className="input-group input-group-sm">
                  <input
                    className="form-control"
                    placeholder="Tìm khách hàng"
                  />
                  <button className="btn btn-outline-orange text-orange border-orange">
                    +
                  </button>
                  <button className="btn btn-outline-secondary">Sửa</button>
                </div>
              </Card>

              {/* Card Thông tin đơn */}
              <Card padding="p-3" className="border-0 shadow-sm flex-grow-1">
                <div className="fw-bold mb-3 d-flex align-items-center gap-2">
                  <Icon name="file-earmark-text" /> Thông tin đơn
                </div>
                <div className="smaller text-secondary mb-1">Thời gian tạo</div>
                <div className="input-group input-group-sm mb-3">
                  <input
                    className="form-control"
                    defaultValue="06/07/2026 05:34 PM"
                  />
                  <span className="input-group-text">
                    <Icon name="calendar-event" />
                  </span>
                </div>
                <div className="row g-2 mb-3">
                  <div className="col-6">
                    <label className="smaller text-secondary">Thanh toán</label>
                    <select className="form-select form-select-sm">
                      <option>Tiền mặt</option>
                    </select>
                  </div>
                  <div className="col-6">
                    <label className="smaller text-secondary">
                      Hình thức phục vụ
                    </label>
                    <select className="form-select form-select-sm">
                      <option>Mang đi</option>
                    </select>
                  </div>
                </div>
                <label className="smaller text-secondary">Ghi chú</label>
                <textarea
                  className="form-control form-control-sm"
                  rows={3}
                  placeholder="Nhập ghi chú (nếu có)..."
                ></textarea>
                <div className="text-end smaller text-muted">0/500</div>
              </Card>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-2 border-top d-flex justify-content-end">
          <button className="btn btn-primary px-4 fw-bold">Cập nhật</button>
        </div>
      </div>
      {renderSubModal()}
    </div>,

    document.body,
  );
}
