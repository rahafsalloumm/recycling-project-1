import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaUserCircle, FaLeaf } from 'react-icons/fa'
import Sidebar from '../components/sidebar/sidebar/sidebar'
import RecyclingStats from '../components/recycling/recyclingstats/recyclingstats'
import RecyclingFilter from '../components/recycling/recyclingfilter/recyclingfilter'
import RecyclingTable from '../components/recycling/recyclingtable/recyclingtable'
import { userService } from '@/services'

export default function RecyclingPage() {
  const [activePage, setActivePage] = useState('recycling')
  const [filterType, setFilterType] = useState('الكل')
  const [period, setPeriod] = useState('جميع الفترات')
  const [stats, setStats] = useState(null)
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadRecyclingData = async () => {
      try {
        const [dashboardResult, requestsResult] = await Promise.all([
          userService.getDashboardStats(),
          userService.getMyRequests(),
        ])
        const dashboard = dashboardResult?.data || dashboardResult
        const requests = requestsResult?.wasteRequests || requestsResult?.data || []
        setStats(dashboard?.recyclingHistoryPage || {})
        setRecords(requests)
      } catch (err) {
        setError(err?.message || 'تعذر تحميل سجل إعادة التدوير')
      } finally {
        setLoading(false)
      }
    }

    loadRecyclingData()
  }, [])

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', direction: 'rtl' }}>

      <Sidebar activePage={activePage} onNavigate={(page) => setActivePage(page)} />

      <div style={{ marginRight: '260px' }}>

        {/* الهيدر */}
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

        {/* المحتوى */}
        <div style={{ width: '100%', padding: '32px 24px', boxSizing: 'border-box' }}>
          <h1 style={{ fontSize: '26px', fontWeight: '900', color: '#1a1a1a', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
            <FaLeaf style={{ color: '#2d6a2d' }} />
            سجل إعادة التدوير
          </h1>
          <p style={{ fontSize: '14px', color: '#888', marginBottom: '24px', textAlign: 'center' }}>عرض جميع عمليات إعادة التدوير التي قمت بها</p>

          {loading ? (
            <p style={{ textAlign: 'center', color: '#666' }}>جاري تحميل سجل إعادة التدوير...</p>
          ) : error ? (
            <p style={{ textAlign: 'center', color: 'crimson' }}>{error}</p>
          ) : (
            <>
              <RecyclingStats stats={stats} />
              <RecyclingFilter onFilterChange={setFilterType} onPeriodChange={setPeriod} />
              <RecyclingTable records={records} filterType={filterType} period={period} />
            </>
          )}

        </div>
      </div>
    </div>
  )
}