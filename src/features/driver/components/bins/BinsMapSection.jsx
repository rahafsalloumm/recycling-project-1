import React from 'react';

const BinsMapSection = () => {
  const pins = [
    { id: 1, top: '25%', left: '20%', color: 'bg-emerald-500 ring-emerald-500/20' },
    { id: 2, top: '40%', left: '42%', color: 'bg-emerald-500 ring-emerald-500/20' },
    { id: 3, top: '22%', left: '74%', color: 'bg-amber-500 ring-amber-500/20' },
    { id: 4, top: '65%', left: '12%', color: 'bg-red-500 ring-red-500/20' },
    { id: 5, top: '48%', left: '60%', color: 'bg-blue-500 ring-blue-500/20' },
    { id: 6, top: '75%', left: '32%', color: 'bg-gray-400 ring-gray-400/20' },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col justify-between min-h-[460px] shadow-[0_2px_12px_rgba(0,0,0,0.01)]" dir="rtl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-extrabold text-gray-800 text-sm tracking-tight">خريطة الحاويات</h3>
      </div>

      <div className="relative flex-1 bg-slate-50 border border-gray-100 rounded-2xl overflow-hidden group/map">
        {/* أزرار التحكم بالخريطة الجانبية */}
        <div className="absolute top-4 right-4 flex flex-col gap-1.5 z-10">
          <button className="w-8 h-8 bg-white border border-gray-100 font-bold rounded-lg flex items-center justify-center text-sm text-gray-500 hover:bg-gray-50">+</button>
          <button className="w-8 h-8 bg-white border border-gray-100 font-bold rounded-lg flex items-center justify-center text-sm text-gray-500 hover:bg-gray-50">-</button>
          <button className="w-8 h-8 bg-white border border-gray-100 rounded-lg flex items-center justify-center text-sm text-gray-500 hover:bg-gray-50 mt-1">🎯</button>
        </div>

        {/* شبكة الطرق التوضيحية */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#bcdeb5_1px,transparent_1px),linear-gradient(to_bottom,#bcdeb5_1px,transparent_1px)] bg-[size:40px_40px]"></div>

        {/* توزيع الحاويات الملونة بناءً على حالتها كالصورة تماماً */}
        {pins.map((pin) => (
          <div key={pin.id} style={{ top: pin.top, left: pin.left }} className="absolute z-10 cursor-pointer group/pin">
            <span className={`w-7 h-7 rounded-full text-white flex items-center justify-center text-[10px] font-black shadow border-2 border-white transition-all group-hover/pin:scale-110 ${pin.color} ring-4`}>
              🗑️
            </span>
          </div>
        ))}

        {/* دليل مفتاح الخريطة السفلي */}
        <div className="absolute bottom-4 right-4 left-4 bg-white/95 backdrop-blur border border-gray-100 p-2.5 rounded-xl flex justify-center items-center gap-5 text-[10px] font-black text-gray-500 shadow-sm">
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></span> فارغة</div>
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-amber-400 rounded-full"></span> متوسطة</div>
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-red-500 rounded-full"></span> ممتلئة</div>
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-blue-500 rounded-full"></span> قيد التفريغ</div>
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-gray-400 rounded-full"></span> غير نشطة</div>
        </div>
      </div>
    </div>
  );
};

export default BinsMapSection;
