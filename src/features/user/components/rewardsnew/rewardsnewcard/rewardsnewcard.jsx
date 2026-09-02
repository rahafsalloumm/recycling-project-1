import { useNavigate } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa'

const badgeColors = {
  'جديد': { bg: '#2d6a2d', color: 'white' },
  'الأكثر استبدالاً': { bg: '#7c3aed', color: 'white' },
}

export default function RewardsNewCard({ icon, title, subtitle, points, available, badge }) {
  const navigate = useNavigate()

  // لو ما وصلت أيقونة من البيانات، استخدمي عربة تسوق كافتراضي
  const displayIcon = icon || <FaShoppingCart style={{ fontSize: '48px', color: '#2d6a2d' }} />

  const badgeStyle = badgeColors[badge] || { bg: '#2d6a2d', color: 'white' }

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column' }} dir="rtl">

      {/* الأيقونة */}
      <div style={{ position: 'relative', backgroundColor: '#f0f7ee', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {badge && (
          <span style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: badgeStyle.bg, color: badgeStyle.color, fontSize: '11px', fontWeight: '700', padding: '3px 10px', borderRadius: '6px' }}>
            {badge}
          </span>
        )}
        {displayIcon}
      </div>

      {/* المحتوى */}
      <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{ fontWeight: '800', fontSize: '14px', color: '#1a1a1a', marginBottom: '2px' }}>{title}</h3>
        <p style={{ fontSize: '12px', color: '#888', marginBottom: '6px' }}>{subtitle}</p>
        <p style={{ fontSize: '15px', fontWeight: '900', color: '#2d6a2d', marginBottom: '10px' }}>{points} نقطة</p>
        <button
          onClick={() => navigate('/myrewards')}
          style={{ width: '100%', backgroundColor: 'white', color: '#2d6a2d', border: '1.5px solid #2d6a2d', borderRadius: '10px', padding: '8px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', marginBottom: '6px' }}
        >
          استبدل الآن
        </button>
        <p style={{ fontSize: '11px', color: '#888', textAlign: 'center' }}>متاح: {available}</p>
      </div>
    </div>
  )
}