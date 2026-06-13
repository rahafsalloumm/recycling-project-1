import { useState, useRef } from "react";
import {Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaRecycle } from "react-icons/fa";

export default function Login() {
  const navigate = useNavigate();
  const submitBtnRef = useRef(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  // ===== VALIDATION =====
  const validate = () => {
    const newErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      newErrors.email = "بريد إلكتروني غير صالح";
    }

    if (password.length < 6) {
      newErrors.password = "كلمة المرور قصيرة جداً";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ===== SUBMIT =====
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      alert("تم تسجيل الدخول بنجاح 🎉");
    }, 1000);
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
            تسجيل الدخول
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            مرحباً بعودتك 👋
          </p>

        </div>

        {/* ===== FORM ===== */}
        <form className="space-y-5" onSubmit={handleSubmit}>

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

  <p className="text-xs text-gray-400 mt-1 text-right">
   
  </p>

  {errors.email && (
    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
  )}
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

  

  {errors.password && (
    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
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
      className="p-3 rounded-xl border bg-white hover:bg-green-50"
    >
      مستخدم
    </button>

    <button
      type="button"
      className="p-3 rounded-xl border bg-white hover:bg-green-50"
    >
      شركة
    </button>

    <button
      type="button"
      className="p-3 rounded-xl border bg-white hover:bg-green-50"
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
            {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
          </button>

        </form>

        {/* ===== SIGNUP LINK ===== */}
        <p className="text-center text-gray-500 mt-7">
          ليس لديك حساب؟
          <button
            type="button"
            onClick={() => navigate("/Register")}
            className="text-green-700 font-bold mr-2 hover:text-emerald-500"
          >
            إنشاء حساب
          </button>
        </p>

      </div>
    </div>
  );
}