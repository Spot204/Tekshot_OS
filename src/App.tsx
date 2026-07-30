import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import AppRoutes from "./Routes/AppRouter";
function App() {

  return (
    <Router>
      <div className="d-flex flex-column vh-100">
        <Header />

        <div className="d-flex flex-grow-1 overflow-hidden">
          <Sidebar />
          <main
            className="flex-grow-1 bg-light p-4  overflow-auto"
            style={{ marginLeft: "260px" }}
          >
            <AppRoutes />
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
