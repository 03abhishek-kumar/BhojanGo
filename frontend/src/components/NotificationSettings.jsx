import { useState } from "react";

const notificationOptions = [
  { id: "order_updates",  label: "Order Updates",       description: "Get notified about your order status",       emoji: "📦" },
  { id: "promotions",     label: "Promotions & Offers",  description: "Deals, discounts and special offers",        emoji: "🎉" },
  { id: "peak_hours",     label: "Peak Hour Alerts",     description: "Get notified when kitchen traffic is low",   emoji: "⏰" },
  { id: "new_restaurant", label: "New Restaurants",      description: "Discover new restaurants near you",          emoji: "🍽️" },
  { id: "email_notifs",   label: "Email Notifications",  description: "Receive updates via email",                  emoji: "📧" },
  { id: "sms_notifs",     label: "SMS Notifications",    description: "Receive updates via text message",           emoji: "💬" },
];

export default function NotificationSettings() {
  const [settings, setSettings] = useState({
    order_updates:  true,
    promotions:     true,
    peak_hours:     false,
    new_restaurant: false,
    email_notifs:   true,
    sms_notifs:     false,
  });

  const toggle = (id) => {
    setSettings((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">

      {/* ── Header ── */}
      <div className="mb-6">
        <h3 className="font-['Sora'] font-bold text-base text-[#151515]">
          Notification Settings
        </h3>
        <p className="text-xs text-gray-400 mt-0.5">
          Choose what you want to be notified about
        </p>
      </div>

      {/* ── Toggles List ── */}
      <div className="flex flex-col gap-4">
        {notificationOptions.map((option) => (
          <div
            key={option.id}
            className="flex items-center justify-between py-3 border-b border-black/5 last:border-none"
          >
            {/* Left */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#F5F3EE] rounded-xl flex items-center justify-center text-xl">
                {option.emoji}
              </div>
              <div>
                <p className="font-medium text-sm text-[#151515]">
                  {option.label}
                </p>
                <p className="text-xs text-gray-400">
                  {option.description}
                </p>
              </div>
            </div>

            {/* Toggle Switch */}
            <button
              onClick={() => toggle(option.id)}
              className={`relative w-12 h-6 rounded-full transition-all duration-300 shrink-0
                ${settings[option.id] ? "bg-[#F4521E]" : "bg-gray-200"}`}
            >
              <div
                className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-300
                  ${settings[option.id] ? "left-7" : "left-1"}`}
              />
            </button>

          </div>
        ))}
      </div>

    </div>
  );
}