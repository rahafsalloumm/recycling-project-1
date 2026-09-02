import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import { FaMapMarkerAlt, FaInfoCircle, FaEye } from 'react-icons/fa';
import L from 'leaflet';

// إصلاح مشكلة اختفاء أيقونات الخريطة الافتراضية في Leaflet مع React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cloudflare.com',
  iconUrl: 'https://cloudflare.com',
  shadowUrl: 'https://cloudflare.com',
});

export default function RoutesInsights({ selectedRoute }) {
  // بيانات المسار الافتراضي (المسار 2 كما بالصورة) لمنع حدوث أخطاء قبل الاختيار
  const defaultRoute = {
    routeName: "المسار 2",
    driverName: "خالد ناصر",
    status: "قيد التنفيذ",
    binsCount: 16,
    distance: "32 كم",
    estTime: "3.2 ساعة",
    startTime: "08:30 AM",
    endTime: "11:30 AM",
    fontColor: "text-blue-600 bg-blue-50 border-blue-100",
    desc: "الحي السكني - الشمال"
  };

  // دمج البيانات المستلمة مع الافتراضية
  const activeRoute = selectedRoute ? selectedRoute : defaultRoute;

  // 📍 إحداثيات جغرافية دقيقة لمدينة حلب كمثال لرسم خطوط سير الشاحنة
  const centerPosition = [36.2021, 37.1343]; // مركز مدينة حلب
  
  const routeCoordinates = [
    [36.2021, 37.1343], // مقر الشركة (نقطة الانطلاق)
    [36.2110, 37.1420], // الحاوية الأولى (العزيزية)
    [36.2230, 37.1290], // الحاوية الثانية (الشهباء)
    [36.1950, 37.1150]  // مركز المعالجة والتفريغ النهائي
  ];

  // تخصيص لون خط السير بناءً على حالة المسار (أخضر للمكتمل، أزرق لقيد التنفيذ)
  const polylineColor = activeRoute.status === "مكتمل" ? "#10b981" : "#3b82f6";

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
          <MapContainer center={centerPosition} zoom={13} scrollWheelZoom={false} className="w-full h-full">
            {/* 💡 تم تصحيح الرابط هنا وحمايته كلياً ليعمل بدون مشاكل */}
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://openstreetmap.org{z}/{x}/{y}.png"
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
          </MapContainer>
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
              {activeRoute.status}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span>عدد الحاويات:</span>
            <span className="text-gray-900 font-mono font-black">{activeRoute.binsCount}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>المسافة الإجمالية:</span>
            <span className=" font-mono font-black text-blue-600">{activeRoute.distance}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>الوقت المتوقع:</span>
            <span className=" font-black text-amber-600">{activeRoute.estTime}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>وقت البدء:</span>
            <span className="text-gray-400 font-mono font-normal">{activeRoute.startTime || "08:30 AM"}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>وقت الانتهاء المتوقع:</span>
            <span className="text-gray-400 font-mono font-normal">{activeRoute.endTime || "11:30 AM"}</span>
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

