import React from "react";

const PreparationInsights = () => {
  const predicted = 22;
  const actual = 18;
  const efficiency = Math.round(((predicted - actual) / predicted) * 100);
  const progressPercent = Math.round((actual / predicted) * 100);

  return (
    <div className="bg-white dark:bg-[#111111] rounded-[24px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 dark:border-[#222222] transition-colors duration-300">
      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-6 px-1">
        <p className="text-[10px] uppercase tracking-widest font-[800] text-gray-400 dark:text-gray-500">
          Prep Insights
        </p>
        <div className="flex items-center gap-1 text-[#F4521E]">
          <span className="text-xs">📈</span>
          <p className="text-[11px] font-bold tracking-widest uppercase text-[#F4521E]">
            Peak Hour Analysis
          </p>
        </div>
      </div>

      {/* ── Stats Card ── */}
      <div className="bg-gray-50 dark:bg-[#1A1A1A] rounded-2xl p-5 border border-gray-100 dark:border-[#222222]">
        {/* ── Predicted vs Actual ── */}
        <div className="flex items-start justify-between mb-4">
          {/* Predicted */}
          <div>
            <p className="text-[9px] font-[800] tracking-widest uppercase text-gray-400 dark:text-gray-600 mb-2">
              Predicted
            </p>
            <p className="font-[800] text-3xl text-[#111111] dark:text-white tracking-tighter">{predicted}m</p>
          </div>

          {/* Divider */}
          <div className="w-px h-12 bg-gray-200 dark:bg-[#333333]" />

          {/* Actual */}
          <div className="text-right">
            <p className="text-[9px] font-[800] tracking-widest uppercase text-gray-400 dark:text-gray-600 mb-2 text-right">
              Actual
            </p>
            <p className="font-[800] text-3xl text-[#F4521E] tracking-tighter">
              {actual}m
            </p>
          </div>
        </div>

        {/* ── Speed Efficiency ── */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400">
              Speed Efficiency
            </p>
            <p className="text-[11px] font-bold text-green-500">
              +{efficiency}% BETTER
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 dark:bg-[#222222] rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-[#F4521E] h-full rounded-full transition-all duration-1000"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* ── Quote ── */}
        <p className="text-xs text-gray-400 italic">
          "Kitchen is performing exceptionally well despite high demand."
        </p>
      </div>
    </div>
  );
};

export default PreparationInsights;
