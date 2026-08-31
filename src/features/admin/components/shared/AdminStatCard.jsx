
export default function AdminStatCard(props) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between min-h-[125px] cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:border-emerald-500">
      <div className="flex justify-between items-start w-full mb-4">
        <span className="text-xs font-bold text-gray-400">{props.title}</span>
        <div className={"p-2.5 rounded-xl text-base flex items-center justify-center " + props.iconBg}>
          {props.icon}
        </div>
      </div>
      <div className="mt-2 text-right">
        <h2 className="text-2xl font-extrabold text-gray-800 tracking-tight">{props.value}</h2>
        <span className={"text-[10px] font-bold px-1.5 py-0.5 rounded " + props.descColor}>
          {props.desc}
        </span>
      </div>
    </div>
  );
}