import { useState, useRef, useEffect } from "react";
import { MicrophoneIcon, StopIcon } from "@heroicons/react/24/solid";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";


const VoiceNote = () => {

  const [isRecording, setIsRecording]   = useState(false);
  const [seconds, setSeconds]           = useState(0);
  const [instruction, setInstruction]   = useState("");
  const [waveHeights, setWaveHeights]   = useState(
    Array(12).fill(4) // 12 bars, all start flat
  );

  const timerRef    = useRef(null); // holds the interval
  const waveRef     = useRef(null); // holds the wave animation interval
  const maxSeconds  = 30;

  //  Start Recording 
  const handleStart = () => {
    setIsRecording(true);
    setSeconds(0);

    // timer — counts up every second
    timerRef.current = setInterval(() => {
      setSeconds((prev) => {
        if (prev >= maxSeconds) {
          handleStop();
          return maxSeconds;
        }
        return prev + 1;
      });
    }, 1000);

    // wave animation — randomizes bar heights every 200ms
    waveRef.current = setInterval(() => {
      setWaveHeights(
        Array(12).fill(0).map(() => Math.floor(Math.random() * 28) + 4)
      );
    }, 200);
  };

  //  Stop Recording 
  const handleStop = () => {
    setIsRecording(false);
    clearInterval(timerRef.current);
    clearInterval(waveRef.current);
    // reset bars to flat
    setWaveHeights(Array(12).fill(4));
  };

  // Format seconds to MM:SS 
  const formatTime = (s) => {
    const mins = String(Math.floor(s / 60)).padStart(2, "0");
    const secs = String(s % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  // Cleanup on unmount 
  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
      clearInterval(waveRef.current);
    };
  }, []);


  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <span className="text-xl">🎙️</span>
          <h2 className="font-['Sora'] font-bold text-base text-[#151515]">
            Voice Note for Delivery
          </h2>
        </div>
        <span className="text-[10px] font-bold tracking-widest uppercase bg-orange-50 text-[#F4521E] border border-orange-200 px-3 py-1 rounded-full">
          BhojanGo Exclusive
        </span>
      </div>
      <p className="text-xs text-gray-400 mb-5">
        Leave a precise navigation note for your rider.
      </p>

      {/* Recorder Box */}
      <div className="bg-[#F5F3EE] rounded-2xl p-6 flex flex-col items-center gap-5 mb-4">

        {/* Waveform */}
        <div className="flex items-end gap-1 h-10">
          {waveHeights.map((h, i) => (
            <div
              key={i}
              className={`w-2 rounded-full transition-all duration-150
                ${isRecording ? "bg-[#F4521E]" : "bg-[#F4521E]/30"}`}
              style={{ height: `${h}px` }}
            />
          ))}
        </div>

        {/* Timer */}
        <div className="flex items-center gap-2 text-2xl font-bold font-mono text-gray-300">
          <span className={isRecording ? "text-[#F4521E]" : "text-gray-300"}>
            {formatTime(seconds)}
          </span>
          <span>/</span>
          <span>{formatTime(maxSeconds)}</span>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">

          {/* Record / Stop Button */}
          <button
            onClick={isRecording ? handleStop : handleStart}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white transition
              ${isRecording
                ? "bg-red-500 hover:bg-red-600"
                : "bg-[#F4521E] hover:bg-[#D43E0E]"
              }`}
          >
            {isRecording ? (
              <>
                <StopIcon className="w-4 h-4" />
                Stop Recording
              </>
            ) : (
              <>
                <MicrophoneIcon className="w-4 h-4" />
                Start Recording
              </>
            )}
          </button>

          {/* Upload Button */}
          <button className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-gray-500 bg-white border border-black/10 hover:bg-gray-50 transition">
            <ArrowUpTrayIcon className="w-4 h-4" />
            Upload Clip
          </button>

        </div>
      </div>

      {/* Written Instructions */}
      <div>
        <label className="text-sm font-medium text-[#151515] mb-2 block">
          Written Instructions (Optional)
        </label>
        <textarea
          value={instruction}
          onChange={(e) => setInstruction(e.target.value)}
          placeholder="e.g. Ring the bell twice, apartment is behind the main gate..."
          rows={3}
          className="w-full border border-black/10 rounded-xl px-4 py-3 text-sm text-[#151515] placeholder-gray-400 outline-none focus:border-[#F4521E] resize-none transition"
        />
      </div>

    </div>
  )
}

export default VoiceNote
