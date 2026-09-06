export default function RecyclingStats({ stats: recyclingStats = {} }) {
  const stats = [
    { icon: '♻️', value: recyclingStats.totalWeightKg ?? 0, unit: 'كغ', label: 'إجمالي النفايات المعاد تدويرها' },
    { icon: '🍶', value: recyclingStats.totalCompletedOps ?? 0, unit: 'مرة', label: 'إجمالي عمليات إعادة التدوير' },
    { icon: '⭐', value: recyclingStats.currentPoints ?? 0, unit: 'نقطة', label: 'إجمالي النقاط المكتسبة' },
    { icon: '📊', value: recyclingStats.averageWeightPerOp ?? 0, unit: 'كغ', label: 'متوسط النفايات لكل عملية' },
  ]

  return (
    <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
      {stats.map((stat, i) => (
        <div key={i} style={{ backgroundColor: 'white', borderRadius: '16px', padding: '20px', flex: 1, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#f0f7ee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>
            {stat.icon}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
              <p style={{ fontSize: '24px', fontWeight: '900', color: '#1a1a1a' }}>{stat.value}</p>
              <p style={{ fontSize: '14px', color: '#888' }}>{stat.unit}</p>
            </div>
            <p style={{ fontSize: '12px', color: '#888' }}>{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  )
}