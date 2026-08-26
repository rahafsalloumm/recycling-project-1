import { FaUsers, FaLeaf } from 'react-icons/fa'
import { FaChartBar } from 'react-icons/fa'

export default function ImpactCard() {
  return (
    <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '20px', flex: 1, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }} dir="rtl">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <FaChartBar style={{ color: '#2d6a2d' }} />
        <h3 style={{ fontWeight: '800', fontSize: '15px', color: '#1a1a1a' }}>تأثيرك الإيجابي</h3>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <FaUsers style={{ color: '#2d6a2d' }} />
        <p style={{ fontSize: '14px', color: '#444' }}>أنت ضمن أفضل 20% من المستخدمين</p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <FaLeaf style={{ color: '#2d6a2d' }} />
        <p style={{ fontSize: '14px', color: '#2d6a2d', fontWeight: '600', cursor: 'pointer' }}>استمر في صنع الفرق!</p>
      </div>
    </div>
  )
}