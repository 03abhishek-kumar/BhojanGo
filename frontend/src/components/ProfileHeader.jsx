import { useState } from "react";
import { PencilIcon, CheckIcon } from "@heroicons/react/24/solid";

const ProfileHeader = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Alex Johnson");
  const [tempName, setTempName] = useState(name);

  const handleSave = () => {
    setName(tempName);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
      <div className="flex items-center gap-6">
        {/* ── Avatar ── */}
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-[#E0D7FF] flex items-center justify-center text-2xl font-bold text-[#5B4FCC] shrink-0">
            {name.charAt(0)}
          </div>
          {/* Online dot */}
          <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
        </div>

        {/* ── Info ── */}
        <div className="flex-1">
          {/* Name — editable */}
          {isEditing ? (
            <div className="flex items-center gap-2 mb-1">
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="font-bold text-xl border-b-2 border-[#F4521E] outline-none bg-transparent text-[#151515]"
              />
              <button
                onClick={handleSave}
                className="w-7 h-7 bg-[#F4521E] rounded-full flex items-center justify-center"
              >
                <CheckIcon className="w-4 h-4 text-white" />
              </button>
            </div>
          ) : (
            <h2 className="font-['Sora'] font-bold text-xl text-[#151515] mb-1">
              {name}
            </h2>
          )}

          <p className="text-sm text-gray-400 mb-1">alex.johnson@email.com</p>
          <p className="text-xs text-gray-300 font-medium">
            Member since January 2023 • 🍽️ 42 orders placed
          </p>
        </div>

        {/* ── Edit Button ── */}
        <button
          onClick={() => {
            setIsEditing(!isEditing);
            setTempName(name);
          }}
          className="flex items-center gap-2 border border-black/10 rounded-full px-4 py-2 text-sm font-medium text-[#151515] hover:border-[#F4521E] hover:text-[#F4521E] transition"
        >
          <PencilIcon className="w-4 h-4" />
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;
