import React from 'react';
import { FiSliders, FiSearch } from 'react-icons/fi';

const BinsTableSection = () => {
  const binsData = [
    { id: 'BIN-001', location: 'شارع الجامعة - مقابل المكتبة', fill: 95, color: 'bg-red-500', status: 'تحتاج تفريغ', statusColor: 'bg-red-50 text-red-600 border-red-100' },
    { id: 'BIN-002', location: 'حي الياسمين - شارع 8', fill: 70, color: 'bg-amber-400', status: 'متوسطة', statusColor: 'bg-amber-50 text-amber-600 border-amber-100' },
    { id: 'BIN-003', location: 'شارع النور - بجانب الحديقة', fill: 20, color: 'bg-emerald-500', status: 'فارغة', statusColor: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
    { id: 'BIN-004', location: 'حي الزهور - مقابل السوق', fill: 100, color: 'bg-red-600', status: 'ممتلئة', statusColor: 'bg-red-100 text-red-700 border-red-200 animate-pulse' },
    { id: 'BIN-005', location: 'شارع الاستقلال - محطة الباص', fill: 40, color: 'bg-amber-400', status: 'متوسطة', statusColor: 'bg-amber-50 text-amber-600 border-amber-100' },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.01)]" dir="rtl">
      {/* أدوات البحث والتصفية للجدول */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 mb-6">
        <button className="text-xs font-bold text-gray-500 hover:text-emerald-700 flex items-center justify-center gap-1.5 bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-100/70 transition-all active:scale-95 shrink-0">
          <FiSliders className="text-xs" /> تصفية
        </button>

        <div className="relative flex-1 max-w-md">
          <input 
            type="text" 
            placeholder="بحث برقم الحاوية أو الموقع..." 
            className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2.5 pr-10 pl-4 text-xs font-bold text-gray-700 placeholder-gray-400 focus:outline-none focus:border-emerald-500/50 focus:bg-white transition-all text-right shadow-inner"
          />
          <FiSearch className="absolute top-3.5 right-3.5 text-gray-400 text-sm" />
        </div>
      </div>

      {/* جدول البيانات المقسم والفسيح */}
      <div className="overflow-x-auto">
        <table className="w-full text-right border-collapse">
          <thead>
            <tr className="border-b border-gray-100 text-[11px] text-gray-400 font-extrabold tracking-wider bg-gray-50/50 rounded-xl">
              <th className="py-3.5 px-4 rounded-r-xl">رقم الحاوية</th>
              <th className="py-3.5 px-4">الموقع</th>
              <th className="py-3.5 px-4">مستوى الامتلاء</th>
              <th className="py-3.5 px-4">الحالة</th>
              <th className="py-3.5 px-4">آخر تحديث</th>
              <th className="py-3.5 px-4 rounded-l-xl text-center">الإجراء</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-xs font-bold text-gray-700">
            {binsData.map((bin, index) => (
              <tr key={index} className="hover:bg-gray-50/60 transition-colors group cursor-pointer">
                <td className="py-4 px-4 font-sans text-slate-800 tracking-wide">{bin.id}</td>
                <td className="py-4 px-4 max-w-[220px] truncate">{bin.location}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3 min-w-[120px]">
                    <span className="font-sans text-[11px] text-gray-500 w-8">{bin.fill}%</span>
                    <div className="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden shadow-inner">
                      <div className={`h-full rounded-full transition-all duration-500 ${bin.color}`} style={{ width: `${bin.fill}%` }}></div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className={`text-[10px] font-black px-2.5 py-1 rounded-xl border tracking-wide block w-fit ${bin.statusColor}`}>
                    {bin.status}
                  </span>
                </td>
                <td className="py-4 px-4 font-sans text-gray-400 font-medium">10:15 AM</td>
                <td className="py-4 px-4 text-center">
                  <button className="text-[10px] font-bold text-emerald-600 bg-emerald-50 hover:bg-emerald-600 hover:text-white px-3 py-1.5 rounded-lg border border-emerald-100/50 shadow-sm transition-all active:scale-95">
                    عرض التفاصيل
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BinsTableSection;
