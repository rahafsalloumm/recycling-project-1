import { useState } from 'react';
import { FiList, FiHome, FiTrash2, FiChevronLeft, FiSliders } from 'react-icons/fi';

const DetailedTasksList = ({ tasks = [], activeTaskId, onTaskSelect }) => {
  const [showPendingOnly, setShowPendingOnly] = useState(false);
  const getStatusText = (status) => {
    if (status === 'completed') return 'مكتملة';
    if (status === 'pending') return 'قيد الانتظار';
    return 'غير محددة';
  };
  const visibleTasks = tasks
    .filter((task) => task.taskType !== 'FinalDestination')
    .filter((task) => !showPendingOnly || task.waypointStatus === 'pending');

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col justify-between min-h-[580px] shadow-[0_2px_12px_rgba(0,0,0,0.01)]" dir="rtl">
      <div>
        {/* هيدر القائمة */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2 text-slate-800">
            <FiList className="text-xl stroke-[2.5]" />
            <h3 className="font-extrabold text-sm tracking-tight">قائمة المهام</h3>
          </div>
          <button
            type="button"
            onClick={() => setShowPendingOnly((currentValue) => !currentValue)}
            className={`text-xs font-bold flex items-center gap-1 px-3 py-1.5 rounded-xl border transition-colors ${
              showPendingOnly
                ? 'text-emerald-600 bg-emerald-50 border-emerald-100'
                : 'text-gray-400 hover:text-emerald-600 bg-gray-50 border-gray-100/60'
            }`}
          >
            <FiSliders className="text-xs" /> {showPendingOnly ? 'عرض الكل' : 'المهام المعلقة'}
          </button>
        </div>

        {/* أسطر جدول المهام المتسعة */}
        <div className="space-y-3">
          {visibleTasks.map((task) => (
            <div 
              key={task.waypointId}
              onClick={() => onTaskSelect(task)}
              className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all duration-300 hover:px-4 ${
                task.waypointId === activeTaskId
                  ? 'bg-emerald-50/30 border-emerald-300 shadow-sm ring-1 ring-emerald-400/10' 
                  : 'bg-white border-gray-100 hover:border-gray-200'
              }`}
            >
              <div className="flex items-center gap-4 text-right">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shadow-sm ${
                  task.waypointStatus === 'completed' ? 'bg-gray-100 text-gray-400 line-through' : 'bg-emerald-600 text-white'
                }`}>
                  {task.stopNumber}
                </span>

                <div className={`text-xl ${task.waypointStatus === 'completed' ? 'text-gray-300' : 'text-slate-400'}`}>
                  {task.taskType === 'WasteRequest' ? <FiHome /> : <FiTrash2 />}
                </div>

                <div>
                  <h4 className={`text-xs font-black tracking-tight ${task.waypointStatus === 'completed' ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                    {task.details?.address || '—'}
                  </h4>
                  <p className="text-[10px] text-gray-400 font-medium mt-0.5">{task.details?.wasteOrBinType || '—'}</p>
                </div>
              </div>

              {/* أوقات المهام والحالة الملوّنة المريحة تماماً كالصورة */}
              <div className="flex items-center gap-6">
                <span className="text-[10px] font-bold text-gray-400 font-sans">—</span>
                
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] font-black px-3 py-1.5 rounded-xl border tracking-wide min-w-[85px] text-center transition-all ${
                    task.waypointStatus === 'completed'
                      ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                      : task.waypointStatus === 'pending'
                      ? 'bg-amber-50 text-amber-600 border-amber-100'
                      : 'bg-gray-50 text-gray-500 border-gray-200'
                  }`}>
                    {getStatusText(task.waypointStatus)}
                  </span>
                  <FiChevronLeft className={`text-gray-300 transition-transform ${task.waypointId === activeTaskId ? 'text-emerald-600 -translate-x-1' : ''}`} />
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      <p className="w-full text-center text-xs font-bold text-gray-400 border border-gray-100 py-3 rounded-xl mt-4">
        {showPendingOnly ? `المهام المعلقة المعروضة (${visibleTasks.length})` : `جميع المهام المعروضة (${visibleTasks.length})`}
      </p>
    </div>
  );
};

export default DetailedTasksList;
