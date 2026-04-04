import { useState } from "react";
import { ShieldCheckIcon } from "@heroicons/react/24/solid";
import { BoltIcon, GiftIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const PaymentDetails = () => {
  const feeDetails = [
    { label: "Items Subtotal", amount: 42.5, color: "text-[#151515]" },
    {
      label: "Delivery Fee",
      amount: 5.99,
      color: "text-[#F4521E]",
      prefix: "+",
    },
    { label: "Service Fee", amount: 1.5, color: "text-[#151515]" },
    { label: "Taxes & Charges", amount: 3.82, color: "text-[#151515]" },
  ];

  const [confirmed, setConfirmed] = useState(false);
  const navigate = useNavigate();

  // ── calculate total ──
  const total = feeDetails.reduce((sum, fee) => sum + fee.amount, 0);

  const handleConfirm = () => {
    setConfirmed(true);
    setTimeout(() => {
      navigate("/tracking");
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* ── Payment Card ── */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">💳</span>
          <h2 className=" font-bold text-base text-[#151515]">
            Payment Details
          </h2>
        </div>

        {/* Peak Demand Warning */}
        <div className="flex items-start gap-3 bg-yellow-50 border border-yellow-200 rounded-xl p-3 mb-5">
          <BoltIcon className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-yellow-600 mb-0.5">
              Peak Demand Prediction
            </p>
            <p className="text-xs text-yellow-700 leading-relaxed">
              High demand in your area. Fees adjusted to ensure 28-min delivery.
            </p>
          </div>
        </div>

        {/* Fee Breakdown */}
        <div className="flex flex-col gap-3 mb-5">
          {feeDetails.map((fee) => (
            <div key={fee.label} className="flex items-center justify-between">
              <span className="text-sm text-gray-400">{fee.label}</span>
              <span className={`text-sm font-semibold ${fee.color}`}>
                {fee.prefix || ""}${fee.amount.toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-black/5 pt-4 mb-5">
          <div className="flex items-center justify-between">
            <span className="font-bold text-base text-[#151515]">
              Total Amount
            </span>
            <span className="font-bold text-2xl text-[#F4521E]">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Confirm Button */}
        <button
          onClick={handleConfirm}
          disabled={confirmed}
          className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold text-white transition
            ${
              confirmed
                ? "bg-green-500 cursor-not-allowed"
                : "bg-[#F4521E] hover:bg-[#D43E0E]"
            }`}
        >
          {confirmed ? <>✅ Order Placed!</> : <>Confirm & Place Order →</>}
        </button>

      </div>

      {/* ── Refer & Earn Card ── */}
      <div className="bg-white rounded-2xl p-5 shadow-sm relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute right-0 top-0 w-24 h-24 bg-orange-50 rounded-bl-full opacity-60" />

        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <GiftIcon className="w-5 h-5 text-[#F4521E]" />
            <h3 className="font-bold text-sm text-[#151515]">
              Refer & Earn
            </h3>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed mb-3">
            Get $10 off your next BhojanGo order by referring a friend.
          </p>
          <button className="flex items-center gap-1 text-sm font-bold text-[#F4521E] hover:underline transition">
            Share Link →
          </button>
        </div>
      </div>

      {/* ── Map Card ── */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
        {/* Map placeholder */}
        <div className="relative h-32 bg-gray-100">
          {/* Grid lines to simulate map */}
          <div className="absolute inset-0 opacity-20">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute w-full border-t border-gray-400"
                style={{ top: `${i * 25}%` }}
              />
            ))}
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute h-full border-l border-gray-400"
                style={{ left: `${i * 25}%` }}
              />
            ))}
          </div>

          {/* Rider Pin */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-10 h-10 bg-[#F4521E] rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-lg">🚴</span>
            </div>
          </div>

          {/* ETA Badge */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white rounded-full px-4 py-1.5 shadow-md">
            <span className="text-xs font-bold text-[#151515] tracking-wide">
              ETA: 28 MINS
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
