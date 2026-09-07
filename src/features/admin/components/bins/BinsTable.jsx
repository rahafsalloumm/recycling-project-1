import { useState } from "react";
import { FaEdit, FaTrash, FaEye, FaTimes } from "react-icons/fa";

export default function BinsTable({ bins, totalCount = bins.length, onUpdate, onDelete }) {
  const [selectedBin, setSelectedBin] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [draftLevel, setDraftLevel] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const totalItems = totalCount || bins.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const activePage = Math.min(currentPage, totalPages);
  const visibleBins = bins.slice((activePage - 1) * pageSize, activePage * pageSize);
  const displayFrom = visibleBins.length ? (activePage - 1) * pageSize + 1 : 0;
  const displayTo = displayFrom ? displayFrom + visibleBins.length - 1 : 0;

  const handleOpenDetails = (bin) => {
    setSelectedBin(bin);
    setIsDetailsOpen(true);
  };

  const handleOpenEdit = (bin) => {
    setSelectedBin(bin);
    setDraftLevel(Number(bin.fillLevel) || 0);
    setIsEditOpen(true);
  };

  const handleSaveEdit = (event) => {
    event.preventDefault();
    if (selectedBin && Number(draftLevel) >= 0 && Number(draftLevel) <= 100) {
      onUpdate?.(selectedBin.id, Number(draftLevel));
      setIsEditOpen(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden text-right">
      <div className="overflow-x-auto">
        <table className="w-full text-right border-collapse">
          <thead>
            <tr className="bg-gray-50/70 border-b border-gray-100 text-gray-400 text-sm font-bold tracking-wide select-none">
              <th className="py-4 px-6 text-center w-16">#</th>
              <th className="py-4 px-6">معرف الحاوية</th>
              <th className="py-4 px-6">الموقع</th>
              <th className="py-4 px-6">المنطقة</th>
              <th className="py-4 px-6 text-center w-44">نسبة الامتلاء</th>
              <th className="py-4 px-6 text-center">الحالة</th>
              <th className="py-4 px-6 text-center">آخر تحديث</th>
              <th className="py-4 px-6 text-center w-32">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-50 text-gray-700 font-medium">
            {visibleBins.map((bin, index) => (
              <tr key={bin.id} className="hover:bg-gray-50/40 transition-colors duration-200 group">
                <td className="py-4 px-6 text-center font-bold text-gray-400 text-base">{index + 1}</td>
                <td className="py-4 px-6 font-mono font-bold text-gray-900 text-[14px]">
                  <span className="bg-gray-100 px-2 py-1 rounded-lg border border-gray-200/30">{bin.code}</span>
                </td>
                <td className="py-4 px-6 text-gray-800 font-bold text-[15px]">{bin.location}</td>
                <td className="py-4 px-6 text-gray-500 font-semibold">{bin.region}</td>
                
                <td className="py-4 px-6 text-center">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-black text-gray-700 w-8 text-left">{bin.fillLevel}%</span>
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden shadow-inner">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          bin.fillLevel >= 90 ? "bg-red-500" :
                          bin.fillLevel >= 60 ? "bg-amber-500" : "bg-emerald-500"
                        }`}
                        style={{ width: `${bin.fillLevel}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                
                <td className="py-4 px-6 text-center">
                  <span className={`px-2.5 py-1 rounded-xl font-bold text-xs inline-flex items-center gap-1.5 border ${
                    bin.status === "طبيعية" ? "bg-emerald-50 text-emerald-700 border-emerald-100/50" :
                    bin.status === "بحاجة للجمع" ? "bg-amber-50 text-amber-700 border-amber-100/50" : 
                    "bg-red-50 text-red-600 border-red-100/50"
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      bin.status === "طبيعية" ? "bg-emerald-500" :
                      bin.status === "بحاجة للجمع" ? "bg-amber-500" : "bg-red-500 animate-pulse"
                    }`}></span>
                    {bin.status}
                  </span>
                </td>
                
                <td className="py-4 px-6 text-center text-gray-400 text-xs font-semibold">{bin.lastUpdate}</td>
                
                <td className="py-4 px-6 text-center">
                  <div className="flex items-center justify-center gap-1.5 opacity-90">
                    <button type="button" onClick={() => handleOpenDetails(bin)} className="p-2.5 rounded-xl text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 active:scale-90 transition-all duration-150 cursor-pointer" title="عرض"><FaEye className="text-sm" /></button>
                    <button type="button" onClick={() => handleOpenEdit(bin)} className="p-2.5 rounded-xl text-gray-400 hover:text-blue-600 hover:bg-blue-50 active:scale-90 transition-all duration-150 cursor-pointer" title="تعديل"><FaEdit className="text-sm" /></button>
                    <button type="button" onClick={() => onDelete?.(bin.id)} className="p-2.5 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 active:scale-90 transition-all duration-150 cursor-pointer" title="حذف"><FaTrash className="text-sm" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 bg-gray-50/60 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm text-gray-400 font-bold select-none">
        <div>عرض <span className="text-gray-700 font-black">{displayFrom}</span> إلى <span className="text-gray-700 font-black">{displayTo}</span> من أصل <span className="text-gray-700 font-black">{totalItems}</span> حاوية</div>
        <div className="flex items-center gap-1" dir="ltr">
          <button type="button" disabled={activePage === 1} onClick={() => setCurrentPage((page) => Math.max(1, page - 1))} className="px-2 py-1 rounded bg-white border border-gray-200 text-gray-400 hover:bg-gray-50 disabled:opacity-40">&lt;</button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <button type="button" key={page} onClick={() => setCurrentPage(page)} className={`px-3 py-1 rounded ${activePage === page ? "bg-emerald-600 text-white font-black" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"}`}>{page}</button>
          ))}
          <button type="button" disabled={activePage === totalPages} onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))} className="px-2 py-1 rounded bg-white border border-gray-200 text-gray-400 hover:bg-gray-50 disabled:opacity-40">&gt;</button>
        </div>
      </div>

      {isDetailsOpen && selectedBin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 text-right shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-black text-gray-900">تفاصيل الحاوية</h2>
              <button type="button" onClick={() => setIsDetailsOpen(false)} className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700" aria-label="إغلاق"><FaTimes /></button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl bg-gray-50 p-3"><div className="text-[10px] text-gray-400">رمز الحاوية</div><div className="font-bold">{selectedBin.code}</div></div>
              <div className="rounded-xl bg-gray-50 p-3"><div className="text-[10px] text-gray-400">النسبة</div><div className="font-bold">{selectedBin.fillLevel}%</div></div>
              <div className="rounded-xl bg-gray-50 p-3 sm:col-span-2"><div className="text-[10px] text-gray-400">الموقع</div><div className="font-bold">{selectedBin.location}</div></div>
              <div className="rounded-xl bg-gray-50 p-3"><div className="text-[10px] text-gray-400">المنطقة</div><div className="font-bold">{selectedBin.region}</div></div>
              <div className="rounded-xl bg-gray-50 p-3"><div className="text-[10px] text-gray-400">الحالة</div><div className="font-bold">{selectedBin.status}</div></div>
            </div>
          </div>
        </div>
      )}

      {isEditOpen && selectedBin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
          <form onSubmit={handleSaveEdit} className="w-full max-w-md rounded-2xl bg-white p-6 text-right shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-black text-gray-900">تحديث نسبة الامتلاء</h2>
              <button type="button" onClick={() => setIsEditOpen(false)} className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700" aria-label="إغلاق"><FaTimes /></button>
            </div>
            <label className="block space-y-1 text-sm font-bold text-gray-600">
              <span>نسبة الامتلاء</span>
              <input required type="number" min="0" max="100" value={draftLevel} onChange={(event) => setDraftLevel(event.target.value)} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 outline-none focus:border-emerald-500" />
            </label>
            <button type="submit" className="mt-4 w-full rounded-xl bg-emerald-600 py-3 font-bold text-white">حفظ التغيير</button>
          </form>
        </div>
      )}
    </div>
  );
}
