import { useState } from "react";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import InvoiceIn from "./pages/InvoiceInPage";
import InvoiceOut from "./pages/InvoiceOutPage";

function App() {
  const [activeTab, setActiveTab] = useState("don-hang");

  const renderContent = () => {
    switch (activeTab) {
      case "invoice-in":
        return <InvoiceIn />;
      case "invoice-out":
        return <InvoiceOut />;

      default:
        return (
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="text-center">
              <h3 className="text-muted">Trang {activeTab}</h3>
              <p className="text-secondary">
                Nội dung này đang được phát triển.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="d-flex flex-column vh-100">
      <Header />

      <div className="d-flex flex-grow-1 overflow-hidden">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main
          className="flex-grow-1 bg-light overflow-auto"
          style={{ marginLeft: "260px" }}
        >
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;
