import TrackingNavbar from "../components/TrackingNavbar";
import OrderJourney from "../components/OrderJourney";
import PreparationInsights from "../components/PreparationInsights";
import VoiceInstructions from "../components/VoiceInstructions";
import TrackingMap from "../components/TrackingMap";

const Tracking = () => {
  return (
    <div className="bg-[#F5F3EE] dark:bg-slate-950 min-h-screen flex flex-col transition-colors duration-300">
      {/* ── Navbar ── */}
      <TrackingNavbar />

      {/* ── Main Layout ── */}
      <div className="flex flex-1 overflow-hidden">
        {/* ── Left Sidebar ── */}
        <div className="w-95 shrink-0 flex flex-col gap-4 p-5 overflow-y-auto">
          <OrderJourney />
          <PreparationInsights />
          <VoiceInstructions />
        </div>

        {/* ── Right Map ── */}
        <div className="flex-1">
          <TrackingMap />
        </div>
      </div>
    </div>
  );
};

export default Tracking;
