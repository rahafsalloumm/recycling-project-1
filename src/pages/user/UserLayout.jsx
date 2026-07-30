import Sidebar from './Sidebar'
import OrderTracking from './OrderTracking'
import UserDashboard from './UserDashboard'
import Settings from './Settings'
import Header from './Header'

function UserLayout({ page }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex flex-row-reverse">
        <Sidebar activePage={page} />
        <div className="flex-1">
          {page === 'dashboard' && <UserDashboard />}
          {page === 'tracking' && <OrderTracking />}
          {page === 'settings' && <Settings />}
        </div>
      </div>
    </div>
  )
}

export default UserLayout