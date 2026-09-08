import { FiCheckCircle, FiClock } from 'react-icons/fi';

const RouteStationsList = ({ waypoints = [] }) => {
  const stations = waypoints;
  const displayedStations = stations;
  const getStatusText = (status) => status === 'completed' ? 'مكتملة' : status === 'pending' ? 'في الانتظار' : '—';

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col min-h-[500px] shadow-[0_2px_12px_rgba(0,0,0,0.01)]" dir="rtl">
      <div className="flex items-center gap-2 text-slate-800 mb-5">
        <h3 className="font-extrabold text-sm tracking-tight">محطات المسار ({displayedStations.length})</h3>
      </div>

      {/* قائمة المحطات الممتدة بمسافات فسيحة وتأثير هوفر ناعم */}
      <div className="space-y-3.5 overflow-y-auto pr-1 max-h-[520px]">
        {displayedStations.map((station) => (
          <div 
            key={station.waypointId}
            className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0 group cursor-pointer transition-all duration-200 hover:px-1"
          >
            <div className="flex items-center gap-4 text-right">
              {/* الدائرة الرقمية الخضراء الفخمة */}
              <span className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center text-xs font-black shadow-sm group-hover:scale-105 transition-transform">
                {station.stopNumber}
              </span>
              
              <div className="space-y-0.5">
                <h4 className="text-xs font-black text-gray-800 tracking-tight group-hover:text-emerald-700 transition-colors">{station.details?.address || '—'}</h4>
                <p className="text-[10px] text-gray-400 font-medium">{station.details?.wasteOrBinType || '—'}</p>
              </div>
            </div>

            {/* الحالات الزمنية الملونة بدقة مذهلة ومطابقة للصورة */}
            <div className="flex items-center gap-5">
              <div className="text-left font-sans min-w-[70px]">
                <p className="text-[10px] font-bold text-gray-400">—</p>
              </div>
              
              <span className={`text-[10px] font-black px-3 py-1.5 rounded-xl border tracking-wide min-w-[95px] text-center flex items-center justify-center gap-1.5 ${
                station.waypointStatus === 'completed'
                  ? 'bg-emerald-50 text-emerald-600 border-emerald-100/70' 
                  : station.waypointStatus === 'pending'
                  ? 'bg-amber-50 text-amber-600 border-amber-100/70'
                  : 'bg-gray-50 text-gray-500 border-gray-200'
              }`}>
                  {station.waypointStatus === 'completed' && <FiCheckCircle className="text-xs" />}
                  {station.waypointStatus !== 'completed' && <FiClock className="text-xs" />}
                  {getStatusText(station.waypointStatus)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RouteStationsList;
