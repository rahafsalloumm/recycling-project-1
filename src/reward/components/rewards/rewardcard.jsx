export default function RewardCard({ icon, title, description, points }) {
  return (
    <div style={{
      borderRadius: '16px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      backgroundColor: 'white',
      width: '100%'
    }} dir="rtl">

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '120px',
        backgroundColor: '#f0f7ee',
        fontSize: '56px'
      }}>
        {icon}
      </div>

      <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{ fontWeight: '900', color: '#1a1a1a', fontSize: '13px', marginBottom: '4px' }}>{title}</h3>
        <p style={{ color: '#888', fontSize: '11px', marginBottom: '8px', flex: 1 }}>{description}</p>
        <p style={{ color: '#2d6a2d', fontWeight: '900', fontSize: '14px', marginBottom: '8px' }}>{points} نقطة</p>
        <button style={{
          backgroundColor: '#2d6a2d',
          color: 'white',
          border: 'none',
          borderRadius: '10px',
          padding: '8px',
          fontSize: '13px',
          fontWeight: '700',
          cursor: 'pointer',
          width: '100%'
        }}>استبدل الآن</button>
      </div>
    </div>
  )
}