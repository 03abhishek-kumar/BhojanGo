import React, { useState, useContext, useEffect } from "react";
import { FunnelIcon, BarsArrowUpIcon } from "@heroicons/react/24/outline";
import { HeartIcon, HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { RestaurantContext } from "../context/RestaurantContext";
import { config } from "../config/config";

const Restaurants = () => {
  const { setSelectedRestaurant } = useContext(RestaurantContext);
  const [restaurants, setRestaurants] = useState([]);
  const [liked, setLiked] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch(`${config.BASE_URL}/api/restaurants`);
        if (!response.ok) {
           throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Ensure data is an array before setting state
        setRestaurants(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching restaurants:", err);
        setRestaurants([]); // Fallback to empty array on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const toggleLike = (id) => {
    setLiked((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <section className="px-8 py-6">
      {/* ── Section Header ── */}
      <div className="flex items-center justify-between mb-1">
        <h2 className="font-bold text-xl text-[#151515]">
          Popular Restaurants Near You
        </h2>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-white border border-black/10 rounded-xl px-4 py-2 text-xs font-medium hover:bg-orange-50 transition cursor-pointer">
            <FunnelIcon className="w-5 h-5" /> Filter
          </button>
          <button className="flex items-center gap-2 bg-white border border-black/10 rounded-xl px-4 py-2 text-xs font-medium hover:bg-orange-50 transition cursor-pointer">
            <BarsArrowUpIcon className="w-5 h-5" /> Sort by
          </button>
        </div>
      </div>
      <p className="text-xs text-gray-400 mb-4">
        Real-time availability and peak hour updates
      </p>

      {/* ── Cards Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5">
        {restaurants.map((r) => (
          <div
            key={r._id}
            onClick={() => {
              setSelectedRestaurant(r);
              navigate(`/restaurant/${r._id}`);
            }}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer"
          >
            {/* ── Card Image ── */}
            <div className="relative h-55">
              <img
                src={r.image}
                alt={r.name}
                className="w-full h-full object-cover"
              />

              {/* Badge */}
              {r.badge && (
                <span
                  className={`absolute top-2 left-2 ${r.badgeColor || 'bg-orange-500'} text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide`}
                >
                  {r.badge}
                </span>
              )}

              {/* Heart Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike(r._id);
                }}
                className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition"
              >
                {liked.includes(r._id) ? (
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

              <hr className="text-gray-300 my-3 mx-6" />

              {/* Status Bar */}
              <div
                className={`flex items-center justify-between text-[11px] font-semibold ${r.statusBoxColor || 'bg-gray-50'} rounded-xl p-3`}
              >
                <span className={`flex items-center gap-1 ${r.statusColor || 'text-gray-500'}`}>
                  <span className={`w-2 h-2 rounded-full ${r.dotColor || 'bg-gray-500'}`} />
                  {r.status}
                </span>
                <span className={`${r.statusColor || 'text-gray-500'} italic`}>
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
