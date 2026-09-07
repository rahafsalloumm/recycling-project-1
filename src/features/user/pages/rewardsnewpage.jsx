import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaUserCircle, FaLeaf, FaShoppingBag, FaTint, FaSeedling, FaBoxOpen, FaCoffee, FaTrashRestore } from 'react-icons/fa'
import { FaSolarPanel } from 'react-icons/fa6'
import Sidebar from '../components/sidebar/sidebar/sidebar'
import RewardsNewStats from '../components/rewardsnew/rewardsnewstats/rewardsnewstats'
import RewardsNewFilter from '../components/rewardsnew/rewardsnewfilter/rewardsnewfilter'
import RewardsNewCard from '../components/rewardsnew/rewardsnewcard/rewardsnewcard'
import { rewardsService, userService } from '@/services'

const iconMap = {
  shopping: <FaShoppingBag size={38} className="text-pink-600" />,
  water: <FaTint size={38} className="text-blue-500" />,
  plant: <FaSeedling size={38} className="text-emerald-600" />,
  seeds: <FaLeaf size={38} className="text-emerald-500" />,
  organic: <FaBoxOpen size={38} className="text-amber-600" />,
  coffee: <FaCoffee size={38} className="text-yellow-700" />,
  bags: <FaTrashRestore size={38} className="text-teal-600" />,
  solar: <FaSolarPanel size={38} className="text-cyan-500" />,
}

export default function RewardsNewPage() {
  const navigate = useNavigate()
  const [activePage, setActivePage] = useState('rewards')
  const [sort, setSort] = useState('الأحدث')
  const [rewards, setRewards] = useState([])
  const [points, setPoints] = useState(0)
  const [redeemedCount, setRedeemedCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadRewards = async () => {
      try {
        const [result, profile, claimsResult] = await Promise.all([
          rewardsService.getAvailableRewards(),
          userService.getProfile(),
          rewardsService.getMyClaims(),
        ])
        const items = result?.data?.rewards || result?.rewards || []
        const claims = claimsResult?.data || claimsResult?.claims || []
        setRewards(items)
        setPoints(Number(profile?.points) || 0)
        setRedeemedCount(claims.length)
      } catch (err) {
        setError(err?.message || 'تعذر تحميل المكافآت')
      } finally {
        setLoading(false)
      }
    }

    loadRewards()
  }, [])

  const mappedRewards = rewards.map((reward, index) => {
    const key = ['shopping', 'water', 'plant', 'seeds', 'organic', 'coffee', 'bags', 'solar'][index % 8]
    return {
      id: reward._id || reward.id,
      title: reward.title || 'مكافأة',
      subtitle: reward.category || 'مكافأة صديقة للبيئة',
      points: String(reward.pointsRequired || 0),
      available: reward.stock || 0,
      category: reward.category || 'الكل',
      badge: reward.pointsRequired >= 2000 ? 'الأكثر استبدالاً' : index === 0 ? 'جديد' : undefined,
      icon: iconMap[key] || <FaLeaf size={38} className="text-emerald-500" />,
    }
  })

  const sorted = [...mappedRewards].sort((a, b) => {
    const pointsA = Number(a.points)
    const pointsB = Number(b.points)
    if (sort === 'الأقل نقاطاً') return pointsA - pointsB
    if (sort === 'الأكثر نقاطاً') return pointsB - pointsA
    return 0
  })

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
          <h1 style={{ fontSize: '26px', fontWeight: '900', color: '#1a1a1a', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
            🎁 المكافآت
          </h1>
          <p style={{ fontSize: '14px', color: '#888', marginBottom: '24px', textAlign: 'center' }}>استبدل نقاطك بمكافآت رائعة وشارك في حماية البيئة</p>

          <RewardsNewStats points={points} redeemedCount={redeemedCount} availableCount={rewards.length} />
          <RewardsNewFilter onSortChange={setSort} />

          {loading ? (
            <p style={{ textAlign: 'center', color: '#666' }}>جاري تحميل المكافآت...</p>
          ) : error ? (
            <p style={{ textAlign: 'center', color: 'crimson' }}>{error}</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
              {sorted.map((reward) => (
                <RewardsNewCard
                  key={reward.id}
                  icon={reward.icon}
                  title={reward.title}
                  subtitle={reward.subtitle}
                  points={reward.points}
                  available={reward.available}
                  badge={reward.badge}
                  onSelect={() => navigate('/myrewards', { state: { reward } })}
                />
              ))}
            </div>
          )}

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