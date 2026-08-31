import { FiHelpCircle, FiSearch } from 'react-icons/fi';

const HelpHeader = () => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.01)] flex flex-col items-center text-center space-y-4" dir="rtl">
      <div className="space-y-1">
        <div className="flex items-center justify-center gap-2 text-emerald-800">
          <FiHelpCircle className="text-2xl stroke-[2.5]" />
          <h1 className="text-xl font-black text-gray-800 tracking-tight">المساعدة</h1>
        </div>
        <p className="text-xs text-gray-400 font-bold">كيف يمكننا مساعدتك اليوم؟</p>
      </div>

      {/* صندوق البحث المركزي العريض المطابق للصورة بالظبط */}
      <div className="relative w-full max-w-xl">
        <input 
          type="text" 
          placeholder="ابحث عن إجابات لأسئلتك..." 
          className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 pr-11 pl-4 text-xs font-bold text-gray-700 placeholder-gray-400 focus:outline-none focus:border-emerald-500/50 focus:bg-white transition-all text-right shadow-inner"
        />
        <FiSearch className="absolute top-4 right-4 text-gray-400 text-base" />
      </div>
    </div>
  );
};

export default HelpHeader;
