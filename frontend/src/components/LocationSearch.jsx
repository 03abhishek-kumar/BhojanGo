import React, { useState, useContext, useEffect } from "react";
import { RestaurantContext } from "../context/RestaurantContext";
import { useAuth } from "../context/AuthContext";

const LocationSearch = ({ onSelect }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const { setAddress } = useContext(RestaurantContext);
  const { user } = useAuth();
  const API_KEY = import.meta.env.VITE_LOCATIONIQ_KEY;

  useEffect(() => {
    // 1. Set a timer to run after 5000ms of inactivity
    const getData = setTimeout(async () => {
      if (query.length > 2) {
        try {
          const url = `https://api.locationiq.com/v1/autocomplete?key=${API_KEY}&q=${query}&countrycodes=in&limit=5&dedupe=1`;
          const response = await fetch(url);
          const data = await response.json();
          if (Array.isArray(data)) setSuggestions(data);
        } catch (error) {
          console.error("Location search error:", error);
        }
      } else {
        setSuggestions([]);
      }
    }, 2000); // 5000ms delay

    // 2. CLEANUP: This is the most important part.
    // It clears the previous timer if the user types again before 500ms is up.
    return () => clearTimeout(getData);
  }, [query, API_KEY]); // Runs whenever 'query' changes

  const handleSelect = async (item) => {
    const selectedAddress = item.display_name;
    setAddress(selectedAddress);
    setQuery(selectedAddress);
    setSuggestions([]);

    // Save to MongoDB if user is logged in
    if (user) {
      try {
        await fetch("http://localhost:5000/api/users/location", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uid: user.uid,
            location: selectedAddress,
            name: user.displayName,
            email: user.email,
          }),
        });
      } catch (error) {
        console.error("Error saving location to MongoDB:", error);
      }
    }

    if (onSelect) onSelect();

    // Pro-tip: You can also save the lat/lon if you want to show a map later
    console.log("Coords:", item.lat, item.lon);
  };

  return (
    <div className="relative w-full">
      <div className="flex items-center bg-gray-50 dark:bg-[#222222] rounded-2xl px-5 py-4 border-2 border-transparent focus-within:border-orange-500/50 focus-within:bg-white dark:focus-within:bg-slate-900 transition-all shadow-inner">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search area in Bengaluru..."
          className="bg-transparent outline-none w-full text-sm font-semibold text-gray-700 dark:text-gray-200 placeholder:text-gray-400"
        />
      </div>

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <ul className="absolute z-50 w-full bg-white dark:bg-[#111111] border dark:border-[#222222] mt-1 rounded-xl shadow-2xl max-h-60 overflow-y-auto">
          {suggestions.map((item, index) => (
            <li
              key={index}
              onClick={() => handleSelect(item)}
              className="p-3 hover:bg-orange-50 dark:hover:bg-slate-800 cursor-pointer text-xs border-b last:border-none border-gray-100 dark:border-[#222222] flex flex-col gap-1 transition-colors"
            >
              <span className="font-bold text-gray-800 dark:text-slate-200">
                {item.address.name || item.address.road}
              </span>
              <span className="text-gray-500 dark:text-slate-500 truncate">
                {item.display_name}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationSearch;
