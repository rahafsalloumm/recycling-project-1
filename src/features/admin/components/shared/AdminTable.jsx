import { FaCheck, FaXmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function AdminTable(props) {
  const navigate = useNavigate();
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-bold text-gray-800">آخر الطلبات</h3>
        <button type="button" onClick={() => navigate("/admin/orders")} className="text-xs font-semibold text-emerald-600 hover:underline">عرض الكل</button>
      </div>
      <div className="overflow-x-auto w-full">
        <table className="w-full text-right border-collapse text-xs">
          <thead>
            <tr className="border-b border-gray-100 text-gray-400 font-bold bg-gray-50/50">
              <th className="p-3">رقم الطلب</th>
              <th>المستخدم</th>
              <th>نوع النفايات</th>
              <th>الكمية</th>
              <th>الحالة</th>
              <th className="text-center">الإجراء</th>
            </tr>
          </thead>
          <tbody>
            {props.orders && props.orders.map(function(order, idx) {
              return (
                <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="p-3 font-bold text-gray-400">{order.id}</td>
                  <td className="font-semibold text-gray-800">{order.user}</td>
                  <td className="text-gray-500">{order.type}</td>
                  <td className="font-bold text-emerald-600">{order.qty}</td>
                  <td>
                    <span className={"px-2.5 py-0.5 rounded-full font-bold text-[10px] " + order.color}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-2">
                    <div className="flex gap-1.5 justify-center">
                      <button type="button" onClick={() => navigate('/admin/orders')} className="w-6 h-6 rounded-md bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-500 hover:text-white transition-colors" aria-label="فتح الطلبات">
                        <FaCheck size={9} />
                      </button>
                      <button type="button" onClick={() => navigate('/admin/orders')} className="w-6 h-6 rounded-md bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors" aria-label="فتح الطلبات">
                        <FaXmark size={9} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}