import { Routes, Route, Navigate } from "react-router-dom";
import InvoiceIn from "../pages/InvoiceInPage";
import InvoiceOut from "../pages/InvoiceOutPage";
import OrdersPage from "../pages/OrdersPage"
import CashBook from "../pages/CashBook"
import Products from "../pages/invoices/Products"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/order" />} />

      <Route path="/invoice-in" element={<InvoiceIn />} />
      <Route path="/invoice-out" element={<InvoiceOut />} />
      <Route path="/order" element={<OrdersPage />} />
      <Route path="/cashbook" element={<CashBook/>}/>
      <Route path="/products" element={<Products />} />

      <Route
        path="/:tabId"
        element={
          <div className="d-flex justify-content-center align-items-center  h-100">
            <div className="text-center">
              <h3 className="text-muted">Tính năng đang phát triển</h3>
              <p>Vui lòng quay lại sau!</p>
            </div>
          </div>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
