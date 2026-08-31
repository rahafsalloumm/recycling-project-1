import { useState } from 'react'
import { FaInfoCircle, FaChevronLeft } from 'react-icons/fa'

export default function AboutSettings({ appVersion, onTermsClick, onPrivacyClick }) {
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
            <FaInfoCircle style={{ color: 'white', fontSize: '14px' }} />
          </div>
          <div style={{ textAlign: 'right' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1a1a1a', margin: 0, marginBottom: '4px' }}>عن التطبيق</h3>
            <p style={{ fontSize: '13px', color: '#888', margin: 0 }}>معلومات عن التطبيق وسياسة الخصوصية</p>
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

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '14px', color: '#333' }}>إصدار التطبيق</span>
            <span style={{ fontSize: '13px', fontWeight: '700', color: '#1a1a1a' }}>{appVersion}</span>
          </div>

          <div
            onClick={onTermsClick}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderTop: '1px solid #f0f0f0', cursor: 'pointer' }}
          >
            <span style={{ fontSize: '14px', color: '#333' }}>شروط الاستخدام</span>
            <FaChevronLeft style={{ color: '#aaa', fontSize: '12px' }} />
          </div>

          <div
            onClick={onPrivacyClick}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderTop: '1px solid #f0f0f0', cursor: 'pointer' }}
          >
            <span style={{ fontSize: '14px', color: '#333' }}>سياسة الخصوصية</span>
            <FaChevronLeft style={{ color: '#aaa', fontSize: '12px' }} />
          </div>
        </>
      )}
    </div>
  )
}