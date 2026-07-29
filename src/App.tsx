import { useState } from "react";

import Sidebar from "./layout/Sidebar";
import Header from "./components/layout/Header";
function App() {
  const [activeTab, setActiveTab] = useState("don-hang");
  return (
    <div className="d-3">
      <div className="d-flex py-4">
        <Header></Header>
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-grow-1 p-4">
          <p> {activeTab}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
