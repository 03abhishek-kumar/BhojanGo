import React, { useEffect, useRef } from "react";
import {
  X,
  ShoppingBag,
  Truck,
  Tag,
  Star,
  Clock,
  CheckCircle,
} from "lucide-react";

const notifications = [
  {
    id: 1,
    icon: Truck,
    iconBg: "from-green-50 to-green-100",
    iconColor: "text-green-600",
    title: "Order Delivered",
    message: "Your order #BG-9918 has been delivered successfully!",
    time: "2 min ago",
    unread: true,
  },
  {
    id: 2,
    icon: Tag,
    iconBg: "from-orange-50 to-orange-100",
    iconColor: "text-[#F4521E]",
    title: "Flash Sale — 40% Off!",
    message: "BhojanGo Kitchen: Flat 40% off on all biryanis today.",
    time: "15 min ago",
    unread: true,
  },
  {
    id: 3,
    icon: ShoppingBag,
    iconBg: "from-blue-50 to-blue-100",
    iconColor: "text-blue-600",
    title: "Order Confirmed",
    message: "Your order #BG-9921 is being prepared.",
    time: "1 hr ago",
    unread: false,
  },
  {
    id: 4,
    icon: Star,
    iconBg: "from-yellow-50 to-yellow-100",
    iconColor: "text-yellow-600",
    title: "Rate Your Experience",
    message: "How was your meal from Tandoori Flames?",
    time: "3 hrs ago",
    unread: false,
  },
  {
    id: 5,
    icon: CheckCircle,
    iconBg: "from-purple-50 to-purple-100",
    iconColor: "text-purple-600",
    title: "Reward Earned!",
    message: "You earned 50 BhojanCoins from your last order.",
    time: "Yesterday",
    unread: false,
  },
];

const NotificationsPopup = ({ isOpen, onClose }) => {
  const popupRef = useRef(null);
  const unreadCount = notifications.filter((n) => n.unread).length;

  /* ── Close on outside click ── */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        onClose();
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  /* ── Close on Escape ── */
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex justify-end items-start pt-20 pr-6">
      <div
        ref={popupRef}
        className="w-96 bg-white/90 backdrop-blur-xl border border-white/60 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] animate-[popIn_0.25s_ease-out_forwards] origin-top-right overflow-hidden"
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-[#151515] tracking-tight">
              Notifications
            </h3>
            {unreadCount > 0 && (
              <span className="text-[11px] font-bold bg-[#F4521E] text-white px-2 py-0.5 rounded-full">
                {unreadCount} new
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 transition cursor-pointer"
          >
            <X className="w-4 h-4 text-slate-500" />
          </button>
        </div>

        {/* ── Divider ── */}
        <div className="mx-5 h-px bg-linear-to-r from-transparent via-slate-200 to-transparent" />

        {/* ── Notification list ── */}
        <div className="max-h-95 overflow-y-auto px-3 py-2 custom-scrollbar">
          {notifications.map((n) => {
            const Icon = n.icon;
            return (
              <div
                key={n.id}
                className={`flex items-start gap-3 px-2 py-3 rounded-xl cursor-pointer transition-all group
                  ${n.unread ? "bg-orange-50/50 hover:bg-orange-50" : "hover:bg-slate-50"}`}
              >
                {/* Icon */}
                <div
                  className={`w-10 h-10 rounded-xl bg-linear-to-br ${n.iconBg} flex items-center justify-center shrink-0`}
                >
                  <Icon className={`w-4.5 h-4.5 ${n.iconColor}`} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p
                      className={`text-sm leading-tight ${n.unread ? "font-bold text-[#151515]" : "font-semibold text-slate-700"}`}
                    >
                      {n.title}
                    </p>
                    {n.unread && (
                      <div className="w-2 h-2 rounded-full bg-[#F4521E] shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 leading-snug line-clamp-2">
                    {n.message}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span className="text-[11px] text-slate-400">{n.time}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Divider ── */}
        <div className="mx-5 h-px bg-linear-to-r from-transparent via-slate-200 to-transparent" />

        {/* ── Footer ── */}
        <div className="px-5 py-3 flex items-center justify-between">
          <button className="text-xs font-semibold text-slate-500 hover:text-[#F4521E] transition cursor-pointer">
            Mark all as read
          </button>
          <button className="text-xs font-bold text-[#F4521E] hover:text-orange-700 transition cursor-pointer">
            View All →
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPopup;
