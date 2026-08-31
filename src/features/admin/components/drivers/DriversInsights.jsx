import { FaMapMarkerAlt } from "react-icons/fa";

export default function DriversInsights() {
  return (
    <div className="space-y-6">
      
      {/* الخريطة بطريقة برمجية تفاعلية حديثة كصندوق خريطة مخصص */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
        <h4 className="text-xs font-bold text-gray-800 mb-3 flex items-center gap-1.5">
          <FaMapMarkerAlt className="text-emerald-600" />
          <span>توزيع السائقين الميداني</span>
        </h4>
        
        {/* محاكاة حاوية الخريطة المخصصة لتوصيل Google Maps أو Leaflet لاحقاً */}
        <div className="w-full h-44 bg-emerald-50/40 rounded-xl relative overflow-hidden border border-emerald-100/30 flex items-center justify-center">
          <div className="absolute top-10 right-20 animate-bounce text-emerald-600 text-lg"><FaMapMarkerAlt /></div>
          <div className="absolute bottom-12 left-16 animate-bounce text-purple-600 text-lg"><FaMapMarkerAlt /></div>
          <span className="text-xs font-semibold text-emerald-800 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm border border-emerald-100">
            الخريطة الميدانية النشطة
          </span>
        </div>
      </div>

      {/* قسم أحدث المهام الحية */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
        <h4 className="text-xs font-bold text-gray-800 mb-4">أحدث المهام الجارية</h4>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b border-gray-50 pb-3">
            <div className="space-y-0.5">
              <p className="text-xs font-bold text-gray-800">جمع النفايات - رام الله</p>
              <p className="text-[10px] text-gray-400">السائق: أحمد محمود</p>
            </div>
            <span className="px-2 py-0.5 bg-green-50 text-green-700 text-[10px] font-bold rounded">جاري التنفيذ</span>
          </div>

          <div className="flex justify-between items-center border-b border-gray-50 pb-3">
            <div className="space-y-0.5">
              <p className="text-xs font-bold text-gray-800">جمع البلاستيك - البيرة</p>
              <p className="text-[10px] text-gray-400">السائق: خالد ناصر</p>
            </div>
            <span className="px-2 py-0.5 bg-amber-50 text-amber-700 text-[10px] font-bold rounded">بانتظار التفريغ</span>
          </div>
        </div>
      </div>

    </div>
  );
}
