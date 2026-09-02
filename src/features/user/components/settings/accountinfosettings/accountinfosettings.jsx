import { useState } from 'react'
import { FaUser, FaChevronLeft } from 'react-icons/fa'

export default function AccountInfoSettings({ user, onEditClick }) {
  const [expanded, setExpanded] = useState(true)

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
            <FaUser style={{ color: 'white', fontSize: '14px' }} />
          </div>
          <div style={{ textAlign: 'right' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1a1a1a', margin: 0, marginBottom: '4px' }}>معلومات الحساب</h3>
            <p style={{ fontSize: '13px', color: '#888', margin: 0 }}>عرض وتعديل معلومات حسابك الشخصية</p>
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

          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '140px', textAlign: 'center' }}>
              <p style={{ fontSize: '12px', color: '#888', marginBottom: '6px' }}>الاسم الكامل</p>
              <p style={{ fontSize: '14px', fontWeight: '700', color: '#1a1a1a' }}>{user.name}</p>
            </div>
            <div style={{ flex: 1, minWidth: '170px', textAlign: 'center' }}>
              <p style={{ fontSize: '12px', color: '#888', marginBottom: '6px' }}>البريد الإلكتروني</p>
              <p style={{ fontSize: '14px', fontWeight: '700', color: '#1a1a1a' }}>{user.email}</p>
            </div>
            <div style={{ flex: 1, minWidth: '140px', textAlign: 'center' }}>
              <p style={{ fontSize: '12px', color: '#888', marginBottom: '6px' }}>رقم الهاتف</p>
              <p style={{ fontSize: '14px', fontWeight: '700', color: '#1a1a1a' }}>{user.phone}</p>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '16px' }}>
            <button
              onClick={onEditClick}
              style={{
                border: '1px solid #2d6a2d',
                color: '#2d6a2d',
                backgroundColor: 'transparent',
                borderRadius: '8px',
                padding: '8px 20px',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              تعديل المعلومات
            </button>
          </div>
        </>
      )}
    </div>
  )
}