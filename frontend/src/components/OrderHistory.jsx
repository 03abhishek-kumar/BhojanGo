import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function OrderHistory() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      try {
        const response = await fetch(`http://localhost:5000/api/orders/user/${user.uid}`);
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm flex justify-center">
        <div className="w-8 h-8 border-3 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">

      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-['Sora'] font-bold text-base text-[#151515]">
            Order History
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Your last {orders.length} orders
          </p>
        </div>
      </div>

      {/* ── Orders List ── */}
      <div className="flex flex-col gap-3">
        {orders.length === 0 ? (
           <p className="text-center text-gray-400 py-10">No orders found yet.</p>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="flex items-center gap-4 p-4 rounded-xl border border-black/5 hover:border-orange-200 hover:bg-orange-50/30 transition cursor-pointer"
            >
              {/* Emoji Placeholder based on first item or random */}
              <div className="w-12 h-12 bg-[#F5F3EE] rounded-xl flex items-center justify-center text-2xl shrink-0">
                🍔
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-['Sora'] font-bold text-sm text-[#151515]">
                    {order.restaurantName || "Restaurant"}
                  </p>
                  <p className="font-bold text-sm text-[#151515]">
                    ${order.totalAmount.toFixed(2)}
                  </p>
                </div>
                <p className="text-xs text-gray-400 mb-1">
                  {order.items.map(i => i.name).join(", ")}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-300">
                    {new Date(order.createdAt).toLocaleDateString()} • #{order._id.slice(-6).toUpperCase()}
                  </p>
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                    order.status === 'Cancelled' ? 'text-red-500 bg-red-50' : 'text-green-500 bg-green-50'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
