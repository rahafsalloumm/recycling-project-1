import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaUserCircle, FaLeaf, FaMapMarkerAlt } from 'react-icons/fa'
import Sidebar from '../components/sidebar/sidebar/sidebar'
import TrackingStats from '../components/tracking/trackingstats/trackingstats'
import OrderCard from '../components/tracking/ordercard/ordercard'
import { userService } from '@/services'

const statusMap = {
  pending: { label: 'قيد المراجعة', step: 1 },
  accepted: { label: 'قيد التنفيذ', step: 3 },
  completed: { label: 'مكتمل', step: 4 },
  rejected: { label: 'مرفوض', step: 0 },
}

export default function TrackingPage() {
  const [activePage, setActivePage] = useState('tracking')
  const [expandedId, setExpandedId] = useState(null)
  const [orders, setOrders] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadTrackingData = async () => {
      try {
        const [dashboardStats, myRequests] = await Promise.all([
          userService.getDashboardStats(),
          userService.getMyRequests(),
        ])

        const trackingStats = dashboardStats?.data?.orderTrackingPage || dashboardStats?.orderTrackingPage || {}
        const requestList = myRequests?.myRequests || myRequests?.data || []

        setStats(trackingStats)
        setOrders(
          requestList.map((item) => {
            const mapped = statusMap[item.status] || { label: item.status || 'قيد المراجعة', step: 1 }
            return {
              id: item._id || item.id,
              status: mapped.label,
              date: item.createdAt ? new Date(item.createdAt).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }) : 'Not specified',
              location: item.address || 'غير محدد',
              lat: item.lat || 36.2021,
              lng: item.lng || 37.1343,
              wasteType: item.wasteType || 'نفايات',
              weight: `${item.quantity || 0} كغ`,
              timelineStep: mapped.step,
            }
          })
        )

        if (requestList.length > 0) {
          setExpandedId(requestList[0]._id || requestList[0].id)
        }
      } catch (err) {
        setError(err?.message || 'تعذر تحميل طلباتك')
      } finally {
        setLoading(false)
      }
    }

    loadTrackingData()
  }, [])

  const total = orders.length || Number(stats?.totalOrders || 0)
  const completed = orders.filter((o) => o.status === 'مكتمل').length || Number(stats?.completedOrders || 0)
  const inProgress = orders.filter((o) => o.status === 'قيد التنفيذ').length || Number(stats?.inProgressOrders || 0)
  const underReview = orders.filter((o) => o.status === 'قيد المراجعة').length || Number(stats?.pendingOrders || 0)

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
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <h1 style={{ fontSize: '26px', fontWeight: '900', color: '#1a1a1a', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
              تتبع الطلبات
              <FaMapMarkerAlt style={{ color: '#2d6a2d' }} />
            </h1>
            <p style={{ fontSize: '14px', color: '#888' }}>يمكنك متابعة حالة طلبات استلام النفايات التي قمت بها</p>
          </div>

          {loading ? (
            <p style={{ textAlign: 'center', color: '#666' }}>جاري تحميل الطلبات...</p>
          ) : error ? (
            <p style={{ textAlign: 'center', color: 'crimson' }}>{error}</p>
          ) : (
            <>
              <TrackingStats total={total} underReview={underReview} inProgress={inProgress} completed={completed} />

              {orders.map((order) => (
                <OrderCard
                  key={order.id}
                  orderNumber={order.id}
                  status={order.status}
                  date={order.date}
                  location={order.location}
                  lat={order.lat}
                  lng={order.lng}
                  wasteType={order.wasteType}
                  weight={order.weight}
                  timelineStep={order.timelineStep}
                  expanded={expandedId === order.id}
                  onToggle={() => setExpandedId(expandedId === order.id ? null : order.id)}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}