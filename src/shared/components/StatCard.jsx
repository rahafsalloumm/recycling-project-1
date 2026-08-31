
const StatCard = ({ title, value, subtext, icon, colorClass }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 flex items-center justify-between shadow-[0_4px_20px_rgba(0,0,0,0.01)] transition-all duration-300 hover:shadow-[0_12px_24px_rgba(0,0,0,0.03)] hover:-translate-y-2 cursor-pointer group" dir="rtl">
      <div className="space-y-2 text-right">
        <p className="text-xs text-gray-400 font-extrabold tracking-wide group-hover:text-emerald-600 transition-colors duration-300">{title}</p>
        <div className="flex items-baseline gap-1">
          <h3 className="text-2xl font-black text-slate-800 tracking-tight transition-transform duration-300 group-hover:scale-[1.01]">{value}</h3>
          <span className="text-[11px] text-gray-400 font-bold mr-1">{subtext}</span>
        </div>
      </div>
      
      {/* حركة الأيقونة الخلفية المتوهجة والمكبرة */}
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 ${colorClass}`}>
        {icon}
      </div>
    </div>
  );
};

export default StatCard;


