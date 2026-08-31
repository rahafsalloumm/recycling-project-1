import { useNavigate } from 'react-router-dom'
import { FaHome, FaTruck, FaMapMarkerAlt, FaRecycle, FaGift, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa'

const menuItems = [
  { icon: <FaHome />, label: 'لوحة المستخدم', path: 'dashboard', route: '/dashboard' },
  { icon: <FaTruck />, label: 'طلب استلام النفايات', path: 'wastepickup', route: '/wastepickup' },
  { icon: <FaMapMarkerAlt />, label: 'تتبع الطلبات', path: 'tracking', route: '/tracking' },
  { icon: <FaRecycle />, label: 'سجل إعادة التدوير', path: 'tracking', route: '/tracking' },
  { icon: <FaGift />, label: 'المكافآت', path: 'tracking', route: '/tracking' },
  { icon: <FaUser />, label: 'الملف الشخصي', path: 'settings', route: '/settings' },
  { icon: <FaCog />, label: 'الإعدادات', path: 'settings', route: '/settings' },
]

export default function Sidebar({ activePage, onNavigate }) {
  const navigate = useNavigate()

  const handleNavigate = (item) => {
    if (onNavigate) {
      onNavigate(item.path)
    }
    navigate(item.route)
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      height: '100vh',
      width: '260px',
      backgroundColor: '#ffffff',
      boxShadow: '-2px 0 10px rgba(0,0,0,0.05)',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
      boxSizing: 'border-box',
      zIndex: 1000
    }}>
      {/* الشعار */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '30px', padding: '0 10px' }}>
        <span style={{ color: '#2e7d32', fontSize: '24px', fontWeight: 'bold' }}>EcoCycle</span>
        <FaRecycle style={{ color: '#2e7d32', fontSize: '24px' }} />
      </div>

      {/* معلومات المستخدم */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        backgroundColor: '#f8f9fa', 
        padding: '12px', 
        borderRadius: '12px',
        marginBottom: '25px'
      }}>
        <div>
          <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#333' }}>رهف محمد</div>
          <div style={{ fontSize: '12px', color: '#777' }}>مستخدم</div>
        </div>
        <div style={{ 
          width: '35px', 
          height: '35px', 
          borderRadius: '50%', 
          backgroundColor: '#e8f5e9', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: '#2e7d32'
        }}>
          <FaUser />
        </div>
      </div>

      {/* عناصر القائمة */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {menuItems.map((item, index) => {
          const isActive = activePage === item.path
          return (
            <button
              key={index}
              onClick={() => handleNavigate(item)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: '100%',
                padding: '12px 15px',
                border: 'none',
                borderRadius: '10px',
                backgroundColor: isActive ? '#e8f5e9' : 'transparent',
                color: isActive ? '#2e7d32' : '#555',
                fontWeight: isActive ? 'bold' : 'normal',
                cursor: 'pointer',
                textAlign: 'right',
                direction: 'rtl',
                transition: 'all 0.2s ease'
              }}
            >
              <span style={{ fontSize: '18px', display: 'flex', alignItems: 'center' }}>{item.icon}</span>
              <span style={{ fontSize: '14px' }}>{item.label}</span>
            </button>
          )
        })}
      </div>

      {/* زر تسجيل الخروج */}
      <button style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        width: '100%',
        padding: '12px 15px',
        border: 'none',
        borderRadius: '10px',
        backgroundColor: 'transparent',
        color: '#d32f2f',
        cursor: 'pointer',
        textAlign: 'right',
        direction: 'rtl',
        marginTop: 'auto'
      }}>
        <span style={{ fontSize: '18px', display: 'flex', alignItems: 'center' }}><FaSignOutAlt /></span>
        <span style={{ fontSize: '14px', fontWeight: 'bold' }}>تسجيل الخروج</span>
      </button>
    </div>
  )
}
