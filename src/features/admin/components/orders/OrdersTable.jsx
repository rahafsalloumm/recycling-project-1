import { useState } from "react";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

export default function OrdersTable({ orders, onUpdateStatus, onDelete }) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(orders.length / pageSize));
  const activePage = Math.min(currentPage, totalPages);
  const visibleOrders = orders.slice((activePage - 1) * pageSize, activePage * pageSize);
  const userAvatars = {
    1: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    2: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    3: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    4: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    5: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    6: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    7: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    8: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
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
            {visibleOrders.map((order, index) => (
              <tr key={order.id} className="hover:bg-gray-50/40 transition-colors duration-200 group">
                <td className="py-4 px-6 text-center font-bold text-gray-400 text-base">{(activePage - 1) * pageSize + index + 1}</td>
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
                    <button onClick={() => onUpdateStatus?.(order.id, "accepted")} className="p-2.5 rounded-xl text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 active:scale-90 transition-all duration-150 cursor-pointer" title="قبول الطلب"><FaEye className="text-sm" /></button>
                    <button onClick={() => onUpdateStatus?.(order.id, "completed")} className="p-2.5 rounded-xl text-gray-400 hover:text-blue-600 hover:bg-blue-50 active:scale-90 transition-all duration-150 cursor-pointer" title="تحديد كمكتمل"><FaEdit className="text-sm" /></button>
                    <button onClick={() => onDelete?.(order.id)} className="p-2.5 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 active:scale-90 transition-all duration-150 cursor-pointer" title="حذف الطلب"><FaTrash className="text-sm" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 bg-gray-50/60 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm text-gray-400 font-bold">
        <div>عرض <span className="text-gray-700 font-black">{visibleOrders.length ? (activePage - 1) * pageSize + 1 : 0}</span> إلى <span className="text-gray-700 font-black">{visibleOrders.length ? (activePage - 1) * pageSize + visibleOrders.length : 0}</span> من أصل <span className="text-gray-700 font-black">{orders.length}</span> طلب</div>
        <div className="flex items-center gap-1" dir="ltr">
          <button type="button" disabled={activePage === 1} onClick={() => setCurrentPage((page) => Math.max(1, page - 1))} className="rounded bg-white px-2 py-1 disabled:opacity-40">&lt;</button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <button type="button" key={page} onClick={() => setCurrentPage(page)} className={`rounded px-3 py-1 ${activePage === page ? "bg-emerald-600 text-white font-black" : "border border-gray-200 bg-white text-gray-600"}`}>{page}</button>
          ))}
          <button type="button" disabled={activePage === totalPages} onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))} className="rounded bg-white px-2 py-1 disabled:opacity-40">&gt;</button>
        </div>
      </div>

    </div>
  );
}
