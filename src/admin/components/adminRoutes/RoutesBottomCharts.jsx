import React from "react";
import { FaChartLine, FaChartPie, FaCalendarAlt } from "react-icons/fa";

export default function RoutesBottomCharts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6" dir="rtl">
      
      {/* 1. مخطط المسافة المقطوعة (كم) */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
        <h4 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
          <FaChartLine className="text-emerald-500" /> المسافة المقطوعة (كم)
        </h4>
        <div className="h-28 flex items-end justify-between gap-1.5 px-1 border-b border-gray-100 pb-1">
          {/* رسم بياني متموج صاعد محاكي للصورة */}
          <div className="w-full bg-emerald-500/20 rounded-t h-[40%] hover:bg-emerald-500 transition-all duration-200"></div>
          <div className="w-full bg-emerald-500/20 rounded-t h-[55%] hover:bg-emerald-500 transition-all duration-200"></div>
          <div className="w-full bg-emerald-500 rounded-t h-[80%]"></div>
          <div className="w-full bg-emerald-500/20 rounded-t h-[65%] hover:bg-emerald-500 transition-all duration-200"></div>
          <div className="w-full bg-emerald-500 rounded-t h-[95%]"></div>
        </div>
        <div className="flex justify-between text-[10px] text-gray-400 font-bold mt-2 font-mono">
          <span>15 مايو</span><span>16 مايو</span><span>17 مايو</span><span>18 مايو</span><span>19 مايو</span>
        </div>
      </div>

      {/* 2. حالة المسارات الكلية */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center">
        <h4 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-1.5 w-full justify-start">
          <FaChartPie className="text-emerald-600" /> حالة المسارات
        </h4>
        <div className="w-24 h-24 rounded-full border-[10px] border-transparent border-t-emerald-500 border-r-blue-500 border-b-gray-300 flex items-center justify-center relative my-1 shadow-inner">
          <span className="text-center font-black text-gray-900 text-xs font-mono">18<br/><span className="text-[9px] text-gray-400 font-medium">مسار</span></span>
        </div>
        <div className="space-y-1.5 text-[11px] font-bold text-gray-500 mt-3 w-full">
          <div className="flex justify-between"><span>• مكتمل</span><span className="text-gray-700 font-mono">6 (33%)</span></div>
          <div className="flex justify-between"><span>• قيد التنفيذ</span><span className="text-gray-700 font-mono">6 (33%)</span></div>
          <div className="flex justify-between"><span>• لم يبدأ</span><span className="text-gray-700 font-mono">6 (33%)</span></div>
        </div>
      </div>

      {/* 3. قائمة المسارات القادمة */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
        <h4 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
          <FaCalendarAlt className="text-amber-500" /> المسارات القادمة
        </h4>
        <div className="space-y-3.5 text-xs font-bold text-gray-500">
          <div className="flex justify-between items-center border-b border-gray-50 pb-2">
            <div><p className="text-gray-800">المسار 4</p><p className="text-[10px] text-gray-400 font-medium">المنطقة الصناعية</p></div>
            <span className="font-mono text-gray-400">12:30 PM</span>
          </div>
          <div className="flex justify-between items-center">
            <div><p className="text-gray-800">المسار 5</p><p className="text-[10px] text-gray-400 font-medium">الحي الغربي</p></div>
            <span className="font-mono text-gray-400">01:00 PM</span>
          </div>
        </div>
      </div>

    </div>
  );
}
