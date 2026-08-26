import React from "react";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

export default function DriversTable({ drivers }) {
  // صور افتراضية عالية الجودة للسائقين لتطابق صورتك تماماً
  const driverAvatars = {
    "DVR-001": "https://unsplash.com",
    "DVR-002": "https://unsplash.com",
    "DVR-003": "https://unsplash.com",
    "DVR-004": "https://unsplash.com",
    "DVR-005": "https://unsplash.com",
    "DVR-006": "https://unsplash.com"
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden text-right transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
      <div className="overflow-x-auto">
        <table className="w-full text-right border-collapse">
          <thead>
            <tr className="bg-gray-50/70 border-b border-gray-100 text-gray-400 text-sm font-bold tracking-wide select-none">
              <th className="py-4 px-6 text-center w-16">#</th>
              <th className="py-4 px-6">السائق</th>
              <th className="py-4 px-6">رقم الهاتف</th>
              <th className="py-4 px-6">المنطقة</th>
              <th className="py-4 px-6 text-center">الحالة</th>
              <th className="py-4 px-6 text-center">المهام المنجزة</th>
              <th className="py-4 px-6 text-center">تاريخ الانضمام</th>
              <th className="py-4 px-6 text-center w-32">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-50 text-gray-700 font-medium">
            {drivers.map((driver, index) => (
              <tr key={driver.id} className="hover:bg-gray-50/40 transition-colors duration-200 group">
                <td className="py-4 px-6 text-center font-bold text-gray-400 text-base">{index + 1}</td>
                
                {/* عمود السائق بالصورة الشخصية والأبعاد الاحترافية */}
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <img 
                      src={driverAvatars[driver.idCode] || "https://unsplash.com"} 
                      alt={driver.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100 shadow-sm"
                    />
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-900 group-hover:text-emerald-700 transition-colors duration-150 text-[15px]">{driver.name}</span>
                      <span className="text-xs text-gray-400 font-mono mt-0.5">{driver.idCode}</span>
                    </div>
                  </div>
                </td>
                
                <td className="py-4 px-6 text-gray-500 font-mono ltr text-right text-base">{driver.phone}</td>
                <td className="py-4 px-6 text-gray-700 text-base font-semibold">{driver.region}</td>
                
                {/* الألوان المريحة والهادئة للحالة (Soft Pastel Tones) */}
                <td className="py-4 px-6 text-center">
                  <span className={`px-3 py-1.5 rounded-xl font-bold text-xs inline-flex items-center gap-1.5 shadow-sm border ${
                    driver.status === "متاح" ? "bg-emerald-50 text-emerald-700 border-emerald-100/50" :
                    driver.status === "في مهمة" ? "bg-amber-50 text-amber-700 border-amber-100/50" : 
                    "bg-gray-100 text-gray-600 border-gray-200/50"
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${
                      driver.status === "متاح" ? "bg-emerald-500 animate-pulse" :
                      driver.status === "في مهمة" ? "bg-amber-500" : "bg-gray-400"
                    }`}></span>
                    {driver.status}
                  </span>
                </td>
                
                <td className="py-4 px-6 text-center font-black text-gray-800 text-base font-mono">{driver.tasks}</td>
                <td className="py-4 px-6 text-center text-gray-400 font-mono text-[13px]">{driver.date}</td>
                
                <td className="py-4 px-6 text-center">
                  <div className="flex items-center justify-center gap-1.5 opacity-90">
                    <button className="p-2.5 rounded-xl text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 active:scale-90 transition-all duration-150 cursor-pointer" title="تفاصيل"><FaEye className="text-sm" /></button>
                    <button className="p-2.5 rounded-xl text-gray-400 hover:text-blue-600 hover:bg-blue-50 active:scale-90 transition-all duration-150 cursor-pointer" title="تعديل"><FaEdit className="text-sm" /></button>
                    <button className="p-2.5 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 active:scale-90 transition-all duration-150 cursor-pointer" title="حذف"><FaTrash className="text-sm" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

