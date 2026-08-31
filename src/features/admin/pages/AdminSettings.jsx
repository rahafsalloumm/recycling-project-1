import { useState } from "react";
import { FaSave, FaUser, FaLock, FaCoins, FaTrash, FaEye, FaEyeSlash } from "react-icons/fa";

export default function AdminSettings() {
  const [pointsRate, setPointsRate] = useState(100);
  const [adminName, setAdminName] = useState("المهندس المسؤول");
  const [adminEmail, setAdminEmail] = useState("admin.halab@gmail.com");

  // حالات منفصلة للتحكم بإظهار وإخفاء كلمات المرور لكل حقل
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  return (
    <div className="w-full space-y-6 text-right font-sans p-1 animate-fadeIn duration-300 relative" dir="rtl">
      
      {/* هيدر الصفحة المثبت في الأعلى */}
      <div className="sticky top-0 z-40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/95 backdrop-blur-md p-6 rounded-2xl border border-gray-100 shadow-[0_4px_12px_rgba(0,0,0,0.03)]">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-emerald-600 rounded-full block"></span>
            إعدادات النظام والأمان
          </h1>
          <p className="text-sm text-gray-400 mt-1.5 font-medium">التحكم في معايير المنظومة، حماية حساب الإدارة وتعديل الصلاحيات الكلية</p>
        </div>
        
        <button className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl text-sm font-bold shadow-md hover:bg-emerald-700 transition-all duration-300 cursor-pointer active:scale-98">
          <FaSave className="text-xs" /> 
          <span>حفظ التغييرات الكلية</span>
        </button>
      </div>

      {/* صندوق الإعدادات الموحد الفخم والمطور */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-8">
        
        {/* 1. قسم معلومات المدير */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-gray-800 flex items-center gap-2 border-b border-gray-100 pb-2">
            <FaUser className="text-emerald-600 text-sm" /> معلومات المدير الحالي
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500">اسم المدير</label>
              <input type="text" value={adminName} onChange={(e) => setAdminName(e.target.value)} className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-3 px-4 text-sm font-semibold text-gray-800 focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 transition-all duration-200" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500">البريد الإلكتروني</label>
              <input type="email" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-3 px-4 text-sm font-semibold text-gray-800 focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 transition-all duration-200 text-left font-mono" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500">رقم الهاتف</label>
              <input type="text" defaultValue="+963 912 345 678" className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-3 px-4 text-sm font-semibold text-gray-800 focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 transition-all duration-200 text-left font-mono" />
            </div>
          </div>
        </div>

        {/* 2. قسم الأمان وتغيير كلمة المرور المتفاعل بالأيقونات (العين الحية) */}
        <div className="space-y-4 pt-2">
          <h3 className="text-base font-bold text-gray-800 flex items-center gap-2 border-b border-gray-100 pb-2">
            <FaLock className="text-emerald-600 text-sm" /> الأمان وتغيير كلمة المرور
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* حقل كلمة المرور الحالية */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500">كلمة المرور الحالية</label>
              <div className="relative">
                <input 
                  type={showCurrentPass ? "text" : "password"} 
                  placeholder="••••••••" 
                  className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 transition-all duration-200 text-left font-mono tracking-wider" 
                />
                <button 
                  type="button"
                  onClick={() => setShowCurrentPass(!showCurrentPass)}
                  className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
                >
                  {showCurrentPass ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* حقل كلمة المرور الجديدة */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500">كلمة المرور الجديدة</label>
              <div className="relative">
                <input 
                  type={showNewPass ? "text" : "password"} 
                  placeholder="••••••••" 
                  className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 transition-all duration-200 text-left font-mono tracking-wider" 
                />
                <button 
                  type="button"
                  onClick={() => setShowNewPass(!showNewPass)}
                  className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
                >
                  {showNewPass ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* حقل تأكيد كلمة المرور الجديدة */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500">تأكيد كلمة المرور الجديدة</label>
              <div className="relative">
                <input 
                  type={showConfirmPass ? "text" : "password"} 
                  placeholder="••••••••" 
                  className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 transition-all duration-200 text-left font-mono tracking-wider" 
                />
                <button 
                  type="button"
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                  className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
                >
                  {showConfirmPass ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* 3. قسم نظام النقاط والمكافآت */}
        <div className="space-y-4 pt-2">
          <h3 className="text-base font-bold text-gray-800 flex items-center gap-2 border-b border-gray-100 pb-2">
            <FaCoins className="text-emerald-600 text-sm" /> معايير النقاط والمكافآت
          </h3>
          <div className="max-w-md space-y-1.5">
            <label className="text-sm font-bold text-gray-700">معدل احتساب النقاط لكل (1 كغ) نفايات</label>
            <div className="flex gap-2 items-center">
              <input type="number" value={pointsRate} onChange={(e) => setPointsRate(e.target.value)} className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-3.5 px-4 text-sm font-bold text-gray-800 focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 transition-all duration-200 font-mono text-left" />
              <span className="text-sm font-bold text-gray-500 bg-gray-100 px-5 py-3.5 rounded-xl border border-gray-200/50 select-none">نقطة</span>
            </div>
          </div>
        </div>

        {/* 4. قسم إعدادات الحاويات */}
        <div className="space-y-4 pt-2">
          <h3 className="text-base font-bold text-gray-800 flex items-center gap-2 border-b border-gray-100 pb-2">
            <FaTrash className="text-emerald-600 text-sm" /> معايير الحاويات الذكية
          </h3>
          <div className="max-w-md space-y-1.5">
            <label className="text-sm font-bold text-gray-700">الحد الحرج لإشعار امتلاء الحاويات</label>
            <select className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-3.5 px-4 text-sm font-bold text-gray-700 focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 transition-all duration-200 cursor-pointer">
              <option>85% من سعة الحاوية الكلية (موصى به)</option>
              <option>90% من سعة الحاوية الكلية</option>
              <option>80% من سعة الحاوية الكلية</option>
            </select>
          </div>
        </div>

      </div>

    </div>
  );
}

