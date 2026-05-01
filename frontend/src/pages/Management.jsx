import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  Plus,
  Upload,
  Store,
  UtensilsCrossed,
  Settings,
  BarChart3,
  ChevronRight,
  ShieldCheck,
  Save,
} from "lucide-react";
import Navbar from "../components/Navbar";
import { config } from "../config/config";

const Management = () => {
  const { profileData } = useAuth();
  const isAdmin = profileData?.role === "admin";

  const [activeTab, setActiveTab] = useState("overview");
  const [orders, setOrders] = useState([]);
  
  // Add Restaurant Form State
  const [formData, setFormData] = useState({
    name: "",
    cuisine: "",
    time: "",
    fee: "",
    image: "",
    rating: 0,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddRestaurant = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch(`${config.BASE_URL}/api/restaurants`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setMessage("Restaurant added successfully!");
      setFormData({ name: "", cuisine: "", time: "", fee: "", image: "", rating: 0 });
    } catch (err) {
      console.error(err);
      setMessage("Failed to add restaurant.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch all orders for management (In a real app, this would be filtered by restro ID)
  const fetchAllOrders = async () => {
    try {
      // We'll use the getAllOrders endpoint if it exists, or just repurpose user orders for demo
      const res = await fetch(`${config.BASE_URL}/api/orders`);
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

  React.useEffect(() => {
    if (activeTab === "orders") {
      fetchAllOrders();
    }
  }, [activeTab]);

  const stats = [
    {
      label: "Total Restaurants",
      value: isAdmin ? "12" : "1",
      icon: Store,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Active Menu Items",
      value: "48",
      icon: UtensilsCrossed,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      label: "Monthly Orders",
      value: orders.length || "1,240",
      icon: BarChart3,
      color: "text-green-600",
      bg: "bg-green-50",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F3EE] dark:bg-[#0A0A0A] transition-colors duration-300">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-[#FFF0EB] text-[#F4521E] text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md border border-[#F4521E]/10">
                {profileData?.role?.replace("_", " ")} Panel
              </span>
              {isAdmin && <ShieldCheck size={16} className="text-[#F4521E]" />}
            </div>
            <h1 className="text-3xl font-extrabold text-[#151515] tracking-tight">
              Management Dashboard
            </h1>
            <p className="text-gray-500 mt-1">
              Manage your restaurants and upload new culinary data.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="bg-white text-[#151515] font-bold px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-gray-50 transition shadow-sm flex items-center gap-2 cursor-pointer">
              <Settings size={18} />
              Settings
            </button>
            <button 
              onClick={() => setActiveTab("restaurants")}
              className="bg-[#F4521E] text-white font-bold px-5 py-2.5 rounded-xl hover:bg-[#E64A19] transition shadow-lg shadow-orange-200 flex items-center gap-2 cursor-pointer"
            >
              <Plus size={18} />
              Add Restaurant
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 transition-transform hover:scale-[1.02]"
            >
              <div
                className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center`}
              >
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-400 font-medium">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold text-[#151515]">
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="border-b border-slate-100">
            <nav className="flex px-6 overflow-x-auto">
              {["Overview", "Restaurants", "Orders", "Analytics"].map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab.toLowerCase())}
                    className={`px-6 py-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                      activeTab === tab.toLowerCase()
                        ? "border-[#F4521E] text-[#F4521E]"
                        : "border-transparent text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    {tab}
                  </button>
                ),
              )}
            </nav>
          </div>

          <div className="p-8">
            {activeTab === "overview" && (
              <div className="max-w-2xl mx-auto text-center py-12">
                <div className="w-20 h-20 bg-orange-50 text-[#F4521E] rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Upload size={32} />
                </div>
                <h2 className="text-2xl font-bold text-[#151515] mb-3">
                  Upload Restaurant Data
                </h2>
                <p className="text-gray-500 mb-8">
                  Drag and drop your restaurant data files or menu catalogs to
                  start syncing with the BhojanGo platform.
                </p>

                <div className="border-2 border-dashed border-slate-200 rounded-3xl p-12 hover:border-[#F4521E]/50 hover:bg-orange-50/30 transition-all cursor-pointer group">
                  <p className="text-gray-400 group-hover:text-[#F4521E] transition-colors">
                    Click to select files or drag and drop
                  </p>
                  <p className="text-[11px] text-gray-300 mt-2 uppercase tracking-widest font-bold">
                    JSON, CSV, or Image Catalogs
                  </p>
                </div>
              </div>
            )}

            {activeTab === "restaurants" && (
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold text-[#151515] mb-6">Add New Restaurant</h2>
                {message && (
                  <div className={`p-4 mb-6 rounded-xl text-sm font-bold ${message.includes("success") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                    {message}
                  </div>
                )}
                <form onSubmit={handleAddRestaurant} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Restaurant Name</label>
                      <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#F4521E] focus:border-transparent outline-none transition-all" placeholder="e.g. Spice Route" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Cuisine Type</label>
                      <input required type="text" name="cuisine" value={formData.cuisine} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#F4521E] focus:border-transparent outline-none transition-all" placeholder="e.g. North Indian" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Delivery Time</label>
                      <input required type="text" name="time" value={formData.time} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#F4521E] focus:border-transparent outline-none transition-all" placeholder="e.g. 30-40 min" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Delivery Fee</label>
                      <input required type="text" name="fee" value={formData.fee} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#F4521E] focus:border-transparent outline-none transition-all" placeholder="e.g. $2.99" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
                      <input required type="text" name="image" value={formData.image} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#F4521E] focus:border-transparent outline-none transition-all" placeholder="https://..." />
                    </div>
                  </div>
                  <button type="submit" disabled={loading} className="w-full bg-[#F4521E] text-white font-bold py-4 rounded-xl hover:bg-[#E64A19] transition-colors shadow-lg shadow-orange-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70">
                    {loading ? "Adding..." : <><Save size={20} /> Save Restaurant</>}
                  </button>
                </form>
              </div>
            )}
            {activeTab === "orders" && (
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-[#151515] mb-6">Recent Customer Orders</h2>
                <div className="space-y-4">
                  {orders.length === 0 ? (
                    <div className="text-center py-12 text-gray-400 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-100">
                      No orders to display.
                    </div>
                  ) : (
                    orders.map((order) => (
                      <div key={order._id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                          <div>
                            <span className="text-[10px] font-bold text-[#F4521E] bg-orange-50 px-2 py-1 rounded uppercase tracking-widest">Order ID: #{order._id.slice(-6)}</span>
                            <h3 className="text-lg font-bold text-[#151515] mt-1">{order.restaurantName}</h3>
                            <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleString()}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-black text-[#151515]">${order.totalAmount.toFixed(2)}</p>
                            <span className="text-[11px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full uppercase">{order.status}</span>
                          </div>
                        </div>
                        <div className="space-y-3 pt-4 border-t border-gray-50">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between bg-gray-50/50 p-3 rounded-xl">
                              <div>
                                <p className="text-sm font-bold text-[#151515]">{item.name} <span className="text-gray-400 font-medium">x {item.quantity}</span></p>
                                {item.voiceNote && (
                                  <div className="mt-2 flex items-center gap-3 bg-white p-2 rounded-lg border border-orange-100 shadow-sm w-fit">
                                    <span className="text-xs font-bold text-[#F4521E] flex items-center gap-1">
                                      <Mic size={14} /> Chef Note:
                                    </span>
                                    <audio controls className="h-8 max-w-[200px]" src={item.voiceNote} />
                                  </div>
                                )}
                              </div>
                              <p className="text-sm font-bold text-[#151515]">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Management;
