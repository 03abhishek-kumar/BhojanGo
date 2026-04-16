import { useState } from "react";
import { PhoneIcon, ChatBubbleLeftIcon } from "@heroicons/react/24/solid";
import { useAuth } from "../context/AuthContext";
import {
  PlusIcon,
  MinusIcon,
  CursorArrowRaysIcon,
} from "@heroicons/react/24/outline";

const TrackingMap = () => {
  const { user } = useAuth();
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="relative w-full h-full min-h-150 bg-gray-100 overflow-hidden">
      {/* ── Fake Map Background ── */}
      <div className="absolute inset-0">
        {/* Diagonal stripe pattern to simulate map */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              #e5e7eb,
              #e5e7eb 1px,
              transparent 1px,
              transparent 20px
            )`,
          }}
        />

        {/* Horizontal roads */}
        {[20, 40, 60, 80].map((top) => (
          <div
            key={top}
            className="absolute w-full bg-white opacity-60"
            style={{ top: `${top}%`, height: "2px" }}
          />
        ))}

        {/* Vertical roads */}
        {[20, 40, 60, 80].map((left) => (
          <div
            key={left}
            className="absolute h-full bg-white opacity-60"
            style={{ left: `${left}%`, width: "2px" }}
          />
        ))}
      </div>

      {/* ── Dashed Route Line ── */}
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: "none" }}
      >
        <path
          d="M 200 180 Q 400 300 550 480"
          fill="none"
          stroke="#F4521E"
          strokeWidth="2"
          strokeDasharray="8 6"
          opacity="0.6"
        />
      </svg>

      {/* ── Restaurant Pin ── */}
      <div className="absolute" style={{ top: "22%", left: "28%" }}>
        <div className="relative">
          {/* Label */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white rounded-full px-3 py-1 shadow-md whitespace-nowrap">
            <span className="text-xs font-bold text-[#151515]">
              The Urban Bistro
            </span>
          </div>
          {/* Pin */}
          <div className="w-10 h-10 bg-[#151515] rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white text-base">🍽️</span>
          </div>
        </div>
      </div>

      {/* ── Rider Pin (animated) ── */}
      <div
        className="absolute transition-all duration-1000"
        style={{ top: "48%", left: "52%" }}
      >
        <div className="relative">
          {/* Pulse ring */}
          <div className="absolute inset-0 rounded-full bg-[#F4521E] opacity-20 animate-ping scale-150" />
          {/* Pin */}
          <div className="w-12 h-12 bg-[#F4521E] rounded-full flex items-center justify-center shadow-xl border-4 border-white">
            <span className="text-xl">🚴</span>
          </div>
        </div>
      </div>

      {/* ── Home Destination Pin ── */}
      <div className="absolute" style={{ top: "72%", left: "68%" }}>
        <div className="bg-[#F4521E] text-white text-xs font-bold px-3 py-2 rounded-xl shadow-lg whitespace-nowrap">
          Home ({user?.displayName || "Your"}'s Place)
          {/* Arrow */}
          <div className="absolute left-4 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#F4521E]" />
        </div>
      </div>

      {/* ── Current Order Card (top left) ── */}
      <div className="absolute top-4 left-4 bg-white rounded-2xl px-4 py-3 shadow-lg flex items-center gap-3 min-w-65">
        <div className="flex -space-x-2">
          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-lg border-2 border-white">
            🍔
          </div>
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-lg border-2 border-white">
            🥗
          </div>
        </div>
        <div className="flex-1">
          <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400">
            Current Order
          </p>
          <p className="text-sm font-bold text-[#151515]">
            Gourmet Feast • $42.50
          </p>
        </div>
        <button className="text-sm font-bold text-[#F4521E] hover:underline">
          Details
        </button>
      </div>

      {/* ── Map Controls (top right) ── */}
      <div className="absolute top-4 right-4 flex flex-col gap-1">
        <button className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-md hover:bg-gray-50 transition border border-black/5">
          <PlusIcon className="w-4 h-4 text-[#151515]" />
        </button>
        <button className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-md hover:bg-gray-50 transition border border-black/5">
          <MinusIcon className="w-4 h-4 text-[#151515]" />
        </button>
        <button className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-md hover:bg-gray-50 transition border border-black/5 mt-2">
          <CursorArrowRaysIcon className="w-4 h-4 text-[#F4521E]" />
        </button>
      </div>

      {/* ── Delivery Partner Card (bottom right) ── */}
      <div
        className="absolute bottom-4 right-4 bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300"
        style={{ width: "280px" }}
      >
        {/* Partner Info */}
        <div className="p-4">
          <div className="flex items-center gap-3 mb-4">
            {/* Avatar */}
            <div className="w-14 h-14 rounded-xl bg-amber-100 flex items-center justify-center text-2xl shrink-0">
              👨
            </div>

            {/* Name + Rating */}
            <div className="flex-1">
              <p className="font-['Sora'] font-bold text-base text-[#151515]">
                Alex Johnson
              </p>
              <div className="flex items-center gap-1 mb-0.5">
                <span className="text-yellow-400 text-xs">⭐</span>
                <span className="text-xs font-bold text-[#151515]">4.9</span>
              </div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400">
                Pro Delivery Partner
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2">
              <button className="w-9 h-9 bg-[#F4521E] rounded-full flex items-center justify-center shadow-md hover:bg-[#D43E0E] transition">
                <PhoneIcon className="w-4 h-4 text-white" />
              </button>
              <button className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition">
                <ChatBubbleLeftIcon className="w-4 h-4 text-[#151515]" />
              </button>
            </div>
          </div>

          {/* Arrival + Distance */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-[#F4521E] text-sm">🕐</span>
              <div>
                <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400">
                  Arrival
                </p>
                <p className="text-sm font-bold text-[#151515]">
                  ~14 mins away
                </p>
              </div>
            </div>
            <div className="w-px h-8 bg-black/8" />
            <div className="flex items-center gap-2">
              <span className="text-[#F4521E] text-sm">📍</span>
              <div>
                <p className="text-[10px] font-bold tracking-widests uppercase text-gray-400">
                  Distance
                </p>
                <p className="text-sm font-bold text-[#151515]">2.4 km left</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom Status Bar ── */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full bg-[#F4521E] hover:bg-[#D43E0E] text-white text-sm font-bold px-4 py-3 flex items-center justify-between transition"
        >
          <span>Alex is on his way to your location</span>
          <span
            className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
          >
            ∧
          </span>
        </button>
      </div>
    </div>
  );
};

export default TrackingMap;
