import { useState } from 'react'
import { FaHeadset, FaChevronLeft } from 'react-icons/fa'

export default function ContactSettings({ onContactSupport }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '20px',
      marginBottom: '16px',
      boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
      direction: 'rtl'
    }}>

      {/* الهيدر */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#2d6a2d',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <FaHeadset style={{ color: 'white', fontSize: '14px' }} />
          </div>
          <div style={{ textAlign: 'right' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1a1a1a', margin: 0, marginBottom: '4px' }}>تواصل معنا</h3>
            <p style={{ fontSize: '13px', color: '#888', margin: 0 }}>تحتاج إلى مساعدة؟ تواصل مع فريق الدعم</p>
          </div>
        </div>

        <FaChevronLeft
          onClick={() => setExpanded(!expanded)}
          style={{
            color: '#aaa',
            fontSize: '13px',
            cursor: 'pointer',
            marginTop: '8px',
            transform: expanded ? 'rotate(-90deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s'
          }}
        />
      </div>

      {/* التفاصيل */}
      {expanded && (
        <>
          <div style={{ height: '1px', backgroundColor: '#f0f0f0', margin: '16px 0' }} />

          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <button
              onClick={onContactSupport}
              style={{
                border: 'none',
                color: 'white',
                backgroundColor: '#2d6a2d',
                borderRadius: '8px',
                padding: '8px 20px',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              تواصل مع الدعم
            </button>
          </div>
        </>
      )}
    </div>
  )
}