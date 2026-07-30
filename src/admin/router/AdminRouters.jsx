import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// استيراد الصفحات
import Dashboard from "../pages/Dashboard";
import AdminUsers from "../pages/AdminUsers";

export default function AdminRouters() {
  return (
    <Routes>
      {/* التوجيه الافتراضي لوحة التحكم */}
      <Route path="/" element={<Navigate to="dashboard" replace />} />
      
      {/* مسار لوحة التحكم الرئيسية */}
      <Route path="dashboard" element={<Dashboard />} />
      
      {/* مسار إدارة المستخدمين */}
      <Route path="users" element={<AdminUsers />} />
      
      {/* يمكنك إضافة باقي المسارات هنا لاحقاً مثل الحاويات والسائقين */}
    </Routes>
  );
}
