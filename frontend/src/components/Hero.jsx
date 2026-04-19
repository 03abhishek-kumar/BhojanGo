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
      <h1 className="font-[800] text-5xl md:text-6xl text-[#111111] dark:text-white leading-[1.1] tracking-tight">
        Discover the best food with <br />
        <span className="text-[#F4521E]">BhojanGo</span>
      </h1>

      {/* Search Bar */}
      <div className="flex items-center bg-white dark:bg-[#111111] rounded-2xl px-3 py-2 mt-8 w-full max-w-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] border border-gray-100 dark:border-[#222222] focus-within:border-orange-500/50 focus-within:ring-4 focus-within:ring-orange-500/10 transition-all">
        <MagnifyingGlassIcon className="w-6 h-6 text-gray-400 ml-3 shrink-0" />
        <input
          type="text"
          placeholder="Search cuisines, restaurants, or dishes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 outline-none border-none text-[15px] px-4 bg-transparent text-[#111111] dark:text-white placeholder-gray-400"
        />
        <button className="bg-[#F4521E] hover:bg-[#E64A19] text-white text-[15px] font-bold px-8 py-3.5 rounded-xl transition-colors">
          Search
        </button>
      </div>

      {/* Subtext */}
      <div className="flex items-center gap-2 mt-6 text-sm font-medium text-gray-500 dark:text-gray-400">
        <ArrowTrendingUpIcon className="w-4"/>
        <span>  Real-time peak hour insights for the fastest delivery</span>
      </div>
    </section>
  );
};

export default Hero;
