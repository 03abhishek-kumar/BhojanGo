import React, { useState, useEffect } from "react";
import { Mic, ShoppingCart } from "lucide-react";
import MenuSidebar from "../components/MenuSidebar";
import PeakHourChart from "../components/PeakHourChart";
import FoodCard from "../components/FoodCard";
import DetailNavbar from "../components/DetailNavbar";
import { useNavigate, useParams } from "react-router-dom";
import { config } from "../config/config.js";

const RestaurantDetail = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [activeCategory, setActiveCategory] = useState("Appetizers");
  const [cart, setCart] = useState([]);
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
      } catch (err) {
        console.error("Error fetching restaurant:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRestaurant();
  }, [id]);

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

  // Filter items based on activeCategory from the restaurant's menu
  const items =
    restaurant?.menu?.filter((item) => item.category === activeCategory) || [];

  const handleAddToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  const handleRemoveItem = (itemId) => {
    setCart((prev) => {
      const index = prev.findIndex((item) => item._id === itemId);
      if (index !== -1) {
        return prev.filter((_, i) => i !== index);
      }
      return prev;
    });
  };

  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#F5F3EE]">
        <div className="w-12 h-12 border-4 border-[#F4521E] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#F5F3EE]">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
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
    <div className="min-h-screen bg-[#F5F3EE] flex flex-col">
      {/* Navbar */}
      <DetailNavbar />

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <MenuSidebar
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
            <h2 className="text-xl font-bold text-[#151515]">
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
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 py-3 flex items-center justify-between z-50 shadow-2xl shadow-black/10">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
            Current Order
          </p>
          <p className="text-lg font-bold text-[#151515]">
            ${cartTotal.toFixed(2)}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Voice mic button */}
          <button className="w-11 h-11 rounded-full bg-[#FFF0EB] flex items-center justify-center border border-[#F4521E]/20 hover:bg-[#F4521E] hover:text-white transition-all duration-200 group cursor-pointer">
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
            className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-[#151515]">Your Order</h3>
              <button
                onClick={() => setViewOrderOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none cursor-pointer"
              >
                ×
              </button>
            </div>

            {cart.length === 0 ? (
              <p className="text-center text-gray-400 py-8">
                Your cart is empty
              </p>
            ) : (
              <>
                <div className="flex flex-col gap-3 mb-5">
                  {groupedCart.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center justify-between py-2 border-b border-slate-100"
                    >
                      <div>
                        <p className="text-sm font-semibold text-[#151515]">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center bg-gray-50 border border-slate-200 rounded-lg">
                          <button
                            onClick={() => handleRemoveItem(item._id)}
                            className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-gray-100 rounded-l-lg transition-colors cursor-pointer"
                          >
                            -
                          </button>
                          <span className="text-xs font-bold w-6 text-center text-[#151515]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleAddToCart(item)}
                            className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-[#F4521E] hover:bg-gray-100 rounded-r-lg transition-colors cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between mb-5 bg-[#FFF0EB] rounded-xl px-4 py-3">
                  <span className="font-bold text-[#151515]">Total</span>
                  <span className="font-bold text-[#F4521E] text-lg">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
                <button
                  className="w-full bg-[#F4521E] text-white font-bold py-3 rounded-xl hover:bg-[#e03d0e] transition-colors shadow-md shadow-orange-200 cursor-pointer"
                  onClick={() => {
                    localStorage.setItem("cart", JSON.stringify(cart));
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
                  Place Order
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
