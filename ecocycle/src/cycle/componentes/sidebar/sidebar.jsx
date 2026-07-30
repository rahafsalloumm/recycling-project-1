 import { useNavigate } from 'react-router-dom'
import { FaHome, FaTruck, FaMapMarkerAlt, FaRecycle, FaGift, FaUser, FaCog, FaSignOutAlt, FaLeaf } from 'react-icons/fa'

const menuItems = [
  { icon: <FaHome />, label: 'لوجة المستخدم', path: 'dashboard', route: '/' },
  { icon: <FaTruck />, label: 'طلب استلام النفايات', path: 'wastepickup', route: '/wastepickup' },
  { icon: <FaMapMarkerAlt />, label: 'تتبع الطلبات', path: 'tracking', route: '/' },
  { icon: <FaRecycle />, label: 'سجل إعادة التدوير', path: 'recycling', route: '/recycling' },
  { icon: <FaGift />, label: 'المكافآت', path: 'rewards', route: '/rewards' },
  { icon: <FaUser />, label: 'الملف الشخصي', path: 'profile', route: '/profile' },
  { icon: <FaCog />, label: 'الإعدادات', path: 'settings', route: '/' },
]

export default function Sidebar({ isOpen, activePage, onNavigate }) {
  const navigate = useNavigate()

  const handleNavigate = (item) => {
    onNavigate(item.path)
    navigate(item.route)
  }

  return (
    <>
      {isOpen && (
        <div
          onClick={() => onNavigate(activePage)}
          style={{
            position: 'fixed',
            top: 0, left: 0,
            width: '100%', height: '100%',
            backgroundColor: 'rgba(0,0,0,0.3)',
            zIndex: 99
          }}
        />
      )}

      <div style={{
        position: 'fixed',
        top: 0,
        right: isOpen ? 0 : '-280px',
        width: '260px',
        height: '100%',
        backgroundColor: 'white',
        boxShadow: '-2px 0 12px rgba(0,0,0,0.1)',
        zIndex: 100,
        transition: 'right 0.3s ease',
        direction: 'rtl',
        display: 'flex',
        flexDirection: 'column'
      }}>

        {/* اللوغو */}
        <div style={{ padding: '24px 20px', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FaLeaf style={{ color: '#2d6a2d', fontSize: '24px' }} />
          <span style={{ fontSize: '20px', fontWeight: '900', color: '#2d6a2d' }}>EcoCycle</span>
        </div>

        {/* المستخدم */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#f0f7ee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FaUser style={{ color: '#2d6a2d' }} />
          </div>
          <div>
            <p style={{ fontWeight: '700', fontSize: '14px', color: '#1a1a1a' }}>رهف محمد</p>
            <p style={{ fontSize: '12px', color: '#888' }}>مستخدم</p>
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
                backgroundColor: activePage === item.path ? '#f0f7ee' : 'transparent',
                color: activePage === item.path ? '#2d6a2d' : '#555',
                fontWeight: activePage === item.path ? '700' : '400',
                borderRight: activePage === item.path ? '4px solid #2d6a2d' : '4px solid transparent',
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
          <div style={{ padding: '16px 20px', borderTop: '1px solid #f0f0f0', textAlign: 'center' }}>
 <span style={{ fontSize: '36px' }}>🌱</span>
            <h3 style={{ fontWeight: '800', fontSize: '14px', color: '#1a1a1a', margin: '8px 0 4px' }}>معاً لبيئة أنظف</h3>
            <p style={{ fontSize: '12px', color: '#555' }}>كل خطوة صغيرة تحدث فرقاً كبيراً</p>
          </div>
        ) : (
          <div style={{ padding: '16px 20px', borderTop: '1px solid #f0f0f0', textAlign: 'center' }}>
            <p style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>نقاطك الحالية</p>
            <p style={{ fontSize: '24px', fontWeight: '900', color: '#2d6a2d' }}>2,450</p>
            <FaLeaf style={{ color: '#2d6a2d', marginBottom: '8px' }} />
            <p style={{ fontSize: '11px', color: '#888', marginBottom: '8px' }}>استبدل نقاطك بمكافآت رائعة</p>
            <button
              onClick={() => navigate('/rewards')}
              style={{ border: '1px solid #2d6a2d', color: '#2d6a2d', backgroundColor: 'transparent', borderRadius: '8px', padding: '6px 16px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', width: '100%' }}>
              عرض المكافآت
            </button>
          </div>
        )}

        {/* تسجيل الخروج */}
        <div style={{ padding: '16px 20px', borderTop: '1px solid #f0f0f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#e53e3e', cursor: 'pointer' }}>
            <FaSignOutAlt />
            <span style={{ fontSize: '14px', fontWeight: '600' }}>تسجيل الخروج</span>
          </div>
        </div>

      </div>
    </>
  )
}