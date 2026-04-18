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
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
      {/* Header row */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp size={18} className="text-[#F4521E]" />
            <h2 className="text-base font-bold text-[#151515]">
              Peak Hour Prediction
            </h2>
          </div>
          <p className="text-xs text-gray-400">
            Real-time kitchen traffic for{" "}
            <span className="font-semibold text-[#151515]">BhojanGo</span>
          </p>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap">
          Now: Light Traffic (12–18 mins delivery)
        </div>
      </div>

      {/* Chart */}
      <div className="flex items-end gap-6 justify-between px-4">
        {timeSlots.map((slot, sIdx) => (
          <div key={sIdx} className="flex flex-col items-center gap-2 flex-1">
            {/* Bar group */}
            <div className="relative flex items-end gap-1 h-24 w-full justify-center">
              {slot.isActive && (
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#F4521E] text-white text-[10px] font-bold px-3 py-1 rounded-full whitespace-nowrap shadow-md shadow-orange-200">
                  NOW: 1:45 PM
                  {/* small triangle */}
                  <div className="absolute left-1/2 -translate-x-1/2 -bottom-1.25 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-[#F4521E]" />
                </div>
              )}
              {slot.bars.map((h, bIdx) => (
                <div
                  key={bIdx}
                  className={`w-5 rounded-t-md transition-all duration-500 ${
                    slot.isActive && bIdx === 1
                      ? "bg-[#F4521E]"
                      : slot.isActive
                        ? "bg-orange-200"
                        : "bg-slate-200"
                  }`}
                  style={{ height: `${h * 10}px` }}
                />
              ))}
            </div>
            {/* Label */}
            <p className="text-[10px] tracking-widest uppercase text-gray-400 font-medium text-center">
              {slot.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PeakHourChart;
