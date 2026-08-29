import { Routes, Route, Navigate } from "react-router-dom";

// استيراد صفحات المسؤول (Admin)
import Dashboard from "../admin/pages/Dashboard";
import AdminUsers from "../admin/pages/AdminUsers";

// استيراد صفحات المستخدم (User) الجديدة من مجلدها المنظم
import UserDashboard from "../user/pages/UserDashboard";
import OrderTracking from "../user/pages/OrderTracking";
import Settings from "../user/pages/Settings";
import UserLayout from "../user/pages/UserLayout";
import ServicesPage from "../user/pages/servicespage";
import SettingsPage from "../user/pages/settingspage";
import TrackingPage from "../user/pages/trackingpage";

export default function AppRoutes() {
  return (
    <Routes>
      {/* 1. مسارات لوحة تحكم المسؤول (Admin) */}
      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/users" element={<AdminUsers />} />

      {/* 2. مسارات لوحة تحكم المستخدم (User Dashboard) */}
      <Route path="/user" element={<UserLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<UserDashboard />} />
        <Route path="orders" element={<OrderTracking />} />
        <Route path="settings" element={<Settings />} />
        <Route path="services-list" element={<ServicesPage />} />
        <Route path="settings-page" element={<SettingsPage />} />
        <Route path="tracking-page" element={<TrackingPage />} />
      </Route>

      {/* التوجيه التلقائي في حال كتابة مسار خاطئ */}
      <Route path="*" element={<Navigate to="/user/dashboard" replace />} />
    </Routes>
  );
}
