import { FiMap, FiFlag, FiTrendingUp, FiClock } from 'react-icons/fi';

const MapSection = () => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col justify-between min-h-[460px] shadow-[0_2px_12px_rgba(0,0,0,0.01)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.03)] transition-shadow duration-300" dir="rtl">
      {/* الرأس */}
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-2.5 text-emerald-800">
          <FiMap className="text-xl stroke-[2.5]" />
          <h3 className="font-extrabold text-gray-800 text-sm tracking-tight">المسار الحالي</h3>
        </div>
        <button className="text-xs font-bold text-gray-400 hover:text-emerald-600 bg-gray-50 hover:bg-emerald-50 px-3 py-1.5 rounded-xl transition-all duration-300 active:scale-95">
          عرض الخريطة كاملة
        </button>
      </div>

      {/* مساحة الخريطة الفسيحة والبيضاء تماماً */}
      <div className="relative flex-1 min-h-[270px] bg-slate-50/60 border border-gray-100/70 rounded-2xl overflow-hidden flex items-center justify-center group/map">
        
        {/* خط المسار الأخضر النقي */}
        <svg className="absolute w-full h-full p-12 drop-shadow-sm" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M 12 75 L 35 48 L 62 58 L 88 22" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        {/* أيقونة الشاحنة مع حركة نبض لطيفة وتكبير عند هوفر الخريطة */}
        <div className="absolute bottom-[32%] right-[66%] text-2xl bg-white p-2 rounded-full shadow-md border border-gray-100 transform group-hover/map:scale-110 transition-transform duration-500 z-10 cursor-pointer">
          🚚
        </div>

        {/* نقاط المحطات الموزعة بدقة وأناقة */}
        {[
          { id: 2, top: '45%', left: '60%' },
          { id: 3, top: '55%', left: '34%' },
          { id: 4, top: '30%', left: '54%' },
          { id: 5, top: '74%', left: '46%' }
        ].map((pin) => (
          <div 
            key={pin.id} 
            style={{ top: pin.top, left: pin.left }} 
            className="absolute flex items-center justify-center cursor-pointer group/pin z-10"
          >
            <span className="bg-emerald-500 text-white w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shadow-md border-2 border-white transition-all duration-300 group-hover/pin:bg-emerald-600 group-hover/pin:scale-115 group-hover/pin:shadow-emerald-500/20">
              {pin.id}
            </span>
          </div>
        ))}
      </div>

      {/* المؤشرات السفلية الفسيحة والمنظمة بوضوح */}
      <div className="grid grid-cols-4 gap-4 text-center mt-5 border-t border-gray-100 pt-5">
        <div className="flex flex-col items-center justify-center p-1 hover:bg-gray-50 rounded-xl transition-colors duration-200">
          <p className="text-[10px] text-gray-400 font-bold">وقت الانتهاء المتوقع</p>
          <div className="flex items-center gap-1.5 mt-1.5 text-slate-800">
            <FiFlag className="text-sm text-red-500 stroke-[2.5]" />
            <p className="text-xs font-black">2:30 م</p>
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-center p-1 hover:bg-gray-50 rounded-xl transition-colors duration-200">
          <p className="text-[10px] text-gray-400 font-bold">عدد التوقفات المتبقية</p>
          <div className="flex items-center gap-1.5 mt-1.5 text-slate-800">
            <FiTrendingUp className="text-sm text-emerald-500 stroke-[2.5]" />
            <p className="text-xs font-black">9</p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-1 hover:bg-gray-50 rounded-xl transition-colors duration-200">
          <p className="text-[10px] text-gray-400 font-bold">وقت الوصول المتوقع</p>
          <div className="flex items-center gap-1.5 mt-1.5 text-slate-800">
            <FiClock className="text-sm text-blue-500 stroke-[2.5]" />
            <p className="text-xs font-black">10:45 ص</p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-1 hover:bg-gray-50 rounded-xl transition-colors duration-200">
          <p className="text-[10px] text-gray-400 font-bold">المحطة التالية</p>
          <p className="text-xs font-black text-emerald-700 mt-1.5 truncate max-w-[110px]">شارع الجامعة</p>
          <p className="text-[9px] text-gray-400 font-medium mt-0.5">على بعد 1.2 كم</p>
        </div>
      </div>
    </div>
  );
};

export default MapSection;

