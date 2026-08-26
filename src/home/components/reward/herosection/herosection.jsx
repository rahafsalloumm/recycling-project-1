import { FaLeaf } from 'react-icons/fa'
import hero from '../../../../assets/images/hero.jpg'

export default function HeroSection() {
  return (
    <div style={{
      position: 'relative',
      borderRadius: '24px',
      overflow: 'hidden',
      direction: 'rtl',
      minHeight: '320px'
    }}>

      <img src={hero} alt="hero" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'fill',
        zIndex: 0
      }} />

      <div style={{
        position: 'relative',
        zIndex: 1,
        padding: '48px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '24px',
        minHeight: '320px'
      }}>

        {/* يسار - النقاط المتاحة */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#2d6a2d',
            color: 'white',
            borderRadius: '50%',
            width: '120px',
            height: '120px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }}>
            <span style={{ fontSize: '24px', fontWeight: '900' }}>2,450</span>
            <span style={{ fontSize: '11px', textAlign: 'center' }}>نقطة متاحة</span>
            <FaLeaf style={{ fontSize: '14px', marginTop: '4px' }} />
          </div>
        </div>

        {/* وسط - النص */}
        <div style={{ textAlign: 'center', flex: 2 }}>
          <h1 style={{ fontSize: '36px', fontWeight: '900', color: '#1a1a1a', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <FaLeaf style={{ color: '#2d6a2d' }} />
            كافئ نفسك
          </h1>
          <p style={{ color: '#555', fontSize: '16px', marginBottom: '6px' }}>اجمع النقاط مع كل خطوة تخطوها نحو بيئة أنظف</p>
          <p style={{ color: '#888', fontSize: '14px' }}>استبدل نقاطك بمكافآت صديقة للبيئة وحصرية</p>
        </div>

        {/* يمين - كل نقطة تحدث فرقاً */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', paddingBottom: '8px' }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '50%',
            width: '90px',
            height: '90px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
            fontSize: '12px',
            fontWeight: '700',
            color: '#444',
            textAlign: 'center',
            padding: '8px'
          }}>
            كل نقطة تحدث فرقاً
          </div>
        </div>

      </div>
    </div>
  )
}