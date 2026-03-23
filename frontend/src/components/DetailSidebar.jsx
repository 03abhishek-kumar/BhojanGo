import React, { useState } from "react";

const DetailSidebar = () => {
  const categories = [
    {
      id: 1,
      name: "Biryani",
      icon: "🍛",
    },
    {
      id: 2,
      name: "Starters",
      icon: "🥗",
    },
    {
      id: 3,
      name: "Desserts",
      icon: "🍰",
    },
    {
      id: 4,
      name: "Beverages",
      icon: "🥤",
    },
  ];

  const [active, setActive] = useState(1);

  return (
    <aside className="flex flex-col w-50 shrink-0 gap-2">
      {/* Categories List */}
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => setActive(cat.id)}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 w-full text-left
        ${
          active === cat.id
            ? "bg-[#F4521E] text-white shadow-md"
            : "bg-transparent text-[#151515] hover:bg-white"
        }`}
        >
          <span className="text-lg">{cat.icon} </span>
          <span>{cat.name} </span>
        </button>
      ))}

      {/* Chef Voice Note Card */}
      <div>
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 bg-[#FFF0EB] rounded-lg flex items-center justify-center">
            <span className="text-[#F4521E] text-sm">🎙️</span>
          </div>
          <span className="text-[11px] font-bold tracking-widest uppercase text-[#F4521E]">
            Chef Voice Note
          </span>
        </div>
        {/* Description */}
        <p className="text-xs text-gray-500 leading-relaxed mb-4">
          Want it extra spicy? Allergic to something? Don't type, just{" "}
          <span className="font-bold text-[#151515]">tell the chef</span>{" "}
          directly.
        </p>

        {/* Waveform visual */}
        <div className="flex items-end gap-0.75 h-6">
          {[3, 6, 9, 5, 8, 4, 7, 5, 9, 6, 3].map((h, i) => (
            <div
              key={i}
              className="w-0.75 bg-[#F4521E] rounded-full opacity-60"
              style={{ height: `${h * 2.5}px` }}
            />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default DetailSidebar;
