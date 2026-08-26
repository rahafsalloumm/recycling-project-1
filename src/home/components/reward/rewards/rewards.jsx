import { FaLeaf, FaBolt, FaShoppingCart, FaMobileAlt, FaSeedling, FaMugHot, FaShoppingBag, FaTint } from 'react-icons/fa'
import RewardCard from './rewardcard'

const rewards = [
  { icon: <FaBolt style={{ color: '#f59e0b' }} />, title: 'قسيمة حسم 50% من فاتورة الكهرباء', description: 'خدمات عامة وإعفاءات', points: '1,500' },
  { icon: <FaShoppingCart style={{ color: '#2d6a2d' }} />, title: 'قسيمة شراء مواد غذائية من الجمعيات التعاونية', description: 'قسائم استهلاكية ومدفوعات', points: '1,200' },
  { icon: <FaMobileAlt style={{ color: '#3b82f6' }} />, title: 'تحويل رصيد مالي عبر شام كاش', description: 'قسائم استهلاكية ومدفوعات', points: '1,000' },
  { icon: <FaSeedling style={{ color: '#16a34a' }} />, title: 'نبتة منزلية طبيعية لتنقية الهواء', description: 'منتجات بيئية بديلة', points: '400' },
  { icon: <FaMugHot style={{ color: '#92400e' }} />, title: 'كوب (ماج) حافظ للحرارة والبرودة', description: 'منتجات بيئية بديلة', points: '500' },
  { icon: <FaShoppingBag style={{ color: '#dc2626' }} />, title: 'حقيبة ظهر من قماش معاد تدويره', description: 'منتجات بيئية بديلة', points: '2,500' },
  { icon: <FaTint style={{ color: '#0ea5e9' }} />, title: 'زجاجة مياه ستانلس ستيل', description: 'منتجات بيئية بديلة', points: '1,200' },
]

export default function Rewards() {
  return (
    <div style={{ padding: '32px 16px' }} dir="rtl">
      <h2 style={{ fontSize: '24px', fontWeight: '900', textAlign: 'center', color: '#1a1a1a', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
        <FaLeaf style={{ color: '#2d6a2d' }} />
        استبدل نقاطك بمكافآت رائعة
      </h2>

      {/* الصف الأول - 4 كروت */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
        gap: '16px',
        width: '100%'
      }}>
        {rewards.slice(0, 4).map((reward, i) => (
          <RewardCard key={i} {...reward} />
        ))}
      </div>

      {/* الصف الثاني - 3 كروت بالمنتصف */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '16px',
        marginTop: '16px'
      }}>
        {rewards.slice(4).map((reward, i) => (
          <div key={i} style={{ width: 'calc(25% - 12px)' }}>
            <RewardCard {...reward} />
          </div>
        ))}
      </div>
    </div>
  )
}