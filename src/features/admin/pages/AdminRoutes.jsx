import React, { useState } from "react";
import { FaRoute, FaPlus, FaSearch, FaCheckCircle, FaSpinner, FaClock, FaRoad, FaHistory } from "react-icons/fa";

import RouteStatCard from "../components/routes/RouteStatCard";
import RoutesTable from "../components/routes/RoutesTable";
import RoutesInsights from "../components/routes/RoutesInsights";
import RoutesBottomCharts from "../components/routes/RoutesBottomCharts";

export default function AdminRoutes() {
  const [searchTerm, setSearchTerm] = useState("");

  // مصفوفة البيانات المطابقة للأسطر الظاهرة في الصورة
  const routesData = [
    { id: 1, routeName: "المسار 1", desc: "الجامعة والمناطق المجاورة", driverName: "أحمد محمود", driverId: "DRV-001", status: "مكتمل", fontColor: "text-emerald-700 bg-emerald-50 border-emerald-100", progress: 100, distance: "28 كم", binsCount: 14, estTime: "2.5 ساعة" },
    { id: 2, routeName: "المسار 2", desc: "الحي السكني - الشمال", driverName: "خالد ناصر", driverId: "DRV-002", status: "قيد التنفيذ", fontColor: "text-blue-700 bg-blue-50 border-blue-100", progress: 75, distance: "32 كم", binsCount: 16, estTime: "3.2 ساعة" },
    { id: 3, routeName: "المسار 3", desc: "المنطقة التجارية", driverName: "محمد علي", driverId: "DRV-003", status: "قيد التنفيذ", fontColor: "text-blue-700 bg-blue-50 border-blue-100", progress: 50, distance: "24 كم", binsCount: 12, estTime: "2.8 ساعة" },
    { id: 4, routeName: "المسار 4", desc: "المنطقة الصناعية", driverName: "يوسف سامي", driverId: "DRV-004", status: "لم يبدأ", fontColor: "text-gray-600 bg-gray-50 border-gray-200", progress: 0, distance: "35 كم", binsCount: 18, estTime: "3.5 ساعة" },
    { id: 5, routeName: "المسار 5", desc: "الحي الغربي", driverName: "سامي حسن", driverId: "DRV-005", status: "لم يبدأ", fontColor: "text-gray-600 bg-gray-50 border-gray-200", progress: 0, distance: "18 كم", binsCount: 9, estTime: "2 ساعة" },
    { id: 6, routeName: "المسار 6", desc: "المنطقة الجنوبية", driverName: "أحمد محمود", driverId: "DRV-001", status: "مكتمل", fontColor: "text-emerald-700 bg-emerald-50 border-emerald-100", progress: 100, distance: "22 كم", binsCount: 11, estTime: "2.2 ساعة" }
  ];

  const filteredRoutes = routesData.filter(route =>
    route.routeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.driverName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full space-y-6 text-right font-sans p-1 animate-fadeIn duration-300" dir="rtl">
      
      {/* هيدر الصفحة */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.01)]">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-emerald-600 rounded-full block"></span>
            إدارة المسارات
          </h1>
          <p className="text-sm text-gray-400 mt-1.5 font-medium">إنشاء وإدارة مسارات جمع النفايات وتوزيعها الذكي على السائقين بالميدان</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl text-sm font-bold shadow-md shadow-emerald-600/10 hover:bg-emerald-700 transition-all duration-300 cursor-pointer active:scale-98">
          <FaPlus className="text-xs" /> 
          <span>إنشاء مسار جديد</span>
        </button>
      </div>

      {/* الكروت الإحصائية الخمسة العلوية كالصورة */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <RouteStatCard title="إجمالي المسارات" value="18" desc="+2 عن الشهر الماضي" icon={<FaRoute />} bgIcon="text-emerald-600 bg-emerald-50" />
        <RouteStatCard title="مسارات نشطة" value="12" desc="+3 عن الشهر الماضي" icon={<FaSpinner className="animate-spin" />} bgIcon="text-blue-600 bg-blue-50" />
        <RouteStatCard title="مسارات مكتملة اليوم" value="8" desc="+4 عن أمس" icon={<FaCheckCircle />} bgIcon="text-green-600 bg-green-50" />
        <RouteStatCard title="المسافة الإجمالية اليوم" value="256 كم" desc="-1.2 كم عن أمس" icon={<FaRoad />} bgIcon="text-purple-600 bg-purple-50" />
        <RouteStatCard title="الوقت الإجمالي اليوم" value="18.5 ساعة" desc="-1.5 ساعة عن أمس" icon={<FaClock />} bgIcon="text-amber-500 bg-amber-50" />
      </div>

      {/* شريط خيارات البحث والتصفية للجدول */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 text-sm">
            <FaSearch />
          </span>
          <input
            type="text"
            placeholder="ابحث عن مسار..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-4 pr-11 py-3 bg-gray-50/50 border border-gray-200/60 rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-right font-medium text-gray-800"
          />
        </div>
        
        <div className="flex gap-3 w-full md:w-auto justify-end">
          <select className="bg-gray-50 border border-gray-200 rounded-xl py-2 px-4 text-xs font-bold text-gray-600 focus:outline-none cursor-pointer">
            <option>جميع السائقين</option>
          </select>
          <select className="bg-gray-50 border border-gray-200 rounded-xl py-2 px-4 text-xs font-bold text-gray-600 focus:outline-none cursor-pointer">
            <option>جميع الحالات</option>
          </select>
        </div>
      </div>

      {/* جدول المسارات والتفاصيل الجانبية متجاورة */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 items-start">
        <div className="xl:col-span-3">
          <RoutesTable routes={filteredRoutes} />
        </div>
        <div className="xl:col-span-1">
          <RoutesInsights />
        </div>
      </div>

      {/* قسم المخططات والرسوم الإحصائية السفلية المدمج */}
      <RoutesBottomCharts />

    </div>
  );
}
