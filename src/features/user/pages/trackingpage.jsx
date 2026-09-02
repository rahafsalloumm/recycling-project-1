import { useState } from 'react'
import { FaBell, FaUserCircle, FaLeaf, FaMapMarkerAlt } from 'react-icons/fa'
import Sidebar from '../components/sidebar/sidebar/sidebar'
import TrackingStats from '../components/tracking/trackingstats/trackingstats'
import OrderCard from '../components/tracking/ordercard/ordercard'

const orders = [
  {
    id: 1028,
    status: 'مكتمل',
    date: '22 مايو 2026 - 08:00 PM',
    location: 'حلب، شارع الجامعة',
    lat: 36.2021,
    lng: 37.1343,
    wasteType: 'بلاستيك',
    weight: '5 كغ',
    timelineStep: 4,
  },
  {
    id: 1027,
    status: 'قيد التنفيذ',
    date: '20 مايو 2026 - 09:00 AM',
    location: 'حلب، شارع الجامعة',
    lat: 36.2021,
    lng: 37.1343,
    wasteType: 'ورق',
    weight: '3 كغ',
    timelineStep: 3,
  },
  {
    id: 1026,
    status: 'قيد المراجعة',
    date: '15 مايو 2026 - 11:15 AM',
    location: 'حلب، شارع الجامعة',
    lat: 36.2021,
    lng: 37.1343,
    wasteType: 'زجاج',
    weight: '4 كغ',
    timelineStep: 1,
  },
  {
    id: 1025,
    status: 'مكتمل',
    date: '18 أبريل 2026 - 02:30 PM',
    location: 'حلب، شارع الجامعة',
    lat: 36.2021,
    lng: 37.1343,
    wasteType: 'معادن',
    weight: '6 كغ',
    timelineStep: 4,
  },
  {
    id: 1024,
    status: 'مكتمل',
    date: '12 أبريل 2026 - 04:20 PM',
    location: 'حلب، شارع الجامعة',
    lat: 36.2021,
    lng: 37.1343,
    wasteType: 'بلاستيك',
    weight: '2 كغ',
    timelineStep: 4,
  },
]

export default function TrackingPage() {
  const [activePage, setActivePage] = useState('tracking')
  const [expandedId, setExpandedId] = useState(1028)

  const total = orders.length
  const completed = orders.filter(o => o.status === 'مكتمل').length
  const inProgress = orders.filter(o => o.status === 'قيد التنفيذ').length
  const underReview = orders.filter(o => o.status === 'قيد المراجعة').length

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

          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <h1 style={{ fontSize: '26px', fontWeight: '900', color: '#1a1a1a', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
              تتبع الطلبات
              <FaMapMarkerAlt style={{ color: '#2d6a2d' }} />
            </h1>
            <p style={{ fontSize: '14px', color: '#888' }}>يمكنك متابعة حالة طلبات استلام النفايات التي قمت بها</p>
          </div>

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
        </div>
      </div>
    </div>
  )
}