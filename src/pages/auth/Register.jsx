import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaRecycle } from "react-icons/fa";

export default function Register() {
  const navigate = useNavigate();
  const submitBtnRef = useRef(null);

  // حقول الإدخال الأساسية
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // الـ States الخاصة بالنافذة المنبثقة والكود
  const [showOtpModal, setShowOtpModal] = useState(false); 
  const [otp, setOtp] = useState(["", "", "", "", ""]); 
  const [timer, setTimer] = useState(59); 
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState("");

  const otpInputsRef = useRef([]);

  // عداد الثواني الخاص بإعادة إرسال الكود
  useEffect(() => {
    let interval;
    if (showOtpModal && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showOtpModal, timer]);

  // ===== VALIDATION =====
  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{7,15}$/;

    if (!fullName.trim()) newErrors.fullName = "الاسم مطلوب";
    if (!emailRegex.test(email)) newErrors.email = "بريد غير صالح";
    if (!phoneRegex.test(phone)) newErrors.phone = "رقم الهاتف غير صالح";
    if (password.length < 6) newErrors.password = "كلمة المرور 6 أحرف على الأقل";
    if (confirmPassword !== password) newErrors.confirmPassword = "كلمتا المرور غير متطابقتين";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ===== SUBMIT REGISTER =====
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setShowOtpModal(true); 
      setTimer(59); 
    }, 1200);
  };

  // ===== HANDLE OTP INPUT =====
  const handleOtpChange = (element, index) => {
    const value = element.value.replace(/[^0-9]/g, ""); 
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1); 
    setOtp(newOtp);

    if (index < 4 && element.value) {
      otpInputsRef.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputsRef.current[index - 1].focus();
    }
  };

  // ===== VERIFY OTP SUBMIT =====
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setOtpError("");
    const enteredCode = otp.join("");

    if (enteredCode.length < 5) {
      setOtpError("يرجى إدخال الكود كاملاً من 5 أرقام");
      return;
    }

    setOtpLoading(true);

    setTimeout(() => {
      setOtpLoading(false);
      alert("تم تفعيل الحساب وإنشاؤه بنجاح! 🎉");
      setShowOtpModal(false);
      navigate("/login"); 
    }, 1500);
  };

  const handleResendCode = () => {
    setTimer(59);
    setOtp(["", "", "", "", ""]);
    setOtpError("");
    alert("تم إعادة إرسال كود التحقق إلى بريدك الإلكتروني 📩");
  };

  const handleEnter = (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    const form = e.currentTarget.form;
    const elements = Array.from(form.elements).filter(
      (el) => el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT"
    );
    const index = elements.indexOf(e.currentTarget);
    if (index > -1 && index < elements.length - 1) {
      elements[index + 1].focus();
    } else {
      submitBtnRef.current?.click();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8 relative">
      
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-lg">
        {/* ===== HEADER ===== */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <Link
              to="/"
              className="text-green-600 text-4xl transition-transform duration-700 hover:rotate-180 active:rotate-360 inline-flex"
            >
              <FaRecycle />
            </Link>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">إنشاء حساب</h1>
          <p className="text-sm text-gray-500 mt-1">انضم إلينا وابدأ بإعادة التدوير ♻️</p>
        </div>

        {/* FORM */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* FULL NAME */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700 text-right">الاسم الكامل</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              onKeyDown={handleEnter}
              placeholder="الاسم الكامل"
              className="w-full border rounded-2xl p-4 outline-none focus:ring-4 focus:ring-green-200 text-right"
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1 text-right">{errors.fullName}</p>}
          </div>

          {/* EMAIL */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700 text-right">البريد الإلكتروني</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleEnter}
              placeholder="example@mail.com"
              className="w-full border rounded-2xl p-4 outline-none focus:ring-4 focus:ring-green-200"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1 text-right">{errors.email}</p>}
          </div>

          {/* PHONE */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700 text-right">رقم الهاتف</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onKeyDown={handleEnter}
              placeholder="09xxxxxxxx"
              className="w-full border rounded-2xl p-4 outline-none focus:ring-4 focus:ring-green-200"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1 text-right">{errors.phone}</p>}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700 text-right">كلمة المرور</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleEnter}
                placeholder="****"
                className="w-full border rounded-2xl p-4 pr-12 outline-none focus:ring-4 focus:ring-green-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1 text-right">{errors.password}</p>}
          </div>
          {/* CONFIRM PASSWORD */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700 text-right">
              تأكيد كلمة المرور
            </label>

            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyDown={handleEnter}
              placeholder="****"
              className="w-full border rounded-2xl p-4 outline-none focus:ring-4 focus:ring-green-200 text-right"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1 text-right">{errors.confirmPassword}</p>
            )}
          </div>

          {/* ROLE */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700 text-right">
              نوع الحساب
            </label>

            <div className="grid grid-cols-3 gap-2 text-sm">
              <button
                type="button"
                onClick={() => setRole("user")}
                className={`p-3 rounded-xl border transition ${
                  role === "user" ? "bg-green-500 text-white border-green-500" : "bg-white hover:bg-green-50 text-gray-700"
                }`}
              >
                مستخدم
              </button>

              <button
                type="button"
                onClick={() => setRole("driver")}
                className={`p-3 rounded-xl border transition ${
                  role === "driver" ? "bg-green-500 text-white border-green-500" : "bg-white hover:bg-green-50 text-gray-700"
                }`}
              >
                سائق
              </button>
            </div>
          </div>

          {/* BUTTON */}
          <button
            ref={submitBtnRef}
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-2xl font-bold hover:scale-[1.02] transition disabled:opacity-60"
          >
            {loading ? "جاري المعالجة..." : "إنشاء حساب"}
          </button>

        </form>

        {/* LOGIN LINK */}
        <p className="text-center text-gray-500 mt-7">
          لديك حساب بالفعل؟
          <span
            onClick={() => navigate("/login")}
            className="text-green-700 font-bold mr-2 cursor-pointer"
          >
            تسجيل الدخول
          </span>
        </p>

      </div>

      {/* ======================================================== */}
      {/* ===== OTP VERIFICATION MODAL (النافذة المنبثقة الاحترافية) ===== */}
      {/* ======================================================== */}
      {showOtpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          
          <div className="w-full max-w-sm bg-white p-6 rounded-3xl shadow-2xl text-center space-y-5">
            
            {/* أيقونة رسالة */}
            <div className="mx-auto w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-500 text-2xl">
              📩
            </div>

            <h2 className="text-xl font-bold text-gray-800">تأكيد البريد الإلكتروني</h2>
            <p className="text-sm text-gray-500 px-2">
              لقد أرسلنا كود التحقق المكون من 5 أرقام إلى: <br/>
              <span className="font-semibold text-gray-700 text-xs break-all">{email}</span>
            </p>

            {/* حقول الكود */}
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div className="flex justify-center gap-2" dir="ltr">
                {otp.map((data, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    ref={(el) => (otpInputsRef.current[index] = el)}
                    value={data}
                    onChange={(e) => handleOtpChange(e.target, index)}
                    onKeyDown={(e) => handleOtpKeyDown(e, index)}
                    className="w-12 h-12 border-2 rounded-xl text-center text-xl font-bold text-gray-800 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100 bg-gray-50"
                  />
                ))}
              </div>

              {/* خطأ كود التفعيل */}
              {otpError && (
                <p className="text-red-500 text-sm text-center">{otpError}</p>
              )}

              {/* عداد الثواني */}
              <div className="text-sm text-gray-500 text-center">
                {timer > 0 ? (
                  <p>إعادة إرسال الكود خلال <span className="font-bold text-green-600">{timer}</span> ثانية</p>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendCode}
                    className="text-green-600 font-bold hover:underline"
                  >
                    إعادة إرسال كود التحقق
                  </button>
                )}
              </div>

              {/* أزرار التحكم */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowOtpModal(false)}
                  className="w-1/3 bg-gray-100 text-gray-600 py-3 rounded-2xl font-semibold hover:bg-gray-200 transition"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={otpLoading}
                  className="w-2/3 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-2xl font-bold hover:scale-[1.02] transition disabled:opacity-60"
                >
                  {otpLoading ? "جاري التحقق..." : "تأكيد وتفعيل"}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
