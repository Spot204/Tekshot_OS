import { BrowserRouter as Router } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import AppRoutes from "./Routes/AppRouter";

function App() {
  return (
    <Router>
      <MainLayout>
        <AppRoutes />
      </MainLayout>
    </Router>
  );
}

export default App;
