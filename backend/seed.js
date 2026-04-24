const mongoose = require("mongoose");
const Restaurant = require("./models/Restaurant");
require("dotenv").config();

const restaurantsData = [
  {
    name: "Gourmet Garden",
    cuisine: "Italian • Pasta • Seafood • Pizza",
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
    cuisine: "Japanese • Sushi • Rolls • Seafood",
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
    cuisine: "American • Burgers • Fries • Fast Food",
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
    cuisine: "Indian • Biryani • Spices • Rice",
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
  {
    name: "Pizza Paradise",
    cuisine: "Italian • Pizza • Cheese • Fast Food",
    rating: 4.6,
    time: "20–30 min",
    fee: "$1.50",
    badge: "BEST DEALS",
    badgeColor: "bg-blue-500",
    status: "STEADY",
    statusColor: "text-yellow-500",
    dotColor: "bg-yellow-500",
    statusBoxColor: "bg-yellow-50",
    statusRight: "On Time",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=200&fit=crop",
  },
  {
    name: "Green Leaf Salads",
    cuisine: "Healthy • Salads • Vegan • Organic",
    rating: 4.7,
    time: "15–20 min",
    fee: "Free",
    badge: "HEALTHY CHOICE",
    badgeColor: "bg-green-600",
    status: "FAST",
    statusColor: "text-green-500",
    dotColor: "bg-green-500",
    statusBoxColor: "bg-green-50",
    statusRight: "Quick Lite",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=200&fit=crop",
  },
  {
    name: "Taco Tempo",
    cuisine: "Mexican • Tacos • Spicy • Street Food",
    rating: 4.4,
    time: "20–30 min",
    fee: "$2.00",
    badge: "NEW",
    badgeColor: "bg-purple-500",
    status: "STEADY",
    statusColor: "text-yellow-500",
    dotColor: "bg-yellow-500",
    statusBoxColor: "bg-yellow-50",
    statusRight: "Hot Delivery",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=200&fit=crop",
  },
  {
    name: "Sweet Retreat",
    cuisine: "Desserts • Cakes • Sweets • Ice Cream",
    rating: 4.9,
    time: "10–20 min",
    fee: "$1.00",
    badge: "POPULAR",
    badgeColor: "bg-pink-500",
    status: "FAST",
    statusColor: "text-green-500",
    dotColor: "bg-green-500",
    statusBoxColor: "bg-green-50",
    statusRight: "Chilled Ready",
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=200&fit=crop",
  },
  {
    name: "Cold Brew Cafe",
    cuisine: "Beverages • Coffee • Shakes • Drinks",
    rating: 4.5,
    time: "5–15 min",
    fee: "Free",
    badge: "TOP RATED",
    badgeColor: "bg-yellow-600",
    status: "FAST",
    statusColor: "text-green-500",
    dotColor: "bg-green-500",
    statusBoxColor: "bg-green-50",
    statusRight: "Fresh Brewed",
    image: "https://images.unsplash.com/photo-1541167760496-162955ed8a9f?w=400&h=200&fit=crop",
  },
  {
    name: "Sushi Shore",
    cuisine: "Japanese • Sushi • Seafood • Rolls",
    rating: 4.8,
    time: "20–35 min",
    fee: "$3.00",
    badge: "PREMIUM",
    badgeColor: "bg-black",
    status: "STEADY",
    statusColor: "text-yellow-500",
    dotColor: "bg-yellow-500",
    statusBoxColor: "bg-yellow-50",
    statusRight: "Fresh Cut",
    image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&h=200&fit=crop",
  },
  {
    name: "Naco Taco",
    cuisine: "Mexican • Tacos • Burritos • Spicy",
    rating: 4.3,
    time: "25–40 min",
    fee: "$1.99",
    badge: null,
    status: "BUSY",
    statusColor: "text-orange-500",
    dotColor: "bg-orange-500",
    statusBoxColor: "bg-orange-50",
    statusRight: "+10 min",
    image: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=400&h=200&fit=crop",
  },
  {
    name: "The Healthy Spot",
    cuisine: "Healthy • Salads • Smoothies • Vegan",
    rating: 4.6,
    time: "15–25 min",
    fee: "Free",
    badge: "CLEAN EAT",
    badgeColor: "bg-emerald-500",
    status: "STEADY",
    statusColor: "text-yellow-500",
    dotColor: "bg-yellow-500",
    statusBoxColor: "bg-yellow-50",
    statusRight: "On Time",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=200&fit=crop",
  },
  {
    name: "Royal Biryani",
    cuisine: "Indian • Biryani • Rice • Mughlai",
    rating: 4.8,
    time: "35–50 min",
    fee: "$4.00",
    badge: "ROYAL CHOICE",
    badgeColor: "bg-amber-600",
    status: "VERY BUSY",
    statusColor: "text-red-600",
    dotColor: "bg-red-600",
    statusBoxColor: "bg-red-50",
    statusRight: "+25 min",
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=400&h=200&fit=crop",
  },
  {
    name: "Donut District",
    cuisine: "Desserts • Donuts • Sweets • Coffee",
    rating: 4.7,
    time: "10–15 min",
    fee: "$1.25",
    badge: "INSTA FAV",
    badgeColor: "bg-pink-400",
    status: "FAST",
    statusColor: "text-green-500",
    dotColor: "bg-green-500",
    statusBoxColor: "bg-green-50",
    statusRight: "Quick Delivery",
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=200&fit=crop",
  },
  {
    name: "Juice Junction",
    cuisine: "Beverages • Juices • Healthy • Drinks",
    rating: 4.4,
    time: "10–20 min",
    fee: "Free",
    badge: null,
    status: "STEADY",
    statusColor: "text-yellow-500",
    dotColor: "bg-yellow-500",
    statusBoxColor: "bg-yellow-50",
    statusRight: "Cold Pressed",
    image: "https://images.unsplash.com/photo-1600271886311-dc543b5a273c?w=400&h=200&fit=crop",
  },
  {
    name: "Pizza Haven",
    cuisine: "Italian • Pizza • Pasta • Cheese",
    rating: 4.5,
    time: "20–35 min",
    fee: "$2.50",
    badge: "LATE NIGHT",
    badgeColor: "bg-indigo-600",
    status: "STEADY",
    statusColor: "text-yellow-500",
    dotColor: "bg-yellow-500",
    statusBoxColor: "bg-yellow-50",
    statusRight: "Expected Timing",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=200&fit=crop",
  },
];

const menuItemsData = {
  Appetizers: [
    {
      name: "Spicy Tandoori Mix",
      price: 18.99,
      description: "Assorted clay-oven grilled delights marinated in secret BhojanGo spices.",
      badge: "🔥 420 CAL",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop&q=80",
    },
    {
      name: "Royal Paneer Bowl",
      price: 16.5,
      description: "Silky tomato gravy with hand-pressed cottage cheese and fenugreek.",
      badge: "VEGETARIAN",
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&auto=format&fit=crop&q=80",
    },
    {
        name: "Sushi Sampler",
        price: 24.99,
        description: "Chef's selection of fresh nigiri and maki rolls.",
        badge: "FRESH",
        image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=600&auto=format&fit=crop&q=80",
    },
    {
        name: "Crispy Taco Box",
        price: 12.99,
        description: "Three corn tacos with spicy beef and house-made salsa.",
        badge: "🔥 SPICY",
        image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&auto=format&fit=crop&q=80",
    }
  ],
  "Main Course": [
    {
      name: "Hyderabadi Dum Biryani",
      price: 21.0,
      description: "Slow-cooked aromatic long-grain rice with marinated succulent chicken.",
      badge: "⭐ BESTSELLER",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80",
    },
    {
      name: "Butter Chicken",
      price: 19.99,
      description: "Classic creamy tomato-based curry with tender chicken pieces.",
      badge: "⭐ BESTSELLER",
      image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=600&auto=format&fit=crop&q=80",
    },
    {
      name: "Thin Crust Pepperoni",
      price: 22.5,
      description: "12-inch pizza with extra pepperoni and mozzarella cheese.",
      badge: "⭐ FAVOURITE",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80",
    },
    {
        name: "Beef Beast Burger",
        price: 15.99,
        description: "Double patty beef burger with melted cheddar and caramelized onions.",
        badge: "🔥 850 CAL",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80",
    }
  ],
  Desserts: [
    {
      name: "Gulab Jamun",
      price: 7.99,
      description: "Soft milk-solid khoya dumplings soaked in rose-flavored sugar syrup.",
      badge: "VEGETARIAN",
      image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&auto=format&fit=crop&q=80",
    },
    {
      name: "Mango Kulfi",
      price: 8.5,
      description: "Traditional Indian ice cream made with condensed milk and fresh mango.",
      badge: "⭐ BESTSELLER",
      image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&auto=format&fit=crop&q=80",
    },
    {
        name: "Glazed Donut Box",
        price: 14.5,
        description: "Half dozen fresh glazed donuts with various toppings.",
        badge: "SWEET",
        image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&auto=format&fit=crop&q=80",
    }
  ],
  Beverages: [
    {
      name: "Mango Lassi",
      price: 5.99,
      description: "Chilled blended yogurt drink with Alphonso mango pulp and cardamom.",
      badge: "VEGETARIAN",
      image: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=600&auto=format&fit=crop&q=80",
    },
    {
        name: "Iced Caramel Macchiato",
        price: 6.5,
        description: "Chilled espresso with milk, vanilla and caramel drizzle.",
        badge: "⭐ REFRESHING",
        image: "https://images.unsplash.com/photo-1541167760496-162955ed8a9f?w=600&auto=format&fit=crop&q=80",
    },
    {
      name: "Fresh Orange Juice",
      price: 4.99,
      description: "Freshly squeezed oranges with a hint of mint.",
      badge: "HEALTY",
      image: "https://images.unsplash.com/photo-1600271886311-dc543b5a273c?w=600&auto=format&fit=crop&q=80",
    },
  ],
};

async function seedDB() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB for seeding...");

  // Check if data already exists
  const count = await Restaurant.countDocuments();
  if (count > 0) {
    console.log("Database already has data. Skipping seed.");
    mongoose.connection.close();
    return;
  }

  console.log("Seeding initial data...");

  // Transform menu items into grouped list for all restaurants for this demo
  const allMenuItems = [];
  Object.keys(menuItemsData).forEach((category) => {
    menuItemsData[category].forEach((item) => {
      allMenuItems.push({ ...item, category });
    });
  });

  const restaurants = restaurantsData.map((r) => ({
    ...r,
    menu: allMenuItems,
  }));

  await Restaurant.insertMany(restaurants);
  console.log("Database seeded successfully!");
  mongoose.connection.close();
}

seedDB().catch((err) => console.error(err));
