import { useState } from 'react'
import { FaBell, FaUserCircle, FaLeaf } from 'react-icons/fa'
import Sidebar from '../components/sidebar/sidebar/sidebar'
import StatsCard from '../components/dashboard/statscard/statscard'
import RecentOrders from '../components/dashboard/recentorders/recentorders'
import PointsChart from '../components/dashboard/pointschart/pointschart'
import EcoTip from '../components/dashboard/ecotip/ecotip'
import ImpactCard from '../components/dashboard/impactcard/impactcard'

export default function DashboardPage() {
  const [activePage, setActivePage] = useState('dashboard')

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', direction: 'rtl' }}>

      <Sidebar activePage={activePage} onNavigate={(page) => setActivePage(page)} />

      <div style={{ marginRight: '260px' }}>

        {/* الهيدر */}
        <div style={{ backgroundColor: 'white', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', position: 'sticky', top: 0, zIndex: 50 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
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

          {/* الترحيب */}
          <div style={{ marginBottom: '24px', textAlign: 'right' }}>
            <h1 style={{ fontSize: '26px', fontWeight: '900', color: '#1a1a1a', marginBottom: '4px' }}>مرحبًا رهف! 👋</h1>
            <p style={{ fontSize: '14px', color: '#888', display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end' }}>
              أنت تقوم بعمل رائع من أجل بيئة أفضل
              <FaLeaf style={{ color: '#2d6a2d' }} />
            </p>
          </div>

          {/* الإحصائيات */}
          <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
            <StatsCard icon="📋" value="8" label="إجمالي الطلبات" link="عرض الكل" linkRoute="/wastepickup" />
            <StatsCard icon="🔄" value="5" label="طلبات مكتملة" link="عرض الكل" linkRoute="/wastepickup" />
            <StatsCard icon="♻️" value="23.6 كغ" label="إجمالي النفايات المعاد تدويرها" link="عرض التفاصيل" linkRoute="/wastepickup" />
            <StatsCard icon="⭐️" value="2,450" label="إجمالي النقاط" link="عرض المكافآت" linkRoute="/rewards-new" />
          </div>

          {/* الطلبات الأخيرة والنقاط */}
          <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
            <RecentOrders />
            <PointsChart />
          </div>

          {/* النصائح والتأثير */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <EcoTip />
            <ImpactCard />
          </div>

        </div>
      </div>
    </div>
  )
}