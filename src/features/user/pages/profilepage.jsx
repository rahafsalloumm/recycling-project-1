import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaUserCircle, FaLeaf } from 'react-icons/fa'
import Sidebar from '../components/sidebar/sidebar/sidebar'
import StatsCard from '../components/dashboard/statscard/statscard'
import ProfileHeader from '../components/profile/profileheader'
import AccountActions from '../components/profile/accountactions'
import ActivityList from '../components/profile/activitylist'
import AccountInfoCard from '../components/profile/accountinfocard'
import SupportCard from '../components/profile/supportcard'
import PasswordSettings from '../components/settings/passwordsettings/passwordsettings'
import { userService } from '@/services'

export default function ProfilePage() {
  const navigate = useNavigate()
  const [activePage, setActivePage] = useState('profile')
  const [user, setUser] = useState(null)
  const [stats, setStats] = useState(null)
  const [showPasswordSettings, setShowPasswordSettings] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const handlePasswordSubmit = async ({ currentPassword, newPassword }) => {
    try {
      await userService.updateProfile({
        currentPassword,
        newPassword,
        confirmPassword: newPassword,
      })
      alert('تم تغيير كلمة المرور بنجاح')
    } catch (err) {
      alert(err?.message || 'فشل تغيير كلمة المرور')
      throw err
    }
  }

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const [profileData, dashboardStats] = await Promise.all([
          userService.getProfile(),
          userService.getDashboardStats(),
        ])

        setUser(profileData)
        setStats(dashboardStats?.data || dashboardStats)
      } catch (err) {
        setError(err?.message || 'تعذر تحميل الملف الشخصي')
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [])

  const recentActivities = (stats?.userDashboardPage?.recentRequests || []).slice(0, 4).map((request) => ({
    type: 'success',
    icon: '♻️',
    title: `طلب ${request.wasteType || 'نفايات'}`,
    description: `${request.address || 'لا يوجد عنوان'} • ${request.quantity || '0 كغ'}`,
    time: request.status || 'قيد المراجعة',
    date: request.date || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }),
  }))

  const profileUser = user ? {
    name: user.name || 'مستخدم',
    email: user.email || '',
    phone: user.phone || '',
    address: user.address || 'لا يوجد عنوان',
    avatarUrl: user.image?.url || '',
    tier: 'عضو ذهبي',
    tierDate: '15/12/2024',
    totalOrders: stats?.userDashboardPage?.totalRequests || 0,
    totalRecycled: `${stats?.recyclingHistoryPage?.totalWeightKg ?? 0} كغ`,
    points: stats?.userDashboardPage?.currentPoints ?? 0,
    createdAt: user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }) : 'غير متوفر',
    activities: recentActivities.length > 0 ? recentActivities : [
      { type: 'success', icon: '✅', title: 'لا توجد أنشطة حديثة', description: 'سيظهر هنا آخر طلباتك فور إرسالها', time: 'الآن', date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }) },
    ],
  } : {
    name: '...',
    email: '',
    phone: '',
    address: '',
    avatarUrl: '',
    tier: 'عضو ذهبي',
    tierDate: '15/12/2024',
    totalOrders: 0,
    totalRecycled: '0 كغ',
    points: 0,
    createdAt: 'غير متوفر',
    activities: [],
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
          <div style={{ marginBottom: '24px', textAlign: 'right' }}>
            <h1 style={{ fontSize: '26px', fontWeight: '900', color: '#1a1a1a', marginBottom: '4px' }}>الملف الشخصي</h1>
            <p style={{ fontSize: '14px', color: '#888' }}>إدارة معلوماتك الشخصية ومتابعة نشاطك</p>
          </div>

          {loading ? (
            <p style={{ textAlign: 'center', color: '#666' }}>جاري تحميل الملف الشخصي...</p>
          ) : error ? (
            <p style={{ textAlign: 'center', color: 'crimson' }}>{error}</p>
          ) : (
            <>
              <div style={{ marginBottom: '24px' }}>
                <ProfileHeader user={profileUser} onEditClick={() => console.log('فتح تعديل البيانات')} />
              </div>

              <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
                <StatsCard icon="📋" value={profileUser.totalOrders} label="إجمالي الطلبات" link="عرض الكل" linkRoute="/wastepickup" />
                <StatsCard icon="♻️" value={profileUser.totalRecycled} label="إجمالي النفايات المعاد تدويرها" link="عرض التفاصيل" linkRoute="/recycling" />
                <StatsCard icon="⭐️" value={profileUser.points} label="نقاط المكافآت" link="عرض المكافآت" linkRoute="/rewardsnew" />
                <StatsCard icon="🏅" value={profileUser.tier} label="مستوى العضوية" link={profileUser.tierDate} linkRoute="/profile" />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <AccountActions onChangePassword={() => setShowPasswordSettings(true)} />
                {showPasswordSettings && (
                  <PasswordSettings onSubmit={handlePasswordSubmit} initiallyExpanded />
                )}
              </div>

              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                <div style={{ flex: '2', minWidth: '300px' }}>
                  <ActivityList activities={profileUser.activities} onViewAll={() => navigate('/wastepickup')} />
                </div>
                <div style={{ flex: '1', minWidth: '260px' }}>
                  <div style={{ marginBottom: '16px' }}>
                    <AccountInfoCard user={profileUser} />
                  </div>
                  <SupportCard onContactSupport={() => navigate('/contact')} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}