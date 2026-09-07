
import { useState } from 'react';
import { FiLock, FiX, FiCheck } from 'react-icons/fi';
import driverService from '@/services/driver';

const InfoGrids = ({ profile }) => {
  const license = profile?.driverProfile?.license;
  const vehicle = profile?.driverProfile?.vehicle;
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    setPasswordData((currentData) => ({ ...currentData, [name]: value }));
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    if (passwordData.newPassword.length < 6) {
      setPasswordError('يجب أن تتكون كلمة المرور الجديدة من 6 أحرف على الأقل.');
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('كلمة المرور الجديدة وتأكيدها غير متطابقين.');
      return;
    }

    setIsSavingPassword(true);
    setPasswordMessage('');
    setPasswordError('');
    try {
      const response = await driverService.updateProfile(passwordData);
      setPasswordMessage(response.data?.message || 'تم تغيير كلمة المرور بنجاح.');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setIsPasswordModalOpen(false);
    } catch (error) {
      const status = error.response?.status;
      const responseMessage = Array.isArray(error.response?.data)
        ? error.response.data[0]
        : error.response?.data?.message;
      if (status === 400) {
        setPasswordError(responseMessage || 'يرجى مراجعة بيانات كلمة المرور.');
      } else if (status === 401) {
        setPasswordError('انتهت صلاحية تسجيل الدخول أو أن كلمة المرور الحالية غير صحيحة.');
      } else if (status === 403) {
        setPasswordError('لا تملك الصلاحية لتغيير كلمة المرور.');
      } else {
        setPasswordError(responseMessage || 'تعذر تغيير كلمة المرور حاليًا.');
      }
    } finally {
      setIsSavingPassword(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative" dir="rtl">
      
      {/* 🛠️ 1. كرت الإعدادات */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.01)] hover:shadow-[0_6px_18px_rgba(0,0,0,0.02)] transition-shadow duration-300 min-h-[180px]">
        <div>
          <h4 className="text-xs font-extrabold text-gray-400 tracking-wide mb-4">الإعدادات</h4>
          <div className="space-y-4 text-xs font-bold text-gray-600">
            <button
              type="button"
              onClick={() => {
                setPasswordMessage('');
                setPasswordError('');
                setIsPasswordModalOpen(true);
              }}
              className="w-full flex justify-between items-center py-2 border-b border-gray-50 text-gray-600 hover:text-emerald-600 transition-colors"
            >
              <span className="flex items-center gap-2.5"><FiLock className="text-gray-400" /> تغيير كلمة المرور</span> 
              <span className="text-gray-300">←</span>
            </button>
          </div>
        </div>
      </div>
      {passwordMessage && <p className="text-xs font-bold text-emerald-600">{passwordMessage}</p>}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative" dir="rtl">
            <button
              type="button"
              onClick={() => setIsPasswordModalOpen(false)}
              disabled={isSavingPassword}
              className="absolute top-4 left-4 p-1.5 rounded-lg text-gray-400 hover:bg-gray-50"
              aria-label="إغلاق"
            >
              <FiX />
            </button>
            <h3 className="text-sm font-black text-gray-800 mb-4">تغيير كلمة المرور</h3>
            <form onSubmit={handlePasswordSubmit} className="space-y-3">
              <input type="password" name="currentPassword" value={passwordData.currentPassword} onChange={handlePasswordChange} placeholder="كلمة المرور الحالية" required minLength={6} className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2 px-3 text-xs" />
              <input type="password" name="newPassword" value={passwordData.newPassword} onChange={handlePasswordChange} placeholder="كلمة المرور الجديدة" required minLength={6} className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2 px-3 text-xs" />
              <input type="password" name="confirmPassword" value={passwordData.confirmPassword} onChange={handlePasswordChange} placeholder="تأكيد كلمة المرور الجديدة" required minLength={6} className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2 px-3 text-xs" />
              {passwordError && <p className="text-xs font-bold text-red-600" role="alert">{passwordError}</p>}
              <button type="submit" disabled={isSavingPassword} className="w-full px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 flex items-center justify-center gap-1.5">
                <FiCheck /> {isSavingPassword ? 'جارٍ الحفظ...' : 'حفظ كلمة المرور'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 📄 2. كرت معلومات الرخصة (تم حذف زر العرض بالأسفل) */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.01)] hover:shadow-[0_6px_18px_rgba(0,0,0,0.02)] transition-shadow duration-300 min-h-[180px]">
        <div>
          <h4 className="text-xs font-extrabold text-gray-400 tracking-wide mb-3">معلومات الرخصة</h4>
          <div className="space-y-2.5 text-xs font-bold text-gray-700">
            <div className="flex justify-between"><span className="text-gray-400 font-medium">رقم الرخصة</span> <span className="font-sans">{license?.number || '—'}</span></div>
            <div className="flex justify-between"><span className="text-gray-400 font-medium">نوع الرخصة</span> <span>{license?.type || '—'}</span></div>
            <div className="flex justify-between"><span className="text-gray-400 font-medium">الحالة</span> <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100/50 text-[10px]">{license?.status || '—'}</span></div>
          </div>
        </div>
      </div>
      {/* 🚚 3. كرت معلومات المركبة (تم حذف زر عرض التفاصيل بالأسفل) */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.01)] hover:shadow-[0_6px_18px_rgba(0,0,0,0.02)] transition-shadow duration-300 min-h-[180px]">
        <div>
          <h4 className="text-xs font-extrabold text-gray-400 tracking-wide mb-3">معلومات المركبة</h4>
          <div className="space-y-2.5 text-xs font-bold text-gray-700">
            <div className="flex justify-between"><span className="text-gray-400 font-medium">رقم الشاحنة</span> <span className="font-sans">{vehicle?.truckNumber || '—'}</span></div>
            <div className="flex justify-between"><span className="text-gray-400 font-medium">نوع الشاحنة</span> <span>{vehicle?.truckType || '—'}</span></div>
            <div className="flex justify-between"><span className="text-gray-400 font-medium">الحالة</span> <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100/50 text-[10px]">{vehicle?.status || '—'}</span></div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default InfoGrids;
