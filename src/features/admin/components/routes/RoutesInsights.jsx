import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import { FaMapMarkerAlt, FaInfoCircle, FaEye } from 'react-icons/fa';
import L from 'leaflet';

// إصلاح مشكلة اختفاء أيقونات الخريطة الافتراضية في Leaflet مع React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export default function RoutesInsights({ selectedRoute }) {
  const activeRoute = selectedRoute || {
    routeName: "لا يوجد مسار محدد",
    driverName: "-",
    status: "-",
    binsCount: 0,
    distance: "-",
    estTime: "-",
    fontColor: "text-gray-600 bg-gray-50 border-gray-100",
    waypoints: [],
  };
  const normalizedStatus = activeRoute.status === "مكتمل" || activeRoute.status === "completed"
    ? "مكتمل"
    : activeRoute.status === "قيد التنفيذ" || activeRoute.status === "in_progress"
      ? "قيد التنفيذ"
      : activeRoute.status === "لم يبدأ" || activeRoute.status === "pending"
        ? "لم يبدأ"
        : activeRoute.status || "قيد التنفيذ";

  const routeDistance = activeRoute.distance || "-";
  const routeBins = activeRoute.binsCount ?? 0;
  const routeTime = activeRoute.estTime || "-";

  // 📍 إحداثيات جغرافية دقيقة لمدينة حلب كمثال لرسم خطوط سير الشاحنة
  const routeCoordinates = (activeRoute.waypoints || [])
    .map((waypoint) => waypoint.details?.coordinates || waypoint.coordinates)
    .map((coordinates) => {
      if (Array.isArray(coordinates) && coordinates.length >= 2) return [Number(coordinates[0]), Number(coordinates[1])];
      if (coordinates?.lat != null && coordinates?.lng != null) return [Number(coordinates.lat), Number(coordinates.lng)];
      return null;
    })
    .filter((coordinates) => coordinates && coordinates.every(Number.isFinite));
  const centerPosition = routeCoordinates[0] || [36.2021, 37.1343];

  // تخصيص لون خط السير بناءً على حالة المسار (أخضر للمكتمل، أزرق لقيد التنفيذ)
  const polylineColor = normalizedStatus === "مكتمل" ? "#10b981" : "#3b82f6";

  return (
    <div className="space-y-6" dir="rtl">
      
      {/* 🗺️ صندوق الخريطة الجغرافية التفاعلية الحقيقية */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
        <h4 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-1.5 border-b border-gray-50 pb-2">
          <FaMapMarkerAlt className="text-emerald-600 text-xs" />
          <span>خريطة المسار المحدد</span>
        </h4>
        
        {/* حواضن الخريطة الحقيقية بالطول المناسب للتصميم */}
        <div className="w-full h-56 rounded-xl overflow-hidden border border-gray-100 shadow-inner z-0 relative">
          {routeCoordinates.length ? <MapContainer center={centerPosition} zoom={13} scrollWheelZoom={false} className="w-full h-full">
            {/* 💡 تم تصحيح الرابط هنا وحمايته كلياً ليعمل بدون مشاكل */}
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {/* وضع علامات ومؤشرات تفاعلية على محطات الخريطة */}
            {routeCoordinates.map((pos, idx) => (
              <Marker key={idx} position={pos}>
                <Popup>
                  <div className="text-right font-sans p-1">
                    <p className="font-bold text-gray-900 text-xs">
                      {idx === 0 ? "📍 مقر الانطلاق الرئيسي" : idx === routeCoordinates.length - 1 ? "🏁 centre المعالجة والفرز" : `🗑️ حاوية محطة رقم ${idx}`}
                    </p>
                    <p className="text-[10px] text-gray-500 mt-0.5">تابع لـ: {activeRoute.routeName}</p>
                  </div>
                </Popup>
              </Marker>
            ))}

            {/* 🛣️ رسم خط السير الفعلي الذي يربط الإحداثيات ببعضها برمجياً */}
            <Polyline positions={routeCoordinates} color={polylineColor} weight={4} opacity={0.85} dashArray="5, 8" />
          </MapContainer> : <div className="h-full flex items-center justify-center text-sm text-gray-400">اختر مسارًا لعرض نقاطه على الخريطة.</div>}
        </div>
      </div>

      {/* 📋 تفاصيل المسار المحدد الديناميكية المحدثة بالتيلويند */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] text-right">
        <h4 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-1.5 border-b border-gray-50 pb-2">
          <FaInfoCircle className="text-blue-500 text-xs" />
          <span>تفاصيل المسار</span>
        </h4>
        
        {/* شبكة البيانات المتغيرة تفاعلياً مع الجدول */}
        <div className="space-y-3 text-xs font-bold text-gray-500">
          <div className="flex justify-between items-center">
            <span>اسم المسار:</span>
            <span className="text-gray-900 font-black">{activeRoute.routeName}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>السائق:</span>
            <span className="text-gray-900 font-black">{activeRoute.driverName}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>الحالة:</span>
            <span className={`px-2 py-0.5 rounded font-black text-[11px] border ${activeRoute.fontColor || "bg-blue-50 text-blue-600 border-blue-100"}`}>
              {normalizedStatus}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span>عدد الحاويات:</span>
            <span className="text-gray-900 font-mono font-black">{routeBins}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>المسافة الإجمالية:</span>
            <span className=" font-mono font-black text-blue-600">{routeDistance}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>الوقت المتوقع:</span>
            <span className=" font-black text-amber-600">{routeTime}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>وقت البدء:</span>
            <span className="text-gray-400 font-mono font-normal">{activeRoute.startTime || "-"}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>وقت الانتهاء المتوقع:</span>
            <span className="text-gray-400 font-mono font-normal">{activeRoute.endTime || "-"}</span>
          </div>
        </div>

        {/* زر تفعيل الخريطة */}
        <button 
          type="button"
          className="w-full mt-4 py-2.5 bg-emerald-50 text-emerald-700 font-black rounded-xl text-xs hover:bg-emerald-600 hover:text-white transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs active:scale-98"
        >
          <FaEye className="text-[10px]" />
          <span>عرض المسار على الخريطة</span>
        </button>
      </div>

    </div>
  );
}

