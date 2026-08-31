import React, { useState } from 'react';
import { FiChevronDown, FiHelpCircle, FiPhone, FiMail } from 'react-icons/fi';

const HelpAccordion = () => {
  const [openFaqId, setOpenFaqId] = useState(null);

  const faqs = [
    { id: 1, q: 'كيف أبدأ مهمة جديدة في الوردية؟', a: 'انتقل إلى صفحة "المهام اليومية" من القائمة الجانبية، ثم اختر المهمة الحالية واضغط على زر "بدء المهمة" الأخضر لتفعيل التتبع.' },
    { id: 2, q: 'ماذا أفعل إذا كانت الحاوية الذكية معطلة؟', a: 'اضغط على تفاصيل الحاوية من اللوحة، ثم اختر "الإبلاغ عن عطل" ليرسل النظام بلاغاً فورياً لقسم الصيانة.' },
    { id: 3, q: 'كيف يتم تحديث حالة التجميع للمنازل؟', a: 'بمجرد وصولك للموقع وتفريغ النفايات, اضغط على زر "تأكيد الاستلام" لتسجيل الوزن وإغلاق الطلب بنجاح.' },
    { id: 4, q: 'كيف يمكنني الإبلاغ عن زحام أو إغلاق في الطريق؟', a: 'من خلال زر الإشعارات أو الخريطة، يمكنك إرسال بلاغ سريع بالزحام ليقوم النظام بتعديل مسارك تلقائياً.' },
  ];

  return (
    <div className="space-y-6" dir="rtl">
      
      {/* قائمة الأسئلة الشائعة */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.01)] text-right">
        <div className="flex items-center gap-2 text-slate-800 mb-5">
          <FiHelpCircle className="text-lg stroke-[2.5] text-emerald-800" />
          <h3 className="font-extrabold text-sm tracking-tight">الأسئلة الشائعة</h3>
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => {
            const isOpen = faq.id === openFaqId;
            return (
              <div 
                key={faq.id} 
                className={`rounded-xl border transition-all duration-200 border-r-4 ${
                  isOpen 
                    ? 'bg-emerald-50/30 border-emerald-600 shadow-sm border-y-gray-100 border-l-gray-100' 
                    : 'bg-white border-gray-100 hover:bg-emerald-50/50 hover:border-r-emerald-500'
                }`}
              >
                <button 
                  onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                  className="w-full flex justify-between items-center px-5 py-4 text-right font-bold text-xs text-gray-700 focus:outline-none"
                >
                  <span className={`transition-colors ${isOpen ? 'text-emerald-950 font-black' : ''}`}>{faq.q}</span>
                  <FiChevronDown className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'transform rotate-180 text-emerald-600' : ''}`} />
                </button>
                
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40 border-t border-emerald-100/50' : 'max-h-0'}`}>
                  <p className="p-5 pt-4 text-[11px] text-gray-500 font-medium leading-relaxed bg-white/40">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* قنوات التواصل السريع المباشرة والواضحة بالأسفل */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* 📞 كرت الاتصال الهاتفي - تم ربطه برقمك الشخصي بدقة مية بالمية */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.01)] flex items-center justify-between group hover:shadow-[0_6px_18px_rgba(0,0,0,0.02)] transition-shadow">
          <div className="flex items-center gap-3 text-right">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-base shadow-inner">
              <FiPhone className="stroke-[2.5]" />
            </div>
            <div>
              <h4 className="text-xs font-black text-gray-800">الدعم الهاتفي السريع</h4>
              <p className="text-[11px] text-gray-400 font-sans font-medium mt-0.5" dir="ltr">+963 981 910 976</p>
            </div>
          </div>
          <button 
            onClick={() => window.open('tel:+963981910976')} // 📱 يفتح تطبيق الاتصال بالرقم الخاص بك فوراً
            className="text-[10px] font-bold text-emerald-600 bg-emerald-50 hover:bg-emerald-600 hover:text-white px-4 py-2 rounded-xl border border-emerald-100/50 transition-all active:scale-95"
          >
            اتصال فوري
          </button>
        </div>

        {/* ✉️ كرت المراسلة بالبريد الإلكتروني الذكي */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.01)] flex items-center justify-between group hover:shadow-[0_6px_18px_rgba(0,0,0,0.02)] transition-shadow">
          <div className="flex items-center gap-3 text-right">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-base shadow-inner">
              <FiMail className="stroke-[2.5]" />
            </div>
            <div>
              <h4 className="text-xs font-black text-gray-800">المراسلة الرسمية</h4>
              <p className="text-[11px] text-gray-400 font-sans font-medium mt-0.5">support@ecocycle.com</p>
            </div>
          </div>
          <button 
            onClick={() => window.open('mailto:support@ecocycle.com')} // 📥 يفتح برنامج الإيميل ويكتب البريد تلقائياً في خانة المستلم
            className="text-[10px] font-bold text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-xl border border-blue-100/50 transition-all active:scale-95"
          >
            إرسال إيميل
          </button>
        </div>

      </div>

    </div>
  );
};

export default HelpAccordion;
