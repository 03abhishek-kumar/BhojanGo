import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  Plus,
  Upload,
  Store,
  UtensilsCrossed,
  Settings,
  BarChart3,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import Navbar from "../components/Navbar";

const Management = () => {
  const { profileData } = useAuth();
  const isAdmin = profileData?.role === "admin";

  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    {
      label: "Total Restaurants",
      value: isAdmin ? "12" : "1",
      icon: Store,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Active Menu Items",
      value: "48",
      icon: UtensilsCrossed,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      label: "Monthly Orders",
      value: "1,240",
      icon: BarChart3,
      color: "text-green-600",
      bg: "bg-green-50",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F3EE] dark:bg-slate-950 transition-colors duration-300">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-[#FFF0EB] text-[#F4521E] text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md border border-[#F4521E]/10">
                {profileData?.role?.replace("_", " ")} Panel
              </span>
              {isAdmin && <ShieldCheck size={16} className="text-[#F4521E]" />}
            </div>
            <h1 className="text-3xl font-extrabold text-[#151515] tracking-tight">
              Management Dashboard
            </h1>
            <p className="text-gray-500 mt-1">
              Manage your restaurants and upload new culinary data.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="bg-white text-[#151515] font-bold px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-gray-50 transition shadow-sm flex items-center gap-2 cursor-pointer">
              <Settings size={18} />
              Settings
            </button>
            <button className="bg-[#F4521E] text-white font-bold px-5 py-2.5 rounded-xl hover:bg-[#E64A19] transition shadow-lg shadow-orange-200 flex items-center gap-2 cursor-pointer">
              <Plus size={18} />
              Add Restaurant
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 transition-transform hover:scale-[1.02]"
            >
              <div
                className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center`}
              >
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-400 font-medium">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold text-[#151515]">
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="border-b border-slate-100">
            <nav className="flex px-6 overflow-x-auto">
              {["Overview", "Restaurants", "Menu Items", "Analytics"].map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab.toLowerCase())}
                    className={`px-6 py-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                      activeTab === tab.toLowerCase()
                        ? "border-[#F4521E] text-[#F4521E]"
                        : "border-transparent text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    {tab}
                  </button>
                ),
              )}
            </nav>
          </div>

          <div className="p-8">
            <div className="max-w-2xl mx-auto text-center py-12">
              <div className="w-20 h-20 bg-orange-50 text-[#F4521E] rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Upload size={32} />
              </div>
              <h2 className="text-2xl font-bold text-[#151515] mb-3">
                Upload Restaurant Data
              </h2>
              <p className="text-gray-500 mb-8">
                Drag and drop your restaurant data files or menu catalogs to
                start syncing with the BhojanGo platform.
              </p>

              <div className="border-2 border-dashed border-slate-200 rounded-3xl p-12 hover:border-[#F4521E]/50 hover:bg-orange-50/30 transition-all cursor-pointer group">
                <p className="text-gray-400 group-hover:text-[#F4521E] transition-colors">
                  Click to select files or drag and drop
                </p>
                <p className="text-[11px] text-gray-300 mt-2 uppercase tracking-widest font-bold">
                  JSON, CSV, or Image Catalogs
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Management;
