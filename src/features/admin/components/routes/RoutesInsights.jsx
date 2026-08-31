import { FaMapMarkerAlt, FaInfoCircle, FaEye } from "react-icons/fa";

export default function RoutesInsights() {
  return (
    <div className="space-y-6" dir="rtl">
      
      {/* خريطة المسار المحدد */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
        <h4 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-1.5 border-b border-gray-50 pb-2">
          <FaMapMarkerAlt className="text-emerald-600" />
          <span>خريطة المسار المحدد</span>
        </h4>
        <div className="w-full h-44 bg-emerald-50/20 rounded-xl relative border border-emerald-100/20 flex items-center justify-center overflow-hidden">
          <div className="absolute top-10 right-14 text-emerald-600 text-base animate-pulse"><FaMapMarkerAlt /></div>
          <div className="absolute bottom-14 left-20 text-emerald-500 text-base"><FaMapMarkerAlt /></div>
          {/* تمثيل خط المسار الأخضر كالصورة */}
          <div className="absolute w-24 h-0.5 bg-emerald-500 transform -rotate-45"></div>
          <span className="text-[11px] font-bold text-emerald-800 bg-white/95 px-3 py-1.5 rounded-lg shadow-sm border border-emerald-100 z-10">
            تتبع خط السير الميداني
          </span>
        </div>
      </div>

      {/* تفاصيل المسار المحدد */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
        <h4 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-1.5 border-b border-gray-50 pb-2">
          <FaInfoCircle className="text-blue-500" />
          <span>تفاصيل المسار</span>
        </h4>
        <div className="space-y-3 text-xs font-bold text-gray-500">
          <div className="flex justify-between"><span>اسم المسار:</span><span className="text-gray-900">المسار 2</span></div>
          <div className="flex justify-between"><span>السائق:</span><span className="text-gray-900">خالد ناصر</span></div>
          <div className="flex justify-between"><span>الحالة:</span><span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded">قيد التنفيذ</span></div>
          <div className="flex justify-between"><span>عدد الحاويات:</span><span className="text-gray-900 font-mono">16</span></div>
          <div className="flex justify-between"><span>المسافة الإجمالية:</span><span className="text-gray-900 font-mono">32 كم</span></div>
          <div className="flex justify-between"><span>الوقت المتوقع:</span><span className="text-gray-900">3.2 ساعة</span></div>
          <div className="flex justify-between"><span>وقت البدء:</span><span className="text-gray-400 font-mono">08:30 AM</span></div>
          <div className="flex justify-between"><span>وقت الانتهاء المتوقع:</span><span className="text-gray-400 font-mono">11:30 AM</span></div>
        </div>
        <button className="w-full mt-4 py-2 bg-emerald-50 text-emerald-700 font-bold rounded-xl text-xs hover:bg-emerald-600 hover:text-white transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5">
          <FaEye className="text-[10px]" />
          <span>عرض المسار على الخريطة</span>
        </button>
      </div>

    </div>
  );
}
