import { FiList, FiHome, FiTrash2 } from 'react-icons/fi';
import { useState } from 'react';
import driverService from '@/services/driver';

const TasksList = ({ route }) => {
  const [completedWaypointIds, setCompletedWaypointIds] = useState([]);
  const [updatingWaypointId, setUpdatingWaypointId] = useState(null);
  const [error, setError] = useState('');
  const tasks = (route?.waypoints || [])
    .filter((waypoint) => waypoint.taskType !== 'FinalDestination')
    .map((waypoint) => (
      completedWaypointIds.includes(waypoint.waypointId)
        ? { ...waypoint, waypointStatus: 'completed' }
        : waypoint
    ));

  const completeTask = async (waypointId) => {
    if (!route?.routeId || !waypointId) {
      setError('تعذر تحديث المهمة لعدم توفر بيانات المسار.');
      return;
    }

    setUpdatingWaypointId(waypointId);
    setError('');
    try {
      await driverService.updateTaskStatus(route.routeId, waypointId);
      setCompletedWaypointIds((currentIds) => [...new Set([...currentIds, waypointId])]);
    } catch (updateError) {
      const status = updateError.response?.status;
      setError(
        status === 401
          ? 'انتهت جلسة الدخول. يرجى تسجيل الدخول مرة أخرى.'
          : status === 403
            ? 'ليس لديك صلاحية لتحديث هذه المهمة.'
            : 'تعذر تحديث حالة المهمة. حاول مرة أخرى.'
      );
    } finally {
      setUpdatingWaypointId(null);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col justify-between min-h-[460px] shadow-[0_2px_12px_rgba(0,0,0,0.01)]" dir="rtl">
      <div>
        {/* تم إزالة أزرار التصفية أو الثلاث نقاط الإضافية من هنا تماماً */}
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-2.5 text-emerald-800">
            <FiList className="text-xl stroke-[2.5]" />
            <h3 className="font-extrabold text-gray-800 text-sm tracking-tight">المهام التالية</h3>
          </div>
        </div>

        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.waypointId} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0 group cursor-pointer transition-all duration-200">
              <div className="flex items-center gap-4 text-right">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shadow-sm ${
                  task.current ? 'bg-emerald-600 text-white ring-4 ring-emerald-500/10' : 'bg-emerald-50 text-emerald-700'
                }`}>
                  {task.stopNumber}
                </span>
                
                <div className={`text-xl ${task.waypointStatus === 'pending' ? 'text-emerald-600' : 'text-gray-300'}`}>
                  {task.taskType === 'WasteRequest' ? <FiHome /> : <FiTrash2 />}
                </div>

                <div className="space-y-0.5">
                  <h4 className="text-xs font-black text-gray-800 tracking-tight">{task.details?.address || '—'}</h4>
                  <p className="text-[10px] text-gray-400 font-medium">{task.details?.wasteOrBinType || '—'}</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-left font-sans space-y-0.5">
                  <p className="text-xs font-black text-gray-700">{task.distanceFromPreviousKm ?? '—'} كم</p>
                  <p className="text-[10px] text-gray-400 font-semibold">—</p>
                </div>
                
                <button
                  type="button"
                  disabled={task.waypointStatus !== 'pending' || updatingWaypointId === task.waypointId}
                  onClick={() => completeTask(task.waypointId)}
                  className={`text-xs px-4 py-1.5 rounded-xl font-bold tracking-wide transition-all duration-300 active:scale-95 shadow-sm ${
                  task.waypointStatus === 'pending' 
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                    : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                } ${updatingWaypointId === task.waypointId ? 'opacity-60 cursor-wait' : ''}`}
                >
                  {updatingWaypointId === task.waypointId ? 'جارٍ التحديث...' : task.waypointStatus === 'pending' ? 'إكمال المهمة' : 'مكتملة'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {error && <p className="text-xs text-red-600 mt-3">{error}</p>}
      <button className="w-full text-center text-xs text-gray-400 hover:text-emerald-600 font-bold border-t border-gray-50 pt-4 mt-3 transition-colors">
        ∨ عرض جميع المهام
      </button>
    </div>
  );
};

export default TasksList;
