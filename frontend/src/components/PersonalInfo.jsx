import { useState } from "react";

export default function PersonalInfo() {
  const [form, setForm] = useState({
    firstName: "Alex",
    lastName:  "Johnson",
    email:     "alex.johnson@email.com",
    phone:     "+1 (555) 012-3456",
    dob:       "1995-06-15",
    gender:    "male",
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">

      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-['Sora'] font-bold text-base text-[#151515]">
            Personal Information
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Update your personal details here
          </p>
        </div>
        {saved && (
          <span className="text-xs font-bold text-green-500 bg-green-50 px-3 py-1.5 rounded-full">
            ✅ Saved successfully!
          </span>
        )}
      </div>

      {/* ── Form ── */}
      <div className="grid grid-cols-2 gap-4">

        {/* First Name */}
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            className="w-full border border-black/10 rounded-xl px-4 py-3 text-sm text-[#151515] outline-none focus:border-[#F4521E] transition"
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            className="w-full border border-black/10 rounded-xl px-4 py-3 text-sm text-[#151515] outline-none focus:border-[#F4521E] transition"
          />
        </div>

        {/* Email */}
        <div className="col-span-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-black/10 rounded-xl px-4 py-3 text-sm text-[#151515] outline-none focus:border-[#F4521E] transition"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full border border-black/10 rounded-xl px-4 py-3 text-sm text-[#151515] outline-none focus:border-[#F4521E] transition"
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">
            Date of Birth
          </label>
          <input
            type="date"
            name="dob"
            value={form.dob}
            onChange={handleChange}
            className="w-full border border-black/10 rounded-xl px-4 py-3 text-sm text-[#151515] outline-none focus:border-[#F4521E] transition"
          />
        </div>

        {/* Gender */}
        <div className="col-span-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">
            Gender
          </label>
          <div className="flex gap-3">
            {["male", "female", "other"].map((g) => (
              <button
                key={g}
                onClick={() => setForm({ ...form, gender: g })}
                className={`flex-1 py-3 rounded-xl text-sm font-medium capitalize border-2 transition
                  ${form.gender === g
                    ? "border-[#F4521E] bg-orange-50 text-[#F4521E]"
                    : "border-black/10 text-gray-400 hover:border-orange-200"
                  }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* ── Save Button ── */}
      <button
        onClick={handleSave}
        className="mt-6 w-full bg-[#F4521E] hover:bg-[#D43E0E] text-white font-bold py-3 rounded-xl text-sm transition"
      >
        Save Changes
      </button>

    </div>
  );
}