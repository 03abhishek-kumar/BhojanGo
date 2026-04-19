import React from "react";
import { TrendingUp } from "lucide-react";

const timeSlots = [
  { label: "MORNING", bars: [2, 3, 2.5, 3.5] },
  { label: "LUNCH PEAK", bars: [5, 9, 8, 6], isActive: true },
  { label: "TEA TIME", bars: [3, 4, 3.5, 4.5] },
  { label: "DINNER RUSH", bars: [6, 7, 8, 6.5] },
];

const PeakHourChart = () => {
  return (
    <div className="bg-white dark:bg-[#111111] rounded-[24px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 dark:border-[#222222] mb-6 transition-colors duration-300">
      {/* Header row */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp size={18} className="text-[#F4521E]" />
            <h2 className="text-base font-[800] text-[#111111] dark:text-white tracking-tight">
              Peak Hour Prediction
            </h2>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Real-time kitchen traffic for{" "}
            <span className="font-[800] text-[#111111] dark:text-white">BhojanGo</span>
          </p>
        </div>
        <div className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-[10px] font-[800] uppercase tracking-widest px-4 py-2 rounded-full whitespace-nowrap">
          Now: Light Traffic (12–18 mins)
        </div>
      </div>

      {/* Chart */}
      <div className="flex items-end gap-6 justify-between px-4">
        {timeSlots.map((slot, sIdx) => (
          <div key={sIdx} className="flex flex-col items-center gap-2 flex-1">
            {/* Bar group */}
            <div className="relative flex items-end gap-1 h-24 w-full justify-center">
              {slot.isActive && (
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#F4521E] text-white text-[10px] font-[800] px-4 py-1.5 rounded-full whitespace-nowrap shadow-lg shadow-orange-200 dark:shadow-none z-10">
                  NOW: 1:45 PM
                  {/* small triangle */}
                  <div className="absolute left-1/2 -translate-x-1/2 -bottom-1.25 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[7px] border-t-[#F4521E]" />
                </div>
              )}
              {slot.bars.map((h, bIdx) => (
                <div
                  key={bIdx}
                  className={`w-5 rounded-t-md transition-all duration-500 ${
                    slot.isActive && bIdx === 1
                      ? "bg-[#F4521E]"
                      : slot.isActive
                        ? "bg-orange-200 dark:bg-orange-900/40"
                        : "bg-gray-100 dark:bg-[#1A1A1A]"
                  }`}
                  style={{ height: `${h * 10}px` }}
                />
              ))}
            </div>
            {/* Label */}
            <p className="text-[10px] tracking-widest uppercase text-gray-400 dark:text-gray-600 font-[800] text-center">
              {slot.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PeakHourChart;
