import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { BellIcon } from "@heroicons/react/24/solid";
import { User, Settings } from "lucide-react";
import SettingsPopup from "./SettingsPopup";
import NotificationsPopup from "./NotificationsPopup";
import { useAuth } from "../context/AuthContext";

const ProfileNavbar = () => {
  const { user, profileData } = useAuth();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const navigate = useNavigate();

  const displayName =
    profileData?.name?.split(" ")[0] ||
    user?.displayName?.split(" ")[0] ||
    "User";

  return (
    <nav className="flex items-center justify-between p-5 h-20 bg-white/80 dark:bg-[#0A0A0A]/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 dark:border-[#222222] transition-colors duration-300">
      {/* ── Left — Logo ── */}
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

      {/* ── Center — Back Link ── */}
      <Link
        to="/"
        className="flex items-center gap-2 text-[11px] uppercase tracking-widest font-[800] text-[#111111] dark:text-white hover:text-[#F4521E] dark:hover:text-[#F4521E] transition no-underline"
      >
        <ArrowLeftIcon className="w-3.5 h-3.5" />
        Back to Home
      </Link>

      {/* ── Right — Account ── */}
      <div className="flex items-center gap-5">
        {/* Bell */}
        <div
          className="w-10 h-10 flex items-center justify-center cursor-pointer transition-all relative border border-gray-100 dark:border-[#222222] rounded-full hover:bg-gray-50 dark:hover:bg-[#1A1A1A]"
          onClick={() => setNotificationsOpen(true)}
        >
          <BellIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          <div className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#F4521E] border-2 border-white dark:border-[#0A0A0A]" />
        </div>

        {/* Settings */}
        <div
          className="w-10 h-10 flex items-center justify-center cursor-pointer rounded-full border border-gray-100 dark:border-[#222222] hover:bg-orange-50 dark:hover:bg-[#F4521E]/10 transition-all"
          onClick={() => setSettingsOpen(true)}
        >
          <Settings className="w-5 h-5 text-gray-500 dark:text-gray-400" />
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
            {displayName}
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

export default ProfileNavbar;
