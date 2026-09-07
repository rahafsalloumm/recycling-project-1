export default function ReportsBottomSection({ analytics = {}, summary = {} }) {
  const safeAnalytics = analytics || {};
  const safeSummary = summary || {};
  const drivers = Array.isArray(safeAnalytics.driverPerformanceList) ? safeAnalytics.driverPerformanceList : [];
  const totalOrders = safeSummary.ordersPage?.totalOrders ?? 0;
  const totalDrivers = safeSummary.driversPage?.totalDrivers ?? 0;
  const totalRoutes = safeSummary.routesPage?.totalRoutes ?? 0;
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start" dir="rtl">
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm overflow-hidden text-right">
        <h4 className="text-sm font-bold text-gray-800 mb-4">أداء السائقين</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse text-xs font-semibold">
            <thead>
              <tr className="text-gray-400 border-b border-gray-100 pb-2 font-bold">
                <th className="pb-3 pr-2">السائق</th>
                <th className="pb-3 text-center">عدد الرحلات</th>
                <th className="pb-3 text-center">الكمية (طن)</th>
                <th className="pb-3 text-center w-20">نسبة الإنجاز</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 divide-y divide-gray-50 font-bold">
              {drivers.map((driver) => <tr key={driver.driverName} className="hover:bg-gray-50/50"><td className="py-3 pr-2 font-bold text-gray-900">{driver.driverName}</td><td className="py-3 text-center font-mono">{driver.tripsCount}</td><td className="py-3 text-center font-mono">{driver.weightTon}</td><td className="py-3 text-center text-emerald-600 font-mono">{driver.achievementRate}</td></tr>)}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
        <h4 className="text-sm font-bold text-gray-800 mb-4">النفايات المجمعة حسب المنطقة (طن)</h4>
        <div className="w-full h-44 bg-emerald-50/20 rounded-xl relative border border-emerald-100/20 flex items-center justify-center overflow-hidden">
          {(Array.isArray(safeAnalytics.regionalDistributionList) ? safeAnalytics.regionalDistributionList : []).slice(0, 4).map((region, index) => <div key={region.regionName} className={`absolute ${["top-8 right-12", "bottom-8 right-20", "top-12 left-16", "bottom-6 left-12"][index]} w-8 h-8 rounded-full bg-emerald-600/90 text-white font-mono text-[10px] font-bold flex items-center justify-center shadow-md`}>{region.totalWeightTon}</div>)}
          <span className="text-[11px] font-bold text-emerald-800 bg-white/95 px-3 py-1.5 rounded-lg shadow-sm border border-emerald-100">النطاق التوزيعي الجغرافي</span>
        </div>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
        <h4 className="text-sm font-bold text-gray-800 mb-4">ملخص التقرير</h4>
        <div className="space-y-3.5 text-xs font-bold text-gray-500">
          <div className="flex justify-between items-center border-b border-gray-50 pb-2"><span>إجمالي النفايات المجمعة</span><span className="text-gray-900 font-mono text-sm">{safeAnalytics.totalWasteWeightTon || 0} طن</span></div>
          <div className="flex justify-between items-center border-b border-gray-50 pb-2"><span>إجمالي عمليات إعادة التدوير</span><span className="text-gray-900 font-mono text-sm">{safeSummary.ordersPage?.completedOrders || 0} عملية</span></div>
          <div className="flex justify-between items-center border-b border-gray-50 pb-2"><span>إجمالي الطلبات</span><span className="text-gray-900 font-mono text-sm">{totalOrders} طلب</span></div>
          <div className="flex justify-between items-center border-b border-gray-50 pb-2"><span>إجمالي السائقين</span><span className="text-gray-900 font-mono text-sm">{totalDrivers} سائق</span></div>
          <div className="flex justify-between items-center border-b border-gray-50 pb-2"><span>إجمالي الرحلات</span><span className="text-gray-900 font-mono text-sm">{totalRoutes} رحلة</span></div>
          <div className="flex justify-between items-center"><span>متوسط وقت الاستجابة</span><span className="text-emerald-600 font-mono text-sm font-black">{Number(safeAnalytics.averageResponseTimeHours ?? 0).toFixed(1)} ساعة</span></div>
        </div>
      </div>

    </div>
  );
}
