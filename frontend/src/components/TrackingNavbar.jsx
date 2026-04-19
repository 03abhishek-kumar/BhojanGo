import { useState } from "react";
import { BellIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { User, Settings } from "lucide-react";
import SettingsPopup from "./SettingsPopup";
import NotificationsPopup from "./NotificationsPopup";
import { useAuth } from "../context/AuthContext";

const TrackingNavbar = () => {
  const { user } = useAuth();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <nav className="flex items-center justify-between p-5 h-20 bg-white/80 dark:bg-[#0A0A0A]/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 dark:border-[#222222] transition-colors duration-300">
      {/* ── Left — Logo + Order Info ── */}
      <div className="flex items-center gap-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group no-underline">
          <div className="w-10 h-10 bg-[#F4521E] rounded-xl flex items-center justify-center shadow-lg shadow-orange-200 transition-transform group-hover:scale-105">
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
              <path d="M18.06 22.99h1.66c.84 0 1.53-.64 1.63-1.46L23 5.05h-5V1h-1.97v4.05h-4.97l.3 2.34c1.71.47 3.31 1.32 4.27 2.26 1.44 1.42 2.43 2.89 2.43 5.29v8.05zM1 21.99V21h15.03v.99c0 .55-.45 1-1.01 1H2.01c-.56 0-1.01-.45-1.01-1zm15.03-7c0-8-15.03-8-15.03 0h15.03zM1.02 17h15v2h-15z" />
            </svg>
          </div>
          <span className="font-bold text-2xl text-[#F4521E] tracking-tight">
            BhojanGo
          </span>
        </Link>
        {/* Divider */}
        <div className="w-px h-8 bg-black/10 dark:bg-white/10" />

        {/* Order Info */}
        <div>
          <div className="flex items-center gap-2">
            <span className="font-[800] text-base text-[#111111] dark:text-white tracking-tight">
              Order #BG-9921
            </span>
          </div>
          <p className="text-[10px] uppercase tracking-widest font-[800] text-gray-400 dark:text-gray-500">
            Live Tracking
          </p>
        </div>
      </div>

      {/* ── Center — Live Connection Badge ── */}
      <div className="flex items-center gap-2 bg-white dark:bg-[#111111] border border-gray-100 dark:border-[#222222] rounded-full px-5 py-2.5 shadow-sm transition-colors transition-duration-300">
        {/* Pulsing green dot */}
        <div className="relative flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
          <div className="absolute w-2.5 h-2.5 rounded-full bg-green-500 animate-ping opacity-75" />
        </div>
        <span className="text-[10px] font-[800] tracking-widest uppercase text-[#111111] dark:text-white">
          Live Bridge
        </span>
      </div>

      <div className="flex gap-3">
        {/* ── Right — Bell + Settings + Support ── */}
        <div className="flex items-center gap-3 ">
          {/* Bell */}
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-100 dark:border-[#222222] cursor-pointer hover:bg-gray-50 dark:hover:bg-[#1A1A1A] transition relative"
            onClick={() => setNotificationsOpen(true)}
          >
            <BellIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <div className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#F4521E] border-2 border-white dark:border-[#0A0A0A]" />
          </div>

          {/* Settings */}
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-100 dark:border-[#222222] cursor-pointer hover:bg-orange-50 dark:hover:bg-[#F4521E]/10 transition"
            onClick={() => setSettingsOpen(true)}
          >
            <Settings className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </div>

          {/* Support Button */}
          <Link
            to="/support"
            className="bg-[#111111] dark:bg-[#222222] hover:bg-black dark:hover:bg-[#333333] text-white text-[11px] font-[800] px-6 py-3 rounded-full transition no-underline uppercase tracking-widest"
          >
            Support
          </Link>
        </div>

        {/* Avatar + Name */}
        <div
          className="flex items-center gap-3 cursor-pointer group border border-solid border-gray-200 dark:border-[#333333] p-1 rounded-full px-2 pr-4 hover:border-[#F4521E] transition-all"
          onClick={() => navigate("/profile")}
        >
          <div className="w-10 h-10 rounded-full bg-[#ea9670] flex items-center justify-center text-sm font-bold text-[#ea9670] border-2 border-transparent group-hover:border-[#E0D7FF] dark:group-hover:border-[#F4521E]/30 transition-all overflow-hidden">
            <User color="white" />
          </div>
          <span className="text-sm font-[600] text-gray-700 dark:text-gray-300 group-hover:text-[#111111] dark:group-hover:text-white transition-colors">
            {user?.displayName || "User"}
          </span>
        </div>
      </div>

      {/* Settings Popup */}
      <SettingsPopup
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
      <NotificationsPopup
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />
    </nav>
  );
};

export default TrackingNavbar;
