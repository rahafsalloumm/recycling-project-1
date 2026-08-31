
export default function ReportsTopCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" dir="rtl">
      
      {/* 1. مخطط الطلبات خلال الفترة */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
        <h4 className="text-sm font-bold text-gray-800 mb-4">الطلبات خلال الفترة</h4>
        <div className="h-32 flex items-end justify-between relative px-2 border-b border-gray-100 pb-1">
          <div className="w-full bg-emerald-500/10 h-[40%] rounded-t relative hover:bg-emerald-500/20 transition-all duration-200">
            <div className="absolute top-0 left-1/2 w-2 h-2 bg-emerald-600 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-sm"></div>
          </div>
          <div className="w-full bg-emerald-500/10 h-[65%] rounded-t relative hover:bg-emerald-500/20 transition-all duration-200">
            <div className="absolute top-0 left-1/2 w-2 h-2 bg-emerald-600 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-sm"></div>
          </div>
          <div className="w-full bg-emerald-500/10 h-[50%] rounded-t relative hover:bg-emerald-500/20 transition-all duration-200">
            <div className="absolute top-0 left-1/2 w-2 h-2 bg-emerald-600 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-sm"></div>
          </div>
          <div className="w-full bg-emerald-500/10 h-[85%] rounded-t relative hover:bg-emerald-500/20 transition-all duration-200">
            <div className="absolute top-0 left-1/2 w-2 h-2 bg-emerald-600 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-sm"></div>
          </div>
        </div>
        <div className="flex justify-between text-[10px] text-gray-400 font-bold mt-2 font-mono px-1">
          <span>1 مايو</span><span>10 مايو</span><span>20 مايو</span><span>31 مايو</span>
        </div>
      </div>

      {/* 2. مخطط كمية النفايات المجمعة */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
        <h4 className="text-sm font-bold text-gray-800 mb-4">كمية النفايات المجمعة (طن)</h4>
        <div className="h-32 flex items-end justify-between gap-1 px-1 border-b border-gray-100 pb-1">
          <div className="w-2 bg-emerald-500 rounded-t h-[40%]"></div>
          <div className="w-2 bg-emerald-500/30 rounded-t h-[60%]"></div>
          <div className="w-2 bg-emerald-500 rounded-t h-[75%]"></div>
          <div className="w-2 bg-emerald-500/30 rounded-t h-[50%]"></div>
          <div className="w-2 bg-emerald-500 rounded-t h-[90%]"></div>
          <div className="w-2 bg-emerald-500/30 rounded-t h-[65%]"></div>
          <div className="w-2 bg-emerald-500 rounded-t h-[80%]"></div>
          <div className="w-2 bg-emerald-500/30 rounded-t h-[55%]"></div>
          <div className="w-2 bg-emerald-500 rounded-t h-[70%]"></div>
        </div>
        <div className="flex justify-between text-[10px] text-gray-400 font-bold mt-2 font-mono px-1">
          <span>1 مايو</span><span>10 مايو</span><span>20 مايو</span><span>31 مايو</span>
        </div>
      </div>

      {/* 3. مخطط أنواع النفايات الأكثر جمعاً */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center">
        <h4 className="text-sm font-bold text-gray-800 mb-3 w-full text-right">أنواع النفايات الأكثر جمعاً</h4>
        <div className="flex items-center justify-between w-full gap-4 mt-2">
          <div className="w-28 h-28 rounded-full border-[10px] border-transparent border-t-emerald-500 border-r-blue-500 border-b-amber-500 border-l-purple-500 flex items-center justify-center shadow-inner relative flex-shrink-0">
            <span className="text-center font-black text-gray-900 text-xs font-mono">100%</span>
          </div>
          <div className="space-y-1.5 text-xs font-bold text-gray-500 w-full">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500"></span><span>بلاستيك</span></div>
              <span className="font-mono text-gray-700 text-[11px]">40% (11.3)</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500"></span><span>ورق</span></div>
              <span className="font-mono text-gray-700 text-[11px]">25% (7.1)</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500"></span><span>زجاج</span></div>
              <span className="font-mono text-gray-700 text-[11px]">15% (4.3)</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-purple-500"></span><span>معادن</span></div>
              <span className="font-mono text-gray-700 text-[11px]">10% (2.8)</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
