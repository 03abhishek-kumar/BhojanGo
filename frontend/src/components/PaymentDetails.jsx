import { useState, useContext } from "react";
import { BoltIcon, GiftIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { RestaurantContext } from "../context/RestaurantContext";
import { config } from "../config/config";

const PaymentDetails = () => {
  const { user } = useAuth();
  // FIX: Read cart, selectedRestaurant, address, and clearCart directly from context
  // instead of duplicating state from localStorage
  const { cart, selectedRestaurant, address, clearCart } = useContext(RestaurantContext);
  const [confirmed, setConfirmed] = useState(false);
  const [isPlacing, setIsPlacing] = useState(false);
  const navigate = useNavigate();

  const itemsSubtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const deliveryFee = 5.99;
  const serviceFee = 1.5;
  const taxes = itemsSubtotal * 0.09; // 9% tax
  const total = itemsSubtotal + deliveryFee + serviceFee + taxes;

  const feeDetails = [
    { label: "Items Subtotal", amount: itemsSubtotal, color: "text-[#111111] dark:text-white" },
    { label: "Delivery Fee", amount: deliveryFee, color: "text-[#F4521E]", prefix: "+" },
    { label: "Service Fee", amount: serviceFee, color: "text-[#111111] dark:text-white" },
    { label: "Taxes & Charges", amount: taxes, color: "text-[#111111] dark:text-white" },
  ];

  const handleConfirm = async () => {
    if (!user) {
      alert("Please login to place an order");
      return;
    }

    setIsPlacing(true);
    try {
      const orderData = {
        userId: user.uid,
        restaurantId: selectedRestaurant?._id,
        restaurantName: selectedRestaurant?.name,
        items: cart.map((item) => ({
          itemId: item._id,
          name: item.name,
          price: item.price,
          quantity: 1,
        })),
        totalAmount: total,
        status: "Confirmed",
        // FIX: Use the user's actual selected delivery address from context
        address: address !== "Select Location" ? address : "Not specified",
      };

      const response = await fetch(`${config.BASE_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        setConfirmed(true);
        localStorage.setItem("lastOrderTotal", total.toFixed(2));
        // FIX: Call clearCart() which wipes both context state AND localStorage
        clearCart();
        setTimeout(() => navigate("/tracking"), 2000);
      } else {
        alert("Failed to place order. Please try again.");
      }
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsPlacing(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* ── Payment Card ── */}
      <div className="bg-white dark:bg-[#111111] rounded-[24px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 dark:border-[#222222] transition-colors duration-300">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-xl">💳</span>
          <h2 className="font-[800] text-lg text-[#111111] dark:text-white tracking-tight">
            Order Review
          </h2>
        </div>

        {/* Restaurant info summary */}
        {selectedRestaurant && (
          <div className="flex items-center gap-3 bg-orange-50 dark:bg-[#F4521E]/10 rounded-2xl px-4 py-3 mb-4 border border-orange-100 dark:border-[#F4521E]/20">
            <span className="text-2xl">🍽️</span>
            <div className="flex-1">
              <p className="text-[10px] font-[800] uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Ordering from
              </p>
              <p className="text-sm font-[800] text-[#F4521E]">{selectedRestaurant.name}</p>
            </div>
          </div>
        )}

        {/* Delivery Address summary */}
        <div className="flex items-center gap-3 bg-blue-50 dark:bg-blue-500/10 rounded-2xl px-4 py-3 mb-5 border border-blue-100 dark:border-blue-500/20">
          <span className="text-2xl">📍</span>
          <div className="flex-1">
            <p className="text-[10px] font-[800] uppercase tracking-widest text-gray-400 dark:text-gray-500">
              Delivering to
            </p>
            <p className={`text-sm font-[800] line-clamp-1 ${address === "Select Location" ? "text-red-500 italic" : "text-blue-600 dark:text-blue-400"}`}>
              {address}
            </p>
          </div>
        </div>

        {/* Peak Demand Warning */}
        <div className="flex items-start gap-3 bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-100 dark:border-yellow-500/20 rounded-2xl p-4 mb-6">
          <BoltIcon className="w-4 h-4 text-yellow-600 dark:text-yellow-500 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-[10px] font-[800] uppercase tracking-widest text-yellow-700 dark:text-yellow-500 mb-1">
              Peak Traffic Fee
            </p>
            <p className="text-xs text-yellow-800 dark:text-yellow-400/80 leading-relaxed font-medium">
              High density area fees adjusted for guaranteed 28-min arrival.
            </p>
          </div>
        </div>

        {/* Fee Breakdown */}
        <div className="flex flex-col gap-4 mb-6 px-1">
          {feeDetails.map((fee) => (
            <div key={fee.label} className="flex items-center justify-between">
              <span className="text-sm text-gray-400 dark:text-gray-500 font-medium">{fee.label}</span>
              <span className={`text-sm font-[800] tracking-tight ${fee.color}`}>
                {fee.prefix || ""}${fee.amount.toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        {/* Grand Total */}
        <div className="border-t border-gray-100 dark:border-[#222222] pt-6 mb-6">
          <div className="flex items-center justify-between">
            <span className="font-[800] text-base text-[#111111] dark:text-white">Grand Total</span>
            <span className="font-[800] text-3xl text-[#F4521E] tracking-tighter">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Confirm Button */}
        <button
          onClick={handleConfirm}
          disabled={confirmed || isPlacing || (cart.length === 0 && !confirmed)}
          className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl text-[15px] font-[800] text-white transition-all tracking-wide uppercase
            ${
              confirmed
                ? "bg-emerald-500 shadow-lg shadow-emerald-200"
                : "bg-[#F4521E] hover:bg-[#E64A19] shadow-lg shadow-orange-200 dark:shadow-none"
            } ${cart.length === 0 && !confirmed ? "opacity-30 grayscale cursor-not-allowed" : "cursor-pointer hover:scale-[1.01] active:scale-[0.99]"}`}
        >
          {confirmed
            ? "✅ ORDER CONFIRMED"
            : isPlacing
            ? "Placing Order..."
            : "Place Order Now"}
        </button>
      </div>

      {/* ── Refer & Earn Card ── */}
      <div className="bg-white dark:bg-[#111111] rounded-[24px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 dark:border-[#222222] relative overflow-hidden transition-colors duration-300">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <GiftIcon className="w-5 h-5 text-[#F4521E]" />
            <h3 className="font-[800] text-sm text-[#111111] dark:text-white uppercase tracking-widest">
              Refer & Earn
            </h3>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium leading-relaxed mb-4">
            Get <span className="text-[#F4521E] font-bold">$10 off</span> your next BhojanGo
            order by referring a friend.
          </p>
          <button className="flex items-center gap-2 text-xs font-[800] text-[#F4521E] hover:text-[#E64A19] transition uppercase tracking-widest cursor-pointer group">
            Invite Now <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </div>

      {/* ── Map Preview Card ── */}
      <div className="bg-white dark:bg-[#111111] rounded-[24px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 dark:border-[#222222] transition-colors duration-300">
        <div className="relative h-32 bg-gray-100 dark:bg-[#1A1A1A]">
          <div className="absolute inset-0 opacity-20">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="absolute w-full border-t border-gray-400" style={{ top: `${i * 25}%` }} />
            ))}
            {[...Array(5)].map((_, i) => (
              <div key={i} className="absolute h-full border-l border-gray-400" style={{ left: `${i * 25}%` }} />
            ))}
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-10 h-10 bg-[#F4521E] rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-lg">🚴</span>
            </div>
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white dark:bg-[#0A0A0A] rounded-full px-5 py-2 shadow-lg border border-gray-100 dark:border-[#222222] whitespace-nowrap">
            <span className="text-[10px] font-[800] text-[#111111] dark:text-white tracking-[0.1em] uppercase">
              Fast Delivery: 28 MINS
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
