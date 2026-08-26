import React from 'react';
import { FiCheckCircle, FiLoader, FiClock, FiMapPin } from 'react-icons/fi';

const RouteStationsList = () => {
  const stations = [
    { id: 1, title: 'شارع الجامعة - عمارة 15', desc: 'استلام نفايات منزلية', time: '10:00 AM', status: 'completed' },
    { id: 2, title: 'حي الياسمين - شارع 8', desc: 'حاوية ذكية BIN-045', time: '10:30 AM', status: 'completed' },
    { id: 3, title: 'حي الياسمين - شارع 10', desc: 'استلام نفايات منزلية', time: '11:00 AM', status: 'progress' },
    { id: 4, title: 'شارع الأمل - عمارة 22', desc: 'حاوية ذكية BIN-078', time: '11:30 AM', status: 'progress' },
    { id: 5, type: 'point', title: 'حي الزهور - شارع 3', desc: 'استلام نفايات منزلية', time: '12:00 PM', status: 'pending' },
    { id: 6, type: 'point', title: 'شارع النصر - عمارة 45', desc: 'حاوية ذكية BIN-112', time: '12:30 PM', status: 'pending' },
    { id: 7, type: 'point', title: 'حي النور - شارع 7', desc: 'استلام نفايات منزلية', time: '01:00 PM', status: 'pending' },
    { id: '🏁', type: 'end', title: 'الوجهة الأخيرة', desc: 'مركز التجميع الرئيسي', time: '01:30 PM', status: 'pending' }
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col min-h-[500px] shadow-[0_2px_12px_rgba(0,0,0,0.01)]" dir="rtl">
      <div className="flex items-center gap-2 text-slate-800 mb-5">
        <h3 className="font-extrabold text-sm tracking-tight">محطات المسار ({stations.length - 1})</h3>
      </div>

      {/* قائمة المحطات الممتدة بمسافات فسيحة وتأثير هوفر ناعم */}
      <div className="space-y-3.5 overflow-y-auto pr-1 max-h-[520px]">
        {stations.map((station, index) => (
          <div 
            key={index} 
            className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0 group cursor-pointer transition-all duration-200 hover:px-1"
          >
            <div className="flex items-center gap-4 text-right">
              {/* الدائرة الرقمية الخضراء الفخمة */}
              <span className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center text-xs font-black shadow-sm group-hover:scale-105 transition-transform">
                {station.id}
              </span>
              
              <div className="space-y-0.5">
                <h4 className="text-xs font-black text-gray-800 tracking-tight group-hover:text-emerald-700 transition-colors">{station.title}</h4>
                <p className="text-[10px] text-gray-400 font-medium">{station.desc}</p>
              </div>
            </div>

            {/* الحالات الزمنية الملونة بدقة مذهلة ومطابقة للصورة */}
            <div className="flex items-center gap-5">
              <div className="text-left font-sans min-w-[70px]">
                <p className="text-[10px] font-bold text-gray-400">{station.time}</p>
              </div>
              
              <span className={`text-[10px] font-black px-3 py-1.5 rounded-xl border tracking-wide min-w-[95px] text-center flex items-center justify-center gap-1.5 ${
                station.status === 'completed' 
                  ? 'bg-emerald-50 text-emerald-600 border-emerald-100/70' 
                  : station.status === 'progress'
                  ? 'bg-blue-50 text-blue-600 border-blue-100/70 animate-pulse'
                  : 'bg-amber-50 text-amber-600 border-amber-100/70'
              }`}>
                {station.status === 'completed' && <FiCheckCircle className="text-xs" />}
                {station.status === 'progress' && <FiLoader className="text-xs animate-spin" />}
                {station.status === 'pending' && <FiClock className="text-xs" />}
                {station.status === 'completed' ? 'مكتملة' : station.status === 'progress' ? 'قيد التنفيذ' : 'في الانتظار'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RouteStationsList;
