import React, { useState } from "react";
import { FaUsers, FaUserPlus, FaUserCheck, FaStar, FaPlus, FaSearch } from "react-icons/fa";

import UserStatCard from "../components/adminUsers/UserStatCard";
import UsersTable from "../components/adminUsers/UsersTable";

export default function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState("");

  const usersData = [
    { id: 1, name: "رهف أحمد", email: "rahaf.ahmed@gmail.com", role: "مستخدم", points: 850, status: "نشط" },
    { id: 2, name: "أحمد محمد", email: "ahmad.mohd@gmail.com", role: "مستخدم", points: 430, status: "نشط" },
    { id: 3, name: "سارة خالد", email: "sara.khaled@gmail.com", role: "مستخدم", points: 620, status: "نشط" },
    { id: 4, name: "محمد علي", email: "mohammed.ali@gmail.com", role: "مستخدم", points: 310, status: "نشط" },
    { id: 5, name: "ليلى حسن", email: "laila.hasan@gmail.com", role: "مستخدم", points: 710, status: "نشط" }
  ];

  const filteredUsers = usersData.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full space-y-6 text-right font-sans p-1 animate-fadeIn duration-300" dir="rtl">
      
      {/* هيدر الصفحة فخم وواضح وعريض الكلمات */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.01)]">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-emerald-600 rounded-full block"></span>
            إدارة المستخدمين
          </h1>
          <p className="text-sm text-gray-400 mt-1.5 font-medium">التحكم المركزي بحسابات المشتركين ومراجعة نقاطهم وصلاحياتهم</p>
        </div>
        
        <button className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl text-sm font-bold shadow-md shadow-emerald-600/10 hover:bg-emerald-700 transition-all duration-300 cursor-pointer active:scale-98">
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
        <UserStatCard title="إجمالي المستخدمين" value="1,248" desc="+12% هذا الشهر" icon={<FaUsers />} bgIcon="text-emerald-600 bg-emerald-50" />
        <UserStatCard title="مستخدمون جدد" value="78" desc="+18% هذا الشهر" icon={<FaUserPlus />} bgIcon="text-blue-600 bg-blue-50" />
        <UserStatCard title="المستخدمون النشطون" value="982" desc="متاحين حالياً" icon={<FaUserCheck />} bgIcon="text-purple-600 bg-purple-50" />
        <UserStatCard title="متوسط النقاط" value="640" desc="لكل مستخدم" icon={<FaStar />} bgIcon="text-amber-500 bg-amber-50" />
      </div>

      {/* جدول عرض البيانات المطور */}
      <UsersTable users={filteredUsers} />

    </div>
  );
}



