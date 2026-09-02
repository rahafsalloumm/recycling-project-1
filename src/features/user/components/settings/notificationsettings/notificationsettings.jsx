import { useState } from 'react'
import { FaBell, FaChevronLeft } from 'react-icons/fa'

function ToggleSwitch({ enabled, onToggle }) {
  return (
    <div
      onClick={onToggle}
      style={{
        width: '40px',
        height: '22px',
        borderRadius: '11px',
        backgroundColor: enabled ? '#2d6a2d' : '#ccc',
        position: 'relative',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        flexShrink: 0
      }}
    >
      <div style={{
        width: '18px',
        height: '18px',
        borderRadius: '50%',
        backgroundColor: 'white',
        position: 'absolute',
        top: '2px',
        left: enabled ? '20px' : '2px',
        transition: 'left 0.2s'
      }} />
    </div>
  )
}

export default function NotificationSettings({ orderNotifications, offerNotifications, onOrderNotificationsChange, onOfferNotificationsChange }) {
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
            <FaBell style={{ color: 'white', fontSize: '14px' }} />
          </div>
          <div style={{ textAlign: 'right' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1a1a1a', margin: 0, marginBottom: '4px' }}>الإشعارات</h3>
            <p style={{ fontSize: '13px', color: '#888', margin: 0 }}>إدارة تفضيلات الإشعارات التي تصلك</p>
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

      {/* قائمة الإشعارات */}
      {expanded && (
        <>
          <div style={{ height: '1px', backgroundColor: '#f0f0f0', margin: '16px 0' }} />

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ fontSize: '14px', color: '#333' }}>إشعارات حالة الطلبات</span>
            <ToggleSwitch enabled={orderNotifications} onToggle={() => onOrderNotificationsChange(!orderNotifications)} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '14px', color: '#333' }}>إشعارات المكافآت والعروض</span>
            <ToggleSwitch enabled={offerNotifications} onToggle={() => onOfferNotificationsChange(!offerNotifications)} />
          </div>
        </>
      )}
    </div>
  )
}