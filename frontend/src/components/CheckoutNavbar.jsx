import React from "react";
import { Link } from "react-router-dom";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CheckoutNavbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="flex items-center justify-between p-5 h-20 bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
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

      {/*Center Nav Links */}
      <div className="flex items-center gap-8">
        <Link
          to="/menu"
          className="text-sm font-medium text-[#151515] hover:text-[#F4521E] transition no-underline"
        >
          Menu
        </Link>
        <Link
          to="/offers"
          className="text-sm font-medium text-[#151515] hover:text-[#F4521E] transition no-underline"
        >
          Offers
        </Link>
      </div>

      {/* Account */}
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
    </nav>
  );
};

export default CheckoutNavbar;
