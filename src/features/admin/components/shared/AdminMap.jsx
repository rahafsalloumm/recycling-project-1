import { FaMapMarkerAlt } from "react-icons/fa";

export default function AdminMap() {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-full">
      <h3 className="text-base font-bold text-gray-800 mb-3">الحاويات الممتلئة على الخريطة</h3>
      <div className="bg-emerald-50 rounded-xl h-40 relative overflow-hidden flex items-center justify-center border border-emerald-100 shadow-inner">
        <div className="absolute top-8 left-12 text-red-500 animate-bounce"><FaMapMarkerAlt size={20} /></div>
        <div className="absolute bottom-10 right-20 text-yellow-500 animate-pulse"><FaMapMarkerAlt size={20} /></div>
        <div className="absolute top-16 right-12 text-green-500"><FaMapMarkerAlt size={20} /></div>
        <span className="text-[11px] font-bold text-emerald-700 bg-white/80 px-3 py-1 rounded-full shadow-sm">عرض محاكي الخريطة التفاعلية</span>
      </div>
      <button className="w-full mt-3 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors">عرض على الخريطة الشاملة</button>
    </div>
  );
}