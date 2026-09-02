 import { useNavigate } from 'react-router-dom'
import { FaHome, FaTruck, FaMapMarkerAlt, FaRecycle, FaGift, FaUser, FaCog, FaSignOutAlt, FaLeaf } from 'react-icons/fa'

const menuItems = [
  { icon: <FaHome />, label: 'لوحة المستخدم', path: 'dashboard', route: '/dashboard' },
  { icon: <FaTruck />, label: 'طلب استلام النفايات', path: 'wastepickup', route: '/wastepickup' },
  { icon: <FaMapMarkerAlt />, label: 'تتبع الطلبات', path: 'tracking', route: '/tracking' },
  { icon: <FaRecycle />, label: 'سجل إعادة التدوير', path: 'recycling', route: '/recycling' },
  { icon: <FaGift />, label: 'المكافآت', path: 'rewards', route: '/rewards-new' },
  { icon: <FaUser />, label: 'الملف الشخصي', path: 'profile', route: '/profile' },
  { icon: <FaCog />, label: 'الإعدادات', path: 'settings', route: '/settings' },
]

export default function Sidebar({ activePage, onNavigate }) {
  const navigate = useNavigate()

  const handleNavigate = (item) => {
    onNavigate(item.path)
    navigate(item.route)
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      width: '260px',
      height: '100%',
      backgroundColor: '#2d6a2d',
      boxShadow: '-2px 0 12px rgba(0,0,0,0.1)',
      zIndex: 100,
      direction: 'rtl',
      display: 'flex',
      flexDirection: 'column',
    }}>

      {/* اللوغو */}
      <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <FaLeaf style={{ color: '#ffffff', fontSize: '24px' }} />
        <span style={{ fontSize: '20px', fontWeight: '900', color: '#ffffff' }}>EcoCycle</span>
      </div>

      {/* المستخدم */}
      <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <FaUser style={{ color: '#ffffff' }} />
        </div>
        <div>
          <p style={{ fontWeight: '700', fontSize: '14px', color: '#ffffff' }}>رهف محمد</p>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>مستخدم</p>
        </div>
      </div>

      {/* القائمة */}
      <div style={{ flex: 1, padding: '12px 0', overflowY: 'auto' }}>
        {menuItems.map((item, i) => (
          <div
            key={i}
            onClick={() => handleNavigate(item)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 20px',
              cursor: 'pointer',
              backgroundColor: activePage === item.path ? 'rgba(255,255,255,0.18)' : 'transparent',
              color: activePage === item.path ? '#ffffff' : 'rgba(255,255,255,0.8)',
              fontWeight: activePage === item.path ? '700' : '400',
              borderRight: activePage === item.path ? '4px solid #ffffff' : '4px solid transparent',
              transition: 'all 0.2s'

            }}
          >
            <span style={{ fontSize: '16px' }}>{item.icon}</span>
            <span style={{ fontSize: '14px' }}>{item.label}</span>
          </div>
        ))}
      </div>

{/* محتوى ديناميكي حسب الصفحة */}
      {activePage === 'dashboard' ? (
        <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.15)', textAlign: 'center' }}>
          <span style={{ fontSize: '36px' }}>🌱</span>
          <h3 style={{ fontWeight: '800', fontSize: '14px', color: '#ffffff', margin: '8px 0 4px' }}>معاً لبيئة أنظف</h3>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)' }}>كل خطوة صغيرة تحدث فرقاً كبيراً</p>
        </div>
      ) : (
        <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.15)', textAlign: 'center' }}>
 <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)', marginBottom: '4px' }}>نقاطك الحالية</p>
          <p style={{ fontSize: '24px', fontWeight: '900', color: '#ffffff' }}>2,450</p>
          <FaLeaf style={{ color: '#ffffff', marginBottom: '8px' }} />
          <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.8)', marginBottom: '8px' }}>استبدل نقاطك بمكافآت رائعة</p>
          <button
            onClick={() => navigate('/rewards-new')}
            style={{ border: '1px solid #ffffff', color: '#ffffff', backgroundColor: 'transparent', borderRadius: '8px', padding: '6px 16px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', width: '100%' }}>
            عرض المكافآت
          </button>
        </div>
      )}

      {/* تسجيل الخروج */}
      <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.15)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ffcccc', cursor: 'pointer' }}>
          <FaSignOutAlt />
          <span style={{ fontSize: '14px', fontWeight: '600' }}>تسجيل الخروج</span>
        </div>
      </div>

    </div>
  )
}