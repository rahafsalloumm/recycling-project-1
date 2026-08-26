import React, { useState } from 'react';
import { FiTruck, FiFileText, FiLock, FiBell, FiEye, FiX } from 'react-icons/fi';

const InfoGrids = () => {
  // حالات التحكم بفتح وإغلاق النوافذ المنبثقة (Modals)
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);
  const [isLicenseModalOpen, setIsLicenseModalOpen] = useState(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative" dir="rtl">
      
      {/* 🛠️ 1. كرت الإعدادات (صافٍ ومنظم وبدون خيار المساعدة المكرر) */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.01)] hover:shadow-[0_6px_18px_rgba(0,0,0,0.02)] transition-shadow duration-300 min-h-[220px]">
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

      {/* 📄 2. كرت معلومات الرخصة (تفاعلي يفتح منبثق) */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.01)] hover:shadow-[0_6px_18px_rgba(0,0,0,0.02)] transition-shadow duration-300 min-h-[220px]">
        <div>
          <h4 className="text-xs font-extrabold text-gray-400 tracking-wide mb-3">معلومات الرخصة</h4>
          <div className="space-y-2.5 text-xs font-bold text-gray-700">
            <div className="flex justify-between"><span className="text-gray-400 font-medium">رقم الرخصة</span> <span className="font-sans">0123456789</span></div>
            <div className="flex justify-between"><span className="text-gray-400 font-medium">نوع الرخصة</span> <span>قيادة مركبات ثقيلة</span></div>
            <div className="flex justify-between"><span className="text-gray-400 font-medium">الحالة</span> <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100/50 text-[10px]">سارية</span></div>
          </div>
        </div>
        <button 
          onClick={() => setIsLicenseModalOpen(true)}
          className="text-[10px] font-black text-gray-400 hover:text-emerald-600 flex items-center justify-center gap-1 mt-4 pt-2 border-t border-gray-50 w-full transition-colors"
        >
          <FiEye /> عرض وثيقة الرخصة
        </button>
      </div>

      {/* 🚚 3. كرت معلومات المركبة (تفاعلي يفتح منبثق) */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.01)] hover:shadow-[0_6px_18px_rgba(0,0,0,0.02)] transition-shadow duration-300 min-h-[220px]">
        <div>
          <h4 className="text-xs font-extrabold text-gray-400 tracking-wide mb-3">معلومات المركبة</h4>
          <div className="space-y-2.5 text-xs font-bold text-gray-700">
            <div className="flex justify-between"><span className="text-gray-400 font-medium">رقم الشاحنة</span> <span className="font-sans">TRK-007</span></div>
            <div className="flex justify-between"><span className="text-gray-400 font-medium">نوع الشاحنة</span> <span>ضاغطة نفايات</span></div>
            <div className="flex justify-between"><span className="text-gray-400 font-medium">الحالة</span> <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100/50 text-[10px]">نشطة</span></div>
          </div>
        </div>
        <button 
          onClick={() => setIsVehicleModalOpen(true)}
          className="text-[10px] font-black text-gray-400 hover:text-emerald-600 flex items-center justify-center gap-1 mt-4 pt-2 border-t border-gray-50 w-full transition-colors"
        >
          <FiTruck /> عرض تفاصيل المركبة
        </button>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 🛸 📥 النوافذ المنبثقة التفاعلية (Modals) المبنية بالكامل بتيل ويند */}
      
      {/* نافذة منبثق وثيقة الرخصة */}
      {isLicenseModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-gray-100 space-y-4">
            <button onClick={() => setIsLicenseModalOpen(false)} className="absolute top-4 left-4 p-1 rounded-lg text-gray-400 hover:bg-gray-50 hover:text-gray-600"><FiX className="text-lg" /></button>
            <h3 className="text-sm font-black text-gray-800 flex items-center gap-2"><FiFileText className="text-emerald-600" /> معاينة وثيقة رخصة القيادة</h3>
            {/* بطاقة رخصة وهمية مصممة بشكل جمالي */}
            <div className="bg-gradient-to-br from-emerald-800 to-teal-900 p-5 rounded-xl text-white space-y-4 font-sans text-xs shadow-inner">
              <div className="flex justify-between items-center"><span className="font-bold tracking-wider">DRIVING LICENSE</span> <span>🌱 EcoCycle</span></div>
              <div className="pt-2"><p className="text-[10px] opacity-60">NAME</p><p className="font-black text-sm tracking-wide">AHMED MOHAMMED</p></div>
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-[10px] opacity-60">LICENSE NO.</p><p className="font-bold">0123456789</p></div>
                <div><p className="text-[10px] opacity-60">CLASS</p><p className="font-bold">HEAVY VEHICLE</p></div>
                <div><p className="text-[10px] opacity-60">ISSUE DATE</p><p className="font-bold">2020-01-15</p></div>
                <div><p className="text-[10px] opacity-60">EXPIRY DATE</p><p className="font-bold text-amber-300">2026-01-15</p></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* نافذة منبثق تفاصيل ومواصفات المركبة */}
      {isVehicleModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-gray-100 space-y-4">
            <button onClick={() => setIsVehicleModalOpen(false)} className="absolute top-4 left-4 p-1 rounded-lg text-gray-400 hover:bg-gray-50 hover:text-gray-600"><FiX className="text-lg" /></button>
            <h3 className="text-sm font-black text-gray-800 flex items-center gap-2"><FiTruck className="text-emerald-600" /> البطاقة الفنية للمركبة</h3>
            <div className="space-y-2 text-xs font-bold text-gray-700 bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div className="flex justify-between py-1.5 border-b border-gray-200/50"><span>رقم الشاحنة الكلي:</span> <span className="font-sans text-slate-800">TRK-007</span></div>
              <div className="flex justify-between py-1.5 border-b border-gray-200/50"><span>سعة التجميع القصوى:</span> <span>12 طن مكبس هيدروليكي</span></div>
              <div className="flex justify-between py-1.5 border-b border-gray-200/50"><span>نوع الوقود الحالي:</span> <span>ديزل صديق للبيئة (Euro 6)</span></div>
              <div className="flex justify-between py-1.5 border-b border-gray-200/50"><span>تاريخ آخر صيانة دورية:</span> <span className="font-sans">2026-04-10</span></div>
              <div className="flex justify-between py-1.5 text-emerald-600"><span>حالة المستشعرات الذكية:</span> <span>متصلة وتعمل بكفاءة 100%</span></div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default InfoGrids;
