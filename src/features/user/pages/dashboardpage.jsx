import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaUserCircle, FaLeaf } from 'react-icons/fa'
import Sidebar from '../components/sidebar/sidebar/sidebar'
import StatsCard from '../components/dashboard/statscard/statscard'
import RecentOrders from '../components/dashboard/recentorders/recentorders'
import PointsChart from '../components/dashboard/pointschart/pointschart'
import EcoTip from '../components/dashboard/ecotip/ecotip'
import ImpactCard from '../components/dashboard/impactcard/impactcard'
import { userService } from '@/services'

export default function DashboardPage() {
  const [activePage, setActivePage] = useState('dashboard')
  const [user, setUser] = useState(null)
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [profile, dashboardStats] = await Promise.all([
          userService.getProfile(),
          userService.getDashboardStats(),
        ])

        setUser(profile)
        setStats(dashboardStats?.data || dashboardStats)
      } catch (err) {
        setError(err?.message || 'تعذر تحميل بيانات المستخدم')
      } finally {
        setLoading(false)
      }
    }

    loadDashboardData()
  }, [])

  const dashboardData = stats?.userDashboardPage || {}
  const recentRequests = dashboardData.recentRequests || []

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', direction: 'rtl' }}>
      <Sidebar activePage={activePage} onNavigate={(page) => setActivePage(page)} />

      <div style={{ marginRight: '260px' }}>
        <div style={{ backgroundColor: 'white', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', position: 'sticky', top: 0, zIndex: 50 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link to="/profile" aria-label="الملف الشخصي">
              <FaUserCircle style={{ fontSize: '28px', color: '#555', cursor: 'pointer' }} />
            </Link>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaLeaf style={{ color: '#2d6a2d', fontSize: '20px' }} />
            <span style={{ fontWeight: '900', fontSize: '18px', color: '#2d6a2d' }}>EcoCycle</span>
          </div>
        </div>

        <div style={{ width: '100%', padding: '32px 24px', boxSizing: 'border-box' }}>
          {loading ? (
            <p style={{ textAlign: 'center', color: '#666' }}>جاري تحميل بيانات لوحة التحكم...</p>
          ) : error ? (
            <p style={{ textAlign: 'center', color: 'crimson' }}>{error}</p>
          ) : (
            <>
              <div style={{ marginBottom: '24px', textAlign: 'right' }}>
                <h1 style={{ fontSize: '26px', fontWeight: '900', color: '#1a1a1a', marginBottom: '4px' }}>
                  مرحبًا {user?.name || 'مستخدم'}! 👋
                </h1>
                <p style={{ fontSize: '14px', color: '#888', display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end' }}>
                  أنت تقوم بعمل رائع من أجل بيئة أفضل
                  <FaLeaf style={{ color: '#2d6a2d' }} />
                </p>
              </div>

              <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
                <StatsCard icon="📋" value={dashboardData.totalRequests ?? 0} label="إجمالي الطلبات" link="عرض الكل" linkRoute="/wastepickup" />
                <StatsCard icon="🔄" value={dashboardData.completedRequests ?? 0} label="طلبات مكتملة" link="عرض الكل" linkRoute="/wastepickup" />
                <StatsCard icon="♻️" value={`${dashboardData.recycledWeightKg ?? 0} كغ`} label="إجمالي النفايات المعاد تدويرها" link="عرض التفاصيل" linkRoute="/wastepickup" />
                <StatsCard icon="⭐️" value={dashboardData.currentPoints ?? 0} label="إجمالي النقاط" link="عرض المكافآت" linkRoute="/rewardsnew" />
              </div>

              <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
                <RecentOrders data={recentRequests} />
                <PointsChart points={dashboardData.currentPoints ?? 0} target={1000} />
              </div>

              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <EcoTip />
                <ImpactCard />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}