import React, { useContext } from "react";
import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { RestaurantContext } from "../context/RestaurantContext";

const OrderSummary = () => {
  const { cart, addToCart, removeFromCart, removeAllOfItem } = useContext(RestaurantContext);

  // Group items for display
  const items = cart.reduce((acc, item) => {
    const existing = acc.find((c) => c._id === item._id);
    if (existing) {
      existing.qty += 1;
    } else {
      acc.push({ ...item, qty: 1 });
    }
    return acc;
  }, []);

  return (
    <div className="bg-white dark:bg-[#111111] rounded-[24px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 dark:border-[#222222] transition-colors duration-300">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-xl">🧺</span>
        <h2 className="font-[800] text-lg text-[#111111] dark:text-white tracking-tight">Order Summary</h2>
      </div>

      {/* Items List */}
      {items.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-5xl mb-4 opacity-50">🛒</p>
          <p className="text-sm text-gray-400 dark:text-gray-600 font-[600]">
            Your order is empty
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {items.map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-4 pb-5 border-b border-gray-100 dark:border-[#222222] last:border-none last:pb-0"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded-xl object-cover shrink-0"
                onError={(e) => {
                  e.target.src =
                    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&auto=format&fit=crop";
                }}
              />

              {/* Details */}
              <div className="flex-1 min-w-0">
                <p className="font-[800] text-sm text-[#111111] dark:text-white mb-0.5 truncate uppercase tracking-tight">
                  {item.name}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mb-2 line-clamp-1">
                  {item.description}
                </p>

                {/* Qty Controls — minus at qty=1 removes item */}
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest">
                    Qty:
                  </span>
                  <div className="flex items-center gap-2 bg-gray-50 dark:bg-[#1A1A1A] rounded-xl px-2.5 py-1 border border-gray-100 dark:border-[#222222]">
                    {/* Minus: at qty=1 this removes the whole item */}
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="w-6 h-6 rounded-lg flex items-center justify-center transition font-bold text-[#111111] dark:text-gray-400 hover:text-red-500 hover:bg-white dark:hover:bg-[#222222] cursor-pointer"
                    >
                      <MinusIcon className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-[800] text-[#111111] dark:text-white min-w-4 text-center">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => addToCart(item)}
                      className="w-6 h-6 rounded-lg flex items-center justify-center text-[#111111] dark:text-gray-400 hover:text-[#F4521E] hover:bg-white dark:hover:bg-[#222222] transition font-bold cursor-pointer"
                    >
                      <PlusIcon className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right — Price + Trash */}
              <div className="flex flex-col items-end gap-2">
                <p className="font-[800] text-[#F4521E] text-base leading-none">
                  ${(item.price * item.qty).toFixed(2)}
                </p>
                {/* FIX: removeAllOfItem removes every copy in one click */}
                <button
                  onClick={() => removeAllOfItem(item._id)}
                  className="text-gray-300 dark:text-gray-700 hover:text-red-500 transition cursor-pointer"
                  title="Remove all"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderSummary;
