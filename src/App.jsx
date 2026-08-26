import { Routes, Route, Navigate } from 'react-router-dom'

import DashboardPage from './pages/dashboardpage'
import WastePickupPage from './pages/wastepickuppage'
import RewardsNewPage from './pages/rewardsnewpage'
import RecyclingPage from './pages/recyclingpage'
import RewardsPage from './pages/rewardspage'
import ProfilePage from './pages/profilepages'
import SettingsPage from './pages/settingspage'
import TrackingPage from './pages/trackingpage'
import ServicesPage from './pages/servicespage'

import Home from './Home'
import Login from './Login'
import Register from './Register'
import RequestPickup from './RequestPickup'
import Contact from './Contact'
import HowItWorks from './HowItWorks'

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
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/wastepickup" element={<WastePickupPage />} />
      <Route path="/rewards" element={<RewardsNewPage />} />
      <Route path="/oldrewards" element={<RewardsPage />} />
      <Route path="/recycling" element={<RecyclingPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/tracking" element={<TrackingPage />} />
      <Route path="/services" element={<ServicesPage />} />

      <Route path="/" element={<Home />} />
      <Route path="/request-pickup" element={<RequestPickup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/how-it-works" element={<HowItWorks />} />

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

export default App