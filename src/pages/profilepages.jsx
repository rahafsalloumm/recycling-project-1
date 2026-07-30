 import { useState } from 'react'
import { FaBars, FaBell, FaUserCircle, FaLeaf } from 'react-icons/fa'
import Sidebar from '../cycle/componentes/sidebar/sidebar'
import StatsCard from '../dashboard/componentes/statscard/statscard'
import ProfileHeader from '../profile/components/profileheader'
import AccountActions from '../profile/components/accountactions'
import ActivityList from '../profile/components/activitylist'
import AccountInfoCard from '../profile/components/accountinfocard'
import SupportCard from '../profile/components/supportcard'

export default function ProfilePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activePage, setActivePage] = useState('profile')

  const user = {
    name: 'رهف محمد',
    email: 'rahaf.mohamed@example.com',
    phone: '+963 95 123 4567',
    address: 'سوريا، حلب الفيض ',
    avatarUrl: '',
    tier: 'عضو ذهبي',
    tierDate: '15/12/2024',
    totalOrders: 18,
    totalRecycled: '126 كغ',
    points: '2,450',
    createdAt: '01/03/2024',
    language: 'العربية',
    paymentMethod: 'محفظة إلكترونية',
    activities: [
      { type: 'success', icon: '✅', title: 'تم إكمال طلب استلام النفايات', description: 'تم استلام 5 كغ من البلاستيك', time: '10:30 AM', date: '20/05/2024' },
      { type: 'reward', icon: '⭐', title: 'تم الحصول على نقاط مكافأة', description: 'تم إضافة 50 نقطة إلى رصيدك', time: '09:15 AM', date: '18/05/2024' },
      { type: 'order', icon: '🚚', title: 'تم تقديم طلب جديد', description: 'طلب استلام نفايات منزلية', time: '02:45 PM', date: '15/05/2024' },
      { type: 'redeem', icon: '🎁', title: 'تم استبدال النقاط بمكافأة', description: 'قسيمة خصم بقيمة 5 دنانير', time: '11:20 AM', date: '10/05/2024' },
      { type: 'update', icon: '👤', title: 'تم تحديث البيانات الشخصية', description: 'تم تحديث رقم الهاتف', time: '04:10 PM', date: '05/05/2024' },
    ],
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', direction: 'rtl' }}>

      <Sidebar
        isOpen={sidebarOpen}
        activePage={activePage}
        onNavigate={(page) => { setActivePage(page); setSidebarOpen(false) }}
      />

      <div style={{ marginRight: sidebarOpen ? '260px' : '0', transition: 'margin-right 0.3s ease' }}>

        {/* الهيدر */}
        <div style={{ backgroundColor: 'white', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', position: 'sticky', top: 0, zIndex: 50 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <FaBars onClick={() => setSidebarOpen(!sidebarOpen)} style={{ fontSize: '22px', color: '#555', cursor: 'pointer' }} />
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

          {/* العنوان */}
          <div style={{ marginBottom: '24px', textAlign: 'right' }}>
            <h1 style={{ fontSize: '26px', fontWeight: '900', color: '#1a1a1a', marginBottom: '4px' }}>الملف الشخصي</h1>
            <p style={{ fontSize: '14px', color: '#888' }}>إدارة معلوماتك الشخصية ومتابعة نشاطك</p>
          </div>
 {/* بطاقة الملف الشخصي */}
          <div style={{ marginBottom: '24px' }}>
            <ProfileHeader user={user} onEditClick={() => console.log('فتح تعديل البيانات')} />
          </div>

          {/* الإحصائيات */}
          <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
            <StatsCard icon="📋" value={user.totalOrders} label="إجمالي الطلبات" link="عرض الكل" linkRoute="/wastepickup" />
            <StatsCard icon="♻️" value={user.totalRecycled} label="إجمالي النفايات المعاد تدويرها" link="عرض التفاصيل" linkRoute="/recycling" />
            <StatsCard icon="⭐️" value={user.points} label="نقاط المكافآت" link="عرض المكافآت" linkRoute="/rewards" />
            <StatsCard icon="🏅" value={user.tier} label="مستوى العضوية" link={user.tierDate} linkRoute="/profile" />
          </div>

          {/* الإجراءات */}
          <div style={{ marginBottom: '24px' }}>
            <AccountActions
              onChangePassword={() => console.log('تغيير كلمة المرور')}
              onNotificationSettings={() => console.log('تفضيلات الإشعارات')}
            />
          </div>

          {/* الأنشطة ومعلومات الحساب */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <div style={{ flex: '2', minWidth: '300px' }}>
              <ActivityList activities={user.activities} onViewAll={() => console.log('عرض كل الأنشطة')} />
            </div>
            <div style={{ flex: '1', minWidth: '260px' }}>
              <div style={{ marginBottom: '16px' }}>
                <AccountInfoCard user={user} />
              </div>
              <SupportCard
                onContactSupport={() => console.log('تواصل مع الدعم')}
                onFaqClick={() => console.log('الأسئلة الشائعة')}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}