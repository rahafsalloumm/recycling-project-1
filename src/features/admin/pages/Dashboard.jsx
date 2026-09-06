import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaTruck, FaClipboardList, FaTrash, FaRoute, FaBoxes, FaPlus, FaFileAlt } from "react-icons/fa";
import adminService from "@/services/admin";

import AdminStatCard from "@/features/admin/components/shared/AdminStatCard";
import AdminTable from "@/features/admin/components/shared/AdminTable";
import AdminBins from "@/features/admin/components/shared/AdminBins";
import AdminCharts from "@/features/admin/components/shared/AdminCharts";
import AdminMap from "@/features/admin/components/shared/AdminMap";

export default function Dashboard() {
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState(null);
  const [stats, setStats] = useState({});
  const [binSummary, setBinSummary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const [dashboardResponse, reportsResponse, binsResponse] = await Promise.all([
          adminService.getDashboard(),
          adminService.getReports(),
          adminService.getBins({ limit: 4 }),
        ]);

        const dashboardPayload = dashboardResponse?.data ?? dashboardResponse ?? {};
        const reportsPayload = reportsResponse?.data ?? reportsResponse ?? {};
        const binsPayload = binsResponse?.data ?? binsResponse ?? {};

        if (active) {
          setDashboard(dashboardPayload);
          setStats(reportsPayload);
          setBinSummary(Array.isArray(binsPayload?.bins) ? binsPayload.bins : []);
        }
      } catch (requestError) {
        if (active) {
          setError(requestError?.message || "تعذر تحميل لوحة التحكم");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadDashboard();

    return () => {
      active = false;
    };
  }, []);

  const cards = dashboard?.cards || {};
  const smartBinsPage = stats?.smartBinsPage || stats?.data?.smartBinsPage || {};
  const routesPage = stats?.routesPage || stats?.data?.routesPage || {};
  const statusLabels = { pending: "قيد المراجعة", accepted: "مقبول", in_progress: "قيد التنفيذ", completed: "مكتمل", rejected: "مرفوض" };
  const ordersData = (dashboard?.latestRequests || []).map((order) => ({
    id: order.requestNumber,
    user: order.clientName,
    type: order.wasteType,
    qty: order.quantity,
    status: statusLabels[order.status] || order.status,
    color: order.status === "completed" ? "text-green-600 bg-green-50" : order.status === "rejected" ? "text-red-600 bg-red-50" : "text-orange-600 bg-orange-50",
  }));

  const recentActivities = (dashboard?.latestRequests || []).slice(0, 4).map((item) => {
    const userName = item.clientName || "مستخدم";
    const wasteType = item.wasteType || "نفايات";
    const requestLabel = item.requestNumber || "طلب جديد";
    const currentStatus = item.status || "pending";

    if (currentStatus === "completed") {
      return {
        text: `تم إكمال ${requestLabel} من ${userName} (${wasteType})`,
        time: "آخر طلب",
      };
    }

    if (currentStatus === "rejected") {
      return {
        text: `تم رفض ${requestLabel} الخاص بـ ${userName} (${wasteType})`,
        time: "مراجعة",
      };
    }

    if (currentStatus === "accepted" || currentStatus === "in_progress") {
      return {
        text: `تم قبول ${requestLabel} الخاص بـ ${userName} (${wasteType})`,
        time: "معالجة",
      };
    }

    return {
      text: `تم إنشاء طلب جديد من ${userName} (${wasteType}) ${requestLabel}`,
      time: "جديد",
    };
  });

  return (
    <div className="w-full space-y-6 text-right font-sans p-1">
      {loading && !dashboard && (
        <div className="rounded-xl bg-white p-4 text-sm text-gray-600 shadow-sm border border-gray-100">
          جاري تحميل لوحة التحكم...
        </div>
      )}

      {error && <p className="rounded-xl bg-red-50 p-4 text-sm font-bold text-red-600">{error}</p>}
      
      {/* 1. قسم الكروت العلوية الستة */}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-4">
        <AdminStatCard title="المستخدمون" value={cards.usersCount ?? "-"} desc="إجمالي المستخدمين" descColor="text-green-500" icon={<FaUsers />} iconBg="text-green-500 bg-green-50" />
        <AdminStatCard title="السائقون" value={cards.driversCount ?? "-"} desc="السائقون النشطون" descColor="text-blue-500" icon={<FaTruck />} iconBg="text-blue-500 bg-blue-50" />
        <AdminStatCard title="الطلبات" value={cards.requestsCount ?? "-"} desc="كل الطلبات" descColor="text-orange-500" icon={<FaClipboardList />} iconBg="text-orange-500 bg-orange-50" />
        <AdminStatCard title="كمية النفايات" value={cards.wasteCollected ?? "-"} desc="كغ مكتملة" descColor="text-emerald-500" icon={<FaBoxes />} iconBg="text-emerald-500 bg-emerald-50" />
        <AdminStatCard title="الحاويات الذكية" value={smartBinsPage.totalBins ?? "-"} desc={`${smartBinsPage.fullBinsCount ?? 0} ممتلئة`} descColor="text-red-500" icon={<FaTrash />} iconBg="text-red-500 bg-red-50" />
        <AdminStatCard title="المسارات" value={routesPage.totalRoutes ?? "-"} desc={`${routesPage.activeRoutes ?? 0} نشطة`} descColor="text-teal-500" icon={<FaRoute />} iconBg="text-teal-500 bg-teal-50" />
      </div>

      {/* 2. الصف الثاني: جدول الطلبات + كروت البراميل الملونة المستوردة */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <AdminTable orders={ordersData} />
        <AdminBins bins={binSummary} summary={smartBinsPage} />
      </div>

      {/* 3. الصف الثالث: الرسوم البيانية + النشاطات + الخريطة */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AdminCharts chartData={dashboard?.chartData || []} />

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-base font-bold text-gray-800 mb-4">آخر النشاطات</h3>
          <div className="space-y-3.5 text-xs">
            {recentActivities.length > 0 ? (
              recentActivities.map((activity, index) => (
                <div key={`${activity.text}-${index}`} className="flex justify-between items-center border-b border-gray-50 pb-2 gap-3">
                  <span className="text-gray-500 flex-1">{activity.text}</span>
                  <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap">{activity.time}</span>
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-500">لا توجد أنشطة حديثة.</div>
            )}
          </div>
        </div>

        <AdminMap fullBins={smartBinsPage.fullBinsCount ?? 0} />
      </div>

      {/* 4. قسم الإجراءات السريعة بالتذييل */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <h4 className="text-xs font-bold text-gray-400 mb-3">إجراءات سريعة لمدير النظام</h4>
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={() => navigate('/admin/users')} className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-700 hover:text-white transform hover:-translate-y-0.5"><FaPlus /><span>إضافة مستخدم</span></button>
          <button type="button" onClick={() => navigate('/admin/drivers')} className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 bg-blue-50 text-blue-700 hover:bg-blue-700 hover:text-white transform hover:-translate-y-0.5"><FaPlus /><span>إضافة سائق</span></button>
          <button type="button" onClick={() => navigate('/admin/bins')} className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 bg-orange-50 text-orange-700 hover:bg-orange-700 hover:text-white transform hover:-translate-y-0.5"><FaPlus /><span>إضافة حاوية</span></button>
          <button type="button" onClick={() => navigate('/admin/routes')} className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 bg-purple-50 text-purple-700 hover:bg-purple-700 hover:text-white transform hover:-translate-y-0.5"><FaRoute /><span>إنشاء مسار جديد</span></button>
        </div>
      </div>

    </div>
  );
}