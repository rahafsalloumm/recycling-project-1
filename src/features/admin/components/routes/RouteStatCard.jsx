
export default function RouteStatCard({ title, value, desc, icon, bgIcon }) {
  return (
    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center justify-between text-right transition-all duration-300 hover:shadow-[0_8px_24_rgba(0,0,0,0.04)] hover:-translate-y-0.5 cursor-pointer group">
      <div className="space-y-1.5">
        <p className="text-xs font-semibold text-gray-400 tracking-wide transition-colors duration-300 group-hover:text-gray-500">{title}</p>
        <h3 className="text-xl font-bold text-gray-900 font-mono">{value}</h3>
        <span className="text-[10px] text-gray-400 font-semibold block">{desc}</span>
      </div>
      <div className={`p-3 rounded-xl text-base ${bgIcon} shadow-sm`}>
        {icon}
      </div>
    </div>
  );
}
