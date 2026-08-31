import React from "react";

export default function AdminBins() {
  var bins = [
    { id: "BIN-001", name: "الجامعة - الرئيسية", fill: "30%", color: "bg-green-500", textColor: "text-green-600 bg-green-50", type: "طبيعية" },
    { id: "BIN-002", name: "الحي الشرقي - العام", fill: "65%", color: "bg-yellow-500", textColor: "text-yellow-600 bg-yellow-50", type: "متوسطة" },
    { id: "BIN-003", name: "السوق المركزي", fill: "95%", color: "bg-red-500", textColor: "text-red-600 bg-red-50", type: "ممتلئة" },
    { id: "BIN-004", name: "الحديقة العامة", fill: "20%", color: "bg-green-500", textColor: "text-green-600 bg-green-50", type: "طبيعية" },
  ];

  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-bold text-gray-800">الحاويات الذكية بالشوارع</h3>
        <button className="text-xs font-semibold text-emerald-600 hover:underline">عرض الكل</button>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {bins.map(function(bin, idx) {
          return (
            <div key={idx} className="border border-gray-100 p-3 rounded-xl flex flex-col items-center bg-gray-50/30 hover:shadow-md transition-shadow">
              <span className="text-[11px] font-bold text-gray-700">{bin.id}</span>
              <p className="text-[9px] text-gray-400 text-center truncate w-full mt-0.5">{bin.name}</p>
              <div className="w-10 h-14 bg-gray-200 rounded-t-lg rounded-b-xl relative my-3 shadow-inner overflow-hidden border border-gray-300">
                <div className={"absolute bottom-0 w-full " + bin.color} style={{ height: bin.fill }}></div>
              </div>
              <span className="text-sm font-extrabold text-gray-800">{bin.fill}</span>
              <span className={"text-[9px] font-bold px-1.5 py-0.5 rounded mt-1.5 " + bin.textColor}>● {bin.type}</span>
            </div>
          );
        })}
      </div>

      <div className="mt-4 p-2.5 bg-red-50 border border-red-100 text-red-600 text-xs font-bold rounded-xl text-center">
        ⚠️ توجد 8 حاويات ممتلئة بحاجة إلى جمع فوراً!
      </div>
    </div>
  );
}