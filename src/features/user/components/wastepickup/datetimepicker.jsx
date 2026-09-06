import { useRef } from 'react'

const formatDateForDisplay = (date) => {
  if (!date) return ''

  const [year, month, day] = date.split('-')
  return `${day}/${month}/${year}`
}

export default function DateTimePicker({ date, time, onDateChange, onTimeChange }) {
  const dateInputRef = useRef(null)

  const openDatePicker = () => {
    if (typeof dateInputRef.current?.showPicker === 'function') {
      dateInputRef.current.showPicker()
    } else {
      dateInputRef.current?.click()
    }
  }

  return (
    <div style={{ direction: 'rtl', marginBottom: '8px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <span style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a1a' }}>📅 الوقت والتاريخ</span>
      </div>
      <div style={{ display: 'flex', gap: '12px' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <input
            type="text"
            value={formatDateForDisplay(date)}
            placeholder="dd/mm/yyyy"
            readOnly
            required
            onClick={openDatePicker}
            aria-label="التاريخ"
            style={{
              width: '100%',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '8px 12px',
              fontSize: '14px',
              direction: 'rtl',
              boxSizing: 'border-box',
              cursor: 'pointer'
            }}
          />
          <input
            ref={dateInputRef}
            type="date"
            value={date}
            required
            onChange={(e) => onDateChange(e.target.value)}
            tabIndex="-1"
            aria-hidden="true"
            style={{ position: 'absolute', inset: 0, opacity: 0, pointerEvents: 'none' }}
          />
        </div>
        <input
          type="time"
          value={time}
          required
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