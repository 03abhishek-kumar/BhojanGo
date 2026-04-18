import { useState } from "react";
import { MapPinIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";

export default function SavedAddresses() {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      label: "Home",
      street: "4521 Oakwood Avenue, Suite 204",
      city: "Los Angeles, CA 90004",
      emoji: "🏠",
    },
    {
      id: 2,
      label: "Office",
      street: "201 Santa Monica Blvd, Floor 4",
      city: "Santa Monica, CA 90401",
      emoji: "🏢",
    },
  ]);

  const [selected, setSelected] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ label: "", street: "", city: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.label.trim()) newErrors.label = "Label is required";
    if (!form.street.trim()) newErrors.street = "Street is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    return newErrors;
  };

  const handleAdd = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const newAddress = {
      id: Date.now(),
      label: form.label,
      street: form.street,
      city: form.city,
      emoji: "📍",
    };
    setAddresses([...addresses, newAddress]);
    setSelected(newAddress.id);
    setForm({ label: "", street: "", city: "" });
    setErrors({});
    setShowForm(false);
  };

  const handleRemove = (id, e) => {
    e.stopPropagation();
    const updated = addresses.filter((a) => a.id !== id);
    setAddresses(updated);
    if (selected === id && updated.length > 0) {
      setSelected(updated[0].id);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-['Sora'] font-bold text-base text-[#151515]">
            Saved Addresses
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Manage your delivery addresses
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-1 text-sm font-medium text-[#F4521E] hover:underline"
        >
          <PlusIcon className="w-4 h-4" />
          Add New
        </button>
      </div>

      {/* ── Add Form ── */}
      {showForm && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-4">
          <h4 className="font-bold text-sm text-[#151515] mb-3">New Address</h4>
          <div className="flex flex-col gap-3">
            {["label", "street", "city"].map((field) => (
              <div key={field}>
                <input
                  type="text"
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  placeholder={
                    field === "label"
                      ? "Label (e.g. Home, Gym)"
                      : field === "street"
                        ? "Street address"
                        : "City, State, ZIP"
                  }
                  className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none transition
                    ${
                      errors[field]
                        ? "border-red-400 bg-red-50"
                        : "border-black/10 bg-white focus:border-[#F4521E]"
                    }`}
                />
                {errors[field] && (
                  <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
                )}
              </div>
            ))}
            <div className="flex gap-3">
              <button
                onClick={handleAdd}
                className="flex-1 bg-[#F4521E] text-white text-sm font-bold py-2.5 rounded-lg hover:bg-[#D43E0E] transition"
              >
                Save Address
              </button>
              <button
                onClick={() => {
                  setShowForm(false);
                  setForm({ label: "", street: "", city: "" });
                  setErrors({});
                }}
                className="flex-1 bg-white border border-black/10 text-sm font-bold py-2.5 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Address Cards ── */}
      <div className="flex flex-col gap-3">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            onClick={() => setSelected(addr.id)}
            className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all relative
              ${
                selected === addr.id
                  ? "border-[#F4521E] bg-orange-50"
                  : "border-black/8 hover:border-orange-200"
              }`}
          >
            <div className="w-10 h-10 bg-[#F5F3EE] rounded-xl flex items-center justify-center text-xl shrink-0">
              {addr.emoji}
            </div>
            <div className="flex-1">
              <p
                className={`font-bold text-sm mb-0.5 ${selected === addr.id ? "text-[#F4521E]" : "text-[#151515]"}`}
              >
                {addr.label}
              </p>
              <p className="text-xs text-gray-400">{addr.street}</p>
              <p className="text-xs text-gray-400">{addr.city}</p>
            </div>
            <button
              onClick={(e) => handleRemove(addr.id, e)}
              className="w-6 h-6 rounded-full bg-black/5 hover:bg-red-100 flex items-center justify-center transition"
            >
              <XMarkIcon className="w-3 h-3 text-gray-400 hover:text-red-500" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
