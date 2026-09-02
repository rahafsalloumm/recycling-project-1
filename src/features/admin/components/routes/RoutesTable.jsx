import { useState } from "react";
import { FaEdit, FaTrash, FaEye, FaTimes, FaRoute, FaUser, FaMapMarkerAlt, FaSave } from "react-icons/fa";

export default function RoutesTable({ routes, onSelectRoute }) {
  // صور افتراضية للسائقين
  const driverAvatars = {
    "DRV-001": "https://unsplash.com",
    "DRV-002": "https://unsplash.com",
    "DRV-003": "https://unsplash.com",
    "DRV-004": "https://unsplash.com",
    "DRV-005": "https://unsplash.com"
  };

  // قائمة السائقين المتاحين الميدانيين لاستخدامها في منبثقة التعديل
  const availableDrivers = [
    { id: "DRV-001", name: "أحمد محمود" },
    { id: "DRV-002", name: "خالد ناصر" },
    { id: "DRV-003", name: "محمد علي" },
    { id: "DRV-004", name: "يوسف سامي" },
    { id: "DRV-005", name: "سامي حسن" }
  ];
  // حالات النوافذ المنبثقة
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);

  // دوال فتح النوافذ وتثبيت المسار المحدد
  const handleOpenDetails = (route) => {
    setSelectedRoute(route);
    setIsDetailsOpen(true);
    // تفعيل وظيفة العين لتحديث الخريطة واللوحة الجانبية في الصفحة الرئيسية كما بالصورة
    if (onSelectRoute) onSelectRoute(route);
  };

  const handleOpenEdit = (route) => {
    setSelectedRoute({ ...route });
    setIsEditOpen(true);
  };

  const handleSaveEditSubmit = (e) => {
    e.preventDefault();
    console.log("تمت تحديثات المسار الميداني يدويّاً:", selectedRoute);
    setIsEditOpen(false);
  };
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden text-right" style={{ direction: 'rtl' }}>
      <div className="overflow-x-auto">
        <table className="w-full text-right border-collapse">
          <thead>
            <tr className="bg-gray-50/70 border-b border-gray-100 text-gray-400 text-sm font-bold tracking-wide select-none">
              <th className="py-4 px-6 text-center w-16">#</th>
              <th className="py-4 px-6">اسم المسار</th>
              <th className="py-4 px-6">السائق</th>
              <th className="py-4 px-6 text-center">الحالة</th>
              <th className="py-4 px-6 text-center">عدد الحاويات</th>
              <th className="py-4 px-6 text-center">المسافة</th>
              <th className="py-4 px-6 text-center">الوقت المتوقع</th>
              <th className="py-4 px-6 text-center w-28">التقدم</th>
              <th className="py-4 px-6 text-center w-28">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-50 text-gray-700 font-medium">
            {routes.map((route, index) => (
              <tr key={route.id} className="hover:bg-gray-50/40 transition-colors duration-200 group">
                <td className="py-4 px-6 text-center font-bold text-gray-400 text-base">{index + 1}</td>
                <td className="py-4 px-6">
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-900 group-hover:text-emerald-700 transition-colors duration-150 text-[15px]">{route.routeName}</span>
                    <span className="text-xs text-gray-400 font-normal mt-0.5">{route.desc}</span>
                  </div>
                </td>
                
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2.5">
                    <img 
                      src={driverAvatars[route.driverId] || "https://unsplash.com"} 
                      alt={route.driverName}
                      className="w-9 h-9 rounded-full object-cover ring-2 ring-gray-100 shadow-sm flex-shrink-0"
                    />
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-800 text-[14px]">{route.driverName}</span>
                      <span className="text-[11px] text-gray-400 font-mono font-normal">{route.driverId}</span>
                    </div>
                  </div>
                </td>

                <td className="py-4 px-6 text-center">
                  <span className={`px-2.5 py-1 rounded-xl font-bold text-xs inline-flex items-center gap-1.5 border ${route.fontColor}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${route.status === "مكتمل" ? "bg-emerald-500" : route.status === "قيد التنفيذ" ? "bg-blue-500 animate-pulse" : "bg-gray-400"}`}></span>
                    {route.status}
                  </span>
                </td>

                <td className="py-4 px-6 text-center font-bold text-gray-800 font-mono text-base">{route.binsCount}</td>
                <td className="py-4 px-6 text-center text-gray-700 font-bold font-mono text-base">{route.distance}</td>
                <td className="py-4 px-6 text-center text-gray-500 font-semibold">{route.estTime}</td>

                {/* مؤشر التقدم المستدير */}
                <td className="py-4 px-6 text-center">
                  <div className="inline-flex items-center justify-center relative w-10 h-10 rounded-full border-4 border-gray-100 font-mono text-[11px] font-black text-gray-700">
                    {route.progress}%
                    {route.progress > 0 && <div className={`absolute inset-0 rounded-full border-4 border-transparent border-t-emerald-500 ${route.progress >= 75 ? "border-r-emerald-500 border-l-emerald-500" : route.progress >= 50 ? "border-r-emerald-500" : ""}`}></div>}
                  </div>
                </td>

                {/* أزرار الإجراءات التفاعلية المربوطة بالـ Modals */}
                <td className="py-4 px-6 text-center">
                  <div className="flex items-center justify-center gap-1 opacity-90">
                    <button type="button" onClick={() => handleOpenDetails(route)} className="p-2 rounded-xl text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 active:scale-90 transition-all duration-150 cursor-pointer" title="عرض الحاويات والتفاصيل"><FaEye className="text-sm" /></button>
                    <button type="button" onClick={() => handleOpenEdit(route)} className="p-2 rounded-xl text-gray-400 hover:text-blue-600 hover:bg-blue-50 active:scale-90 transition-all duration-150 cursor-pointer" title="تعديل السائق والمهام"><FaEdit className="text-sm" /></button>
                    <button type="button" className="p-2 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 active:scale-90 transition-all duration-150 cursor-pointer" title="حذف المسار"><FaTrash className="text-sm" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* شريط التنقل الرقمي المطور */}
      <div className="p-4 bg-gray-50/60 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm text-gray-400 font-bold">
        <div>عرض <span className="text-gray-700 font-black">1</span> إلى <span className="text-gray-700 font-black">6</span> من أصل <span className="text-gray-700 font-black">18</span> مسار ميداني</div>
        <div className="flex items-center gap-1" dir="ltr">
          <button type="button" className="px-2.5 py-1.5 rounded-lg bg-white border border-gray-200 text-gray-400 hover:bg-gray-50 active:scale-95 transition-all">&lt;</button>
          <button type="button" className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-black shadow-xs">1</button>
          <button type="button" className="px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 active:scale-95 transition-all">2</button>
          <button type="button" className="px-2.5 py-1.5 rounded-lg bg-white border border-gray-200 text-gray-400 hover:bg-gray-50 active:scale-95 transition-all">&gt;</button>
        </div>
      </div>
      {/* 👁️ شاشة عرض تقرير تفاصيل المسار الشاملة المنبثقة */}
      {isDetailsOpen && selectedRoute && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative border border-gray-100 flex flex-col space-y-4 max-h-[85vh] overflow-y-auto">
            
            <button type="button" onClick={() => setIsDetailsOpen(false)} className="absolute top-5 left-5 p-2 rounded-xl text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors cursor-pointer">
              <FaTimes className="text-base" />
            </button>
            
            <div className="flex items-center gap-2.5 border-b border-gray-100 pb-3">
              <div className="bg-emerald-50 p-2.5 rounded-xl text-emerald-600 flex items-center justify-center">
                <FaRoute className="text-base" />
              </div>
              <div>
                <h3 className="text-sm font-black text-gray-800">{selectedRoute.routeName}</h3>
                <p className="text-[11px] text-gray-400 mt-0.5">البيانات الجغرافية والتنفيذية لخط السير الحالي</p>
              </div>
            </div>

            {/* شبكة معلومات سريعة */}
            <div className="grid grid-cols-2 gap-3 text-right">
              <div className="bg-gray-50/70 p-3 rounded-xl border border-gray-100/60">
                <span className="text-[10px] text-gray-400 font-bold block">🚚 السائق المسؤول</span>
                <span className="text-xs font-black text-gray-700">{selectedRoute.driverName}</span>
              </div>
              <div className="bg-gray-50/70 p-3 rounded-xl border border-gray-100/60">
                <span className="text-[10px] text-gray-400 font-bold block">🗑️ عدد الحاويات المجدولة</span>
                <span className="text-xs font-black text-emerald-700 font-mono">{selectedRoute.binsCount} حاوية ذكية</span>
              </div>
              <div className="bg-gray-50/70 p-3 rounded-xl border border-gray-100/60">
                <span className="text-[10px] text-gray-400 font-bold block">🛣️ إجمالي المسافة المقطوعة</span>
                <span className="text-xs font-black text-blue-700 font-mono">{selectedRoute.distance}</span>
              </div>
              <div className="bg-gray-50/70 p-3 rounded-xl border border-gray-100/60">
                <span className="text-[10px] text-gray-400 font-bold block">⏱️ الوقت التقديري المتوقع</span>
                <span className="text-xs font-black text-amber-700 font-mono">{selectedRoute.estTime}</span>
              </div>
            </div>

            {/* نقاط توقف تفصيلية */}
            <div className="space-y-2 text-right">
              <h4 className="text-xs font-black text-gray-500 flex items-center gap-1.5"><FaMapMarkerAlt className="text-red-500" /> تسلسل محطات النطاق الميداني</h4>
              <div className="border-r-2 border-emerald-100 mr-2 pr-3 space-y-3 py-1 text-xs">
                <div className="relative"><span className="absolute -right-[19px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-600 ring-4 ring-emerald-50"></span><p className="font-bold text-gray-700">نقطة الانطلاق: مقر الشركة الرئيسي</p></div>
                <div className="relative"><span className="absolute -right-[19px] top-1 w-2.5 h-2.5 rounded-full bg-amber-500"></span><p className="font-bold text-gray-600">المحطة 1: تفريغ حاويات قطاع {selectedRoute.desc}</p></div>
                <div className="relative"><span className="absolute -right-[19px] top-1 w-2.5 h-2.5 rounded-full bg-blue-500"></span><p className="font-bold text-gray-600">نقطة النهاية: مركز المعالجة وتدوير النفايات</p></div>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100 flex justify-end">
              <button type="button" onClick={() => setIsDetailsOpen(false)} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-xl py-2 text-xs font-bold active:scale-95 transition-all cursor-pointer">إغلاق لوحة التفاصيل</button>
            </div>
          </div>
        </div>
      )}
      {/* 🔮 شاشة تعديل بيانات وتعيينات المسار المنبثقة */}
      {isEditOpen && selectedRoute && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative border border-gray-100 flex flex-col space-y-4 max-h-[85vh] overflow-y-auto" style={{ direction: 'rtl' }}>
            
            <button type="button" onClick={() => setIsEditOpen(false)} className="absolute top-5 left-5 p-2 rounded-xl text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors cursor-pointer">
              <FaTimes className="text-base" />
            </button>
            
            <div className="flex items-center gap-2.5 border-b border-gray-100 pb-2">
              <div className="bg-emerald-50 p-2.5 rounded-xl text-emerald-600 flex items-center justify-center">
                <FaEdit className="text-base" />
              </div>
              <div className="text-right">
                <h3 className="text-sm font-black text-gray-800">تعديل وتحديث مسار التكليف</h3>
                <p className="text-[11px] text-gray-400 mt-0.5">تغيير السائق المسؤول وتعديل معطيات خط السير</p>
              </div>
            </div>

            <form onSubmit={handleSaveEditSubmit} className="space-y-4 text-right">
              
              {/* تعديل اسم المسار */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 flex items-center gap-1.5"><FaRoute className="text-[10px] text-emerald-600" /> اسم المسار الميداني</label>
                <input 
                  type="text" 
                  value={selectedRoute.routeName} 
                  onChange={(e) => setSelectedRoute({ ...selectedRoute, routeName: e.target.value })} 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-bold text-gray-700 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 focus:bg-white transition-all shadow-2xs" 
                  required 
                />
              </div>

              {/* تعديل السائق وتكليفه بالمسار */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 flex items-center gap-1.5"><FaUser className="text-[10px] text-emerald-600" /> إعادة تكليف السائق المسؤول</label>
                <select 
                  value={selectedRoute.driverId} 
                  onChange={(e) => {
                    const selected = availableDrivers.find(d => d.id === e.target.value);
                    setSelectedRoute({ ...selectedRoute, driverId: e.target.value, driverName: selected.name });
                  }} 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-bold text-gray-700 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 focus:bg-white transition-all cursor-pointer shadow-2xs"
                >
                  {availableDrivers.map(driver => (
                    <option key={driver.id} value={driver.id}>{driver.name} ({driver.id})</option>
                  ))}
                </select>
              </div>

              {/* حقول المسافة والعدد */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-gray-500 font-bold">المسافة المستهدفة</label>
                  <input type="text" value={selectedRoute.distance} onChange={(e) => setSelectedRoute({ ...selectedRoute, distance: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-gray-700 focus:outline-none font-mono" required />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-gray-500 font-bold">عدد الحاويات الكلي</label>
                  <input type="number" value={selectedRoute.binsCount} onChange={(e) => setSelectedRoute({ ...selectedRoute, binsCount: parseInt(e.target.value) })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-gray-700 focus:outline-none font-mono" required />
                </div>
              </div>

              {/* أزرار الحفظ والإلغاء منسقة تيلويند */}
              <div className="flex items-center gap-3 pt-2 border-t border-gray-100 mt-4">
                <button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl py-2.5 text-xs font-black flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.98] transition-all cursor-pointer">
                  <FaSave /> حفظ التغييرات الحالية
                </button>
                <button type="button" onClick={() => setIsEditOpen(false)} className="bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-xl px-4 py-2.5 text-xs font-bold active:scale-[0.98] transition-all cursor-pointer">
                  إلغاء
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
