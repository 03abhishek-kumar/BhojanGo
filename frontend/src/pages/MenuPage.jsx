import React, { useState } from "react";
import { Mic, ShoppingCart } from "lucide-react";
import MenuSidebar from "../components/MenuSidebar";
import PeakHourChart from "../components/PeakHourChart";
import FoodCard from "../components/FoodCard";
import menuItems from "../data/menuItems";
import DetailNavbar from "../components/DetailNavbar";

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState("Appetizers");
  const [cart, setCart] = useState([]);
  const [viewOrderOpen, setViewOrderOpen] = useState(false);

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);
  const items = menuItems[activeCategory] || [];

  const handleAddToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  const handleRemoveFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-[#F5F3EE] flex flex-col">
      {/* Navbar */}
      <DetailNavbar cartTotal={cartTotal} />

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
              BhojanGo Specials
            </h2>
            <span className="text-[11px] font-bold tracking-widest uppercase bg-[#FFF0EB] text-[#F4521E] border border-[#F4521E]/20 px-3 py-1 rounded-full">
              Top Rated
            </span>
          </div>

          {/* Food Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-28">
            {items.map((item) => (
              <FoodCard
                key={item.id}
                item={item}
                onAddToCart={handleAddToCart}
              />
            ))}
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
                  {cart.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between py-2 border-b border-slate-100"
                    >
                      <div>
                        <p className="text-sm font-semibold text-[#151515]">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemoveFromCart(idx)}
                        className="text-red-400 hover:text-red-600 text-xs font-semibold cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between mb-5 bg-[#FFF0EB] rounded-xl px-4 py-3">
                  <span className="font-bold text-[#151515]">Total</span>
                  <span className="font-bold text-[#F4521E] text-lg">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
                <button className="w-full bg-[#F4521E] text-white font-bold py-3 rounded-xl hover:bg-[#e03d0e] transition-colors shadow-md shadow-orange-200 cursor-pointer">
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

export default MenuPage;
