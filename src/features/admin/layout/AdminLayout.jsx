import { NavLink, Outlet } from "react-router-dom";
import { FaRecycle } from "react-icons/fa"; // شعار التدوير الثلاثي الموحد للمشروع
import { 
  FaChartPie, 
  FaUsers, 
  FaTruck, 
  FaClipboardList, 
  FaTrash, 
  FaRoute, 
  FaChartLine, 
  FaGift, 
  FaCog, 
  FaSignOutAlt 
} from "react-icons/fa";

export default function AdminLayout() {
  const menu = [
    { icon: <FaChartPie />, label: "لوحة التحكم", path: "/admin/dashboard" },
    { icon: <FaUsers />, label: "إدارة المستخدمين", path: "/admin/users" },
    { icon: <FaTruck />, label: "إدارة السائقين", path: "/admin/drivers" },
    { icon: <FaClipboardList />, label: "إدارة الطلبات", path: "/admin/orders" },
    { icon: <FaTrash />, label: "الحاويات الذكية", path: "/admin/bins" },
    { icon: <FaRoute />, label: "إدارة المسارات", path: "/admin/routes" },
    { icon: <FaChartLine />, label: "التقارير والإحصائيات", path: "/admin/reports" },
    { icon: <FaGift />, label: "نظام المكافآت", path: "/admin/rewards" },
    { icon: <FaCog />, label: "الإعدادات", path: "/admin/settings" },
  ];

  return (
    // 💡 نظام flex مع h-screen يمنع التداخل نهائياً ويجعل السايد بار واللوحة يقفان جنباً إلى جنب كأعمدة حقيقية
    <div className="bg-[#f4f7f6] h-screen w-full flex overflow-hidden font-sans antialiased text-slate-800" dir="rtl">
      
      {/* 🟢 القائمة الجانبية للأدمن: تم توحيد العرض w-64، واللون الزيتي الفخم [#0d2a1d] كالسائق تماماً */}
      <aside className="w-64 bg-[#0d2a1d] text-white flex flex-col justify-between h-full min-h-screen shrink-0 border-l border-[#1b4332]/40 select-none shadow-2xl">
        <div className="flex flex-col w-full">
          
          {/* الهيدر العلوي النظيف والفاخر بالشعار الثلاثي وعنوان عريض وضخم كالأصل */}
          <div className="p-6 border-b border-[#1b4332]/50 flex items-center gap-4 w-full bg-[#0d2a1d]">
            <span className="text-3xl text-white font-light">
              <FaRecycle />
            </span>
            <div className="text-right space-y-1">
              <h2 className="text-xl font-black tracking-tight text-white leading-none">EcoCycle</h2>
              <span className="text-xs font-bold text-gray-300 block tracking-wide mt-1">لوحة الإدارة</span>
            </div>
          </div>
          
          {/* قائمة الأزرار بتباعد فسيح ونظيف (gap-2.5) وستايل التحديد الأبيض الشفاف الفاخر المتطابق مع السائق */}
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
                    <span className={`text-base flex items-center justify-center shrink-0 transition-colors duration-200 ${isActive ? 'text-white' : 'text-emerald-500/50 group-hover:text-emerald-400'}`}>
                      {item.icon}
                    </span>
                    <span className="truncate text-sm font-medium">{item.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
        
        {/* زر تسجيل الخروج مدفوع للقاع تماماً وبنفس الستايل النظيف والآمن */}
        <div className="p-5 border-t border-[#1b4332]/50 w-full bg-[#0d2a1d] mb-4">
          <button className="flex items-center gap-4 px-4 py-3.5 hover:bg-red-950/20 text-red-400 hover:text-red-300 rounded-xl text-sm font-black text-right w-full transition-all duration-200 active:scale-[0.98]">
            <FaSignOutAlt className="text-lg shrink-0" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      {/* 🔵 محتوى شاشات وجداول الأدمن: يأخذ باقي مساحة الشاشة بالكامل ويفتح سكرول ناعم ومستقل محمي من الكبس */}
      <div className="flex-1 h-screen overflow-y-auto bg-[#f4f7f6]">
        <Outlet />
      </div>

    </div>
  );
}
