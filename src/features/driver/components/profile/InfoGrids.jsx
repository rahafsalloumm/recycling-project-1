
import { FiLock, FiBell } from 'react-icons/fi';

const InfoGrids = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative" dir="rtl">
      
      {/* 🛠️ 1. كرت الإعدادات */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.01)] hover:shadow-[0_6px_18px_rgba(0,0,0,0.02)] transition-shadow duration-300 min-h-[180px]">
        <div>
          <h4 className="text-xs font-extrabold text-gray-400 tracking-wide mb-4">الإعدادات</h4>
          <div className="space-y-4 text-xs font-bold text-gray-600">
            <div className="flex justify-between items-center py-2 border-b border-gray-50 cursor-pointer hover:text-emerald-600 transition-colors">
              <span className="flex items-center gap-2.5"><FiLock className="text-gray-400" /> تغيير كلمة المرور</span> 
              <span className="text-gray-300">←</span>
            </div>
            <div className="flex justify-between items-center py-2 cursor-pointer hover:text-emerald-600 transition-colors">
              <span className="flex items-center gap-2.5"><FiBell className="text-gray-400" /> إعدادات الإشعارات</span> 
              <span className="text-gray-300">←</span>
            </div>
          </div>
        </div>
      </div>

      {/* 📄 2. كرت معلومات الرخصة (تم حذف زر العرض بالأسفل) */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.01)] hover:shadow-[0_6px_18px_rgba(0,0,0,0.02)] transition-shadow duration-300 min-h-[180px]">
        <div>
          <h4 className="text-xs font-extrabold text-gray-400 tracking-wide mb-3">معلومات الرخصة</h4>
          <div className="space-y-2.5 text-xs font-bold text-gray-700">
            <div className="flex justify-between"><span className="text-gray-400 font-medium">رقم الرخصة</span> <span className="font-sans">0123456789</span></div>
            <div className="flex justify-between"><span className="text-gray-400 font-medium">نوع الرخصة</span> <span>قيادة مركبات ثقيلة</span></div>
            <div className="flex justify-between"><span className="text-gray-400 font-medium">الحالة</span> <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100/50 text-[10px]">سارية</span></div>
          </div>
        </div>
      </div>
      {/* 🚚 3. كرت معلومات المركبة (تم حذف زر عرض التفاصيل بالأسفل) */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.01)] hover:shadow-[0_6px_18px_rgba(0,0,0,0.02)] transition-shadow duration-300 min-h-[180px]">
        <div>
          <h4 className="text-xs font-extrabold text-gray-400 tracking-wide mb-3">معلومات المركبة</h4>
          <div className="space-y-2.5 text-xs font-bold text-gray-700">
            <div className="flex justify-between"><span className="text-gray-400 font-medium">رقم الشاحنة</span> <span className="font-sans">TRK-007</span></div>
            <div className="flex justify-between"><span className="text-gray-400 font-medium">نوع الشاحنة</span> <span>ضاغطة نفايات</span></div>
            <div className="flex justify-between"><span className="text-gray-400 font-medium">الحالة</span> <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100/50 text-[10px]">نشطة</span></div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default InfoGrids;
