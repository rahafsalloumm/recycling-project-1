import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { HiGift } from "react-icons/hi2";

export default function MyRewardsHeader() {
  const navigate = useNavigate();

  return (
    <div className="text-center mb-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm mb-4"
      >
        <FiArrowRight />
        العودة
      </button>

      <div className="flex items-center justify-center gap-2">
        <HiGift className="text-2xl text-green-600" />
        <h1 className="text-2xl font-bold text-gray-800">استبدال المكافأة</h1>
      </div>
      <p className="text-gray-500 mt-2">استخدم نقاطك للحصول على هذه المكافأة</p>
    </div>
  );
}