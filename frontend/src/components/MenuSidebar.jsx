import React from "react";
import { Utensils } from "lucide-react";

const MenuSidebar = ({ categories = [], activeCategory, setActiveCategory, cartTotal }) => {
  return (
    <aside className="flex flex-col w-52 shrink-0 gap-1 py-6 px-3 bg-[#F5F3EE] dark:bg-[#0A0A0A] border-r border-transparent dark:border-[#1A1A1A] transition-colors duration-300">
      {/* Dynamic Category List — built from the restaurant's actual menu */}
      <div className="flex flex-col gap-1 mb-6">
        {categories.length === 0 ? (
          // Skeleton while loading
          [...Array(4)].map((_, i) => (
            <div key={i} className="h-10 bg-gray-200 dark:bg-[#1A1A1A] rounded-xl animate-pulse" />
          ))
        ) : (
          categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 w-full text-left cursor-pointer
                  ${
                    isActive
                      ? "bg-[#F4521E] text-white shadow-md shadow-orange-200 dark:shadow-none"
                      : "bg-transparent text-[#111111] dark:text-gray-400 hover:bg-white dark:hover:bg-[#1A1A1A]"
                  }`}
              >
                <Utensils
                  size={16}
                  className={isActive ? "text-white" : "text-[#F4521E]"}
                />
                <span>{cat}</span>
              </button>
            );
          })
        )}
      </div>

      {/* Chef Voice Note Card */}
      <div className="bg-white dark:bg-[#111111] rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-[#222222] mt-2">
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 bg-[#FFF0EB] rounded-lg flex items-center justify-center">
            <span className="text-[#F4521E] text-sm">🎙️</span>
          </div>
          <span className="text-[10px] font-bold tracking-widest uppercase text-[#F4521E]">
            Chef Voice Note
          </span>
        </div>
        {/* Description */}
        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
          Want it extra spicy? Allergic to something? Don't type, just{" "}
          <span className="font-bold text-[#111111] dark:text-white">tell the chef</span>{" "}
          directly.
        </p>
        {/* Waveform visual */}
        <div className="flex items-end gap-0.5 h-6">
          {[3, 6, 9, 5, 8, 4, 7, 5, 9, 6, 3].map((h, i) => (
            <div
              key={i}
              className="w-0.75 bg-[#F4521E] rounded-full opacity-60"
              style={{ height: `${h * 2.5}px` }}
            />
          ))}
        </div>
      </div>

      {/* Bottom spacer */}
      <div className="flex-1" />

      {/* Current Order total */}
      {cartTotal > 0 && (
        <div className="mt-auto pt-4 border-t border-slate-200 dark:border-[#222222]">
          <p className="text-[10px] uppercase tracking-widest font-semibold text-gray-400 dark:text-gray-500 mb-1">
            Current Order
          </p>
          <p className="text-lg font-bold text-[#111111] dark:text-white">
            ${cartTotal.toFixed(2)}
          </p>
        </div>
      )}
    </aside>
  );
};

export default MenuSidebar;
