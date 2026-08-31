import React from "react";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

export default function RoutesTable({ routes }) {
  const driverAvatars = {
    "DRV-001": "https://unsplash.com",
    "DRV-002": "https://unsplash.com",
    "DRV-003": "https://unsplash.com",
    "DRV-004": "https://unsplash.com",
    "DRV-005": "https://unsplash.com"
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden text-right">
      <div className="overflow-x-auto">
        <table className="w-full text-right border-collapse">
          <thead>
            <tr className="bg-gray-50/70 border-b border-gray-100 text-gray-400 text-sm font-bold tracking-wide select-none">
              <th className="py-4 px-6 text-center w-16">#</th>
              <th className="py-4 px-6">اسم المسار</th>
              <th className="py-4 px-6">السائق</th>
              <th className="py-4 px-6 text-center">الحالة</th>
              <th className="py-4 px-6 text-center">عدد الحاويات</th>
              <th className="py-4 px-6 text-center">المسافة</th>
              <th className="py-4 px-6 text-center">الوقت المتوقع</th>
              <th className="py-4 px-6 text-center w-28">التقدم</th>
              <th className="py-4 px-6 text-center w-28">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-50 text-gray-700 font-medium">
            {routes.map((route, index) => (
              <tr key={route.id} className="hover:bg-gray-50/40 transition-colors duration-200 group">
                <td className="py-4 px-6 text-center font-bold text-gray-400 text-base">{index + 1}</td>
                <td className="py-4 px-6">
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-900 group-hover:text-emerald-700 transition-colors duration-150 text-[15px]">{route.routeName}</span>
                    <span className="text-xs text-gray-400 font-normal mt-0.5">{route.desc}</span>
                  </div>
                </td>
                
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2.5">
                    <img 
                      src={driverAvatars[route.driverId] || "https://unsplash.com"} 
                      alt={route.driverName}
                      className="w-9 h-9 rounded-full object-cover ring-2 ring-gray-100 shadow-sm flex-shrink-0"
                    />
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-800 text-[14px]">{route.driverName}</span>
                      <span className="text-[11px] text-gray-400 font-mono font-normal">{route.driverId}</span>
                    </div>
                  </div>
                </td>

                <td className="py-4 px-6 text-center">
                  <span className={`px-2.5 py-1 rounded-xl font-bold text-xs inline-flex items-center gap-1.5 border ${route.fontColor}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${route.status === "مكتمل" ? "bg-emerald-500" : route.status === "قيد التنفيذ" ? "bg-blue-500 animate-pulse" : "bg-gray-400"}`}></span>
                    {route.status}
                  </span>
                </td>

                <td className="py-4 px-6 text-center font-bold text-gray-800 font-mono text-base">{route.binsCount}</td>
                <td className="py-4 px-6 text-center text-gray-700 font-bold font-mono text-base">{route.distance}</td>
                <td className="py-4 px-6 text-center text-gray-500 font-semibold">{route.estTime}</td>

                {/* مؤشر التقدم المستدير كما بالصورة */}
                <td className="py-4 px-6 text-center">
                  <div className="inline-flex items-center justify-center relative w-10 h-10 rounded-full border-4 border-gray-100 font-mono text-[11px] font-black text-gray-700">
                    {route.progress}%
                    {route.progress > 0 && <div className={`absolute inset-0 rounded-full border-4 border-transparent border-t-emerald-500 ${route.progress >= 75 ? "border-r-emerald-500 border-l-emerald-500" : route.progress >= 50 ? "border-r-emerald-500" : ""}`}></div>}
                  </div>
                </td>

                <td className="py-4 px-6 text-center">
                  <div className="flex items-center justify-center gap-1 opacity-90">
                    <button className="p-2 rounded-xl text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 active:scale-90 transition-all duration-150 cursor-pointer" title="عرض"><FaEye className="text-sm" /></button>
                    <button className="p-2 rounded-xl text-gray-400 hover:text-blue-600 hover:bg-blue-50 active:scale-90 transition-all duration-150 cursor-pointer" title="تعديل"><FaEdit className="text-sm" /></button>
                    <button className="p-2 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 active:scale-90 transition-all duration-150 cursor-pointer" title="حذف"><FaTrash className="text-sm" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 bg-gray-50/60 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm text-gray-400 font-bold">
        <div>عرض <span className="text-gray-700 font-black">1</span> إلى <span className="text-gray-700 font-black">6</span> من أصل <span className="text-gray-700 font-black">18</span> مسار</div>
        <div className="flex items-center gap-1" dir="ltr">
          <button className="px-2 py-1 rounded bg-white border border-gray-200 text-gray-400 hover:bg-gray-50">&lt;</button>
          <button className="px-3 py-1 rounded bg-emerald-600 text-white font-black">1</button>
          <button className="px-3 py-1 rounded bg-white border border-gray-200 text-gray-600 hover:bg-gray-50">2</button>
          <button className="px-2 py-1 rounded bg-white border border-gray-200 text-gray-400 hover:bg-gray-50">&gt;</button>
        </div>
      </div>
    </div>
  );
}
