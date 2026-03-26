const menuItems = {
  Appetizers: [
    {
      id: 1,
      name: "Spicy Tandoori Mix",
      price: 18.99,
      description:
        "Assorted clay-oven grilled delights marinated in secret BhojanGo spices.",
      badge: "🔥 420 CAL",
      badgeColor: "bg-white text-gray-700",
      image:
        "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: 2,
      name: "Royal Paneer Bowl",
      price: 16.5,
      description:
        "Silky tomato gravy with hand-pressed cottage cheese and fenugreek.",
      badge: "VEGETARIAN",
      badgeColor: "bg-emerald-500 text-white",
      image:
        "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: 3,
      name: "Hyderabadi Dum Biryani",
      price: 21.0,
      description:
        "Slow-cooked aromatic long-grain rice with marinated succulent chicken.",
      badge: "⭐ BESTSELLER",
      badgeColor: "bg-amber-500 text-white",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: 4,
      name: "Crispy Onion Rings",
      price: 9.99,
      description: "Golden-fried onion rings with a spicy dipping sauce.",
      badge: "🔥 310 CAL",
      badgeColor: "bg-white text-gray-700",
      image:
        "https://images.unsplash.com/photo-1639024471283-03518883512d?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: 5,
      name: "Samosa Chaat",
      price: 11.5,
      description:
        "Crispy samosas topped with tangy tamarind chutney, yogurt and sev.",
      badge: "VEGETARIAN",
      badgeColor: "bg-emerald-500 text-white",
      image:
        "https://images.unsplash.com/photo-1613987549117-c933f2a0c05f?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: 6,
      name: "Chicken Tikka Platter",
      price: 22.0,
      description:
        "Juicy boneless chicken tikka bites, marinated overnight in yogurt spices.",
      badge: "⭐ BESTSELLER",
      badgeColor: "bg-amber-500 text-white",
      image:
        "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&auto=format&fit=crop&q=80",
    },
  ],
  "Main Course": [
    {
      id: 7,
      name: "Butter Chicken",
      price: 19.99,
      description:
        "Classic creamy tomato-based curry with tender chicken pieces.",
      badge: "⭐ BESTSELLER",
      badgeColor: "bg-amber-500 text-white",
      image:
        "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: 8,
      name: "Dal Makhani",
      price: 15.5,
      description:
        "Slow-cooked black lentils simmered overnight with butter and cream.",
      badge: "VEGETARIAN",
      badgeColor: "bg-emerald-500 text-white",
      image:
        "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: 9,
      name: "Lamb Rogan Josh",
      price: 24.0,
      description:
        "Aromatic Kashmiri-style slow-cooked lamb in rich spiced gravy.",
      badge: "🔥 580 CAL",
      badgeColor: "bg-white text-gray-700",
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop&q=80",
    },
  ],
  Desserts: [
    {
      id: 10,
      name: "Gulab Jamun",
      price: 7.99,
      description:
        "Soft milk-solid khoya dumplings soaked in rose-flavored sugar syrup.",
      badge: "VEGETARIAN",
      badgeColor: "bg-emerald-500 text-white",
      image:
        "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: 11,
      name: "Mango Kulfi",
      price: 8.5,
      description:
        "Traditional Indian ice cream made with condensed milk and fresh mango.",
      badge: "⭐ BESTSELLER",
      badgeColor: "bg-amber-500 text-white",
      image:
        "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: 12,
      name: "Rasgulla",
      price: 6.99,
      description:
        "Soft, spongy cottage cheese balls soaked in light sugar syrup.",
      badge: "VEGETARIAN",
      badgeColor: "bg-emerald-500 text-white",
      image:
        "https://images.unsplash.com/photo-1536478380769-9f82d50c2cde?w=600&auto=format&fit=crop&q=80",
    },
  ],
  Beverages: [
    {
      id: 13,
      name: "Mango Lassi",
      price: 5.99,
      description:
        "Chilled blended yogurt drink with Alphonso mango pulp and cardamom.",
      badge: "VEGETARIAN",
      badgeColor: "bg-emerald-500 text-white",
      image:
        "https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: 14,
      name: "Masala Chai",
      price: 4.5,
      description:
        "Aromatic spiced tea brewed with ginger, cardamom, cloves and milk.",
      badge: "🔥 120 CAL",
      badgeColor: "bg-white text-gray-700",
      image:
        "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: 15,
      name: "Rose Sharbat",
      price: 4.99,
      description:
        "Refreshing chilled rose syrup drink topped with basil seeds.",
      badge: "⭐ BESTSELLER",
      badgeColor: "bg-amber-500 text-white",
      image:
        "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&auto=format&fit=crop&q=80",
    },
  ],
};

export default menuItems;
