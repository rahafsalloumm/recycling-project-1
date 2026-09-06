import {  useEffect, useState  } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaPlus, FaSearch, FaCheckCircle, FaExclamationTriangle, FaTimesCircle } from "react-icons/fa";

import BinStatCard from "@/features/admin/components/bins/BinStatCard";
import BinsTable from "@/features/admin/components/bins/BinsTable";
import BinsInsights from "@/features/admin/components/bins/BinsInsights";
import adminService from "@/services/admin";

export default function AdminBins() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [regionFilter, setRegionFilter] = useState("");
  const [data, setData] = useState({ bins: [], totalBins: 0 });
  const [mapBins, setMapBins] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [form, setForm] = useState({ binNumber: "", location: "", lat: "", lng: "", fillLevel: 0 });

  useEffect(() => {
    let active = true;

    const loadBins = async () => {
      try {
        setLoading(true);
        setError("");
        const [binsResponse, statsResponse, mapResponse] = await Promise.all([
          adminService.getBins({ search: searchTerm, status: statusFilter || undefined, region: regionFilter || undefined, limit: 100 }),
          adminService.getBinStats(),
          adminService.getBinsForMap(),
        ]);

        if (!active) return;

        const binsPayload = binsResponse?.data ?? binsResponse ?? {};
        const statsPayload = statsResponse?.data ?? statsResponse ?? {};
        const mapPayload = mapResponse?.data ?? mapResponse ?? {};
        const normalizedBins = Array.isArray(binsPayload?.bins)
          ? binsPayload.bins
          : Array.isArray(binsPayload?.data)
            ? binsPayload.data
            : [];
        const normalizedStats = statsPayload?.data ?? statsPayload ?? {};
        const normalizedMapBins = Array.isArray(mapPayload?.bins)
          ? mapPayload.bins
          : Array.isArray(mapPayload?.data)
            ? mapPayload.data
            : [];

        setData({ bins: normalizedBins, totalBins: binsPayload?.totalBins ?? normalizedBins.length });
        setMapBins(normalizedMapBins);
        setStats(normalizedStats);
      } catch (requestError) {
        if (active) {
          setError(requestError.message || "تعذر تحميل الحاويات");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadBins();
    return () => { active = false; };
  }, [searchTerm, statusFilter, regionFilter]);

  const statusLabels = { empty: "طبيعية", medium: "بحاجة للجمع", full: "ممتلئة", inactive: "غير فعالة" };
  const binsData = (data.bins || []).map((bin) => ({
    id: bin._id,
    code: bin.binNumber,
    location: bin.location,
    region: "-",
    fillLevel: bin.fillLevel,
    status: statusLabels[bin.status] || bin.status,
    lastUpdate: bin.updatedAt ? new Date(bin.updatedAt).toLocaleString("ar-SY") : "-",
  }));

  const filteredBins = binsData;

  const reloadBins = async () => {
    const [binsResponse, statsResponse, mapResponse] = await Promise.all([
      adminService.getBins({ search: searchTerm, status: statusFilter || undefined, region: regionFilter || undefined, limit: 100 }),
      adminService.getBinStats(),
      adminService.getBinsForMap(),
    ]);

    const binsPayload = binsResponse?.data ?? binsResponse ?? {};
    const statsPayload = statsResponse?.data ?? statsResponse ?? {};
    const mapPayload = mapResponse?.data ?? mapResponse ?? {};
    const normalizedBins = Array.isArray(binsPayload?.bins)
      ? binsPayload.bins
      : Array.isArray(binsPayload?.data)
        ? binsPayload.data
        : [];

    setData({ bins: normalizedBins, totalBins: binsPayload?.totalBins ?? normalizedBins.length });
    setMapBins(Array.isArray(mapPayload?.bins) ? mapPayload.bins : []);
    setStats(statsPayload?.data ?? statsPayload ?? {});
  };

  const handleCreateBin = async (event) => {
    event.preventDefault();
    setIsCreating(true);
    setError("");

    try {
      await adminService.createBin({
        ...form,
        lat: Number(form.lat),
        lng: Number(form.lng),
        fillLevel: Number(form.fillLevel),
      });
      setForm({ binNumber: "", location: "", lat: "", lng: "", fillLevel: 0 });
      setIsCreateOpen(false);
      await reloadBins();
    } catch (requestError) {
      setError(requestError.message || "تعذر إنشاء الحاوية");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="w-full space-y-6 text-right font-sans p-1 animate-fadeIn duration-300" dir="rtl">
      {loading && !data.bins.length && (
        <div className="rounded-xl bg-white p-4 text-sm text-gray-600 shadow-sm border border-gray-100">
          جاري تحميل الحاويات...
        </div>
      )}

      {error && <p className="rounded-xl bg-red-50 p-4 text-sm font-bold text-red-600">{error}</p>}
      
      {/* هيدر الصفحة */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.01)]">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-emerald-600 rounded-full block"></span>
            إدارة الحاويات الذكية
          </h1>
          <p className="text-sm text-gray-400 mt-1.5 font-medium">عرض ومراقبة جميع الحاويات الذكية وحالة امتلائها بالوقت الفعلي</p>
        </div>
        <button type="button" onClick={() => setIsCreateOpen(true)} className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl text-sm font-bold shadow-md shadow-emerald-600/10 hover:bg-emerald-700 transition-all duration-300 cursor-pointer active:scale-98">
          <FaPlus className="text-xs" /> 
          <span>إضافة حاوية جديدة</span>
        </button>
      </div>

      {/* كروت الإحصائيات الأربعة العلوية كالصورة */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <BinStatCard title="إجمالي الحاويات" value={stats.totalBins ?? "-"} desc="من قاعدة البيانات" icon={<FaTrash />} bgIcon="text-emerald-600 bg-emerald-50" />
        <BinStatCard title="حاويات طبيعية" value={stats.emptyBins ?? "-"} desc={`${stats.emptyPercentage ?? 0}% من الإجمالي`} icon={<FaCheckCircle />} bgIcon="text-green-600 bg-green-50" />
        <BinStatCard title="حاويات بحاجة للجمع" value={stats.mediumBins ?? "-"} desc={`${stats.mediumPercentage ?? 0}% من الإجمالي`} icon={<FaExclamationTriangle />} bgIcon="text-amber-500 bg-amber-50" />
        <BinStatCard title="حاويات ممتلئة" value={stats.fullBins ?? "-"} desc={`${stats.fullPercentage ?? 0}% من الإجمالي`} icon={<FaTimesCircle />} bgIcon="text-red-600 bg-red-50" />
      </div>

      {/* حقل البحث المشترك وفلاتر الخيارات */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 text-sm">
            <FaSearch />
          </span>
          <input
            type="text"
            placeholder="البحث عن حاوية..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-4 pr-11 py-3 bg-gray-50/50 border border-gray-200/60 rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-right font-medium text-gray-800"
          />
        </div>
        
        <div className="flex gap-3 w-full md:w-auto justify-end">
          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="bg-gray-50 border border-gray-200 rounded-xl py-2 px-4 text-xs font-bold text-gray-600 focus:outline-none cursor-pointer">
            <option value="">جميع الحالات</option>
            <option value="empty">طبيعية</option>
            <option value="medium">بحاجة للجمع</option>
            <option value="full">ممتلئة</option>
          </select>
          <select value={regionFilter} onChange={(event) => setRegionFilter(event.target.value)} className="bg-gray-50 border border-gray-200 rounded-xl py-2 px-4 text-xs font-bold text-gray-600 focus:outline-none cursor-pointer">
            <option value="">جميع المناطق</option>
            <option value="الشمالية">المنطقة الشمالية</option>
            <option value="الشرقية">المنطقة الشرقية</option>
            <option value="الوسطى">المنطقة الوسطى</option>
            <option value="الغربية">المنطقة الغربية</option>
          </select>
        </div>
      </div>

      {/* قسم جدول الحاويات والأقسام الجانبية المتجاورة */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 items-start">
        <div className="xl:col-span-3">
          <BinsTable
            bins={filteredBins}
            totalCount={data.totalBins}
            onUpdate={async (id, fillLevel) => { await adminService.updateBin(id, { fillLevel }); await reloadBins(); }}
            onDelete={async (id) => { await adminService.deleteBin(id); await reloadBins(); }}
          />
        </div>
        <div className="xl:col-span-1">
          <BinsInsights stats={stats} bins={mapBins} />
        </div>
      </div>

      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
          <form onSubmit={handleCreateBin} className="w-full max-w-md space-y-4 rounded-2xl bg-white p-6 text-right shadow-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-gray-900">إضافة حاوية جديدة</h2>
              <button type="button" onClick={() => setIsCreateOpen(false)} className="text-gray-400 hover:text-gray-700" aria-label="إغلاق">×</button>
            </div>
            {[
              ["binNumber", "رقم الحاوية", "text"],
              ["location", "الموقع", "text"],
              ["lat", "خط العرض", "number"],
              ["lng", "خط الطول", "number"],
              ["fillLevel", "مستوى الامتلاء", "number"],
            ].map(([field, label, type]) => (
              <label key={field} className="block space-y-1 text-sm font-bold text-gray-600">
                <span>{label}</span>
                <input required type={type} min={field === "fillLevel" ? 0 : undefined} max={field === "fillLevel" ? 100 : undefined} value={form[field]} onChange={(event) => setForm({ ...form, [field]: event.target.value })} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 outline-none focus:border-emerald-500" />
              </label>
            ))}
            <button type="submit" disabled={isCreating} className="w-full rounded-xl bg-emerald-600 py-3 font-bold text-white disabled:opacity-60">
              {isCreating ? "جاري الإنشاء..." : "إنشاء الحاوية"}
            </button>
          </form>
        </div>
      )}

    </div>
  );
}
