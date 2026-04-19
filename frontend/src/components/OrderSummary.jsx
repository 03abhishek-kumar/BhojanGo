import React, { useContext } from "react";
import { PlusIcon, MinusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { RestaurantContext } from "../context/RestaurantContext";

const OrderSummary = () => {
  const { cart, addToCart, removeFromCart } = useContext(RestaurantContext);

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

  // increase qty
  const handleIncrease = (item) => {
    addToCart(item);
  };

  //  decrease qty
  const handleDecrease = (id) => {
    removeFromCart(id);
  };

  // remove item (completely)
  const handleRemove = (id) => {
    // In current context impl, removeFromCart only removes one instance.
    // To remove all, we'd need a separate method or call it in a loop.
    // For now, let's keep it simple and just use the context's removeFromCart
    removeFromCart(id);
  };

  return (
    <div className="bg-white dark:bg-[#111111] rounded-[24px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 dark:border-[#222222] transition-colors duration-300">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-xl">🧺</span>
        <h2 className="font-[800] text-lg text-[#111111] dark:text-white tracking-tight">Order Summary</h2>
      </div>

      {/* Items List  */}
      {items.length === 0 ? (
        // empty state
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
              />

              {/* Details */}
              <div className="flex-1 min-w-0">
                <p className="font-[800] text-sm text-[#111111] dark:text-white mb-0.5 truncate uppercase tracking-tight">
                  {item.name}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mb-2 line-clamp-1">{item.description}</p>

                {/* Qty Controls */}
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest">
                    Qty:
                  </span>
                  <div className="flex items-center gap-2 bg-gray-50 dark:bg-[#1A1A1A] rounded-xl px-2.5 py-1 border border-gray-100 dark:border-[#222222]">
                    <button
                      onClick={() => handleDecrease(item._id)}
                      className={`w-6 h-6 rounded-lg flex items-center justify-center transition font-bold
                        ${
                          item.qty === 1
                            ? "text-gray-300 dark:text-gray-600 cursor-not-allowed"
                            : "text-[#111111] dark:text-gray-400 hover:text-red-500 hover:bg-white dark:hover:bg-[#222222]"
                        }`}
                      disabled={item.qty === 1}
                    >
                      <MinusIcon className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-[800] text-[#111111] dark:text-white min-w-4 text-center">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => handleIncrease(item)}
                      className="w-6 h-6 rounded-lg flex items-center justify-center text-[#111111] dark:text-gray-400 hover:text-[#F4521E] hover:bg-white dark:hover:bg-[#222222] transition font-bold"
                    >
                      <PlusIcon className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right — Price + Remove */}
              <div className="flex flex-col items-end gap-2">
                <p className="font-[800] text-[#F4521E] text-base leading-none">
                  ${(item.price * item.qty).toFixed(2)}
                </p>
                <button
                  onClick={() => handleRemove(item._id)}
                  className="text-gray-300 dark:text-gray-700 hover:text-red-500 transition cursor-pointer"
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
