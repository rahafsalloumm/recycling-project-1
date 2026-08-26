import React, { useState } from 'react';
import { FiTrash2, FiHome, FiRadio, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi';

const DashboardGrid = () => {
  // بيانات مجهزة للربط مع الباك إند والـ API
  const [smartBins] = useState({ critical: 3, medium: 4, low: 1, total: 8 });
  const [homeRequests] = useState({ pending: 6, completed: 3 });
  const [notifications] = useState([
    { id: 1, type: 'alert', text: 'تم إضافة مهمة جديدة في شارع الجامعة', time: 'منذ 5 دقائق' },
    { id: 2, type: 'warning', text: 'حاوية ذكية BIN-032 ممتلئة', time: 'منذ 15 دقيقة' },
    { id: 3, type: 'success', text: 'تم استلام نفايات بنجاح من عمارة 12', time: 'منذ 30 دقيقة' }
  ]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6" dir="rtl">
      
      {/* 1️⃣ كرت الحاويات الذكية (تفاعلي وحركي) */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100/80 flex flex-col justify-between shadow-[0_2px_10px_rgba(0,0,0,0.01)] transition-all duration-300 hover:shadow-[0_12px_24px_rgba(0,0,0,0.04)] hover:-translate-y-1.5 group cursor-pointer">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
            <FiTrash2 className="stroke-[2.5]" />
          </div>
          <h4 className="text-sm font-extrabold text-gray-800 tracking-tight">الحاويات الذكية</h4>
        </div>
        
        <div className="flex items-center justify-between my-2">
          {/* الرسمة الدائرية مع أنيميشن دوران خفيف وتأثير نبض لطيف */}
          <div className="relative w-20 h-20 rounded-full border-4 border-emerald-500 border-t-amber-400 flex items-center justify-center flex-col transition-transform duration-500 group-hover:scale-105 shadow-inner">
            <span className="absolute inset-0 rounded-full border border-emerald-500/20 animate-ping opacity-25"></span>
            <span className="text-2xl font-black text-gray-800 leading-none">{smartBins.total}</span>
            <span className="text-[9px] text-gray-400 font-bold mt-1 leading-none">حاويات</span>
          </div>
          
          {/* المؤشرات الجانبية مع تأثير إضاءة خفيف عند الهوفر */}
          <div className="space-y-2 text-xs w-1/2 text-right">
            <div className="flex justify-between items-center px-2 py-1 rounded-lg group-hover:bg-red-50/50 transition-colors duration-200">
              <span className="text-gray-500 font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full group-hover:animate-pulse"></span> مرتفعة
              </span> 
              <span className="font-black text-red-600">{smartBins.critical}</span>
            </div>
            <div className="flex justify-between items-center px-2 py-1 rounded-lg group-hover:bg-amber-50/50 transition-colors duration-200">
              <span className="text-gray-500 font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span> متوسطة
              </span> 
              <span className="font-black text-amber-600">{smartBins.medium}</span>
            </div>
            <div className="flex justify-between items-center px-2 py-1 rounded-lg group-hover:bg-emerald-50/50 transition-colors duration-200">
              <span className="text-gray-500 font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> منخفضة
              </span> 
              <span className="font-black text-emerald-600">{smartBins.low}</span>
            </div>
          </div>
        </div>
        
        <button className="w-full text-center text-xs font-bold text-gray-400 mt-4 pt-3 border-t border-gray-50 transition-colors group-hover:text-emerald-600">
          عرض جميع الحاويات
        </button>
      </div>

      {/* 2️⃣ كرت طلبات المنازل السكنية (تفاعلي وحركي) */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100/80 flex flex-col justify-between shadow-[0_2px_10px_rgba(0,0,0,0.01)] transition-all duration-300 hover:shadow-[0_12px_24px_rgba(0,0,0,0.04)] hover:-translate-y-1.5 group cursor-pointer">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
              <FiHome className="stroke-[2.5]" />
            </div>
            <h4 className="text-sm font-extrabold text-gray-800 tracking-tight">طلبات المنازل</h4>
          </div>
          <span className="text-[10px] font-bold text-gray-400 hover:text-blue-600 transition-colors">عرض الكل</span>
        </div>
        
        <div className="flex items-center justify-between my-2">
          {/* الدائرة الزرقاء */}
          <div className="relative w-20 h-20 rounded-full border-4 border-blue-500 flex items-center justify-center flex-col transition-transform duration-500 group-hover:scale-105 shadow-inner">
            <span className="absolute inset-0 rounded-full border border-blue-500/20 animate-ping opacity-25"></span>
            <span className="text-2xl font-black text-gray-800 leading-none">{homeRequests.pending}</span>
            <span className="text-[9px] text-gray-400 font-bold mt-1 leading-none">طلبات</span>
          </div>
          
          <div className="space-y-2 text-xs w-1/2 text-right">
            <div className="flex justify-between items-center px-2 py-1.5 rounded-lg group-hover:bg-blue-50/50 transition-colors duration-200">
              <span className="text-gray-500 font-bold">⏳ قيد التنفيذ</span> 
              <span className="font-black text-blue-600">{homeRequests.pending}</span>
            </div>
            <div className="flex justify-between items-center px-2 py-1.5 rounded-lg group-hover:bg-emerald-50/50 transition-colors duration-200">
              <span className="text-gray-500 font-bold">✅ تم الانجاز</span> 
              <span className="font-black text-emerald-600">{homeRequests.completed}</span>
            </div>
          </div>
        </div>
        
        <button className="w-full text-center text-xs font-bold text-gray-400 mt-4 pt-3 border-t border-gray-50 transition-colors group-hover:text-blue-600">
          عرض جميع الطلبات
        </button>
      </div>

      {/* 3️⃣ كرت الإشعارات والبرقيات المباشرة (أنيميشن وحركة الكروت الداخلية) */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100/80 shadow-[0_2px_10px_rgba(0,0,0,0.01)] transition-all duration-300 hover:shadow-[0_12px_24px_rgba(0,0,0,0.04)] hover:-translate-y-1.5 group">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-lg">
            <FiRadio className="stroke-[2.5] animate-pulse" />
          </div>
          <h4 className="text-sm font-extrabold text-gray-800 tracking-tight">الإشعارات</h4>
        </div>
        
        {/* قائمة التحديثات مع تأثير حركة صعود لطيف عند حركتها وتمرير الماوس */}
        <div className="space-y-2.5">
          {notifications.map((notif) => (
            <div 
              key={notif.id} 
              className={`p-3 rounded-xl border text-[11px] text-right transition-all duration-300 hover:scale-[1.02] cursor-pointer flex gap-2 items-start ${
                notif.type === 'alert' 
                  ? 'bg-emerald-50/40 border-emerald-100/70 text-emerald-900 hover:bg-emerald-50' 
                  : notif.type === 'warning'
                  ? 'bg-amber-50/40 border-amber-100/70 text-amber-900 hover:bg-amber-50'
                  : 'bg-slate-50 border-gray-100 text-slate-700 hover:bg-gray-100/80'
              }`}
            >
              <div className="mt-0.5">
                {notif.type === 'alert' && <FiCheckCircle className="text-emerald-600" />}
                {notif.type === 'warning' && <FiAlertTriangle className="text-amber-600" />}
                {notif.type === 'success' && <FiCheckCircle className="text-blue-500" />}
              </div>
              <div className="flex-1 space-y-1">
                <p className="font-bold leading-normal">{notif.text}</p>
                <span className="text-[9px] text-gray-400 block font-semibold">{notif.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default DashboardGrid;

