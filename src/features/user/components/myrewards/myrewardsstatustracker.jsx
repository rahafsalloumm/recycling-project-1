import { FiCheck, FiClock } from "react-icons/fi";

const steps = [
  { key: "ordered", label: "تم الطلب" },
  { key: "pending", label: "قيد الانتظار" },
  { key: "delivered", label: "تم التسليم" },
];

export default function MyRewardsStatusTracker({ currentStep = "pending" }) {
  const currentIndex = steps.findIndex((s) => s.key === currentStep);

  return (
    <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-6 mb-6">
      <h3 className="text-right font-bold text-gray-800 mb-6">
        حالة هذه المكافأة
      </h3>

      <div className="flex items-center justify-between mb-6 px-4">
        {steps.map((step, index) => {
          const isDone = index < currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <div key={step.key} className="flex-1 flex flex-col items-center relative">
              {index !== steps.length - 1 && (
                <div
                  className={`absolute top-4 right-1/2 w-full h-0.5 ${
                    isDone || isCurrent ? "bg-yellow-400" : "bg-gray-200"
                  }`}
                />
              )}
              <div
                className={`z-10 w-8 h-8 rounded-full flex items-center justify-center ${
                  isDone
                    ? "bg-gray-300 text-white"
                    : isCurrent
                    ? "bg-yellow-400 text-white"
                    : "bg-gray-200 text-gray-400"
                }`}
              >
                {isDone ? <FiCheck /> : isCurrent ? <FiClock /> : null}
              </div>
              <p className="text-sm text-gray-600 mt-2">{step.label}</p>
            </div>
          );
        })}
      </div>

      <div className="flex items-start gap-2 bg-yellow-100 rounded-lg p-3 text-sm text-gray-700">
        <span>ℹ️</span>
        <p>
          ملاحظة: سيتم استلام المكافأة عند إعادة طلب التدوير{" "}
          <span className="text-green-700 underline">التالي</span>.
        </p>
      </div>
    </div>
  );
}