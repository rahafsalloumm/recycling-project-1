import { Routes, Route, Navigate } from 'react-router-dom'

// استيراد الصفحات الأساسية العامة من مجلد src الرئيسي
import ServicesPage from './ServicesPage' 
import Home from './Home'
import Login from './Login'
import Register from './Register'
import RequestPickup from './RequestPickup'
import Contact from './Contact'
import HowItWorks from './HowItWorks'
import ForgotPassword from './ForgotPassword'
import RewardsPage from './RewardsPage' // تأكدي أن اسم الملف يطابق حالتكِ


//  تم تصحيح المسارات هنا لتشير إلى مجلد المستخدم الجديد الموحد
import SettingsPage from './user/pages/settingspage'
import TrackingPage from './user/pages/trackingpage'

// صفحات لوحة تحكم المسؤول (Admin)
import AdminLayout from './admin/layout/AdminLayout'
import Dashboard from './admin/pages/Dashboard'
import AdminUsers from './admin/pages/AdminUsers'
import AdminDrivers from './admin/pages/AdminDrivers'
import AdminOrders from './admin/pages/AdminOrders'
import AdminBins from './admin/pages/AdminBins'
import AdminRoutes from './admin/pages/AdminRoutes'
import AdminReports from './admin/pages/AdminReports'
import AdminRewards from './admin/pages/AdminRewards'
import AdminSettings from './admin/pages/AdminSettings'

// صفحات لوحة تحكم السائق (Driver)
import DriverDashboard from './driver/pages/DriverDashboard'
import DriverTasks from './driver/pages/DriverTasks'
import DriverRoute from './driver/pages/DriverRoute'
import DriverBins from './driver/pages/DriverBins'
import DriverHomes from './driver/pages/DriverHomes'
import DriverHistory from './driver/pages/DriverHistory'
import DriverProfile from './driver/pages/DriverProfile'
import DriverHelp from './driver/pages/DriverHelp'
function App() {
  return (
    <Routes>
      {/* روابط لوحة تحكم المستخدم وصفحة الخدمات */}
      <Route path="/dashboard" element={<TrackingPage />} />
      <Route path="/wastepickup" element={<ServicesPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/tracking" element={<TrackingPage />} />
      <Route path="/settings" element={<SettingsPage />} />

      {/* المسارات العامة */}
      <Route path="/" element={<Home />} />
      <Route path="/request-pickup" element={<RequestPickup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
<Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/rewards" element={<RewardsPage />} />


      {/* لوحة تحكم الـ Admin */}
      <Route path="/admin" element={<AdminLayout />}>
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

      {/* لوحة تحكم الـ Driver */}
      <Route path="/driver/dashboard" element={<DriverDashboard />} />
      <Route path="/driver/tasks" element={<DriverTasks />} />
      <Route path="/driver/route" element={<DriverRoute />} />
      <Route path="/driver/bins" element={<DriverBins />} />
      <Route path="/driver/homes" element={<DriverHomes />} />
      <Route path="/driver/history" element={<DriverHistory />} />
      <Route path="/driver/profile" element={<DriverProfile />} />
      <Route path="/driver/help" element={<DriverHelp />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App;
