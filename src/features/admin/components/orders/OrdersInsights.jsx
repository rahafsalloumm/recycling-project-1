import React from "react";
import { FaChartPie, FaFilter, FaUndo } from "react-icons/fa";

export default function OrdersInsights() {
  return (
    <div className="space-y-6">
      
      {/* 1. قسم فلترة الطلبات الكامل والمتطابق مع الصورة */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
        <h4 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-1.5 border-b border-gray-50 pb-2">
          <FaFilter className="text-emerald-600 text-xs" />
          <span>فلترة الطلبات</span>
        </h4>
        
        <div className="space-y-4">
          {/* فلتر الحالة */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400">الحالة</label>
            <select className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-3 text-xs font-semibold text-gray-700 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-200 cursor-pointer">
              <option>جميع الحالات</option>
              <option>قيد المراجعة</option>
              <option>قيد التنفيذ</option>
              <option>تم الاستلام</option>
              <option>ملغاة</option>
            </select>
          </div>

          {/* فلتر نوع النفايات */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400">نوع النفايات</label>
            <select className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-3 text-xs font-semibold text-gray-700 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-200 cursor-pointer">
              <option>جميع الأنواع</option>
              <option>بلاستيك</option>
              <option>ورق</option>
              <option>زجاج</option>
              <option>معدن</option>
            </select>
          </div>

          {/* فلتر الموقع */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400">الموقع</label>
            <select className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-3 text-xs font-semibold text-gray-700 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-200 cursor-pointer">
              <option>جميع المناطق</option>
              <option>حلب الجديدة</option>
              <option>الشعار</option>
              <option>الفرقان</option>
              <option>الاعظمية</option>
            </select>
          </div>

          {/* أزرار الفلترة الملونة والمتجاوبة */}
          <div className="pt-2 space-y-2">
            <button className="w-full py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/10 hover:bg-emerald-700 transition-all duration-200 active:scale-98 cursor-pointer text-center">
              تطبيق الفلتر
            </button>
            
          </div>
        </div>
      </div>

      {/* 2. المخطط الدائري التوضيحي للنسب */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex flex-col items-center">
        <h4 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-1.5 w-full justify-start border-b border-gray-50 pb-2">
          <FaChartPie className="text-emerald-600" /> توزيع الحالات النسبي
        </h4>
        
        <div className="w-32 h-32 rounded-full border-[12px] border-transparent border-t-green-500 border-r-blue-500 border-b-amber-500 border-l-red-500 flex items-center justify-center shadow-inner relative my-2">
          <span className="text-center font-black text-gray-900 text-sm font-mono">240<br/><span className="text-[10px] text-gray-400 font-medium">الكل</span></span>
        </div>
        
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[11px] text-gray-500 font-bold mt-4 w-full">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span><span>قيد مراجعة</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-500 inline-block"></span><span>قيد تنفيذ</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span><span>تم استلام</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500 inline-block"></span><span>ملغاة</span>
          </div>
        </div>
      </div>

    </div>
  );
}

