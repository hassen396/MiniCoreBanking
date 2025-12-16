import { Routes, Route } from "react-router-dom";
import LoginPage from "../features/auth/pages/LoginPage";
import DashboardPage from "../features/accounts/pages/DashboardPage";

const AppRouter = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/" element={<DashboardPage />} />
  </Routes>
);

export default AppRouter;
