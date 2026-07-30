import React, { useState } from 'react';
import { FiList, FiHome, FiTrash2, FiChevronLeft, FiSliders } from 'react-icons/fi';

const DetailedTasksList = () => {
  const [activeTaskId, setActiveTaskId] = useState(3); // افتراضياً المهمة رقم 3 محددة كالصورة
  const [tasks] = useState([
    { id: 1, type: 'home', title: 'شارع الجامعة - عمارة 15', desc: 'استلام نفايات منزلية', time: '10:00 ص', status: 'completed', statusText: 'مكتملة' },
    { id: 2, type: 'bin', title: 'حي الياسمين - شارع 8', desc: 'حاوية ذكية BIN-045', time: '10:30 ص', status: 'completed', statusText: 'مكتملة' },
    { id: 3, type: 'home', title: 'حي الياسمين - شارع 10', desc: 'استلام نفايات منزلية', time: '11:00 ص', status: 'progress', statusText: 'قيد التنفيذ' },
    { id: 4, type: 'bin', title: 'شارع الأمل - عمارة 22', desc: 'حاوية ذكية BIN-078', time: '11:30 ص', status: 'progress', statusText: 'قيد التنفيذ' },
    { id: 5, type: 'home', title: 'حي الزهور - شارع 3', desc: 'استلام نفايات منزلية', time: '12:00 م', status: 'pending', statusText: 'قيد الانتظار' },
    { id: 6, type: 'bin', title: 'شارع النصر - عمارة 45', desc: 'حاوية ذكية BIN-112', time: '12:30 م', status: 'pending', statusText: 'قيد الانتظار' },
    { id: 7, type: 'home', title: 'حي النور - شارع 7', desc: 'استلام نفايات منزلية', time: '01:00 م', status: 'not_started', statusText: 'لم يبدأ' },
  ]);

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col justify-between min-h-[580px] shadow-[0_2px_12px_rgba(0,0,0,0.01)]" dir="rtl">
      <div>
        {/* هيدر القائمة */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2 text-slate-800">
            <FiList className="text-xl stroke-[2.5]" />
            <h3 className="font-extrabold text-sm tracking-tight">قائمة المهام</h3>
          </div>
          <button className="text-xs font-bold text-gray-400 hover:text-emerald-600 flex items-center gap-1 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100/60 transition-colors">
            <FiSliders className="text-xs" /> تصفية
          </button>
        </div>

        {/* أسطر جدول المهام المتسعة */}
        <div className="space-y-3">
          {tasks.map((task) => (
            <div 
              key={task.id}
              onClick={() => setActiveTaskId(task.id)}
              className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all duration-300 hover:px-4 ${
                task.id === activeTaskId 
                  ? 'bg-emerald-50/30 border-emerald-300 shadow-sm ring-1 ring-emerald-400/10' 
                  : 'bg-white border-gray-100 hover:border-gray-200'
              }`}
            >
              <div className="flex items-center gap-4 text-right">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shadow-sm ${
                  task.status === 'completed' ? 'bg-gray-100 text-gray-400 line-through' : 'bg-emerald-600 text-white'
                }`}>
                  {task.id}
                </span>

                <div className={`text-xl ${task.status === 'completed' ? 'text-gray-300' : 'text-slate-400'}`}>
                  {task.type === 'home' ? <FiHome /> : <FiTrash2 />}
                </div>

                <div>
                  <h4 className={`text-xs font-black tracking-tight ${task.status === 'completed' ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                    {task.title}
                  </h4>
                  <p className="text-[10px] text-gray-400 font-medium mt-0.5">{task.desc}</p>
                </div>
              </div>

              {/* أوقات المهام والحالة الملوّنة المريحة تماماً كالصورة */}
              <div className="flex items-center gap-6">
                <span className="text-[10px] font-bold text-gray-400 font-sans">{task.time}</span>
                
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] font-black px-3 py-1.5 rounded-xl border tracking-wide min-w-[85px] text-center transition-all ${
                    task.status === 'completed' 
                      ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                      : task.status === 'progress'
                      ? 'bg-blue-50 text-blue-600 border-blue-100'
                      : task.status === 'pending'
                      ? 'bg-amber-50 text-amber-600 border-amber-100'
                      : 'bg-gray-50 text-gray-500 border-gray-200'
                  }`}>
                    {task.status === 'progress' ? '••• ' + task.statusText : task.statusText}
                  </span>
                  <FiChevronLeft className={`text-gray-300 transition-transform ${task.id === activeTaskId ? 'text-emerald-600 -translate-x-1' : ''}`} />
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      <button className="w-full text-center text-xs font-bold text-gray-400 border border-gray-100 py-3 rounded-xl hover:text-emerald-600 hover:bg-gray-50 transition-all mt-4">
        عرض جميع المهام (12)
      </button>
    </div>
  );
};

export default DetailedTasksList;
