import { useEffect, useState } from "react";
import { FaSave, FaUser, FaLock, FaCoins, FaTrash, FaEye, FaEyeSlash } from "react-icons/fa";
import adminService from "@/services/admin";

export default function AdminSettings() {
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const [wasteTypes, setWasteTypes] = useState([
    { key: "plastic", label: "البلاستيك", pointsPerKg: 100 },
    { key: "paper", label: "الورق", pointsPerKg: 100 },
    { key: "glass", label: "الزجاج", pointsPerKg: 100 },
    { key: "metal", label: "المعدن", pointsPerKg: 100 },
  ]);
  const [containerThreshold, setContainerThreshold] = useState(85);
  const [adminName, setAdminName] = useState(storedUser.name || "المهندس المسؤول");
  const [adminEmail, setAdminEmail] = useState(storedUser.email || "");
  const [adminPhone, setAdminPhone] = useState(storedUser.phone || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  // حالات منفصلة للتحكم بإظهار وإخفاء كلمات المرور لكل حقل
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  useEffect(() => {
    let active = true;

    const loadProfile = async () => {
      try {
        const [profile, settingsResponse] = await Promise.all([
          adminService.getProfile(),
          adminService.getSystemSettings(),
        ]);
        const settings = settingsResponse?.settings || settingsResponse?.data?.settings || {};

        if (active) {
          setAdminName(profile?.name || "");
          setAdminEmail(profile?.email || "");
          setAdminPhone(profile?.phone || "");
          setWasteTypes(settings.wasteTypes?.length ? settings.wasteTypes : [
            { key: "plastic", label: "البلاستيك", pointsPerKg: 100 },
            { key: "paper", label: "الورق", pointsPerKg: 100 },
            { key: "glass", label: "الزجاج", pointsPerKg: 100 },
            { key: "metal", label: "المعدن", pointsPerKg: 100 },
          ]);
          setContainerThreshold(settings.containerThreshold ?? 85);
        }
      } catch (requestError) {
        if (active) {
          setError(requestError.message || "تعذر تحميل بيانات الأدمن");
        }
      }
    };

    loadProfile();

    return () => {
      active = false;
    };
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setMessage("");

    try {
      if (!adminName.trim() || !adminEmail.trim()) {
        setError("اسم المدير والبريد الإلكتروني مطلوبان");
        return;
      }

      if (wasteTypes.some((type) => !String(type.label || "").trim() || Number(type.pointsPerKg) < 0)) {
        setError("يرجى إدخال اسم صحيح ونقاط صالحة لكل نوع نفايات");
        return;
      }

      if (newPassword || currentPassword || confirmPassword) {
        if (!currentPassword || !newPassword || !confirmPassword) {
          setError("يرجى ملء جميع حقول كلمة المرور");
          return;
        }

        if (newPassword !== confirmPassword) {
          setError("كلمة المرور الجديدة غير متطابقة مع تأكيدها");
          return;
        }
      }

      const payload = {
        name: adminName,
        email: adminEmail,
        phone: adminPhone,
      };

      if (newPassword) {
        payload.currentPassword = currentPassword;
        payload.newPassword = newPassword;
        payload.confirmPassword = confirmPassword;
      }

      await adminService.updateProfile(payload);
      await adminService.updateSystemSettings({
        wasteTypes: wasteTypes.map((type) => ({ ...type, pointsPerKg: Number(type.pointsPerKg) })),
        containerThreshold: Number(containerThreshold),
      });

      const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...savedUser,
          name: adminName,
          email: adminEmail,
        })
      );

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setMessage("تم حفظ بيانات الحساب بنجاح");
    } catch (requestError) {
      setError(requestError.message || "تعذر حفظ التغييرات");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveCriteria = async () => {
    setSaving(true);
    setError("");
    setMessage("");
    try {
      if (wasteTypes.some((type) => !String(type.label || "").trim() || Number(type.pointsPerKg) < 0)) {
        setError("يرجى إدخال اسم صحيح ونقاط صالحة لكل نوع نفايات");
        return;
      }

      await adminService.updateSystemSettings({
        wasteTypes: wasteTypes.map((type) => ({ ...type, pointsPerKg: Number(type.pointsPerKg) })),
        containerThreshold: Number(containerThreshold),
      });
      setMessage("تم حفظ معايير النقاط والمكافآت بنجاح");
    } catch (requestError) {
      setError(requestError.message || "تعذر حفظ معايير النقاط والمكافآت");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full space-y-6 text-right font-sans p-1 animate-fadeIn duration-300 relative" dir="rtl">
      {error && <p className="rounded-xl bg-red-50 p-4 text-sm font-bold text-red-600">{error}</p>}
      {message && <p className="rounded-xl bg-emerald-50 p-4 text-sm font-bold text-emerald-700">{message}</p>}
      
      {/* هيدر الصفحة المثبت في الأعلى */}
      <div className="sticky top-0 z-40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/95 backdrop-blur-md p-6 rounded-2xl border border-gray-100 shadow-[0_4px_12px_rgba(0,0,0,0.03)]">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-emerald-600 rounded-full block"></span>
            إعدادات النظام والأمان
          </h1>
          <p className="text-sm text-gray-400 mt-1.5 font-medium">التحكم في معايير المنظومة، حماية حساب الإدارة وتعديل الصلاحيات الكلية</p>
        </div>
        
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl text-sm font-bold shadow-md hover:bg-emerald-700 transition-all duration-300 cursor-pointer active:scale-98 disabled:opacity-60">
          <FaSave className="text-xs" /> 
          <span>{saving ? "جاري الحفظ..." : "حفظ التغييرات الكلية"}</span>
        </button>
      </div>

      {/* صندوق الإعدادات الموحد الفخم والمطور */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-8">
        
        {/* 1. قسم معلومات المدير */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-gray-800 flex items-center gap-2 border-b border-gray-100 pb-2">
            <FaUser className="text-emerald-600 text-sm" /> معلومات المدير الحالي
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500">اسم المدير</label>
              <input type="text" value={adminName} onChange={(e) => setAdminName(e.target.value)} className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-3 px-4 text-sm font-semibold text-gray-800 focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 transition-all duration-200" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500">البريد الإلكتروني</label>
              <input type="email" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-3 px-4 text-sm font-semibold text-gray-800 focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 transition-all duration-200 text-left font-mono" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500">رقم الهاتف</label>
              <input type="text" value={adminPhone} onChange={(e) => setAdminPhone(e.target.value)} className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-3 px-4 text-sm font-semibold text-gray-800 focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 transition-all duration-200 text-left font-mono" />
            </div>
          </div>
        </div>

        {/* 2. قسم الأمان وتغيير كلمة المرور المتفاعل بالأيقونات (العين الحية) */}
        <div className="space-y-4 pt-2">
          <h3 className="text-base font-bold text-gray-800 flex items-center gap-2 border-b border-gray-100 pb-2">
            <FaLock className="text-emerald-600 text-sm" /> الأمان وتغيير كلمة المرور
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* حقل كلمة المرور الحالية */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500">كلمة المرور الحالية</label>
              <div className="relative">
                <input 
                  type={showCurrentPass ? "text" : "password"} 
                  value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="••••••••" 
                  className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 transition-all duration-200 text-left font-mono tracking-wider" 
                />
                <button 
                  type="button"
                  onClick={() => setShowCurrentPass(!showCurrentPass)}
                  className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
                >
                  {showCurrentPass ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* حقل كلمة المرور الجديدة */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500">كلمة المرور الجديدة</label>
              <div className="relative">
                <input 
                  type={showNewPass ? "text" : "password"} 
                  value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="••••••••" 
                  className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 transition-all duration-200 text-left font-mono tracking-wider" 
                />
                <button 
                  type="button"
                  onClick={() => setShowNewPass(!showNewPass)}
                  className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
                >
                  {showNewPass ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* حقل تأكيد كلمة المرور الجديدة */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500">تأكيد كلمة المرور الجديدة</label>
              <div className="relative">
                <input 
                  type={showConfirmPass ? "text" : "password"} 
                  value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" 
                  className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 transition-all duration-200 text-left font-mono tracking-wider" 
                />
                <button 
                  type="button"
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                  className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
                >
                  {showConfirmPass ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* 3. قسم نظام النقاط والمكافآت */}
        <div className="space-y-4 pt-2">
          <h3 className="text-base font-bold text-gray-800 flex items-center gap-2 border-b border-gray-100 pb-2">
            <FaCoins className="text-emerald-600 text-sm" /> معايير النقاط والمكافآت
          </h3>
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {wasteTypes.map((type, index) => (
              <div key={type.key} className="flex items-end gap-2">
                <label className="flex-1 space-y-1.5">
                <input type="text" required placeholder="اسم نوع النفايات" value={type.label} onChange={(e) => setWasteTypes(wasteTypes.map((item, itemIndex) => itemIndex === index ? { ...item, label: e.target.value } : item))} className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-3 py-2 text-sm font-bold text-gray-700 focus:border-emerald-500 focus:outline-none" />
                <span className="text-xs font-bold text-gray-500">النقاط لكل 1 كغ</span>
                <div className="flex gap-2 items-center">
                  <input type="number" min="0" value={type.pointsPerKg} onChange={(e) => setWasteTypes(wasteTypes.map((item, itemIndex) => itemIndex === index ? { ...item, pointsPerKg: e.target.value } : item))} className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-3.5 px-4 text-sm font-bold text-gray-800 focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 transition-all duration-200 font-mono text-left" />
                  <span className="text-sm font-bold text-gray-500 bg-gray-100 px-3 py-3.5 rounded-xl border border-gray-200/50 select-none">نقطة</span>
                </div>
                </label>
                {index >= 4 && <button type="button" onClick={() => setWasteTypes(wasteTypes.filter((_, itemIndex) => itemIndex !== index))} className="mb-1 rounded-xl bg-red-50 px-3 py-3 text-xs font-bold text-red-600">حذف</button>}
              </div>
            ))}
            </div>
            <button type="button" onClick={() => setWasteTypes([...wasteTypes, { key: `custom-${Date.now()}`, label: "", pointsPerKg: 100 }])} className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-bold text-emerald-700">+ إضافة نوع نفايات</button>
            <button type="button" onClick={handleSaveCriteria} disabled={saving} className="mr-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white disabled:opacity-60">
              {saving ? "جاري الحفظ..." : "حفظ معايير النقاط والمكافآت"}
            </button>
          </div>
        </div>

        {/* 4. قسم إعدادات الحاويات */}
        <div className="space-y-4 pt-2">
          <h3 className="text-base font-bold text-gray-800 flex items-center gap-2 border-b border-gray-100 pb-2">
            <FaTrash className="text-emerald-600 text-sm" /> معايير الحاويات الذكية
          </h3>
          <div className="max-w-md space-y-1.5">
            <label className="text-sm font-bold text-gray-700">الحد الحرج لإشعار امتلاء الحاويات</label>
            <select value={containerThreshold} onChange={(e) => setContainerThreshold(Number(e.target.value))} className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-3.5 px-4 text-sm font-bold text-gray-700 focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 transition-all duration-200 cursor-pointer">
              <option value="85">85% من سعة الحاوية الكلية (موصى به)</option>
              <option value="90">90% من سعة الحاوية الكلية</option>
              <option value="80">80% من سعة الحاوية الكلية</option>
            </select>
          </div>
        </div>

      </div>

    </div>
  );
}

