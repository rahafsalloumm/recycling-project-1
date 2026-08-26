import React from "react";

export default function RewardStatCard({ title, value, desc, icon, bgIcon }) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center justify-between text-right transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)] hover:-translate-y-1 hover:border-gray-200/50 cursor-pointer group">
      <div className="space-y-2">
        <p className="text-xs font-semibold text-gray-400 tracking-wide transition-colors duration-300 group-hover:text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900 font-mono transition-transform duration-300 group-hover:scale-[1.02]">{value}</h3>
        <span className="text-[10px] text-emerald-600 font-semibold block">{desc}</span>
      </div>
      <div className={`p-4 rounded-xl text-lg ${bgIcon} shadow-sm`}>
        {icon}
      </div>
    </div>
  );
}
