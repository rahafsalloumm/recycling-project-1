import React from 'react';
import { FiTrendingUp } from 'react-icons/fi';

const RouteProgressCard = () => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.01)] flex flex-col justify-center min-h-[120px] group hover:shadow-[0_8px_24px_rgba(0,0,0,0.02)] transition-shadow duration-300" dir="rtl">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-xs font-black text-gray-400 tracking-wide">التقدم في المسار</h4>
        <div className="flex items-baseline gap-0.5 text-emerald-600 font-sans">
          <span className="text-2xl font-black">60</span>
          <span className="text-sm font-bold">%</span>
        </div>
      </div>
      
      {/* شريط التقدم الفاخر مع أنيميشن التمدد */}
      <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden shadow-inner relative">
        <div 
          className="bg-emerald-500 h-full rounded-full transition-all duration-1000 ease-out shadow shadow-emerald-500/30"
          style={{ width: '60%' }}
        ></div>
      </div>
    </div>
  );
};

export default RouteProgressCard;
