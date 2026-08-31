export default function ReportsBottomSection() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start" dir="rtl">
      
      {/* 1. جدول أداء السائقين الفرعي المدمج */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm overflow-hidden text-right">
        <h4 className="text-sm font-bold text-gray-800 mb-4">أداء السائقين</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse text-xs font-semibold">
            <thead>
              <tr className="text-gray-400 border-b border-gray-100 pb-2 font-bold">
                <th className="pb-3 pr-2">السائق</th>
                <th className="pb-3 text-center">عدد الرحلات</th>
                <th className="pb-3 text-center">الكمية (طن)</th>
                <th className="pb-3 text-center w-20">نسبة الإنجاز</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 divide-y divide-gray-50 font-bold">
              <tr className="hover:bg-gray-50/50"><td className="py-3 pr-2 font-bold text-gray-900">أحمد محمود</td><td className="py-3 text-center font-mono">28</td><td className="py-3 text-center font-mono">3.2</td><td className="py-3 text-center text-emerald-600 font-mono">95%</td></tr>
              <tr className="hover:bg-gray-50/50"><td className="py-3 pr-2 font-bold text-gray-900">محمد علي</td><td className="py-3 text-center font-mono">25</td><td className="py-3 text-center font-mono">2.8</td><td className="py-3 text-center text-emerald-600 font-mono">90%</td></tr>
              <tr className="hover:bg-gray-50/50"><td className="py-3 pr-2 font-bold text-gray-900">خالد nاصر</td><td className="py-3 text-center font-mono">22</td><td className="py-3 text-center font-mono">2.5</td><td className="py-3 text-center text-amber-600 font-mono">85%</td></tr>
              <tr className="hover:bg-gray-50/50"><td className="py-3 pr-2 font-bold text-gray-900">يوسف سامي</td><td className="py-3 text-center font-mono">18</td><td className="py-3 text-center font-mono">2.1</td><td className="py-3 text-center text-amber-600 font-mono">75%</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. الخريطة الجغرافية للنفايات حسب المنطقة كالصورة */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
        <h4 className="text-sm font-bold text-gray-800 mb-4">النفايات المجمعة حسب المنطقة (طن)</h4>
        <div className="w-full h-44 bg-emerald-50/20 rounded-xl relative border border-emerald-100/20 flex items-center justify-center overflow-hidden">
          {/* مؤشرات حية بأحجام ونسب مختلفة مطابقة لدوائر الصورة */}
          <div className="absolute top-8 right-12 w-8 h-8 rounded-full bg-emerald-600/90 text-white font-mono text-[10px] font-bold flex items-center justify-center shadow-md">6.8</div>
          <div className="absolute bottom-8 right-20 w-8 h-8 rounded-full bg-emerald-500/90 text-white font-mono text-[10px] font-bold flex items-center justify-center shadow-md">4.2</div>
          <div className="absolute top-12 left-16 w-8 h-8 rounded-full bg-emerald-500/90 text-white font-mono text-[10px] font-bold flex items-center justify-center shadow-md">3.8</div>
          <div className="absolute bottom-6 left-12 w-8 h-8 rounded-full bg-emerald-600/90 text-white font-mono text-[10px] font-bold flex items-center justify-center shadow-md">5.7</div>
          <span className="text-[11px] font-bold text-emerald-800 bg-white/95 px-3 py-1.5 rounded-lg shadow-sm border border-emerald-100">النطاق التوزيعي الجغرافي</span>
        </div>
      </div>

      {/* 3. ملخص التقرير النهائي الشامل بالخطوط والألوان المتناسقة */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
        <h4 className="text-sm font-bold text-gray-800 mb-4">ملخص التقرير</h4>
        <div className="space-y-3.5 text-xs font-bold text-gray-500">
          <div className="flex justify-between items-center border-b border-gray-50 pb-2"><span>إجمالي النفايات المجمعة</span><span className="text-gray-900 font-mono text-sm">28.4 طن</span></div>
          <div className="flex justify-between items-center border-b border-gray-50 pb-2"><span>إجمالي عمليات إعادة التدوير</span><span className="text-gray-900 font-mono text-sm">675 عملية</span></div>
          <div className="flex justify-between items-center border-b border-gray-50 pb-2"><span>إجمالي الطلبات</span><span className="text-gray-900 font-mono text-sm">1,248 طلب</span></div>
          <div className="flex justify-between items-center border-b border-gray-50 pb-2"><span>إجمالي المستخدمين النشطين</span><span className="text-gray-900 font-mono text-sm">892 مستخدم</span></div>
          <div className="flex justify-between items-center border-b border-gray-50 pb-2"><span>إجمالي الرحلات</span><span className="text-gray-900 font-mono text-sm">342 رحلة</span></div>
          <div className="flex justify-between items-center"><span>متوسط وقت الاستجابة</span><span className="text-emerald-600 font-mono text-sm font-black">2.4 ساعة</span></div>
        </div>
      </div>

    </div>
  );
}
