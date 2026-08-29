import { useState, useRef } from "react";
import { FaUser, FaEnvelope, FaPhone, FaHeading, FaPaperPlane, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import Navbar from "./Navbar"; 

export default function Contact() {
  const submitBtnRef = useRef(null);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!fullName.trim()) newErrors.fullName = "الاسم الكامل مطلوب";
    if (!emailRegex.test(email)) newErrors.email = "البريد الإلكتروني غير صالح";
    if (!phone.trim()) newErrors.phone = "رقم الهاتف مطلوب";
    if (!message.trim()) newErrors.message = "نص الرسالة مطلوب";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess("");
    if (!validate()) return;
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess("تم إرسال رسالتك بنجاح! سنتواصل معك قريباً 🚀");
      setFullName("");
      setEmail("");
      setPhone("");
      setSubject("");
      setMessage("");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F9FBF8] flex flex-col font-sans text-sm text-gray-700 antialiased">
      
      <Navbar />

      <div className="flex-1 w-full max-w-6xl mx-auto px-6 py-12 flex flex-col items-center">
        
        <div className="text-center max-w-2xl mb-12 w-full relative pt-4">
          <div className="hidden lg:flex absolute left-[-60px] top-[-10px] items-center justify-center">
            <div className="relative bg-[#E8F5E9] p-4 rounded-3xl border border-green-100/60 shadow-sm flex items-center justify-center transform -rotate-6">
              <span className="text-5xl">📩</span>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#2E7D32] rounded-full flex items-center justify-center border-2 border-white">
                <span className="text-[10px] text-white">✓</span>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex absolute right-[-60px] top-[-10px] items-center justify-center transform rotate-6">
            <div className="bg-[#2E7D32] text-white p-5 rounded-3xl rounded-tr-none shadow-md text-3xl px-7">
              💬
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-gray-800 flex items-center justify-center gap-2">
            تواصل معنا <span className="text-green-600 text-2xl">🍃</span>
          </h1>
          <p className="text-gray-400 mt-2 text-xs md:text-sm font-medium leading-relaxed max-w-md mx-auto">
            نحن هنا للإجابة على استفساراتك ومساعدتك. <br /> لا تتردد في التواصل معنا في أي وقت!
          </p>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          
          <div className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col justify-between space-y-6 text-right shadow-sm">
            <div>
              <h2 className="text-xs font-bold text-gray-800 mb-5 pb-2 border-b border-gray-100 flex items-center justify-end gap-1.5">
                معلومات التواصل <span className="w-1.5 h-3.5 bg-green-600 rounded-sm inline-block"></span>
              </h2>
              
              <div className="space-y-5">
                <div className="flex items-center gap-4 justify-end text-right group">
                  <div>
                    <h4 className="font-bold text-gray-700 text-xs">البريد الإلكتروني</h4>
                    <p className="text-gray-400 text-xs mt-0.5 font-medium">info@ecocycle.com</p>
                  </div>
                  <div className="w-8 h-8 bg-green-50 text-[#2E7D32] rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaEnvelope size={12} />
                  </div>
                </div>

                <div className="flex items-center gap-4 justify-end text-right group">
                  <div>
                    <h4 className="font-bold text-gray-700 text-xs">رقم الهاتف</h4>
                    <p className="text-gray-600 text-xs font-semibold mt-0.5" style={{ direction: 'ltr' }}>+962 79 123 4567</p>
                  </div>
                  <div className="w-8 h-8 bg-green-50 text-[#2E7D32] rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaPhone size={12} />
                  </div>
                </div>

                <div className="flex items-start gap-4 justify-end text-right group">
                  <div>
                    <h4 className="font-bold text-gray-700 text-xs">العنوان</h4>
                    <p className="text-gray-400 text-xs mt-0.5 leading-relaxed">عمان، شارع الجامعة الأردنية، مبنى رقم 52</p>
                  </div>
                  <div className="w-8 h-8 bg-green-50 text-[#2E7D32] rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FaMapMarkerAlt size={12} />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 justify-end text-right group border-t border-gray-50 pt-4">
              <div>
                <h4 className="font-bold text-gray-400 text-[10px] uppercase tracking-wider">ساعات العمل</h4>
                <p className="text-gray-500 text-xs mt-0.5 leading-relaxed font-medium">الأحد - الخميس: 8:00 ص - 5:00 م</p>
              </div>
              <div className="w-8 h-8 bg-green-50 text-[#2E7D32] rounded-xl flex items-center justify-center flex-shrink-0">
                <FaClock size={12} />
              </div>
            </div>
          </div>

          <div className="md:col-span-2 bg-white p-7 rounded-2xl border border-gray-100 flex flex-col justify-between shadow-sm">
            <div>
              <h2 className="text-sm font-bold text-gray-800 mb-6 text-right flex items-center justify-end gap-2">
                أرسل لنا رسالة <FaPaperPlane className="text-[#2E7D32] text-[10px]" />
              </h2>

              {success && (
                <div className="bg-[#E8F5E9] text-[#2E7D32] p-3 rounded-xl mb-5 text-center text-xs font-semibold border border-green-100">
                  {success}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="relative">
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="الاسم الكامل"
                        className="w-full border border-gray-200/80 rounded-xl p-3 pr-10 outline-none transition duration-300 focus:border-[#2E7D32] focus:ring-4 focus:ring-green-100 text-right bg-white text-xs text-gray-700"
                      />
                      <FaUser className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-300 text-xs" />
                    </div>
                    {errors.fullName && <p className="text-red-500 text-[10px] mt-1 text-right">{errors.fullName}</p>}
                  </div>

                  <div>
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="البريد الإلكتروني"
                        className="w-full border border-gray-200/80 rounded-xl p-3 pr-10 outline-none transition duration-300 focus:border-[#2E7D32] focus:ring-4 focus:ring-green-100 text-right bg-white text-xs text-gray-700"
                      />
                      <FaEnvelope className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-300 text-xs" />
                    </div>
                    {errors.email && <p className="text-red-500 text-[10px] mt-1 text-right">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="relative">
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="رقم الهاتف"
                        className="w-full border border-gray-200/80 rounded-xl p-3 pr-10 outline-none transition duration-300 focus:border-[#2E7D32] focus:ring-4 focus:ring-green-100 text-right bg-white text-xs text-gray-700"
                      />
                      <FaPhone className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-300 text-xs" />
                    </div>
                    {errors.phone && <p className="text-red-500 text-[10px] mt-1 text-right">{errors.phone}</p>}
                  </div>

                  <div>
                    <div className="relative">
                      <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="الموضوع (اختياري)"
                        className="w-full border border-gray-200/80 rounded-xl p-3 pr-10 outline-none transition duration-300 focus:border-[#2E7D32] focus:ring-4 focus:ring-green-100 text-right bg-white text-xs text-gray-700"
                      />
                      <FaHeading className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-300 text-xs" />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="relative">
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="اكتب رسالتك هنا..."
                      className="w-full border border-gray-200/80 rounded-xl p-3 pr-10 outline-none transition duration-300 focus:border-[#2E7D32] focus:ring-4 focus:ring-green-100 text-right bg-white text-xs text-gray-700 resize-none"
                    ></textarea>
                  </div>
                  {errors.message && <p className="text-red-500 text-[10px] mt-1 text-right">{errors.message}</p>}
                </div>

                <button
                  ref={submitBtnRef}
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-6 py-3 bg-[#2E7D32] text-white font-bold rounded-xl hover:bg-[#1b4d22] transition duration-300 flex items-center justify-center gap-2 text-xs shadow-sm disabled:opacity-50"
                >
                  {loading ? "جاري الإرسال..." : "إرسال الرسالة"}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
