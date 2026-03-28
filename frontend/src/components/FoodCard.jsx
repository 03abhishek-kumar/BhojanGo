import React, { useState } from "react";
import { ShoppingCart, Mic } from "lucide-react";

const FoodCard = ({ item, onAddToCart }) => {
  const [recording, setRecording] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleRecording = () => {
    setRecording((prev) => !prev);
    if (!recording) {
      setTimeout(() => setRecording(false), 3000);
    }
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop";
          }}
        />
        {/* Badge */}
        <div
          className={`absolute top-3 right-3 ${item.badgeColor} text-[10px] font-bold px-2.5 py-1 rounded-full shadow`}
        >
          {item.badge}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-[15px] font-bold text-[#151515] leading-snug">
            {item.name}
          </h3>
          <span className="text-[#F4521E] font-bold text-sm whitespace-nowrap">
            ${item.price.toFixed(2)}
          </span>
        </div>
        <p className="text-xs text-gray-400 leading-relaxed mb-4 flex-1">
          {item.description}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-2 mt-auto">
          {/* Chef Note / Voice Button */}
          <button
            onClick={handleRecording}
            className={`flex flex-col items-center justify-center gap-0.5 px-3 py-2 rounded-xl border text-[10px] font-semibold tracking-wide transition-all duration-200 cursor-pointer
              ${
                recording
                  ? "bg-[#F4521E] border-[#F4521E] text-white animate-pulse"
                  : "bg-white border-slate-200 text-gray-400 hover:border-[#F4521E] hover:text-[#F4521E]"
              }`}
          >
            {recording ? (
              <>
                <Mic size={14} />
                <span>RECORDING</span>
                <div className="flex items-end gap-px h-3 mt-0.5">
                  {[2, 4, 3, 5, 3].map((h, i) => (
                    <div
                      key={i}
                      className="w-0.5 bg-white rounded-full"
                      style={{ height: `${h * 2}px` }}
                    />
                  ))}
                </div>
              </>
            ) : (
              <>
                <Mic size={14} />
                <span>CHEF</span>
                <span>NOTE</span>
              </>
            )}
          </button>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className={`flex items-center gap-2 flex-1 justify-center px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer
              ${
                added
                  ? "bg-emerald-500 text-white"
                  : "bg-[#F4521E] text-white hover:bg-[#e03d0e] shadow-sm shadow-orange-200"
              }`}
          >
            <ShoppingCart size={15} />
            {added ? "Added!" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
