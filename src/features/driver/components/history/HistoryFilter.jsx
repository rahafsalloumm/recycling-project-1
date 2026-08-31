import { FiDownload, FiChevronDown } from 'react-icons/fi';

const HistoryFilter = () => {
  return (
    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.01)] flex flex-wrap items-center gap-3" dir="rtl">
      
      {/* زر تصدير البيانات (Excel/PDF) */}
      <button className="text-xs font-black text-gray-500 hover:text-emerald-700 flex items-center justify-center gap-2 bg-gray-50 px-5 py-2.5 rounded-xl border border-gray-100/70 transition-all active:scale-95">
        <FiDownload className="text-sm" /> تصدير
      </button>

      {/* فلاتر الفرز المنسدلة الثلاثة من لقطة الشاشة بالملي */}
      <div className="relative cursor-pointer bg-gray-50 border border-gray-100 px-5 py-2.5 rounded-xl text-xs font-bold text-gray-600 flex items-center gap-8 hover:bg-gray-100/50">
        <span>جميع المناطق</span>
        <FiChevronDown className="text-gray-400" />
      </div>

      <div className="relative cursor-pointer bg-gray-50 border border-gray-100 px-5 py-2.5 rounded-xl text-xs font-bold text-gray-600 flex items-center gap-8 hover:bg-gray-100/50">
        <span>جميع أنواع المهام</span>
        <FiChevronDown className="text-gray-400" />
      </div>

      <div className="relative cursor-pointer bg-gray-50 border border-gray-100 px-5 py-2.5 rounded-xl text-xs font-bold text-gray-600 flex items-center gap-8 hover:bg-gray-100/50">
        <span>جميع الحالات</span>
        <FiChevronDown className="text-gray-400" />
      </div>

    </div>
  );
};

export default HistoryFilter;
