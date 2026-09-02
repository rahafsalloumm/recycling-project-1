import { useState } from "react";
import { FaEdit, FaTrash, FaEye, FaTimes, FaShoppingBag, FaTint, FaSeedling, FaLeaf, FaBoxOpen, FaCoffee, FaTrashRestore, FaSolarPanel, FaSave, FaBoxes, FaCoins, FaHistory, FaUser } from "react-icons/fa";

export default function RewardsTable({onToggleStatus }) {
  // 💡 مصفوفة المكافآت الثمانية العينية الموحدة والمدعومة بالأيقونات للتوصيل الميداني مع السائق
  const demoRewards = [
    { id: 1, icon: <FaShoppingBag className="text-pink-600" />, name: "شنطة قماش صديقة للبيئة", category: "منتجات بيئية بديلة", points: 900, stock: 145, claimed: 1420, status: true },
    { id: 2, icon: <FaTint className="text-blue-500" />, name: "زجاجة miah (ستانلس ستيل) مخصصة", category: "منتجات بيئية بديلة", points: 800, stock: 80, claimed: 298, status: true },
    { id: 3, icon: <FaSeedling className="text-emerald-600" />, name: "نبتة منزلية طبيعية أنيقة لتنقية الهواء", category: "منتجات بيئية بديلة", points: 1200, stock: 120, claimed: 340, status: true },
    { id: 4, icon: <FaLeaf className="text-emerald-500" />, name: "طقم بذور زراعية سريعة النمو", category: "منتجات بيئية بديلة", points: 1100, stock: 45, claimed: 115, status: true },
    { id: 5, icon: <FaBoxOpen className="text-amber-600" />, name: "صندوق سماد عضوي للحدائق المنزلية", category: "منتجات بيئية بديلة", points: 1400, stock: 150, claimed: 2450, status: true },
    { id: 6, icon: <FaCoffee className="text-yellow-700" />, name: "كوب (ماج) حراري حافظ للحرارة والبرودة", category: "منتجات بيئية بديلة", points: 1000, stock: 200, claimed: 510, status: true },
    { id: 7, icon: <FaTrashRestore className="text-teal-600" />, name: "طقم أكياس فرز منزلية ملونة", category: "منتجات بيئية بديلة", points: 600, stock: 310, claimed: 840, status: true },
    { id: 8, icon: <FaSolarPanel className="text-cyan-500" />, name: "شاحن طاقة شمسية محمول للأجهزة", category: "منتجات بيئية بديلة", points: 3500, stock: 15, claimed: 42, status: true }
  ];
  // جعل الجدول يقرأ من المصفوفة العينية مباشرة لفرض التحديث البصري فوراً
  const [localRewards, setLocalRewards] = useState(demoRewards);
  
  // حالات فتح النوافذ المنبثقة
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedReward, setSelectedRoute] = useState(null);

  const handleOpenDetails = (reward) => { setSelectedRoute(reward); setIsDetailsOpen(true); };
  const handleOpenEdit = (reward) => { setSelectedRoute({ ...reward }); setIsEditOpen(true); };

  const handleSaveEditSubmit = (e) => {
    e.preventDefault();
    setLocalRewards(localRewards.map(r => r.id === selectedReward.id ? selectedReward : r));
    setIsEditOpen(false);
  };

  const handleLocalToggle = (id) => {
    setLocalRewards(localRewards.map(r => r.id === id ? { ...r, status: !r.status } : r));
    if (onToggleStatus) onToggleStatus(id);
  };
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden text-right transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
      <div className="overflow-x-auto">
        <table className="w-full text-right border-collapse">
          <thead>
            <tr className="bg-gray-50/70 border-b border-gray-100 text-gray-400 text-sm font-bold tracking-wide select-none">
              <th className="py-4 px-6 text-center w-16">#</th>
              <th className="py-4 px-6">الحافز الخدمي</th>
              <th className="py-4 px-6">فئة التصنيف</th>
              <th className="py-4 px-6 text-center">النقاط المطلوبة</th>
              <th className="py-4 px-6 text-center">المخزون</th>
              <th className="py-4 px-6 text-center">مرات الاسترداد</th>
              <th className="py-4 px-6 text-center">حالة الإتاحة</th>
              <th className="py-4 px-6 text-center w-28">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-50 text-gray-700 font-medium">
            {localRewards.map((reward, index) => (
              <tr key={reward.id} className="hover:bg-gray-50/40 transition-colors duration-200 group">
                <td className="py-4 px-6 text-center font-bold text-gray-400 text-base">{index + 1}</td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl bg-gray-50 p-1.5 rounded-xl border border-gray-100 shadow-inner flex-shrink-0 select-none group-hover:bg-emerald-50 transition-colors flex items-center justify-center">
                      {reward.icon}
                    </span>
                    <span className="font-bold text-gray-900 group-hover:text-emerald-700 transition-colors duration-150 text-[14px]">{reward.name}</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-gray-500 font-semibold">{reward.category}</td>
                <td className="py-4 px-6 text-center font-bold text-emerald-600 font-mono text-base">{reward.points}</td>
                <td className="py-4 px-6 text-center font-bold text-gray-500 font-mono text-base">{reward.stock}</td>
                <td className="py-4 px-6 text-center font-black text-gray-800 font-mono text-base">{reward.claimed}</td>
                <td className="py-4 px-6 text-center">
                  <div onClick={() => handleLocalToggle(reward.id)} className="inline-flex items-center justify-center cursor-pointer select-none">
                    <div className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-300 ${reward.status ? "bg-emerald-500" : "bg-gray-300"}`}>
                      <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 transform ${reward.status ? "translate-x-[-16px]" : "translate-x-0"}`}></div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 text-center">
                  <div className="flex items-center justify-center gap-1.5 opacity-90">
                    <button type="button" onClick={() => handleOpenDetails(reward)} className="p-2.5 rounded-xl text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 active:scale-90 transition-all duration-150 cursor-pointer" title="عرض"><FaEye className="text-sm" /></button>
                    <button type="button" onClick={() => handleOpenEdit(reward)} className="p-2.5 rounded-xl text-gray-400 hover:text-blue-600 hover:bg-blue-50 active:scale-90 transition-all duration-150 cursor-pointer" title="تعديل"><FaEdit className="text-sm" /></button>
                    <button type="button" className="p-2.5 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 active:scale-90 transition-all duration-150 cursor-pointer" title="حذف"><FaTrash className="text-sm" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* 👁️ منبثقة تفاصيل تقرير أداء المكافأة وسجل المستفيدين (العين) */}
      {isDetailsOpen && selectedReward && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative border border-gray-100 flex flex-col space-y-4 max-h-[85vh] overflow-y-auto">
            <button type="button" onClick={() => setIsDetailsOpen(false)} className="absolute top-5 left-5 p-2 rounded-xl text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors cursor-pointer"><FaTimes className="text-base" /></button>
            <div className="flex items-center gap-2.5 border-b border-gray-100 pb-3">
              <div className="bg-emerald-50 p-2.5 rounded-xl text-emerald-600 flex items-center justify-center text-lg">{selectedReward.icon}</div>
              <div className="text-right">
                <h3 className="text-sm font-black text-gray-800">{selectedReward.name}</h3>
                <p className="text-[11px] text-gray-400 mt-0.5">تقرير معدلات الطلب والنشاط الميداني للحافز</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-right">
              <div className="bg-gray-50/70 p-3 rounded-xl border border-gray-100/60">
                <span className="text-[10px] text-gray-400 font-bold block">📦 المخزون الحالي بالمستودع</span>
                <span className="text-sm font-mono font-black text-gray-700">{selectedReward.stock} قطعة</span>
              </div>
              <div className="bg-gray-50/70 p-3 rounded-xl border border-gray-100/60">
                <span className="text-[10px] text-gray-400 font-bold block">🔥 إجمالي الموزع الكلي</span>
                <span className="text-sm font-mono font-black text-emerald-700">{selectedReward.claimed} عملية استبدال</span>
              </div>
            </div>
            <div className="space-y-2 text-right">
              <h4 className="text-xs font-black text-gray-500 flex items-center gap-1.5"><FaHistory className="text-[11px]" /> آخر طلبات استبدال المستخدمين ميدانياً</h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center bg-gray-50/50 p-2.5 rounded-xl border border-gray-100"><span className="text-gray-700 font-bold flex items-center gap-1.5"><FaUser className="text-gray-400 text-[10px]" /> رهف سلوم (تم التوصيل مع السائق)</span><span className="text-gray-400 font-mono">منذ ساعتين</span></div>
                <div className="flex justify-between items-center bg-gray-50/50 p-2.5 rounded-xl border border-gray-100"><span className="text-gray-700 font-bold flex items-center gap-1.5"><FaUser className="text-gray-400 text-[10px]" /> أحمد محمد (قيد الشحن بالشاحنة)</span><span className="text-amber-600 font-bold">نشط حالياً</span></div>
              </div>
            </div>
            <div className="pt-2 border-t border-gray-100 flex justify-end">
              <button type="button" onClick={() => setIsDetailsOpen(false)} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-xl py-2 text-xs font-bold cursor-pointer">إغلاق لوحة التقرير</button>
            </div>
          </div>
        </div>
      )}

      {/* 🔮 منبثقة تعديل مخزون ونقاط الحافز (القلم) */}
      {isEditOpen && selectedReward && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative border border-gray-100 flex flex-col space-y-4 max-h-[85vh] overflow-y-auto">
            <button type="button" onClick={() => setIsEditOpen(false)} className="absolute top-5 left-5 p-2 rounded-xl text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors cursor-pointer"><FaTimes className="text-base" /></button>
            <div className="flex items-center gap-2.5 border-b border-gray-100 pb-2">
              <div className="bg-emerald-50 p-2.5 rounded-xl text-emerald-600 flex items-center justify-center text-lg">{selectedReward.icon}</div>
              <div className="text-right">
                <h3 className="text-sm font-black text-gray-800">تعديل معطيات ومخزون الحافز</h3>
                <p className="text-[11px] text-gray-400 mt-0.5">تحديث الكمية المتاحة وتكلفة النقاط المطلوبة</p>
              </div>
            </div>
            <form onSubmit={handleSaveEditSubmit} className="space-y-4 text-right">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 flex items-center gap-1.5"><FaBoxes className="text-[10px] text-emerald-600" /> اسم الحافز العيني</label>
                <input type="text" value={selectedReward.name} onChange={(e) => setSelectedRoute({ ...selectedReward, name: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-bold text-gray-700 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 focus:bg-white transition-all shadow-2xs" required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-gray-500 font-bold flex items-center gap-1"><FaCoins className="text-[10px] text-emerald-600" /> النقاط المطلوبة</label>
                  <input type="number" value={selectedReward.points} onChange={(e) => setSelectedRoute({ ...selectedReward, points: parseInt(e.target.value) })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-gray-700 focus:outline-none font-mono" required />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-gray-500 font-bold flex items-center gap-1"><FaBoxes className="text-[10px] text-emerald-600" /> المخزون المتاح</label>
                  <input type="number" value={selectedReward.stock} onChange={(e) => setSelectedRoute({ ...selectedReward, stock: parseInt(e.target.value) })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-gray-700 focus:outline-none font-mono" required />
                </div>
              </div>
              <div className="flex items-center gap-3 pt-2 border-t border-gray-100 mt-4">
                <button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl py-2.5 text-xs font-black flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.98] transition-all cursor-pointer"><FaSave /> حفظ التعديلات</button>
                <button type="button" onClick={() => setIsEditOpen(false)} className="bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-xl px-4 py-2.5 text-xs font-bold cursor-pointer">إلغاء</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
