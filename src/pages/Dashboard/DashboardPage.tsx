import React, { useState } from "react";
import Icon from "../../components/ui/Icon";
import Input from "../../components/ui/Input";
import Table from "../../components/ui/Table";
import Card from "../../components/ui/Card";
import RevenueGoal from "../report/RevenueGoal";
import PeriodComparison from "../report/PeriodComparison";

// Import các dữ liệu mẫu và cấu hình cột
import {
  summaryMetrics,
  pagesData,
  performanceStats,
} from "../../mocks/dashboard";
import { dashboardColumns } from "./DashboardColumns";

// Import 3 Component báo cáo mới của bạn
import TopProducts from "../report/TopProducts";
import RecentActivity from "../report/RecentActivity";
import ChannelRevenue from "../report/ChannelRevenue";

export default function DashboardPage() {
  const [period, setPeriod] = useState("Theo ngày");

  return (
    <div className="app-shell min-vh-100 p-4">
      {/* 1. Header Bar - Dark mode ready */}
      <header className="d-flex justify-content-between align-items-center mb-4">
        <div className="app-header-search w-100" style={{ maxWidth: 450 }}>
          <Input
            placeholder="Tìm kiếm nhanh..."
            leftIcon={<Icon name="search" size={18} />}
          />
        </div>

        <div className="d-flex gap-2">
          <div className="d-flex align-items-center gap-2 btn btn-brand-outline">
            <Icon name="calendar_today" size={18} />
            <input
              type="date"
              className="border-0 bg-transparent"
              style={{ outline: "none" }}
            />
            <span>-</span>
            <input
              type="date"
              className="border-0 bg-transparent"
              style={{ outline: "none" }}
            />
          </div>
          <button className="btn btn-brand d-flex align-items-center gap-2">
            <Icon name="download" size={18} /> Xuất dữ liệu
          </button>
        </div>
      </header>

      {/* 2. Tiêu đề trang & Xuất báo cáo */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center gap-3">
          <div>
            <h4
              className="fw-bold mb-0"
              style={{ color: "var(--text-strong)" }}
            >
              LPC Post
            </h4>
            <div className="text-secondary small">
              Dữ liệu phân tích đa kênh thời gian thực
            </div>
          </div>
        </div>
      </div>

      {/* 3. Row 1: Các chỉ số tổng hợp (Summary Metrics) */}
      <div className="row g-3 mb-4">
        {summaryMetrics.map((m, i) => (
          <div key={i} className="col-lg-3 col-md-6">
            <Card
              padding="p-3"
              className="app-surface border-0 app-shadow h-100"
            >
              <div className="text-secondary smaller mb-1 d-flex align-items-center gap-1">
                {m.label} <Icon name="info_outline" size={14} />
              </div>
              <div className="d-flex align-items-baseline gap-2 mb-2">
                <h4
                  className="fw-bold mb-0"
                  style={{ color: "var(--text-strong)" }}
                >
                  {m.value}
                </h4>
                <span
                  className={`smaller fw-bold ${m.trend > 0 ? "text-success" : "text-danger"}`}
                >
                  {m.trend > 0 ? "▲" : "▼"} {Math.abs(m.trend)}%
                </span>
              </div>
              <div
                style={{
                  height: 35,
                  borderBottom: "2px solid var(--chart-brand)",
                  background:
                    "linear-gradient(transparent, var(--surface-subtle))",
                }}
              ></div>
            </Card>
          </div>
        ))}
      </div>

      {/* 4. Row 2: Biểu đồ & Table */}
      <div className="row g-4 mb-4">
        <div className="col-lg-8">
          <Card className="app-surface border-0 app-shadow p-0 overflow-hidden h-100">
            <div
              className="p-3 fw-bold border-bottom color-strong"
              style={{ borderColor: "var(--border-subtle)" }}
            >
              Phân tích chi tiết theo trang
            </div>
            <div className="app-table-wrap">
              <Table columns={dashboardColumns} data={pagesData} rowKey="id" />
            </div>
          </Card>
        </div>

        {/* Doanh thu theo kênh (Imported Component) */}

        <div className="col-lg-4">
          <RevenueGoal />
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center gap-3">
          <div>
            <h4
              className="fw-bold mb-0"
              style={{ color: "var(--text-strong)" }}
            >
              Tekshot OS
            </h4>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-lg-8">
          <PeriodComparison />
        </div>
        <div className="col-lg-4">
          <ChannelRevenue />
        </div>
      </div>

      {/* 5. Row 3: Top Sản phẩm & Hoạt động gần đây */}
      <div className="row g-4">
        {/* Top Sản phẩm (Imported Component) */}
        <div className="col-lg-4">
          <TopProducts />
        </div>

        {/* Tổng quan hiệu suất (Sidebar cũ chuyển thành dạng card) */}
        <div className="col-lg-4">
          <Card className="app-surface border-0 app-shadow h-100">
            <h6 className="fw-bold mb-4 color-strong">Hiệu suất vận hành</h6>
            <div className="row g-3">
              {performanceStats.map((ps, i) => (
                <div key={i} className="col-12">
                  <div
                    className="d-flex align-items-center gap-3 p-2 rounded"
                    style={{ backgroundColor: "var(--surface-subtle)" }}
                  >
                    <div
                      className="report-icon"
                      style={
                        {
                          width: 36,
                          height: 36,
                          "--report-icon-color": `var(--chart-${ps.color})`,
                        } as any
                      }
                    >
                      <Icon name={ps.icon} size={18} />
                    </div>
                    <div className="flex-grow-1">
                      <div className="text-secondary" style={{ fontSize: 10 }}>
                        {ps.label}
                      </div>
                      <div
                        className="fw-bold color-strong"
                        style={{ fontSize: "13px" }}
                      >
                        {ps.value}
                      </div>
                    </div>
                    <div className="text-success smaller fw-bold">
                      ↑ {ps.trend}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Alert banner nhỏ bên trong */}
            <div
              className="alert mt-4 mb-0 border-0 smaller py-2"
              style={{
                backgroundColor:
                  "color-mix(in srgb, var(--brand) 8%, transparent)",
                color: "var(--brand)",
              }}
            >
              <Icon name="info" size={14} className="me-1" /> Hệ thống đang hoạt
              động ổn định.
            </div>
          </Card>
        </div>

        {/* Hoạt động gần đây (Imported Component) */}
        <div className="col-lg-4">
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}
