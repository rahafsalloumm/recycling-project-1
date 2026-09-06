import {  useCallback, useEffect, useState  } from 'react';
import { FaUsers, FaUserPlus, FaUserCheck, FaStar, FaPlus, FaSearch } from "react-icons/fa";

import UserStatCard from "@/features/admin/components/users/UserStatCard";
import UsersTable from "@/features/admin/components/users/UsersTable";
import adminService from "@/services/admin";

export default function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState({ stats: {}, users: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", role: "user" });

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const response = await adminService.getUsers({ search: searchTerm });
      const payload = response?.data ?? response ?? {};
      setData({
        stats: payload?.stats || {},
        users: payload?.users || [],
      });
    } catch (requestError) {
      setError(requestError.message || "تعذر تحميل المستخدمين");
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => { loadUsers(); }, [loadUsers]);

  const usersData = (data.users || []).map((user) => ({
    ...user,
    role: user.role === "user" ? "مستخدم" : user.role,
    status: user.status === "active" ? "نشط" : user.status,
  }));

  const handleCreateUser = async (event) => {
    event.preventDefault();
    setIsCreating(true);
    setError("");
    try {
      await adminService.createUser(form);
      setForm({ name: "", email: "", phone: "", password: "", role: "user" });
      setIsCreateOpen(false);
      await loadUsers();
    } catch (requestError) {
      setError(requestError.message || "تعذر إنشاء المستخدم");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="w-full space-y-6 text-right font-sans p-1 animate-fadeIn duration-300" dir="rtl">
      {loading && !data.users.length && (
        <div className="rounded-xl bg-white p-4 text-sm text-gray-600 shadow-sm border border-gray-100">
          جاري تحميل المستخدمين...
        </div>
      )}

      {error && <p className="rounded-xl bg-red-50 p-4 text-sm font-bold text-red-600">{error}</p>}
      
      {/* هيدر الصفحة فخم وواضح وعريض الكلمات */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.01)]">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-emerald-600 rounded-full block"></span>
            إدارة المستخدمين
          </h1>
          <p className="text-sm text-gray-400 mt-1.5 font-medium">التحكم المركزي بحسابات المشتركين ومراجعة نقاطهم وصلاحياتهم</p>
        </div>
        
        <button onClick={() => setIsCreateOpen(true)} className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl text-sm font-bold shadow-md shadow-emerald-600/10 hover:bg-emerald-700 transition-all duration-300 cursor-pointer active:scale-98">
          <FaPlus className="text-xs" /> 
          <span>إضافة مستخدم جديد</span>
        </button>
      </div>

      {/* شريط البحث المريح والقوي بصرياً */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div className="relative w-full">
          <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 text-sm">
            <FaSearch />
          </span>
          <input
            type="text"
            placeholder="ابحث باسم المستخدم أو البريد الإلكتروني..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-4 pr-11 py-3.5 bg-gray-50/50 border border-gray-200/60 rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 shadow-inner transition-all duration-300 text-right font-medium text-gray-800 placeholder-gray-400"
          />
        </div>
      </div>

      {/* الكروت العلوية المتزنة هيدروليكياً بالألوان الناعمة */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <UserStatCard title="إجمالي المستخدمين" value={data.stats.totalUsers ?? "-"} desc={data.stats.totalUsersGrowth || ""} icon={<FaUsers />} bgIcon="text-emerald-600 bg-emerald-50" />
        <UserStatCard title="مستخدمون جدد" value={data.stats.newUsers ?? "-"} desc="هذا الشهر" icon={<FaUserPlus />} bgIcon="text-blue-600 bg-blue-50" />
        <UserStatCard title="المستخدمون النشطون" value={data.stats.activeUsers ?? "-"} desc="حساب نشط" icon={<FaUserCheck />} bgIcon="text-purple-600 bg-purple-50" />
        <UserStatCard title="متوسط النقاط" value={data.stats.averagePoints ?? "-"} desc="لكل مستخدم" icon={<FaStar />} bgIcon="text-amber-500 bg-amber-50" />
      </div>

      {/* جدول عرض البيانات المطور */}
      <UsersTable users={usersData} onToggleBan={async (id) => { await adminService.toggleUserBan(id); loadUsers(); }} />

      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
          <form onSubmit={handleCreateUser} className="w-full max-w-md space-y-4 rounded-2xl bg-white p-6 text-right shadow-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-gray-900">إضافة مستخدم جديد</h2>
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
            <label className="block space-y-1 text-sm font-bold text-gray-600">
              <span>الدور</span>
              <select value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 outline-none focus:border-emerald-500">
                <option value="user">مستخدم</option>
                <option value="driver">سائق</option>
              </select>
            </label>
            <button type="submit" disabled={isCreating} className="w-full rounded-xl bg-emerald-600 py-3 font-bold text-white disabled:opacity-60">
              {isCreating ? "جاري الإنشاء..." : "إنشاء الحساب"}
            </button>
          </form>
        </div>
      )}

    </div>
  );
}



