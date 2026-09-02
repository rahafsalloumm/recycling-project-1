export default function WeightInput({ value, onChange }) {
  return (
    <div style={{ direction: 'rtl', marginBottom: '8px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <span style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a1a' }}>⚖️ الوزن التقريبي</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min="1"
          style={{
            flex: 1,
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            padding: '8px 12px',
            fontSize: '14px',
            direction: 'rtl'
          }}
        />
        <span style={{ fontSize: '14px', fontWeight: '600', color: '#555' }}>كغ</span>
      </div>
    </div>
  )
}