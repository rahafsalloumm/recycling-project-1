import React from "react";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

export default function RewardsTable({ rewards, onToggleStatus }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden text-right transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
      <div className="overflow-x-auto">
        <table className="w-full text-right border-collapse">
          <thead>
            <tr className="bg-gray-50/70 border-b border-gray-100 text-gray-400 text-sm font-bold tracking-wide select-none">
              <th className="py-4 px-6 text-center w-16">#</th>
              <th className="py-4 px-6">الحافز الخدمي</th>
              <th className="py-4 px-6">فئة التصنيف</th>
              <th className="py-4 px-6 text-center">النقاط المطلوبة</th>
              <th className="py-4 px-6 text-center">المخزون</th>
              <th className="py-4 px-6 text-center">مرات الاسترداد</th>
              <th className="py-4 px-6 text-center">حالة الإتاحة</th>
              <th className="py-4 px-6 text-center w-28">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-50 text-gray-700 font-medium">
            {rewards.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-12 text-gray-400 font-bold text-base">لا توجد حوافز تتبع هذا التصنيف حالياً.</td>
              </tr>
            ) : (
              rewards.map((reward, index) => (
                <tr key={reward.id} className="hover:bg-gray-50/40 transition-colors duration-200 group">
                  <td className="py-4 px-6 text-center font-bold text-gray-400 text-base">{index + 1}</td>
                  
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl bg-gray-50 p-1.5 rounded-xl border border-gray-100 shadow-inner flex-shrink-0 select-none">
                        {reward.icon}
                      </span>
                      <span className="font-bold text-gray-900 group-hover:text-emerald-700 transition-colors duration-150 text-[15px]">{reward.name}</span>
                    </div>
                  </td>
                  
                  <td className="py-4 px-6 text-gray-500 font-semibold">{reward.category}</td>
                  <td className="py-4 px-6 text-center font-bold text-emerald-600 font-mono text-base">{reward.points}</td>
                  <td className="py-4 px-6 text-center font-bold text-gray-500 font-mono text-base">{reward.stock}</td>
                  <td className="py-4 px-6 text-center font-black text-gray-800 font-mono text-base">{reward.claimed}</td>
                  
                  {/* زر التبديل الفعال والشغال حركياً الآن بالضغط (Toggle Switch) */}
                  <td className="py-4 px-6 text-center">
                    <div 
                      onClick={() => onToggleStatus(reward.id)}
                      className="inline-flex items-center justify-center cursor-pointer select-none"
                    >
                      <div className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-300 ${reward.status ? "bg-emerald-500" : "bg-gray-300"}`}>
                        <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 transform ${reward.status ? "translate-x-[-16px]" : "translate-x-0"}`}></div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-1.5 opacity-90">
                      <button className="p-2.5 rounded-xl text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 active:scale-90 transition-all duration-150 cursor-pointer" title="عرض"><FaEye className="text-sm" /></button>
                      <button className="p-2.5 rounded-xl text-gray-400 hover:text-blue-600 hover:bg-blue-50 active:scale-90 transition-all duration-150 cursor-pointer" title="تعديل"><FaEdit className="text-sm" /></button>
                      <button className="p-2.5 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 active:scale-90 transition-all duration-150 cursor-pointer" title="حذف"><FaTrash className="text-sm" /></button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}


