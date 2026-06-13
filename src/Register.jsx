import { useState, useRef } from "react";
import {Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaRecycle } from "react-icons/fa";

export default function Signup() {
  const navigate = useNavigate();
  const submitBtnRef = useRef(null);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const [errors, setErrors] = useState({});

  // ===== VALIDATION =====
  const validate = () => {
    const newErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{7,15}$/;

    if (!fullName.trim()) newErrors.fullName = "الاسم مطلوب";

    if (!emailRegex.test(email)) newErrors.email = "بريد غير صالح";

    if (!phoneRegex.test(phone)) newErrors.phone = "رقم الهاتف غير صالح";

    if (password.length < 6)
      newErrors.password = "كلمة المرور 6 أحرف على الأقل";

    if (confirmPassword !== password)
      newErrors.confirmPassword = "كلمتا المرور غير متطابقتين";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ===== SUBMIT =====
  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess("");

    if (!validate()) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess("تم إنشاء الحساب بنجاح 🎉");

      setFullName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setConfirmPassword("");
    }, 1200);
  };

  // ===== ENTER =====
  const handleEnter = (e) => {
    if (e.key !== "Enter") return;

    e.preventDefault();

    const form = e.currentTarget.form;

    const elements = Array.from(form.elements).filter(
      (el) =>
        el.tagName === "INPUT" ||
        el.tagName === "TEXTAREA" ||
        el.tagName === "SELECT"
    );

    const index = elements.indexOf(e.currentTarget);

    if (index > -1 && index < elements.length - 1) {
      elements[index + 1].focus();
    } else {
      submitBtnRef.current?.click();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

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

          <h1 className="text-2xl font-bold text-gray-800">
            إنشاء حساب
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            انضم إلينا وابدأ بإعادة التدوير ♻️
          </p>

        </div>

        {/* SUCCESS */}
        {success && (
          <div className="bg-green-100 text-green-700 p-3 rounded-xl mb-4 text-center">
            {success}
          </div>
        )}

        {/* FORM */}
        <form className="space-y-5" onSubmit={handleSubmit}>

          {/* FULL NAME */}
         <div>
  <label className="block mb-2 font-semibold text-gray-700 text-right">
    الاسم الكامل
  </label>

  <input
    type="text"
    value={fullName}
    onChange={(e) => setFullName(e.target.value)}
    onKeyDown={handleEnter}
    placeholder="fullName"
    className="w-full border rounded-2xl p-4 outline-none focus:ring-4 focus:ring-green-200"
  />
</div>

          {/* EMAIL */}
        <div>
  <label className="block mb-2 font-semibold text-gray-700 text-right">
    البريد الإلكتروني
  </label>

  <input
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    onKeyDown={handleEnter}
    placeholder="example@mail.com"
    className="w-full border rounded-2xl p-4 outline-none focus:ring-4 focus:ring-green-200"
  />
</div>
          {/* PHONE (FIXED) */}
         <div>
  <label className="block mb-2 font-semibold text-gray-700 text-right">
    رقم الهاتف
  </label>

  <input
    type="tel"
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
    onKeyDown={handleEnter}
    placeholder="09xxxxxxxx"
    className="w-full border rounded-2xl p-4 outline-none focus:ring-4 focus:ring-green-200"
  />
</div>

          {/* PASSWORD */}
         <div>
  <label className="block mb-2 font-semibold text-gray-700 text-right">
    كلمة المرور
  </label>

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
    className="w-full border rounded-2xl p-4 outline-none focus:ring-4 focus:ring-green-200"
  />
</div>

          {/* BUTTON */}
          <button
            ref={submitBtnRef}
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-2xl font-bold hover:scale-[1.02] transition disabled:opacity-60"
          >
            {loading ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
          </button>

        </form>

        {/* LOGIN */}
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
    </div>
  );
}