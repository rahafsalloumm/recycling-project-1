import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// 🔹 1. استيراد صفحات المستخدم والزوار الأساسية
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import RequestPickup from "./RequestPickup";
import Contact from "./Contact"; // 👈 تم إضافة استيراد صفحة تواصل معنا هنا
import HowItWorks from "./HowItWorks";

// 🔹 2. استيراد صفحات الإدارة (Admin)
import AdminLayout from "./admin/layout/AdminLayout";
import Dashboard from "./admin/pages/Dashboard";
import AdminUsers from "./admin/pages/AdminUsers";
import AdminDrivers from "./admin/pages/AdminDrivers";
import AdminOrders from "./admin/pages/AdminOrders";
import AdminBins from "./admin/pages/AdminBins";
import AdminRoutes from "./admin/pages/AdminRoutes";
import AdminReports from "./admin/pages/AdminReports";
import AdminRewards from "./admin/pages/AdminRewards";
import AdminSettings from "./admin/pages/AdminSettings";

// 🔹 3. استيراد صفحات السائق (Driver)
import DriverDashboard from './driver/pages/DriverDashboard';
import DriverTasks from './driver/pages/DriverTasks';
import DriverRoute from './driver/pages/DriverRoute';
import DriverBins from './driver/pages/DriverBins';
import DriverHomes from './driver/pages/DriverHomes';
import DriverHistory from './driver/pages/DriverHistory';
import DriverProfile from './driver/pages/DriverProfile';
import DriverHelp from './driver/pages/DriverHelp';

function App() {
  return (
    <Routes>
      {/* 🟢 أزرق: مسارات وتنقُّلات صفحات المستخدم العام والزائر */}
      <Route path="/" element={<Home />} />
      <Route path="/request-pickup" element={<RequestPickup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/contact" element={<Contact />} /> {/* 👈 تم إضافة المسار الخاص بالصفحة هنا */}
      <Route path="/how-it-works" element={<HowItWorks />} />

      {/* 🔴 أحمر: مسارات صفحات الأدمن المتداخلة تحت تخطيط AdminLayout */}
      <Route path="/admin" element={<AdminLayout />}>
        {/* التحويل التلقائي عند دخول رابط /admin إلى /admin/dashboard */}
        <Route index element={<Navigate to="dashboard" replace />} />
        
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<AdminUsers />} /> 
        <Route path="drivers" element={<AdminDrivers />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="bins" element={<AdminBins />} />
        <Route path="routes" element={<AdminRoutes />} />
        <Route path="reports" element={<AdminReports />} />
        <Route path="rewards" element={<AdminRewards />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* 🛞 أخضر: مسارات صفحات السائق المستقلة والكاملة */}
      <Route path="/driver/dashboard" element={<DriverDashboard />} />
      <Route path="/driver/tasks" element={<DriverTasks />} />
      <Route path="/driver/route" element={<DriverRoute />} />
      <Route path="/driver/bins" element={<DriverBins />} />
      <Route path="/driver/homes" element={<DriverHomes />} />
      <Route path="/driver/history" element={<DriverHistory />} />
      <Route path="/driver/profile" element={<DriverProfile />} />
      <Route path="/driver/help" element={<DriverHelp />} />

      {/* ⚠️ صمام الأمان: تحويل أي رابط خاطئ أو غير موجود تلقائياً إلى الصفحة الرئيسية */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
