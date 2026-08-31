
const BinsChartSection = () => {
  const chartData = [
    { label: 'فارغة (18)', percentage: '37%', color: 'bg-emerald-500' },
    { label: 'متوسطة (12)', percentage: '25%', color: 'bg-amber-400' },
    { label: 'ممتلئة (22)', percentage: '29%', color: 'bg-red-500' },
    { label: 'قيد التفريغ', percentage: '8%', color: 'bg-blue-500' },
    { label: 'غير نشطة', percentage: '4%', color: 'bg-gray-400' },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col justify-between min-h-[460px] shadow-[0_2px_12px_rgba(0,0,0,0.01)]" dir="rtl">
      <div>
        <h3 className="font-extrabold text-gray-800 text-sm tracking-tight mb-6">توزيع مستويات الامتلاء</h3>
        
        <div className="flex flex-col items-center sm:flex-row justify-around gap-6 mt-4">
          {/* المخطط الدائري التفاعلي المصنوع بتيل ويند الصافي */}
          <div className="relative w-40 h-40 rounded-full border-[14px] border-emerald-500 border-t-red-500 border-r-amber-400 border-l-blue-400 flex flex-col items-center justify-center shadow-inner group cursor-pointer transition-transform duration-300 hover:scale-105">
            <span className="text-3xl font-black text-slate-800">48</span>
            <span className="text-xs text-gray-400 font-bold mt-1">حاوية</span>
          </div>

          {/* مفتاح المخطط التفصيلي للنسب المئوية كالصورة تماماً */}
          <div className="space-y-3.5 w-full sm:w-1/2">
            {chartData.map((data, index) => (
              <div key={index} className="flex items-center justify-between text-xs font-bold text-gray-600 border-b border-gray-50 pb-1.5 last:border-0 last:pb-0">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${data.color}`}></span>
                  <span>{data.label}</span>
                </div>
                <span className="font-sans text-gray-400 font-medium">{data.percentage}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* نصيحة ذكية أسفل كرت المخطط */}
      <div className="bg-emerald-50/50 border border-emerald-100/60 p-3 rounded-xl flex items-start gap-2.5 mt-6 text-right">
        <span className="text-lg">💡</span>
        <div className="space-y-0.5">
          <p className="text-xs font-black text-emerald-900 leading-tight">نصيحة ذكية</p>
          <p className="text-[10px] text-emerald-700/90 font-medium leading-relaxed">يوجد 8 حاويات تحتاج تفريغ عاجل في مسارك الحالي. يفضل زيارة الحاويات الممتلئة أولاً لتحسين كفاءة المسار.</p>
        </div>
      </div>
    </div>
  );
};

export default BinsChartSection;
