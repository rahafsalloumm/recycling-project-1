import {  useState  } from 'react';
import { FaClipboardList, FaCheckCircle, FaSpinner, FaClock, FaTimesCircle, FaPlus, FaSearch } from "react-icons/fa";

import OrderStatCard from "../components/orders/OrderStatCard";
import OrdersTable from "../components/orders/OrdersTable";
import OrdersInsights from "../components/orders/OrdersInsights";

export default function AdminOrders() {
  const [searchTerm, setSearchTerm] = useState("");

  // مصفوفة البيانات الأساسية للطلبات المتطابقة مع الصورة
  const ordersData = [
    { id: 1, reqCode: "#REQ-2401", name: "أحمد محمد", email: "ahmad.m@gmail.com", type: "بلاستيك", qty: "5 كغ", address: "رام الله - شارع الإرسال", date: "2024-05-20 10:30 AM", status: "قيد المراجعة" },
    { id: 2, reqCode: "#REQ-2402", name: "سارة خالد", email: "sara.k@gmail.com", type: "ورق", qty: "8 كغ", address: "البيرة - حي البالوع", date: "2024-05-20 09:15 AM", status: "قيد التنفيذ" },
    { id: 3, reqCode: "#REQ-2403", name: "محمد علي", email: "mohamed.a@gmail.com", type: "زجاج", qty: "3 كغ", address: "رام الله - عين منجد", date: "2024-05-19 04:45 PM", status: "تم الاستلام" },
    { id: 4, reqCode: "#REQ-2404", name: "ليلى حسن", email: "laila.h@gmail.com", type: "معدن", qty: "10 كغ", address: "بيت لحم - شارع المهد", date: "2024-05-19 11:20 AM", status: "قيد المراجعة" },
    { id: 5, reqCode: "#REQ-2405", name: "يوسف سامي", email: "yousef.s@gmail.com", type: "بلاستيك", qty: "6 كغ", address: "الخليل - دوار التحرير", date: "2024-05-18 03:10 PM", status: "ملغاة" },
    { id: 6, reqCode: "#REQ-2406", name: "نور إياد", email: "noor.e@gmail.com", type: "ورق", qty: "4 كغ", address: "نابلس - رفيديا", date: "2024-05-18 10:05 AM", status: "تم الاستلام" },
    { id: 7, reqCode: "#REQ-2407", name: "خالد ناصر", email: "khaled.n@gmail.com", type: "زجاج", qty: "7 كغ", address: "أريحا - شارع السلالم", date: "2024-05-17 02:30 PM", status: "قيد التنفيذ" },
    { id: 8, reqCode: "#REQ-2408", name: "رنا أيمن", email: "rana.a@gmail.com", type: "معدن", qty: "2 كغ", address: "رام الله - الماصيون", date: "2024-05-17 09:45 AM", status: "قيد المراجعة" }
  ];

  const filteredOrders = ordersData.filter(order =>
    order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.reqCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full space-y-6 text-right font-sans p-1 animate-fadeIn duration-300" dir="rtl">
      
      {/* هيدر الصفحة الفخم */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.01)]">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-emerald-600 rounded-full block"></span>
            إدارة الطلبات
          </h1>
          <p className="text-sm text-gray-400 mt-1.5 font-medium">عرض جميع طلبات جمع النفايات وإدارتها وتحديث حالات الاستلام</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl text-sm font-bold shadow-md shadow-emerald-600/10 hover:bg-emerald-700 transition-all duration-300 cursor-pointer active:scale-98">
          <FaPlus className="text-xs" /> 
          <span>طلب جديد</span>
        </button>
      </div>

      {/* الكروت العلوية الخمسة كما تظهر بالصورة المرفقة */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <OrderStatCard title="إجمالي الطلبات" value="240" desc="+10% عن الشهر الماضي" icon={<FaClipboardList />} bgIcon="text-emerald-600 bg-emerald-50" />
        <OrderStatCard title="تم الاستلام" value="125" desc="+12% عن الشهر الماضي" icon={<FaCheckCircle />} bgIcon="text-green-600 bg-green-50" />
        <OrderStatCard title="قيد التنفيذ" value="68" desc="+8% عن الشهر الماضي" icon={<FaSpinner />} bgIcon="text-blue-600 bg-blue-50" />
        <OrderStatCard title="قيد المراجعة" value="32" desc="-5% عن الشهر الماضي" icon={<FaClock />} bgIcon="text-amber-500 bg-amber-50" />
        <OrderStatCard title="ملغاة" value="15" desc="-3% عن الشهر الماضي" icon={<FaTimesCircle />} bgIcon="text-red-600 bg-red-50" />
      </div>

      {/* شريط البحث النظيف */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div className="relative w-full">
          <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 text-sm">
            <FaSearch />
          </span>
          <input
            type="text"
            placeholder="ابحث برقم الطلب أو اسم المستخدم..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-4 pr-11 py-3.5 bg-gray-50/50 border border-gray-200/60 rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 shadow-inner transition-all duration-300 text-right font-medium text-gray-800"
          />
        </div>
      </div>

      {/* قسم جدول الطلبات والإحصائيات الجانبية متجاورة */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 items-start">
        <div className="xl:col-span-3">
          <OrdersTable orders={filteredOrders} />
        </div>
        <div className="xl:col-span-1">
          <OrdersInsights />
        </div>
      </div>

    </div>
  );
}
