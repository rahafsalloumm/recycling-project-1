import { useState } from "react";

export default function RequestPickup() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    wasteType: "",
    weight: "",
    notes: ""
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};

    if (!form.name) newErrors.name = "الاسم مطلوب";
    if (!form.phone) newErrors.phone = "رقم الهاتف مطلوب";
    if (!form.address) newErrors.address = "العنوان مطلوب";
    if (!form.wasteType) newErrors.wasteType = "اختر نوع النفايات";
    if (!form.weight) newErrors.weight = "الوزن مطلوب";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      console.log("Request Data:", form); // هون البيانات الجاهزة للـ backend
      setSubmitted(true);

      setForm({
        name: "",
        phone: "",
        address: "",
        wasteType: "",
        weight: "",
        notes: ""
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FBF6] to-green-50 flex items-center justify-center px-6 py-12">

      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-green-700 text-center">
          اطلب جمع النفايات
        </h1>

        <p className="text-center text-gray-500 mt-2">
          املأ البيانات وسيتم التواصل معك قريباً ♻️
        </p>

        {submitted && (
          <div className="mt-6 p-4 bg-green-100 text-green-700 rounded-xl text-center">
            تم إرسال طلبك بنجاح ✅
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">

          {/* الاسم */}
          <div>
            <input
              type="text"
              name="name"
              placeholder="الاسم الكامل"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          {/* الهاتف */}
          <div>
            <input
              type="text"
              name="phone"
              placeholder="رقم الهاتف"
              value={form.phone}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>

          {/* العنوان */}
          <div>
            <input
              type="text"
              name="address"
              placeholder="العنوان الكامل"
              value={form.address}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
          </div>

          {/* نوع النفايات */}
          <div>
            <select
              name="wasteType"
              value={form.wasteType}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <option value="">اختر نوع النفايات</option>
              <option value="plastic">بلاستيك</option>
              <option value="paper">ورق</option>
              <option value="glass">زجاج</option>
              <option value="electronic">إلكترونيات</option>
            </select>
            {errors.wasteType && <p className="text-red-500 text-sm">{errors.wasteType}</p>}
          </div>
          {/* الوزن */}
          <div>
            <input
              type="number"
              name="weight"
              placeholder="الوزن التقريبي (كغ)"
              value={form.weight}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            {errors.weight && <p className="text-red-500 text-sm">{errors.weight}</p>}
          </div>

          {/* ملاحظات */}
          <textarea
            name="notes"
            placeholder="ملاحظات إضافية (اختياري)"
            value={form.notes}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          {/* زر الإرسال */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition font-semibold"
          >
            تأكيد الطلب
          </button>

        </form>
      </div>
    </div>
  );
}