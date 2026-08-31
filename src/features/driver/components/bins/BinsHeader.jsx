import { FiTrash2 } from 'react-icons/fi';

const BinsHeader = () => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.01)]" dir="rtl">
      <div className="text-right space-y-1">
        <div className="flex items-center gap-2.5 text-emerald-800">
          <FiTrash2 className="text-2xl stroke-[2.5]" />
          <h1 className="text-xl font-black text-gray-800 tracking-tight">الحاويات الذكية</h1>
        </div>
        <p className="text-xs text-gray-400 font-bold">عرض حالة الحاويات الذكية في منطقتك</p>
      </div>
    </div>
  );
};

export default BinsHeader;
