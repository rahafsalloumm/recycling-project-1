 import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaBell, FaUserCircle, FaLeaf, FaShoppingBag, FaTint, FaSeedling, FaBoxOpen, FaCoffee, FaTrashRestore } from 'react-icons/fa'
import { FaSolarPanel } from 'react-icons/fa6'
import Sidebar from '../components/sidebar/sidebar/sidebar'
import RewardsNewStats from '../components/rewardsnew/rewardsnewstats/rewardsnewstats'
import RewardsNewFilter from '../components/rewardsnew/rewardsnewfilter/rewardsnewfilter'
import RewardsNewCard from '../components/rewardsnew/rewardsnewcard/rewardsnewcard'

const allRewards = [
  { icon: <FaShoppingBag size={38} className="text-pink-600" />, title: "شنطة قماش", subtitle: "صديقة للبيئة وخفيفة للتوصيل", points: "900" },
  { icon: <FaTint size={38} className="text-blue-500" />, title: "زجاجة مياه مخصصة", subtitle: "مقاومة للصدأ وقابلة لإعادة الاستخدام", points: "800" },
  { icon: <FaSeedling size={38} className="text-emerald-600" />, title: "نبتة داخلية صغيرة", subtitle: "في أصيص بلاستيكي آمن للنقل", points: "1,200" },
  { icon: <FaLeaf size={38} className="text-emerald-500" />, title: "طقم بذور زراعية", subtitle: "مجموعة بذور سريعة النمو في الميدان", points: "1,100" },
  { icon: <FaBoxOpen size={38} className="text-amber-600" />, title: "صندوق سماد عضوي", subtitle: "عبوة مغلفة مخصصة للحدائق المنزلية", points: "1,400" },
  { icon: <FaCoffee size={38} className="text-yellow-700" />, title: "كوب حراري حافظ", subtitle: "مصنوع من مواد معاد تدويرها", points: "1,000" },
  /* 📌 الجائزة الجديدة الأولى */
  { icon: <FaTrashRestore size={38} className="text-teal-600" />, title: "أكياس فرز منزلية", subtitle: "طقم أكياس ملونة وقابلة لإعادة الاستخدام", points: "600" },
  /* 📌 الجائزة الجديدة الثانية */
  { icon: <FaSolarPanel size={38} className="text-cyan-500" />, title: "شاحن طاقة شمسي", subtitle: "شاحن محمول للأجهزة الذكية عبر الشمس", points: "3,500" }
]

export default function RewardsNewPage() {
  const navigate = useNavigate()
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

          <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center' }}>
            <button
              onClick={() => navigate('/myrewards')}
              style={{
                backgroundColor: '#2d6a2d',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                padding: '12px 32px',
                fontSize: '15px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              مكافآتي
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}