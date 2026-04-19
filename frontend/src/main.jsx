import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { RestaurantProvider } from "./context/RestaurantContext.jsx";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <ThemeProvider>
        <RestaurantProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </RestaurantProvider>
      </ThemeProvider>
    </StrictMode>
  </BrowserRouter>,
);
