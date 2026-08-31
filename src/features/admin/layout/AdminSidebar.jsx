import { NavLink } from 'react-router-dom';
import { FaRecycle } from 'react-icons/fa'; // شعار التدوير الثلاثي الموحد للمشروع
import { FaHome, FaUsers, FaTruck, FaChartPie, FaGift, FaCog, FaSignOutAlt } from "react-icons/fa";

export default function AdminSidebar() {
  // الحفاظ على أزرار ومسارات الأدمن الحالية الخاصة بك بدقة
  const menu = [
    { icon: <FaHome />, label: "لوحة التحكم", path: "/admin/dashboard" },
    { icon: <FaUsers />, label: "إدارة المستخدمين", path: "/admin/users" },
    { icon: <FaTruck />, label: "إدارة الطلبات", path: "/admin/orders" },
    { icon: <FaChartPie />, label: "التقارير والإحصائيات", path: "/admin/reports" },
    { icon: <FaGift />, label: "نظام المكافآت", path: "/admin/rewards" },
    { icon: <FaCog />, label: "الإعدادات", path: "/admin/settings" },
  ];

  return (
    // 🎨 التوحيد: العرض ثابت w-64، اللون زيتي فخم [#0d2a1d]، وملء الطول بالكامل h-screen fixed
    <aside className="w-64 bg-[#0d2a1d] text-white flex flex-col justify-between h-screen fixed right-0 top-0 bottom-0 z-30 shadow-2xl border-l border-[#1b4332]/40 select-none" dir="rtl">
      <div>
        {/* الهيدر الموحد بشعار التدوير وعنوان مشروعك عريض ونظيف */}
        <div className="p-6 border-b border-[#1b4332]/50 flex items-center gap-4 bg-[#0d2a1d]">
          <span className="text-3xl text-white font-light">
            <FaRecycle />
          </span>
          <div className="text-right space-y-1">
            <h2 className="text-xl font-black tracking-tight text-white leading-none">EcoCycle</h2>
            <span className="text-xs font-bold text-gray-300 block tracking-wide mt-1">لوحة الإدارة</span>
          </div>
        </div>
        
        {/* 📋 القائمة بتباعد فسيح ونظيف وستايل التحديد الأبيض الشفاف الفاخر المتطابق مع السائق */}
        <nav className="flex flex-col gap-2.5 p-5 w-full">
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
                  <span className={`text-base flex items-center justify-center shrink-0 transition-colors duration-200 ${isActive ? 'text-white' : 'text-emerald-500/50 group-hover:text-emerald-400'}`}>{item.icon}</span>
                  <span className="truncate text-sm font-medium">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
      
      {/* زر تسجيل الخروج مدفوع للقاع تماماً وبنفس الستايل النظيف */}
      <div className="p-5 border-t border-[#1b4332]/50 w-full bg-[#0d2a1d] mb-4">
        <button className="flex items-center gap-4 px-4 py-3.5 hover:bg-red-950/20 text-red-400 hover:text-red-300 rounded-xl text-sm font-black text-right w-full transition-all duration-200 active:scale-[0.98]">
          <FaSignOutAlt className="text-lg shrink-0" />
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </aside>
  );
}
