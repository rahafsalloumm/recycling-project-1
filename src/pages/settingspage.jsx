import { useState } from 'react'
import { FaBell, FaUserCircle, FaLeaf } from 'react-icons/fa'
import Sidebar from '../user/components/cycle/sidebar/sidebar'
import AccountInfoSettings from '../user/components/settings/accountinfosettings/accountinfosettings'
import PasswordSettings from '../user/components/settings/passwordsettings/passwordsettings'
import NotificationSettings from '../user/components/settings/notificationsettings/notificationsettings'
import AboutSettings from '../user/components/settings/aboutsettings/aboutsettings'
import ContactSettings from '../user/components/settings/contactsettings/contactsettings'
import LogoutSettings from '../user/components/settings/logoutsettings/logoutsettings'

export default function SettingsPage() {
  const [activePage, setActivePage] = useState('settings')

  const [user] = useState({
    name: 'رهف محمد',
    email: 'rahaf.mohamed@example.com',
    phone: '+963 95 123 4567',
  })

  const [orderNotifications, setOrderNotifications] = useState(true)
  const [offerNotifications, setOfferNotifications] = useState(true)

  const handleEditClick = () => {
    console.log('فتح تعديل البيانات')
  }

  const handlePasswordSubmit = ({ currentPassword, newPassword }) => {
    console.log('تغيير كلمة المرور', { currentPassword, newPassword })
  }

  const handleTermsClick = () => {
    console.log('عرض شروط الاستخدام')
  }

  const handlePrivacyClick = () => {
    console.log('عرض سياسة الخصوصية')
  }

  const handleContactSupport = () => {
    console.log('تواصل مع الدعم')
  }

  const handleLogout = () => {
    console.log('تسجيل الخروج')
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', direction: 'rtl' }}>

      <Sidebar activePage={activePage} onNavigate={(page) => setActivePage(page)} />

      <div style={{ marginRight: '260px' }}>

        {/* الهيدر */}
        <div style={{ backgroundColor: 'white', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', position: 'sticky', top: 0, zIndex: 50 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ position: 'relative' }}>
              <FaBell style={{ fontSize: '20px', color: '#555' }} />
              <span style={{ position: 'absolute', top: '-6px', right: '-6px', backgroundColor: '#e53e3e', color: 'white', borderRadius: '50%', width: '16px', height: '16px', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>2</span>
            </div>
            <FaUserCircle style={{ fontSize: '28px', color: '#555' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaLeaf style={{ color: '#2d6a2d', fontSize: '20px' }} />
            <span style={{ fontWeight: '900', fontSize: '18px', color: '#2d6a2d' }}>EcoCycle</span>
          </div>
        </div>

        {/* المحتوى */}
        <div style={{ width: '100%', padding: '32px 24px', boxSizing: 'border-box' }}>

          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <h1 style={{ fontSize: '26px', fontWeight: '900', color: '#1a1a1a', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
              الإعدادات ⚙️
            </h1>
            <p style={{ fontSize: '14px', color: '#888' }}>إدارة تفضيلات حسابك</p>
          </div>

          <AccountInfoSettings user={user} onEditClick={handleEditClick} />
          <PasswordSettings onSubmit={handlePasswordSubmit} />
          <NotificationSettings
            orderNotifications={orderNotifications}
offerNotifications={offerNotifications}
            onOrderNotificationsChange={setOrderNotifications}
            onOfferNotificationsChange={setOfferNotifications}
          />
          <AboutSettings appVersion="1.0.0" onTermsClick={handleTermsClick} onPrivacyClick={handlePrivacyClick} />
          <ContactSettings onContactSupport={handleContactSupport} />
          <LogoutSettings onLogout={handleLogout} />

        </div>
      </div>
    </div>
  )
}