import React from 'react';
import { FiMap, FiPlay, FiInfo, FiMapPin, FiBriefcase } from 'react-icons/fi';

const TaskDetailsCard = () => {
  return (
    <div className="space-y-5" dir="rtl">
      
      {/* 🗺️ قسم خريطة المسار الحالي المصغرة في الأعلى */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.01)]">
        <div className="flex items-center gap-2 text-emerald-800 mb-4">
          <FiMap className="text-lg stroke-[2.5]" />
          <h3 className="font-extrabold text-gray-800 text-sm tracking-tight">المسار الحالي</h3>
        </div>
        
        {/* محاكاة خريطة فسيحة بألوان فاتحة وراقية */}
        <div className="relative h-44 bg-slate-50 border border-gray-100 rounded-xl overflow-hidden flex items-center justify-center group/map">
          <svg className="absolute w-full h-full p-8" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M 15 65 L 40 40 L 68 50 L 88 15" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="absolute bottom-[35%] right-[60%] text-xl bg-white p-1 rounded-full shadow border">🚚</div>
          <span className="absolute top-[40%] left-[58%] bg-emerald-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shadow border-2 border-white">2</span>
          <span className="absolute top-[18%] left-[10%] bg-emerald-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shadow border-2 border-white">4</span>
        </div>
      </div>

      {/* 📋 كرت تفاصيل المهمة الحالية وزر البدء بالأسفل */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.01)] flex flex-col justify-between min-h-[290px] group">
        <div>
          <div className="flex items-center gap-2 text-slate-800 mb-5 border-b border-gray-50 pb-3">
            <FiInfo className="text-lg stroke-[2.5]" />
            <h3 className="font-extrabold text-sm tracking-tight">تفاصيل المهمة الحالية</h3>
          </div>

          {/* البيانات المنظمة بمسافات عريضة تماماً كالصورة */}
          <div className="grid grid-cols-2 gap-y-4 text-right">
            <div>
              <p className="text-[10px] text-gray-400 font-bold">رقم المهمة</p>
              <p className="text-xs font-black text-slate-800 font-sans mt-1">#003</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold">الوقت المتوقع</p>
              <p className="text-xs font-black text-slate-800 font-sans mt-1">11:00 ص</p>
            </div>
            
            <div className="col-span-2 border-t border-gray-50/50 pt-3">
              <p className="text-[10px] text-gray-400 font-bold flex items-center gap-1">
                <FiBriefcase className="text-gray-400" /> نوع المهمة
              </p>
              <p className="text-xs font-black text-emerald-800 mt-1">استلام نفايات منزلية</p>
            </div>

            <div className="col-span-2 border-t border-gray-50/50 pt-3">
              <p className="text-[10px] text-gray-400 font-bold flex items-center gap-1">
                <FiMapPin className="text-gray-400" /> العنوان
              </p>
              <p className="text-xs font-black text-slate-800 mt-1">حي الياسمين - شارع 10</p>
              <p className="text-[10px] text-gray-400 font-bold mt-0.5 font-sans">المسافة المتبقية: 1.2 كم</p>
            </div>

            <div className="col-span-2 border-t border-gray-50/50 pt-3">
              <p className="text-[10px] text-gray-400 font-bold">ملاحظات</p>
              <p className="text-xs font-bold text-slate-600 mt-1">يرجى التواصل مع السيد محمد</p>
            </div>
          </div>
        </div>

        {/* زر بدء المهمة الأخضر العريض التفاعلي بالأنيميشن */}
        <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-xl font-bold text-xs tracking-wide flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:shadow-emerald-600/10 transition-all duration-300 mt-6 active:scale-[0.99]">
          <FiPlay className="fill-current text-xs" />
          <span>بدء المهمة</span>
        </button>
      </div>

    </div>
  );
};

export default TaskDetailsCard;
