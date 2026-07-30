import { Routes, Route } from 'react-router-dom'
import DashboardPage from './pages/dashboardpage'
import WastePickupPage from './pages/wastepickuppage'
import RewardsNewPage from './pages/rewardsnewpage'
import RecyclingPage from './pages/recyclingpage'
import RewardsPage from './pages/rewardspage'
import ProfilePage from './pages/profilepages'

function App() {
  return (
    <div style={{ minHeight: '100vh', width: '100%', backgroundColor: '#f9fafb' }}>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/wastepickup" element={<WastePickupPage />} />
        <Route path="/rewards" element={<RewardsNewPage />} />
        <Route path="/oldrewards" element={<RewardsPage />} />
        <Route path="/recycling" element={<RecyclingPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  )
}

export default App