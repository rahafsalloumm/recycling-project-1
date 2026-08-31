import React from "react";
import { FaMapMarkerAlt, FaChartPie, FaInfoCircle } from "react-icons/fa";

export default function BinsInsights() {
  return (
    <div className="space-y-6" dir="rtl">
      
      {/* خريطة الحاويات الحية البرمجية */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
        <h4 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-1.5 border-b border-gray-50 pb-2">
          <FaMapMarkerAlt className="text-emerald-600" />
          <span>خريطة الحاويات الذكية</span>
        </h4>
        <div className="w-full h-44 bg-emerald-50/30 rounded-xl relative border border-emerald-100/20 flex items-center justify-center overflow-hidden">
          <div className="absolute top-12 right-14 animate-bounce text-red-500 text-base"><FaMapMarkerAlt /></div>
          <div className="absolute top-20 left-24 animate-pulse text-amber-500 text-base"><FaMapMarkerAlt /></div>
          <div className="absolute bottom-8 right-24 text-emerald-600 text-base"><FaMapMarkerAlt /></div>
          <span className="text-xs font-bold text-emerald-800 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-xl shadow-sm border border-emerald-100">
            توزيع النطاق الميداني النشط
          </span>
        </div>
      </div>

      {/* مخطط توزيع الحالات الدائري كالصورة */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col items-center">
        <h4 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-1.5 w-full justify-start border-b border-gray-50 pb-2">
          <FaChartPie className="text-emerald-600" /> توزيع الحالات حسب الحالة
        </h4>
        
        <div className="w-28 h-28 rounded-full border-[10px] border-transparent border-t-green-500 border-r-amber-500 border-b-red-500 flex items-center justify-center relative my-2 shadow-inner">
          <span className="text-center font-black text-gray-900 text-sm font-mono">42<br/><span className="text-[10px] text-gray-400 font-medium">حاوية</span></span>
        </div>
        
        <div className="space-y-2 text-xs font-bold text-gray-500 mt-4 w-full">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500"></span><span>طبيعية</span>
            </div>
            <span className="font-mono text-gray-700">18 (43%)</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span><span>بحاجة للجمع</span>
            </div>
            <span className="font-mono text-gray-700">16 (38%)</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500"></span><span>ممتلئة</span>
            </div>
            <span className="font-mono text-gray-700">8 (19%)</span>
          </div>
        </div>
      </div>

      {/* قسم إحصائيات سريعة سفلي كالصورة */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
        <h4 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-1.5 border-b border-gray-50 pb-2">
          <FaInfoCircle className="text-blue-500 text-xs" />
          <span>إحصائيات سريعة</span>
        </h4>
        <div className="space-y-3 text-xs font-bold text-gray-500">
          <div className="flex justify-between items-center">
            <span>متوسط نسبة الامتلاء</span>
            <span className="font-mono text-emerald-600 text-sm font-black">58%</span>
          </div>
          <div className="flex justify-between items-center">
            <span>إجمالي مرات الجمع اليوم</span>
            <span className="font-mono text-gray-800 text-sm font-black">135 مرة</span>
          </div>
          <div className="flex justify-between items-center">
            <span>آخر عملية جمع</span>
            <span className="text-gray-400 text-[11px] font-medium">منذ 30 دقيقة</span>
          </div>
        </div>
      </div>

    </div>
  );
}
