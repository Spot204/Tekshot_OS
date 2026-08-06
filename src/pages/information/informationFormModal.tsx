import React from "react";
import { createPortal } from "react-dom";
import Icon from "../../components/ui/Icon";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

interface Props {
  onClose: () => void;
}

export default function InformationFormModal({ onClose }: Props) {
  return createPortal(
    <div
      className="position-fixed inset-0 d-flex align-items-center justify-content-center bg-black bg-opacity-50"
      style={{ zIndex: 2000 }}
    >
      <div
        className="app-surface rounded-4 shadow-lg d-flex flex-column"
        style={{ width: "500px", maxWidth: "90vw" }}
      >
        <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
          <h5 className="fw-bold mb-0 color-strong">Chỉnh sửa thông tin</h5>
          <button className="btn btn-light rounded-circle" onClick={onClose}>
            <Icon name="x-lg" />
          </button>
        </div>

        <div className="p-4 flex-grow-1">
          <div className="mb-3">
            <label className="smaller fw-bold mb-1">Tên cửa hàng</label>
            <Input defaultValue="Tekshot" />
          </div>
          <div className="mb-3">
            <label className="smaller fw-bold mb-1">Số điện thoại</label>
            <Input defaultValue="0393265959" />
          </div>
          <div className="row g-3">
            <div className="col-6">
              <label className="smaller fw-bold mb-1">VAT (%)</label>
              <Input defaultValue="10" type="number" />
            </div>
            <div className="col-6">
              <label className="smaller fw-bold mb-1">Kho hàng</label>
              <select className="form-select">
                <option>Sử dụng</option>
                <option>Không sử dụng</option>
              </select>
            </div>
          </div>
        </div>

        <div className="p-3 border-top d-flex justify-content-end gap-2">
          <Button customVariant="secondary" onClick={onClose}>
            Hủy
          </Button>
          <Button customVariant="primary" onClick={onClose}>
            Lưu thay đổi
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
