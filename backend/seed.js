const mongoose = require('mongoose');
const Restaurant = require('./models/Restaurant');
require('dotenv').config();

const restaurantsData = [
    {
      name: "Gourmet Garden",
      cuisine: "Italian • Pasta • Seafood",
      rating: 4.8,
      time: "20–30 min",
      fee: "$2.49",
      badge: "TRENDING",
      badgeColor: "bg-[#F4521E]",
      status: "BUSY STATUS",
      statusColor: "text-red-500",
      dotColor: "bg-red-500",
      statusBoxColor: "bg-red-50",
      statusRight: "+15 min extra",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=200&fit=crop",
    },
    {
      name: "Sushi Zen",
      cuisine: "Japanese • Sushi • Rolls",
      rating: 4.9,
      time: "15–25 min",
      fee: "Free",
      badge: null,
      status: "FREE STATUS",
      statusColor: "text-green-500",
      dotColor: "bg-green-500",
      statusBoxColor: "bg-green-50",
      statusRight: "Fast Delivery",
      image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=200&fit=crop",
    },
    {
      name: "Burger Beast",
      cuisine: "American • Burgers • Fries",
      rating: 4.5,
      time: "25–35 min",
      fee: "$1.99",
      badge: null,
      status: "STEADY",
      statusColor: "text-yellow-500",
      dotColor: "bg-yellow-500",
      statusBoxColor: "bg-yellow-50",
      statusRight: "Expected timing",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=200&fit=crop",
    },
    {
      name: "Biryani Hub",
      cuisine: "Indian • Spices • Rice",
      rating: 4.7,
      time: "30–40 min",
      fee: "$3.99",
      badge: "ECO FRIENDLY",
      badgeColor: "bg-green-500",
      status: "VERY BUSY",
      statusColor: "text-red-700",
      dotColor: "bg-red-700",
      statusBoxColor: "bg-red-50",
      statusRight: "+20 min extra",
      image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=687&auto=format&fit=crop",
    },
];

const menuItemsData = {
  Appetizers: [
    { name: "Spicy Tandoori Mix", price: 18.99, description: "Assorted clay-oven grilled delights marinated in secret BhojanGo spices.", badge: "🔥 420 CAL", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop&q=80" },
    { name: "Royal Paneer Bowl", price: 16.5, description: "Silky tomato gravy with hand-pressed cottage cheese and fenugreek.", badge: "VEGETARIAN", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&auto=format&fit=crop&q=80" },
    { name: "Hyderabadi Dum Biryani", price: 21.0, description: "Slow-cooked aromatic long-grain rice with marinated succulent chicken.", badge: "⭐ BESTSELLER", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80" },
    { name: "Crispy Onion Rings", price: 9.99, description: "Golden-fried onion rings with a spicy dipping sauce.", badge: "🔥 310 CAL", image: "https://images.unsplash.com/photo-1639024471283-03518883512d?w=600&auto=format&fit=crop&q=80" },
    { name: "Samosa Chaat", price: 11.5, description: "Crispy samosas topped with tangy tamarind chutney, yogurt and sev.", badge: "VEGETARIAN", image: "https://images.unsplash.com/photo-1613987549117-c933f2a0c05f?w=600&auto=format&fit=crop&q=80" },
    { name: "Chicken Tikka Platter", price: 22.0, description: "Juicy boneless chicken tikka bites, marinated overnight in yogurt spices.", badge: "⭐ BESTSELLER", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&auto=format&fit=crop&q=80" },
  ],
  "Main Course": [
    { name: "Butter Chicken", price: 19.99, description: "Classic creamy tomato-based curry with tender chicken pieces.", badge: "⭐ BESTSELLER", image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=600&auto=format&fit=crop&q=80" },
    { name: "Dal Makhani", price: 15.5, description: "Slow-cooked black lentils simmered overnight with butter and cream.", badge: "VEGETARIAN", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&auto=format&fit=crop&q=80" },
    { name: "Lamb Rogan Josh", price: 24.0, description: "Aromatic Kashmiri-style slow-cooked lamb in rich spiced gravy.", badge: "🔥 580 CAL", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop&q=80" },
  ],
  Desserts: [
    { name: "Gulab Jamun", price: 7.99, description: "Soft milk-solid khoya dumplings soaked in rose-flavored sugar syrup.", badge: "VEGETARIAN", image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&auto=format&fit=crop&q=80" },
    { name: "Mango Kulfi", price: 8.5, description: "Traditional Indian ice cream made with condensed milk and fresh mango.", badge: "⭐ BESTSELLER", image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&auto=format&fit=crop&q=80" },
    { name: "Rasgulla", price: 6.99, description: "Soft, spongy cottage cheese balls soaked in light sugar syrup.", badge: "VEGETARIAN", image: "https://images.unsplash.com/photo-1536478380769-9f82d50c2cde?w=600&auto=format&fit=crop&q=80" },
  ],
  Beverages: [
    { name: "Mango Lassi", price: 5.99, description: "Chilled blended yogurt drink with Alphonso mango pulp and cardamom.", badge: "VEGETARIAN", image: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=600&auto=format&fit=crop&q=80" },
    { name: "Masala Chai", price: 4.5, description: "Aromatic spiced tea brewed with ginger, cardamom, cloves and milk.", badge: "🔥 120 CAL", image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=600&auto=format&fit=crop&q=80" },
    { name: "Rose Sharbat", price: 4.99, description: "Refreshing chilled rose syrup drink topped with basil seeds.", badge: "⭐ BESTSELLER", image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&auto=format&fit=crop&q=80" },
  ],
};

async function seedDB() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB for seeding...");

  await Restaurant.deleteMany({});
  
  // Transform menu items into grouped list for all restaurants for this demo
  // saare restaurants ke liye same data for demo (like same bevrages, same main course for all)
  const allMenuItems = [];
  Object.keys(menuItemsData).forEach(category => {
    menuItemsData[category].forEach(item => {
      allMenuItems.push({ ...item, category });
    });
  });

  const restaurants = restaurantsData.map(r => ({
    ...r,
    menu: allMenuItems // For this demo, giving all restaurants the same menu
  }));

  await Restaurant.insertMany(restaurants);
  console.log("Database seeded successfully!");
  mongoose.connection.close();
}

seedDB().catch(err => console.error(err));
