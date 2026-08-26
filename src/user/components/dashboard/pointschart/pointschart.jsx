import { useNavigate } from 'react-router-dom'
import { FaLeaf, FaGift } from 'react-icons/fa'

export default function PointsChart({ points = 650, target = 1000 }) {
  const navigate = useNavigate()
  const percentage = Math.min((points / target) * 100, 100)
  const radius = 60
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '20px', flex: 1, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', textAlign: 'center' }} dir="rtl">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <FaLeaf style={{ color: '#2d6a2d' }} />
        <h3 style={{ fontWeight: '800', fontSize: '16px', color: '#1a1a1a' }}>نقاطك هذا الشهر</h3>
      </div>

      <div style={{ position: 'relative', display: 'inline-block' }}>
        <svg width="150" height="150" viewBox="0 0 150 150">
          <circle cx="75" cy="75" r={radius} fill="none" stroke="#f0f0f0" strokeWidth="12" />
          <circle cx="75" cy="75" r={radius} fill="none" stroke="#2d6a2d" strokeWidth="12"
            strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
            strokeLinecap="round" transform="rotate(-90 75 75)" />
        </svg>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
          <p style={{ fontSize: '24px', fontWeight: '900', color: '#1a1a1a' }}>{points}</p>
          <p style={{ fontSize: '12px', color: '#888' }}>نقطة</p>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '12px' }}>
        <FaGift style={{ color: '#2d6a2d' }} />
        <p style={{ fontSize: '13px', color: '#555' }}>من {target.toLocaleString()} نقطة للحصول على مكافأة</p>
      </div>

      <button
        onClick={() => navigate('/rewards')}
        style={{ width: '100%', backgroundColor: '#2d6a2d', color: 'white', border: 'none', borderRadius: '10px', padding: '10px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', marginTop: '12px' }}>
        عرض المكافآت
      </button>
    </div>
  )
}