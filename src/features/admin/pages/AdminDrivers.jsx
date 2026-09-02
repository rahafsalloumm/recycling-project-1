import {  useState  } from 'react';
import { FaTruck, FaUserCheck, FaClock, FaExclamationTriangle, FaSearch, FaPlus, FaCheckCircle, FaChartLine, FaTrophy } from "react-icons/fa";

import DriverStatCard from "@/features/admin/components/drivers/DriverStatCard";
import DriversTable from "@/features/admin/components/drivers/DriversTable";
import DriversInsights from "@/features/admin/components/drivers/DriversInsights";

export default function AdminDrivers() {
  const [searchTerm, setSearchTerm] = useState("");

  const driversData = [
    { id: 1, name: "أحمد محمود", idCode: "DVR-001", phone: "+963 91 123 4567", region: "الجميلية", status: "متاح", tasks: 45, date: "2024-01-10" },
    { id: 2, name: "خالد ناصر", idCode: "DVR-002", phone: "+963 91 234 5678", region: "الشهباء", status: "في مهمة", tasks: 32, date: "2024-01-15" },
    { id: 3, name: "محمد علي", idCode: "DVR-003", phone: "+963 91 345 6789", region: "حلب الجديدة", status: "في مهمة", tasks: 28, date: "2024-01-20" },
    { id: 4, name: "يوسف سامي", idCode: "DVR-004", phone: "+963 91 456 7890", region: "الميدان", status: "متاح", tasks: 50, date: "2024-02-01" },
    { id: 5, name: "سامي حسن", idCode: "DVR-005", phone: "+963 91 567 8901", region: "العزيزية", status: "في مهمة", tasks: 21, date: "2024-02-05" },
    { id: 6, name: "محمود عادل", idCode: "DVR-006", phone: "+963 91 678 9012", region: "الشيخ مقصود", status: "غير نشط", tasks: 10, date: "2024-02-18" }
  ];

  const filteredDrivers = driversData.filter(driver =>
    driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.idCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full space-y-6 text-right font-sans p-1 animate-fadeIn duration-300" dir="rtl">
      
      {/* هيدر الصفحة الفخم والواضح وعريض الكلمات */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.01)]">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-emerald-600 rounded-full block"></span>
            إدارة السائقين
          </h1>
          <p className="text-sm text-gray-400 mt-1.5 font-medium">عرض وإدارة جميع السائقين بالميدان، تتبع حالتهم وتكليفات المهام</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl text-sm font-bold shadow-md shadow-emerald-600/10 hover:bg-emerald-700 transition-all duration-300 cursor-pointer active:scale-98">
          <FaPlus className="text-xs" /> 
          <span>إضافة سائق جديد</span>
        </button>
      </div>

      {/* الكروت العلوية الأربعة بهوية متزنة وألوان ناعمة جداً */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <DriverStatCard title="إجمالي السائقين" value="12" desc="سائق مسجل بالنظام" icon={<FaTruck />} bgIcon="text-emerald-600 bg-emerald-50" />
        <DriverStatCard title="متاح الآن" value="6" desc="سائق مستعد للاستلام" icon={<FaUserCheck />} bgIcon="text-blue-600 bg-blue-50" />
        <DriverStatCard title="في مهمة" value="5" desc="سائق يخدم مساراً حالياً" icon={<FaClock />} bgIcon="text-amber-600 bg-amber-50" /> {/* تم تعديل اللون ليتطابق مع الـ Badge */}
        <DriverStatCard title="غير نشط" value="1" desc="سائق خارج الدوام" icon={<FaExclamationTriangle />} bgIcon="text-gray-500 bg-gray-100" />
      </div>

      {/* شريط البحث المريح للعين */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div className="relative w-full">
          <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 text-sm">
            <FaSearch />
          </span>
          <input
            type="text"
            placeholder="ابحث باسم السائق أو كود المعرف (DVR)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-4 pr-11 py-3.5 bg-gray-50/50 border border-gray-200/60 rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 shadow-inner transition-all duration-300 text-right font-medium text-gray-800"
          />
        </div>
      </div>

      {/* الأقسام المتجاورة */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        <div className="xl:col-span-2">
          <DriversTable drivers={filteredDrivers} />
        </div>
        <div className="xl:col-span-1">
          <DriversInsights />
        </div>
      </div>

      {/* القسم الإحصائي السفلي المطور وبحجم كلمات مريح وقوي */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
          <h4 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2 w-full justify-start">
            <FaCheckCircle className="text-emerald-500 text-base" /> نسبة إنجاز المهام
          </h4>
          <div className="relative flex items-center justify-center my-3">
            <div className="w-32 h-32 rounded-full border-[10px] border-gray-100 flex items-center justify-center">
              <span className="text-2xl font-black text-gray-900 font-mono">78%</span>
              <div className="absolute inset-0 w-32 h-32 rounded-full border-[10px] border-transparent border-t-emerald-500 border-r-emerald-500 border-l-emerald-500/40 transform rotate-45"></div>
            </div>
          </div>
          <p className="text-xs text-gray-400 font-semibold mt-3">إجمالي الإنجاز والمهام المكتملة بالميدان</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h4 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FaChartLine className="text-blue-500 text-base" /> المهام المنجزة هذا الشهر
          </h4>
          <div className="h-32 flex items-end justify-between gap-2 px-2 border-b border-gray-100 pb-1">
            <div className="w-full bg-emerald-100/40 rounded-t-md transition-all duration-300 hover:bg-emerald-500 h-[30%]"></div>
            <div className="w-full bg-emerald-100/40 rounded-t-md transition-all duration-300 hover:bg-emerald-500 h-[45%]"></div>
            <div className="w-full bg-emerald-500 rounded-t-md h-[75%]"></div>
            <div className="w-full bg-emerald-100/40 rounded-t-md transition-all duration-300 hover:bg-emerald-500 h-[60%]"></div>
            <div className="w-full bg-emerald-500 rounded-t-md h-[90%]"></div>
          </div>
          <div className="flex justify-between text-xs text-gray-400 font-bold px-1 mt-3">
            <span>أسبوع 1</span>
            <span>أسبوع 2</span>
            <span>أسبوع 3</span>
            <span>أسبوع 4</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h4 className="text-sm font-bold text-gray-800 mb-5 flex items-center gap-2">
            <FaTrophy className="text-amber-500 text-base" /> أعلى السائقين أداءً
          </h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm border-b border-gray-50 pb-2">
              <span className="font-bold text-gray-800">1. يوسف سامي</span>
              <span className="font-mono text-emerald-600 font-black">50 مهمة</span>
            </div>
            <div className="flex justify-between items-center text-sm border-b border-gray-50 pb-2">
              <span className="font-bold text-gray-800">2. أحمد محمود</span>
              <span className="font-mono text-emerald-600 font-black">45 مهمة</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="font-bold text-gray-800">3. خالد ناصر</span>
              <span className="font-mono text-emerald-600 font-black">32 مهمة</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}


