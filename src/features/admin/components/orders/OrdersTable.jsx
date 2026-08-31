import React from "react";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

export default function OrdersTable({ orders }) {
  const userAvatars = {
    1: "https://unsplash.com",
    2: "https://unsplash.com",
    3: "https://unsplash.com",
    4: "https://unsplash.com",
    5: "https://unsplash.com",
    6: "https://unsplash.com",
    7: "https://unsplash.com",
    8: "https://unsplash.com"
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden text-right transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
      <div className="overflow-x-auto">
        <table className="w-full text-right border-collapse">
          <thead>
            <tr className="bg-gray-50/70 border-b border-gray-100 text-gray-400 text-sm font-bold tracking-wide select-none">
              <th className="py-4 px-6 text-center w-16">#</th>
              <th className="py-4 px-6">رقم الطلب</th>
              <th className="py-4 px-6">المستخدم</th>
              <th className="py-4 px-6">نوع النفايات</th>
              <th className="py-4 px-6 text-center">الكمية</th>
              <th className="py-4 px-6">العنوان</th>
              <th className="py-4 px-6 text-center">تاريخ الطلب</th>
              <th className="py-4 px-6 text-center">الحالة</th>
              <th className="py-4 px-6 text-center w-32">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-50 text-gray-700 font-medium">
            {orders.map((order, index) => (
              <tr key={order.id} className="hover:bg-gray-50/40 transition-colors duration-200 group">
                <td className="py-4 px-6 text-center font-bold text-gray-400 text-base">{index + 1}</td>
                <td className="py-4 px-6 font-mono font-bold text-gray-900 text-[14px]">{order.reqCode}</td>
                
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <img 
                      src={userAvatars[order.id]} 
                      alt={order.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100 shadow-sm flex-shrink-0"
                    />
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-900 group-hover:text-emerald-700 transition-colors duration-150 text-[15px] whitespace-nowrap">{order.name}</span>
                      <span className="text-xs text-gray-400 font-normal mt-0.5">{order.email}</span>
                    </div>
                  </div>
                </td>
                
                <td className="py-4 px-6 text-gray-700 text-base">{order.type}</td>
                <td className="py-4 px-6 text-center text-gray-800 font-black text-base font-mono">{order.qty}</td>
                <td className="py-4 px-6 text-gray-500 font-semibold text-base max-w-[180px] truncate" title={order.address}>{order.address}</td>
                <td className="py-4 px-6 text-center text-gray-400 font-mono text-[13px]">{order.date}</td>
                
                <td className="py-4 px-6 text-center">
                  <span className={`px-3 py-1.5 rounded-xl font-bold text-xs inline-flex items-center gap-1.5 border shadow-sm ${
                    order.status === "تم الاستلام" ? "bg-emerald-50 text-emerald-700 border-emerald-100/50" :
                    order.status === "قيد التنفيذ" ? "bg-blue-50 text-blue-700 border-blue-100/50" :
                    order.status === "قيد المراجعة" ? "bg-amber-50 text-amber-700 border-amber-100/50" :
                    "bg-red-50 text-red-600 border-red-100/50"
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${
                      order.status === "تم الاستلام" ? "bg-emerald-500" :
                      order.status === "قيد التنفيذ" ? "bg-blue-500 animate-pulse" :
                      order.status === "قيد المراجعة" ? "bg-amber-500" : "bg-red-500"
                    }`}></span>
                    {order.status}
                  </span>
                </td>
                
                <td className="py-4 px-6 text-center">
                  <div className="flex items-center justify-center gap-1.5 opacity-90">
                    <button className="p-2.5 rounded-xl text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 active:scale-90 transition-all duration-150 cursor-pointer" title="عرض"><FaEye className="text-sm" /></button>
                    <button className="p-2.5 rounded-xl text-gray-400 hover:text-blue-600 hover:bg-blue-50 active:scale-90 transition-all duration-150 cursor-pointer" title="تعديل"><FaEdit className="text-sm" /></button>
                    <button className="p-2.5 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 active:scale-90 transition-all duration-150 cursor-pointer" title="حذف"><FaTrash className="text-sm" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 bg-gray-50/60 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm text-gray-400 font-bold">
        <div>عرض <span className="text-gray-700 font-black">1</span> إلى <span className="text-gray-700 font-black">8</span> من أصل <span className="text-gray-700 font-black">240</span> طلب</div>
        <div className="flex items-center gap-1" dir="ltr">
          <button className="px-2 py-1 rounded bg-white border border-gray-200 text-gray-400 hover:bg-gray-50">&lt;</button>
          <button className="px-3 py-1 rounded bg-emerald-600 text-white font-black">1</button>
          <button className="px-3 py-1 rounded bg-white border border-gray-200 text-gray-600 hover:bg-gray-50">2</button>
          <button className="px-3 py-1 rounded bg-white border border-gray-200 text-gray-600 hover:bg-gray-50">3</button>
          <button className="px-2 py-1 rounded bg-white border border-gray-200 text-gray-400 hover:bg-gray-50">&gt;</button>
        </div>
      </div>

    </div>
  );
}
