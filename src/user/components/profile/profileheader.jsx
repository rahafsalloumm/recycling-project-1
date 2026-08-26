import { FaCamera, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit } from 'react-icons/fa';

const styles = {
  card: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '16px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  avatarWrap: {
    position: 'relative',
    flexShrink: 0,
  },
  avatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: '#e8f5e9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarPlaceholder: {
    color: '#16a34a',
    fontSize: '32px',
    fontWeight: 700,
  },
  camIcon: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: '#16a34a',
    borderRadius: '50%',
    width: '26px',
    height: '26px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid #fff',
    cursor: 'pointer',
  },
  nameRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '8px',
  },
  name: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#1a1a1a',
  },
  badge: {
    backgroundColor: '#fef9e7',
    color: '#ca8a04',
    fontSize: '12px',
    fontWeight: 600,
    padding: '3px 10px',
    borderRadius: '20px',
  },
  infoRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '13px',
    color: '#6b7280',
    marginTop: '4px',
  },
  editBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    border: '1px solid #16a34a',
    color: '#16a34a',
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '8px 16px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
  },
};

export default function ProfileHeader({ user, onEditClick }) {
  // أول حرف من الاسم كـ fallback إذا ما في صورة
  const initial = user?.name ? user.name.charAt(0) : '؟';

  return (
    <div style={styles.card}>
      <div style={styles.left}>
        <div style={styles.avatarWrap}>
          <div style={styles.avatar}>
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <span style={styles.avatarPlaceholder}>{initial}</span>
            )}
          </div>
          <div style={styles.camIcon}>
            <FaCamera color="#fff" size={12} />
          </div>
        </div>

        <div>
          <div style={styles.nameRow}>
            <span style={styles.name}>{user.name}</span>
            {user.tier && <span style={styles.badge}>{user.tier}</span>}
          </div>
          <div style={styles.infoRow}>
            <FaEnvelope size={12} />
            <span>{user.email}</span>
          </div>
          <div style={styles.infoRow}>
            <FaPhone size={12} />
            <span>{user.phone}</span>
          </div>
          <div style={styles.infoRow}>
            <FaMapMarkerAlt size={12} />
            <span>{user.address}</span>
          </div>
        </div>
      </div>

      <button style={styles.editBtn} onClick={onEditClick}>
        <FaEdit size={14} />
        تعديل البيانات
      </button>
    </div>
  );
}