import { useState } from 'react'
import { FaFilter, FaCalendarAlt, FaChevronDown } from 'react-icons/fa'

const periods = ['جميع الفترات', 'هذا الشهر', 'آخر 3 أشهر', 'هذا العام']

export default function RecyclingFilter({ onFilterChange, onPeriodChange }) {
  const [showPeriod, setShowPeriod] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState('جميع الفترات')
  const [showFilter, setShowFilter] = useState(false)

  const handlePeriod = (period) => {
    setSelectedPeriod(period)
    setShowPeriod(false)
    onPeriodChange && onPeriodChange(period)
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }} dir="rtl">

      {/* يمين - جميع الفترات */}
      <div style={{ position: 'relative' }}>
        <div
          onClick={() => setShowPeriod(!showPeriod)}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '8px 14px', cursor: 'pointer', fontSize: '14px', color: '#555' }}
        >
          <FaCalendarAlt style={{ fontSize: '12px' }} />
          <span>{selectedPeriod}</span>
          <FaChevronDown style={{ fontSize: '10px' }} />
        </div>
        {showPeriod && (
          <div style={{ position: 'absolute', top: '40px', right: 0, backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', zIndex: 10, minWidth: '150px', overflow: 'hidden' }}>
            {periods.map((p, i) => (
              <div key={i} onClick={() => handlePeriod(p)} style={{ padding: '10px 16px', fontSize: '13px', cursor: 'pointer', color: '#444', backgroundColor: selectedPeriod === p ? '#f0f7ee' : 'white' }}>
                {p}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* يسار - فلتر */}
      <div style={{ position: 'relative' }}>
        <div
          onClick={() => setShowFilter(!showFilter)}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '8px 14px', cursor: 'pointer', fontSize: '14px', color: '#555' }}
        >
          <FaFilter style={{ fontSize: '12px' }} />
          <span>فلتر</span>
          <FaChevronDown style={{ fontSize: '10px' }} />
        </div>
        {showFilter && (
          <div style={{ position: 'absolute', top: '40px', left: 0, backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', zIndex: 10, minWidth: '150px', overflow: 'hidden' }}>
            {['بلاستيك', 'زجاج', 'معادن', 'ورق', 'الكل'].map((f, i) => (
              <div key={i} onClick={() => { onFilterChange && onFilterChange(f); setShowFilter(false) }} style={{ padding: '10px 16px', fontSize: '13px', cursor: 'pointer', color: '#444' }}>
                {f}
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}