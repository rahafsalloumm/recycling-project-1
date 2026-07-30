import { useState } from 'react'
import { FaBars, FaBell, FaUserCircle, FaLeaf } from 'react-icons/fa'
import Sidebar from '../cycle/componentes/sidebar/sidebar'
import HeroSection from '../reward\\components/herosection/herosection'
import EarnPoints from '../reward\\components/earnpoints/earnpoints'
import Rewards from '../reward\\components/rewards/rewards'

export default function RewardsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activePage, setActivePage] = useState('rewards')

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', direction: 'rtl' }}>

      <Sidebar isOpen={sidebarOpen} activePage={activePage} onNavigate={(page) => { setActivePage(page); setSidebarOpen(false) }} />

      <div style={{ marginRight: sidebarOpen ? '260px' : '0', transition: 'margin-right 0.3s ease' }}>

        {/* الهيدر */}
        <div style={{ backgroundColor: 'white', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', position: 'sticky', top: 0, zIndex: 50 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <FaBars onClick={() => setSidebarOpen(!sidebarOpen)} style={{ fontSize: '22px', color: '#555', cursor: 'pointer' }} />
            <div style={{ position: 'relative' }}>
              <FaBell style={{ fontSize: '20px', color: '#555' }} />
              <span style={{ position: 'absolute', top: '-6px', right: '-6px', backgroundColor: '#e53e3e', color: 'white', borderRadius: '50%', width: '16px', height: '16px', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>2</span>
            </div>
            <FaUserCircle style={{ fontSize: '28px', color: '#555' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaLeaf style={{ color: '#2d6a2d', fontSize: '20px' }} />
            <span style={{ fontWeight: '900', fontSize: '18px', color: '#2d6a2d' }}>EcoCycle</span>
          </div>
        </div>

        {/* المحتوى */}
        <div style={{ width: '100%', padding: '32px 24px', boxSizing: 'border-box' }}>
          <HeroSection />
          <EarnPoints />
          <Rewards />
        </div>

      </div>
    </div>
  )
}