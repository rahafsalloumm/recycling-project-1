import { FaLeaf, FaTruck, FaRecycle, FaCalendarCheck, FaSeedling, FaArrowLeft } from 'react-icons/fa'

const steps = [
  { icon: <FaTruck style={{ fontSize: '48px', color: '#2d6a2d' }} />, title: 'اطلب استلام النفايات', points: '+50' },
  { icon: <FaRecycle style={{ fontSize: '48px', color: '#2d6a2d' }} />, title: 'قم بإعادة تدوير', points: '+20' },
  { icon: <FaCalendarCheck style={{ fontSize: '48px', color: '#2d6a2d' }} />, title: 'استخدم المنصة بانتظام', points: '+10' },
  { icon: <FaSeedling style={{ fontSize: '48px', color: '#2d6a2d' }} />, title: 'شارك الوعي البيئي', points: '+15' },
]

export default function EarnPoints() {
  return (
    <div style={{ padding: '32px 16px', direction: 'rtl' }}>
      <h2 style={{ fontSize: '24px', fontWeight: '900', textAlign: 'center', marginBottom: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
        <FaLeaf style={{ color: '#2d6a2d' }} />
        كيف تكسب النقاط؟
      </h2>

      <div style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'space-between', gap: '8px', width: '100%' }}>
        {steps.map((step, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
            <div style={{
              backgroundColor: '#f0f7ee',
              borderRadius: '16px',
              padding: '24px 16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              flex: 1,
              boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
            }}>
              <p style={{ color: '#333', fontWeight: '700', textAlign: 'center', fontSize: '14px', marginBottom: '12px' }}>{step.title}</p>
              <span style={{ color: '#2d6a2d', fontWeight: '900', fontSize: '16px', marginBottom: '16px' }}>{step.points} نقطة</span>
              {step.icon}
            </div>
            {index < steps.length - 1 && (
              <FaArrowLeft style={{ color: '#aaa', fontSize: '20px', flexShrink: 0 }} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}