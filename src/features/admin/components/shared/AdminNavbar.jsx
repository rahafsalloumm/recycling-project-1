export default function AdminNavbar() {
  return (
    <header className="bg-white shadow flex justify-between items-center p-4">
      <div>
        <h1 className="text-xl font-bold">مرحباً Admin 👋</h1>
        <p className="text-gray-500">إدارة النفايات الذكية وإعادة التدوير</p>
      </div>
      <div className="flex items-center gap-4">
        <img src="https://ui-avatars.com/api/?name=Admin" className="w-10 h-10 rounded-full" />
        <span className="text-gray-600">مدير النظام</span>
      </div>
    </header>
  );
}