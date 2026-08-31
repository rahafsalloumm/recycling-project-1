 import { useState } from 'react'
import { FaLock, FaChevronLeft } from 'react-icons/fa'

export default function PasswordSettings({ onSubmit }) {
  const [expanded, setExpanded] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
    fontSize: '13px',
    textAlign: 'right',
    boxSizing: 'border-box',
    outline: 'none',
    fontFamily: 'inherit'
  }

  const handleSubmit = () => {
    const missingField = !currentPassword || !newPassword || !confirmPassword
    if (missingField) {
      alert('الرجاء تعبئة جميع الحقول')
      return
    }
    if (newPassword !== confirmPassword) {
      alert('كلمة المرور الجديدة غير متطابقة')
      return
    }
    onSubmit && onSubmit({ currentPassword, newPassword })
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }

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
            <FaLock style={{ color: 'white', fontSize: '14px' }} />
          </div>
          <div style={{ textAlign: 'right' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1a1a1a', margin: 0, marginBottom: '4px' }}>تغيير كلمة المرور</h3>
            <p style={{ fontSize: '13px', color: '#888', margin: 0 }}>قم بتغيير كلمة المرور الخاصة بحسابك</p>
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

      {/* نموذج تغيير كلمة المرور */}
      {expanded && (
        <>
          <div style={{ height: '1px', backgroundColor: '#f0f0f0', margin: '16px 0' }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <p style={{ fontSize: '12px', color: '#888', marginBottom: '6px' }}>كلمة المرور الحالية</p>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <p style={{ fontSize: '12px', color: '#888', marginBottom: '6px' }}>كلمة المرور الجديدة</p>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <p style={{ fontSize: '12px', color: '#888', marginBottom: '6px' }}>تأكيد كلمة المرور الجديدة</p>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>
 <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '16px' }}>
            <button
              onClick={handleSubmit}
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
              حفظ كلمة المرور
            </button>
          </div>
        </>
      )}
    </div>
  )
}