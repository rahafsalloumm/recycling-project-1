import {  useState  } from 'react';
import { FaTrash, FaPlus, FaSearch, FaCheckCircle, FaExclamationTriangle, FaTimesCircle } from "react-icons/fa";

import BinStatCard from "../components/bins/BinStatCard";
import BinsTable from "../components/bins/BinsTable";
import BinsInsights from "../components/bins/BinsInsights";

export default function AdminBins() {
  const [searchTerm, setSearchTerm] = useState("");

  // مصفوفة البيانات المتطابقة تماماً مع الأسطر الـ 8 في الصورة
  const binsData = [
    { id: 1, code: "BIN-001", location: "الجامعة - البوابة الرئيسية", region: "المنطقة الشمالية", fillLevel: 30, status: "طبيعية", lastUpdate: "منذ 10 دقائق" },
    { id: 2, code: "BIN-002", location: "الحي السكني - الشارع العام", region: "المنطقة الشرقية", fillLevel: 65, status: "بحاجة للجمع", lastUpdate: "منذ 15 دقيقة" },
    { id: 3, code: "BIN-003", location: "السوق المركزي", region: "المنطقة الوسطى", fillLevel: 95, status: "ممتلئة", lastUpdate: "منذ 5 دقائق" },
    { id: 4, code: "BIN-004", location: "الحديقة العامة", region: "المنطقة الغربية", fillLevel: 20, status: "طبيعية", lastUpdate: "منذ 20 دقيقة" },
    { id: 5, code: "BIN-005", location: "المستشفى الحكومي", region: "المنطقة الشرقية", fillLevel: 80, status: "بحاجة للجمع", lastUpdate: "منذ 8 دقائق" },
    { id: 6, code: "BIN-006", location: "مدرسة المستقبل", region: "المنطقة الشمالية", fillLevel: 98, status: "ممتلئة", lastUpdate: "منذ 3 دقائق" },
    { id: 7, code: "BIN-007", location: "مركز المدينة", region: "المنطقة الوسطى", fillLevel: 45, status: "طبيعية", lastUpdate: "منذ 25 دقيقة" },
    { id: 8, code: "BIN-008", location: "المجمع التجاري", region: "المنطقة الغربية", fillLevel: 70, status: "بحاجة للجمع", lastUpdate: "منذ 12 دقيقة" }
  ];

  const filteredBins = binsData.filter(bin =>
    bin.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bin.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full space-y-6 text-right font-sans p-1 animate-fadeIn duration-300" dir="rtl">
      
      {/* هيدر الصفحة */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.01)]">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-emerald-600 rounded-full block"></span>
            إدارة الحاويات الذكية
          </h1>
          <p className="text-sm text-gray-400 mt-1.5 font-medium">عرض ومراقبة جميع الحاويات الذكية وحالة امتلائها بالوقت الفعلي</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl text-sm font-bold shadow-md shadow-emerald-600/10 hover:bg-emerald-700 transition-all duration-300 cursor-pointer active:scale-98">
          <FaPlus className="text-xs" /> 
          <span>إضافة حاوية جديدة</span>
        </button>
      </div>

      {/* كروت الإحصائيات الأربعة العلوية كالصورة */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <BinStatCard title="إجمالي الحاويات" value="42" desc="+2 عن الشهر الماضي" icon={<FaTrash />} bgIcon="text-emerald-600 bg-emerald-50" />
        <BinStatCard title="حاويات طبيعية" value="18" desc="43% من الإجمالي" icon={<FaCheckCircle />} bgIcon="text-green-600 bg-green-50" />
        <BinStatCard title="حاويات بحاجة للجمع" value="16" desc="38% من الإجمالي" icon={<FaExclamationTriangle />} bgIcon="text-amber-500 bg-amber-50" />
        <BinStatCard title="حاويات ممتلئة" value="8" desc="19% من الإجمالي" icon={<FaTimesCircle />} bgIcon="text-red-600 bg-red-50" />
      </div>

      {/* حقل البحث المشترك وفلاتر الخيارات */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 text-sm">
            <FaSearch />
          </span>
          <input
            type="text"
            placeholder="البحث عن حاوية..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-4 pr-11 py-3 bg-gray-50/50 border border-gray-200/60 rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-right font-medium text-gray-800"
          />
        </div>
        
        <div className="flex gap-3 w-full md:w-auto justify-end">
          <select className="bg-gray-50 border border-gray-200 rounded-xl py-2 px-4 text-xs font-bold text-gray-600 focus:outline-none cursor-pointer">
            <option>جميع الحالات</option>
            <option>طبيعية</option>
            <option>بحاجة للجمع</option>
            <option>ممتلئة</option>
          </select>
          <select className="bg-gray-50 border border-gray-200 rounded-xl py-2 px-4 text-xs font-bold text-gray-600 focus:outline-none cursor-pointer">
            <option>جميع المناطق</option>
            <option>المنطقة الشمالية</option>
            <option>المنطقة الشرقية</option>
            <option>المنطقة الوسطى</option>
            <option>المنطقة الغربية</option>
          </select>
        </div>
      </div>

      {/* قسم جدول الحاويات والأقسام الجانبية المتجاورة */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 items-start">
        <div className="xl:col-span-3">
          <BinsTable bins={filteredBins} />
        </div>
        <div className="xl:col-span-1">
          <BinsInsights />
        </div>
      </div>

    </div>
  );
}
