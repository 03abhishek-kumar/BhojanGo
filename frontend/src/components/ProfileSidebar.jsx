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
    <aside className="w-64 shrink-0">
      <div className="bg-white dark:bg-[#111111] rounded-[24px] p-4 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col gap-1 border border-gray-100 dark:border-[#222222] transition-colors duration-300">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`flex items-center gap-3 px-5 py-4 rounded-xl text-xs font-[800] uppercase tracking-widest transition-all duration-300 text-left w-full cursor-pointer
              ${
                active === tab.id
                  ? "bg-[#F4521E] text-white shadow-lg shadow-orange-200 dark:shadow-none"
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#1A1A1A] hover:text-[#111111] dark:hover:text-white"
              }`}
          >
            <span className="text-base">{tab.emoji}</span>
            <span>{tab.label}</span>
          </button>
        ))}

        {/* ── Logout ── */}
        <div className="border-t border-gray-100 dark:border-[#222222] mt-3 pt-3">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-5 py-4 rounded-xl text-[11px] uppercase tracking-widest font-[800] text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all w-full text-left cursor-pointer"
          >
            <span className="text-lg">🚪</span>
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default ProfileSidebar;
