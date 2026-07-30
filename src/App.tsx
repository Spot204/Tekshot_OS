import { useState } from 'react'
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import OrdersPage from "./pages/OrdersPage"

function App() {

  const [activeTab, setActiveTab] = useState("don-hang");

  return (
    <div className="vh-100 overflow-hidden">
      <Header />

      <div
        className="d-flex"
        style={{
          height: "calc(100vh - 100px)",
          marginTop: "100px",
        }}
      >
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <main className="flex-grow-1 overflow-auto p-4">
          <OrdersPage/>
        </main>
      </div>
    </div>
  );
}

export default App