import { useState, useEffect } from "react";
import { PencilIcon, CheckIcon } from "@heroicons/react/24/solid";
import { useAuth } from "../context/AuthContext";

const ProfileHeader = () => {
  const { user, profileData, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(profileData?.name || "User");
  const [tempName, setTempName] = useState(name);

  useEffect(() => {
    if (profileData?.name) {
      setName(profileData.name);
      setTempName(profileData.name);
    }
  }, [profileData]);

  const handleSave = async () => {
    if (!user) return;
    try {
      await updateUserProfile(user.uid, { name: tempName });
      setName(tempName);
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update name:", err);
    }
  };

  return (
    <div className="bg-white dark:bg-[#0A0A0A] rounded-[24px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] mb-8 border border-gray-100 dark:border-[#1A1A1A] transition-colors duration-300">
      <div className="flex items-center gap-6">
        {/* ── Avatar ── */}
        <div className="relative">
          <div className="w-24 h-24 rounded-[32px] bg-[#E0D7FF] dark:bg-[#1A1A1A] flex items-center justify-center text-3xl font-[800] text-[#5B4FCC] dark:text-[#E0D7FF] shrink-0 border border-transparent dark:border-[#2A2A2A]">
            {name.charAt(0)}
          </div>
          {/* Online dot */}
          <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 rounded-full border-4 border-white dark:border-[#0A0A0A]" />
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
                className="font-[800] text-2xl border-b-2 border-[#F4521E] outline-none bg-transparent text-[#111111] dark:text-white tracking-tight"
              />
              <button
                onClick={handleSave}
                className="w-7 h-7 bg-[#F4521E] rounded-full flex items-center justify-center"
              >
                <CheckIcon className="w-4 h-4 text-white" />
              </button>
            </div>
          ) : (
            <h2 className="font-[800] text-2xl text-[#111111] dark:text-white mb-1 tracking-tight">
              {name}
            </h2>
          )}

          <p className="text-sm text-gray-500 dark:text-gray-500 mb-2 font-medium">
            {profileData?.email || user?.email}
          </p>
          <p className="text-[10px] text-gray-400 dark:text-gray-600 font-[800] uppercase tracking-widest">
            Member since{" "}
            {profileData?.createdAt
              ? new Date(profileData.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })
              : "Joining..."}{" "}
            • 🍽️ {profileData?.orders?.length || 0} orders placed
          </p>
        </div>

        {/* ── Edit Button ── */}
        <button
          onClick={() => {
            setIsEditing(!isEditing);
            setTempName(name);
          }}
          className="flex items-center gap-2 border border-gray-100 dark:border-[#222222] rounded-full px-5 py-2.5 text-[11px] uppercase tracking-widest font-[800] text-[#111111] dark:text-white hover:border-[#F4521E] dark:hover:border-[#F4521E] hover:text-[#F4521E] transition-all cursor-pointer"
        >
          <PencilIcon className="w-3.5 h-3.5" />
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;
