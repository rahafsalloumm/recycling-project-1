import { FaBolt, FaShoppingCart, FaSeedling, FaShoppingBag, FaTint, FaLeaf, FaTruck, FaHeart } from 'react-icons/fa'

const iconMap = {
  'قسيمة شراء': <FaShoppingCart style={{ fontSize: '48px', color: '#2d6a2d' }} />,
  'نبتة داخلية': <FaSeedling style={{ fontSize: '48px', color: '#2d6a2d' }} />,
  'زجاجة مياه': <FaTint style={{ fontSize: '48px', color: '#2563eb' }} />,
  'شنطة قماش': <FaShoppingBag style={{ fontSize: '48px', color: '#d97706' }} />,
  'غسيل سيارة': <FaTruck style={{ fontSize: '48px', color: '#555' }} />,
  'طقم زراعة': <FaLeaf style={{ fontSize: '48px', color: '#16a34a' }} />,
  'تبرع لجمعية': <FaHeart style={{ fontSize: '48px', color: '#e53e3e' }} />,
  'قصيمة شراء': <FaBolt style={{ fontSize: '48px', color: '#f59e0b' }} />,
}

export default function RewardsNewCard({ title, subtitle, points, available, badge, badgeColor }) {
  const icon = iconMap[title] || <FaShoppingCart style={{ fontSize: '48px', color: '#2d6a2d' }} />

  const badgeColors = {
    'جديد': { bg: '#2d6a2d', color: 'white' },
    'الأكثر استبدالاً': { bg: '#7c3aed', color: 'white' },
  }

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
        {icon}
      </div>

      {/* المحتوى */}
      <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{ fontWeight: '800', fontSize: '14px', color: '#1a1a1a', marginBottom: '2px' }}>{title}</h3>
        <p style={{ fontSize: '12px', color: '#888', marginBottom: '6px' }}>{subtitle}</p>
        <p style={{ fontSize: '15px', fontWeight: '900', color: '#2d6a2d', marginBottom: '10px' }}>{points} نقطة</p>
        <button style={{ width: '100%', backgroundColor: 'white', color: '#2d6a2d', border: '1.5px solid #2d6a2d', borderRadius: '10px', padding: '8px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', marginBottom: '6px' }}>
          استبدل الآن
        </button>
        <p style={{ fontSize: '11px', color: '#888', textAlign: 'center' }}>متاح: {available}</p>
      </div>
    </div>
  )
}