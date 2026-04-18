import React, { useState } from "react";
import { Link } from "react-router-dom";

import { User, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  MapPinIcon,
  ChevronDownIcon,
  BellIcon,
} from "@heroicons/react/24/solid";
import SettingsPopup from "./SettingsPopup";
import NotificationsPopup from "./NotificationsPopup";
import { useAuth } from "../context/AuthContext";
import { RestaurantContext } from "../context/RestaurantContext";
import LocationModal from "./LocationModal";

const Navbar = () => {
  const { address, setAddress, setIsLocationModalOpen } = React.useContext(
    RestaurantContext
  );
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  // Fetch location from MongoDB when user logs in
  React.useEffect(() => {
    const fetchUserLocation = async () => {
      if (user) {
        try {
          const response = await fetch(`http://localhost:5000/api/users/${user.uid}`);
          const data = await response.json();
          if (data && data.location) {
            setAddress(data.location);
          }
        } catch (error) {
          console.error("Error fetching user location:", error);
        }
      }
    };
    fetchUserLocation();
  }, [user, setAddress]);
  return (
    <nav className="flex items-center justify-between p-5 h-20 bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
      {/* left Side */}
      <div className="flex gap-14">
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

        {/* Location */}
        <div 
          className="flex items-center gap-2 bg-orange-50 border border-slate-200 rounded-full px-4 py-2 cursor-pointer shadow-sm hover:shadow-md hover:border-orange-200 transition-all duration-300"
          onClick={() => setIsLocationModalOpen(true)}
        >
          <MapPinIcon className="w-4 h-4 text-[#F4521E]" />
          <span className="text-sm font-medium text-slate-700 truncate max-w-[150px]">
            {address}
          </span>
          <ChevronDownIcon className="w-4 h-4 text-slate-400" />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-5">
        {/* Bell */}
        <div
          className="w-10 h-10 flex items-center justify-center cursor-pointer transition-all relative"
          onClick={() => setNotificationsOpen(true)}
        >
          <BellIcon className="w-5 h-5 text-slate-600" />
          <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#F4521E]" />
        </div>

        {/* Settings */}
        <div
          className="w-10 h-10 flex items-center justify-center cursor-pointer rounded-full hover:bg-orange-50 transition-all"
          onClick={() => setSettingsOpen(true)}
        >
          <Settings className="w-5 h-5 text-slate-600" />
        </div>

        {/* Avatar + Name or Login Button */}
        {user ? (
          <div
            className="flex items-center gap-3 cursor-pointer group border border-solid border-slate-400 p-1 rounded-full"
            onClick={() => navigate("/profile")}
          >
            <div className="w-10 h-10 rounded-full bg-[#ea9670] flex items-center justify-center text-sm font-bold text-[#ea9670] border-2 border-transparent group-hover:border-[#E0D7FF] transition-all overflow-hidden">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User color="white" />
              )}
            </div>
            <span className="text-sm font-semibold text-slate-800 group-hover:text-black pr-3">
              {user.displayName || "User"}
            </span>
          </div>
        ) : (
          <button
            onClick={() => navigate("/auth")}
            className="bg-[#F4521E] hover:bg-[#E64A19] text-white px-5 py-2.5 rounded-full font-medium transition-colors shadow-md hover:shadow-lg text-sm"
          >
            Login / Sign Up
          </button>
        )}
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

export default Navbar;
