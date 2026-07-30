import { FaHeadset, FaQuestionCircle } from 'react-icons/fa';

const styles = {
  card: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '20px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
  },
  title: {
    fontSize: '15px',
    fontWeight: 700,
    marginBottom: '4px',
    color: '#1a1a1a',
  },
  desc: {
    fontSize: '12px',
    color: '#9ca3af',
    marginBottom: '14px',
  },
  primaryBtn: {
    width: '100%',
    backgroundColor: '#16a34a',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    padding: '12px',
    fontSize: '14px',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    cursor: 'pointer',
    marginBottom: '10px',
  },
  secondaryBtn: {
    width: '100%',
    backgroundColor: '#fff',
    color: '#1a1a1a',
    border: '1px solid #e5e7eb',
    borderRadius: '10px',
    padding: '12px',
    fontSize: '14px',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    cursor: 'pointer',
  },
};

export default function SupportCard({ onContactSupport, onFaqClick }) {
  return (
    <div style={styles.card}>
      <div style={styles.title}>تحتاج إلى مساعدة؟</div>
      <div style={styles.desc}>نحن هنا لمساعدتك في أي وقت</div>

      <button style={styles.primaryBtn} onClick={onContactSupport}>
        <FaHeadset />
        تواصل مع الدعم
      </button>

      <button style={styles.secondaryBtn} onClick={onFaqClick}>
        <FaQuestionCircle />
        الأسئلة الشائعة
      </button>
    </div>
  );
}