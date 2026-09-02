import { FiEye } from "react-icons/fi";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";

const statusStyles = {
  "قيد الانتظار": "bg-yellow-100 text-yellow-700",
  "تم التسليم": "bg-green-100 text-green-700",
  "تم الطلب": "bg-blue-100 text-blue-700",
};

export default function MyRewardsTable({ rewards = [] }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <HiOutlineClipboardDocumentList className="text-xl text-gray-500" />
        <div className="text-right">
          <h3 className="font-bold text-gray-800">المكافآت المستبدلة</h3>
          <p className="text-sm text-gray-500">
            تابع حالة المكافآت التي قمت باستبدالها
          </p>
        </div>
      </div>

      <table className="w-full text-right">
        <thead>
          <tr className="text-gray-500 text-sm border-b">
            <th className="py-2">الإجراءات</th>
            <th className="py-2">الحالة</th>
            <th className="py-2">النقاط</th>
            <th className="py-2">المكافأة</th>
          </tr>
        </thead>
        <tbody>
          {rewards.map((item, idx) => (
            <tr key={idx} className="border-b last:border-0">
              <td className="py-3">
                <button className="flex items-center gap-1 border border-gray-200 text-gray-600 rounded-lg px-3 py-1 text-sm hover:bg-gray-50">
                  <FiEye />
                  عرض
                </button>
              </td>
              <td className="py-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[item.status]}`}
                >
                  {item.status}
                </span>
              </td>
              <td className="py-3 font-semibold text-gray-800">
                {item.points.toLocaleString()}
              </td>
              <td className="py-3 text-gray-800">{item.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}