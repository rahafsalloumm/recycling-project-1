
export default function AdminCharts({ chartData = [] }) {
  const values = chartData.length
    ? chartData.map((item) => Number(item.requestsCount || 0))
    : [4, 6, 8, 5, 7, 9];

  const maxValue = Math.max(...values, 1);

  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-full">
      <h3 className="text-base font-bold text-gray-800 mb-2">الطلبات خلال الأشهر</h3>
      <div className="h-40 flex items-end justify-between border-b border-l border-gray-100 pb-2 px-2 gap-2">
        {chartData.length ? (
          chartData.map((item, index) => {
            const height = maxValue === 0 ? 0 : `${(Number(item.requestsCount || 0) / maxValue) * 100}%`;
            const barColor = index % 2 === 0 ? "bg-emerald-500" : "bg-emerald-600";

            return (
              <div key={`${item.month}-${index}`} className="flex w-full flex-col items-center justify-end gap-2">
                <div className={`w-full rounded-t ${barColor}`} style={{ height }}></div>
                <span className="text-[10px] text-gray-400 font-medium">{item.month}</span>
              </div>
            );
          })
        ) : (
          [1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="flex w-full flex-col items-center justify-end gap-2">
              <div className={`w-full rounded-t ${item % 2 === 0 ? "bg-emerald-600" : "bg-emerald-500"}`} style={{ height: `${(item / 6) * 100}%` }}></div>
              <span className="text-[10px] text-gray-400 font-medium">شهر {item}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}