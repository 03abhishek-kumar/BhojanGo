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
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-bold text-xl text-[#1a1a1a]">
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
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide justify-between">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => setActive(cat.id)}
            className="flex flex-col items-center gap-2 shrink-0 cursor-pointer group"
          >
            {/* Icon Box */}
            <div
              className={`w-18 h-18 rounded-xl flex items-center justify-center text-3xl border transition-all duration-200
                ${
                  active === cat.id
                    ? "bg-[#F4521E] border-[#F4521E] shadow-lg scale-105"
                    : "bg-white border-black/7 hover:shadow-md hover:-translate-y-1"
                }`}
            >
              {cat.emoji}
            </div>

            {/* Label */}
            <span
              className={`text-[12px] font-medium tracking-tight ${
                active === cat.id
                  ? "text-[#F4521E] font-semibold"
                  : "text-gray-700 group-hover:text-[#1a1a1a]"
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
