const getStoredUserName = () => {
  const storedUser = localStorage.getItem('user');

  if (!storedUser) {
    return '—';
  }

  try {
    const user = JSON.parse(storedUser);
    return user?.name || '—';
  } catch {
    return '—';
  }
};

const DriverNavbar = () => {
  const userName = getStoredUserName();

  return (
    <header className="bg-white border-b border-gray-100 px-8 py-4 flex justify-between items-center sticky top-0 z-20 shadow-[0_2px_12px_rgba(0,0,0,0.01)]" dir="rtl">
      
      {/* جهة اليمين: الترحيب والاسم */}
      <div className="flex items-center gap-3 group cursor-pointer">
        <div className="text-right">
          <p className="text-[11px] text-gray-400 font-bold leading-none">مرحباً {userName} 👋</p>
          <h2 className="text-xs font-black text-emerald-800 tracking-tight mt-1">أنت على الطريق اليوم</h2>
        </div>
      </div>
      
    </header>
  );
};

export default DriverNavbar;
