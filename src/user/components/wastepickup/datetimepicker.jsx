export default function DateTimePicker({ date, time, onDateChange, onTimeChange }) {
  return (
    <div style={{ direction: 'rtl', marginBottom: '8px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <span style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a1a' }}>📅 الوقت والتاريخ</span>
      </div>
      <div style={{ display: 'flex', gap: '12px' }}>
        <input
          type="date"
          value={date}
          onChange={(e) => onDateChange(e.target.value)}
          style={{
            flex: 1,
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            padding: '8px 12px',
            fontSize: '14px',
            direction: 'rtl'
          }}
        />
        <input
          type="time"
          value={time}
          onChange={(e) => onTimeChange(e.target.value)}
          style={{
            flex: 1,
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            padding: '8px 12px',
            fontSize: '14px'
          }}
        />
      </div>
    </div>
  )
}