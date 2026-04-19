import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

const Categories = () => {
  const categories = [
    { id: 1, name: "Pizza", emoji: "🍕" },
    { id: 2, name: "Healthy", emoji: "🥗" },
    { id: 3, name: "Biryani", emoji: "🍛" },
    { id: 4, name: "Burgers", emoji: "🍔" },
    { id: 5, name: "Sushi", emoji: "🍣" },
    { id: 6, name: "Desserts", emoji: "🍰" },
    { id: 7, name: "Salads", emoji: "🥙" },
    { id: 8, name: "Tacos", emoji: "🌮" },
    { id: 9, name: "Bevrages", emoji: "🍸" },
  ];

  const [active, setActive] = useState(null);
  return (
    <section className="px-8 py-2">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-[800] text-2xl text-[#111111] dark:text-white tracking-tight">
          Categories
        </h2>
        <Link
          to="/categories"
          className="text-sm font-medium text-[#F4521E] hover:underline flex items-center gap-2"
        >
          View All Categories <ArrowRightIcon className="w-4 h-4" />
        </Link>
      </div>

      {/* Categories Row */}
      <div className="flex gap-4 overflow-x-auto p-5 scrollbar-hide justify-between">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => setActive(cat.id)}
            className={`flex flex-col items-center gap-2 shrink-0 cursor-pointer group transition-all duration-300 ease-out `}
          >
            {/* Icon Box */}
            <div
              className={`w-18 h-18 rounded-[18px] flex items-center justify-center text-[38px] transition-all duration-300 ${
                active === cat.id
                  ? "bg-[#FFF4F0] dark:bg-[#F4521E]/10 border-2 border-[#F4521E]"
                  : "bg-white dark:bg-[#111111] border border-gray-100 dark:border-[#222222] group-hover:border-[#F4521E]/50 group-hover:bg-[#FFF4F0] dark:group-hover:bg-[#111111]"
              }`}
            >
              <span className="leading-none select-none transition-transform duration-300 group-hover:scale-110">
                {cat.emoji}
              </span>
            </div>

            {/* Label */}
            <span
              className={`text-[13px] tracking-wide mt-1 ${
                active === cat.id
                  ? "text-[#F4521E] font-[700]"
                  : "text-[#555555] dark:text-gray-400 font-[500] group-hover:text-[#111111] dark:group-hover:text-white"
              }`}
            >
              {cat.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
