import React, { useState } from "react";
import { FunnelIcon, BarsArrowUpIcon } from "@heroicons/react/24/outline";
import { HeartIcon, HeartIcon as HeartSolid } from "@heroicons/react/24/solid";

const Restaurants = () => {
  const restaurants = [
    {
      id: 1,
      name: "Gourmet Garden",
      cuisine: "Italian • Pasta • Seafood",
      rating: 4.8,
      time: "20–30 min",
      fee: "$2.49",
      badge: "TRENDING",
      badgeColor: "bg-[#F4521E]",
      status: "BUSY STATUS",
      statusColor: "text-red-500",
      dotColor: "bg-red-500",
      statusRight: "+15 min extra",
      statusRightColor: "text-[#F4521E]",
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=200&fit=crop",
    },
    {
      id: 2,
      name: "Sushi Zen",
      cuisine: "Japanese • Sushi • Rolls",
      rating: 4.9,
      time: "15–25 min",
      fee: "Free",
      badge: null,
      status: "FREE STATUS",
      statusColor: "text-green-500",
      dotColor: "bg-green-500",
      statusRight: "Fast Delivery",
      statusRightColor: "text-green-500",
      image:
        "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=200&fit=crop",
    },
    {
      id: 3,
      name: "Burger Beast",
      cuisine: "American • Burgers • Fries",
      rating: 4.5,
      time: "25–35 min",
      fee: "$1.99",
      badge: null,
      status: "STEADY",
      statusColor: "text-yellow-500",
      dotColor: "bg-yellow-500",
      statusRight: "Expected timing",
      statusRightColor: "text-gray-400",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=200&fit=crop",
    },
    {
      id: 4,
      name: "Biryani Hub",
      cuisine: "Indian • Spices • Rice",
      rating: 4.7,
      time: "30–40 min",
      fee: "$3.99",
      badge: "ECO FRIENDLY",
      badgeColor: "bg-green-500",
      status: "VERY BUSY",
      statusColor: "text-red-700",
      dotColor: "bg-red-700",
      statusRight: "+20 min extra",
      statusRightColor: "text-[#F4521E]",
      image:
        "https://images.unsplash.com/photo-1708782345014-db93ddd5608f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const [liked, setLiked] = useState([]);

  const toggleLike = (id) => {
    setLiked((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  return (
    <section className="px-[5%] py-6">
      {/* ── Section Header ── */}
      <div className="flex items-center justify-between mb-1">
        <h2 className="font-bold text-xl text-[#151515]">
          Popular Restaurants Near You
        </h2>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-white border border-black/10 rounded-full px-4 py-2 text-xs font-medium hover:bg-orange-50 transition cursor-pointer">
            <FunnelIcon className="w-5 h-5" /> Filter
          </button>
          <button className="flex items-center gap-2 bg-white border border-black/10 rounded-full px-4 py-2 text-xs font-medium hover:bg-orange-50 transition cursor-pointer">
            <BarsArrowUpIcon className="w-5 h-5" /> Sort by
          </button>
        </div>
      </div>
      <p className="text-xs text-gray-400 mb-4">
        Real-time availability and peak hour updates
      </p>

      {/* ── Cards Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {restaurants.map((r) => (
          <div
            key={r.id}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer"
          >
            {/* ── Card Image ── */}
            <div className="relative h-36">
              <img
                src={r.image}
                alt={r.name}
                className="w-full h-full object-cover"
              />

              {/* Badge */}
              {r.badge && (
                <span
                  className={`absolute top-2 left-2 ${r.badgeColor} text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide`}
                >
                  {r.badge}
                </span>
              )}

              {/* Heart Button */}
              <button
                onClick={() => toggleLike(r.id)}
                className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition"
              >
                {liked.includes(r.id) ? (
                  <HeartSolid className="w-4 h-4 text-red-500" />
                ) : (
                  <HeartIcon className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </div>

            {/* ── Card Body ── */}
            <div className="p-4">
              {/* Name + Rating */}
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-[15px] text-[#151515]">
                  {r.name}
                </span>
                <span className="text-yellow-400 font-semibold text-sm">
                  ⭐ {r.rating}
                </span>
              </div>

              {/* Cuisine */}
              <p className="text-xs text-gray-400 mb-3">{r.cuisine}</p>

              {/* Time + Fee */}
              <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                <span>🕐 {r.time}</span>
                <span>🛵 {r.fee}</span>
              </div>

              {/* Status Bar */}
              <div className="flex items-center justify-between pt-3 border-t border-black/5 text-[11px] font-semibold">
                <span className={`flex items-center gap-1 ${r.statusColor}`}>
                  <span className={`w-2 h-2 rounded-full ${r.dotColor}`} />
                  {r.status}
                </span>
                <span className={`${r.statusRightColor} italic`}>
                  {r.statusRight}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Restaurants;
