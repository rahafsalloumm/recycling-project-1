export default function RewardsNewStats() {
  const stats = [
    { icon: '🌿', value: '2,450', unit: 'نقطة', label: 'رصيد نقاطك', color: '#2d6a2d' },
    { icon: '🏷️', value: '2,450', unit: 'نقطة', label: 'إجمالي النقاط المكتسبة', color: '#7c3aed' },
    { icon: '⏳', value: '3', unit: 'مكافآت', label: 'إجمالي المكافآت المستبدلة', color: '#d97706' },
    { icon: '🎁', value: '12', unit: 'مكافأة', label: 'المكافآت المتاحة', color: '#2563eb' },
  ]

  return (
    <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }} dir="rtl">
      {stats.map((stat, i) => (
        <div key={i} style={{ backgroundColor: 'white', borderRadius: '16px', padding: '20px', flex: 1, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>
            {stat.icon}
          </div>
          <div>
            <p style={{ fontSize: '12px', color: stat.color, fontWeight: '600', marginBottom: '2px' }}>{stat.label}</p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
              <p style={{ fontSize: '24px', fontWeight: '900', color: '#1a1a1a' }}>{stat.value}</p>
              <p style={{ fontSize: '13px', color: '#888' }}>{stat.unit}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}