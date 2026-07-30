import React from 'react';
import { FiList, FiHome, FiTrash2 } from 'react-icons/fi';

const TasksList = () => {
  const tasks = [
    { id: 1, type: 'home', title: 'شارع الجامعة - عمارة 15', desc: 'استلام نفايات منزلية', dist: '1.2 كم', time: '10:45 ص', current: true },
    { id: 2, type: 'bin', title: 'حي الياسمين - شارع 8', desc: 'حاوية ذكية BIN-045', dist: '2.8 كم', time: '11:00 ص' },
    { id: 3, type: 'home', title: 'حي الياسمين - شارع 10', desc: 'استلام نفايات منزلية', dist: '4.1 كم', time: '11:25 ص' },
    { id: 4, type: 'bin', title: 'شارع الأمل - عمارة 22', desc: 'حاوية ذكية BIN-078', dist: '5.6 كم', time: '11:50 ص' },
    { id: 5, type: 'home', title: 'حي الزهور - شارع 3', desc: 'استلام نفايات منزلية', dist: '6.3 كم', time: '12:15 م' },
  ];

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
            <div key={task.id} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0 group cursor-pointer transition-all duration-200">
              <div className="flex items-center gap-4 text-right">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shadow-sm ${
                  task.current ? 'bg-emerald-600 text-white ring-4 ring-emerald-500/10' : 'bg-emerald-50 text-emerald-700'
                }`}>
                  {task.id}
                </span>
                
                <div className={`text-xl ${task.current ? 'text-emerald-600' : 'text-gray-300'}`}>
                  {task.type === 'home' ? <FiHome /> : <FiTrash2 />}
                </div>

                <div className="space-y-0.5">
                  <h4 className="text-xs font-black text-gray-800 tracking-tight">{task.title}</h4>
                  <p className="text-[10px] text-gray-400 font-medium">{task.desc}</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-left font-sans space-y-0.5">
                  <p className="text-xs font-black text-gray-700">{task.dist}</p>
                  <p className="text-[10px] text-gray-400 font-semibold">{task.time}</p>
                </div>
                
                <button className={`text-xs px-4 py-1.5 rounded-xl font-bold tracking-wide transition-all duration-300 active:scale-95 shadow-sm ${
                  task.current 
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                    : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                }`}>
                  {task.current ? 'التالي' : 'بعده'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="w-full text-center text-xs text-gray-400 hover:text-emerald-600 font-bold border-t border-gray-50 pt-4 mt-3 transition-colors">
        ∨ عرض جميع المهام
      </button>
    </div>
  );
};

export default TasksList;


