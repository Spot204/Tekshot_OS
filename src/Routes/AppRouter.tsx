import { Routes, Route, Navigate } from "react-router-dom";
import InvoiceIn from "../pages/InvoiceInPage";
import InvoiceOut from "../pages/InvoiceOutPage";
import OrdersPage from "../pages/OrdersPage"
import Products from "../pages/invoices/Products"
import Materials from "../pages/invoices/Materials"
import Combos from "../pages/invoices/Combos"

import Stocks from "../pages/warehouse/Stocks"
import StockHistory from "../pages/warehouse/StockHistory"
import Tools from "../pages/warehouse/Tools"
import Ingredients from "../pages/warehouse/Ingredients"
import Imports from "../pages/warehouse/Imports"


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/order" />} />
      <Route path="/invoices" element={<Navigate to="/invoices/products" />} />

      <Route path="/invoice-in" element={<InvoiceIn />} />
      <Route path="/invoice-out" element={<InvoiceOut />} />
      <Route path="/order" element={<OrdersPage />} />
      <Route path="/invoices/products" element={<Products />} />
      <Route path="/invoices/materials" element={<Materials />} />
      <Route path="/invoices/combos" element={<Combos />} />

      <Route path="/warehouse/stocks" element={<Stocks />} />
      <Route path="/warehouse/stock-history" element={<StockHistory />} />
      <Route path="/warehouse/tools" element={<Tools />} />
      <Route path="/warehouse/ingredients" element={<Ingredients />} />
      <Route path="/warehouse/imports" element={<Imports />} />

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
