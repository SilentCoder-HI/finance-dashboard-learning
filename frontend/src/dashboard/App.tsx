import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import OverviewPage from "./pages/OverviewPage";
import Profile from "./components/profile";
import { Invoices } from "./pages/Invoices";
import UsersPage from "./pages/UsersPage";
import ProtectedRoute from "../routes/ProtectedRoute";

export default function DashboardApp() {
  return (
    <Routes>
      <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route index element={<OverviewPage />} />
        <Route path="profile" element={<Profile />} />
        <Route path="invoices" element={<Invoices />} />
        <Route path="users" element={<UsersPage />} />
      </Route>
    </Routes>
  );
}