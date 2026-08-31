import { FiCalendar } from 'react-icons/fi';

const TasksHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-2xl border border-gray-100/80 shadow-[0_2px_8px_rgba(0,0,0,0.01)] animate-slide-down" dir="rtl">
      <div className="text-right space-y-1">
        <div className="flex items-center gap-2.5 text-emerald-800">
          <FiCalendar className="text-2xl stroke-[2.5]" />
          <h1 className="text-xl font-black text-gray-800 tracking-tight">المهام اليومية</h1>
        </div>
        <p className="text-xs text-gray-400 font-bold">قائمة المهام الموكلة إليك اليوم</p>
      </div>

      <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 px-4 py-2.5 rounded-xl mt-3 sm:mt-0 font-sans text-xs font-black text-slate-700">
        <span>📅</span>
        <span>الثلاثاء، 20 مايو 2026</span>
        <span className="text-[10px] text-gray-400 font-medium mr-1">(اليوم)</span>
      </div>
    </div>
  );
};

export default TasksHeader;
