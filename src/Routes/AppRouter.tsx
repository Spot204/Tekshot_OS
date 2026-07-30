import { Routes, Route, Navigate } from "react-router-dom";
import OrdersPage from "../pages/orders/OrdersPage";
import InvoiceInPage from "../pages/invoices/InvoiceInPage";
import InvoiceOutPage from "../pages/invoices/InvoiceOutPage";
import ReportPage from "../pages/report/ReportPage";
import CustomersPage from "../pages/customers/CustomersPage";
import EmployeesPage from "../pages/employees/EmployeesPage";
import AttendancePage from "../pages/attendance/AttendancePage";
import CashBookPage from "../pages/cashbook/CashBookPage";
import VoucherListPage from "../pages/vouchers/VoucherListPage";
import ShiftClosingPage from "../pages/shifts/ShiftClosingPage";
import ProductsPage from "../pages/products/ProductsPage";
import InventoryPage from "../pages/warehouse/InventoryPage";
import HistoryPage from "../pages/warehouse/HistoryPage";
import InboundPage from "../pages/warehouse/InboundPage";
import SuppliesPage from "../pages/stock/SuppliesPage";
import MaterialsPage from "../pages/stock/MaterialsPage";
import ToolsPage from "../pages/stock/ToolsPage";
import OrderingPage from "../pages/stock/OrderingPage";
import CombosPage from "../pages/combos/CombosPage";
import ComingSoonPage from "../pages/ComingSoonPage";

/** Mỗi path phải khớp một `id` trong menuItems.tsx, không thì rơi vào catch-all */
const AppRoutes = () => {
  return (
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
  );
};

export default AppRoutes;
