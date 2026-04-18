import React, { useState } from "react";
import { PlusIcon, MinusIcon, TrashIcon } from "@heroicons/react/24/solid";

const OrderSummary = () => {
  const [items, setItems] = useState([]);

  // increase qty
  const handleIncrease = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item,
      ),
    );
  };

  //  decrease qty
  const handleDecrease = (id) => {
    setItems(
      items.map((item) =>
        item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item,
      ),
    );
  };

  // remove item
  const handleRemove = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <span className="text-xl">🧺</span>
        <h2 className="font-bold text-base text-[#151515]">Order Summary</h2>
      </div>

      {/* Items List  */}
      {items.length === 0 ? (
        // empty state
        <div className="text-center py-8">
          <p className="text-4xl mb-3">🛒</p>
          <p className="text-sm text-gray-400 font-medium">
            Your order is empty
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 pb-4 border-b border-black/5 last:border-none last:pb-0"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded-xl object-cover shrink-0"
              />

              {/* Details */}
              <div className="flex-1">
                <p className="font-bold text-sm text-[#151515] mb-1">
                  {item.name}
                </p>
                <p className="text-xs text-gray-400 mb-2">{item.description}</p>

                {/* Qty Controls */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 font-medium">
                    Qty:
                  </span>
                  <div className="flex items-center gap-2 bg-[#F5F3EE] rounded-full px-2 py-1">
                    <button
                      onClick={() => handleDecrease(item.id)}
                      className={`w-5 h-5 rounded-full flex items-center justify-center transition
                        ${
                          item.qty === 1
                            ? "text-gray-300 cursor-not-allowed"
                            : "text-[#F4521E] hover:bg-orange-100"
                        }`}
                      disabled={item.qty === 1}
                    >
                      <MinusIcon className="w-4 h-4" />
                    </button>
                    <span className="text-sm font-bold text-[#151515] min-w-4 text-center">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => handleIncrease(item.id)}
                      className="w-5 h-5 rounded-full flex items-center justify-center text-[#F4521E] hover:bg-orange-100 transition"
                    >
                      <PlusIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right — Price + Remove */}
              <div className="flex flex-col items-end gap-2">
                <p className="font-bold text-sm text-[#151515]">
                  ${(item.price * item.qty).toFixed(2)}
                </p>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-gray-300 hover:text-red-500 transition"
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
