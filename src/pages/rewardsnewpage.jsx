 import { useState } from 'react'
import { FaBell, FaUserCircle, FaLeaf } from 'react-icons/fa'
import Sidebar from '../user/components/cycle/sidebar/sidebar'
import RewardsNewStats from '../user/components/rewardsnew/rewardsnewstats/rewardsnewstats'
import RewardsNewFilter from '../user/components/rewardsnew/rewardsnewfilter/rewardsnewfilter'
import RewardsNewCard from '../user/components/rewardsnew/rewardsnewcard/rewardsnewcard'

const allRewards = [
  { title: 'قسيمة شراء', subtitle: 'سوبر ماركت أحمد', points: '1,000', available: 15, badge: 'جديد', category: 'قسائم شراء' },
  { title: 'نبتة داخلية', subtitle: 'صديقة للبيئة', points: '1,200', available: 10, badge: 'جديد', category: 'منتجات صديقة للبيئة' },
  { title: 'زجاجة مياه', subtitle: 'قابلة لإعادة الاستخدام', points: '800', available: 20, badge: 'جديد', category: 'منتجات صديقة للبيئة' },
  { title: 'شنطة قماش', subtitle: 'صديقة للبيئة', points: '900', available: 18, badge: 'جديد', category: 'منتجات صديقة للبيئة' },
  { title: 'غسيل سيارة', subtitle: 'خارجي', points: '1,500', available: 8, badge: 'جديد', category: 'قسائم شراء' },
  { title: 'طقم زراعة', subtitle: 'للمبتدئين', points: '1,300', available: 12, badge: 'جديد', category: 'منتجات صديقة للبيئة' },
  { title: 'تبرع لجمعية', subtitle: 'بيئة', points: '700', available: 'غير محدود', badge: 'الأكثر استبدالاً', category: 'تبرعات' },
  { title: 'قصيمة شراء', subtitle: '50 ريال', points: '1,000', available: 25, badge: 'جديد', category: 'قسائم شراء' },
]

export default function RewardsNewPage() {
  const [activePage, setActivePage] = useState('rewards')
  const [category, setCategory] = useState('الكل')
  const [sort, setSort] = useState('الأحدث')

  const filtered = category === 'الكل' ? allRewards : allRewards.filter(r => r.category === category)

  const sorted = [...filtered].sort((a, b) => {
    const pointsA = parseInt(a.points.replace(',', ''))
    const pointsB = parseInt(b.points.replace(',', ''))
    if (sort === 'الأقل نقاطاً') return pointsA - pointsB
    if (sort === 'الأكثر نقاطاً') return pointsB - pointsA
    return 0
  })

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
          <h1 style={{ fontSize: '26px', fontWeight: '900', color: '#1a1a1a', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
            🎁 المكافآت
          </h1>
          <p style={{ fontSize: '14px', color: '#888', marginBottom: '24px', textAlign: 'center' }}>استبدل نقاطك بمكافآت رائعة وشارك في حماية البيئة</p>

          <RewardsNewStats />
          <RewardsNewFilter onCategoryChange={setCategory} onSortChange={setSort} />
 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {sorted.map((reward, i) => (
              <RewardsNewCard key={i} {...reward} />
            ))}
          </div>

          <div style={{ marginTop: '24px', backgroundColor: '#f0f7ee', borderRadius: '12px', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <FaLeaf style={{ color: '#2d6a2d' }} />
            <span style={{ fontSize: '13px', color: '#2d6a2d' }}>كلما قمت بإعادة تدوير المزيد، حصلت على نقاط أكثر واستبدلتها بمكافآت أفضل!</span>
          </div>

        </div>
      </div>
    </div>
  )
}