import { useState } from "react";
import { BellIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { User, Settings } from "lucide-react";
import SettingsPopup from "./SettingsPopup";
import NotificationsPopup from "./NotificationsPopup";

const TrackingNavbar = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <nav className="flex items-center justify-between p-5 h-20 bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
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
        <div className="w-px h-8 bg-black/10" />

        {/* Order Info */}
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-base text-[#151515]">
              Order #BG-9921
            </span>
          </div>
          <p className="text-[11px] font-bold tracking-widest uppercase text-gray-400">
            Live Tracking Dashboard
          </p>
        </div>
      </div>

      {/* ── Center — Live Connection Badge ── */}
      <div className="flex items-center gap-2 bg-white border border-black/8 rounded-full px-4 py-2">
        {/* Pulsing green dot */}
        <div className="relative flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <div className="absolute w-2 h-2 rounded-full bg-green-500 animate-ping opacity-75" />
        </div>
        <span className="text-xs font-bold tracking-widest uppercase text-[#151515]">
          Live Connection
        </span>
      </div>

      <div className="flex gap-3">
        {/* ── Right — Bell + Settings + Support ── */}
        <div className="flex items-center gap-3 ">
          {/* Bell */}
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center border border-black/8 cursor-pointer hover:bg-gray-50 transition relative"
            onClick={() => setNotificationsOpen(true)}
          >
            <BellIcon className="w-5 h-5 text-[#151515]" />
            <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#F4521E]" />
          </div>

          {/* Settings */}
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center border border-black/8 cursor-pointer hover:bg-orange-50 transition"
            onClick={() => setSettingsOpen(true)}
          >
            <Settings className="w-5 h-5 text-[#151515]" />
          </div>

          {/* Support Button */}
          <Link
            to="/support"
            className="bg-[#151515] hover:bg-black text-white text-sm font-bold px-5 py-2.5 rounded-full transition no-underline"
          >
            Support
          </Link>
        </div>

        {/* Avatar + Name */}
        <div
          className="flex items-center gap-3 cursor-pointer group border border-solid border-slate-400 p-1 rounded-full"
          onClick={() => navigate("/profile")}
        >
          <div className="w-10 h-10 rounded-full bg-[#ea9670] flex items-center justify-center text-sm font-bold text-[#ea9670] border-2 border-transparent group-hover:border-[#E0D7FF] transition-all">
            <User color="white" />
          </div>
          <span className="text-sm font-semibold text-slate-800 group-hover:text-black pr-3">
            Alex
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
