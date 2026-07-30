import logo from "../../assets/Tekshot_OS.jpg";

export default function Header() {
  return (
    <header
      className="top-0 start-0 end-0 bg-body border-bottom shadow-sm position-fixed"
      style={{
        height: "100px",
        zIndex: 1050,
      }}
    >
      <div className="container-fluid">
        <div className="d-flex align-items-center justify-content-between py-2">
          {/* ================= Logo ================= */}
          <div className="d-flex align-items-center">
            <img
              src={logo}
              alt="Tekshot"
              className="rounded object-fit-cover"
              style={{ width: 160 }}
            />
          </div>

          {/* ================= Tìm kiếm chức năng ================= */}
          <div className="flex-grow-2 mx-4 ">
            <div className="input-group ">
              <span className="input-group-text bg-body border-end-0">
                <i className="bi bi-search"></i>
              </span>

              <input
                type="text"
                className="form-control border-start-0"
                placeholder="Tìm kiếm chức năng..."
              />
            </div>
          </div>

          {/* ================= Chọn cửa hàng + Cài đặt ================= */}
          <div className="d-flex align-items-center gap-3">
            {/* Chọn cửa hàng */}
            <select className="form-select" style={{ width: 220 }}>
              <option>Cửa hàng Hà Nội</option>
              <option>Cửa hàng Hải Phòng</option>
              <option>Cửa hàng Hồ Chí Minh</option>
            </select>
            {/* Cài đặt */}
            <div
              className="btn btn-outline-secondary rounded-circle"
              style={{
                width: 42,
                height: 42,
              }}
            >
              <i className="bi bi-gear"></i>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
