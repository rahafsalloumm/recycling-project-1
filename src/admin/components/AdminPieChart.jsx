import React from "react";

export default function AdminPieChart() {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-full">
      <h3 className="text-base font-bold text-gray-800 mb-2">الطلبات خلال الأشهر</h3>
      <div className="h-40 flex items-end justify-between border-b border-l border-gray-100 pb-2 px-2 gap-2">
        <div className="w-full bg-emerald-500 rounded-t h-1/4"></div>
        <div className="w-full bg-emerald-500 rounded-t h-2/5"></div>
        <div className="w-full bg-emerald-500 rounded-t h-3/5"></div>
        <div className="w-full bg-emerald-600 rounded-t h-1/2"></div>
        <div className="w-full bg-emerald-600 rounded-t h-4/5"></div>
        <div className="w-full bg-emerald-700 rounded-t h-full"></div>
      </div>
      <div className="flex justify-between text-[10px] text-gray-400 mt-2 font-medium">
        <span>يناير</span><span>فبراير</span><span>مارس</span><span>أبريل</span><span>مايو</span><span>يونيو</span>
      </div>
    </div>
  );
}