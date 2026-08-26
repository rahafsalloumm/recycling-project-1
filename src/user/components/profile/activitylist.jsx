const iconBg = {
  success: '#e8f5e9',
  reward: '#fef9e7',
  order: '#e3f2fd',
  redeem: '#f3e8fd',
  update: '#e8f5e9',
};

const styles = {
  card: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '20px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
  },
  head: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  title: {
    fontSize: '16px',
    fontWeight: 700,
    color: '#1a1a1a',
  },
  link: {
    fontSize: '13px',
    color: '#16a34a',
    cursor: 'pointer',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 0',
    borderTop: '1px solid #f1f1f1',
  },
  iconCircle: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    flexShrink: 0,
  },
  text: {
    flex: 1,
    minWidth: 0,
  },
  itemTitle: {
    fontSize: '13px',
    fontWeight: 600,
    color: '#1a1a1a',
  },
  itemDesc: {
    fontSize: '12px',
    color: '#9ca3af',
    marginTop: '2px',
  },
  time: {
    fontSize: '11px',
    color: '#9ca3af',
    textAlign: 'left',
    flexShrink: 0,
  },
  empty: {
    textAlign: 'center',
    color: '#9ca3af',
    fontSize: '13px',
    padding: '24px 0',
  },
};

export default function ActivityList({ activities = [], onViewAll }) {
  return (
    <div style={styles.card}>
      <div style={styles.head}>
        <span style={styles.title}>آخر الأنشطة</span>
        <span style={styles.link} onClick={onViewAll}>
          عرض الكل
        </span>
      </div>

      {activities.length === 0 ? (
        <div style={styles.empty}>لا يوجد أنشطة حتى الآن</div>
      ) : (
        activities.map((a, i) => (
          <div key={i} style={styles.item}>
            <div style={{ ...styles.iconCircle, backgroundColor: iconBg[a.type] || '#f1f1f1' }}>
              {a.icon}
            </div>
            <div style={styles.text}>
              <div style={styles.itemTitle}>{a.title}</div>
              <div style={styles.itemDesc}>{a.description}</div>
            </div>
            <div style={styles.time}>
              <div>{a.time}</div>
              <div>{a.date}</div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}