const styles = {
  card: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '20px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
    marginBottom: '16px',
  },
  title: {
    fontSize: '16px',
    fontWeight: 700,
    marginBottom: '4px',
    color: '#1a1a1a',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 0',
    borderTop: '1px solid #f1f1f1',
    fontSize: '13px',
  },
  label: {
   color: '#1a1a1a',
    fontWeight: 600,
  },
  value: {
    color: '#9ca3af',
   
  },
  active: {
    color: '#16a34a',
    fontWeight: 600,
  },
};

export default function AccountInfoCard({ user }) {
  const rows = [
    { label: 'تاريخ إنشاء الحساب', value: user.createdAt },
    { label: 'اللغة', value: user.language },
    { label: 'طريقة الدفع', value: user.paymentMethod },
    { label: 'حالة الحساب', value: 'نشط', isActive: true },
  ];

  return (
    <div style={styles.card}>
      <div style={styles.title}>معلومات الحساب</div>
      {rows.map((r, i) => (
        <div key={i} style={styles.row}>
          <span style={styles.label}>{r.label}</span>
          <span style={r.isActive ? styles.active : styles.value}>{r.value}</span>
        </div>
      ))}
    </div>
  );
}