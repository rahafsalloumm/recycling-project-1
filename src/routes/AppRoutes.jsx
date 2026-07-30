import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../admin/pages/Dashboard";
import AdminUsers from "../admin/pages/AdminUsers"; // تحديث المسار والاسم هنا للضعفة الجديدة

export default function AppRoutes() {
  return (
    <Routes>
      {/* تحويل الرابط تلقائياً من /admin إلى صفحة الـ Dashboard */}
      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
      
      {/* صفحة لوحة التحكم الرئيسية */}
      <Route path="/admin/dashboard" element={<Dashboard />} />
      
      {/* صفحة إدارة المستخدمين الاحترافية الجديدة */}
      <Route path="/admin/users" element={<AdminUsers />} />

      {/* يمكنك إضافة صفحة الإعدادات وباقي الصفحات هنا لاحقاً عند إنشائها */}
    </Routes>
  );
}
