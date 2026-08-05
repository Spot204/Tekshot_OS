import React, { useState } from "react";
import Icon from "../../components/ui/Icon";
import Card from "../../components/ui/Card";
import Table from "../../components/ui/Table";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import { storeInfo, openingHours, storeTables } from "./information";
import { informationColumns } from "./informationColumns";
import InformationFormModal from "./informationFormModal";
import InformationEdit from "./informationEdit";

export default function InformationPage() {
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <>
      <div className="p-4 app-shell min-vh-100">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center gap-2">
            <div
              className="report-icon"
              style={{ "--report-icon-color": "var(--accent)" } as any}
            >
              <Icon name="shop" size={24} />
            </div>
            <h4 className="fw-bold mb-0 color-strong">Thông tin cửa hàng</h4>
          </div>
          <Button
            customVariant="secondary"
            size="sm"
            onClick={() => setIsEditOpen(true)}
            className="d-flex align-items-center gap-2 rounded-3"
          >
            <Icon name="pencil" size={16} /> Sửa
          </Button>
        </div>

        <div className="row g-4">
          {/* Left Column */}
          <div className="col-lg-8">
            <Card className="app-surface border-0 app-shadow p-4 mb-4">
              <h2 className="fw-bold color-strong mb-2">{storeInfo.name}</h2>
              <div className="d-flex gap-2 mb-4">
                <Badge variant="secondary">Mã: {storeInfo.code}</Badge>
                <Badge
                  variant="primary"
                  style={{
                    backgroundColor:
                      "color-mix(in srgb, var(--chart-brand) 20%, transparent)",
                    color: "var(--chart-brand)",
                    border: "none",
                  }}
                >
                  {storeInfo.category}
                </Badge>
              </div>

              {/* Phone Box */}
              <div
                className="app-surface rounded-3 p-3 border mb-4 d-flex align-items-center gap-3"
                style={{ backgroundColor: "var(--surface-subtle)" }}
              >
                <div
                  className="report-icon  shadow-sm"
                  style={{ width: 40, height: 40 }}
                >
                  <Icon name="telephone" size={18} />
                </div>
                <div>
                  <div className="smaller text-secondary">Điện thoại</div>
                  <div className="fw-bold color-strong">{storeInfo.phone}</div>
                </div>
              </div>

              {/* Configuration Section */}
              <div className="mb-4">
                <div className="d-flex align-items-center gap-2 fw-bold color-strong mb-3">
                  <Icon name="gear" size={18} className="text-primary" /> Cấu
                  hình cửa hàng
                </div>
                <div className="d-flex gap-3 flex-wrap">
                  <div className="border rounded-3 px-3 py-2  small shadow-sm">
                    <span className="text-secondary">Vat:</span>{" "}
                    <span className="fw-bold color-strong">
                      {storeInfo.vat}
                    </span>
                  </div>
                  <div className="border rounded-3 px-3 py-2  small shadow-sm">
                    <span className="text-secondary">Kho hàng:</span>{" "}
                    <span className="fw-bold color-strong">
                      {storeInfo.warehouse}
                    </span>
                  </div>
                  <div className="border rounded-3 px-3 py-2  small shadow-sm">
                    <span className="text-secondary">Auto print:</span>{" "}
                    <span className="fw-bold color-strong">
                      {storeInfo.autoPrint}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tables List */}
              <div className="app-table-wrap border rounded-3 overflow-hidden">
                <Table
                  columns={informationColumns}
                  data={storeTables}
                  rowKey="id"
                />
              </div>
            </Card>
          </div>

          {/* Right Column: Opening Hours */}
          <div className="col-lg-4">
            <Card className="app-surface border-0 app-shadow p-4 h-100">
              <div className="d-flex align-items-center gap-2 fw-bold color-strong mb-4">
                <Icon name="clock" size={20} className="text-primary" /> Giờ mở
                cửa
              </div>
              <ul className="list-unstyled d-flex flex-column gap-4 mb-0">
                {openingHours.map((item, idx) => (
                  <li
                    key={idx}
                    className="d-flex justify-content-between align-items-center border-bottom pb-2"
                    style={{ borderColor: "var(--border-subtle)" }}
                  >
                    <span className="fw-bold color-strong small">
                      {item.day}
                    </span>
                    <span className="text-secondary small">
                      {item.timeRange}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>

        {/* Modal chỉnh sửa */}
        {isEditOpen && (
          <InformationFormModal onClose={() => setIsEditOpen(false)} />
        )}
      </div>
      {isEditOpen && <InformationEdit onClose={() => setIsEditOpen(false)} />}
    </>
  );
}
