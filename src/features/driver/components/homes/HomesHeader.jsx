import React from 'react';
import { FiHome, FiCalendar } from 'react-icons/fi';

const HomesHeader = () => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.01)] flex flex-col sm:flex-row justify-between items-start sm:items-center" dir="rtl">
      <div className="text-right space-y-1">
        <div className="flex items-center gap-2.5 text-emerald-800">
          <FiHome className="text-2xl stroke-[2.5]" />
          <h1 className="text-xl font-black text-gray-800 tracking-tight">طلبات المنازل</h1>
        </div>
        <p className="text-xs text-gray-400 font-bold">قائمة طلبات استلام النفايات من المنازل</p>
      </div>

      <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 px-4 py-2.5 rounded-xl mt-3 sm:mt-0 font-sans text-xs font-black text-slate-700">
        <FiCalendar className="text-gray-400 text-sm" />
        <span>الثلاثاء، 20 مايو 2024</span>
      </div>
    </div>
  );
};

export default HomesHeader;
