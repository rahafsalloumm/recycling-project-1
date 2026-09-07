import {  useEffect, useState  } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRoute, FaPlus, FaSearch, FaCheckCircle, FaSpinner, FaClock, FaRoad } from "react-icons/fa";

import RouteStatCard from "@/features/admin/components/routes/RouteStatCard";
import RoutesTable from "@/features/admin/components/routes/RoutesTable";
import RoutesInsights from "@/features/admin/components/routes/RoutesInsights";
import RoutesBottomCharts from "@/features/admin/components/routes/RoutesBottomCharts";
import adminService from "@/services/admin";

export default function AdminRoutes() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [routesData, setRoutesData] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [totalRoutesCount, setTotalRoutesCount] = useState(0);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [selectedRouteId, setSelectedRouteId] = useState(null);
  const [driverFilter, setDriverFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [routeForm, setRouteForm] = useState({ driverId: "", driverLocationLat: "36.2021", driverLocationLng: "37.1344", selectedTasks: "" });

  useEffect(() => {
    let active = true;

    const loadRoutes = async () => {
      try {
        setLoading(true);
        setError("");

        const [routesResponse, reportsResponse, driversResponse] = await Promise.all([
          adminService.getRoutes({
            limit: 100,
            driverId: driverFilter || undefined,
            status: statusFilter || undefined,
            search: searchTerm || undefined,
          }),
          adminService.getReports(),
          adminService.getUsers({ role: "driver" }),
        ]);

        const routeList = Array.isArray(routesResponse?.data)
          ? routesResponse.data
          : Array.isArray(routesResponse)
            ? routesResponse
            : [];

        const reportsPayload = reportsResponse?.data ?? reportsResponse ?? {};
        const reportsData = reportsPayload?.data ?? reportsPayload ?? {};
        const driversPayload = driversResponse?.data ?? driversResponse ?? {};
        const driverList = Array.isArray(driversPayload?.users) ? driversPayload.users : [];

        if (active) {
          const routes = routeList.map((route) => ({
            id: route._id,
            routeName: `مسار ${route.date || "غير محدد"}`,
            desc: route.driverName || "غير محدد",
            driverName: route.driverName || "غير محدد",
            driverId: route.driverId || route.driver || route._id,
            status: { pending: "لم يبدأ", in_progress: "قيد التنفيذ", completed: "مكتمل" }[route.status] || route.status,
            apiStatus: route.status,
            fontColor: route.status === "completed" ? "text-emerald-700 bg-emerald-50 border-emerald-100" : route.status === "in_progress" ? "text-blue-700 bg-blue-50 border-blue-100" : "text-gray-600 bg-gray-50 border-gray-200",
            progress: Number.parseInt(String(route.progress || "0").replace(/%/g, ""), 10) || 0,
            distance: route.distanceKm ?? route.distance ?? "-",
            binsCount: route.tasksCount ?? route.waypoints?.filter((wp) => wp.taskType !== "FinalDestination").length ?? 0,
            estTime: route.estimatedTime ?? route.estimatedTimeMinutes ?? "-",
            waypoints: route.waypoints || [],
          }));

          setRoutesData(routes);
          setDrivers(driverList);
          setTotalRoutesCount(Number(routesResponse?.pagination?.totalItems ?? routes.length));
          setStats(reportsData?.routesPage || reportsData || {});
        }
      } catch (requestError) {
        if (active) {
          setError(requestError.message || "تعذر تحميل المسارات");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadRoutes();

    return () => {
      active = false;
    };
  }, [driverFilter, statusFilter, searchTerm]);

  useEffect(() => {
    if (!selectedRouteId) {
      setSelectedRoute(null);
      return undefined;
    }

    let active = true;

    const loadSelectedRoute = async () => {
      try {
        const routeResponse = await adminService.getRoute(selectedRouteId);
        const routePayload = routeResponse?.data ?? routeResponse ?? {};
        const detailRoute = routePayload?.data ?? routePayload ?? null;

        if (!active) return;

        if (detailRoute) {
          const normalizedDetail = {
            id: detailRoute._id || selectedRouteId,
            routeName: `مسار ${detailRoute.date || "غير محدد"}`,
            driverName: detailRoute.driver?.name || "غير محدد",
            driverId: detailRoute.driver?._id || detailRoute.driver || selectedRouteId,
            status: { pending: "لم يبدأ", in_progress: "قيد التنفيذ", completed: "مكتمل" }[detailRoute.status] || detailRoute.status,
            fontColor: detailRoute.status === "completed" ? "text-emerald-700 bg-emerald-50 border-emerald-100" : detailRoute.status === "in_progress" ? "text-blue-700 bg-blue-50 border-blue-100" : "text-gray-600 bg-gray-50 border-gray-200",
            binsCount: detailRoute.waypoints?.filter((wp) => wp.taskType !== "FinalDestination").length ?? 0,
            distance: detailRoute.totalDistanceKm != null ? `${detailRoute.totalDistanceKm} كم` : "-",
            estTime: detailRoute.estimatedTimeMinutes != null ? `${(detailRoute.estimatedTimeMinutes / 60).toFixed(1)} ساعة` : "-",
            progress: detailRoute.waypoints?.length ? Math.round((detailRoute.waypoints.filter((wp) => wp.status === "completed").length / detailRoute.waypoints.length) * 100) : 0,
            desc: detailRoute.driver?.name || "غير محدد",
            waypoints: detailRoute.waypoints || [],
            startTime: "08:30 AM",
            endTime: "11:30 AM",
          };

          setSelectedRoute(normalizedDetail);
          return;
        }

        const fallback = routesData.find((route) => (route.id || route._id) === selectedRouteId);
        if (fallback) setSelectedRoute(fallback);
      } catch {
        if (active) {
          const fallback = routesData.find((route) => (route.id || route._id) === selectedRouteId);
          if (fallback) setSelectedRoute(fallback);
        }
      }
    };

    loadSelectedRoute();

    return () => {
      active = false;
    };
  }, [selectedRouteId, routesData]);

  const filteredRoutes = routesData;

  const handleSelectRoute = (route) => {
    setSelectedRoute(route);
    setSelectedRouteId(route?.id || route?._id || null);
  };

  const handleCreateRoute = async (event) => {
    event.preventDefault();
    setIsCreating(true);
    setError("");

    try {
      const parsedTasks = routeForm.selectedTasks
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
        .map((item) => {
          const [type, id] = item.split("|").map((part) => part.trim());
          return { id, type: type || "WasteRequest" };
        })
        .filter((task) => task.id);

      if (!routeForm.driverId || parsedTasks.length === 0) {
        throw new Error("يرجى اختيار سائق وكتابة مهام أو حاويات صالحة للترتيب");
      }

      const payload = {
        driverId: routeForm.driverId,
        driverLocation: {
          lat: Number(routeForm.driverLocationLat),
          lng: Number(routeForm.driverLocationLng),
        },
        selectedTasks: parsedTasks,
      };

      await adminService.createRoute(payload);
      setRouteForm({ driverId: "", driverLocationLat: "36.2021", driverLocationLng: "37.1344", selectedTasks: "" });
      setIsCreateOpen(false);
      setLoading(true);
      const [routesResponse, reportsResponse, driversResponse] = await Promise.all([
        adminService.getRoutes({ limit: 100 }),
        adminService.getReports(),
        adminService.getUsers({ role: "driver" }),
      ]);
      const routeList = Array.isArray(routesResponse?.data)
        ? routesResponse.data
        : Array.isArray(routesResponse)
          ? routesResponse
          : [];
      const reportsPayload = reportsResponse?.data ?? reportsResponse ?? {};
      const reportsData = reportsPayload?.data ?? reportsPayload ?? {};
      const driversPayload = driversResponse?.data ?? driversResponse ?? {};
      const driverList = Array.isArray(driversPayload?.users) ? driversPayload.users : [];
      const routes = routeList.map((route) => ({
        id: route._id,
        routeName: `مسار ${route.date || "غير محدد"}`,
        desc: route.driverName || "غير محدد",
        driverName: route.driverName || "غير محدد",
        driverId: route.driverId || route.driver || route._id,
        status: { pending: "لم يبدأ", in_progress: "قيد التنفيذ", completed: "مكتمل" }[route.status] || route.status,
        apiStatus: route.status,
        fontColor: route.status === "completed" ? "text-emerald-700 bg-emerald-50 border-emerald-100" : route.status === "in_progress" ? "text-blue-700 bg-blue-50 border-blue-100" : "text-gray-600 bg-gray-50 border-gray-200",
        progress: Number.parseInt(String(route.progress || "0").replace(/%/g, ""), 10) || 0,
        distance: route.distanceKm ?? route.distance ?? "-",
        binsCount: route.tasksCount ?? route.waypoints?.filter((wp) => wp.taskType !== "FinalDestination").length ?? 0,
        estTime: route.estimatedTime ?? route.estimatedTimeMinutes ?? "-",
        waypoints: route.waypoints || [],
      }));
      setRoutesData(routes);
      setDrivers(driverList);
      setTotalRoutesCount(Number(routesResponse?.pagination?.totalItems ?? routes.length));
      setStats(reportsData?.routesPage || reportsData || {});
      setLoading(false);
    } catch (requestError) {
      setError(requestError.message || "تعذر إنشاء المسار");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="w-full space-y-6 text-right font-sans p-1 animate-fadeIn duration-300" dir="rtl">
      {loading && !routesData.length && (
        <div className="rounded-xl bg-white p-4 text-sm text-gray-600 shadow-sm border border-gray-100">
          جاري تحميل المسارات...
        </div>
      )}

      {error && <p className="rounded-xl bg-red-50 p-4 text-sm font-bold text-red-600">{error}</p>}
      
      {/* هيدر الصفحة */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.01)]">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-emerald-600 rounded-full block"></span>
            إدارة المسارات
          </h1>
          <p className="text-sm text-gray-400 mt-1.5 font-medium">إنشاء وإدارة مسارات جمع النفايات وتوزيعها الذكي على السائقين بالميدان</p>
        </div>
        <button type="button" onClick={() => setIsCreateOpen(true)} className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl text-sm font-bold shadow-md shadow-emerald-600/10 hover:bg-emerald-700 transition-all duration-300 cursor-pointer active:scale-98">
          <FaPlus className="text-xs" /> 
          <span>إنشاء مسار جديد</span>
        </button>
      </div>

      {/* الكروت الإحصائية الخمسة العلوية كالصورة */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <RouteStatCard title="إجمالي المسارات" value={stats.totalRoutes ?? "-"} desc="من قاعدة البيانات" icon={<FaRoute />} bgIcon="text-emerald-600 bg-emerald-50" />
        <RouteStatCard title="مسارات نشطة" value={stats.activeRoutes?.length ?? "-"} desc="قيد التنفيذ" icon={<FaSpinner className="animate-spin" />} bgIcon="text-blue-600 bg-blue-50" />
        <RouteStatCard title="مسارات مكتملة اليوم" value={stats.completedRoutesToday ?? "-"} desc="مسارات مكتملة" icon={<FaCheckCircle />} bgIcon="text-green-600 bg-green-50" />
        <RouteStatCard title="المسافة الإجمالية اليوم" value={stats.totalDistanceTodayKm != null ? `${stats.totalDistanceTodayKm} كم` : "-"} desc="المسافة المجمعة" icon={<FaRoad />} bgIcon="text-purple-600 bg-purple-50" />
        <RouteStatCard title="الوقت الإجمالي اليوم" value={stats.totalDurationTodayHours != null ? `${stats.totalDurationTodayHours} ساعة` : "-"} desc="الوقت التقديري" icon={<FaClock />} bgIcon="text-amber-500 bg-amber-50" />
      </div>

      {/* شريط خيارات البحث والتصفية للجدول */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 text-sm">
            <FaSearch />
          </span>
          <input
            type="text"
            placeholder="ابحث عن مسار..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-4 pr-11 py-3 bg-gray-50/50 border border-gray-200/60 rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-right font-medium text-gray-800"
          />
        </div>
        
        <div className="flex gap-3 w-full md:w-auto justify-end">
          <select value={driverFilter} onChange={(event) => setDriverFilter(event.target.value)} className="bg-gray-50 border border-gray-200 rounded-xl py-2 px-4 text-xs font-bold text-gray-600 focus:outline-none cursor-pointer">
            <option value="">جميع السائقين</option>
            {drivers.map((driver) => <option key={driver.id || driver._id} value={driver.id || driver._id}>{driver.name}</option>)}
          </select>
          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="bg-gray-50 border border-gray-200 rounded-xl py-2 px-4 text-xs font-bold text-gray-600 focus:outline-none cursor-pointer">
            <option value="">جميع الحالات</option>
            <option value="pending">لم يبدأ</option>
            <option value="in_progress">قيد التنفيذ</option>
            <option value="completed">مكتمل</option>
          </select>
        </div>
      </div>

      {/* جدول المسارات والتفاصيل الجانبية متجاورة */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 items-start">
        <div className="xl:col-span-3">
          <RoutesTable
            routes={filteredRoutes}
            totalRoutes={totalRoutesCount}
            drivers={drivers}
            onSelectRoute={handleSelectRoute}
            onUpdateRoute={async (id, routeData) => { await adminService.updateRoute(id, routeData); window.location.reload(); }}
            onDeleteRoute={async (id) => { await adminService.deleteRoute(id); window.location.reload(); }}
          />
        </div>
        <div className="xl:col-span-1">
          <RoutesInsights selectedRoute={selectedRoute || filteredRoutes[0]} />
        </div>
      </div>

      {/* قسم المخططات والرسوم الإحصائية السفلية المدمج */}
      <RoutesBottomCharts routes={routesData} stats={stats} />

      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
          <form onSubmit={handleCreateRoute} className="w-full max-w-xl space-y-4 rounded-2xl bg-white p-6 text-right shadow-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-gray-900">إنشاء مسار جديد</h2>
              <button type="button" onClick={() => setIsCreateOpen(false)} className="text-gray-400 hover:text-gray-700" aria-label="إغلاق">×</button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block space-y-1 text-sm font-bold text-gray-600">
                <span>معرف السائق</span>
                <input required value={routeForm.driverId} onChange={(event) => setRouteForm({ ...routeForm, driverId: event.target.value })} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 outline-none focus:border-emerald-500" />
              </label>
              <label className="block space-y-1 text-sm font-bold text-gray-600">
                <span>خط العرض</span>
                <input required type="number" step="any" value={routeForm.driverLocationLat} onChange={(event) => setRouteForm({ ...routeForm, driverLocationLat: event.target.value })} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 outline-none focus:border-emerald-500" />
              </label>
              <label className="block space-y-1 text-sm font-bold text-gray-600">
                <span>خط الطول</span>
                <input required type="number" step="any" value={routeForm.driverLocationLng} onChange={(event) => setRouteForm({ ...routeForm, driverLocationLng: event.target.value })} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 outline-none focus:border-emerald-500" />
              </label>
              <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-3 text-xs text-gray-500">
                مثال: WasteRequest|64d... , Bin|64e...
              </div>
            </div>
            <label className="block space-y-1 text-sm font-bold text-gray-600">
              <span>المهام المختارة</span>
              <textarea required rows="4" value={routeForm.selectedTasks} onChange={(event) => setRouteForm({ ...routeForm, selectedTasks: event.target.value })} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 outline-none focus:border-emerald-500" placeholder="WasteRequest|64d2..., Bin|64e..." />
            </label>
            <button type="submit" disabled={isCreating} className="w-full rounded-xl bg-emerald-600 py-3 font-bold text-white disabled:opacity-60">
              {isCreating ? "جاري إنشاء المسار..." : "إنشاء المسار"}
            </button>
          </form>
        </div>
      )}

    </div>
  );
}
