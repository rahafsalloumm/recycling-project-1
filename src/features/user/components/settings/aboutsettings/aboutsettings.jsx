import { useState } from 'react'
import { FaInfoCircle, FaChevronLeft } from 'react-icons/fa'

export default function AboutSettings({ appVersion, onTermsClick, onPrivacyClick }) {
  const [expanded, setExpanded] = useState(false)
  const [documentType, setDocumentType] = useState(null)

  const documents = {
    terms: {
      title: 'شروط الاستخدام',
      sections: [
        ['استخدام الخدمة', 'باستخدام EcoCycle، توافق على تقديم معلومات صحيحة واستخدام الخدمة بطريقة قانونية ومسؤولة.'],
        ['طلبات تسليم النفايات', 'يجب إدخال عنوان وموعد صحيحين، وتقديم معلومات دقيقة عن نوع وكمية النفايات.'],
        ['النقاط والمكافآت', 'تُحتسب النقاط بعد استلام الطلب والتحقق منه، وتخضع المكافآت للتوفر والشروط الموضحة داخل التطبيق.'],
        ['الحساب', 'أنت مسؤول عن الحفاظ على سرية بيانات الدخول وعن جميع الأنشطة التي تتم من خلال حسابك.'],
      ],
    },
    privacy: {
      title: 'سياسة الخصوصية',
      sections: [
        ['البيانات التي نجمعها', 'نجمع الاسم والبريد الإلكتروني ورقم الهاتف وبيانات طلبات تسليم النفايات اللازمة لتقديم الخدمة.'],
        ['استخدام البيانات', 'نستخدم بياناتك لمعالجة الطلبات، وتحديث حالتها، وإدارة النقاط والمكافآت، والتواصل معك عند الحاجة.'],
        ['حماية البيانات', 'نحافظ على بياناتك ولا نبيعها أو نشاركها مع جهات خارجية إلا عند الضرورة لتقديم الخدمة أو بناءً على متطلب قانوني.'],
        ['حقوقك', 'يمكنك طلب تحديث بياناتك أو التواصل معنا للاستفسار عن طريقة استخدام معلوماتك عبر صفحة تواصل معنا.'],
      ],
    },
  }

  const openDocument = (type) => {
    setDocumentType(type)
    if (type === 'terms') onTermsClick?.()
    if (type === 'privacy') onPrivacyClick?.()
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
            <FaInfoCircle style={{ color: 'white', fontSize: '14px' }} />
          </div>
          <div style={{ textAlign: 'right' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1a1a1a', margin: 0, marginBottom: '4px' }}>عن التطبيق</h3>
            <p style={{ fontSize: '13px', color: '#888', margin: 0 }}>معلومات عن التطبيق وسياسة الخصوصية</p>
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

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '14px', color: '#333' }}>إصدار التطبيق</span>
            <span style={{ fontSize: '13px', fontWeight: '700', color: '#1a1a1a' }}>{appVersion}</span>
          </div>

          <div
            onClick={() => openDocument('terms')}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderTop: '1px solid #f0f0f0', cursor: 'pointer' }}
          >
            <span style={{ fontSize: '14px', color: '#333' }}>شروط الاستخدام</span>
            <FaChevronLeft style={{ color: '#aaa', fontSize: '12px' }} />
          </div>

          <div
            onClick={() => openDocument('privacy')}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderTop: '1px solid #f0f0f0', cursor: 'pointer' }}
          >
            <span style={{ fontSize: '14px', color: '#333' }}>سياسة الخصوصية</span>
            <FaChevronLeft style={{ color: '#aaa', fontSize: '12px' }} />
          </div>
        </>
      )}

      {documentType && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', zIndex: 100 }}>
          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '560px', maxHeight: '80vh', overflowY: 'auto', direction: 'rtl' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
              <h2 style={{ margin: 0, fontSize: '20px', color: '#1a1a1a' }}>{documents[documentType].title}</h2>
              <button type="button" onClick={() => setDocumentType(null)} style={{ border: 'none', background: 'transparent', color: '#888', fontSize: '20px', cursor: 'pointer' }} aria-label="إغلاق">×</button>
            </div>
            {documents[documentType].sections.map(([title, text]) => (
              <div key={title} style={{ borderTop: '1px solid #f0f0f0', padding: '12px 0' }}>
                <h3 style={{ margin: '0 0 6px', fontSize: '14px', color: '#2d6a2d' }}>{title}</h3>
                <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.8, color: '#555' }}>{text}</p>
              </div>
            ))}
            <button type="button" onClick={() => setDocumentType(null)} style={{ width: '100%', marginTop: '10px', border: 'none', borderRadius: '8px', padding: '10px', backgroundColor: '#2d6a2d', color: 'white', fontWeight: '700', cursor: 'pointer' }}>
              إغلاق
            </button>
          </div>
        </div>
      )}
    </div>
  )
}