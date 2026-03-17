import React, { useState } from "react";
import {
  MapPinIcon,
  ChevronDownIcon,
  BellIcon,
} from "@heroicons/react/24/solid";

const Navbar = () => {
  const [location, setLocation] = useState("New York, Central Park");
  return (
    <nav className="flex items-center justify-between p-5 h-20 bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
      {/* left Side */}
      <div className="flex gap-14">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 group no-underline">
          <div className="w-10 h-10 bg-[#F4521E] rounded-xl flex items-center justify-center shadow-lg shadow-orange-200 transition-transform group-hover:scale-105">
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
              <path d="M18.06 22.99h1.66c.84 0 1.53-.64 1.63-1.46L23 5.05h-5V1h-1.97v4.05h-4.97l.3 2.34c1.71.47 3.31 1.32 4.27 2.26 1.44 1.42 2.43 2.89 2.43 5.29v8.05zM1 21.99V21h15.03v.99c0 .55-.45 1-1.01 1H2.01c-.56 0-1.01-.45-1.01-1zm15.03-7c0-8-15.03-8-15.03 0h15.03zM1.02 17h15v2h-15z" />
            </svg>
          </div>
          <span className="font-bold text-2xl text-[#F4521E] tracking-tight">
            BhojanGo
          </span>
        </a>

        {/* Location */}
        <div className="flex items-center gap-2 bg-orange-50 border border-slate-200 rounded-full px-4 py-2 cursor-pointer shadow-sm hover:shadow-md hover:border-orange-200 transition-all duration-300">
          <MapPinIcon className="w-4 h-4 text-[#F4521E]" />
          <span className="text-sm font-medium text-slate-700">{location}</span>
          <ChevronDownIcon className="w-4 h-4 text-slate-400" />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-5">
        {/* Bell */}
        <div className="w-10 h-10 flex items-center justify-center cursor-pointer transition-all ">
          <BellIcon className="w-5 h-5 text-slate-600" />
        </div>

        {/* Avatar + Name */}
        <div className="flex items-center gap-3 cursor-pointer group border border-solid border-slate-400 p-1 rounded-full">
          <div className="w-10 h-10 rounded-full bg-[#E0D7FF] flex items-center justify-center text-sm font-bold text-[#5B4FCC] border-2 border-transparent group-hover:border-[#E0D7FF] transition-all">
            A
          </div>
          <span className="text-sm font-semibold text-slate-800 group-hover:text-black pr-3">
            Alex
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
