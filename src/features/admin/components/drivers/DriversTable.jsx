import { useState } from 'react';
import { 
  FaEdit, FaTrash, FaEye, FaTimes, FaSave, FaUser, FaPhone, 
  FaMapMarkerAlt, FaToggleOn, FaTruck, FaFileAlt, FaClock, 
  FaStar, FaHistory, FaClipboardList, FaIdCard, FaBrain, 
  FaRoute, FaBuilding 
} from "react-icons/fa";

export default function DriversTable({ onUpdateStatus }) {
  // 💡 بيانات وهمية مؤقتة لمشاهدة كيفية ظهور السائقين قيد الانتظار في الجدول
  const demoDrivers = [
    {
      id: "1",
      idCode: "DVR-001",
      name: "أحمد محمود أحمد",
      phone: "970+ 59 123 4567",
      region: "رام الله",
      status: "متاح",
      tasks: 45,
      date: "2024-01-10",
      rating: "4.9",
      truckNo: "TRK-001",
      truckType: "ضاغطة نفايات ذكية",
      licenseNo: "5463210",
      licenseType: "درجة أولى ثقيل",
      idCardUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      driverLicenseUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
    },
    {
      id: "2",
      idCode: "DVR-002",
      name: "خالد ناصر خالد",
      phone: "970+ 59 234 5678",
      region: "البيرة",
      status: "قيد الانتظار", // 📌 سيظهر في تبويب قيد الانتظار فوراً
      tasks: 0,
      date: "2024-01-15",
      rating: "0.0",
      truckNo: "غير محدد",
      truckType: "لم تعين بعد",
      licenseNo: "8877665",
      licenseType: "قيادة مركبات شحن",
      idCardUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop", 
      driverLicenseUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" 
    },
    {
      id: "3",
      idCode: "DVR-003",
      name: "محمد محمد علي",
      phone: "970+ 59 345 6789",
      region: "رام الله",
      status: "في مهمة",
      tasks: 28,
      date: "2024-01-28",
      rating: "4.5",
      truckNo: "TRK-002",
      truckType: "شاحنة نقل عادية",
      licenseNo: "4455221",
      licenseType: "عمومي درجة ب",
      idCardUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      driverLicenseUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
    },
    {
      id: "4",
      idCode: "DVR-004",
      name: "يوسف سامي يوسف",
      phone: "970+ 59 456 7890",
      region: "القدس",
      status: "قيد الانتظار", // 📌 السائق الوهمي الثاني المعلق لمشاهدة البيانات
      tasks: 0,
      date: "2024-02-01",
      rating: "0.0",
      truckNo: "غير محدد",
      truckType: "لم تعين بعد",
      licenseNo: "9988776",
      licenseType: "ثقيل مقطورات",
      idCardUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      driverLicenseUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
    }
  ];

  const driverAvatars = {
    "DVR-001": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    "DVR-002": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    "DVR-003": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    "DVR-004": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
  };

  const availableTasks = [
    { id: "TASK-101", title: "تفريغ حاوية الكرتون الذكية BIN-003 (ممتلئة 95%) - العزيزية" },
    { id: "TASK-102", title: "جمع النفايات البلاستيكية لطلب رقم #1258 - الشهباء" }
  ];
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [selectedTasks, setSelectedTasks] = useState([]);

  // ربط المصفوفة بالبيانات الوهمية المحدثة لمشاهدتها فوراً
  const [localDrivers, setLocalDrivers] = useState(demoDrivers);
  const [startPointType, setStartPointType] = useState("company"); 
  const [customLocationName, setCustomLocationName] = useState("");

  // الفلترة الافتراضية تقف على "قيد الانتظار" لتعرض السائقين الجدد
  const [activeTab, setActiveTab] = useState('قيد الانتظار');

  const prepareSelectedDriver = (driver) => {
    return {
      ...driver,
      licenseNo: driver.licenseNo || "0123456789",
      licenseType: driver.licenseType || "قيادة مركبات ثقيلة",
      licenseIssue: driver.licenseIssue || "2020-01-15", 
      licenseExpiry: driver.licenseExpiry || "2026-01-15", 
      truckNo: driver.truckNo || "TRK-007",
      truckType: driver.truckType || "ضاغطة نفايات",
      workHours: driver.workHours || "120 ساعة",
      rating: driver.rating || "4.8"
    };
  };

  const handleEditClick = (driver) => { setSelectedDriver(prepareSelectedDriver(driver)); setIsEditModalOpen(true); };
  const handleDetailsClick = (driver) => { setSelectedDriver(prepareSelectedDriver(driver)); setIsDetailsModalOpen(true); };
  const handleAssignClick = (driver) => { 
    setSelectedDriver(prepareSelectedDriver(driver)); 
    setSelectedTasks([]); 
    setStartPointType("company"); 
    setCustomLocationName("");
    setIsAssignModalOpen(true); 
  };

  const handleToggleTask = (taskId) => {
    if (selectedTasks.includes(taskId)) {
      setSelectedTasks(selectedTasks.filter(id => id !== taskId));
    } else {
      setSelectedTasks([...selectedTasks, taskId]);
    }
  };

  const handleSaveChanges = (e) => { 
    e.preventDefault(); 
    setLocalDrivers(localDrivers.map(d => d.id === selectedDriver.id ? selectedDriver : d));
    setIsEditModalOpen(false); 
  };
  
  // دالة تحديث الحالة محلياً لنقل السائق المقبول لقائمة المتاحين فوراً بالواجهة
  const handleLocalUpdateStatus = (driverId, newStatus) => {
    setLocalDrivers(localDrivers.map(driver => 
      driver.id === driverId ? { ...driver, status: newStatus === 'approved' ? 'متاح' : 'غير نشط' } : driver
    ));
    if(onUpdateStatus) onUpdateStatus(driverId, newStatus);
  };

  const handleAssignTaskSubmit = (e) => { 
    e.preventDefault(); 
    setIsAssignModalOpen(false); 
  };

  // فلترة المصفوفة بناءً على التبويب المحدد
  const filteredDrivers = localDrivers.filter(driver => {
    if (activeTab === 'all') return true;
    return driver.status === activeTab;
  });
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden text-right p-6" style={{ direction: 'rtl' }}>
      
      {/* 📋 علامات التبويب المفلترة برمجياً */}
      <div className="flex gap-2 mb-6 border-b border-gray-100 pb-2">
        <button 
          onClick={() => setActiveTab('قيد الانتظار')} 
          className={`pb-3 px-4 font-bold text-sm transition-all duration-200 border-b-2 ${activeTab === 'قيد الانتظار' ? 'border-emerald-600 text-emerald-700 font-black' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
        >
          سائقين قيد الانتظار
        </button>
        <button 
          onClick={() => setActiveTab('متاح')} 
          className={`pb-3 px-4 font-bold text-sm transition-all duration-200 border-b-2 ${activeTab === 'متاح' ? 'border-b-2 border-emerald-600 text-emerald-700 font-black' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
        >
          المتاحين
        </button>
        <button 
          onClick={() => setActiveTab('في مهمة')} 
          className={`pb-3 px-4 font-bold text-sm transition-all duration-200 border-b-2 ${activeTab === 'في مهمة' ? 'border-b-2 border-emerald-600 text-emerald-700 font-black' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
        >
          في مهمة
        </button>
        <button 
          onClick={() => setActiveTab('all')} 
          className={`pb-3 px-4 font-bold text-sm transition-all duration-200 border-b-2 ${activeTab === 'all' ? 'border-b-2 border-emerald-600 text-emerald-700 font-black' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
        >
          جميع السائقين
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-right border-collapse">
          <thead>
            <tr className="bg-gray-50/70 border-b border-gray-100 text-gray-400 text-sm font-bold tracking-wide select-none">
              <th className="py-4 px-6 text-center w-16">#</th>
              <th className="py-4 px-6">السائق</th>
              <th className="py-4 px-6">رقم الهاتف</th>
              <th className="py-4 px-6">المنطقة</th>
              <th className="py-4 px-6 text-center">الوثائق الرسمية</th>
              <th className="py-4 px-6 text-center">الحالة</th>
              <th className="py-4 px-6 text-center">المهام المنجزة</th>
              <th className="py-4 px-6 text-center">تاريخ الانضمام</th>
              <th className="py-4 px-6 text-center w-48">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-50 text-gray-700 font-medium">
            {filteredDrivers.length === 0 ? (
              <tr>
                <td colSpan="9" className="py-8 text-center text-gray-400 text-base font-bold">لا يوجد سائقين في هذا القسم حالياً</td>
              </tr>
            ) : (
              filteredDrivers.map((driver, index) => (
                <tr key={driver.id} className="hover:bg-gray-50/40 transition-colors duration-200 group">
                  <td className="py-4 px-6 text-center font-bold text-gray-400 text-base">{index + 1}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img src={driverAvatars[driver.idCode] || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"} alt={driver.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100 shadow-sm" />
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900 group-hover:text-emerald-700 transition-colors duration-150 text-[15px]">{driver.name}</span>
                        <span className="text-xs text-gray-400 font-mono mt-0.5">{driver.idCode}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-500 font-mono ltr text-right text-base">{driver.phone}</td>
                  <td className="py-4 px-6 text-gray-700 text-base font-semibold">{driver.region}</td>
                  
                  {/* عمود الوثائق المرفوعة للمراجعة والتحقق */}
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <a 
                        href={driver.idCardUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-600 px-2.5 py-1.5 rounded-xl border border-blue-100 hover:bg-blue-100/70 transition-all font-bold shadow-2xs"
                      >
                        <FaIdCard className="text-xs" /> الهوية
                      </a>
                      <a 
                        href={driver.driverLicenseUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="inline-flex items-center gap-1 text-xs bg-indigo-50 text-indigo-600 px-2.5 py-1.5 rounded-xl border border-indigo-100 hover:bg-indigo-100/70 transition-all font-bold shadow-2xs"
                      >
                        <FaFileAlt className="text-xs" /> الرخصة
                      </a>
                    </div>
                  </td>

                  <td className="py-4 px-6 text-center">
                    <span className={`px-3 py-1.5 rounded-xl font-bold text-xs inline-flex items-center gap-1.5 shadow-sm border ${driver.status === "متاح" ? "bg-emerald-50 text-emerald-700 border-emerald-100/50" : driver.status === "في مهمة" ? "bg-amber-50 text-amber-700 border-amber-100/50" : "bg-amber-50 text-amber-600 border-amber-200"}`}>
                      <span className={`w-2 h-2 rounded-full ${driver.status === "متاح" ? "bg-emerald-500 animate-pulse" : driver.status === "في مهمة" ? "bg-amber-500" : "bg-amber-400 animate-bounce"}`}></span>
                      {driver.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center font-black text-gray-800 text-base font-mono">{driver.tasks}</td>
                  <td className="py-4 px-6 text-center text-gray-400 font-mono text-[13px]">{driver.date}</td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-1 opacity-90">
                      {driver.status === 'قيد الانتظار' ? (
                        /* أزرار اتخاذ القرار الفورية للآدمن */
                        <div className="flex gap-1.5">
                          <button 
                            type="button"
                            onClick={() => handleLocalUpdateStatus(driver.id, 'approved')}
                            className="bg-emerald-600 text-white px-3 py-1.5 rounded-xl font-bold text-xs hover:bg-emerald-700 active:scale-95 transition-all cursor-pointer shadow-sm"
                          >
                            قبول
                          </button>
                          <button 
                            type="button"
                            onClick={() => handleLocalUpdateStatus(driver.id, 'rejected')}
                            className="bg-red-50 text-red-600 border border-red-100 px-3 py-1.5 rounded-xl font-bold text-xs hover:bg-red-100 active:scale-95 transition-all cursor-pointer"
                          >
                            refuse
                          </button>
                        </div>
                      ) : (
                        <>
                          <button type="button" onClick={() => handleAssignClick(driver)} className="p-2 rounded-xl text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 active:scale-90 transition-all duration-150 cursor-pointer" title="مسار AI الذكي"><FaClipboardList className="text-sm" /></button>
                          <button type="button" onClick={() => handleDetailsClick(driver)} className="p-2 rounded-xl text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 active:scale-90 transition-all duration-150 cursor-pointer" title="تفاصيل"><FaEye className="text-sm" /></button>
                          <button type="button" onClick={() => handleEditClick(driver)} className="p-2 rounded-xl text-gray-400 hover:text-blue-600 hover:bg-blue-50 active:scale-90 transition-all duration-150 cursor-pointer" title="تعديل"><FaEdit className="text-sm" /></button>
                          <button type="button" className="p-2 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 active:scale-90 transition-all duration-150 cursor-pointer" title="حذف"><FaTrash className="text-sm" /></button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* 📋 شاشة تخطيط وتحديد المسار المتعدد الموحدة بالذكاء الاصطناعي */}
      {isAssignModalOpen && selectedDriver && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative border border-gray-100 flex flex-col space-y-4 max-h-[92vh] overflow-y-auto">
            <button type="button" onClick={() => setIsAssignModalOpen(false)} className="absolute top-5 left-5 p-2 rounded-xl text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors cursor-pointer"><FaTimes className="text-base" /></button>
            
            <div className="flex items-center gap-2.5 border-b border-gray-50 pb-2">
              <div className="bg-emerald-50 p-2.5 rounded-xl text-emerald-600">
                <FaBrain className="text-base animate-pulse" />
              </div>
              <div className="text-right">
                <h3 className="text-sm font-black text-gray-800">تخطيط المسار الميداني بالذكاء الاصطناعي</h3>
                <p className="text-[11px] text-gray-400 mt-0.5">حدد نقطة الانطلاق والمهام لحساب المسار الأمثل</p>
              </div>
            </div>

            <div className="space-y-2.5 bg-gray-50/60 p-4 rounded-2xl border border-gray-100 text-right">
              <label className="text-xs font-black text-gray-700 block mb-1">📍 تحديد نقطة انطلاق المسار:</label>
              <div className="grid grid-cols-2 gap-3">
                <label className={`flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition-all bg-white select-none ${startPointType === "company" ? "border-emerald-500 bg-emerald-50/20 text-emerald-800 font-bold" : "border-gray-100 text-gray-500"}`}>
                  <input type="radio" name="startPoint" value="company" checked={startPointType === "company"} onChange={() => setStartPointType("company")} className="accent-emerald-600 cursor-pointer" />
                  <span className="text-xs flex items-center gap-1.5 w-full justify-end pr-2">مقر الشركة الرئيسي <FaBuilding className="text-[11px]" /></span>
                </label>
                <label className={`flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition-all bg-white select-none ${startPointType === "custom" ? "border-emerald-500 bg-emerald-50/20 text-emerald-800 font-bold" : "border-gray-100 text-gray-500"}`}>
                  <input type="radio" name="startPoint" value="custom" checked={startPointType === "custom"} onChange={() => setStartPointType("custom")} className="accent-emerald-600 cursor-pointer" />
                  <span className="text-xs flex items-center gap-1.5 w-full justify-end pr-2">موقع آخر مخصص <FaMapMarkerAlt className="text-[11px]" /></span>
                </label>
              </div>

              {startPointType === "custom" && (
                <div className="mt-2.5 space-y-2 animate-fadeIn duration-200">
                  <input 
                    type="text" 
                    placeholder="اكتب اسم نقطة الانطلاق المخصصة..." 
                    value={customLocationName}
                    onChange={(e) => setCustomLocationName(e.target.value)}
                    className="w-full text-right text-xs p-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 font-semibold"
                  />
                  <div className="w-full h-28 bg-slate-100 rounded-xl border border-gray-200 relative overflow-hidden flex items-center justify-center cursor-crosshair">
                    <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:10px_10px] opacity-60"></div>
                    <span className="text-[10px] text-gray-400 bg-white/90 px-3 py-1.5 rounded-lg border border-gray-200 font-bold shadow-2xs absolute">🎯 انقر على الخريطة لتحديد الإحداثيات بدقة</span>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleAssignTaskSubmit} className="space-y-4">
              <div className="space-y-2 text-right">
                <label className="text-xs font-bold text-gray-500 block mb-1">حدد الحاويات والطلبات المتاحة بـ ({selectedDriver.region}):</label>
                <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1">
                  {availableTasks.map((task) => {
                    const isChecked = selectedTasks.includes(task.id);
                    return (
                      <div 
                        key={task.id} 
                        onClick={() => handleToggleTask(task.id)}
                        className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer select-none transition-all ${isChecked ? "bg-emerald-50/60 border-emerald-200 shadow-xs" : "bg-white border-gray-100 hover:bg-gray-50/50"}`}
                      >
                        <input type="checkbox" checked={isChecked} onChange={() => {}} className="rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer accent-emerald-600 w-4 h-4" />
                        <span className={`text-xs font-bold leading-relaxed ${isChecked ? "text-emerald-900" : "text-gray-600"}`}>{task.title}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {selectedTasks.length > 0 && (
                <div className="bg-emerald-600 text-white p-3 rounded-xl flex items-center gap-2 text-xs font-bold shadow-md text-right shadow-emerald-600/10">
                  <FaRoute className="text-sm animate-bounce" />
                  <span>انطلاقاً من ({startPointType === "company" ? "مقر الشركة" : customLocationName || "موقع مخصص"}). جاري حساب خط السير الميداني.</span>
                </div>
              )}

              <div className="flex items-center gap-3 pt-2 border-t border-gray-100 mt-3">
                <button type="submit" disabled={selectedTasks.length === 0} className={`flex-1 rounded-xl py-2.5 text-xs font-black flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer ${selectedTasks.length === 0 ? "bg-gray-100 text-gray-400 shadow-none cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-700 text-white"}`}><FaBrain /> معالجة وإرسال المسار الذكي</button>
                <button type="button" onClick={() => setIsAssignModalOpen(false)} className="bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-xl px-4 py-2.5 text-xs font-bold active:scale-95 transition-all cursor-pointer">إلغاء</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* 👁️ شاشة عرض ملف تفاصيل السائق الكامل */}
      {isDetailsModalOpen && selectedDriver && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative border border-gray-100 flex flex-col space-y-5 max-h-[90vh] overflow-y-auto" style={{ direction: 'rtl' }}>
            <button type="button" onClick={() => setIsDetailsModalOpen(false)} className="absolute top-5 left-5 p-2 rounded-xl text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors cursor-pointer"><FaTimes className="text-base" /></button>
            
            <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
              <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600"><FaEye className="text-lg" /></div>
              <div className="text-right">
                <h3 className="text-sm font-black text-gray-800">الملف المهني الشامل للموظف</h3>
                <p className="text-[11px] text-gray-400 mt-0.5">تقارير أداء السائق الفنية ونشاطه الميداني المعتمد</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100 text-right">
              <img src={driverAvatars[selectedDriver.idCode] || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"} alt={selectedDriver.name} className="w-14 h-14 rounded-full object-cover ring-2 ring-white shadow" />
              <div className="flex-1">
                <h4 className="text-base font-black text-gray-900">{selectedDriver.name}</h4>
                <div className="flex items-center gap-4 text-xs font-bold text-gray-400 mt-1">
                  <span>كود المعرف: <span className="font-mono text-gray-600 bg-gray-200/60 px-1.5 py-0.5 rounded">{selectedDriver.idCode}</span></span>
                  <span className="flex items-center gap-1"><FaStar className="text-amber-400 fill-amber-400 text-[11px]" /> {selectedDriver.rating} تقييم الأداء</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-right">
              <div className="border border-gray-100 p-3 rounded-xl bg-white space-y-1 shadow-2xs">
                <span className="text-[11px] font-bold text-gray-400 flex items-center gap-1.5"><FaTruck className="text-emerald-500" /> معلومات المركبة والشاحنة</span>
                <p className="text-xs font-black text-gray-700">{selectedDriver.truckType} ({selectedDriver.truckNo})</p>
              </div>
              <div className="border border-gray-100 p-3 rounded-xl bg-white space-y-1 shadow-2xs">
                <span className="text-[11px] font-bold text-gray-400 flex items-center gap-1.5"><FaFileAlt className="text-blue-500" /> نوع ورقم الرخصة الفنية</span>
                <p className="text-xs font-black text-gray-700">{selectedDriver.licenseType} - {selectedDriver.licenseNo}</p>
              </div>
              <div className="border border-gray-100 p-3 rounded-xl bg-white space-y-1 shadow-2xs">
                <span className="text-[11px] font-bold text-gray-400 flex items-center gap-1.5"><FaClock className="text-amber-500" /> ساعات العمل الكلية</span>
                <p className="text-xs font-black  font-mono text-amber-600">{selectedDriver.workHours}</p>
              </div>
              <div className="border border-gray-100 p-3 rounded-xl bg-white space-y-1 shadow-2xs">
                <span className="text-[11px] font-bold text-gray-400 flex items-center gap-1.5"><FaMapMarkerAlt className="text-red-500" /> المنطقة الحالية</span>
                <p className="text-xs font-black text-gray-700">{selectedDriver.region}</p>
              </div>
            </div>

            <div className="space-y-3 text-right">
              <h5 className="text-xs font-black text-gray-500 flex items-center gap-1.5"><FaHistory className="text-[11px]" /> آخر المهام المنجزة بالميدان</h5>
              <div className="space-y-2 text-xs font-bold">
                <div className="flex justify-between items-center bg-gray-50/50 p-2.5 rounded-xl border border-gray-100"><span className="text-gray-600">تفريغ حاوية الكرتون من العزيزية</span><span className="text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-lg text-[10px]">مكتملة بنجاح</span></div>
                <div className="flex justify-between items-center bg-gray-50/50 p-2.5 rounded-xl border border-gray-100"><span className="text-gray-600">تفريغ الحاوية BIN-003 من الموكامبو</span><span className="text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-lg text-[10px]">مكتملة بنجاح</span></div>
              </div>
            </div>
            <div className="pt-2 border-t border-gray-100 flex justify-end">
              <button type="button" onClick={() => setIsDetailsModalOpen(false)} className="bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-xl px-5 py-2 text-xs font-bold active:scale-95 transition-all cursor-pointer shadow-2xs">إغلاق التقرير</button>
            </div>
          </div>
        </div>
      )}
      {/* 🔮 شاشة تعديل معلومات السائق الكاملة */}
      {isEditModalOpen && selectedDriver && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative border border-gray-100 flex flex-col space-y-4 max-h-[92vh] overflow-y-auto" style={{ direction: 'rtl' }}>
            <button type="button" onClick={() => setIsEditModalOpen(false)} className="absolute top-5 left-5 p-2 rounded-xl text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors cursor-pointer"><FaTimes className="text-base" /></button>
            
            <div className="flex items-center gap-2.5 border-b border-gray-100 pb-2">
              <div className="bg-emerald-50 p-2.5 rounded-xl text-emerald-600"><FaEdit className="text-base" /></div>
              <div className="text-right">
                <h3 className="text-sm font-black text-gray-800">تعديل معلومات السائق الكاملة</h3>
                <p className="text-[11px] text-gray-400 mt-0.5">تحديث الملف الميداني، ساعات العمل، وثائق الرخصة والمركبة الحالية</p>
              </div>
            </div>
            
            <form onSubmit={handleSaveChanges} className="space-y-4 text-right">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 flex items-center gap-1.5"><FaUser className="text-[10px]" /> اسم السائق</label>
                  <input type="text" value={selectedDriver.name} onChange={(e) => { setSelectedDriver({ ...selectedDriver, name: e.target.value }); }} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-gray-700 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 focus:bg-white transition-all shadow-2xs" required />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 flex items-center gap-1.5"><FaPhone className="text-[10px]" /> رقم الهاتف</label>
                  <input type="text" value={selectedDriver.phone} onChange={(e) => { setSelectedDriver({ ...selectedDriver, phone: e.target.value }); }} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-gray-700 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 focus:bg-white transition-all font-mono text-left shadow-2xs" dir="ltr" required />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1 col-span-1">
                  <label className="text-xs font-bold text-gray-500 flex items-center gap-1.5"><FaMapMarkerAlt className="text-[10px]" /> النطاق الميداني</label>
                  <input type="text" value={selectedDriver.region} onChange={(e) => { setSelectedDriver({ ...selectedDriver, region: e.target.value }); }} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-gray-700 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 focus:bg-white transition-all shadow-2xs" required />
                </div>
                <div className="space-y-1 col-span-1">
                  <label className="text-xs font-bold text-gray-500 flex items-center gap-1.5"><FaToggleOn className="text-[10px]" /> حالة الميدان</label>
                  <select value={selectedDriver.status} onChange={(e) => { setSelectedDriver({ ...selectedDriver, status: e.target.value }); }} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-gray-700 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 focus:bg-white transition-all cursor-pointer shadow-2xs">
                    <option value="متاح">متاح</option>
                    <option value="قيد الانتظار">قيد الانتظار</option>
                    <option value="في مهمة">في مهمة</option>
                    <option value="غير نشط">غير نشط</option>
                  </select>
                </div>
                <div className="space-y-1 col-span-1">
                  <label className="text-xs font-bold text-gray-500 flex items-center gap-1.5"><FaClock className="text-[10px]" /> ساعات العمل</label>
                  <input type="text" value={selectedDriver.workHours} onChange={(e) => { setSelectedDriver({ ...selectedDriver, workHours: e.target.value }); }} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-gray-700 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 focus:bg-white transition-all font-mono shadow-2xs" required />
                </div>
              </div>

              <div className="border-t border-gray-100 pt-3">
                <h4 className="text-[11px] font-black text-emerald-700 mb-2 flex items-center gap-1"><FaIdCard /> وثيقة رخصة القيادة الشاملة</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400 font-bold">رقم الرخصة</label>
                    <input type="text" value={selectedDriver.licenseNo} onChange={(e) => { setSelectedDriver({ ...selectedDriver, licenseNo: e.target.value }); }} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-gray-700 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 focus:bg-white transition-all font-mono shadow-2xs" required />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400 font-bold">نوع رخصة القيادة</label>
                    <input type="text" value={selectedDriver.licenseType} onChange={(e) => { setSelectedDriver({ ...selectedDriver, licenseType: e.target.value }); }} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-gray-700 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 focus:bg-white transition-all shadow-2xs" required />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400 font-bold">تاريخ إصدار الرخصة</label>
                    <input type="date" value={selectedDriver.licenseIssue} onChange={(e) => { setSelectedDriver({ ...selectedDriver, licenseIssue: e.target.value }); }} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-gray-700 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 focus:bg-white transition-all font-mono cursor-pointer shadow-2xs" required />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400 font-bold">تاريخ انتهاء الرخصة</label>
                    <input type="date" value={selectedDriver.licenseExpiry} onChange={(e) => { setSelectedDriver({ ...selectedDriver, licenseExpiry: e.target.value }); }} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-gray-700 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 focus:bg-white transition-all font-mono cursor-pointer shadow-2xs" required />
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-3">
                <h4 className="text-[11px] font-black text-emerald-700 mb-2 flex items-center gap-1"><FaTruck /> الشاحنة الميدانية المخصصة</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400 font-bold">رقم الشاحنة الكلي</label>
                    <input type="text" value={selectedDriver.truckNo} onChange={(e) => { setSelectedDriver({ ...selectedDriver, truckNo: e.target.value }); }} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-gray-700 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 focus:bg-white transition-all font-mono shadow-2xs" required />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400 font-bold">نوع المركبة والوظيفة</label>
                    <input type="text" value={selectedDriver.truckType} onChange={(e) => { setSelectedDriver({ ...selectedDriver, truckType: e.target.value }); }} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-gray-700 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 focus:bg-white transition-all shadow-2xs" required />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2 border-t border-gray-100 mt-4">
                <button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl py-2.5 text-xs font-black flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.98] transition-all cursor-pointer"><FaSave /> حفظ التغييرات الشاملة</button>
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-xl px-4 py-2.5 text-xs font-bold active:scale-[0.98] transition-all cursor-pointer">إلغاء</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
