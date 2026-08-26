 import { useState } from 'react'
import { FaChevronRight, FaMapMarkerAlt } from 'react-icons/fa'

const allOrders = [
  { location: 'حلب , الجميلية', type: 'بلاستيك', emoji: '🍶', weight: '5 كغ', date: '20/05/2024', time: '10:00 AM', status: 'مكتمل' },
  { location:'حلب , الحمدانية', type: 'ورق', emoji: '📦', weight: '3 كغ', date: '18/05/2024', time: '02:30 PM', status: 'قيد التنفيذ' },
  { location: 'حلب , الاعظمية', type: 'معادن', emoji: '🥫', weight: '2 كغ', date: '17/05/2024', time: '11:15 AM', status: 'قيد المراجعة' },
  { location: 'حلب , الفرقان', type: 'زجاج', emoji: '🍾', weight: '4 كغ', date: '15/05/2024', time: '09:00 AM', status: 'مكتمل' },
  { location: 'حلب , المشهد', type: 'بلاستيك', emoji: '🍶', weight: '6 كغ', date: '13/05/2024', time: '11:00 AM', status: 'مكتمل' },
  { location: 'حلب , حلب الجديدة', type: 'زجاج', emoji: '🍾', weight: '2 كغ', date: '10/05/2024', time: '03:00 PM', status: 'قيد التنفيذ' },
]

const statusOptions = ['مكتمل', 'قيد التنفيذ', 'قيد المراجعة']

const statusStyles = {
  'مكتمل': { color: '#16a34a', bg: '#f0fdf4' },
  'قيد التنفيذ': { color: '#2563eb', bg: '#eff6ff' },
  'قيد المراجعة': { color: '#d97706', bg: '#fffbeb' },
}

export default function RecentOrders() {
  const [showAll, setShowAll] = useState(false)
  const [orders, setOrders] = useState(allOrders)
  const [editingIndex, setEditingIndex] = useState(null)

  const displayedOrders = showAll ? orders : orders.slice(0, 4)

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
          style={{ fontSize: '13px', color: '#2d6a2d', fontWeight: '600', cursor: 'pointer' }}
        >
          {showAll ? 'عرض أقل' : 'عرض الكل'}
        </p>
        <h3 style={{ fontWeight: '800', fontSize: '16px', color: '#1a1a1a' }}>الطلبات الأخيرة</h3>
      </div>

      {displayedOrders.map((order, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: i < displayedOrders.length - 1 ? '1px solid #f0f0f0' : 'none' }}>

          {/* يسار - الموقع */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <FaMapMarkerAlt style={{ color: '#2d6a2d', fontSize: '14px' }} />
            <p style={{ fontSize: '13px', fontWeight: '600', color: '#1a1a1a' }}>{order.location}</p>
          </div>

          {/* النوع والوزن */}
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '13px', fontWeight: '600' }}>{order.type} {order.emoji}</p>
            <p style={{ fontSize: '12px', color: '#888' }}>{order.weight}</p>
          </div>

          {/* التاريخ والوقت */}
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '12px', color: '#888' }}>{order.date}</p>
            <p style={{ fontSize: '12px', color: '#888' }}>{order.time}</p>
          </div>

          {/* الحالة - قابلة للتغيير */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              onClick={() => setEditingIndex(editingIndex === i ? null : i)}
              style={{
                backgroundColor: statusStyles[order.status].bg,
                color: statusStyles[order.status].color,
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
 {/* قائمة تغيير الحالة */}
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
                      color: statusStyles[s].color,
                      backgroundColor: order.status === s ? statusStyles[s].bg : 'white',
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