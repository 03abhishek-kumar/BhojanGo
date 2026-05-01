import React, { useState, useContext } from "react";
import { MapPinIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { RestaurantContext } from "../context/RestaurantContext";

const DeliveryAddress = () => {
  const { address, setAddress } = useContext(RestaurantContext);
  const [addresses, setAddresses] = useState([]);
  const [selected, setSelected] = useState(1);
  const [showForm, setShowForm] = useState(false);

  //   Form State
  const [form, setForm] = useState({
    label: "",
    street: "",
    city: "",
  });

  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // clear error on change
    setErrors({ ...errors, [e.target.name]: "" });
  };

  //validate form
  const validate = () => {
    const newErrors = {};
    if (!form.label.trim()) newErrors.label = "Label is required";
    if (!form.street.trim()) newErrors.street = "Street is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    return newErrors;
  };

  // add new address
  const handleAdd = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const fullAddress = `${form.street}, ${form.city}`;
    setAddress(fullAddress);
    
    const newAddress = {
      id: Date.now(), // unique id
      label: form.label,
      street: form.street,
      city: form.city,
    };

    setAddresses([...addresses, newAddress]);
    setSelected(newAddress.id);

    // reset form
    setForm({ label: "", street: "", city: "" });
    setErrors({});
    setShowForm(false);
  };

  //remove address
  const handleRemove = (id, e) => {
    e.stopPropagation(); // prevent card selection on remove click
    const updated = addresses.filter((a) => a.id !== id);
    setAddresses(updated);
    if (selected === id && updated.length > 0) {
      setSelected(updated[0].id);
    }
  };
  
  return (
    <div className="bg-white dark:bg-[#111111] rounded-[24px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 dark:border-[#222222] transition-colors duration-300">
      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MapPinIcon className="w-5 h-5 text-[#F4521E]" />
          <h2 className="font-bold text-base text-[#151515] dark:text-white">
            Delivery Address
          </h2>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-1 text-sm font-medium text-[#F4521E] hover:underline transition cursor-pointer"
        >
          <PlusIcon className="w-4 h-4" />
          Add New
        </button>
      </div>

      {/* Selected Address Display (Global Context) */}
      {address && address !== "Select Location" && (
        <div className="bg-orange-50 dark:bg-orange-500/10 border border-orange-100 dark:border-orange-500/20 rounded-2xl p-4 mb-6 flex items-start gap-4">
          <div className="w-10 h-10 bg-white dark:bg-[#1A1A1A] rounded-xl flex items-center justify-center shadow-sm shrink-0">
            <MapPinIcon className="w-5 h-5 text-[#F4521E]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold text-orange-600 dark:text-orange-500 uppercase tracking-widest mb-1">Current Delivery Address</p>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 leading-tight">
              {address}
            </p>
          </div>
        </div>
      )}

      {/*Add New Address Form*/}
      {showForm && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-4">
          <h3 className="font-bold text-sm text-[#151515] mb-3">New Address</h3>

          <div className="flex flex-col gap-3">
            {/* Label Input */}
            <div>
              <input
                type="text"
                name="label"
                value={form.label}
                onChange={handleChange}
                placeholder="Label (e.g. Home, Office, Gym)"
                className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none transition
                  ${
                    errors.label
                      ? "border-red-400 bg-red-50"
                      : "border-black/10 bg-white focus:border-[#F4521E]"
                  }`}
              />
              {errors.label && (
                <p className="text-red-500 text-xs mt-1">{errors.label}</p>
              )}
            </div>

            {/* Street Input */}
            <div>
              <input
                type="text"
                name="street"
                value={form.street}
                onChange={handleChange}
                placeholder="Street address"
                className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none transition
                  ${
                    errors.street
                      ? "border-red-400 bg-red-50"
                      : "border-black/10 bg-white focus:border-[#F4521E]"
                  }`}
              />
              {errors.street && (
                <p className="text-red-500 text-xs mt-1">{errors.street}</p>
              )}
            </div>

            {/* City Input */}
            <div>
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="City, State, ZIP"
                className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none transition
                  ${
                    errors.city
                      ? "border-red-400 bg-red-50"
                      : "border-black/10 bg-white focus:border-[#F4521E]"
                  }`}
              />
              {errors.city && (
                <p className="text-red-500 text-xs mt-1">{errors.city}</p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-1">
              <button
                onClick={handleAdd}
                className="flex-1 bg-[#F4521E] hover:bg-[#D43E0E] text-white text-sm font-semibold py-2.5 rounded-lg transition"
              >
                Save Address
              </button>
              <button
                onClick={() => {
                  setShowForm(false);
                  setForm({ label: "", street: "", city: "" });
                  setErrors({});
                }}
                className="flex-1 bg-white border border-black/10 text-sm font-semibold py-2.5 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/*Address Cards*/}
      <div className="flex flex-wrap gap-4">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            onClick={() => {
              setSelected(addr.id);
              setAddress(`${addr.street}, ${addr.city}`);
            }}
            className={`flex-1 min-w-45 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 relative
              ${
                selected === addr.id
                  ? "border-[#F4521E] bg-orange-50"
                  : "border-black/8 bg-white hover:border-orange-200"
              }`}
          >
            {/* Remove Button */}
            <button
              onClick={(e) => handleRemove(addr.id, e)}
              className="absolute top-2 right-2 w-5 h-5 rounded-full bg-black/5 hover:bg-red-100 flex items-center justify-center transition"
            >
              <XMarkIcon className="w-3 h-3 text-gray-400 hover:text-red-500" />
            </button>

            {/* Label */}
            <p
              className={`font-bold text-sm mb-2
              ${selected === addr.id ? "text-[#F4521E]" : "text-[#151515]"}`}
            >
              {addr.label}
            </p>

            {/* Address */}
            <p className="text-sm text-gray-500 leading-relaxed pr-4">
              {addr.street}
            </p>
            <p className="text-sm text-gray-500">{addr.city}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeliveryAddress;
