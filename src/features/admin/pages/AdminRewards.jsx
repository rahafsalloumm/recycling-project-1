import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaSearch, FaStar, FaUsers, FaCoins, FaBoxes, FaGift } from "react-icons/fa";

import RewardStatCard from "@/features/admin/components/rewards/RewardStatCard";
import RewardsTable from "@/features/admin/components/rewards/RewardsTable";
import adminService from "@/services/admin";

export default function AdminRewards() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("الكل");

  // 💡 استبدال المكافآت القديمة بالمنتجات العينية الثمانية المخصصة للتوصيل الفوري مع السائق
  const [rewardsData, setRewardsData] = useState([]);
  const [claims, setClaims] = useState([]);
  const [rewardStats, setRewardStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [form, setForm] = useState({ title: "", category: "منتجات بيئية بديلة", pointsRequired: 100, stock: 10, isActive: true });

  const loadRewards = async () => {
    try {
      setLoading(true);
      setError("");
      const [response, claimsResponse] = await Promise.all([
        adminService.getRewards({
          category: activeCategory === "الكل" ? "all" : activeCategory,
          search: searchTerm || undefined,
        }),
        adminService.getRewardClaims(),
      ]);
      const payload = response?.data ?? response ?? {};
      const rewards = Array.isArray(payload?.rewards) ? payload.rewards : [];
      const claimsPayload = claimsResponse?.data ?? claimsResponse ?? {};
      setClaims(Array.isArray(claimsPayload?.data) ? claimsPayload.data : []);
      setRewardStats(payload?.stats || {});
      setRewardsData(rewards.map((reward) => ({
        id: reward._id,
        name: reward.title,
        category: reward.category,
        points: reward.pointsRequired,
        stock: reward.stock,
        claimed: reward.claimedCount,
        status: reward.isActive,
        claims: (Array.isArray(claimsPayload?.data) ? claimsPayload.data : []).filter((claim) => (claim.rewardId?._id || claim.rewardId) === reward._id),
      })));
    } catch (requestError) {
      setError(requestError.message || "تعذر تحميل المكافآت");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRewards();
  }, [searchTerm, activeCategory]);

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      await adminService.updateReward(id, { isActive: !currentStatus });
      await loadRewards();
    } catch (requestError) {
      setError(requestError.message || "تعذر تحديث حالة المكافأة");
    }
  };

  const handleCreateReward = async (event) => {
    event.preventDefault();
    setIsCreating(true);
    setError("");

    try {
      await adminService.createReward({
        ...form,
        pointsRequired: Number(form.pointsRequired),
        stock: Number(form.stock),
      });
      setForm({ title: "", category: "منتجات بيئية بديلة", pointsRequired: 100, stock: 10, isActive: true });
      setIsCreateOpen(false);
      await loadRewards();
    } catch (requestError) {
      setError(requestError.message || "تعذر إنشاء المكافأة");
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteReward = async (id) => {
    try {
      setError("");
      await adminService.deleteReward(id);
      await loadRewards();
    } catch (requestError) {
      setError(requestError.message || "تعذر حذف المكافأة");
      throw requestError;
    }
  };

  // 📋 تحديث الفئات الجانبية المتاحة لتطابق التصنيف العيني الجديد
  const categories = [
    { name: "الكل", icon: "🌿", count: rewardsData.length },
    { name: "منتجات بيئية بديلة", icon: "🎒", count: rewardsData.filter(r => r.category === "منتجات بيئية بديلة").length }
  ];

  // عمليات الفلترة المزدوجة بالبحث والفئات الجانبية
  const filteredRewards = rewardsData.filter(reward => {
    const matchesSearch = reward.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "الكل" || reward.category === activeCategory;
    return matchesSearch && matchesCategory;
  });
  return (
    <div className="w-full space-y-6 text-right font-sans p-1 animate-fadeIn duration-300" dir="rtl">
      {loading && !rewardsData.length && (
        <div className="rounded-xl bg-white p-4 text-sm text-gray-600 shadow-sm border border-gray-100">
          جاري تحميل المكافآت...
        </div>
      )}

      {error && <p className="rounded-xl bg-red-50 p-4 text-sm font-bold text-red-600">{error}</p>}
      
      {/* هيدر الصفحة */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-emerald-600 rounded-full block"></span>
            نظام الحوافز والمكافآت الخدمية
          </h1>
          <p className="text-sm text-gray-400 mt-1.5 font-medium">تحفيز المشاركة المجتمعية عبر ربط نقاط التدوير بمنتجات بيئية وحوافز عصرية مرغوبة وعينية</p>
        </div>
        
        <button type="button" onClick={() => setIsCreateOpen(true)} className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl text-sm font-bold shadow-md hover:bg-emerald-700 transition-all duration-300 cursor-pointer active:scale-98">
          <FaPlus className="text-xs" /> 
          <span>إضافة حافز جديد</span>
        </button>
      </div>

      {/* الكروت العلوية الإحصائية */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <RewardStatCard title="إجمالي النقاط الموزعة" value={rewardStats.totalPointsDistributed ?? "-"} desc="من قاعدة البيانات" icon={<FaCoins />} bgIcon="text-emerald-600 bg-emerald-50" />
        <RewardStatCard title="الحوافز المستردة" value={rewardStats.totalClaimedCount ?? "-"} desc="عمليات الاسترداد" icon={<FaGift />} bgIcon="text-blue-600 bg-blue-50" />
        <RewardStatCard title="المستفيدين" value={rewardStats.beneficiariesCount ?? "-"} desc="مستخدمون لديهم نقاط" icon={<FaUsers />} bgIcon="text-purple-600 bg-purple-50" />
        <RewardStatCard title="متوسط النقاط" value={rewardStats.consumptionRate ?? "-"} desc="متوسط المستخدم" icon={<FaStar />} bgIcon="text-amber-500 bg-amber-50" />
      </div>

      {/* شريط البحث المطور */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div className="relative w-full">
          <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 text-sm">
            <FaSearch />
          </span>
          <input
            type="text"
            placeholder="ابحث عن حافز متاح..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-4 pr-11 py-3.5 bg-gray-50/50 border border-gray-200/60 rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 shadow-inner transition-all duration-300 text-right font-medium text-gray-800 placeholder-gray-400"
          />
        </div>
      </div>

      {/* الجدول والقائمة الجانبية الفعالة */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 items-start">
        <div className="xl:col-span-3">
          <RewardsTable rewards={filteredRewards} claims={claims} onToggleStatus={handleToggleStatus} onUpdate={async (id, data) => { await adminService.updateReward(id, data); await loadRewards(); }} onDelete={handleDeleteReward} />
        </div>
        
        <div className="xl:col-span-1 space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
            <h4 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-1.5 border-b border-gray-50 pb-2">
              <FaBoxes className="text-emerald-600 text-xs" />
              <span>فئات الحوافز المتاحة</span>
            </h4>
            <div className="space-y-2 text-xs font-bold text-gray-600">
              {categories.map((cat) => (
                <div 
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`flex justify-between items-center p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                    activeCategory === cat.name 
                      ? "bg-emerald-600 text-white shadow-md font-black translate-x-[-2px]" 
                      : "bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-800 border border-gray-100/50"
                  }`}
                >
                  <span>{cat.icon} {cat.name}</span>
                  <span className={`font-mono text-xs px-2 py-0.5 rounded-md ${activeCategory === cat.name ? "bg-white/20 text-white" : "bg-gray-100 text-gray-400"}`}>{cat.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
          <form onSubmit={handleCreateReward} className="w-full max-w-md space-y-4 rounded-2xl bg-white p-6 text-right shadow-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-gray-900">إضافة حافز جديد</h2>
              <button type="button" onClick={() => setIsCreateOpen(false)} className="text-gray-400 hover:text-gray-700" aria-label="إغلاق">×</button>
            </div>
            <label className="block space-y-1 text-sm font-bold text-gray-600">
              <span>اسم الحافز</span>
              <input required value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 outline-none focus:border-emerald-500" />
            </label>
            <label className="block space-y-1 text-sm font-bold text-gray-600">
              <span>الفئة</span>
              <select value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 outline-none focus:border-emerald-500">
                <option value="منتجات بيئية بديلة">منتجات بيئية بديلة</option>
                <option value="تجارب">تجارب</option>
                <option value="خصومات">خصومات</option>
              </select>
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block space-y-1 text-sm font-bold text-gray-600">
                <span>النقاط</span>
                <input required type="number" min="0" value={form.pointsRequired} onChange={(event) => setForm({ ...form, pointsRequired: event.target.value })} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 outline-none focus:border-emerald-500" />
              </label>
              <label className="block space-y-1 text-sm font-bold text-gray-600">
                <span>المخزون</span>
                <input required type="number" min="0" value={form.stock} onChange={(event) => setForm({ ...form, stock: event.target.value })} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 outline-none focus:border-emerald-500" />
              </label>
            </div>
            <label className="flex items-center justify-between rounded-xl border border-gray-200 px-3 py-2.5 text-sm font-bold text-gray-600">
              <span>فعال</span>
              <input type="checkbox" checked={form.isActive} onChange={(event) => setForm({ ...form, isActive: event.target.checked })} className="h-4 w-4 accent-emerald-600" />
            </label>
            <button type="submit" disabled={isCreating} className="w-full rounded-xl bg-emerald-600 py-3 font-bold text-white disabled:opacity-60">
              {isCreating ? "جاري الإنشاء..." : "إنشاء الحافز"}
            </button>
          </form>
        </div>
      )}

    </div>
  );
}
