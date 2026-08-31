import { FiHome, FiTrash2, FiChevronRight, FiChevronLeft, FiMapPin } from 'react-icons/fi';

const HistoryTable = () => {
  const historyData = [
    { id: '#098', type: 'home', title: 'استلام من منزل', loc: 'حي الياسمين - شارع 8 المنزل رقم 25', date: '2024-05-20', start: '08:15 AM', end: '08:45 AM', duration: '30 دقيقة', status: 'مكتملة', statusColor: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
    { id: '#097', type: 'bin', title: 'تفريغ حاوية ذكية', loc: 'شارع الجامعة - مقابل المكتبة BIN-045', date: '2024-05-20', start: '07:30 AM', end: '07:50 AM', duration: '20 دقيقة', status: 'مكتملة', statusColor: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
    { id: '#096', type: 'home', title: 'استلام من منزل', loc: 'حي الزهور - شارع 12 المنزل رقم 47', date: '2024-05-20', start: '07:00 AM', end: '07:25 AM', duration: '25 دقيقة', status: 'مكتملة', statusColor: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
    { id: '#095', type: 'bin', title: 'تفريغ حاوية ذكية', loc: 'شارع النور - بجانب الحديقة BIN-078', date: '2024-05-19', start: '06:30 AM', end: '06:50 AM', duration: '20 دقيقة', status: 'مكتملة', statusColor: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
    { id: '#094', type: 'home', title: 'استلام من منزل', loc: 'حي الحدائق - شارع 3 المنزل رقم 9', date: '2024-05-19', start: '05:45 AM', end: '06:15 AM', duration: '30 دقيقة', status: 'قيد التنفيذ', statusColor: 'bg-blue-50 text-blue-600 border-blue-100' },
    { id: '#093', type: 'bin', title: 'تفريغ حاوية ذكية', loc: 'حي الياسمين - شارع 6 BIN-112', date: '2024-05-19', start: '05:00 AM', end: '05:15 AM', duration: '15 دقيقة', status: 'ملغاة', statusColor: 'bg-red-50 text-red-600 border-red-100' },
    { id: '#092', type: 'home', title: 'استلام من منزل', loc: 'حي النور - شارع 5 المنزل رقم 16', date: '2024-05-19', start: '04:30 AM', end: '04:55 AM', duration: '25 دقيقة', status: 'مكتملة', statusColor: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
    { id: '#091', type: 'bin', title: 'تفريغ حاوية ذكية', loc: 'شارع الاستقلال - محطة الباص BIN-032', date: '2024-05-19', start: '04:00 AM', end: '04:50 AM', duration: '50 دقيقة', status: 'مكتملة', statusColor: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.01)]" dir="rtl">
      <div className="overflow-x-auto">
        <table className="w-full text-right border-collapse">
          <thead>
            <tr className="border-b border-gray-100 text-[11px] text-gray-400 font-extrabold tracking-wider bg-gray-50/50 rounded-xl">
              <th className="py-3.5 px-4 rounded-r-xl">رقم المهمة</th>
              <th className="py-3.5 px-4">نوع المهمة</th>
              <th className="py-3.5 px-4">الموقع / العنوان</th>
              <th className="py-3.5 px-4">التاريخ</th>
              <th className="py-3.5 px-4">وقت البداية</th>
              <th className="py-3.5 px-4">وقت الانتهاء</th>
              <th className="py-3.5 px-4">المدة</th>
              <th className="py-3.5 px-4">الحالة</th>
              <th className="py-3.5 px-4 rounded-l-xl text-center">التفاصيل</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-xs font-bold text-gray-700">
            {historyData.map((item, index) => (
              <tr 
                key={index} 
                // 💡 تفعيل تأثير الـ Hover الأخضر الناعم المخصص مع الحافة الجانبية عند تأشير الماوس
                className="transition-all duration-150 cursor-pointer border-r-4 border-transparent hover:bg-emerald-50/50 hover:border-emerald-600 group"
              >
                <td className="py-4 px-4 font-sans text-emerald-700 tracking-wide group-hover:font-black">{item.id}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2 text-gray-500 group-hover:text-emerald-800">
                    <span className="text-sm">{item.type === 'home' ? <FiHome /> : <FiTrash2 />}</span>
                    <span className="text-xs">{item.title}</span>
                  </div>
                </td>
                <td className="py-4 px-4 max-w-[200px] truncate text-gray-700 font-medium">
                  <div className="flex items-center gap-1">
                    <FiMapPin className="text-gray-300 group-hover:text-emerald-500 shrink-0" />
                    <span className="truncate">{item.loc}</span>
                  </div>
                </td>
                <td className="py-4 px-4 font-sans text-gray-400 font-medium">
                  <p>{item.date}</p>
                  <p className="text-[9px] text-gray-300 mt-0.5">{index < 3 ? 'اليوم' : 'أمس'}</p>
                </td>
                <td className="py-4 px-4 font-sans text-gray-500 font-medium">{item.start}</td>
                <td className="py-4 px-4 font-sans text-gray-500 font-medium">{item.end}</td>
                <td className="py-4 px-4 font-sans text-gray-500 font-bold flex items-center gap-1 mt-1"><span className="text-[10px] text-gray-400">⏱️</span> {item.duration}</td>
                <td className="py-4 px-4">
                  <span className={`text-[10px] font-black px-2.5 py-1 rounded-xl border tracking-wide block w-fit min-w-[75px] text-center ${item.statusColor}`}>
                    {item.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-center">
                  <button className="text-[10px] font-bold text-gray-500 bg-gray-50 hover:bg-emerald-600 hover:text-white px-3 py-1.5 rounded-lg border border-gray-200 transition-all active:scale-95 group-hover:border-emerald-600">
                    عرض
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* شريط الترقيم والترتيب السفلي المتطابق مع الصورة */}
      <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-50 text-xs font-bold text-gray-400">
        <span className="text-[11px] font-medium">عرض 1 إلى 8 من أصل 98 مهمة</span>
        
        <div className="flex items-center gap-1 font-sans">
          <button className="w-7 h-7 border border-gray-100 rounded-lg flex items-center justify-center bg-gray-50 text-gray-400 hover:bg-gray-100"><FiChevronRight /></button>
          <button className="w-7 h-7 bg-emerald-600 text-white rounded-lg flex items-center justify-center shadow-sm">1</button>
          <button className="w-7 h-7 border border-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-50 text-gray-600">2</button>
          <button className="w-7 h-7 border border-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-50 text-gray-600">3</button>
          <span className="px-1 text-gray-300">...</span>
          <button className="w-7 h-7 border border-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-50 text-gray-600">12</button>
          <button className="w-7 h-7 border border-gray-100 rounded-lg flex items-center justify-center bg-gray-50 text-gray-400 hover:bg-gray-100"><FiChevronLeft /></button>
        </div>
      </div>
    </div>
  );
};

export default HistoryTable;
