import { FaLeaf } from 'react-icons/fa'

export default function EcoTip({ tip = 'إعادة تدوير زجاجة واحدة توفر الطاقة اللازمة لتشغيل مصباح LED لمدة 6 ساعات.' }) {
  return (
    <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '20px', flex: 1, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }} dir="rtl">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <FaLeaf style={{ color: '#2d6a2d' }} />
        <h3 style={{ fontWeight: '800', fontSize: '15px', color: '#1a1a1a' }}>نصائح بيئية اليوم</h3>
      </div>
      <div style={{ backgroundColor: '#f0f7ee', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontSize: '32px' }}>💡</span>
        <p style={{ fontSize: '14px', color: '#444', lineHeight: '1.6' }}>{tip}</p>
      </div>
    </div>
  )
}