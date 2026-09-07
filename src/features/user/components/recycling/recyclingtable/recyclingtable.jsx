import { useState } from 'react'

const typeLabels = { plastic: 'بلاستيك', glass: 'زجاج', metal: 'معادن', paper: 'ورق' }
const statusLabels = { pending: 'قيد المراجعة', accepted: 'قيد التنفيذ', completed: 'مكتمل', rejected: 'مرفوض' }
const typeIcons = { plastic: '🍶', glass: '🍾', metal: '🥫', paper: '📦' }

const headers = ['التاريخ والوقت', 'نوع النفايات', 'الوزن', 'طريقة التسليم', 'النقاط المكتسبة', 'رقم الطلب', 'الحالة']

export default function RecyclingTable({ records = [], filterType, period }) {
  const [showAll, setShowAll] = useState(false)
  const [today] = useState(() => new Date())

  const periodDays = { 'هذا الشهر': 30, 'آخر 3 أشهر': 90, 'هذا العام': 365 }
  const cutoff = periodDays[period] ? today.getTime() - periodDays[period] * 86400000 : null
  const normalizedRecords = records.map((record) => ({
    date: record.pickupSchedule?.date ? new Date(record.pickupSchedule.date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }) : 'Not specified',
    time: record.pickupSchedule?.time || '',
    type: typeLabels[record.wasteType] || record.wasteType || 'نفايات',
    emoji: typeIcons[record.wasteType] || '♻️',
    weight: `${record.quantity || 0} كغ`,
    method: 'استلام من المنزل',
    methodIcon: '🏠',
    points: '-',
    id: record._id || record.id,
    status: statusLabels[record.status] || record.status || 'غير محدد',
    createdAt: record.createdAt,
  }))
  const filtered = normalizedRecords.filter((record) => {
    const matchesType = !filterType || filterType === 'الكل' || record.type === filterType
    const matchesPeriod = !cutoff || new Date(record.createdAt).getTime() >= cutoff
    return matchesType && matchesPeriod
  })

  const displayed = showAll ? filtered : filtered.slice(0, 5)

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }} dir="rtl">

      {/* هيدر الجدول */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 0.8fr 1.2fr 1fr 0.8fr 0.8fr', gap: '8px', padding: '10px 0', borderBottom: '2px solid #f0f0f0', marginBottom: '8px' }}>
        {headers.map((h, i) => (
          <p key={i} style={{ fontSize: '13px', fontWeight: '700', color: '#888', textAlign: 'center' }}>{h}</p>
        ))}
      </div>

      {/* الصفوف */}
      {displayed.map((record, i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 0.8fr 1.2fr 1fr 0.8fr 0.8fr', gap: '8px', padding: '12px 0', borderBottom: i < displayed.length - 1 ? '1px solid #f0f0f0' : 'none', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '13px', color: '#1a1a1a' }}>{record.date}</p>
            <p style={{ fontSize: '11px', color: '#888' }}>{record.time}</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '16px' }}>{record.emoji}</span>
            <p style={{ fontSize: '13px', color: '#1a1a1a' }}>{record.type}</p>
          </div>
          <p style={{ fontSize: '13px', color: '#1a1a1a', textAlign: 'center' }}>{record.weight}</p>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '16px' }}>{record.methodIcon}</span>
            <p style={{ fontSize: '12px', color: '#555' }}>{record.method}</p>
          </div>
          <p style={{ fontSize: '14px', fontWeight: '700', color: '#2d6a2d', textAlign: 'center' }}>{record.points} نقطة</p>
          <p style={{ fontSize: '13px', color: '#888', textAlign: 'center' }}>{record.id}</p>
          <div style={{ textAlign: 'center' }}>
            <span style={{ backgroundColor: '#f0fdf4', color: '#16a34a', fontSize: '11px', fontWeight: '600', padding: '3px 10px', borderRadius: '999px' }}>{record.status}</span>
          </div>
        </div>
      ))}
 {/* عرض المزيد */}
      {filtered.length > 5 && (
        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <p onClick={() => setShowAll(!showAll)} style={{ fontSize: '13px', color: '#2d6a2d', fontWeight: '600', cursor: 'pointer' }}>
            {showAll ? 'عرض أقل' : 'عرض الكل'}
          </p>
        </div>
      )}

      {/* ملاحظة */}
      <div style={{ marginTop: '16px', padding: '10px', backgroundColor: '#f9fafb', borderRadius: '8px', display: 'flex', alignItems: 'center',justifyContent: 'center', gap: '6px' }}>
        <span style={{ fontSize: '14px' }}>ℹ️</span>
        <p style={{ fontSize: '12px', color: '#888' }}>يتم احتساب النقاط بعد إتمام عملية الاستلام والتأكد من الوزن</p>
      </div>

    </div>
  )
}