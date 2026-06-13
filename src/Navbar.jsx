import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-[#F8FBF6]/80 backdrop-blur-md border-b border-green-100">

      <div className="max-w-7xl mx-auto px-6">

        <div className="h-20 flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 px-2 py-1 rounded-xl"
          >
            <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-green-100 text-2xl">
              ♻️
            </span>

            <span className="text-2xl font-extrabold text-green-700 tracking-wide">
              EcoCycle
            </span>
          </Link>

          {/* Menu */}
          <nav className="hidden md:flex items-center gap-8 font-medium text-gray-700">

            <Link to="/" className="hover:text-green-600 transition">
              الرئيسية
            </Link>

            <a href="#features" className="hover:text-green-600 transition">
              خدماتنا
            </a>
            <Link to="/rewards" className="hover:text-green-600 transition">
             المكافاّت
            </Link>
        

            <a href="#contact" className="hover:text-green-600 transition">
             تواصل معنا
            </a>

           

          </nav>

          {/* Buttons */}
          <div className="flex items-center gap-3">

            <Link
              to="/login"
              className="px-5 py-2.5 rounded-xl border border-green-200 text-green-700 hover:bg-green-50 transition"
            >
              تسجيل الدخول
            </Link>

            <Link
              to="/register"
              className="px-5 py-2.5 rounded-xl bg-green-600 text-white hover:bg-green-700 shadow-sm hover:shadow-md transition"
            >
              إنشاء حساب
            </Link>

          </div>

        </div>

      </div>

    </header>
  );
}