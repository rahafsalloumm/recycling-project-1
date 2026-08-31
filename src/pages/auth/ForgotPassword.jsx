import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRecycle, FaArrowRight, FaEnvelope, FaLock, FaKey, FaEye, FaEyeSlash } from "react-icons/fa";

export default function ForgotPassword() {
  const navigate = useNavigate();
  
  // step 1: طلب البريد الإلكتروني | step 2: تحقق من الرمز | step 3: إعادة تعيين كلمة المرور الجديدة
  const [step, setStep] = useState(1); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // مدخلات المراحل الثلاثة
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", ""]); // 5 خانات لكود التحقق
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // ===== هاندلر الخطوة الأولى: إدخال البريد الإلكتروني =====
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setError("");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("بريد إلكتروني غير صالح");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(2); // الانتقال التلقائي لخطوة كود التحقق
    }, 1200);
  };

  // ===== هاندلر الخطوة الثانية: التحقق من كود الـ OTP المكون من 5 خانات =====
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    setError("");
    const code = otp.join("");
    if (code.length < 5) {
      setError("الرجاء إدخال كود التحقق كاملاً المكون من 5 أرقام");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // كود التجريب الافتراضي المتوافق مع الخمس خانات
      if (code === "12345") {
        setStep(3); // الانتقال التلقائي لخطوة إعادة تعيين كلمة السر
      } else {
        setError("كود التحقق غير صحيح! جرب الرمز الافتراضي 12345");
      }
    }, 1200);
  };

  // دالة تحريك مؤشر الكتابة تلقائياً بين مربعات الـ OTP الخمسة
  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return false;
    let newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    if (element.nextSibling && element.value !== "") {
      element.nextSibling.focus();
    }
  };

  // ===== هاندلر الخطوة الثالثة: إعادة تعيين كلمة المرور الجديدة =====
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (newPassword.length < 6) {
      setError("كلمة المرور يجب أن تكون 6 أحرف أو أكثر");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("كلمات المرور غير متطابقة");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("تم إعادة تعيين كلمة المرور بنجاح 🎉 يمكنك تسجيل الدخول الآن");
      navigate("/login"); // التوجيه النهائي لصفحة الدخول
    }, 1500);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-lg relative">
        
        {/* زر العودة التكتيكي الذكي للخطوات السابقة */}
        <button 
          onClick={() => step > 1 ? setStep(step - 1) : navigate("/login")} 
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition flex items-center gap-1.5 text-xs font-semibold"
        >
          {step === 1 ? "العودة لتسجيل الدخول" : "الخطوة السابقة"} <FaArrowRight size={10} />
        </button>

        {/* ===== LOGO & MAIN HEADERS ===== */}
        <div className="text-center mb-6 mt-4">
          <div className="flex justify-center mb-3">
            <div className="text-green-600 text-4xl inline-flex"><FaRecycle /></div>
          </div>
          
          {step === 1 && (
            <>
              <h1 className="text-2xl font-bold text-gray-800">نسيت كلمة المرور؟</h1>
              <p className="text-sm text-gray-500 mt-1">أدخل بريدك الإلكتروني لإرسال كود التحقق</p>
            </>
          )}
          {step === 2 && (
            <>
              <h1 className="text-2xl font-bold text-gray-800">التحقق من البريد الإلكتروني</h1>
              <p className="text-sm text-gray-500 mt-1">أدخل الرمز المكون من 5 أرقام المرسل إليك</p>
            </>
          )}
          {step === 3 && (
            <>
              <h1 className="text-2xl font-bold text-gray-800">كلمة مرور جديدة</h1>
              <p className="text-sm text-gray-500 mt-1">قم بإنشاء كلمة مرور قوية وجديدة لحسابك</p>
            </>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-semibold p-3 rounded-xl text-right mb-4">
            {error}
          </div>
        )}

        {/* ===== الخطوة 1: نموذج إدخال البريد الإلكتروني مع النص الفصيح الجديد للزر ===== */}
        {step === 1 && (
          <form className="space-y-5" onSubmit={handleEmailSubmit}>
            <div>
              <label className="block mb-2 font-semibold text-gray-700 text-right text-xs">البريد الإلكتروني المسجل</label>
              <div className="relative">
                <input
                  type="email" required value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@mail.com"
                  className="w-full border rounded-2xl p-4 outline-none focus:ring-4 focus:ring-green-200 text-right pr-4 pl-12 text-xs"
                />
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-xs" />
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-2xl font-bold hover:scale-[1.02] transition disabled:opacity-60 text-xs shadow-sm">
              {loading ? "جاري الإرسال..." : "ارسال رمز للتحقق من البريد الإلكتروني"}
            </button>
          </form>
        )}

        {/* ===== الخطوة 2: نموذج الـ OTP المطور والموزع على 5 خانات هندسية متناسقة ===== */}
        {step === 2 && (
          <form className="space-y-5" onSubmit={handleOtpSubmit}>
            <div>
              <label className="block mb-4 font-semibold text-gray-700 text-center text-xs">كود التحقق</label>
              <div className="flex justify-center gap-2.5" style={{ direction: "ltr" }}>
                {otp.map((data, index) => (
                  <input
                    key={index} type="text" maxLength="1"
                    value={data} onChange={(e) => handleOtpChange(e.target, index)}
                    onFocus={(e) => e.target.select()}
                    className="w-11 h-11 border-2 rounded-xl text-center font-bold text-lg outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 bg-gray-50"
                  />
                ))}
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-2xl font-bold hover:scale-[1.02] transition disabled:opacity-60 text-xs shadow-sm">
              {loading ? "جاري التحقق..." : "تأكيد الرمز"}
            </button>
          </form>
        )}

        {/* ===== الخطوة 3: واجهة إعادة تعيين كلمة المرور الجديدة (بعد الرمز مباشرة تلبية لطلب تسنيم) ===== */}
        {step === 3 && (
          <form className="space-y-5" onSubmit={handlePasswordSubmit}>
            <div>
              <label className="block mb-2 font-semibold text-gray-700 text-right text-xs">كلمة المرور الجديدة</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"} required value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="********"
                  className="w-full border rounded-2xl p-4 outline-none focus:ring-4 focus:ring-green-200 text-right pr-4 pl-12 text-xs"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                <FaLock className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-300 text-xs" />
              </div>
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700 text-right text-xs">تأكيد كلمة المرور</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"} required value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="********"
                  className="w-full border rounded-2xl p-4 outline-none focus:ring-4 focus:ring-green-200 text-right pr-4 pl-12 text-xs"
                />
                <FaKey className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-xs" />
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-2xl font-bold hover:scale-[1.02] transition disabled:opacity-60 text-xs shadow-sm">
              {loading ? "جاري الحفظ..." : "حفظ كلمة المرور الجديدة"}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}

