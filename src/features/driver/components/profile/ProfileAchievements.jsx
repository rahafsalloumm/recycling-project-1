import { FiAward } from 'react-icons/fi';

const ProfileAchievements = () => {
  const badges = [
    { label: 'سائق ملتزم', sub: '100 مهمة', color: 'bg-emerald-50 text-emerald-600 border-emerald-100', icon: '🎖️' },
    { label: 'النجم الذهبي', sub: '200 مهمة', color: 'bg-blue-50 text-blue-600 border-blue-100', icon: '🌟' },
    { label: 'البطل البيئي', sub: '500 مهمة', color: 'bg-purple-50 text-purple-600 border-purple-100', icon: '🏆' },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.01)] flex flex-col justify-between" dir="rtl">
      <div className="flex items-center gap-2 text-slate-800 mb-4">
        <FiAward className="text-lg stroke-[2.5] text-emerald-700" />
        <h3 className="font-extrabold text-sm tracking-tight">الإنجازات</h3>
      </div>

      <div className="grid grid-cols-3 gap-2.5 text-center">
        {badges.map((b, index) => (
          <div key={index} className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all duration-300 hover:scale-105 ${b.color}`}>
            <span className="text-2xl">{b.icon}</span>
            <p className="text-[10px] font-black tracking-tight whitespace-nowrap">{b.label}</p>
            <p className="text-[9px] opacity-60 font-medium font-sans">{b.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileAchievements;
