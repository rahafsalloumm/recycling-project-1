import { FiFlag, FiClock, FiList, FiNavigation } from 'react-icons/fi';

const LiveMapSection = () => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col justify-between min-h-[640px] shadow-[0_2px_12px_rgba(0,0,0,0.01)]" dir="rtl">
      
      {/* تفاصيل الهيدر الصغير للخريطة */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-[11px] text-gray-400 font-bold tracking-wide">عرض ومتابعة مسارك الحالي ومواقع التوقف</p>
      </div>

      {/* الخريطة الجغرافية الفسيحة والبيضاء تماماً كالصورة الأصلية */}
      <div className="relative flex-1 bg-slate-50 border border-gray-100/80 rounded-2xl overflow-hidden flex items-center justify-center group/map">
        
        {/* أزرار التحكم بالخريطة الجانبية المرفقة بالصورة (+ / - / تحديد الموقع) */}
        <div className="absolute top-4 right-4 flex flex-col gap-1.5 z-10 shadow-sm">
          <button className="w-8 h-8 bg-white border border-gray-100 font-bold rounded-lg flex items-center justify-center text-sm text-gray-500 hover:bg-gray-50 active:scale-95">+</button>
          <button className="w-8 h-8 bg-white border border-gray-100 font-bold rounded-lg flex items-center justify-center text-sm text-gray-500 hover:bg-gray-50 active:scale-95">-</button>
          <button className="w-8 h-8 bg-white border border-gray-100 rounded-lg flex items-center justify-center text-sm text-gray-500 hover:bg-gray-50 active:scale-95 mt-1">🎯</button>
        </div>

        {/* خطوط وشبكات الطرق الوهمية الفاتحة بالخلفية كالصورة بالظبط */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#bcdeb5_1px,transparent_1px),linear-gradient(to_bottom,#bcdeb5_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        
        {/* 🗺️ مسار الشاحنة الأخضر المتقطع والمتصل */}
        <svg className="absolute w-full h-full p-16" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* ✅ خط "تم المرور" أصبح متصلاً تماماً ونظيفاً وبدون نقاط */}
          <path d="M 12 75 L 35 48" fill="none" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
          
          {/* جزء المسار القادم المستقبلي الذكي المتقطع */}
          <path d="M 35 48 L 52 18 L 82 30 L 72 75 L 48 85 L 35 48" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4" />
        </svg>

        {/* أيقونة شاحنتك الحالية مع رادار تحديد الموقع المباشر */}
        <div className="absolute bottom-[46%] right-[62%] flex flex-col items-center justify-center z-10 group/truck">
          <span className="absolute bg-emerald-500/20 w-12 h-12 rounded-full animate-ping pointer-events-none"></span>
          <div className="bg-white p-2 rounded-xl shadow-md border border-emerald-500/20 text-xl transform group-hover/map:scale-105 transition-transform duration-500 cursor-pointer">🚚</div>
          <span className="bg-emerald-600 text-white font-black text-[8px] px-1.5 py-0.5 rounded shadow mt-1.5 whitespace-nowrap">موقعك الحالي</span>
        </div>

        {/* المحطات السبعة الموزعة هندسياً على عقد الطرق بالخريطة */}
        {[
          { id: 1, top: '32%', left: '16%' },
          { id: 2, top: '15%', left: '46%' },
          { id: 3, top: '44%', left: '62%' },
          { id: 4, top: '72%', left: '52%' },
          { id: 5, top: '80%', left: '24%' },
          { id: 6, top: '65%', left: '8%' },
          { id: 7, top: '48%', left: '12%' }
        ].map((pin) => (
          <div key={pin.id} style={{ top: pin.top, left: pin.left }} className="absolute z-10 cursor-pointer group/pin">
            <span className="bg-emerald-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black shadow border-2 border-white transition-all group-hover/pin:scale-110 group-hover/pin:bg-emerald-600">
              {pin.id}
            </span>
          </div>
        ))}

        {/* دليل مفتاح الخريطة السفلي الأنيق المطابق تماماً للصورة */}
        <div className="absolute bottom-4 right-4 left-4 bg-white/95 backdrop-blur border border-gray-100 p-2.5 rounded-xl flex justify-center items-center gap-6 text-[10px] font-black text-gray-500 shadow-sm">
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-blue-500 rounded-full"></span> موقع حالي</div>
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-gray-400 rounded-full"></span> تم المرور</div>
          <div className="flex items-center gap-1.5"><span className="w-5 h-0.5 border-t-2 border-dashed border-emerald-500"></span> المسار القادم</div>
          <div className="flex items-center gap-1.5"><span>🏁</span> وجهة أخيرة</div>
        </div>
      </div>

      {/* لوحة المؤشرات الرقمية الأربعة الفسيحة جداً أسفل الخريطة */}
      <div className="grid grid-cols-4 gap-4 text-center mt-5 border-t border-gray-100 pt-5 bg-gray-50/40 p-2 rounded-xl">
        <div className="flex flex-col items-center justify-center p-1 hover:bg-white rounded-xl transition-all shadow-none hover:shadow-sm cursor-pointer">
          <p className="text-[10px] text-gray-400 font-bold">الوجهة الأخيرة</p>
          <div className="flex items-center gap-1 mt-1 text-slate-800">
            <FiFlag className="text-xs text-red-500 stroke-[2.5]" />
            <p className="text-xs font-black truncate max-w-[95px]">مركز التجمع الرئيسي</p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-1 hover:bg-white rounded-xl transition-all shadow-none hover:shadow-sm cursor-pointer">
          <p className="text-[10px] text-gray-400 font-bold">المهام المتبقية</p>
          <div className="flex items-center gap-1.5 mt-1 text-slate-800">
            <FiList className="text-xs text-amber-500 stroke-[2.5]" />
            <p className="text-xs font-black">4 مهام</p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-1 hover:bg-white rounded-xl transition-all shadow-none hover:shadow-sm cursor-pointer">
          <p className="text-[10px] text-gray-400 font-bold">الوقت المتبقي</p>
          <div className="flex items-center gap-1.5 mt-1 text-slate-800">
            <FiClock className="text-xs text-blue-500 stroke-[2.5]" />
            <p className="text-xs font-black">1 ساعة 20 دقيقة</p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-1 hover:bg-white rounded-xl transition-all shadow-none hover:shadow-sm cursor-pointer">
          <p className="text-[10px] text-gray-400 font-bold">المسافة المتبقية</p>
          <div className="flex items-center gap-1.5 mt-1 text-slate-800">
            <FiNavigation className="text-xs text-emerald-500 stroke-[2.5]" />
            <p className="text-xs font-black">12.4 كم</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveMapSection;
