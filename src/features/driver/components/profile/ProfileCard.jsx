import { useRef, useState } from 'react';
import { FiCheckCircle, FiClock, FiStar, FiCamera } from 'react-icons/fi';
import driverService from '@/services/driver';

const ProfileCard = ({ profile, onProfileImageUpdated }) => {
  const vehicle = profile?.driverProfile?.vehicle;
  const imageUrl = profile?.image?.url;
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');
  const [uploadError, setUploadError] = useState('');

  const handleImageChange = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';

    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setUploadMessage('');
      setUploadError('يرجى اختيار ملف صورة صالح.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);
    setIsUploading(true);
    setUploadMessage('');
    setUploadError('');

    try {
      await driverService.updateProfile(formData);
      const response = await driverService.getProfile();
      onProfileImageUpdated(response.data?.user || {});
      setUploadMessage('تم تحديث صورة الملف الشخصي بنجاح.');
      setUploadError('');
    } catch (error) {
      const status = error.response?.status;
      const responseMessage = Array.isArray(error.response?.data)
        ? error.response.data[0]
        : error.response?.data?.message;
      if (status === 400) {
        setUploadError(responseMessage || 'يرجى اختيار صورة صالحة ضمن الحجم المسموح.');
      } else if (status === 401) {
        setUploadError('انتهت صلاحية تسجيل الدخول أو أن بيانات الدخول غير صحيحة.');
      } else if (status === 403) {
        setUploadError('لا تملك الصلاحية لتغيير صورة الملف الشخصي.');
      } else {
        setUploadError(responseMessage || 'تعذر رفع صورة البروفايل. حاول مرة أخرى.');
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.01)] flex flex-col items-center text-center group hover:shadow-[0_8px_24px_rgba(0,0,0,0.02)] transition-shadow duration-300" dir="rtl">
      
      {/* الصورة الشخصية مع أيقونة الكاميرا التفاعلية للهوفر */}
      <div className="relative w-28 h-28 mb-4">
        <img 
          src={imageUrl || null}
          alt="Driver Avatar" 
          className="w-full h-full rounded-full object-cover ring-4 ring-emerald-500/10 shadow-md group-hover:scale-105 transition-transform duration-300"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          aria-label="تغيير صورة البروفايل"
          className="absolute bottom-1 left-1 bg-emerald-600 text-white p-2 rounded-full border-2 border-white shadow cursor-pointer hover:bg-emerald-700 transition-colors disabled:opacity-60 disabled:cursor-wait"
        >
          <FiCamera className="text-xs" />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>
      {isUploading && <p className="text-[10px] text-emerald-600 font-bold">جارٍ رفع الصورة...</p>}
      {uploadMessage && <p className="text-[10px] text-emerald-600 font-bold" role="status">{uploadMessage}</p>}
      {uploadError && <p className="text-[10px] text-red-600 font-bold">{uploadError}</p>}

      <h2 className="text-base font-black text-gray-800 tracking-tight">{profile?.name || '—'}</h2>
      <p className="text-xs font-bold text-gray-400 mt-0.5">سائق شاحنة رقم {vehicle?.truckNumber || '—'}</p>
      
      {/* شارة متصل المستقرة */}
      <div className="flex items-center gap-1.5 mt-2 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">
        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow shadow-emerald-500"></span>
        <span className="text-[10px] font-black text-emerald-700">متصل</span>
      </div>

      {/* العدادات الموزعة تحت بعضها تماماً كالصورة */}
      <div className="w-full mt-6 space-y-3.5 border-t border-gray-50 pt-5 text-xs font-bold text-gray-600">
        <div className="flex justify-between items-center bg-gray-50/50 px-3 py-2 rounded-xl">
          <span className="text-gray-400 flex items-center gap-2"><FiCheckCircle className="text-emerald-500" /> إجمالي المهام المكتملة</span>
          <span className="font-sans font-black text-slate-800">{profile?.driverProfile?.completedTasks ?? '—'}</span>
        </div>
        <div className="flex justify-between items-center bg-gray-50/50 px-3 py-2 rounded-xl">
          <span className="text-gray-400 flex items-center gap-2"><FiClock className="text-amber-500" /> ساعات العمل</span>
          <span className="font-sans font-black text-slate-800">{profile?.driverProfile?.workingHours ?? '—'} {profile?.driverProfile?.workingHours != null ? 'ساعة' : ''}</span>
        </div>
        <div className="flex justify-between items-center bg-gray-50/50 px-3 py-2 rounded-xl">
          <span className="text-gray-400 flex items-center gap-2"><FiStar className="text-yellow-500 fill-yellow-500" /> تقييم الأداء</span>
          <span className="font-sans font-black text-slate-800 flex items-center gap-1">—</span>
        </div>
      </div>

    </div>
  );
};

export default ProfileCard;
