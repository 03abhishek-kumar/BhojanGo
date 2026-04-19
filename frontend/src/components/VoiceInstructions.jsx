import { useState, useRef } from "react";
import { PlayIcon, PauseIcon } from "@heroicons/react/24/solid";

const VoiceInstructions = () => {
  const voiceNotes = [
    {
      id: 1,
      title: "Note to Chef",
      recorded: "RECORDED 12:46 PM",
      duration: "0:12",
      icon: "🤚",
      waveHeights: [8, 20, 14, 28, 10, 24, 18, 30, 12, 22, 16, 26, 8, 20, 14],
    },
    {
      id: 2,
      title: "Delivery Instructions",
      recorded: "RECORDED 12:55 PM",
      duration: "0:08",
      icon: "🛵",
      waveHeights: [10, 16, 22, 12, 26, 8, 18, 24, 14, 20, 10, 16, 22, 12, 8],
    },
  ];

  const [playing, setPlaying] = useState(null); // tracks which note is playing

  const handlePlay = (id) => {
    // if same note clicked → pause it
    // if different note clicked → play new one
    setPlaying((prev) => (prev === id ? null : id));
  };

  return (
    <div className="bg-white dark:bg-[#111111] rounded-[24px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 dark:border-[#222222] transition-colors duration-300">
      {/* ── Header ── */}
      <p className="text-[10px] uppercase tracking-widest font-[800] text-gray-400 dark:text-gray-500 mb-5">
        Voice Records
      </p>

      {/* ── Voice Notes List ── */}
      <div className="flex flex-col gap-4">
        {voiceNotes.map((note) => {
          const isPlaying = playing === note.id;

          return (
            <div key={note.id}>
              {/* Title Row */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gray-50 dark:bg-[#1A1A1A] rounded-xl flex items-center justify-center text-lg border border-gray-100 dark:border-[#222222]">
                  {note.icon}
                </div>
                <div>
                  <p className="font-[800] text-sm text-[#111111] dark:text-white tracking-tight">
                    {note.title}
                  </p>
                  <p className="text-[9px] font-[800] tracking-widest uppercase text-gray-400 dark:text-gray-600">
                    {note.recorded}
                  </p>
                </div>
              </div>

              {/* Player Row */}
              <div className="flex items-center gap-4 bg-gray-50 dark:bg-[#1A1A1A] rounded-2xl px-5 py-4 border border-gray-100 dark:border-[#222222]">
                {/* Play / Pause Button */}
                <button
                  onClick={() => handlePlay(note.id)}
                  className="w-9 h-9 bg-[#F4521E] rounded-full flex items-center justify-center shrink-0 hover:bg-[#D43E0E] transition shadow-md shadow-orange-200"
                >
                  {isPlaying ? (
                    <PauseIcon className="w-4 h-4 text-white" />
                  ) : (
                    <PlayIcon className="w-4 h-4 text-white ml-0.5" />
                  )}
                </button>

                {/* Waveform Bars */}
                <div className="flex items-end gap-0.75 flex-1 h-8">
                  {note.waveHeights.map((h, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-full transition-all duration-150
                        ${isPlaying ? "bg-[#F4521E]" : "bg-[#F4521E]/30"}`}
                      style={{
                        height: `${h}px`,
                        // animate bars when playing
                        transform: isPlaying
                          ? `scaleY(${0.6 + Math.sin(i * 0.8) * 0.4})`
                          : "scaleY(1)",
                      }}
                    />
                  ))}
                </div>

                {/* Duration */}
                <span className="text-xs font-bold text-gray-400 shrink-0">
                  {note.duration}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VoiceInstructions;
