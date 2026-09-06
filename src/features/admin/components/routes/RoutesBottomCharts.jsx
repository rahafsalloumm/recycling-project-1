import { FaChartLine, FaChartPie, FaCalendarAlt } from "react-icons/fa";

export default function RoutesBottomCharts({ routes = [], stats = {} }) {
  const routeList = Array.isArray(routes) ? routes : [];
  const statusCounts = {
    completed: routeList.filter((route) => route.apiStatus === "completed").length,
    in_progress: routeList.filter((route) => route.apiStatus === "in_progress").length,
    pending: routeList.filter((route) => route.apiStatus === "pending").length,
  };
  const totalRoutes = Number(stats.totalRoutes ?? routeList.length);
  const chartRoutes = routeList.slice(0, 5);
  const maxDistance = Math.max(...chartRoutes.map((route) => Number.parseFloat(route.distance) || 0), 1);
  const upcomingRoutes = routeList.filter((route) => route.apiStatus === "pending").slice(0, 2);
  const statusPercentage = (count) => totalRoutes ? `${Math.round((count / totalRoutes) * 100)}%` : "0%";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6" dir="rtl">
      
      {/* 1. مخطط المسافة المقطوعة (كم) */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
        <h4 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
          <FaChartLine className="text-emerald-500" /> المسافة المقطوعة (كم)
        </h4>
        <div className="h-28 flex items-end justify-between gap-1.5 px-1 border-b border-gray-100 pb-1">
          {chartRoutes.length ? chartRoutes.map((route) => {
            const distance = Number.parseFloat(route.distance) || 0;
            return <div key={route.id} title={`${distance} كم`} className="w-full bg-emerald-500 rounded-t hover:bg-emerald-600 transition-all duration-200" style={{ height: `${Math.max(8, (distance / maxDistance) * 100)}%` }}></div>;
          }) : <div className="w-full text-center text-xs text-gray-400 self-center">لا توجد بيانات مسارات.</div>}
        </div>
        <div className="flex justify-between text-[10px] text-gray-400 font-bold mt-2 font-mono">
          {chartRoutes.map((route) => <span key={route.id}>{route.routeName.replace("مسار ", "")}</span>)}
        </div>
      </div>

      {/* 2. حالة المسارات الكلية */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center">
        <h4 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-1.5 w-full justify-start">
          <FaChartPie className="text-emerald-600" /> حالة المسارات
        </h4>
        <div className="w-24 h-24 rounded-full border-[10px] border-transparent border-t-emerald-500 border-r-blue-500 border-b-gray-300 flex items-center justify-center relative my-1 shadow-inner">
          <span className="text-center font-black text-gray-900 text-xs font-mono">{totalRoutes}<br/><span className="text-[9px] text-gray-400 font-medium">مسار</span></span>
        </div>
        <div className="space-y-1.5 text-[11px] font-bold text-gray-500 mt-3 w-full">
          <div className="flex justify-between"><span>• مكتمل</span><span className="text-gray-700 font-mono">{statusCounts.completed} ({statusPercentage(statusCounts.completed)})</span></div>
          <div className="flex justify-between"><span>• قيد التنفيذ</span><span className="text-gray-700 font-mono">{statusCounts.in_progress} ({statusPercentage(statusCounts.in_progress)})</span></div>
          <div className="flex justify-between"><span>• لم يبدأ</span><span className="text-gray-700 font-mono">{statusCounts.pending} ({statusPercentage(statusCounts.pending)})</span></div>
        </div>
      </div>

      {/* 3. قائمة المسارات القادمة */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
        <h4 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
          <FaCalendarAlt className="text-amber-500" /> المسارات القادمة
        </h4>
        <div className="space-y-3.5 text-xs font-bold text-gray-500">
          {upcomingRoutes.length ? upcomingRoutes.map((route) => (
            <div key={route.id} className="flex justify-between items-center border-b border-gray-50 pb-2 last:border-b-0">
              <div><p className="text-gray-800">{route.routeName}</p><p className="text-[10px] text-gray-400 font-medium">{route.driverName}</p></div>
              <span className="font-mono text-gray-400">{route.estTime}</span>
            </div>
          )) : <div className="text-sm text-gray-400">لا توجد مسارات قادمة.</div>}
        </div>
      </div>

    </div>
  );
}
