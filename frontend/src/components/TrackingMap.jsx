import { useState, useContext } from "react";
import { PhoneIcon, ChatBubbleLeftIcon } from "@heroicons/react/24/solid";
import { useAuth } from "../context/AuthContext";
import { RestaurantContext } from "../context/RestaurantContext";
import {
  PlusIcon,
  MinusIcon,
  CursorArrowRaysIcon,
} from "@heroicons/react/24/outline";

const TrackingMap = () => {
  const { user } = useAuth();
  const { selectedRestaurant, cart } = useContext(RestaurantContext);
  const totalPrice =
    cart?.length > 0
      ? cart.reduce((acc, item) => acc + item.price, 0).toFixed(2)
      : localStorage.getItem("lastOrderTotal") || "0.00";
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="relative w-full h-full min-h-150 bg-gray-100 dark:bg-[#0A0A0A] overflow-hidden">
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
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white dark:bg-[#111111] rounded-full px-4 py-1.5 shadow-lg border border-gray-100 dark:border-[#222222] whitespace-nowrap z-10 transition-colors">
            <span className="text-[11px] font-[800] text-[#111111] dark:text-white uppercase tracking-widest">
              {selectedRestaurant?.name || "Your Restaurant"}
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
          <div className="w-14 h-14 bg-[#F4521E] rounded-full flex items-center justify-center shadow-2xl border-4 border-white dark:border-[#0A0A0A] transition-colors">
            <span className="text-2xl">🚴</span>
          </div>
        </div>
      </div>

      {/* ── Home Destination Pin ── */}
      <div className="absolute" style={{ top: "72%", left: "68%" }}>
        <div className="bg-[#F4521E] text-white text-[11px] font-[800] px-4 py-2.5 rounded-2xl shadow-xl whitespace-nowrap uppercase tracking-widest">
          Home
          {/* Arrow */}
          <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[6px] border-r-[6px] border-t-[7px] border-t-[#F4521E]" />
        </div>
      </div>

      {/* ── Current Order Card (top left) ── */}
      <div className="absolute top-6 left-6 bg-white/90 dark:bg-[#111111]/90 backdrop-blur-md rounded-[24px] px-5 py-4 shadow-2xl border border-gray-100/50 dark:border-[#222222] flex items-center gap-4 min-w-72 transition-colors duration-300">
        <div className="flex -space-x-2">
          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-lg border-2 border-white">
            🍔
          </div>
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-lg border-2 border-white">
            🥗
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-[800] tracking-[0.15em] uppercase text-gray-400 dark:text-gray-500 mb-1">
            Active Order
          </p>
          <p className="text-sm font-[800] text-[#111111] dark:text-white truncate tracking-tight">
            {selectedRestaurant?.name || "Your Restaurant"} • ${totalPrice}
          </p>
        </div>
        <button className="text-sm font-bold text-[#F4521E] hover:underline">
          Details
        </button>
      </div>

      {/* ── Map Controls (top right) ── */}
      <div className="absolute top-6 right-6 flex flex-col gap-2">
        <button className="w-10 h-10 bg-white dark:bg-[#111111] rounded-xl flex items-center justify-center shadow-lg hover:bg-gray-50 dark:hover:bg-[#1A1A1A] transition border border-gray-100 dark:border-[#222222] group cursor-pointer">
          <PlusIcon className="w-5 h-5 text-[#111111] dark:text-white group-hover:scale-110 transition-transform" />
        </button>
        <button className="w-10 h-10 bg-white dark:bg-[#111111] rounded-xl flex items-center justify-center shadow-lg hover:bg-gray-50 dark:hover:bg-[#1A1A1A] transition border border-gray-100 dark:border-[#222222] group cursor-pointer">
          <MinusIcon className="w-5 h-5 text-[#111111] dark:text-white group-hover:scale-110 transition-transform" />
        </button>
        <button className="w-10 h-10 bg-white dark:bg-[#111111] rounded-xl flex items-center justify-center shadow-lg hover:bg-[#F4521E] transition border border-gray-100 dark:border-[#F4521E]/20 group mt-2 cursor-pointer">
          <CursorArrowRaysIcon className="w-5 h-5 text-[#F4521E] group-hover:text-white transition-colors" />
        </button>
      </div>

      {/* ── Delivery Partner Card (bottom right) ── */}
      <div
        className="absolute bottom-6 right-6 bg-white dark:bg-[#111111] rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.2)] dark:shadow-none border border-gray-100 dark:border-[#222222] overflow-hidden transition-all duration-300"
        style={{ width: "320px" }}
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
              <p className="font-[800] text-base text-[#111111] dark:text-white tracking-tight">
                Alex Johnson
              </p>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-yellow-400 text-xs">⭐</span>
                <span className="text-xs font-[800] text-[#111111] dark:text-white">
                  4.9
                </span>
              </div>
              <p className="text-[10px] font-[800] tracking-widest uppercase text-gray-400 dark:text-gray-500">
                Top Rated Courier
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2">
              <button className="w-10 h-10 bg-[#F4521E] rounded-full flex items-center justify-center shadow-lg shadow-orange-200 dark:shadow-none hover:bg-[#E64A19] transition cursor-pointer">
                <PhoneIcon className="w-4 h-4 text-white" />
              </button>
              <button className="w-10 h-10 bg-gray-50 dark:bg-[#222222] rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-[#333333] transition border border-gray-100 dark:border-[#333333] cursor-pointer">
                <ChatBubbleLeftIcon className="w-4 h-4 text-[#111111] dark:text-gray-400" />
              </button>
            </div>
          </div>

          {/* Arrival + Distance */}
          <div className="flex items-center gap-6 mt-2 px-1">
            <div className="flex items-center gap-3">
              <span className="text-[#F4521E] text-base">🕐</span>
              <div>
                <p className="text-[9px] font-[800] tracking-widest uppercase text-gray-400 dark:text-gray-500 mb-0.5">
                  Arrival
                </p>
                <p className="text-sm font-[800] text-[#111111] dark:text-white tracking-tight">
                  ~14 mins
                </p>
              </div>
            </div>
            <div className="w-px h-8 bg-gray-100 dark:bg-[#333333]" />
            <div className="flex items-center gap-3">
              <span className="text-[#F4521E] text-base">📍</span>
              <div>
                <p className="text-[9px] font-[800] tracking-widest uppercase text-gray-400 dark:text-gray-500 mb-0.5">
                  Distance
                </p>
                <p className="text-sm font-[800] text-[#111111] dark:text-white tracking-tight">
                  2.4 km
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom Status Bar ── */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full bg-[#111111] dark:bg-[#F4521E] hover:opacity-90 text-white text-[11px] font-[800] px-6 py-4 flex items-center justify-between transition-all uppercase tracking-widest cursor-pointer"
        >
          <span>Alex is approaching your location</span>
          <span
            className={`transition-transform duration-500 ${expanded ? "rotate-180" : ""}`}
          >
            ▲
          </span>
        </button>
      </div>
    </div>
  );
};

export default TrackingMap;
