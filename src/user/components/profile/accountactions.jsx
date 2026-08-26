import { FaLock, FaBell } from 'react-icons/fa';

const styles = {
  row: {
    display: 'flex',
    gap: '16px',
    margin: '20px 0',
    flexWrap: 'wrap',
  },
  btn: {
    flex: 1,
    minWidth: '200px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    backgroundColor: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: '10px',
    padding: '14px',
    fontSize: '14px',
    fontWeight: 600,
    color: '#1a1a1a',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
};

export default function AccountActions({ onChangePassword, onNotificationSettings }) {
  return (
    <div style={styles.row}>
      <button
        style={styles.btn}
        onClick={onChangePassword}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f9fafb')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#fff')}
      >
        <FaLock color="#6b7280" />
        تغيير كلمة المرور
      </button>

      <button
        style={styles.btn}
        onClick={onNotificationSettings}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f9fafb')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#fff')}
      >
        <FaBell color="#6b7280" />
        تفضيلات الإشعارات
      </button>
    </div>
  );
}