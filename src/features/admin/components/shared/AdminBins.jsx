
import { useNavigate } from "react-router-dom";

export default function AdminBins({ bins = [], summary = {} }) {
  const navigate = useNavigate();
  const safeBins = Array.isArray(bins) ? bins : [];

  const binCards = safeBins.length
    ? safeBins.slice(0, 4).map((bin) => {
        const fill = Math.max(0, Math.min(100, Number(bin.fillLevel ?? 0)));
        const status = bin.status || "empty";
        const type = status === "full" ? "ممتلئة" : status === "medium" ? "متوسطة" : status === "inactive" ? "غير فعالة" : "طبيعية";
        const color = status === "full" ? "bg-red-500" : status === "medium" ? "bg-yellow-500" : status === "inactive" ? "bg-gray-400" : "bg-green-500";
        const textColor = status === "full" ? "text-red-600 bg-red-50" : status === "medium" ? "text-yellow-600 bg-yellow-50" : status === "inactive" ? "text-gray-600 bg-gray-100" : "text-green-600 bg-green-50";

        return {
          id: bin.binNumber || bin._id || "BIN",
          name: bin.location || "غير محدد",
          fill: `${fill}%`,
          color,
          textColor,
          type,
        };
      })
    : [];

  const fullBins = Number(summary.fullBinsCount ?? summary.fullBins ?? 0);

  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-bold text-gray-800">الحاويات الذكية بالشوارع</h3>
        <button type="button" onClick={() => navigate("/admin/bins")} className="text-xs font-semibold text-emerald-600 hover:underline">عرض الكل</button>
      </div>
      
      {binCards.length ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {binCards.map(function(bin, idx) {
            return (
              <div key={`${bin.id}-${idx}`} className="border border-gray-100 p-3 rounded-xl flex flex-col items-center bg-gray-50/30 hover:shadow-md transition-shadow">
                <span className="text-[11px] font-bold text-gray-700">{bin.id}</span>
                <p className="text-[9px] text-gray-400 text-center truncate w-full mt-0.5">{bin.name}</p>
                <div className="w-10 h-14 bg-gray-200 rounded-t-lg rounded-b-xl relative my-3 shadow-inner overflow-hidden border border-gray-300">
                  <div className={"absolute bottom-0 w-full " + bin.color} style={{ height: bin.fill.replace("%", "") + "%" }}></div>
                </div>
                <span className="text-sm font-extrabold text-gray-800">{bin.fill}</span>
                <span className={"text-[9px] font-bold px-1.5 py-0.5 rounded mt-1.5 " + bin.textColor}>● {bin.type}</span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-8 text-center text-sm text-gray-500">لا توجد بيانات حاويات متاحة حاليًا.</div>
      )}

      <div className="mt-4 p-2.5 bg-red-50 border border-red-100 text-red-600 text-xs font-bold rounded-xl text-center">
        ⚠️ توجد {fullBins} حاويات ممتلئة بحاجة إلى جمع فوراً!
      </div>
    </div>
  );
}