import { Routes, Route } from "react-router-dom";
import LoginPage from "../features/auth/pages/LoginPage";
import DashboardPage from "../features/accounts/pages/DashboardPage";
import UXPinLayout from "../features/accounts/pages/UXPinLayout";
import AuthenticatedLayout from "../features/accounts/layouts/AuthenticatedLayout";
import ProfilePage from "../features/accounts/pages/ProfilePage";

const AppRouter = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />

    <Route element={<AuthenticatedLayout />}>

    <Route path="/dashboard" element={<DashboardPage />} />
    <Route path="/new-dashboard" element={<UXPinLayout />} />
     {/* <Route path="/accounts" element={<AccountsPage />} />
    <Route path="/transactions" element={<TransactionsPage />} /> */}
    <Route path="/profile" element={<ProfilePage />} />
    </Route>
  </Routes>
);

export default AppRouter;
