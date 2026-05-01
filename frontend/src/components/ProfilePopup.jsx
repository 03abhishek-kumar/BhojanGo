import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { X, User, LogOut, Settings, CreditCard, Shield } from "lucide-react";

const ProfilePopup = ({ isOpen, onClose }) => {
  const popupRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      onClose();
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  /* ── Close on outside click ── */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  /* ── Close on Escape key ── */
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-100 flex justify-end items-start pt-20 pr-6 pointer-events-none">
      <div
        ref={popupRef}
        className="w-85 bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] rounded-[28px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] overflow-hidden animate-[popIn_0.2s_ease-out] origin-top-right pointer-events-auto"
      >
        {/* Header with Close */}
        <div className="flex justify-end p-2">
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors">
                <X className="w-5 h-5 text-gray-500" />
            </button>
        </div>

        {/* User Info Section (Gmail Style) */}
        <div className="flex flex-col items-center px-6 pb-6 border-b border-gray-100 dark:border-[#222222]">
          <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-4 border-[#F5F3EE] dark:border-[#1A1A1A] shadow-sm">
            {user.photoURL ? (
              <img src={user.photoURL} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
                <div className="w-full h-full bg-[#F4521E] flex items-center justify-center text-white text-2xl font-bold">
                    {user.displayName?.charAt(0) || user.email?.charAt(0)}
                </div>
            )}
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
            {user.displayName || "BhojanGo User"}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            {user.email}
          </p>
          <button 
            onClick={() => { navigate("/profile"); onClose(); }}
            className="px-6 py-2 border border-gray-200 dark:border-[#333333] rounded-full text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
          >
            Manage Your Account
          </button>
        </div>

        {/* Middle Links */}
        <div className="py-2">
            {[
                { icon: User, label: "View Profile", to: "/profile" },
                { icon: CreditCard, label: "Orders & Billing", to: "/profile" },
                { icon: Shield, label: "Privacy & Security", to: "/profile" }
            ].map((link, idx) => (
                <button 
                    key={idx}
                    onClick={() => { navigate(link.to); onClose(); }}
                    className="w-full flex items-center gap-4 px-6 py-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group text-left"
                >
                    <link.icon className="w-5 h-5 text-gray-500 group-hover:text-[#F4521E]" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{link.label}</span>
                </button>
            ))}
        </div>

        <div className="h-px bg-gray-100 dark:border-[#222222]" />

        {/* Footer Logout */}
        <div className="p-4 flex justify-center">
            <button 
                onClick={handleLogout}
                className="flex items-center gap-2 px-8 py-2.5 bg-[#F5F3EE] dark:bg-[#1A1A1A] hover:bg-red-50 dark:hover:bg-red-950/20 rounded-full text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-all font-semibold"
            >
                <LogOut className="w-4 h-4" />
                Log Out
            </button>
        </div>
        
        {/* Footer Text */}
        <div className="px-6 pb-4 pt-2 text-center">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Privacy Policy • Terms of Service</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePopup;
