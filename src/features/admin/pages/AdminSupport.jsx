import { useState } from "react";
import { FaEnvelope, FaClock, FaCheckCircle, FaReply, FaTimes, FaSearch, FaInbox } from "react-icons/fa";

export default function AdminSupport() {
  // 💡 بيانات وهمية دقيقة تعكس الحقول المرسلة من صفحة "تواصل معنا" الحالية
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      name: "أحمد محمود أحمد", 
      email: "ahmed.m@gmail.com", 
      phone: "+962 79 123 4567", 
      subject: "مشكلة في استبدال نقاط زجاجة المياه", 
      text: "مرحباً، قمت بطلب زجاجة مياه مخصصة من متجر المكافآت وتم خصم 800 نقطة من حسابي ولكن لم يصلني إشعار بتكليف السائق لتوصيلها بعد. أرجو المتابعة لحل المشكلة يرجى تزويدي بالدعم الميداني الفوري.", 
      date: "2026-09-02", 
      status: "معلق" 
    },
    { 
      id: 2, 
      name: "سارة خالد التميمي", 
      email: "sara.kh@gmail.com", 
      phone: "+962 79 345 6789", 
      subject: "استفسار عن مواعيد مرور الشاحنة", 
      text: "شكراً لكم على هذه المنصة الرائعة. أود الاستفسار هل تمر شاحنة استلام النفايات من منطقة حي البالوع خلال عطلة نهاية الأسبوع لكي نتمكن من تجهيز أكياس فرز المواد البلاستيكية والكرتون؟", 
      date: "2026-08-31", 
      status: "تم الرد" 
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("الكل");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMsg, setSelectedMsg] = useState(null);
  const [replyText, setReplyText] = useState("");

  // دالة محاكاة إرسال الرد وتغيير حالة التذكرة فوراً بالفرونت إند لقراءة النتيجة التفاعلية
  const handleSendReply = (e) => {
    e.preventDefault();
    setMessages(messages.map(msg => 
      msg.id === selectedMsg.id ? { ...msg, status: "تم الرد" } : msg
    ));
    setReplyText("");
    setIsModalOpen(false);
  };

  const handleOpenReply = (msg) => {
    setSelectedMsg(msg);
    setIsModalOpen(true);
  };

  // فلاتر البحث وحالة التصفية السريعة
  const filteredMessages = messages.filter(msg => {
    const matchesSearch = msg.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          msg.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === "الكل" || msg.status === activeFilter;
    return matchesSearch && matchesFilter;
  });
  return (
    <div className="w-full space-y-6 text-right font-sans p-1 animate-fadeIn duration-300" dir="rtl">
      
      {/* هيدر الصفحة الفخم */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-emerald-600 rounded-full block"></span>
            صندوق رسائل الدعم الفني والشكاوى
          </h1>
          <p className="text-sm text-gray-400 mt-1.5 font-medium">إدارة استفسارات ومقترحات المستخدمين الواردة فوراً من نموذج تواصل معنا الميداني</p>
        </div>
      </div>

      {/* 📊 كروت إحصائية علوية مطابقة لستايل مشروعكِ */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-gray-400 block">إجمالي الرسائل</span>
            <span className="text-xl font-black font-mono text-gray-800">{messages.length}</span>
          </div>
          <div className="p-3 rounded-xl text-blue-600 bg-blue-50 text-lg"><FaInbox /></div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-gray-400 block">طلبات معلقة</span>
            <span className="text-xl font-black font-mono text-amber-600">{messages.filter(m => m.status === "معلق").length}</span>
          </div>
          <div className="p-3 rounded-xl text-amber-600 bg-amber-50 text-lg"><FaClock /></div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-gray-400 block">تمت الاستجابة والرد</span>
            <span className="text-xl font-black font-mono text-emerald-600">{messages.filter(m => m.status === "تم الرد").length}</span>
          </div>
          <div className="p-3 rounded-xl text-emerald-600 bg-emerald-50 text-lg"><FaCheckCircle /></div>
        </div>
      </div>

      {/* شريط البحث وفلاتر الفرز السريع */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:max-w-md">
          <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 text-sm">
            <FaSearch />
          </span>
          <input
            type="text"
            placeholder="ابحث باسم المرسل أو موضوع الرسالة..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-4 pr-11 py-3 bg-gray-50/50 border border-gray-200/60 rounded-xl text-xs focus:outline-none focus:border-emerald-500 focus:bg-white text-right font-medium text-gray-800 placeholder-gray-400 shadow-inner"
          />
        </div>
        
        <div className="flex gap-2">
          {["الكل", "معلق", "تم الرد"].map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${activeFilter === filter ? "bg-emerald-600 text-white shadow-xs" : "bg-gray-50 text-gray-500 border border-gray-150 hover:bg-gray-100"}`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
      {/* 📋 الجدول المطور لعرض مقتطف من الرسائل بحجم محمي ومنسق */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-gray-50/70 border-b border-gray-100 text-gray-400 text-xs font-bold tracking-wide select-none">
                <th className="py-4 px-6 text-center w-16">#</th>
                <th className="py-4 px-6">اسم المستخدم</th>
                <th className="py-4 px-6">موضوع الرسالة</th>
                <th className="py-4 px-6">رقم الهاتف / البريد</th>
                <th className="py-4 px-6">مقتطف من الرسالة</th>
                <th className="py-4 px-6 text-center">التاريخ</th>
                <th className="py-4 px-6 text-center">الحالة</th>
                <th className="py-4 px-6 text-center w-32">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-50 text-gray-700 font-medium">
              {filteredMessages.map((msg, index) => (
                <tr key={msg.id} className="hover:bg-gray-50/40 transition-colors duration-200 group">
                  <td className="py-4 px-6 text-center font-bold text-gray-400 text-base">{index + 1}</td>
                  <td className="py-4 px-6 font-bold text-gray-900">{msg.name}</td>
                  <td className="py-4 px-6 text-emerald-800 font-black">{msg.subject}</td>
                  <td className="py-4 px-6">
                    <div className="flex flex-col space-y-0.5">
                      <span className="font-mono text-gray-500 text-left ltr">{msg.phone}</span>
                      <span className="text-[10px] text-gray-400 font-normal">{msg.email}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-400 max-w-xs truncate font-normal">{msg.text}</td>
                  <td className="py-4 px-6 text-center font-mono text-gray-400">{msg.date}</td>
                  <td className="py-4 px-6 text-center">
                    <span className={`px-2.5 py-1 rounded-xl font-bold text-[10px] border ${msg.status === "معلق" ? "bg-amber-50 text-amber-700 border-amber-100" : "bg-emerald-50 text-emerald-700 border-emerald-100"}`}>
                      {msg.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button 
                      type="button" 
                      onClick={() => handleOpenReply(msg)}
                      className="p-2 rounded-xl text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 active:scale-90 transition-all cursor-pointer flex items-center justify-center gap-1 mx-auto text-xs font-black"
                    >
                      <FaReply className="text-[10px]" /> عرض والرد السريع
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 📥 النافذة المنبثقة (Modal) الكبرى لعرض نص الرسالة والشكوى بالكامل */}
      {isModalOpen && selectedMsg && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative border border-gray-100 flex flex-col space-y-4 max-h-[85vh] overflow-y-auto">
            <button type="button" onClick={() => setIsModalOpen(false)} className="absolute top-5 left-5 p-2 rounded-xl text-gray-400 hover:bg-gray-50 transition-colors cursor-pointer"><FaTimes /></button>
            <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
              <div className="bg-emerald-50 p-2 rounded-xl text-emerald-600 flex items-center justify-center"><FaEnvelope className="text-sm" /></div>
              <div className="text-right">
                <h3 className="text-sm font-black text-gray-800">مراجعة رسالة تواصل المستخدم</h3>
                <p className="text-[10px] text-gray-400 mt-0.5">{selectedMsg.subject}</p>
              </div>
            </div>
            
            {/* هنا يتم عرض الرسالة كاملة بدون نقصان وبخط مريح داخل صندوق محمي بصرياً */}
            <div className="text-xs space-y-2 bg-gray-50 p-4 rounded-xl border border-gray-100 text-right font-bold text-gray-600">
              <p>👤 اسم المرسل الكامل: <span className="text-gray-900 font-black">{selectedMsg.name}</span></p>
              <p>📧 البريد الإلكتروني: <span className="text-gray-900 font-mono font-black">{selectedMsg.email}</span></p>
              <p>📞 رقم الهاتف الجوال: <span className="text-gray-900 font-mono font-black" dir="ltr">{selectedMsg.phone}</span></p>
              <div className="mt-2 pt-2 border-t border-gray-200">
                <p className="text-[10px] text-gray-400 block mb-1">✉️ نص الرسالة والشكوى المستلمة بالكامل:</p>
                <p className="text-gray-800 leading-relaxed bg-white p-3 rounded-xl border border-gray-100 font-black shadow-inner">
                  {selectedMsg.text}
                </p>
              </div>
            </div>

            <form onSubmit={handleSendReply} className="space-y-4 text-right">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-400 block">✍️ اكتب رد الدعم الفني الرسمي (سيصل لبريد المستخدم فوراً):</label>
                <textarea 
                  placeholder="اكتب تفاصيل الإجابة أو الحل التقني للمستخدم هنا..." 
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="w-full text-xs p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-emerald-500 h-24 resize-none font-bold"
                  required
                />
              </div>
              <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl py-2.5 text-xs font-black transition-all cursor-pointer shadow-sm active:scale-98 flex items-center justify-center gap-1.5"><FaReply /> إرسال الرد وإغلاق التذكرة</button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
