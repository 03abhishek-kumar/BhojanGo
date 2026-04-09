import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RestaurantDetail from "./pages/RestaurantDetail";
import Checkout from "./pages/Checkout";
import Tracking from "./pages/Tracking";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const { user } = useAuth();

  console.log("Firebase connected! Current user:", user);

  return (
    <div className="bg-[#F5F3EE] min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/restaurant/:id" element={<RestaurantDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default App;
