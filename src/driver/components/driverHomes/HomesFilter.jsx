import React from 'react';
import { FiSliders, FiSearch, FiChevronDown } from 'react-icons/fi';

const HomesFilter = () => {
  return (
    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.01)] flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4" dir="rtl">
      
      {/* جهة اليمين: زر التصفية والفلاتر المنسدلة كالصورة */}
      <div className="flex flex-wrap items-center gap-3 flex-1">
        <button className="text-xs font-bold text-gray-500 hover:text-emerald-700 flex items-center justify-center gap-1.5 bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-100/70 transition-all active:scale-95">
          <FiSliders className="text-xs" /> تصفية
        </button>

        <div className="relative cursor-pointer bg-gray-50 border border-gray-100 px-4 py-2.5 rounded-xl text-xs font-bold text-gray-600 flex items-center gap-6 hover:bg-gray-100/50">
          <span>تاريخ الطلب</span>
          <FiChevronDown className="text-gray-400" />
        </div>

        <div className="relative cursor-pointer bg-gray-50 border border-gray-100 px-4 py-2.5 rounded-xl text-xs font-bold text-gray-600 flex items-center gap-6 hover:bg-gray-100/50">
          <span>جميع المناطق</span>
          <FiChevronDown className="text-gray-400" />
        </div>

        <div className="relative cursor-pointer bg-gray-50 border border-gray-100 px-4 py-2.5 rounded-xl text-xs font-bold text-gray-600 flex items-center gap-6 hover:bg-gray-100/50">
          <span>جميع الحالات</span>
          <FiChevronDown className="text-gray-400" />
        </div>
      </div>

      {/* جهة اليسار: صندوق البحث الذكي */}
      <div className="relative w-full lg:w-80">
        <input 
          type="text" 
          placeholder="بحث عن طلب..." 
          className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2.5 pr-10 pl-4 text-xs font-bold text-gray-700 placeholder-gray-400 focus:outline-none focus:border-emerald-500/50 focus:bg-white transition-all text-right shadow-inner"
        />
        <FiSearch className="absolute top-3.5 right-3.5 text-gray-400 text-sm" />
      </div>

    </div>
  );
};

export default HomesFilter;
