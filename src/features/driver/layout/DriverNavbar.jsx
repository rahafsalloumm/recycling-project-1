import { FiBell } from 'react-icons/fi';

const DriverNavbar = () => {
  return (
    <header className="bg-white border-b border-gray-100 px-8 py-4 flex justify-between items-center sticky top-0 z-20 shadow-[0_2px_12px_rgba(0,0,0,0.01)]" dir="rtl">
      
      {/* جهة اليمين: الترحيب والاسم */}
      <div className="flex items-center gap-3 group cursor-pointer">
        <div className="text-right">
          <p className="text-[11px] text-gray-400 font-bold leading-none">مرحباً أحمد 👋</p>
          <h2 className="text-xs font-black text-emerald-800 tracking-tight mt-1">أنت على الطريق اليوم</h2>
        </div>
      </div>
      
      {/* جهة اليسار: تم إزالة زر الـ 3 نقاط (☰) لتصفية المظهر */}
      <div className="flex items-center gap-4">
        <div className="relative p-2.5 bg-gray-50 text-gray-400 hover:text-emerald-600 rounded-xl cursor-pointer transition-all duration-300 border border-gray-100 hover:border-emerald-100 active:scale-95 group">
          <FiBell className="text-base stroke-[2.5] group-hover:rotate-12 transition-transform duration-300" />
          <span className="absolute top-2.5 left-2.5 bg-emerald-500 w-2 h-2 rounded-full ring-2 ring-white"></span>
        </div>

        <span className="text-xs font-black text-slate-600 bg-gray-50 border border-gray-100 px-4 py-2 rounded-xl tracking-tight">
          المنطقة الشمالية
        </span>
      </div>

    </header>
  );
};

export default DriverNavbar;

