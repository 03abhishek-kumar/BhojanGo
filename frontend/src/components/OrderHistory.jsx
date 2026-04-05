const orders = [
  {
    id: "BG-9921",
    restaurant: "Biryani Hub",
    items: "Hyderabadi Dum Biryani, Raita",
    date: "Apr 2, 2024",
    total: "$18.50",
    status: "Delivered",
    statusColor: "text-green-500",
    statusBg: "bg-green-50",
    emoji: "🍛",
  },
  {
    id: "BG-9845",
    restaurant: "Sushi Zen",
    items: "Dragon Roll, Miso Soup",
    date: "Mar 28, 2024",
    total: "$32.00",
    status: "Delivered",
    statusColor: "text-green-500",
    statusBg: "bg-green-50",
    emoji: "🍣",
  },
  {
    id: "BG-9701",
    restaurant: "Burger Beast",
    items: "Double Smash Burger, Fries",
    date: "Mar 20, 2024",
    total: "$14.99",
    status: "Cancelled",
    statusColor: "text-red-500",
    statusBg: "bg-red-50",
    emoji: "🍔",
  },
  {
    id: "BG-9654",
    restaurant: "Gourmet Garden",
    items: "Pasta Carbonara, Tiramisu",
    date: "Mar 15, 2024",
    total: "$27.50",
    status: "Delivered",
    statusColor: "text-green-500",
    statusBg: "bg-green-50",
    emoji: "🍝",
  },
];

export default function OrderHistory() {
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
        {orders.map((order) => (
          <div
            key={order.id}
            className="flex items-center gap-4 p-4 rounded-xl border border-black/5 hover:border-orange-200 hover:bg-orange-50/30 transition cursor-pointer"
          >

            {/* Emoji */}
            <div className="w-12 h-12 bg-[#F5F3EE] rounded-xl flex items-center justify-center text-2xl shrink-0">
              {order.emoji}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <p className="font-['Sora'] font-bold text-sm text-[#151515]">
                  {order.restaurant}
                </p>
                <p className="font-bold text-sm text-[#151515]">
                  {order.total}
                </p>
              </div>
              <p className="text-xs text-gray-400 mb-1">
                {order.items}
              </p>
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-300">
                  {order.date} • #{order.id}
                </p>
                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${order.statusColor} ${order.statusBg}`}>
                  {order.status}
                </span>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}