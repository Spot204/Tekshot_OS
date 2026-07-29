import { useState } from "react";

import Sidebar from "./layout/Sidebar";
function App() {
  const [roles, setRoles] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("don-hang");
  return (
    <div className="d-3">
      <div className="d-flex">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="flex-grow-1 p-4">
          <p> {activeTab}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
