export default function NotesInput({ value, onChange }) {
  return (
    <div style={{ direction: 'rtl', marginBottom: '8px' }}>
      <p style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a1a', marginBottom: '8px' }}>ملاحظات (اختياري)</p>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="أي ملاحظات إضافية..."
        rows={3}
        style={{
          width: '100%',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          padding: '10px 12px',
          fontSize: '14px',
          direction: 'rtl',
          resize: 'none',
          boxSizing: 'border-box'
        }}
      />
    </div>
  )
}