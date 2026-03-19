import { Link } from "react-router-dom";
import { ChartBarIcon } from "@heroicons/react/24/solid";

const PromoBanner = () => {
  return (
    <section className="mx-[5%] my-6 bg-[#1A1F2E] rounded-2xl px-12 py-12 flex items-center justify-between">
      {/* ── Left Content ── */}
      <div>
        {/* Smart Prediction Pill */}
        <div className="inline-flex items-center gap-2 bg-[#F4521E]/20 text-[#F4521E] text-[11px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4">
          <span className="w-2 h-2 rounded-full bg-[#F4521E]" />
          Smart Prediction
        </div>

        {/* Heading */}
        <h2 className="font-['Sora'] font-extrabold text-3xl text-white leading-tight mb-3">
          Beat the Rush with <br />
          <span className="text-[#F4521E]">Peak Hour Tracking</span>
        </h2>

        {/* Description */}
        <p className="text-[#8A95A3] text-sm leading-relaxed mb-6">
          BhojanGo uses advanced prediction models to show you exactly how busy
          a kitchen is. Plan your cravings and avoid the wait.
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <Link
            to="/order"
            className="bg-[#F4521E] hover:bg-[#D43E0E] text-white text-sm font-semibold px-6 py-3 rounded-full transition"
          >
            Order Now
          </Link>
          <Link
            to="/features"
            className="border border-white/20 hover:border-white/50 text-white text-sm font-semibold px-6 py-3 rounded-full transition"
          >
            See All Features
          </Link>
        </div>
      </div>

      {/* ── Right Visual ── */}
      <div className="w-44 h-44 bg-[#F4521E] rounded-full flex items-center justify-center shrink-0">
        <ChartBarIcon className="w-20 h-20 text-white" />
      </div>
    </section>
  );
};

export default PromoBanner;
