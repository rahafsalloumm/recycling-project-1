import { useState } from 'react'

const categories = [
  { label: 'الكل', icon: '⊞' },
  { label: 'تبرعات', icon: '🤝' },
  { label: 'منتجات صديقة للبيئة', icon: '🌿' },
  { label: 'قسائم شراء', icon: '🏷️' },
]

const sortOptions = ['الأحدث', 'الأقل نقاطاً', 'الأكثر نقاطاً']

export default function RewardsNewFilter({ onCategoryChange, onSortChange }) {
  const [selected, setSelected] = useState('الكل')
  const [showSort, setShowSort] = useState(false)
  const [selectedSort, setSelectedSort] = useState('الأحدث')

  const handleCategory = (cat) => {
    setSelected(cat)
    onCategoryChange && onCategoryChange(cat)
  }

  return (
    <div style={{ marginBottom: '24px' }} dir="rtl">
      <h3 style={{ fontWeight: '700', fontSize: '16px', color: '#1a1a1a', marginBottom: '12px' }}>الفئات</h3>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => handleCategory(cat.label)}
              style={{
                padding: '8px 16px',
                borderRadius: '999px',
                border: selected === cat.label ? '2px solid #2d6a2d' : '1px solid #e5e7eb',
                backgroundColor: selected === cat.label ? '#f0f7ee' : 'white',
                color: selected === cat.label ? '#2d6a2d' : '#555',
                fontWeight: selected === cat.label ? '700' : '400',
                fontSize: '13px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* ترتيب حسب */}
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