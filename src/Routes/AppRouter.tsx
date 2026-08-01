import { lazy, Suspense } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import ErrorBoundary from "../components/ErrorBoundary";

const OrdersPage = lazy(() => import("../pages/orders/OrdersPage"));
const InvoiceInPage = lazy(() => import("../pages/invoices/InvoiceInPage"));
const InvoiceOutPage = lazy(() => import("../pages/invoices/InvoiceOutPage"));
const ReportPage = lazy(() => import("../pages/report/ReportPage"));
const CustomersPage = lazy(() => import("../pages/customers/CustomersPage"));
const EmployeesPage = lazy(() => import("../pages/employees/EmployeesPage"));
const AttendancePage = lazy(() => import("../pages/attendance/AttendancePage"));
const CashBookPage = lazy(() => import("../pages/cashbook/CashBookPage"));
const VoucherListPage = lazy(() => import("../pages/vouchers/VoucherListPage"));
const ShiftClosingPage = lazy(() => import("../pages/shifts/ShiftClosingPage"));
const ProductsPage = lazy(() => import("../pages/products/ProductsPage"));
const InventoryPage = lazy(() => import("../pages/warehouse/InventoryPage"));
const HistoryPage = lazy(() => import("../pages/warehouse/HistoryPage"));
const InboundPage = lazy(() => import("../pages/warehouse/InboundPage"));
const SuppliesPage = lazy(() => import("../pages/stock/SuppliesPage"));
const MaterialsPage = lazy(() => import("../pages/stock/MaterialsPage"));
const ToolsPage = lazy(() => import("../pages/stock/ToolsPage"));
const OrderingPage = lazy(() => import("../pages/stock/OrderingPage"));
const CombosPage = lazy(() => import("../pages/combos/CombosPage"));
const ComingSoonPage = lazy(() => import("../pages/ComingSoonPage"));

const PageFallback = () => (
  <div className="d-flex justify-content-center py-5">
    <Spinner animation="border" variant="primary" as="output">
      <span className="visually-hidden">Đang tải…</span>
    </Spinner>
  </div>
);

/** Mỗi path phải khớp một `id` trong menuItems.tsx, không thì rơi vào catch-all */
const AppRoutes = () => {
  const { pathname } = useLocation();

  return (
    // key theo pathname: đổi trang là boundary tự reset, không cần nút thử lại
    <ErrorBoundary key={pathname}>
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/" element={<Navigate to="/order" replace />} />

          <Route path="/order" element={<OrdersPage />} />
          <Route path="/invoice-in" element={<InvoiceInPage />} />
          <Route path="/invoice-out" element={<InvoiceOutPage />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/customer" element={<CustomersPage />} />
          <Route path="/employee" element={<EmployeesPage />} />
          <Route path="/attendance" element={<AttendancePage />} />
          <Route path="/wallet" element={<CashBookPage />} />
          <Route path="/cash-receipt" element={<VoucherListPage />} />
          <Route path="/shift-closing" element={<ShiftClosingPage />} />
          <Route path="/san-pham" element={<ProductsPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/inbound" element={<InboundPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/vat-tu" element={<SuppliesPage />} />
          <Route path="/combo" element={<CombosPage />} />
          <Route path="/nguyen-lieu" element={<MaterialsPage />} />
          <Route path="/dung-cu" element={<ToolsPage />} />
          <Route path="/ordering" element={<OrderingPage />} />

          <Route path="*" element={<ComingSoonPage />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};

export default AppRoutes;
