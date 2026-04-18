import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RestaurantDetail from "./pages/RestaurantDetail";
import Checkout from "./pages/Checkout";
import Tracking from "./pages/Tracking";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import Management from "./pages/Management";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import { RestaurantContext } from "./context/RestaurantContext";
import LocationModal from "./components/LocationModal";
import { useContext } from "react";

const App = () => {
  const { user } = useAuth();
  const { isLocationModalOpen, setIsLocationModalOpen } = useContext(RestaurantContext);

  return (
    <div className="bg-[#F5F3EE] min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/restaurant/:id" element={<RestaurantDetail />} />

        {/* Protected Routes */}
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tracking"
          element={
            <ProtectedRoute>
              <Tracking />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Admin/Owner only routes */}
        <Route
          path="/manage"
          element={
            <ProtectedRoute allowedRoles={["admin", "restaurant_owner"]}>
              <Management />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* Global Location Modal */}
      <LocationModal 
        isOpen={isLocationModalOpen} 
        onClose={() => setIsLocationModalOpen(false)} 
      />
    </div>
  );
};

export default App;
