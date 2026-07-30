import { Routes, Route, Navigate } from "react-router-dom";
import OrdersPage from "../pages/orders/OrdersPage";
import InvoiceInPage from "../pages/invoices/InvoiceInPage";
import InvoiceOutPage from "../pages/invoices/InvoiceOutPage";
import ComingSoonPage from "../pages/ComingSoonPage";

/** Mỗi path phải khớp một `id` trong menuItems.tsx, không thì rơi vào catch-all */
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/order" replace />} />

      <Route path="/order" element={<OrdersPage />} />
      <Route path="/invoice-in" element={<InvoiceInPage />} />
      <Route path="/invoice-out" element={<InvoiceOutPage />} />

      <Route path="*" element={<ComingSoonPage />} />
    </Routes>
  );
};

export default AppRoutes;
