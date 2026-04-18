import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  X,
  Moon,
  Globe,
  Bell,
  Shield,
  User,
  HelpCircle,
  LogOut,
} from "lucide-react";

const SettingsPopup = ({ isOpen, onClose }) => {
  const popupRef = useRef(null);
  const navigate = useNavigate();
  const { logout, profileData } = useAuth();
  const isManagementAllowed =
    profileData?.role === "admin" || profileData?.role === "restaurant_owner";

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

  if (!isOpen) return null;

  const quickToggles = [
    { icon: Moon, label: "Dark Mode", desc: "Switch to dark theme" },
    { icon: Globe, label: "Language", desc: "English (US)" },
    { icon: Bell, label: "Notifications", desc: "Push & email alerts" },
    { icon: Shield, label: "Privacy", desc: "Data & visibility" },
  ];

  const navLinks = [
    { icon: User, label: "My Profile", to: "/profile" },
    ...(isManagementAllowed
      ? [{ icon: Shield, label: "Management", to: "/manage" }]
      : []),
    { icon: HelpCircle, label: "Help & Support", to: "/support" },
  ];

  return (
    /* backdrop */
    <div className="fixed inset-0 z-100 flex justify-end items-start pt-20 pr-6">
      {/* card */}
      <div
        ref={popupRef}
        className="w-80 bg-white/90 backdrop-blur-xl border border-white/60 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] animate-[popIn_0.25s_ease-out_forwards] origin-top-right overflow-hidden"
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <h3 className="text-base font-bold text-[#151515] tracking-tight">
            Quick Settings
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 transition cursor-pointer"
          >
            <X className="w-4 h-4 text-slate-500" />
          </button>
        </div>

        {/* ── Divider ── */}
        <div className="mx-5 h-px bg-linear-to-r from-transparent via-slate-200 to-transparent" />

        {/* ── Toggle rows ── */}
        <div className="px-3 py-2">
          {quickToggles.map(({ icon: Icon, label, desc }) => (
            <div
              key={label}
              className="flex items-center gap-3 px-2 py-2.5 rounded-xl hover:bg-orange-50/70 transition-all cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl bg-linear-to-br from-orange-50 to-orange-100 flex items-center justify-center shrink-0 group-hover:from-orange-100 group-hover:to-orange-200 transition-all">
                <Icon className="w-4.5 h-4.5 text-[#F4521E]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#151515] leading-tight">
                  {label}
                </p>
                <p className="text-[11px] text-slate-400 leading-tight mt-0.5">
                  {desc}
                </p>
              </div>
              {/* toggle pill */}
              <div className="w-10 h-5.5 rounded-full bg-slate-200 relative cursor-pointer shrink-0 transition-colors hover:bg-slate-300">
                <div className="absolute top-0.75 left-0.75 w-4 h-4 rounded-full bg-white shadow-sm transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* ── Divider ── */}
        <div className="mx-5 h-px bg-linear-to-r from-transparent via-slate-200 to-transparent" />

        {/* ── Navigation links ── */}
        <div className="px-3 py-2">
          {navLinks.map(({ icon: Icon, label, to }) => (
            <div
              key={label}
              onClick={() => {
                navigate(to);
                onClose();
              }}
              className="flex items-center gap-3 px-2 py-2.5 rounded-xl hover:bg-orange-50/70 transition-all cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl bg-linear-to-br from-slate-50 to-slate-100 flex items-center justify-center shrink-0 group-hover:from-orange-50 group-hover:to-orange-100 transition-all">
                <Icon className="w-4.5 h-4.5 text-slate-600 group-hover:text-[#F4521E] transition-colors" />
              </div>
              <p className="text-sm font-semibold text-[#151515]">{label}</p>
            </div>
          ))}
        </div>

        {/* ── Divider ── */}
        <div className="mx-5 h-px bg-linear-to-r from-transparent via-slate-200 to-transparent" />

        {/* ── Log-out row ── */}
        <div className="px-3 pt-2 pb-3">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-2 py-2.5 rounded-xl hover:bg-red-50/70 transition-all cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-linear-to-br from-red-50 to-red-100 flex items-center justify-center shrink-0">
              <LogOut className="w-4.5 h-4.5 text-red-500" />
            </div>
            <p className="text-sm font-semibold text-red-500">Log Out</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPopup;
