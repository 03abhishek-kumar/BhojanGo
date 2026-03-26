import React, { useState } from "react";
import {
  MagnifyingGlassIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/solid";

const Hero = () => {
  const [query, setQuery] = useState("");
  return (
    <section className="flex flex-col items-center text-center px-[5%] pt-8 pb-12">
      {/* ── Heading ── */}
      <h1 className="font-bold text-5xl text-[#151515]">
        Discover the best food with <br />
        <span className="text-[#F4521E]">BhojanGo</span>
      </h1>

      {/* Search Bar */}
      <div className="flex items-center bg-white rounded-2xl px-5 py-2 mt-6 w-full max-w-xl shadow-2xl border border-black/5">
        <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 shrink-0" />
        <input
          type="text"
          placeholder="Search cuisines, restaurants, or dishes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 outline-none border-none text-sm px-3 bg-transparent text-[#151515] placeholder-gray-400"
        />
        <button className="bg-[#F4521E] hover:bg-[#D43E0E] text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition">
          Search
        </button>
      </div>

      {/* Subtext */}
      <div className="flex items-center gap-2 mt-3 text-sm text-gray-400">
        <ArrowTrendingUpIcon className="w-4 h-4 text-[#F4521E]" />
        <span>Real-time peak hour insights for the fastest delivery</span>
      </div>
    </section>
  );
};

export default Hero;
