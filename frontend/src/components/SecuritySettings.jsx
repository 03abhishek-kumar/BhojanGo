import { useState } from "react";
import { EyeIcon, EyeSlashIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

export default function SecuritySettings() {
  const [showCurrent, setShowCurrent]   = useState(false);
  const [showNew, setShowNew]           = useState(false);
  const [showConfirm, setShowConfirm]   = useState(false);
  const [twoFA, setTwoFA]               = useState(false);
  const [saved, setSaved]               = useState(false);
  const [showDelete, setShowDelete]     = useState(false);

  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!passwords.current)              newErrors.current = "Current password is required";
    if (!passwords.newPass)              newErrors.newPass = "New password is required";
    if (passwords.newPass.length < 8)    newErrors.newPass = "Password must be at least 8 characters";
    if (passwords.newPass !== passwords.confirm) newErrors.confirm = "Passwords do not match";
    return newErrors;
  };

  const handleSave = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setSaved(true);
    setPasswords({ current: "", newPass: "", confirm: "" });
    setTimeout(() => setSaved(false), 3000);
  };

  // reusable password input
  const PasswordInput = ({ name, placeholder, show, toggleShow }) => (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        name={name}
        value={passwords[name]}
        onChange={handleChange}
        placeholder={placeholder}
        className={`w-full border rounded-xl px-4 py-3 text-sm outline-none transition pr-12
          ${errors[name]
            ? "border-red-400 bg-red-50"
            : "border-black/10 focus:border-[#F4521E]"
          }`}
      />
      <button
        type="button"
        onClick={toggleShow}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#151515]"
      >
        {show
          ? <EyeSlashIcon className="w-4 h-4" />
          : <EyeIcon className="w-4 h-4" />
        }
      </button>
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <div className="flex flex-col gap-4">

      {/* ── Change Password ── */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-['Sora'] font-bold text-base text-[#151515]">
              Change Password
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Use a strong password to keep your account safe
            </p>
          </div>
          {saved && (
            <span className="text-xs font-bold text-green-500 bg-green-50 px-3 py-1.5 rounded-full">
              ✅ Password updated!
            </span>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <PasswordInput
            name="current"
            placeholder="Current password"
            show={showCurrent}
            toggleShow={() => setShowCurrent(!showCurrent)}
          />
          <PasswordInput
            name="newPass"
            placeholder="New password (min. 8 characters)"
            show={showNew}
            toggleShow={() => setShowNew(!showNew)}
          />
          <PasswordInput
            name="confirm"
            placeholder="Confirm new password"
            show={showConfirm}
            toggleShow={() => setShowConfirm(!showConfirm)}
          />
        </div>

        <button
          onClick={handleSave}
          className="mt-5 w-full bg-[#F4521E] hover:bg-[#D43E0E] text-white font-bold py-3 rounded-xl text-sm transition"
        >
          Update Password
        </button>
      </div>

      {/* ── Two Factor Auth ── */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#F5F3EE] rounded-xl flex items-center justify-center">
              <ShieldCheckIcon className="w-5 h-5 text-[#F4521E]" />
            </div>
            <div>
              <p className="font-['Sora'] font-bold text-sm text-[#151515]">
                Two-Factor Authentication
              </p>
              <p className="text-xs text-gray-400">
                Add an extra layer of security to your account
              </p>
            </div>
          </div>
          {/* Toggle */}
          <button
            onClick={() => setTwoFA(!twoFA)}
            className={`relative w-12 h-6 rounded-full transition-all duration-300
              ${twoFA ? "bg-[#F4521E]" : "bg-gray-200"}`}
          >
            <div
              className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-300
                ${twoFA ? "left-7" : "left-1"}`}
            />
          </button>
        </div>
        {twoFA && (
          <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-3">
            <p className="text-xs text-green-600 font-medium">
              ✅ Two-factor authentication is enabled. Your account is more secure!
            </p>
          </div>
        )}
      </div>

      {/* ── Danger Zone ── */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-red-100">
        <h3 className="font-['Sora'] font-bold text-base text-red-500 mb-1">
          Danger Zone
        </h3>
        <p className="text-xs text-gray-400 mb-4">
          Once you delete your account all your data will be permanently removed.
        </p>

        {!showDelete ? (
          <button
            onClick={() => setShowDelete(true)}
            className="border-2 border-red-400 text-red-500 text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-red-50 transition"
          >
            Delete Account
          </button>
        ) : (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-sm font-bold text-red-500 mb-3">
              Are you sure? This action cannot be undone!
            </p>
            <div className="flex gap-3">
              <button className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm font-bold py-2.5 rounded-lg transition">
                Yes, Delete My Account
              </button>
              <button
                onClick={() => setShowDelete(false)}
                className="flex-1 bg-white border border-black/10 text-sm font-bold py-2.5 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}