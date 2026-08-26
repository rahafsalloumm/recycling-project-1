 import { useState } from 'react'

const allRecords = [
  { date: '20 مايو 2024', time: '10:00 AM', type: 'بلاستيك', emoji: '🍶', weight: '5.2 كغ', method: 'استلام من المنزل', methodIcon: '🏠', points: 150, id: '#1028', status: 'مكتمل' },
  { date: '18 مايو 2024', time: '02:30 PM', type: 'ورق', emoji: '📦', weight: '3.8 كغ', method: 'استلام من المنزل', methodIcon: '🏠', points: 120, id: '#1025', status: 'مكتمل' },
  { date: '17 مايو 2024', time: '11:15 AM', type: 'زجاج', emoji: '🍾', weight: '4.6 كغ', method: 'استلام من المنزل', methodIcon: '🏠', points: 180, id: '#1022', status: 'مكتمل' },
  { date: '15 مايو 2024', time: '09:00 AM', type: 'بلاستيك', emoji: '🍶', weight: '2.5 كغ', method: 'تسليم في حاوية ذكية', methodIcon: '🗑️', points: 100, id: '#1018', status: 'مكتمل' },
  { date: '12 مايو 2024', time: '04:20 PM', type: 'معادن', emoji: '🥫', weight: '1.9 كغ', method: 'تسليم في حاوية ذكية', methodIcon: '🗑️', points: 80, id: '#1015', status: 'مكتمل' },
  { date: '10 مايو 2024', time: '10:30 AM', type: 'ورق', emoji: '📦', weight: '5.6 كغ', method: 'استلام من المنزل', methodIcon: '🏠', points: 200, id: '#1012', status: 'مكتمل' },
  { date: '8 مايو 2024', time: '03:45 PM', type: 'زجاج', emoji: '🍾', weight: '2.0 كغ', method: 'تسليم في حاوية ذكية', methodIcon: '🗑️', points: 90, id: '#1009', status: 'مكتمل' },
  { date: '5 مايو 2024', time: '09:20 AM', type: 'بلاستيك', emoji: '🍶', weight: '2.8 كغ', method: 'استلام من المنزل', methodIcon: '🏠', points: 110, id: '#1006', status: 'مكتمل' },
]

const headers = ['التاريخ والوقت', 'نوع النفايات', 'الوزن', 'طريقة التسليم', 'النقاط المكتسبة', 'رقم الطلب', 'الحالة']

export default function RecyclingTable({ filterType }) {
  const [showAll, setShowAll] = useState(false)

  const filtered = filterType && filterType !== 'الكل'
    ? allRecords.filter(r => r.type === filterType)
    : allRecords

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