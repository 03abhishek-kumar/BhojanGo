import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { User, Settings } from "lucide-react";
import { RestaurantContext } from "../context/RestaurantContext";
import { useNavigate } from "react-router-dom";
import SettingsPopup from "./SettingsPopup";
import { useAuth } from "../context/AuthContext";

const DetailNavbar = () => {
  const { selectedRestaurant } = useContext(RestaurantContext);
  const { user } = useAuth();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between p-5 h-20 bg-white/80 dark:bg-[#0A0A0A]/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 dark:border-[#222222] transition-colors duration-300">
      {/* Left Logo */}
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

      {/* Ordering From */}
      <div className="text-center">
        <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-widest font-[800]">
          Ordering From
        </p>
        <p className="text-sm font-[800] text-[#F4521E] tracking-tight">
          {selectedRestaurant ? selectedRestaurant.name : "BhojanGo Kitchen"}
        </p>
      </div>

      {/* Right — Settings + Avatar */}
      <div className="flex items-center gap-5">
        {/* Settings */}
        <div
          className="w-10 h-10 flex items-center justify-center cursor-pointer rounded-full hover:bg-orange-50 dark:hover:bg-[#1A1A1A] transition-all"
          onClick={() => setSettingsOpen(true)}
        >
          <Settings className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </div>

        <div
          className="flex items-center gap-3 cursor-pointer group border border-solid border-gray-200 dark:border-[#333333] p-1 rounded-full transition-all hover:border-[#F4521E]"
          onClick={() => navigate("/profile")}
        >
          <div className="w-10 h-10 rounded-full bg-[#ea9670] flex items-center justify-center text-sm font-bold text-[#ea9670] border-2 border-transparent group-hover:border-[#E0D7FF] dark:group-hover:border-[#F4521E]/30 transition-all overflow-hidden">
            <User color="white" />
          </div>
          <span className="text-sm font-[600] text-gray-700 dark:text-gray-300 group-hover:text-[#111111] dark:group-hover:text-white pr-3">
            {user?.displayName || "User"}
          </span>
        </div>
      </div>

      {/* Settings Popup */}
      <SettingsPopup
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </nav>
  );
};

export default DetailNavbar;
