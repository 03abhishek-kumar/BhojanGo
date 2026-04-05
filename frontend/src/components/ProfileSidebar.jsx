import React from "react";

const tabs = [
  { id: "personal", label: "Personal Info", emoji: "👤" },
  { id: "orders", label: "Order History", emoji: "📦" },
  { id: "addresses", label: "Saved Addresses", emoji: "📍" },
  { id: "notifications", label: "Notifications", emoji: "🔔" },
  { id: "security", label: "Security", emoji: "🔒" },
];

const ProfileSidebar = ({ active, setActive }) => {
  return (
    <aside className="w-55 shrink-0">
      <div className="bg-white rounded-2xl p-3 shadow-sm flex flex-col gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-left w-full
              ${
                active === tab.id
                  ? "bg-[#F4521E] text-white shadow-md"
                  : "text-[#151515] hover:bg-[#F5F3EE]"
              }`}
          >
            <span className="text-base">{tab.emoji}</span>
            <span>{tab.label}</span>
          </button>
        ))}

        {/* ── Logout ── */}
        <div className="border-t border-black/5 mt-2 pt-2">
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition w-full text-left">
            <span>🚪</span>
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default ProfileSidebar;
