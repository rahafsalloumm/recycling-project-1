import { useState } from 'react'
import { FaChevronRight, FaMapMarkerAlt } from 'react-icons/fa'

const wasteTypeMeta = {
  plastic: { label: 'بلاستيك', emoji: '🍶' },
  glass: { label: 'زجاج', emoji: '🍾' },
  metal: { label: 'معادن', emoji: '🥫' },
  paper: { label: 'ورق', emoji: '📦' },
  default: { label: 'نفايات', emoji: '♻️' }
}

const statusOptions = ['مكتمل', 'قيد التنفيذ', 'قيد المراجعة', 'مرفوض']

const statusStyles = {
  'مكتمل': { color: '#16a34a', bg: '#f0fdf4' },
  'قيد التنفيذ': { color: '#2563eb', bg: '#eff6ff' },
  'قيد المراجعة': { color: '#d97706', bg: '#fffbeb' },
  'مرفوض': { color: '#dc2626', bg: '#fef2f2' },
  default: { color: '#6b7280', bg: '#f3f4f6' }
}

const normalizeStatus = (status) => {
  switch (status) {
    case 'completed':
      return 'مكتمل'
    case 'accepted':
      return 'قيد التنفيذ'
    case 'pending':
      return 'قيد المراجعة'
    case 'rejected':
      return 'مرفوض'
    default:
      return 'قيد المراجعة'
  }
}

export default function RecentOrders({ data = [] }) {
  const [showAll, setShowAll] = useState(false)
  const [orders, setOrders] = useState(data)
  const [editingIndex, setEditingIndex] = useState(null)

  const mappedOrders = orders.map((order) => {
    const typeMeta = wasteTypeMeta[order.wasteType] || wasteTypeMeta.default
    return {
      id: order.id || order._id,
      location: order.address || 'غير محدد',
      type: typeMeta.label,
      emoji: typeMeta.emoji,
      weight: order.quantity || '0 كغ',
      date: order.date || 'غير محدد',
      time: order.time || '',
      status: normalizeStatus(order.status)
    }
  })

  const displayedOrders = showAll ? mappedOrders : mappedOrders.slice(0, 4)

  const handleStatusChange = (index, newStatus) => {
    const updated = [...orders]
    updated[index] = { ...updated[index], status: newStatus }
    setOrders(updated)
    setEditingIndex(null)
  }

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '20px', flex: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }} dir="rtl">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <p
          onClick={() => setShowAll(!showAll)}
          style={{ fontSize: '13px', color: '#2d6a2d', fontWeight: '600', cursor: mappedOrders.length > 0 ? 'pointer' : 'default', opacity: mappedOrders.length > 0 ? 1 : 0.5 }}
        >
          {mappedOrders.length > 0 ? (showAll ? 'عرض أقل' : 'عرض الكل') : 'لا توجد طلبات'}
        </p>
        <h3 style={{ fontWeight: '800', fontSize: '16px', color: '#1a1a1a' }}>الطلبات الأخيرة</h3>
      </div>

      {mappedOrders.length === 0 ? (
        <p style={{ color: '#888', fontSize: '14px', margin: 0 }}>لا توجد طلبات سابقة حتى الآن.</p>
      ) : displayedOrders.map((order, i) => (
        <div key={order.id || i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: i < displayedOrders.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flex: 1 }}>
            <FaMapMarkerAlt style={{ color: '#2d6a2d', fontSize: '14px' }} />
            <p style={{ fontSize: '13px', fontWeight: '600', color: '#1a1a1a', margin: 0 }}>{order.location}</p>
          </div>

          <div style={{ textAlign: 'center', flex: 1 }}>
            <p style={{ fontSize: '13px', fontWeight: '600', margin: '0 0 4px' }}>{order.type} {order.emoji}</p>
            <p style={{ fontSize: '12px', color: '#888', margin: 0 }}>{order.weight}</p>
          </div>

          <div style={{ textAlign: 'center', flex: 1 }}>
            <p style={{ fontSize: '12px', color: '#888', margin: '0 0 4px' }}>{order.date}</p>
            {order.time && <p style={{ fontSize: '12px', color: '#888', margin: 0 }}>{order.time}</p>}
          </div>

          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '8px', flex: 1, justifyContent: 'flex-end' }}>
            <span
              onClick={() => setEditingIndex(editingIndex === i ? null : i)}
              style={{
                backgroundColor: statusStyles[order.status]?.bg || statusStyles.default.bg,
                color: statusStyles[order.status]?.color || statusStyles.default.color,
                fontSize: '11px',
                fontWeight: '600',
                padding: '3px 10px',
                borderRadius: '999px',
                cursor: 'pointer',
                userSelect: 'none'
              }}
            >
              {order.status}
            </span>
            <FaChevronRight style={{ color: '#aaa', fontSize: '12px' }} />
            {editingIndex === i && (
              <div style={{
                position: 'absolute',
                top: '30px',
                left: 0,
                backgroundColor: 'white',
                borderRadius: '10px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                zIndex: 10,
                overflow: 'hidden',
                minWidth: '130px'
              }}>
                {statusOptions.map((s, j) => (
                  <div
                    key={j}
                    onClick={() => handleStatusChange(i, s)}
                    style={{
                      padding: '8px 14px',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: statusStyles[s]?.color || statusStyles.default.color,
                      backgroundColor: order.status === s ? (statusStyles[s]?.bg || statusStyles.default.bg) : 'white',
                      cursor: 'pointer'
                    }}
                  >
                    {s}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}