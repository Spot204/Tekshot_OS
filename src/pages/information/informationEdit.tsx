import { useState, useMemo } from "react";
import { createPortal } from "react-dom";
import Icon from "../../components/ui/Icon";
import Input from "../../components/ui/Input";
import countryList from "react-select-country-list";
import { provinces } from "./information";

interface InformationEditProps {
  onClose: () => void;
}

type CountryOption = {
  value: string;
  label: string;
};

export default function InformationEdit({ onClose }: InformationEditProps) {
  const countries = useMemo<CountryOption[]>(() => countryList().getData(), []);
  const [selectedCountry, setSelectedCountry] = useState("VN");
  const [cashBooks, setCashBooks] = useState([{ id: 1 }]);
  //const [showConfig, setShowConfig] = useState(true);
  const [showNoidung, setShowNoidung] = useState(true);
  const [showGiotatmo, setShowGiotatmo] = useState(false);
  const [showThanhtoan, setShowThanhtoan] = useState(false);
  const [showMayin, setShowMayin] = useState(false);
  const [showSoban, setShowSoban] = useState(false);
  const timezones = Intl.supportedValuesOf("timeZone");
  const [paymentInfos, setPaymentInfos] = useState([
    { id: Date.now(), user: "", number: "", bank: "" },
  ]);
  const [printerInfos, setPrinterInfos] = useState([
    { id: Date.now(), type: "", name: "" },
  ]);
  const [qrImage, setQrImage] = useState<string | null>(null);
  const [tableInfos, setTableInfos] = useState([
    {
      id: Date.now() + 2,
      area: "",
      no: "",
      status: "active",
      order: "",
      date: "",
      time: "",
    },
  ]);

  // Hàm chuyển mã quốc gia thành Emoji cờ
  const getFlagEmoji = (code: string) =>
    code
      .toUpperCase()
      .replace(/./g, (char) =>
        String.fromCodePoint(127397 + char.charCodeAt(0)),
      );
  const groupedTimezones = timezones.reduce(
    (groups, timezone) => {
      const [region, city] = timezone.split("/");

      if (!groups[region]) {
        groups[region] = [];
      }

      groups[region].push({
        value: timezone,
        label: city?.replace(/_/g, " ") ?? timezone,
      });

      return groups;
    },
    {} as Record<string, { value: string; label: string }[]>,
  );

  // Hàm thêm dòng mới
  const addPaymentInfo = () => {
    setPaymentInfos([
      ...paymentInfos,
      { id: Date.now(), user: "", number: "", bank: "" },
    ]);
  };

  // Hàm xóa một dòng dựa trên ID
  const removePaymentInfo = (id: number) => {
    if (paymentInfos.length > 1) {
      // Giữ lại ít nhất 1 dòng nếu muốn
      setPaymentInfos(paymentInfos.filter((item) => item.id !== id));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setQrImage(URL.createObjectURL(file));
    }
  };
  const addPrinter = () =>
    setPrinterInfos([...printerInfos, { id: Date.now(), type: "", name: "" }]);
  const removePrinter = (id: number) => {
    if (printerInfos.length > 1)
      setPrinterInfos(printerInfos.filter((p) => p.id !== id));
  };

  // Logic cho Bàn ăn
  const addTable = () =>
    setTableInfos([
      ...tableInfos,
      {
        id: Date.now(),
        area: "",
        no: "",
        status: "active",
        order: "",
        date: "",
        time: "",
      },
    ]);
  const removeTable = (id: number) => {
    if (tableInfos.length > 1)
      setTableInfos(tableInfos.filter((t) => t.id !== id));
  };

  return createPortal(
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-black bg-opacity-50"
      style={{ zIndex: 3000 }}
    >
      <div
        className="app-surface rounded-4 shadow-lg d-flex flex-column animate-fade-in"
        style={{ width: "900px", maxWidth: "95vw", height: "90vh" }}
      >
        {/* Modal Header */}
        <div className="p-3 border-bottom d-flex justify-content-between align-items-center  rounded-top-4">
          <h5 className="fw-bold mb-0 color-strong">Sửa cửa hàng</h5>
          <button className="btn  rounded-circle p-1" onClick={onClose}>
            <Icon name="x-lg" size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-grow-1 overflow-auto p-4 app-shell">
          {/* Section 1: Thông tin cơ bản */}
          <div className="mb-5">
            <div className="d-flex align-items-center gap-2 fw-bold text-primary mb-3">
              <Icon name="person-vcard" size={20} /> Thông tin cơ bản
            </div>
            <div className="row g-4">
              <div className="col-lg-6">
                <label className="smaller fw-bold mb-1">Tên cửa hàng *</label>
                <Input defaultValue="Pizza Hip's Chư Sê" />
              </div>
              <div className="col-lg-6">
                <label className="smaller fw-bold mb-1">Mã cửa hàng *</label>
                <Input defaultValue="CS" />
              </div>
              <div className="col-lg-6">
                <label className="smaller fw-bold mb-1">Số điện thoại</label>
                <Input
                  defaultValue="0378.089.079"
                  leftIcon={<Icon name="telephone" size={16} />}
                />
              </div>
              <div className="col-lg-6">
                <label className="smaller fw-bold mb-1">Thư điện tử</label>
                <Input
                  placeholder="Nhập email (không bắt buộc)"
                  leftIcon={<Icon name="envelope" size={16} />}
                />
              </div>
              <div className="col-12">
                <div
                  className="alert border-0 smaller py-2 d-flex align-items-start gap-2 mb-0"
                  style={{
                    backgroundColor:
                      "color-mix(in srgb, var(--chart-brand) 8%, transparent)",
                    color: "var(--chart-brand)",
                  }}
                >
                  <Icon name="info-circle" size={16} className="mt-1" />
                  <span>
                    Các thông báo qua email của cửa hàng được gửi từ địa chỉ
                    này. <br />
                    Nếu bỏ qua, địa chỉ email "trang web" sẽ được sử dụng.
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="row g-5">
            {/* Section 2: Địa chỉ */}
            <div
              className="col-lg-6 border-end"
              style={{ borderColor: "var(--border-subtle)" }}
            >
              <div className="d-flex align-items-center gap-2 fw-bold text-primary mb-3">
                <Icon name="geo-alt" size={20} /> Địa chỉ
              </div>

              <div className="mb-3">
                <label className="smaller fw-bold mb-1">Quốc gia *</label>
                <div className="input-group">
                  <span className="input-group-text border-end-0">
                    {getFlagEmoji(selectedCountry)}
                  </span>
                  <select
                    className="form-select border-start-0 ps-0"
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                  >
                    {countries.map((country) => (
                      <option key={country.value} value={country.value}>
                        {country.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-3">
                <label className="smaller fw-bold mb-1">Street address *</label>
                <Input
                  className="mb-2"
                  defaultValue="226 Le Trong Tan"
                  leftIcon={<Icon name="geo-alt" size={16} />}
                />
                <Input
                  placeholder="Nhập địa chỉ (dòng 2) (không bắt buộc)"
                  leftIcon={<Icon name="building" size={16} />}
                />
              </div>

              <div className="mb-3">
                <label className="smaller fw-bold mb-1">Thành phố *</label>
                <Input
                  defaultValue="Hà Nội"
                  leftIcon={<Icon name="buildings" size={16} />}
                />
              </div>

              <div className="row g-3">
                <div className="col-md-6">
                  <label className="smaller fw-bold mb-1">Province *</label>
                  <select className="form-select">
                    {provinces.map((province) => (
                      <option key={province.value} value={province.value}>
                        {province.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="smaller fw-bold mb-1">Postal code *</label>
                  <Input
                    defaultValue=""
                    leftIcon={<Icon name="buildings" size={16} />}
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Vị trí */}
            <div className="col-lg-6">
              <div className="d-flex align-items-center gap-2 fw-bold text-primary mb-3">
                <Icon name="compass" size={20} /> Vị trí
              </div>
              <div className="mb-3">
                <label className="smaller fw-bold mb-1">Vĩ độ</label>
                <Input
                  placeholder="Nhập vĩ độ (latitude)"
                  leftIcon={<Icon name="geo-alt" size={16} />}
                />
              </div>
              <div className="mb-3">
                <label className="smaller fw-bold mb-1">Kinh độ</label>
                <Input
                  placeholder="Nhập kinh độ (longitude)"
                  leftIcon={<Icon name="geo-alt" size={16} />}
                />
              </div>
            </div>

            <div className="col-lg-12">
              <label className="smaller fw-bold mb-1">Mô tả</label>
              <div className="input-group">
                <span className="input-group-text align-items-start pt-2">
                  <Icon name="file-text" size={16} />
                </span>
                <textarea
                  className="form-control"
                  placeholder="Nhập mô tả (không bắt buộc)"
                  rows={4}
                ></textarea>
              </div>
            </div>
          </div>

          {/* bắt đầu*/}

          {/* Khối Cấu hình chung */}
          <div className="mb-4 border rounded-3">
            <div
              className="p-3 d-flex align-items-center bg-secondary bg-opacity-10 justify-content-between"
              role="button"
              onClick={() => setShowNoidung(!showNoidung)}
            >
              <div className="d-flex align-items-center gap-2">
                <Icon
                  name={showNoidung ? "chevron-down" : "chevron-right"}
                  size={16}
                />
                <h6 className="fw-bold mb-0">Nội dung</h6>
              </div>
            </div>

            {showNoidung && (
              <div className="px-3 pb-3">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="smaller fw-bold mb-1">
                      Loại cửa hàng
                    </label>
                    <select className="form-select">
                      <option value="food">Thực phẩm</option>
                      <option value="fashion">Thời trang</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="smaller fw-bold mb-1">
                      Thuế xuất (%)
                    </label>
                    <input
                      type="number"
                      className="form-control text-end"
                      placeholder="0.00"
                      step="0.01"
                    />
                  </div>

                  <div className="col-md-6">
                    <div className="form-check form-switch mt-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="use-warehouse"
                      />
                      <label
                        className="form-check-label fw-bold smaller"
                        htmlFor="use-warehouse"
                      >
                        Sử dụng kho
                      </label>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="smaller fw-bold mb-1">
                      Tiền tệ mặc định
                    </label>
                    <select className="form-select">
                      <option value="VND">VND</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="smaller fw-bold mb-1">Múi giờ *</label>
                    <div className="input-group">
                      <span className="input-group-text border-end-0">
                        <Icon name="globe" size={16} />
                      </span>
                      <select
                        className="form-select border-start-0 ps-0"
                        defaultValue="Asia/Ho_Chi_Minh"
                      >
                        {Object.entries(groupedTimezones).map(
                          ([region, cities]) => (
                            <optgroup key={region} label={region}>
                              {cities.map((city) => (
                                <option key={city.value} value={city.value}>
                                  {city.label}
                                </option>
                              ))}
                            </optgroup>
                          ),
                        )}
                      </select>
                    </div>
                  </div>
                </div>
                {/* Khối Sổ quỹ */}
                <div className="mb-4 border rounded-3">
                  <h6 className="fw-bold mb-3">Sổ quỹ</h6>
                  <table className="table table-sm smaller border">
                    <thead className="app-table-head">
                      <tr>
                        <th>Loại tiền</th>
                        <th>Số tiền</th>
                        <th style={{ width: 40 }}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {cashBooks.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <input
                              className="form-control form-control-sm"
                              placeholder="Loại..."
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              className="form-control form-control-sm text-end"
                            />
                          </td>
                          <td>
                            <button className="btn btn-link text-danger p-0">
                              <Icon name="trash" size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button
                    className="btn btn-sm btn-brand-outline"
                    onClick={() =>
                      setCashBooks([...cashBooks, { id: Date.now() }])
                    }
                  >
                    + Thêm Sổ quỹ
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Khối Giờ mở cửa */}
          <div className="mb-4 border rounded-3">
            {/* Tiêu đề chính */}
            <div
              className="p-3 d-flex align-items-center bg-secondary bg-opacity-10 justify-content-between rounded mb-3"
              role="button"
              onClick={() => setShowGiotatmo(!showGiotatmo)}
            >
              <div className="d-flex align-items-center gap-2">
                <Icon
                  name={showGiotatmo ? "chevron-down" : "chevron-right"}
                  size={16}
                />
                <h6 className="fw-bold mb-0">Thời gian mở cửa</h6>
              </div>
            </div>

            {showGiotatmo && (
              <div>
                {/* Nút bật/tắt Mở cửa */}
                <div className="d-flex align-items-center gap-2 mb-3 px-2">
                  <div className="form-check form-switch mb-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="openSwitch"
                      defaultChecked
                    />
                  </div>
                  <label className="fw-bold smaller" htmlFor="openSwitch">
                    Mở cửa
                  </label>
                </div>

                {/* Bảng cấu hình giờ mở cửa */}
                <div className="border rounded-3 p-3">
                  <div className="fw-bold mb-3 d-flex align-items-center gap-2">
                    <Icon
                      name={showGiotatmo ? "chevron-down" : "chevron-right"}
                      size={14}
                    />
                    <span>Giờ mở cửa</span>
                  </div>

                  <div className="table-responsive">
                    <table className="table table-borderless align-middle smaller mb-0">
                      <thead>
                        <tr className="border-bottom text-primary">
                          <th className="py-2" style={{ width: "25%" }}>
                            Ngày
                          </th>
                          <th className="py-2" style={{ width: "30%" }}>
                            Từ
                          </th>
                          <th className="py-2" style={{ width: "30%" }}>
                            Đến
                          </th>
                          <th
                            className="py-2 text-end"
                            style={{ width: "15%" }}
                          >
                            Thao tác
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          "Chủ nhật",
                          "Thứ hai",
                          "Thứ ba",
                          "Thứ tư",
                          "Thứ năm",
                          "Thứ sáu",
                          "Thứ bảy",
                        ].map((day) => (
                          <tr key={day} className="border-bottom">
                            <td className="fw-bold py-3">{day}</td>
                            <td className="py-3">
                              <input
                                type="time"
                                className="form-control form-control-sm"
                              />
                            </td>
                            <td className="py-3">
                              <input
                                type="time"
                                className="form-control form-control-sm"
                              />
                            </td>
                            <td className="text-end py-3">
                              <a
                                href="#dondep"
                                className="d-block text-decoration-none text-primary"
                                onClick={(e) => e.preventDefault()}
                              >
                                Dọn dẹp
                              </a>
                              <a
                                href="#saochep"
                                className="d-block text-decoration-none text-primary"
                                onClick={(e) => e.preventDefault()}
                              >
                                Sao chép
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Khối Thanh toán */}
          <div className="mb-4 border rounded-3">
            <div
              className="p-3 d-flex align-items-center bg-secondary bg-opacity-10 justify-content-between rounded cursor-pointer"
              role="button"
              onClick={() => setShowThanhtoan(!showThanhtoan)}
            >
              <div className="d-flex align-items-center gap-2">
                <Icon
                  name={showThanhtoan ? "chevron-down" : "chevron-right"}
                  size={16}
                />
                <h6 className="fw-bold mb-0">Thông tin thanh toán</h6>
              </div>
            </div>

            {showThanhtoan && (
              <div className="mt-3">
                {/* Bảng nhập thông tin tài khoản */}

                <div className="table-responsive mb-3">
                  <table className="table table-sm border smaller align-middle mb-0">
                    <thead>
                      <tr className="text-primary">
                        <th style={{ width: "30%" }}>User</th>
                        <th style={{ width: "30%" }}>Number</th>
                        <th style={{ width: "30%" }}>Bank</th>
                        <th style={{ width: "10%" }}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Dùng .map để biến mảng dữ liệu thành các hàng table */}
                      {paymentInfos.map((payment) => (
                        <tr key={payment.id}>
                          <td>
                            <input
                              className="form-control form-control-sm"
                              placeholder="Nhập tên..."
                              defaultValue={payment.user}
                            />
                          </td>
                          <td>
                            <input
                              className="form-control form-control-sm"
                              placeholder="Nhập số tài khoản..."
                              defaultValue={payment.number}
                            />
                          </td>
                          <td>
                            <input
                              className="form-control form-control-sm"
                              placeholder="Nhập ngân hàng..."
                              defaultValue={payment.bank}
                            />
                          </td>
                          <td className="text-center">
                            {/* Gọi hàm xóa khi bấm nút */}
                            <button
                              className="btn btn-link text-danger p-0"
                              onClick={() => removePaymentInfo(payment.id)}
                            >
                              <Icon name="trash" size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <button
                  className="btn btn-sm btn-brand-outline"
                  onClick={addPaymentInfo}
                >
                  + Thêm thông tin thanh toán
                </button>

                {/* Nút Thêm thông tin thanh toán */}

                {/* Phần QR thanh toán */}
                <div className="col-md-5">
                  <label className="smaller fw-bold d-block mb-1">
                    QR thanh toán
                  </label>

                  {/* Input file ẩn để kích hoạt chọn ảnh */}
                  <input
                    type="file"
                    id="qrFileinput"
                    className="d-none"
                    accept="png, gif, jpg, jpeg, webp"
                    onChange={handleImageChange}
                  />

                  {/* Khung bấm vào để chọn ảnh */}
                  <div
                    className="border rounded-3 p-3 text-center bg-light position-relative"
                    style={{
                      borderStyle: "dashed",
                      cursor: "pointer",
                      minHeight: "100px",
                    }}
                    onClick={() =>
                      document.getElementById("qrFileinput")?.click()
                    }
                  >
                    {qrImage ? (
                      <div className="d-flex flex-column align-items-center">
                        <img
                          src={qrImage}
                          alt="QR Preview"
                          className="img-fluid rounded mb-2"
                          style={{ maxHeight: "120px", objectFit: "contain" }}
                        />
                        <span className="small text-primary fw-bold">
                          Nhấn để đổi ảnh khác
                        </span>
                      </div>
                    ) : (
                      <div className="py-2">
                        <Icon
                          name="cloud-upload"
                          size={24}
                          className="text-secondary mb-1"
                        />
                        <div
                          style={{ fontSize: "11px" }}
                          className="text-muted fw-bold"
                        >
                          Choose File / Tải ảnh QR lên
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="text-muted mt-1" style={{ fontSize: "10px" }}>
                    Chỉ một tập tin. 500 MB limit.
                    <br />
                    Các loại được phép: png, gif, jpg, jpeg, webp.
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Khối Cấu hình máy in */}
          <div className="mb-4 border rounded-3">
            <div
              className="p-3 d-flex align-items-center bg-secondary bg-opacity-10 justify-content-between rounded cursor-pointer"
              role="button"
              onClick={() => setShowMayin(!showMayin)}
            >
              <div className="d-flex align-items-center gap-2">
                <Icon
                  name={showMayin ? "chevron-down" : "chevron-right"}
                  size={16}
                />
                <h6 className="fw-bold mb-0">Cấu hình máy in</h6>
              </div>
            </div>

            {showMayin && (
              <div className="mt-3">
                <div className="d-flex align-items-center gap-2 mb-3 px-2">
                  <div className="form-check form-switch mb-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="openSwitch"
                      defaultChecked
                    />
                  </div>
                  <label className="fw-bold smaller" htmlFor="openSwitch">
                    Tự động in
                  </label>
                </div>

                {/* Bảng nhập thông tin tài khoản */}
                <div className="table-responsive mb-3">
                  <label className="form-label fw-bold">Thông tin máy in</label>
                  <table className="table table-sm border smaller align-middle mb-0">
                    <thead>
                      <tr className="text-primary">
                        <th style={{ width: "30%" }}>Loại</th>
                        <th style={{ width: "30%" }}>Tên máy</th>

                        <th style={{ width: "10%" }}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Dùng .map để biến mảng dữ liệu thành các hàng table */}
                      {printerInfos.map((printer) => (
                        <tr key={printer.id}>
                          <td>
                            <input
                              className="form-control form-control-sm"
                              placeholder="Nhập loại máy..."
                              defaultValue={printer.type}
                            />
                          </td>
                          <td>
                            <input
                              className="form-control form-control-sm"
                              placeholder="Nhập tên máy..."
                              defaultValue={printer.name}
                            />
                          </td>

                          <td className="text-center">
                            {/* Gọi hàm xóa khi bấm nút */}
                            <button
                              className="btn btn-link text-danger p-0"
                              onClick={() => removePrinter(printer.id)}
                            >
                              <Icon name="trash" size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <button
                  className="btn btn-sm btn-brand-outline"
                  onClick={addPrinter}
                >
                  + Thêm thông tin máy in
                </button>
              </div>
            )}
          </div>
          {/* Khối Quản lý bàn */}
          <div className="mb-4 border rounded-3">
            {/* Tiêu đề có thể click để ẩn/hiện */}
            <div
              className="p-3 d-flex align-items-center bg-secondary bg-opacity-10 justify-content-between rounded cursor-pointer mb-3"
              role="button"
              onClick={() => setShowSoban(!showSoban)}
            >
              <div className="d-flex align-items-center gap-2">
                <Icon
                  name={showSoban ? "chevron-down" : "chevron-right"}
                  size={16}
                />
                <h6 className="fw-bold mb-0">Số bàn</h6>
              </div>
            </div>

            {/* Nội dung danh sách bàn hiển thị khi showConfig là true */}
            {showSoban && (
              <div className="px-3 pb-3">
                <div className="app-table-wrap border mb-3">
                  <table className="table table-sm smaller mb-0 align-middle">
                    <thead className="app-table-head">
                      <tr className="text-primary">
                        <th style={{ width: "20%" }}>Khu vực</th>
                        <th style={{ width: "20%" }}>Số bàn</th>
                        <th style={{ width: "20%" }}>Trạng thái</th>
                        <th style={{ width: "20%" }}>Đơn hàng hiện tại</th>
                        <th style={{ width: "15%" }}>Thời gian đặt</th>
                        <th style={{ width: 40 }}></th>
                      </tr>
                    </thead>
                    {/* Trong khối Số bàn */}
                    <tbody>
                      {tableInfos.map((table) => (
                        <tr key={table.id}>
                          <td>
                            <input
                              className="form-control form-control-sm"
                              defaultValue={table.area}
                            />
                          </td>
                          <td>
                            <input
                              className="form-control form-control-sm"
                              defaultValue={table.no}
                            />
                          </td>
                          <td>
                            <select
                              className="form-select form-select-sm"
                              defaultValue={table.status}
                            >
                              <option value="none">- Không -</option>
                              <option value="active">Active</option>
                            </select>
                          </td>
                          <td>
                            <input
                              className="form-control form-control-sm"
                              defaultValue={table.order}
                            />
                          </td>
                          <td>
                            <input
                              type="date"
                              className="form-control form-control-sm mb-1"
                            />
                            <input
                              type="time"
                              className="form-control form-control-sm"
                            />
                          </td>
                          <td className="text-center">
                            <button
                              className="btn btn-link text-danger p-0"
                              onClick={() => removeTable(table.id)}
                            >
                              <Icon name="trash" size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    {/* Nút bấm */}
                    <button
                      className="btn btn-sm btn-brand-outline"
                      onClick={addTable}
                    >
                      + Thêm ds bàn ăn
                    </button>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 border-top d-flex justify-content-end gap-2  rounded-bottom-4">
          <button
            className="btn btn-light border px-4 fw-bold"
            onClick={onClose}
          >
            Hủy bỏ
          </button>
          <button className="btn btn-primary px-4 d-flex align-items-center gap-2 shadow-sm fw-bold">
            <Icon name="floppy" size={16} /> Lưu thay đổi
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
