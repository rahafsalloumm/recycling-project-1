import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaRecycle } from 'react-icons/fa'; 
import { 
  FiGrid, 
  FiCalendar, 
  FiMapPin, 
  FiTrash2, 
  FiHome, 
  FiClipboard, 
  FiBell, 
  FiUser, 
  FiHelpCircle, 
  FiLogOut
} from 'react-icons/fi';

export default function Sidebar() {
  const menu = [
    { icon: <FiGrid />, label: "لوحة التحكم", path: "/driver/dashboard" },
    { icon: <FiCalendar />, label: "المهام اليومية", path: "/driver/tasks" },
    { icon: <FiMapPin />, label: "المسار الحالي", path: "/driver/route" },
    { icon: <FiTrash2 />, label: "الحاويات الذكية", path: "/driver/bins" },
    { icon: <FiHome />, label: "طلبات المنازل", path: "/driver/homes" },
    { icon: <FiClipboard />, label: "سجل المهام", path: "/driver/history" },
    { icon: <FiBell />, label: "الإشعارات", path: "/driver/notifications" },
    { icon: <FiUser />, label: "الملف الشخصي", path: "/driver/profile" },
    { icon: <FiHelpCircle />, label: "المساعدة", path: "/driver/help" },
  ];

  return (
    // 🎨 رجعنا اللون الزيتي الفخم والمطفي اللي برمجناه سوا [#0d2a1d] مع الطول الكامل
    <aside className="w-64 bg-[#0d2a1d] text-white flex flex-col justify-between h-full min-h-screen shrink-0 border-l border-[#1b4332]/40 select-none shadow-2xl" dir="rtl">
      
      <div className="flex flex-col w-full">
        {/* ♻️ الشعار الثلاثي والخط العريض الكبير المتناسق مع حجم الإدارة */}
        <div className="p-6 border-b border-[#1b4332]/50 flex items-center gap-4 w-full bg-[#0d2a1d]">
          <span className="text-3xl text-white font-light">
            <FaRecycle />
          </span>
          <div className="text-right space-y-1">
            <h2 className="text-xl font-black tracking-tight text-white leading-none">EcoCycle</h2>
            <span className="text-xs font-bold text-gray-300 block tracking-wide mt-1">لوحة السائق</span>
          </div>
        </div>
        
        {/* 📋 القائمة بتباعد فسيح ونظيف كالإدارة، لكن بستايل التحديد الأبيض الشفاف الفاخر اللي اخترته سابقاً */}
        <nav className="flex flex-col gap-2 p-4 w-full">
          {menu.map((item, i) => (
            <NavLink 
              key={i} 
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-bold w-full text-right group
                ${isActive 
                  ? 'bg-white/10 text-white shadow-sm font-black border border-white/10' 
                  : 'text-emerald-100/70 hover:bg-white/5 hover:text-white'}
              `}
            >
              {({ isActive }) => (
                <>
                  <span className={`text-base flex items-center justify-center shrink-0 transition-colors duration-200 ${isActive ? 'text-white' : 'text-emerald-500/50 group-hover:text-emerald-400'}`}>
                    {item.icon}
                  </span>
                  {/* خط الكلمات صار أوضح وأكبر (text-sm) وما عاد يكبس أو يلتصق */}
                  <span className="truncate text-sm font-medium">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
      
      {/* زر تسجيل الخروج المثبت بالقاع وبنفس الألوان الداكنة والمسافة المريحة */}
      <div className="p-5 border-t border-[#1b4332]/50 w-full bg-[#0d2a1d] mb-4">
        <button className="flex items-center gap-4 px-4 py-3 hover:bg-red-950/20 text-red-400 hover:text-red-300 rounded-xl text-sm font-black text-right w-full transition-all duration-200 active:scale-[0.98] group">
          <FiLogOut className="text-lg shrink-0 transition-transform duration-200 group-hover:-translate-x-1" />
          <span>تسجيل الخروج</span>
        </button>
      </div>

    </aside>
  );
}
