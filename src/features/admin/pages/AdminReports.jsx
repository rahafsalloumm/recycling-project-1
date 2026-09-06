import {  useEffect, useState  } from 'react';
import { FaDownload, FaCalendarAlt, FaTruck, FaUsers, FaRecycle, FaClipboardList, FaBoxes } from "react-icons/fa";

import ReportStatCard from "@/features/admin/components/reports/ReportStatCard";
import ReportsTopCharts from "@/features/admin/components/reports/ReportsTopCharts";
import ReportsBottomSection from "@/features/admin/components/reports/ReportsBottomSection";
import adminService from "@/services/admin";

export default function AdminReports() {
  // حالة التحكم بالفلترة الزمنية النشطة (اليوم، الأسبوع، الشهر، السنة)
  const [activeTimeframe, setActiveTimeframe] = useState("الشهر");
  
  // حالات تخزين خيارات الفلترة المحددة من قبل مدير النظام
  const [selectedRegion, setSelectedRegion] = useState("جميع المناطق");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [wasteTypes, setWasteTypes] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    adminService.getPublicWasteTypes()
      .then((response) => {
        const types = response?.wasteTypes || response?.data?.wasteTypes;
        if (Array.isArray(types)) setWasteTypes(types);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    let active = true;

    const loadReports = async () => {
      try {
        setLoading(true);
        setError("");

        const period = { "اليوم": "day", "الأسبوع": "week", "الشهر": "month", "السنة": "year" }[activeTimeframe] || "month";
        const wasteType = selectedCategory || undefined;
        const region = selectedRegion === "جميع المناطق" ? undefined : selectedRegion;
        const response = await adminService.getReports({ period, wasteType, region });
        const payload = response?.data ?? response ?? {};
        const normalized = payload?.data ?? payload ?? {};

        if (active) {
          setStats(normalized);
        }
      } catch (requestError) {
        if (active) {
          setError(requestError.message || "تعذر تحميل التقارير");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadReports();

    return () => {
      active = false;
    };
  }, [activeTimeframe, selectedCategory, selectedRegion]);

  // مصفوفة الفترات الزمنية لتوليد الأزرار ديناميكياً مع تأثير الهوفر والنشاط
  const timeframes = ["اليوم", "الأسبوع", "الشهر", "السنة"];
  const rawAnalytics = stats?.reportsAnalyticsPage || {};
  const filteredAnalytics = rawAnalytics;

  const formatReportRange = () => {
    const days = { "اليوم": 0, "الأسبوع": 6, "الشهر": 30, "السنة": 365 }[activeTimeframe] ?? 30;
    const end = new Date();
    const start = new Date(end);
    start.setDate(end.getDate() - days);
    return `${start.toLocaleDateString("ar-SY")} - ${end.toLocaleDateString("ar-SY")}`;
  };

  const handleExport = () => {
    const reportRows = [
      ["المؤشر", "القيمة"],
      ["إجمالي الرحلات", stats?.routesPage?.totalRoutes ?? 0],
      ["إجمالي الطلبات", stats?.ordersPage?.totalOrders ?? 0],
      ["الطلبات المكتملة", stats?.ordersPage?.completedOrders ?? 0],
      ["النفايات المجمعة (طن)", rawAnalytics.totalWasteWeightTon ?? 0],
      ["متوسط وقت الاستجابة (ساعة)", rawAnalytics.averageResponseTimeHours ?? 0],
    ];
    const csv = reportRows.map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `ecocycle-report-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full space-y-6 text-right font-sans p-1 animate-fadeIn duration-300" dir="rtl">
      {loading && !stats && (
        <div className="rounded-xl bg-white p-4 text-sm text-gray-600 shadow-sm border border-gray-100">
          جاري تحميل التقارير...
        </div>
      )}

      {error && <p className="rounded-xl bg-red-50 p-4 text-sm font-bold text-red-600">{error}</p>}
      
      {/* هيدر الصفحة */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.01)]">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-emerald-600 rounded-full block"></span>
            التقارير والإحصائيات البيئية
          </h1>
          <p className="text-sm text-gray-400 mt-1.5 font-medium">عرض وتحليل أداء النظام الشامل في محافظة حلب، كميات التدوير المجمعة ومؤشرات الكفاءة</p>
        </div>
        
        <button type="button" onClick={handleExport} className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-bold shadow-sm hover:bg-gray-50 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer active:translate-y-0 active:scale-98">
          <FaDownload className="text-xs text-gray-400" /> 
          <span>تصدير التقرير</span>
        </button>
      </div>

      {/* شريط الفلاتر والتحكم بالتاريخ والأوقات الفعال برمجياً */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col lg:flex-row gap-4 items-center justify-between">
        
        {/* 1. أزرار الفلترة الزمنية أصبحت تفاعلية الآن بفضل الـ State */}
        <div className="flex bg-gray-100 p-1 rounded-xl w-full lg:w-auto">
          {timeframes.map((time) => (
            <button
              key={time}
              onClick={() => setActiveTimeframe(time)}
              className={`flex-1 lg:flex-none px-5 py-2 text-xs font-bold rounded-lg transition-all duration-200 cursor-pointer ${
                activeTimeframe === time
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-gray-400 hover:text-gray-700"
              }`}
            >
              {time}
            </button>
          ))}
        </div>
        
        {/* 2. فلاتر القوائم المنسدلة أصبحت حقيقية وقابلة للفتح والاختيار ومحدثة بأحياء حلب */}
        <div className="flex flex-wrap gap-3 w-full lg:w-auto justify-end">
          {/* عرض النطاق الزمني الثابت */}
          <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-600">
            <FaCalendarAlt className="text-gray-400" />
            <span>{formatReportRange()}</span>
          </div>

          {/* قائمة الفئات القابلة للاختيار */}
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-xs font-bold text-gray-600 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-200 cursor-pointer"
          >
            <option value="">جميع الفئات</option>
            {wasteTypes.map((type) => <option key={type.key} value={type.key}>{type.label}</option>)}
          </select>

          {/* قائمة مناطق أحياء حلب الحقيقية القابلة للاختيار والتغيير */}
          <select 
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-xs font-bold text-gray-600 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-200 cursor-pointer"
          >
            <option>جميع المناطق</option>
            <option>الجميلية</option>
            <option>الشهباء</option>
            <option>الموكامبو</option>
            <option>السليمانية</option>
            <option>العزيزية</option>
            <option>حلب الجديدة</option>
            <option>صلاح الدين</option>
          </select>
        </div>
      </div>

      {/* كروت الإحصائيات الخمسة العلوية */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <ReportStatCard title="إجمالي الرحلات" value={stats?.routesPage?.totalRoutes ?? "-"} desc="من قاعدة البيانات" icon={<FaTruck />} bgIcon="text-emerald-600 bg-emerald-50" />
        <ReportStatCard title="المستخدمين النشطين" value={stats?.driversPage?.totalDrivers ?? "-"} desc="السائقون المسجلون" icon={<FaUsers />} bgIcon="text-blue-600 bg-blue-50" />
        <ReportStatCard title="إجمالي عمليات إعادة التدوير" value={stats?.ordersPage?.completedOrders ?? "-"} desc="طلبات مكتملة" icon={<FaRecycle />} bgIcon="text-purple-600 bg-purple-50" />
        <ReportStatCard title="إجمالي الطلبات" value={stats?.ordersPage?.totalOrders ?? "-"} desc="كل الطلبات" icon={<FaClipboardList />} bgIcon="text-amber-500 bg-amber-50" />
        <ReportStatCard title="إجمالي النفايات المجمعة" value={stats?.reportsAnalyticsPage?.totalWasteWeightTon ? `${stats.reportsAnalyticsPage.totalWasteWeightTon} طن` : "-"} desc="الطلبات المكتملة" icon={<FaBoxes />} bgIcon="text-emerald-600 bg-emerald-50" />
      </div>

      {/* قسم الرسوم البيانية الثلاثة المتجاورة بالمنتصف */}
      <ReportsTopCharts analytics={filteredAnalytics} summary={stats || {}} />

      {/* قسم الأداء والخريطة وملخص التقرير السفلي */}
      <ReportsBottomSection analytics={filteredAnalytics} summary={stats || {}} />

    </div>
  );
}

