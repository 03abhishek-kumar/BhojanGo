import React, { useState, useContext, useEffect } from "react";
import { FunnelIcon, BarsArrowUpIcon } from "@heroicons/react/24/outline";
import { HeartIcon, HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { RestaurantContext } from "../context/RestaurantContext";
import { config } from "../config/config";

const Restaurants = () => {
  const { setSelectedRestaurant, searchQuery, selectedCategory } =
    useContext(RestaurantContext);
  const [restaurants, setRestaurants] = useState([]);
  const [liked, setLiked] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Derived state for filtered restaurants
  const filteredRestaurants = restaurants.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.cuisine.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory
      ? r.cuisine.toLowerCase().includes(selectedCategory.toLowerCase())
      : true;

    return matchesSearch && matchesCategory;
  });

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

  // Skeleton loader shown while fetching
  if (isLoading) {
    return (
      <section id="restaurants" className="px-8 py-6">
        <div className="flex items-center justify-between mb-2">
          <div className="h-7 w-52 bg-gray-200 dark:bg-[#1A1A1A] rounded-xl animate-pulse" />
          <div className="flex gap-3">
            <div className="h-8 w-20 bg-gray-200 dark:bg-[#1A1A1A] rounded-full animate-pulse" />
            <div className="h-8 w-20 bg-gray-200 dark:bg-[#1A1A1A] rounded-full animate-pulse" />
          </div>
        </div>
        <div className="h-4 w-64 bg-gray-200 dark:bg-[#1A1A1A] rounded animate-pulse mb-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-[#111111] rounded-[24px] overflow-hidden border border-gray-100 dark:border-[#222222]">
              <div className="h-[200px] bg-gray-200 dark:bg-[#1A1A1A] animate-pulse" />
              <div className="p-5 flex flex-col gap-3">
                <div className="h-5 w-3/4 bg-gray-200 dark:bg-[#1A1A1A] rounded animate-pulse" />
                <div className="h-4 w-1/2 bg-gray-200 dark:bg-[#1A1A1A] rounded animate-pulse" />
                <div className="h-px w-full bg-gray-100 dark:bg-[#222222]" />
                <div className="flex items-center justify-between">
                  <div className="h-6 w-16 bg-gray-200 dark:bg-[#1A1A1A] rounded animate-pulse" />
                  <div className="h-9 w-24 bg-gray-200 dark:bg-[#1A1A1A] rounded-xl animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="restaurants" className="px-8 py-6">
      {/* ── Section Header ── */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-[800] text-2xl text-[#111111] dark:text-white tracking-tight">
          Popular Meals Near You
        </h2>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-[#F5F3EE] dark:bg-[#111111] border border-transparent dark:border-[#222222] rounded-full px-4 py-2 text-xs font-[600] dark:text-gray-300 hover:bg-orange-50 dark:hover:border-[#F4521E]/50 transition cursor-pointer">
            <FunnelIcon className="w-4 h-4" /> Filter
          </button>
          <button className="flex items-center gap-2 bg-[#F5F3EE] dark:bg-[#111111] border border-transparent dark:border-[#222222] rounded-full px-4 py-2 text-xs font-[600] dark:text-gray-300 hover:bg-orange-50 dark:hover:border-[#F4521E]/50 transition cursor-pointer">
            <BarsArrowUpIcon className="w-4 h-4" /> Sort
          </button>
        </div>
      </div>
      <p className="text-xs text-gray-400 mb-4">
        Real-time availability and peak hour updates
      </p>

      {/* ── Cards Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5">
        {filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((r) => (
            <div
              key={r._id}
              onClick={() => {
                setSelectedRestaurant(r);
                navigate(`/restaurant/${r._id}`);
              }}
              className="group bg-white dark:bg-[#111111] rounded-[24px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-none hover:shadow-[0_8px_30px_rgba(244,82,30,0.1)] transition-all duration-300 cursor-pointer border border-gray-100 dark:border-[#222222] dark:hover:border-[#F4521E]/50 relative flex flex-col"
            >
              {/* Card Image and body content remains same */}
              <div className="relative h-[200px] w-full p-2">
                <div className="w-full h-full rounded-[18px] overflow-hidden relative">
                  <img
                    src={r.image}
                    alt={r.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  {r.badge && (
                    <span
                      className={`absolute top-3 left-3 ${r.badgeColor || "bg-[#F4521E]"} text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-md`}
                    >
                      {r.badge}
                    </span>
                  )}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(r._id);
                  }}
                  className="absolute top-4 right-4 w-9 h-9 bg-white/90 backdrop-blur-sm dark:bg-[#111111]/90 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition cursor-pointer border border-transparent dark:border-[#333333]"
                >
                  {liked.includes(r._id) ? (
                    <HeartSolid className="w-4.5 h-4.5 text-[#F4521E]" />
                  ) : (
                    <HeartIcon className="w-4.5 h-4.5 text-gray-400 dark:text-gray-500" />
                  )}
                </button>
              </div>
              <div className="p-5 pt-3 flex flex-col flex-grow">
                <div className="flex items-start justify-between mb-1">
                  <span className="font-[800] text-[17px] tracking-tight text-[#111111] dark:text-white leading-tight">
                    {r.name}
                  </span>
                  <span className="text-yellow-400 font-semibold text-sm">
                    ⭐ {r.rating}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[12px] font-[500] text-gray-400 dark:text-gray-500 mb-4">
                  <span className="flex-1 truncate">{r.cuisine}</span>
                  <span className="flex items-center bg-gray-50 dark:bg-[#1A1A1A] px-2 py-1 rounded-md">
                    <span className="text-[#F4521E] mr-1">●</span> {r.time}
                  </span>
                </div>
                <div className="mt-auto">
                  <div className="h-[1px] w-full bg-gray-100 dark:bg-[#222222] mb-4"></div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest block mb-0.5">
                        Delivery
                      </span>
                      <span className="text-[15px] font-[800] text-[#111111] dark:text-white">
                        {r.fee || "Free"}
                      </span>
                    </div>
                    <button
                      className="bg-[#F4521E] text-white text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-[#D43E0E] transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedRestaurant(r);
                        navigate(`/restaurant/${r._id}`);
                      }}
                    >
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
              No Results Found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              We couldn't find any restaurants matching your criteria. Try
              adjusting your search or filters.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Restaurants;
