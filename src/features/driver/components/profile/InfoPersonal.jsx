import {  useState  } from 'react';
import { FiUser, FiMail, FiPhone, FiCalendar, FiMapPin, FiCreditCard, FiEdit3, FiX, FiCheck } from 'react-icons/fi';

const InfoPersonal = () => {
  // 💡 الحالات الجاهزة للربط مع الباك إند: يمكنك جلبها بـ useEffect لاحقاً وتعديلها هنا
  const [personalData, setPersonalData] = useState({
    name: 'أحمد محمد السائق',
    email: 'ahmed.driver@ecocycle.com',
    phone: '+963 91 123 4567',
    birthday: '1992-05-15',
    address: 'حلب، سوريا',
    nationalId: '9631051234',
    joinDate: '2023-02-10'
  });

  // حالة التحكم بفتح وإغلاق منبثق التعديل
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  // حالة مؤقتة لتخزين المدخلات أثناء الكتابة وقبل الحفظ النهائي
  const [formData, setFormData] = useState({ ...personalData });

  // دالة التعامل مع تغيير المدخلات
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ⚡ دالة الحفظ المجهزة للربط الكلي مع الباك إند (Axios / Fetch)
  const handleSaveChanges = (e) => {
    e.preventDefault();
    console.log("جاري إرسال البيانات المحدثة إلى الباك إند:", formData);
    
    // هنا يتم وضع كود الـ API الخاص بك لحفظ التعديلات في السيرفر، مثلاً:
    // axios.put('/api/driver/profile', formData).then(...)
    
    setPersonalData({ ...formData }); // تحديث الواجهة بالبيانات الجديدة
    setIsEditModalOpen(false); // إغلاق المنبثق
  };

  const details = [
    { icon: <FiUser />, label: 'الاسم الكامل', value: personalData.name },
    { icon: <FiMail />, label: 'البريد الإلكتروني', value: personalData.email, isSans: true },
    { icon: <FiPhone />, label: 'رقم الهاتف', value: personalData.phone, isSans: true },
    { icon: <FiCalendar />, label: 'تاريخ الميلاد', value: personalData.birthday, isSans: true },
    { icon: <FiMapPin />, label: 'العنوان', value: personalData.address },
    { icon: <FiCreditCard />, label: 'رقم الهوية', value: personalData.nationalId, isSans: true },
    { icon: <FiCalendar />, label: 'تاريخ الانضمام', value: personalData.joinDate, isSans: true },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.01)] flex flex-col justify-between min-h-[380px]" dir="rtl">
      <div>
        <h3 className="font-extrabold text-gray-400 text-xs tracking-wide mb-4 text-right">المعلومات الشخصية</h3>
        
        {/* قائمة عرض البيانات */}
        <div className="space-y-1">
          {details.map((item, index) => (
            <div key={index} className="flex justify-between items-center py-2.5 border-b border-gray-50 last:border-0 hover:bg-gray-50/30 px-2 rounded-xl transition-colors group">
              <div className="flex items-center gap-3 text-gray-400 text-sm group-hover:text-emerald-700 transition-colors">
                {item.icon}
                <span className="text-xs font-bold text-gray-400 group-hover:text-gray-500">{item.label}</span>
              </div>
              <span className={`text-xs font-extrabold text-slate-800 ${item.isSans ? 'font-sans' : ''}`}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* زر فتح منبثق التعديل */}
      <button 
        onClick={() => {
          setFormData({ ...personalData }); // إعادة تعيين الحقول ببيانات السائق الحالية عند الفتح
          setIsEditModalOpen(true);
        }}
        className="w-fit mr-auto text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1.5 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100/50 shadow-sm transition-all active:scale-95 mt-4"
      >
        <FiEdit3 className="text-xs" /> تعديل المعلومات الشخصية
      </button>

      {/* --------------------------------------------------------------------------------- */}
      {/* 📥 🛸 نافذة منبثق تعديل البيانات (Edit Profile Modal) بتصميم فسيح ومطابق للتصميم */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative border border-gray-100 flex flex-col gap-5 max-h-[90vh] overflow-y-auto">
            
            {/* زر الإغلاق العلوي */}
            <button 
              onClick={() => setIsEditModalOpen(false)} 
              className="absolute top-4 left-4 p-1.5 rounded-lg text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors"
            >
              <FiX className="text-lg" />
            </button>
            
            {/* هيدر المنبثق */}
            <div className="text-right border-b border-gray-50 pb-3">
              <h3 className="text-sm font-black text-gray-800 flex items-center gap-2">
                <FiEdit3 className="text-emerald-600" /> تعديل بيانات السائق
              </h3>
              <p className="text-[10px] text-gray-400 font-medium mt-1">تحديث الحقول والبيانات الشخصية المسجلة على النظام</p>
            </div>

            {/* فورم الحقول والمدخلات الفسيحة */}
            <form onSubmit={handleSaveChanges} className="space-y-4 text-right">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-400">الاسم الكامل</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2 px-3 text-xs font-bold text-gray-700 focus:outline-none focus:border-emerald-500/50 focus:bg-white transition-all shadow-inner" required />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-400">البريد الإلكتروني</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2 px-3 text-xs font-bold text-gray-700 focus:outline-none focus:border-emerald-500/50 focus:bg-white transition-all font-sans shadow-inner" required />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-400">رقم الهاتف</label>
                  <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2 px-3 text-xs font-bold text-gray-700 focus:outline-none focus:border-emerald-500/50 focus:bg-white transition-all font-sans shadow-inner" required />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-400">تاريخ الميلاد</label>
                  <input type="date" name="birthday" value={formData.birthday} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2 px-3 text-xs font-bold text-gray-700 focus:outline-none focus:border-emerald-500/50 focus:bg-white transition-all font-sans shadow-inner" required />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[11px] font-bold text-gray-400">العنوان الحلي</label>
                  <input type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2 px-3 text-xs font-bold text-gray-700 focus:outline-none focus:border-emerald-500/50 focus:bg-white transition-all shadow-inner" required />
                </div>

              </div>

              {/* أزرار التحكم السفلية (حفظ / إلغاء) بمسافات عريضة */}
              <div className="flex justify-end gap-3 border-t border-gray-50 pt-4 mt-6">
                <button 
                  type="button" 
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-gray-500 bg-gray-50 border border-gray-200/70 hover:bg-gray-100 transition-colors"
                >
                  إلغاء
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/10 flex items-center gap-1.5 transition-colors"
                >
                  <FiCheck /> حفظ التغييرات
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default InfoPersonal;
