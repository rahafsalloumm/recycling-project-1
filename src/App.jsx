 import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from '@/components/ProtectedRoute'

// الصفحات العامة
import Home from '@/pages/public/Home'
import ServicesPage from '@/pages/public/ServicesPage'
import RequestPickup from '@/pages/public/RequestPickup'
import Contact from '@/pages/public/Contact'
import HowItWorks from '@/pages/public/HowItWorks'
import RewardsPage from '@/pages/public/RewardsPage'

// صفحات تسجيل الدخول والمصادقة
import Login from '@/pages/auth/Login'
import Register from '@/pages/auth/Register'
import ForgotPassword from '@/pages/auth/ForgotPassword'

// صفحات المستخدم
import DashboardPage from '@/features/user/pages/dashboardpage'
import ProfilePage from '@/features/user/pages/profilepage'
import RecyclingPage from '@/features/user/pages/recyclingpage'
import RewardsNewPage from '@/features/user/pages/rewardsnewpage'
import SettingsPage from '@/features/user/pages/settingspage'
import TrackingPage from '@/features/user/pages/trackingpage'
import WastePickupPage from '@/features/user/pages/wastepickuppage'
import MyRewards from '@/features/user/pages/myrewards'
// لوحة تحكم المسؤول (Admin)
import AdminLayout from './features/admin/layout/AdminLayout'
import Dashboard from './features/admin/pages/Dashboard'
import AdminUsers from './features/admin/pages/AdminUsers'
import AdminDrivers from './features/admin/pages/AdminDrivers'
import AdminOrders from './features/admin/pages/AdminOrders'
import AdminBins from './features/admin/pages/AdminBins'
import AdminRoutes from './features/admin/pages/AdminRoutes'
import AdminReports from './features/admin/pages/AdminReports'
import AdminRewards from './features/admin/pages/AdminRewards'
import AdminSettings from './features/admin/pages/AdminSettings'
import AdminSupport from "./features/admin/pages/AdminSupport"; 

// لوحة تحكم السائق (Driver)
import DriverDashboard from '@/features/driver/pages/DriverDashboard'
import DriverTasks from '@/features/driver/pages/DriverTasks'
import DriverRoute from '@/features/driver/pages/DriverRoute'
import DriverBins from '@/features/driver/pages/DriverBins'
import DriverHomes from '@/features/driver/pages/DriverHomes'
import DriverHistory from '@/features/driver/pages/DriverHistory'
import DriverProfile from '@/features/driver/pages/DriverProfile'
import DriverHelp from '@/features/driver/pages/DriverHelp'
import Sidebar from '@/features/driver/layout/Sidebar'

function App() {
  return (
    <Routes>
      {/* الصفحات العامة */}
      <Route path="/" element={<Home />} />
      <Route path="/request-pickup" element={<RequestPickup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/rewards" element={<RewardsPage />} />

      {/* صفحات المستخدم */}
      <Route path="/user" element={<ProtectedRoute allowedRoles={['user']}><DashboardPage /></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['user']}><DashboardPage /></ProtectedRoute>} />
      <Route path="/wastepickup" element={<ProtectedRoute allowedRoles={['user']}><WastePickupPage /></ProtectedRoute>} />
      <Route path="/services" element={<ProtectedRoute allowedRoles={['user']}><ServicesPage /></ProtectedRoute>} />
      <Route path="/tracking" element={<ProtectedRoute allowedRoles={['user']}><TrackingPage /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute allowedRoles={['user']}><SettingsPage /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute allowedRoles={['user']}><ProfilePage /></ProtectedRoute>} />
      <Route path="/recycling" element={<ProtectedRoute allowedRoles={['user']}><RecyclingPage /></ProtectedRoute>} />
      <Route path="/rewardsnew" element={<ProtectedRoute allowedRoles={['user']}><RewardsNewPage /></ProtectedRoute>} />
      <Route path="/myrewards" element={<ProtectedRoute allowedRoles={['user']}><MyRewards /></ProtectedRoute>} />

      {/* لوحة تحكم الـ Admin */}
      <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminLayout /></ProtectedRoute>}>
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
        <Route path="support" element={<AdminSupport />} />
      </Route>

      {/* لوحة تحكم الـ Driver */}
      <Route path="/driver" element={<ProtectedRoute allowedRoles={['driver']}><DriverDashboard /></ProtectedRoute>} />
      <Route path="/driver/dashboard" element={<ProtectedRoute allowedRoles={['driver']}><DriverDashboard /></ProtectedRoute>} />
      <Route path="/driver/tasks" element={<ProtectedRoute allowedRoles={['driver']}><DriverTasks /></ProtectedRoute>} />
      <Route path="/driver/route" element={<ProtectedRoute allowedRoles={['driver']}><DriverRoute /></ProtectedRoute>} />
      <Route path="/driver/bins" element={<ProtectedRoute allowedRoles={['driver']}><DriverBins /></ProtectedRoute>} />
      <Route path="/driver/homes" element={<ProtectedRoute allowedRoles={['driver']}><DriverHomes /></ProtectedRoute>} />
      <Route path="/driver/history" element={<ProtectedRoute allowedRoles={['driver']}><DriverHistory /></ProtectedRoute>} />
      <Route path="/driver/profile" element={<ProtectedRoute allowedRoles={['driver']}><DriverProfile /></ProtectedRoute>} />
      <Route path="/driver/help" element={<ProtectedRoute allowedRoles={['driver']}><DriverHelp /></ProtectedRoute>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App