import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaUserCircle, FaLeaf } from 'react-icons/fa'
import Sidebar from '../components/sidebar/sidebar/sidebar'
import AccountInfoSettings from '../components/settings/accountinfosettings/accountinfosettings'
import PasswordSettings from '../components/settings/passwordsettings/passwordsettings'
import AboutSettings from '../components/settings/aboutsettings/aboutsettings'
import ContactSettings from '../components/settings/contactsettings/contactsettings'
import LogoutSettings from '../components/settings/logoutsettings/logoutsettings'
import { authService, userService } from '@/services'

export default function SettingsPage() {
  const [activePage, setActivePage] = useState('settings')
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const loadUser = async () => {
      try {
        const profile = await userService.getProfile()
        setUser({
          name: profile?.name || '',
          email: profile?.email || '',
          phone: profile?.phone || '',
        })
      } catch (err) {
        setError(err?.message || 'تعذر تحميل بيانات الحساب')
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [])

  const handlePasswordSubmit = async ({ currentPassword, newPassword }) => {
    try {
      await userService.updateProfile({
        currentPassword,
        newPassword,
        confirmPassword: newPassword,
      })
      alert('تم تغيير كلمة المرور بنجاح')
    } catch (err) {
      alert(err?.message || 'فشل تحديث كلمة المرور')
    }
  }

  const handleContactSupport = () => {
    navigate('/contact')
  }

  const handleProfileSave = async (profileData) => {
    try {
      const result = await userService.updateProfile(profileData)
      setUser((currentUser) => ({ ...currentUser, ...profileData, ...result?.user }))
      alert('تم تحديث معلومات الحساب بنجاح')
    } catch (err) {
      alert(err?.message || 'تعذر تحديث معلومات الحساب')
      throw err
    }
  }

  const handleLogout = () => {
    authService.logout()
    navigate('/login', { replace: true })
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', direction: 'rtl' }}>
      <Sidebar activePage={activePage} onNavigate={(page) => setActivePage(page)} />

      <div style={{ marginRight: '260px' }}>
        <div style={{ backgroundColor: 'white', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', position: 'sticky', top: 0, zIndex: 50 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link to="/profile" aria-label="الملف الشخصي">
              <FaUserCircle style={{ fontSize: '28px', color: '#555', cursor: 'pointer' }} />
            </Link>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaLeaf style={{ color: '#2d6a2d', fontSize: '20px' }} />
            <span style={{ fontWeight: '900', fontSize: '18px', color: '#2d6a2d' }}>EcoCycle</span>
          </div>
        </div>

        <div style={{ width: '100%', padding: '32px 24px', boxSizing: 'border-box' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <h1 style={{ fontSize: '26px', fontWeight: '900', color: '#1a1a1a', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
              الإعدادات ⚙️
            </h1>
            <p style={{ fontSize: '14px', color: '#888' }}>إدارة تفضيلات حسابك</p>
          </div>

          {loading ? (
            <p style={{ textAlign: 'center', color: '#666' }}>جاري تحميل بيانات الحساب...</p>
          ) : error ? (
            <p style={{ textAlign: 'center', color: 'crimson' }}>{error}</p>
          ) : (
            <>
              <AccountInfoSettings user={user} onEditClick={handleProfileSave} />
              <PasswordSettings onSubmit={handlePasswordSubmit} />
              <AboutSettings appVersion="1.0.0" />
              <ContactSettings onContactSupport={handleContactSupport} />
              <LogoutSettings onLogout={handleLogout} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}