import { useState } from 'react'

const sortOptions = ['الأحدث', 'الأقل نقاطاً', 'الأكثر نقاطاً']

export default function RewardsNewFilter({ onSortChange }) {
  const [showSort, setShowSort] = useState(false)
  const [selectedSort, setSelectedSort] = useState('الأحدث')

  return (
    <div style={{ marginBottom: '24px' }} dir="rtl">
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <div style={{ position: 'relative' }}>
          <div
            onClick={() => setShowSort(!showSort)}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '8px 14px', cursor: 'pointer', fontSize: '13px', color: '#555', backgroundColor: 'white' }}
          >
            <span>ترتيب حسب</span>
            <span>{selectedSort}</span>
          </div>
          {showSort && (
            <div style={{ position: 'absolute', top: '40px', left: 0, backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', zIndex: 10, minWidth: '150px', overflow: 'hidden' }}>
              {sortOptions.map((s, i) => (
                <div
                  key={i}
                  onClick={() => { setSelectedSort(s); setShowSort(false); onSortChange && onSortChange(s) }}
                  style={{ padding: '10px 16px', fontSize: '13px', cursor: 'pointer', color: '#444', backgroundColor: selectedSort === s ? '#f0f7ee' : 'white' }}
                >
                  {s}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}