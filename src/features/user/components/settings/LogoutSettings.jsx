import { FaSignOutAlt } from 'react-icons/fa'

export default function LogoutSettings({ onLogout }) {
  return (
    <div
      onClick={onLogout}
      style={{
        backgroundColor: '#fdeceb',
        borderRadius: '16px',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        cursor: 'pointer',
        direction: 'rtl'
      }}
    >
      <FaSignOutAlt style={{ color: '#e53e3e', fontSize: '16px' }} />
      <span style={{ fontSize: '15px', fontWeight: '700', color: '#e53e3e' }}>تسجيل الخروج</span>
    </div>
  )
}