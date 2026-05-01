import React, { useState, useEffect } from "react";
import { Mic, ShoppingCart } from "lucide-react";
import MenuSidebar from "../components/MenuSidebar";
import PeakHourChart from "../components/PeakHourChart";
import FoodCard from "../components/FoodCard";
import DetailNavbar from "../components/DetailNavbar";
import { useNavigate, useParams } from "react-router-dom";
import { config } from "../config/config.js";
import { RestaurantContext } from "../context/RestaurantContext";
import { useContext } from "react";
import { StarIcon, ClockIcon, TruckIcon } from "@heroicons/react/24/solid";

const RestaurantDetail = () => {
  const { id } = useParams();
  const { cart, addToCart, removeFromCart, setSelectedRestaurant } =
    useContext(RestaurantContext);
  const [restaurant, setRestaurant] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [viewOrderOpen, setViewOrderOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await fetch(
          `${config.BASE_URL}/api/restaurants/${id}`,
        );
        const data = await response.json();
        setRestaurant(data);

        // FIX A: Always populate the context, even on direct URL access / refresh
        setSelectedRestaurant(data);

        // FIX B: Default to the FIRST real category in the menu, not always "Appetizers"
        if (data?.menu?.length > 0) {
          const firstCat = data.menu[0].category;
          setActiveCategory(firstCat);
        }
      } catch (err) {
        console.error("Error fetching restaurant:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRestaurant();
  }, [id, setSelectedRestaurant]);

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  const groupedCart = cart.reduce((acc, item) => {
    const existing = acc.find((c) => c._id === item._id);
    if (existing) {
      existing.quantity += 1;
    } else {
      acc.push({ ...item, quantity: 1 });
    }
    return acc;
  }, []);

  // FIX C: Extract unique categories from the actual menu data
  const menuCategories = restaurant?.menu
    ? [...new Set(restaurant.menu.map((item) => item.category))]
    : [];

  // Filter items by active category
  const items =
    restaurant?.menu?.filter((item) => item.category === activeCategory) || [];

  const handleAddToCart = (item) => addToCart(item);
  const handleRemoveItem = (itemId) => removeFromCart(itemId);

  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#F5F3EE] dark:bg-[#0A0A0A] transition-colors duration-300">
        <div className="w-12 h-12 border-4 border-[#F4521E] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#F5F3EE] dark:bg-[#0A0A0A] transition-colors duration-300">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Restaurant not found
        </h2>
        <button
          onClick={() => navigate("/")}
          className="bg-[#F4521E] text-white px-6 py-2 rounded-xl font-bold"
        >
          Go Back Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F3EE] dark:bg-[#0A0A0A] flex flex-col transition-colors duration-300">
      {/* Navbar */}
      <DetailNavbar />

      {/* FIX D: Restaurant Info Banner */}
      <div className="relative h-56 w-full overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop";
          }}
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

        {/* Restaurant info on top of image */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight mb-1">
                {restaurant.name}
              </h1>
              <p className="text-white/70 text-sm font-medium mb-3">
                {restaurant.cuisine}
              </p>
              <div className="flex items-center gap-4 flex-wrap">
                {/* Rating */}
                <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1.5">
                  <StarIcon className="w-3.5 h-3.5 text-yellow-400" />
                  <span className="text-white text-xs font-extrabold">
                    {restaurant.rating}
                  </span>
                </div>
                {/* Delivery Time */}
                <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1.5">
                  <ClockIcon className="w-3.5 h-3.5 text-white" />
                  <span className="text-white text-xs font-extrabold">
                    {restaurant.time || "30-40 mins"}
                  </span>
                </div>
                {/* Delivery Fee */}
                <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1.5">
                  <TruckIcon className="w-3.5 h-3.5 text-white" />
                  <span className="text-white text-xs font-extrabold">
                    {restaurant.fee || "Free Delivery"}
                  </span>
                </div>
                {/* Status badge */}
                {restaurant.badge && (
                  <span
                    className={`${restaurant.badgeColor || "bg-[#F4521E]"} text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest`}
                  >
                    {restaurant.badge}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <MenuSidebar
          categories={menuCategories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          cartTotal={cartTotal}
        />

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Peak Hour Chart */}
          <PeakHourChart />

          {/* Section header */}
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-extrabold text-[#111111] dark:text-white tracking-tight">
              {restaurant.name} Specials
            </h2>
            <span className="text-[11px] font-bold tracking-widest uppercase bg-[#FFF0EB] text-[#F4521E] border border-[#F4521E]/20 px-3 py-1 rounded-full">
              Top Rated
            </span>
          </div>

          {/* Food Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-28">
            {items.map((item) => {
              const quantity = cart.filter((c) => c._id === item._id).length;
              return (
                <FoodCard
                  key={item._id}
                  item={item}
                  quantity={quantity}
                  onAddToCart={handleAddToCart}
                  onRemoveFromCart={handleRemoveItem}
                />
              );
            })}
          </div>
        </main>
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#111111] border-t border-slate-100 dark:border-[#222222] px-6 py-3 flex items-center justify-between z-50 shadow-2xl shadow-black/10 transition-colors duration-300">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-500 font-semibold mb-0.5">
            Current Order
          </p>
          <p className="text-lg font-extrabold text-[#111111] dark:text-white leading-none">
            ${cartTotal.toFixed(2)}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Voice mic button */}
          <button className="w-11 h-11 rounded-full bg-[#FFF0EB] dark:bg-[#F4521E]/10 flex items-center justify-center border border-[#F4521E]/20 hover:bg-[#F4521E] hover:text-white transition-all duration-200 group cursor-pointer">
            <Mic
              size={18}
              className="text-[#F4521E] group-hover:text-white transition-colors"
            />
          </button>

          {/* View Order button */}
          <button
            onClick={() => setViewOrderOpen(true)}
            disabled={cart.length === 0}
            className="flex items-center gap-2 bg-[#F4521E] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#e03d0e] transition-all duration-200 shadow-md shadow-orange-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <ShoppingCart size={18} />
            View Order {cart.length > 0 && `(${cart.length})`}
          </button>
        </div>
      </div>

      {/* Order Modal */}
      {viewOrderOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end justify-center sm:items-center"
          onClick={() => setViewOrderOpen(false)}
        >
          <div
            className="bg-white dark:bg-[#111111] w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-extrabold text-[#111111] dark:text-white tracking-tight">
                Your Order
              </h3>
              <button
                onClick={() => setViewOrderOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none cursor-pointer"
              >
                ×
              </button>
            </div>

            {cart.length === 0 ? (
              <p className="text-center text-gray-400 dark:text-gray-600 py-8 font-medium">
                Your cart is empty
              </p>
            ) : (
              <>
                <div className="flex flex-col gap-3 mb-5">
                  {groupedCart.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-[#222222] last:border-none"
                    >
                      <div>
                        <p className="text-sm font-bold text-[#111111] dark:text-white">
                          {item.name}
                        </p>
                        <p className="text-xs text-[#F4521E] font-bold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center bg-gray-50 dark:bg-[#1A1A1A] border border-gray-100 dark:border-[#222222] rounded-xl overflow-hidden">
                          <button
                            onClick={() => handleRemoveItem(item._id)}
                            className="w-8 h-8 flex items-center justify-center text-[#111111] dark:text-gray-400 hover:text-red-500 hover:bg-gray-100 dark:hover:bg-[#222222] transition-colors cursor-pointer font-bold"
                          >
                            -
                          </button>
                          <span className="text-xs font-extrabold w-6 text-center text-[#111111] dark:text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleAddToCart(item)}
                            className="w-8 h-8 flex items-center justify-center text-[#111111] dark:text-gray-400 hover:text-[#F4521E] hover:bg-gray-100 dark:hover:bg-[#222222] transition-colors cursor-pointer font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between mb-6 bg-[#FFF4F0] dark:bg-[#F4521E]/10 rounded-2xl px-5 py-4">
                  <span className="font-bold text-[#111111] dark:text-white">
                    Total
                  </span>
                  <span className="font-extrabold text-[#F4521E] text-xl">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
                <button
                  className="w-full bg-[#F4521E] text-white font-extrabold py-4 rounded-2xl hover:bg-[#E64A19] transition-all shadow-lg shadow-orange-200 dark:shadow-none cursor-pointer tracking-wide"
                  onClick={() => {
                    localStorage.setItem(
                      "restaurant",
                      JSON.stringify({
                        id: restaurant._id,
                        name: restaurant.name,
                      }),
                    );
                    navigate("/checkout");
                  }}
                >
                  Confirm Order
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantDetail;
