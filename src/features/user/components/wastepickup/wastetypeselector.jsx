const wasteTypes = [
  { id: 'plastic', label: 'بلاستيك', emoji: '🍶' },
  { id: 'glass', label: 'زجاج', emoji: '🍾' },
  { id: 'metal', label: 'معادن', emoji: '🥫' },
  { id: 'paper', label: 'ورق', emoji: '📦' },
]

export default function WasteTypeSelector({ selected, onSelect }) {
  return (
    <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '20px', marginBottom: '16px', direction: 'rtl' }}>
      <h3 style={{ fontWeight: '700', fontSize: '16px', marginBottom: '16px', color: '#1a1a1a' }}>نوع النفايات</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
        {wasteTypes.map((type) => (
          <div
            key={type.id}
            onClick={() => onSelect(type.id)}
            style={{
              border: selected === type.id ? '2px solid #2d6a2d' : '2px solid #e5e7eb',
              borderRadius: '12px',
              padding: '16px 8px',
              textAlign: 'center',
              cursor: 'pointer',
              position: 'relative',
              backgroundColor: selected === type.id ? '#f0f7ee' : 'white',
              transition: 'all 0.2s'
            }}
          >
            {selected === type.id && (
              <div style={{
                position: 'absolute',
                top: '6px',
                left: '6px',
                backgroundColor: '#2d6a2d',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '12px'
              }}>✓</div>
            )}
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>{type.emoji}</div>
            <p style={{ fontSize: '13px', fontWeight: '600', color: selected === type.id ? '#2d6a2d' : '#555' }}>{type.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}