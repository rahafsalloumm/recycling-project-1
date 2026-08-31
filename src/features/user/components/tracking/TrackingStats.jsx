import { FaClipboardList, FaHourglassHalf, FaTruck, FaCheckCircle } from 'react-icons/fa'

export default function TrackingStats({ total, underReview, inProgress, completed }) {
  const data = [
    { key: 'total', icon: <FaClipboardList />, color: '#8e44ad', label: 'إجمالي الطلبات', value: total },
    { key: 'review', icon: <FaHourglassHalf />, color: '#b8860b', label: 'قيد المراجعة', value: underReview },
    { key: 'inprogress', icon: <FaTruck />, color: '#1565c0', label: 'قيد التنفيذ', value: inProgress },
    { key: 'completed', icon: <FaCheckCircle />, color: '#2d6a2d', label: 'مكتملة', value: completed },
  ]

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '20px 24px',
      marginBottom: '16px',
      boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
      direction: 'rtl',
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '16px'
    }}>
      {data.map((stat) => (
        <div key={stat.key} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: stat.color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '14px',
            flexShrink: 0
          }}>
            {stat.icon}
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '12px', color: '#888', margin: 0, marginBottom: '2px' }}>{stat.label}</p>
            <p style={{ fontSize: '18px', fontWeight: '900', color: '#1a1a1a', margin: 0 }}>{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  )
}