import { useState } from "react";
import ProfileNavbar from "../components/ProfileNavbar";
import ProfileHeader from "../components/ProfileHeader";
import ProfileSidebar from "../components/ProfileSidebar";
import PersonalInfo from "../components/PersonalInfo";
import OrderHistory from "../components/OrderHistory";
import SavedAddresses from "../components/SavedAddresses";
import NotificationSettings from "../components/NotificationSettings";
import SecuritySettings from "../components/SecuritySettings";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("personal");

  // renders the correct component based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "personal":
        return <PersonalInfo />;
      case "orders":
        return <OrderHistory />;
      case "addresses":
        return <SavedAddresses />;
      case "notifications":
        return <NotificationSettings />;
      case "security":
        return <SecuritySettings />;
      default:
        return <PersonalInfo />;
    }
  };

  return (
    <div className="bg-[#F5F3EE] dark:bg-slate-950 min-h-screen transition-colors duration-300">
      <ProfileNavbar />

      <div className="px-[5%] py-6">
        {/* ── Profile Header ── */}
        <ProfileHeader />

        {/* ── Main Layout ── */}
        <div className="flex gap-6 items-start">
          {/* Left — Sidebar */}
          <ProfileSidebar active={activeTab} setActive={setActiveTab} />

          {/* Right — Content */}
          <div className="flex-1">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
