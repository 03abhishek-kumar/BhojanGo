import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const tabs = [
  { id: "personal", label: "Personal Info", emoji: "👤" },
  { id: "orders", label: "Order History", emoji: "📦" },
  { id: "addresses", label: "Saved Addresses", emoji: "📍" },
  { id: "notifications", label: "Notifications", emoji: "🔔" },
  { id: "security", label: "Security", emoji: "🔒" },
];

const ProfileSidebar = ({ active, setActive }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <aside className="w-55 shrink-0">
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-3 shadow-sm flex flex-col gap-1 border border-transparent dark:border-slate-800 transition-colors duration-300">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-left w-full
              ${
                active === tab.id
                  ? "bg-[#F4521E] text-white shadow-md shadow-orange-200 dark:shadow-none"
                  : "text-[#151515] dark:text-slate-200 hover:bg-[#F5F3EE] dark:hover:bg-slate-800"
              }`}
          >
            <span className="text-base">{tab.emoji}</span>
            <span>{tab.label}</span>
          </button>
        ))}

        {/* ── Logout ── */}
        <div className="border-t border-black/5 dark:border-slate-800 mt-2 pt-2">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition w-full text-left cursor-pointer"
          >
            <span>🚪</span>
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default ProfileSidebar;
