import { FiMap, FiPlay, FiInfo, FiMapPin, FiBriefcase } from 'react-icons/fi';

const TaskDetailsCard = ({ task, waypoints = [] }) => {
  const mappedWaypoints = waypoints
    .filter((waypoint) => waypoint.taskType !== 'FinalDestination')
    .map((waypoint) => {
      const coordinates = waypoint.details?.coordinates;
      const lat = Number(coordinates?.lat ?? coordinates?.latitude);
      const lng = Number(coordinates?.lng ?? coordinates?.longitude);
      return Number.isFinite(lat) && Number.isFinite(lng) ? { waypoint, lat, lng } : null;
    })
    .filter(Boolean);
  const minLat = Math.min(...mappedWaypoints.map(({ lat }) => lat));
  const maxLat = Math.max(...mappedWaypoints.map(({ lat }) => lat));
  const minLng = Math.min(...mappedWaypoints.map(({ lng }) => lng));
  const maxLng = Math.max(...mappedWaypoints.map(({ lng }) => lng));
  const projectPoint = ({ lat, lng }) => ({
    x: maxLng === minLng ? 50 : 10 + ((lng - minLng) / (maxLng - minLng)) * 80,
    y: maxLat === minLat ? 50 : 90 - ((lat - minLat) / (maxLat - minLat)) * 80,
  });
  const projectedWaypoints = mappedWaypoints.map((item) => ({ ...item, point: projectPoint(item) }));
  const path = projectedWaypoints.map(({ point }) => `${point.x},${point.y}`).join(' ');

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
          {projectedWaypoints.length > 0 ? (
            <svg className="absolute w-full h-full p-8" viewBox="0 0 100 100" preserveAspectRatio="none">
              {projectedWaypoints.length > 1 && (
                <polyline points={path} fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              )}
              {projectedWaypoints.map(({ waypoint, point }) => (
                <circle
                  key={waypoint.waypointId}
                  cx={point.x}
                  cy={point.y}
                  r={waypoint.waypointId === task?.waypointId ? 4 : 2.5}
                  fill={waypoint.waypointId === task?.waypointId ? '#047857' : '#10b981'}
                  stroke="white"
                  strokeWidth="1.5"
                />
              ))}
            </svg>
          ) : (
            <span className="text-xs text-gray-400">لا توجد إحداثيات صالحة للمسار</span>
          )}
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
              <p className="text-xs font-black text-slate-800 font-sans mt-1">{task ? `#${task.stopNumber}` : '—'}</p>
            </div>
            <div className="col-span-2 border-t border-gray-50/50 pt-3">
              <p className="text-[10px] text-gray-400 font-bold flex items-center gap-1">
                <FiBriefcase className="text-gray-400" /> نوع المهمة
              </p>
              <p className="text-xs font-black text-emerald-800 mt-1">{task?.details?.wasteOrBinType || '—'}</p>
            </div>

            <div className="col-span-2 border-t border-gray-50/50 pt-3">
              <p className="text-[10px] text-gray-400 font-bold flex items-center gap-1">
                <FiMapPin className="text-gray-400" /> العنوان
              </p>
              <p className="text-xs font-black text-slate-800 mt-1">{task?.details?.address || '—'}</p>
              <p className="text-[10px] text-gray-400 font-bold mt-0.5 font-sans">المسافة المتبقية: {task?.distanceFromPreviousKm ?? '—'} كم</p>
            </div>

          </div>
        </div>

        {/* زر بدء المهمة الأخضر العريض التفاعلي بالأنيميشن */}
        <button
          type="button"
          disabled
          title="بدء المهمة غير مدعوم حالياً من Backend"
          className="w-full bg-gray-300 text-gray-500 py-3.5 rounded-xl font-bold text-xs tracking-wide flex items-center justify-center gap-2 shadow-md transition-all duration-300 mt-6 cursor-not-allowed"
        >
          <FiPlay className="fill-current text-xs" />
          <span>بدء المهمة غير متاحة حالياً</span>
        </button>
      </div>

    </div>
  );
};

export default TaskDetailsCard;
