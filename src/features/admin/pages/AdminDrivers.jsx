import {  useCallback, useEffect, useState  } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTruck, FaUserCheck, FaClock, FaExclamationTriangle, FaSearch, FaPlus, FaCheckCircle, FaChartLine, FaTrophy } from "react-icons/fa";

import DriverStatCard from "@/features/admin/components/drivers/DriverStatCard";
import DriversTable from "@/features/admin/components/drivers/DriversTable";
import DriversInsights from "@/features/admin/components/drivers/DriversInsights";
import adminService from "@/services/admin";

export default function AdminDrivers() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [driversData, setDriversData] = useState([]);
  const [availableTasks, setAvailableTasks] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", role: "driver" });
  const loadDrivers = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const [driversResponse, reportsResponse, ordersResponse, binsResponse] = await Promise.all([
        adminService.getUsers({ role: "driver", search: searchTerm }),
        adminService.getReports(),
        adminService.getOrders({ status: "pending", limit: 20 }),
        adminService.getBins({ limit: 20, status: "full" }),
      ]);

      const payload = driversResponse?.data ?? driversResponse ?? {};
      const users = Array.isArray(payload?.users) ? payload.users : [];
      const reportsPayload = reportsResponse?.data ?? reportsResponse ?? {};
      const reportsData = reportsPayload?.data ?? reportsPayload ?? {};
      const ordersPayload = ordersResponse?.data ?? ordersResponse ?? {};
      const binsPayload = binsResponse?.data ?? binsResponse ?? {};
      const pendingOrders = Array.isArray(ordersPayload?.wasteRequests) ? ordersPayload.wasteRequests : [];
      const fullBins = Array.isArray(binsPayload?.bins) ? binsPayload.bins : [];

      setDriversData(users.map((driver) => ({
        id: driver.id || driver._id,
        name: driver.name,
        idCode: String(driver.id || driver._id).slice(-6).toUpperCase(),
        phone: driver.phone || "-",
        region: driver.address?.city || driver.address || "-",
        status: { active: "متاح", pending: "قيد الانتظار", rejected: "مرفوض" }[driver.status] || driver.status,
        apiStatus: driver.status,
        tasks: driver.driverProfile?.completedTasks || 0,
        date: driver.createdAt ? new Date(driver.createdAt).toLocaleDateString("ar-SY") : "-",
        rating: driver.driverProfile?.rating ?? 0,
        truckNo: driver.driverProfile?.vehicle?.truckNumber || "غير محدد",
        truckType: driver.driverProfile?.vehicle?.truckType || "لم تعين بعد",
        licenseNo: driver.driverProfile?.license?.number || "غير محدد",
        licenseType: driver.driverProfile?.license?.type || "غير محدد",
        licenseIssue: driver.driverProfile?.license?.issueDate ? new Date(driver.driverProfile.license.issueDate).toISOString().split("T")[0] : "",
        licenseExpiry: driver.driverProfile?.license?.expiryDate ? new Date(driver.driverProfile.license.expiryDate).toISOString().split("T")[0] : "",
        workHours: driver.driverProfile?.workingHours ? `${driver.driverProfile.workingHours} ساعة` : "0 ساعة",
        idCardUrl: driver.driverProfile?.documents?.idCardUrl || "",
        driverLicenseUrl: driver.driverProfile?.documents?.driverLicenseUrl || "",
        recentTasks: driver.recentTasks || [],
      })));

      setStats(reportsData?.driversPage || reportsData || {});
      setAvailableTasks([
        ...pendingOrders.map((order) => ({ id: order._id, type: "WasteRequest", title: `طلب جمع ${order.wasteType} - ${order.address}` })),
        ...fullBins.map((bin) => ({ id: bin._id, type: "Bin", title: `تفريغ الحاوية ${bin.binNumber} - ${bin.location}` })),
      ]);
    } catch (requestError) {
      setError(requestError.message || "تعذر تحميل السائقين");
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => { loadDrivers(); }, [loadDrivers]);

  const handleCreateDriver = async (event) => {
    event.preventDefault();
    setIsCreating(true);
    setError("");

    try {
      await adminService.createUser(form);
      setForm({ name: "", email: "", phone: "", password: "", role: "driver" });
      setIsCreateOpen(false);
      await loadDrivers();
    } catch (requestError) {
      setError(requestError.message || "تعذر إنشاء السائق");
    } finally {
      setIsCreating(false);
    }
  };

  const filteredDrivers = driversData;
  const topDrivers = (stats?.driverPerformanceList?.length
    ? stats.driverPerformanceList.slice(0, 3)
    : driversData
        .slice()
        .sort((a, b) => (b.tasks || 0) - (a.tasks || 0))
        .slice(0, 3)
        .map((driver) => ({
          driverName: driver.name,
          tripsCount: driver.tasks || 0,
          achievementRate: `${Math.min(100, Math.max(0, (driver.tasks || 0) * 2))}%`,
        }))
  );

  const averageTaskCompletion = driversData.length
    ? Math.min(100, Math.round(driversData.reduce((sum, driver) => sum + (driver.tasks || 0), 0) / Math.max(driversData.length, 1)))
    : 0;
  const monthlyCompletedTasks = Number(stats?.completedTasksThisMonth ?? 0);
  const weeklyCompletedTasks = Array.isArray(stats?.weeklyCompletedTasks) ? stats.weeklyCompletedTasks : [];
  const weeklyTaskCounts = [1, 2, 3, 4].map((week) => Number(weeklyCompletedTasks.find((item) => item.week === week)?.count ?? 0));
  const maxWeeklyTaskCount = Math.max(...weeklyTaskCounts, 1);

  return (
    <div className="w-full space-y-6 text-right font-sans p-1 animate-fadeIn duration-300" dir="rtl">
      {loading && !driversData.length && (
        <div className="rounded-xl bg-white p-4 text-sm text-gray-600 shadow-sm border border-gray-100">
          جاري تحميل السائقين...
        </div>
      )}

      {error && <p className="rounded-xl bg-red-50 p-4 text-sm font-bold text-red-600">{error}</p>}
      
      {/* هيدر الصفحة الفخم والواضح وعريض الكلمات */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.01)]">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-emerald-600 rounded-full block"></span>
            إدارة السائقين
          </h1>
          <p className="text-sm text-gray-400 mt-1.5 font-medium">عرض وإدارة جميع السائقين بالميدان، تتبع حالتهم وتكليفات المهام</p>
        </div>
        <button type="button" onClick={() => setIsCreateOpen(true)} className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl text-sm font-bold shadow-md shadow-emerald-600/10 hover:bg-emerald-700 transition-all duration-300 cursor-pointer active:scale-98">
          <FaPlus className="text-xs" /> 
          <span>إضافة سائق جديد</span>
        </button>
      </div>

      {/* الكروت العلوية الأربعة بهوية متزنة وألوان ناعمة جداً */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <DriverStatCard title="إجمالي السائقين" value={driversData.length} desc="من قاعدة البيانات" icon={<FaTruck />} bgIcon="text-emerald-600 bg-emerald-50" />
        <DriverStatCard title="متاح الآن" value={driversData.filter((driver) => driver.apiStatus === "active").length} desc="سائق نشط" icon={<FaUserCheck />} bgIcon="text-blue-600 bg-blue-50" />
        <DriverStatCard title="قيد الانتظار" value={driversData.filter((driver) => driver.apiStatus === "pending").length} desc="بانتظار الموافقة" icon={<FaClock />} bgIcon="text-amber-600 bg-amber-50" />
        <DriverStatCard title="مرفوض" value={driversData.filter((driver) => driver.apiStatus === "rejected").length} desc="طلبات مرفوضة" icon={<FaExclamationTriangle />} bgIcon="text-gray-500 bg-gray-100" />
      </div>

      {/* شريط البحث المريح للعين */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div className="relative w-full">
          <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 text-sm">
            <FaSearch />
          </span>
          <input
            type="text"
            placeholder="ابحث باسم السائق أو كود المعرف (DVR)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-4 pr-11 py-3.5 bg-gray-50/50 border border-gray-200/60 rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 shadow-inner transition-all duration-300 text-right font-medium text-gray-800"
          />
        </div>
      </div>

      {/* الأقسام المتجاورة */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        <div className="xl:col-span-2">
          <DriversTable
            drivers={filteredDrivers}
            onUpdateStatus={async (id, status) => { await adminService.updateDriverStatus(id, status); loadDrivers(); }}
            onUpdateDriver={async (id, driverData) => { await adminService.updateDriver(id, driverData); await loadDrivers(); }}
            onDeleteDriver={async (id) => { await adminService.deleteUser(id); await loadDrivers(); }}
            availableTasks={availableTasks}
            onAssignTasks={async (driverId, taskIds) => {
              await adminService.createRoute({
                driverId,
                driverLocation: { lat: 36.2021, lng: 37.1344 },
                selectedTasks: taskIds.map((taskId) => {
                  const task = availableTasks.find((item) => item.id === taskId);
                  return { id: taskId, type: task?.type || "WasteRequest" };
                }),
              });
              await loadDrivers();
            }}
          />
        </div>
        <div className="xl:col-span-1">
          <DriversInsights stats={stats} />
        </div>
      </div>

      {/* القسم الإحصائي السفلي المطور وبحجم كلمات مريح وقوي */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
          <form onSubmit={handleCreateDriver} className="w-full max-w-md space-y-4 rounded-2xl bg-white p-6 text-right shadow-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-gray-900">إضافة سائق جديد</h2>
              <button type="button" onClick={() => setIsCreateOpen(false)} className="text-gray-400 hover:text-gray-700" aria-label="إغلاق">×</button>
            </div>
            {[
              ["name", "الاسم", "text"],
              ["email", "البريد الإلكتروني", "email"],
              ["phone", "رقم الهاتف", "text"],
              ["password", "كلمة المرور", "password"],
            ].map(([field, label, type]) => (
              <label key={field} className="block space-y-1 text-sm font-bold text-gray-600">
                <span>{label}</span>
                <input required type={type} value={form[field]} onChange={(event) => setForm({ ...form, [field]: event.target.value })} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 outline-none focus:border-emerald-500" />
              </label>
            ))}
            <button type="submit" disabled={isCreating} className="w-full rounded-xl bg-emerald-600 py-3 font-bold text-white disabled:opacity-60">
              {isCreating ? "جاري الإنشاء..." : "إنشاء حساب السائق"}
            </button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
          <h4 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2 w-full justify-start">
            <FaCheckCircle className="text-emerald-500 text-base" /> نسبة إنجاز المهام
          </h4>
          <div className="relative flex items-center justify-center my-3">
            <div className="w-32 h-32 rounded-full border-[10px] border-gray-100 flex items-center justify-center">
              <span className="text-2xl font-black text-gray-900 font-mono">{averageTaskCompletion}%</span>
              <div className="absolute inset-0 w-32 h-32 rounded-full border-[10px] border-transparent border-t-emerald-500 border-r-emerald-500 border-l-emerald-500/40 transform rotate-45"></div>
            </div>
          </div>
          <p className="text-xs text-gray-400 font-semibold mt-3">إجمالي الإنجاز والمهام المكتملة بالميدان</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h4 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FaChartLine className="text-blue-500 text-base" /> المهام المنجزة هذا الشهر
          </h4>
          <div className="text-2xl font-black text-emerald-600 mb-3">{monthlyCompletedTasks}</div>
          <div className="h-32 flex items-end justify-between gap-2 px-2 border-b border-gray-100 pb-1">
            {weeklyTaskCounts.map((count, index) => (
              <div
                key={index}
                title={`${count} مهمة`}
                className="w-full bg-emerald-500 rounded-t-md transition-all duration-300 hover:bg-emerald-600"
                style={{ height: `${count ? Math.max(8, (count / maxWeeklyTaskCount) * 100) : 4}%` }}
              ></div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-400 font-bold px-1 mt-3">
            <span>أسبوع 1</span>
            <span>أسبوع 2</span>
            <span>أسبوع 3</span>
            <span>أسبوع 4</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h4 className="text-sm font-bold text-gray-800 mb-5 flex items-center gap-2">
            <FaTrophy className="text-amber-500 text-base" /> أعلى السائقين أداءً
          </h4>
          <div className="space-y-4">
            {topDrivers.map((driver, index) => (
              <div key={`${driver.driverName}-${index}`} className="flex justify-between items-center text-sm border-b border-gray-50 pb-2 last:border-b-0 last:pb-0">
                <span className="font-bold text-gray-800">{index + 1}. {driver.driverName}</span>
                <span className="font-mono text-emerald-600 font-black">{driver.tripsCount ?? driver.tasks ?? 0} مهمة</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}


