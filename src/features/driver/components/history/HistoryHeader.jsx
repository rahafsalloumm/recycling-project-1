import { FiClipboard, FiCalendar, FiChevronDown } from 'react-icons/fi';

const HistoryHeader = () => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.01)] flex flex-col sm:flex-row justify-between items-start sm:items-center" dir="rtl">
      <div className="text-right space-y-1">
        <div className="flex items-center gap-2.5 text-emerald-800">
          <FiClipboard className="text-2xl stroke-[2.5]" />
          <h1 className="text-xl font-black text-gray-800 tracking-tight">سجل المهام</h1>
        </div>
        <p className="text-xs text-gray-400 font-bold">عرض جميع المهام المنجزة والملغاة وتفاصيل الأداء</p>
      </div>

      {/* فلتر نطاق التاريخ العريض المرفق بالصورة */}
      <div className="relative cursor-pointer bg-gray-50 border border-gray-100 px-4 py-2.5 rounded-xl text-xs font-black text-slate-700 flex items-center gap-4 hover:bg-gray-100/50 mt-3 sm:mt-0 font-sans">
        <FiCalendar className="text-gray-400 text-sm" />
        <span>2024-05-13 إلى 2024-05-20</span>
        <FiChevronDown className="text-gray-400 mr-2" />
      </div>
    </div>
  );
};

export default HistoryHeader;
