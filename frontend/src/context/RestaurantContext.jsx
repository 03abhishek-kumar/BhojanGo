import React, { createContext, useState } from "react";

export const RestaurantContext = createContext();

export const RestaurantProvider = ({ children }) => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [address, setAddress] = useState("Select Location");
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  return (
    <RestaurantContext.Provider
      value={{
        selectedRestaurant,
        setSelectedRestaurant,
        address,
        setAddress,
        isLocationModalOpen,
        setIsLocationModalOpen,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};
