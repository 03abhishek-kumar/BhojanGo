import React, { useState, useRef } from "react";
import { ShoppingCart, Mic, MicOff, CheckCircle } from "lucide-react";

const FoodCard = ({ item, quantity = 0, onAddToCart, onRemoveFromCart }) => {
  const [recording, setRecording] = useState(false);
  const [voiceNoteBase64, setVoiceNoteBase64] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const handleAddToCart = () => {
    onAddToCart(voiceNoteBase64 ? { ...item, voiceNote: voiceNoteBase64 } : item);
  };

  const handleRemoveFromCart = () => {
    if (onRemoveFromCart) {
      onRemoveFromCart(item._id);
    }
  };

  const handleRecording = async () => {
    if (!recording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            audioChunksRef.current.push(e.data);
          }
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          const reader = new FileReader();
          reader.readAsDataURL(audioBlob);
          reader.onloadend = () => {
            setVoiceNoteBase64(reader.result);
          };
          stream.getTracks().forEach((track) => track.stop());
        };

        mediaRecorder.start();
        setRecording(true);
      } catch (err) {
        console.error("Error accessing microphone:", err);
        alert("Please enable microphone access to record a chef note.");
      }
    } else {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
      }
      setRecording(false);
    }
  };

  return (
    <div className="bg-white dark:bg-[#111111] rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 dark:border-[#222222] hover:shadow-lg dark:hover:border-[#F4521E]/50 transition-all duration-300 flex flex-col group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop";
          }}
        />
        {/* Badge */}
        {item.badge && (
          <div
            className="absolute top-3 right-3 bg-[#F4521E] text-white text-[10px] font-[800] px-3 py-1 rounded-full shadow-lg uppercase tracking-widest z-10"
          >
            {item.badge}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-[15px] font-[800] text-[#111111] dark:text-white leading-tight tracking-tight">
            {item.name}
          </h3>
          <span className="text-[#F4521E] font-bold text-sm whitespace-nowrap">
            ${item.price.toFixed(2)}
          </span>
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed mb-4 flex-1 line-clamp-2">
          {item.description}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-2 mt-auto">
          {/* Chef Note / Voice Button */}
          <button
            onClick={handleRecording}
            className={`flex flex-col items-center justify-center gap-0.5 px-3 py-2 rounded-xl border text-[10px] font-semibold tracking-wide transition-all duration-200 cursor-pointer
              ${
                recording
                  ? "bg-[#F4521E] border-[#F4521E] text-white animate-pulse"
                  : voiceNoteBase64
                  ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 hover:border-green-300"
                  : "bg-white dark:bg-[#1A1A1A] border-gray-200 dark:border-[#222222] text-gray-400 dark:text-gray-500 hover:border-[#F4521E] dark:hover:border-[#F4521E] hover:text-[#F4521E] dark:hover:text-[#F4521E]"
              }`}
          >
            {recording ? (
              <>
                <Mic size={14} />
                <span>RECORDING</span>
                <div className="flex items-end gap-px h-3 mt-0.5">
                  {[2, 4, 3, 5, 3].map((h, i) => (
                    <div
                      key={i}
                      className="w-0.5 bg-white rounded-full animate-pulse"
                      style={{ height: `${h * 2}px`, animationDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>
              </>
            ) : voiceNoteBase64 ? (
              <>
                <CheckCircle size={14} />
                <span>NOTE</span>
                <span>SAVED</span>
              </>
            ) : (
              <>
                <Mic size={14} />
                <span>CHEF</span>
                <span>NOTE</span>
              </>
            )}
          </button>

          {/* Add to Cart or Quantity Controls */}
          {quantity > 0 ? (
            <div className="flex items-center justify-between flex-1 bg-gray-50 dark:bg-[#1A1A1A] border border-gray-100 dark:border-[#222222] rounded-xl px-2 py-1.5 shadow-sm">
              <button
                onClick={handleRemoveFromCart}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-[#222222] text-gray-600 dark:text-gray-400 font-bold hover:bg-white dark:hover:bg-[#333333] hover:text-red-500 transition-colors cursor-pointer"
              >
                -
              </button>
              <span className="font-[800] text-[#111111] dark:text-white px-2 text-sm">{quantity}</span>
              <button
                onClick={handleAddToCart}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#F4521E] text-white font-bold hover:bg-[#e03d0e] transition-colors shadow-sm shadow-orange-200 cursor-pointer"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-2 flex-1 justify-center px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer bg-[#F4521E] text-white hover:bg-[#e03d0e] shadow-sm shadow-orange-200"
            >
              <ShoppingCart size={15} />
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
