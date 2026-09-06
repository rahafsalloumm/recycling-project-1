
export default function ReportsTopCharts({ analytics = {}, summary = {} }) {
  const safeAnalytics = analytics || {};
  const safeSummary = summary || {};
  const distribution = Array.isArray(safeAnalytics.wasteTypeDistribution) ? safeAnalytics.wasteTypeDistribution : [];
  const orderStats = safeSummary.ordersPage || {};
  const orderBars = [
    { label: "مكتمل", value: Number(orderStats.completedOrders || 0) },
    { label: "قيد التنفيذ", value: Number(orderStats.inProgressOrders || 0) },
    { label: "قيد المراجعة", value: Number(orderStats.pendingOrders || 0) },
    { label: "مرفوض", value: Number(orderStats.cancelledOrders || 0) },
  ];
  const maxOrderCount = Math.max(...orderBars.map((item) => item.value), 1);
  const maxWasteWeight = Math.max(...distribution.map((item) => Number(item.weightKg || 0)), 1);
  const totalWasteWeight = distribution.reduce((sum, item) => sum + Number(item.weightKg || 0), 0);
  const wasteTypes = distribution.slice(0, 4).map((item, index) => ({
    label: item.type || `نوع ${index + 1}`,
    color: ["#10b981", "#3b82f6", "#f59e0b", "#a855f7"][index],
    percentage: totalWasteWeight ? (Number(item.weightKg || 0) / totalWasteWeight) * 100 : 0,
  }));
  const displayedWasteTypes = wasteTypes.map((item, index) => ({
    ...item,
    displayPercentage: index === wasteTypes.length - 1
      ? Math.max(0, 100 - wasteTypes.slice(0, -1).reduce((sum, current) => sum + Math.round(current.percentage), 0))
      : Math.round(item.percentage),
  }));
  const wasteTypeTotal = wasteTypes.reduce((sum, item) => sum + item.percentage, 0);
  let accumulatedPercentage = 0;
  const wasteGradient = wasteTypes.map((item, index) => {
    const start = accumulatedPercentage;
    const end = index === wasteTypes.length - 1 ? 100 : accumulatedPercentage + item.percentage;
    accumulatedPercentage = end;
    return `${item.color} ${start}% ${end}%`;
  }).join(", ");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" dir="rtl">
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
        <h4 className="text-sm font-bold text-gray-800 mb-4">الطلبات خلال الفترة</h4>
        <div className="h-32 flex items-end justify-between relative px-2 border-b border-gray-100 pb-1">
          {orderBars.map((item) => (
            <div key={item.label} title={`${item.value} طلب`} className="w-full bg-emerald-500/10 rounded-t relative hover:bg-emerald-500/20 transition-all duration-200" style={{ height: `${Math.max(5, (item.value / maxOrderCount) * 100)}%` }}>
              <div className="absolute top-0 left-1/2 w-2 h-2 bg-emerald-600 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-sm"></div>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-[10px] text-gray-400 font-bold mt-2 font-mono px-1">
          {orderBars.map((item) => <span key={item.label}>{item.label}</span>)}
        </div>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
        <h4 className="text-sm font-bold text-gray-800 mb-4">كمية النفايات المجمعة (طن)</h4>
        <div className="h-32 flex items-end justify-between gap-1 px-1 border-b border-gray-100 pb-1">
          {distribution.length ? distribution.slice(0, 9).map((item, index) => (
            <div key={`${item.type}-${index}`} title={`${item.weightKg || 0} كغ`} className={`w-2 rounded-t ${index % 2 === 0 ? "bg-emerald-500" : "bg-emerald-500/30"}`} style={{ height: `${Math.max(8, (Number(item.weightKg || 0) / maxWasteWeight) * 100)}%` }}></div>
          )) : (
            <div className="w-full text-center text-xs text-gray-400 self-center">لا توجد بيانات نفايات.</div>
          )}
        </div>
        <div className="flex justify-between text-[10px] text-gray-400 font-bold mt-2 font-mono px-1">
          <span>1</span><span>2</span><span>3</span><span>4</span>
        </div>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center">
        <h4 className="text-sm font-bold text-gray-800 mb-3 w-full text-right">أنواع النفايات الأكثر جمعاً</h4>
        <div className="flex items-center justify-between w-full gap-4 mt-2">
          <div className="w-28 h-28 rounded-full flex items-center justify-center shadow-inner relative flex-shrink-0" style={{ background: wasteTypes.length ? `conic-gradient(${wasteGradient})` : "#e5e7eb" }}>
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
              <span className="text-center font-black text-gray-900 text-xs font-mono">{Math.round(wasteTypeTotal)}%</span>
            </div>
          </div>
          <div className="space-y-1.5 text-xs font-bold text-gray-500 w-full">
            {displayedWasteTypes.length ? displayedWasteTypes.map((item) => (
              <div key={item.label} className="flex justify-between items-center">
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span><span>{item.label}</span></div>
                <span className="font-mono text-gray-700 text-[11px]">{item.displayPercentage}%</span>
              </div>
            )) : <div className="text-xs text-gray-400">لا توجد بيانات لأنواع النفايات.</div>}
          </div>
        </div>
      </div>

    </div>
  );
}
