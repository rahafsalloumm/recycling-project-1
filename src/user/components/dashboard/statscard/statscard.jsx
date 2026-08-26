import { useNavigate } from 'react-router-dom'

export default function StatsCard({ icon, value, label, link, linkRoute }) {
  const navigate = useNavigate()

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#f0f7ee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>
          {icon}
        </div>
        <div>
          <p style={{ fontSize: '24px', fontWeight: '900', color: '#1a1a1a' }}>{value}</p>
          <p style={{ fontSize: '13px', color: '#888' }}>{label}</p>
        </div>
      </div>
      {link && (
        <p
          onClick={() => linkRoute && navigate(linkRoute)}
          style={{ fontSize: '13px', color: '#2d6a2d', fontWeight: '600', cursor: 'pointer', marginTop: '4px' }}
        >
          {link}
        </p>
      )}
    </div>
  )
}