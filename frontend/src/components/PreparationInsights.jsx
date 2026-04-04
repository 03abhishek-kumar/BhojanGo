import React from 'react'

const PreparationInsights = () => {

    const predicted = 22;
  const actual = 18;
  const efficiency = Math.round(((predicted - actual) / predicted) * 100);
  const progressPercent = Math.round((actual / predicted) * 100);


  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">

      {/* ── Header ── */}
      <div className="flex items-center justify-around m-4">
        <p className="text-[11px] font-bold tracking-widest uppercase text-gray-400">
          Preparation Insights
        </p>
        <div className="flex items-center gap-1 text-[#F4521E]">
          <span className="text-xs">📈</span>
          <p className="text-[11px] font-bold tracking-widest uppercase text-[#F4521E]">
            Peak Hour Analysis
          </p>
        </div>
      </div>

      {/* ── Stats Card ── */}
      <div className="bg-[#F5F3EE] rounded-xl p-4">

        {/* ── Predicted vs Actual ── */}
        <div className="flex items-start justify-between mb-4">

          {/* Predicted */}
          <div>
            <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-1">
              BhojanGo Predicted
            </p>
            <p className="font-bold text-3xl text-[#151515]">
              {predicted}m
            </p>
          </div>

          {/* Divider */}
          <div className="w-px h-12 bg-black/10" />

          {/* Actual */}
          <div>
            <p className="text-[10px] font-bold tracking-widests uppercase text-gray-400 mb-1">
              Actual Prep Time
            </p>
            <p className="font-['Sora'] font-bold text-3xl text-[#F4521E]">
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
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-[#F4521E] h-2 rounded-full transition-all duration-700"
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
  )
}

export default PreparationInsights
