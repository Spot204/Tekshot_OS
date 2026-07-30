import { Menu } from "lucide-react";
import logo from "../../assets/logo.png";
import Input from "../ui/Input";
import ComboBox from "../ui/ComboBox";

interface HeaderProps {
  /** Mở/đóng sidebar — nút chỉ hiện ở mobile, nơi sidebar là off-canvas */
  onToggleSidebar: () => void;
}

const STORE_OPTIONS = [
  { value: "ha-noi", label: "Cửa hàng Hà Nội" },
  { value: "hai-phong", label: "Cửa hàng Hải Phòng" },
  { value: "ho-chi-minh", label: "Cửa hàng Hồ Chí Minh" },
];

export default function Header({ onToggleSidebar }: HeaderProps) {
  return (
    <header className="app-header bg-body border-bottom shadow-sm position-fixed top-0 start-0 end-0">
      <div className="container-fluid h-100">
        <div className="d-flex align-items-center h-100 gap-3">
          {/* ================= Toggle sidebar (mobile) ================= */}
          <button
            type="button"
            className="btn btn-light border d-lg-none flex-shrink-0"
            aria-label="Mở menu"
            onClick={onToggleSidebar}
          >
            <Menu size={18} />
          </button>

          {/* ================= Logo ================= */}
          <img
            src={logo}
            alt="Tekshot"
            className="rounded object-fit-contain flex-shrink-0"
            style={{ width: 160 }}
          />

          {/* ================= Tìm kiếm chức năng ================= */}
          <div className="flex-grow-1 d-none d-md-block" style={{ maxWidth: 500 }}>
            <Input
              leftIcon={<i className="bi bi-search" />}
              placeholder="Tìm kiếm chức năng..."
              aria-label="Tìm kiếm chức năng"
            />
          </div>

          {/* ================= Chọn cửa hàng + Cài đặt ================= */}
          <div className="d-flex align-items-center gap-2 ms-auto flex-shrink-0">
            <div className="d-none d-sm-block" style={{ width: 200 }}>
              <ComboBox
                options={STORE_OPTIONS}
                defaultValue="ha-noi"
                aria-label="Chọn cửa hàng"
              />
            </div>

            <button
              type="button"
              className="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center p-0"
              style={{ width: 42, height: 42 }}
              aria-label="Cấu hình"
            >
              <i className="bi bi-gear" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
