import { FaUsers, FaTruck, FaClipboardList, FaTrash, FaRoute, FaBoxes, FaPlus, FaFileAlt } from "react-icons/fa";

import AdminStatCard from "@/features/admin/components/shared/AdminStatCard";
import AdminTable from "@/features/admin/components/shared/AdminTable";
import AdminBins from "@/features/admin/components/shared/AdminBins";
import AdminCharts from "@/features/admin/components/shared/AdminCharts";
import AdminMap from "@/features/admin/components/shared/AdminMap";

export default function Dashboard() {
  var ordersData = [
    { id: "#1258", user: "أحمد محمد", type: "بلاستيك", qty: "10 كغ", status: "قيد المراجعة", color: "text-orange-600 bg-orange-50" },
    { id: "#1257", user: "سارة علي", type: "ورق", qty: "5 كغ", status: "تم القبول", color: "text-green-600 bg-green-50" },
    { id: "#1256", user: "محمد خالد", type: "زجاج", qty: "7 كغ", status: "تم الاستلام", color: "text-blue-600 bg-blue-50" },
    { id: "#1255", user: "ليلى حسن", type: "معدن", qty: "3 كغ", status: "قيد التنفيذ", color: "text-purple-600 bg-purple-50" },
    { id: "#1254", user: "يوسف سامي", type: "ورق", qty: "4 كغ", status: "مرفوض", color: "text-red-600 bg-red-50" }
  ];

  return (
    <div className="w-full space-y-6 text-right font-sans p-1">
      
      {/* 1. قسم الكروت العلوية الستة */}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-4">
        <AdminStatCard title="المستخدمون" value="120" desc="+8% عن الشهر الماضي" descColor="text-green-500" icon={<FaUsers />} iconBg="text-green-500 bg-green-50" />
        <AdminStatCard title="السائقون" value="12" desc="متاح: 6" descColor="text-blue-500" icon={<FaTruck />} iconBg="text-blue-500 bg-blue-50" />
        <AdminStatCard title="الطلبات" value="85" desc="قيد التنفيذ: 18" descColor="text-orange-500" icon={<FaClipboardList />} iconBg="text-orange-500 bg-orange-50" />
        <AdminStatCard title="الحاويات الذكية" value="42" desc="ممتلئة: 8" descColor="text-red-500" icon={<FaTrash />} iconBg="text-red-500 bg-red-50" />
        <AdminStatCard title="المسارات" value="5" desc="نشطة حالياً" descColor="text-teal-500" icon={<FaRoute />} iconBg="text-teal-500 bg-teal-50" />
        <AdminStatCard title="كمية النفايات المعاد تدويرها" value="3.5 طن" desc="+12% عن الشهر الماضي" descColor="text-emerald-500" icon={<FaBoxes />} iconBg="text-emerald-500 bg-emerald-50" />
      </div>

      {/* 2. الصف الثاني: جدول الطلبات + كروت البراميل الملونة المستوردة */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <AdminTable orders={ordersData} />
        <AdminBins />
      </div>

      {/* 3. الصف الثالث: الرسوم البيانية + النشاطات + الخريطة */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AdminCharts />

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-base font-bold text-gray-800 mb-4">آخر النشاطات</h3>
          <div className="space-y-3.5 text-xs">
            <div className="flex justify-between items-center border-b border-gray-50 pb-2">
              <span className="text-gray-500">تم إنشاء طلب جديد من أحمد محمد</span>
              <span className="text-[10px] text-gray-400 font-medium">منذ 5 دقائق</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-50 pb-2">
              <span className="text-gray-500">تم قبول الطلالطلب رقم #1257</span>
              <span className="text-[10px] text-gray-400 font-medium">منذ 15 دقيقة</span>
            </div>
          </div>
        </div>

        <AdminMap />
      </div>

      {/* 4. قسم الإجراءات السريعة بالتذييل */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <h4 className="text-xs font-bold text-gray-400 mb-3">إجراءات سريعة لمدير النظام</h4>
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-700 hover:text-white transform hover:-translate-y-0.5"><FaPlus /><span>إضافة مستخدم</span></button>
 <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 bg-blue-50 text-blue-700 hover:bg-blue-700 hover:text-white transform hover:-translate-y-0.5"><FaPlus /><span>إضافة سائق</span></button>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 bg-orange-50 text-orange-700 hover:bg-orange-700 hover:text-white transform hover:-translate-y-0.5"><FaPlus /><span>إضافة حاوية</span></button>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 bg-purple-50 text-purple-700 hover:bg-purple-700 hover:text-white transform hover:-translate-y-0.5"><FaRoute /><span>إنشاء مسار جديد</span></button>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 bg-gray-100 text-gray-700 hover:bg-gray-700 hover:text-white transform hover:-translate-y-0.5"><FaFileAlt /><span>تقرير جديد</span></button>
        </div>
      </div>

    </div>
  );
}