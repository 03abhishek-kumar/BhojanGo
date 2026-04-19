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
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-xl text-[#1a1a1a] dark:text-white">
          What's on your mind?
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
              className={`w-18 h-18 rounded-xl flex items-center justify-center text-[42px] transition-all duration-300 ${
                active === cat.id
                  ? "bg-[#F4521E] shadow-[0_12px_24px_rgba(244,82,30,0.2)] scale-95"
                  : "bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-sm group-hover:scale-110 group-hover:shadow-md group-hover:border-[#F4521E]"
              }`}
            >
              <span className="leading-none select-none transition-transform duration-300 group-hover:rotate-6">
                {cat.emoji}
              </span>
            </div>

            {/* Label */}
            <span
              className={`text-[12px] font-medium tracking-tight ${
                active === cat.id
                  ? "text-[#F4521E] font-semibold"
                  : "text-gray-700 dark:text-slate-400 group-hover:text-[#1a1a1a] dark:group-hover:text-white"
              }`}
            >
              {" "}
              {cat.name}{" "}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
