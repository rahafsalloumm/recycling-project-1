import { useState } from 'react';
import { FiUser, FiMail, FiPhone, FiCalendar, FiMapPin, FiCreditCard, FiEdit3, FiX, FiCheck } from 'react-icons/fi';
import driverService from '@/services/driver';

const formatDate = (value) => {
  if (!value) {
    return '—';
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '—' : date.toISOString().slice(0, 10);
};

const getAddressFields = (address) => {
  if (address && typeof address === 'object') {
    return {
      city: address.city ?? '',
      street: address.street ?? '',
    };
  }

  return {
    city: '',
    street: address ?? '',
  };
};

const getPersonalData = (profile) => {
  const addressFields = getAddressFields(profile?.address);
  const address = [addressFields.city, addressFields.street].filter(Boolean).join(' - ');

  return {
    name: profile?.name ?? '',
    email: profile?.email ?? '',
    phone: profile?.phone ?? '',
    birthday: profile?.birthDate ? String(profile.birthDate).slice(0, 10) : '',
    address,
    ...addressFields,
    nationalId: profile?.nationalId ?? '',
    joinDate: profile?.createdAt ? formatDate(profile.createdAt) : '',
  };
};

const InfoPersonal = ({ profile, onProfileUpdated }) => {
  // حالة التحكم بفتح وإغلاق منبثق التعديل
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [saveError, setSaveError] = useState('');
  
  // حالة مؤقتة لتخزين المدخلات أثناء الكتابة وقبل الحفظ النهائي
  const personalData = getPersonalData(profile);
  const [formData, setFormData] = useState(getPersonalData(null));

  // دالة التعامل مع تغيير المدخلات
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    const city = formData.city.trim();
    const street = formData.street.trim();

    if (!city || !street) {
      setSaveMessage('');
      setSaveError('يرجى إدخال المدينة والشارع قبل حفظ البيانات.');
      return;
    }

    const updatedFields = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      birthDate: formData.birthday,
      address: {
        city,
        street,
      },
    };

    setIsSaving(true);
    setSaveMessage('');
    setSaveError('');
    try {
      await driverService.updateProfile(updatedFields);
      const response = await driverService.getProfile();
      onProfileUpdated(response.data?.user || updatedFields);
      setSaveMessage('تم حفظ بيانات الملف الشخصي بنجاح.');
      setIsEditModalOpen(false);
    } catch (error) {
      const status = error.response?.status;
      const responseMessage = Array.isArray(error.response?.data)
        ? error.response.data[0]
        : error.response?.data?.message;
      if (status === 400) {
        setSaveError(responseMessage || 'يرجى مراجعة البيانات المدخلة.');
      } else if (status === 401) {
        setSaveError('انتهت صلاحية تسجيل الدخول أو أن بيانات الدخول غير صحيحة.');
      } else if (status === 403) {
        setSaveError('لا تملك الصلاحية لتعديل هذه البيانات.');
      } else {
        setSaveError(responseMessage || 'تعذر حفظ بيانات الملف الشخصي.');
      }
      console.error('Failed to update driver profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const details = [
    { icon: <FiUser />, label: 'الاسم الكامل', value: personalData.name },
    { icon: <FiMail />, label: 'البريد الإلكتروني', value: personalData.email, isSans: true },
    { icon: <FiPhone />, label: 'رقم الهاتف', value: personalData.phone, isSans: true },
    { icon: <FiCalendar />, label: 'تاريخ الميلاد', value: personalData.birthday || '—', isSans: true },
    { icon: <FiMapPin />, label: 'العنوان', value: personalData.address },
    { icon: <FiCreditCard />, label: 'رقم الهوية', value: personalData.nationalId, isSans: true },
    { icon: <FiCalendar />, label: 'تاريخ الانضمام', value: personalData.joinDate || '—', isSans: true },
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
          setSaveMessage('');
          setSaveError('');
          setIsEditModalOpen(true);
        }}
        className="w-fit mr-auto text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1.5 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100/50 shadow-sm transition-all active:scale-95 mt-4"
      >
        <FiEdit3 className="text-xs" /> تعديل المعلومات الشخصية
      </button>
      {saveMessage && <p className="mt-3 text-xs font-bold text-emerald-600" role="status">{saveMessage}</p>}
      {saveError && <p className="mt-3 text-xs font-bold text-red-600" role="alert">{saveError}</p>}

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

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-400">المدينة</label>
                  <input type="text" name="city" value={formData.city} onChange={handleInputChange} required className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2 px-3 text-xs font-bold text-gray-700 focus:outline-none focus:border-emerald-500/50 focus:bg-white transition-all shadow-inner" />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-400">الشارع</label>
                  <input type="text" name="street" value={formData.street} onChange={handleInputChange} required className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2 px-3 text-xs font-bold text-gray-700 focus:outline-none focus:border-emerald-500/50 focus:bg-white transition-all shadow-inner" />
                </div>

              </div>

              {/* أزرار التحكم السفلية (حفظ / إلغاء) بمسافات عريضة */}
              <div className="flex justify-end gap-3 border-t border-gray-50 pt-4 mt-6">
                <button 
                  type="button" 
                  onClick={() => setIsEditModalOpen(false)}
                  disabled={isSaving}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-gray-500 bg-gray-50 border border-gray-200/70 hover:bg-gray-100 transition-colors"
                >
                  إلغاء
                </button>
                <button 
                  type="submit"
                  disabled={isSaving}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/10 flex items-center gap-1.5 transition-colors"
                >
                  <FiCheck /> {isSaving ? 'جارٍ الحفظ...' : 'حفظ التغييرات'}
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
