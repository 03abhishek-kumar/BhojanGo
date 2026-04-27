import React, { createContext, useState, useEffect } from "react";

export const RestaurantContext = createContext();

export const RestaurantProvider = ({ children }) => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(() => {
    const saved = localStorage.getItem("selectedRestaurant");
    return saved ? JSON.parse(saved) : null;
  });
  const [address, setAddress] = useState(() => {
    return localStorage.getItem("address") || "Select Location";
  });
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Cart state initialized from localStorage
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Persist changes to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("address", address);
  }, [address]);

  useEffect(() => {
    if (selectedRestaurant) {
      localStorage.setItem("selectedRestaurant", JSON.stringify(selectedRestaurant));
    } else {
      localStorage.removeItem("selectedRestaurant");
    }
  }, [selectedRestaurant]);

  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  const removeFromCart = (itemId) => {
    setCart((prev) => {
      const index = prev.findIndex((item) => item._id === itemId);
      if (index !== -1) {
        return prev.filter((_, i) => i !== index);
      }
      return prev;
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  // Removes ALL instances of an item (for trash button)
  const removeAllOfItem = (itemId) => {
    setCart((prev) => prev.filter((item) => item._id !== itemId));
  };

  return (
    <RestaurantContext.Provider
      value={{
        selectedRestaurant,
        setSelectedRestaurant,
        address,
        setAddress,
        isLocationModalOpen,
        setIsLocationModalOpen,
        cart,
        addToCart,
        removeFromCart,
        removeAllOfItem,
        clearCart,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};
