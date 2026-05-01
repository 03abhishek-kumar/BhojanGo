import React, { useContext } from "react";
import { XMarkIcon, MapPinIcon } from "@heroicons/react/24/outline";
import LocationSearch from "./LocationSearch";
import { RestaurantContext } from "../context/RestaurantContext";
import { useAuth } from "../context/AuthContext";
import { config } from "../config/config";

const LocationModal = ({ isOpen, onClose }) => {
  const { address, setAddress } = useContext(RestaurantContext);
  const { user } = useAuth();
  const API_KEY = import.meta.env.VITE_LOCATIONIQ_KEY;

  if (!isOpen) return null;

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const url = `https://us1.locationiq.com/v1/reverse?key=${API_KEY}&lat=${latitude}&lon=${longitude}&format=json`;
          const response = await fetch(url);
          const data = await response.json();
          
          if (data && data.display_name) {
            setAddress(data.display_name);
            
            // Save to MongoDB if logged in
            if (user) {
              await fetch(`${config.BASE_URL}/api/users/location`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  uid: user.uid,
                  location: data.display_name,
                  name: user.displayName,
                  email: user.email,
                }),
              });
            }
            onClose();
          }
        } catch (error) {
          console.error("Reverse geocoding error:", error);
          alert("Failed to detect location. Please search manually.");
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Location access denied or unavailable.");
      }
    );
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center overflow-y-auto bg-black/40 backdrop-blur-sm p-4">
      {/* Clickable Overlay Area */}
      <div 
        onClick={onClose}
        className="fixed inset-0 cursor-default"
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div className="relative bg-white dark:bg-[#111111] w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 border border-transparent dark:border-[#222222]">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 dark:border-[#222222] flex items-center justify-between bg-orange-50/50 dark:bg-[#222222]/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-200 dark:shadow-none">
              <MapPinIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                Choose Location
              </h2>
              <p className="text-xs text-gray-500 dark:text-slate-400 font-medium">
                To see restaurants near you
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white dark:hover:bg-slate-800 rounded-full transition-colors shadow-sm dark:shadow-none"
          >
            <XMarkIcon className="w-6 h-6 text-gray-400 dark:text-slate-500" />
          </button>
        </div>

        {/* Body */}
        <div className="p-8">
          <div className="space-y-6">
            {/* Current Address Display */}
            {address !== "Select Location" && (
              <div className="bg-orange-50 dark:bg-orange-500/10 border border-orange-100 dark:border-orange-500/20 p-4 rounded-2xl">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-[10px] font-bold text-orange-600 dark:text-orange-500 uppercase tracking-widest">Currently Selected</span>
                </div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 leading-tight line-clamp-2">
                  {address}
                </p>
              </div>
            )}

            <div className="relative">
              <LocationSearch onSelect={onClose} />
            </div>

            <div className="pt-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-[1px] flex-1 bg-gray-100 dark:bg-[#222222]"></div>
                <span className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">
                  Or use current location
                </span>
                <div className="h-[1px] flex-1 bg-gray-100 dark:bg-[#222222]"></div>
              </div>

              <button
                className="w-full flex items-center justify-center gap-3 p-4 border-2 border-dashed border-orange-200 dark:border-slate-700 rounded-2xl text-orange-600 dark:text-orange-500 font-semibold hover:bg-orange-50 dark:hover:bg-slate-800/50 hover:border-orange-300 dark:hover:border-orange-600 transition-all group"
                onClick={handleDetectLocation}
              >
                <div className="w-8 h-8 bg-orange-100 dark:bg-[#222222] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MapPinIcon className="w-5 h-5" />
                </div>
                <span>Detect my location</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 dark:bg-[#111111]/50 text-center">
          <p className="text-[10px] text-gray-400 dark:text-slate-500 font-medium">
            Powered by LocationIQ • Accurate distance tracking
          </p>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;
