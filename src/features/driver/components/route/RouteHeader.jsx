import { FiMapPin, FiCalendar, FiClock } from 'react-icons/fi';

const RouteHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.01)]" dir="rtl">
      <div className="text-right space-y-1">
        <div className="flex items-center gap-2.5 text-emerald-800">
          <FiMapPin className="text-2xl stroke-[2.5]" />
          <h1 className="text-xl font-black text-gray-800 tracking-tight">المسار الحالي</h1>
        </div>
        <p className="text-xs text-gray-400 font-bold">عرض ومتابعة مسارك الحالي ومواقع التوقف</p>
      </div>

      {/* كرت التاريخ والوقت المزدوج الفسيح كالصورة تماماً */}
      <div className="flex flex-col gap-2 bg-gray-50 border border-gray-100 p-4 rounded-2xl mt-3 sm:mt-0 font-sans text-xs font-black text-slate-700 min-w-[200px]">
        <div className="flex items-center gap-2">
          <FiCalendar className="text-gray-400 text-sm" />
          <span>الثلاثاء، 20 مايو 2024</span>
        </div>
        <div className="flex items-center gap-2 border-t border-gray-200/60 pt-2">
          <FiClock className="text-gray-400 text-sm" />
          <span>09:15 AM</span>
        </div>
      </div>
    </div>
  );
};

export default RouteHeader;
