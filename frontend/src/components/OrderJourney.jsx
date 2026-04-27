import React, { useState, useEffect } from "react";
import {
  CheckIcon,
  FireIcon,
  TruckIcon,
  HomeIcon,
} from "@heroicons/react/24/solid";

const STEPS = [
  {
    id: 1,
    label: "Order Received",
    description: "Your order has been confirmed",
    icon: CheckIcon,
  },
  {
    id: 2,
    label: "Preparing Your Meal",
    description: "Chef is crafting your selection",
    icon: FireIcon,
  },
  {
    id: 3,
    label: "Out for Delivery",
    description: "Courier picked up your order",
    icon: TruckIcon,
  },
  {
    id: 4,
    label: "Delivered",
    description: "Enjoy your meal!",
    icon: HomeIcon,
  },
];

const OrderJourney = () => {
  // Start at step 1 and auto-advance to simulate live tracking
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    // Auto-advance every 8 seconds to simulate order progress
    if (currentStep < STEPS.length) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  const getETA = () => {
    if (currentStep === 1) return "~28 mins";
    if (currentStep === 2) return "~20 mins";
    if (currentStep === 3) return "~10 mins";
    return "Arrived!";
  };

  return (
    <div className="bg-white dark:bg-[#111111] rounded-[24px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 dark:border-[#222222] transition-colors duration-300">
      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-[10px] uppercase tracking-widest font-[800] text-gray-400 dark:text-gray-500">
          Order Journey
        </p>
        <p className="text-sm font-[800] text-[#F4521E] tracking-tight">
          ETA: {getETA()}
        </p>
      </div>

      {/* ── Steps ── */}
      <div className="flex flex-col">
        {STEPS.map((step, index) => {
          const Icon = step.icon;
          const isLast = index === STEPS.length - 1;
          const isDone = step.id < currentStep;
          const isActive = step.id === currentStep;
          const isPending = step.id > currentStep;

          return (
            <div key={step.id} className="flex gap-4">
              {/* ── Left — Icon + Connector Line ── */}
              <div className="flex flex-col items-center">
                {/* Icon Circle */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-500
                    ${
                      isDone
                        ? "bg-[#F4521E] shadow-md shadow-orange-200 dark:shadow-none"
                        : isActive
                        ? "bg-white dark:bg-[#1A1A1A] border-2 border-[#F4521E] ring-4 ring-[#F4521E]/20"
                        : "bg-white dark:bg-[#1A1A1A] border-2 border-gray-200 dark:border-[#222222]"
                    }`}
                >
                  <Icon
                    className={`w-4 h-4 transition-colors duration-500
                      ${
                        isDone
                          ? "text-white"
                          : isActive
                          ? "text-[#F4521E]"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                  />
                </div>

                {/* Connector Line */}
                {!isLast && (
                  <div className="relative w-0.5 flex-1 my-1 min-h-8 bg-gray-100 dark:bg-[#222222] overflow-hidden">
                    {/* Animated fill for completed steps */}
                    <div
                      className="absolute top-0 left-0 w-full bg-[#F4521E] transition-all duration-700"
                      style={{ height: isDone ? "100%" : "0%" }}
                    />
                  </div>
                )}
              </div>

              {/* ── Right — Text ── */}
              <div className="pb-6">
                <p
                  className={`font-[800] text-sm tracking-tight transition-colors duration-500
                    ${
                      isActive
                        ? "text-[#F4521E]"
                        : isDone
                        ? "text-[#111111] dark:text-white"
                        : "text-gray-300 dark:text-gray-700"
                    }`}
                >
                  {step.label}
                  {/* Pulsing dot for active step */}
                  {isActive && (
                    <span className="inline-block ml-2 w-2 h-2 bg-[#F4521E] rounded-full animate-pulse" />
                  )}
                </p>
                <p
                  className={`text-xs mt-0.5 font-medium transition-colors duration-500
                    ${
                      isPending
                        ? "text-gray-300 dark:text-gray-700"
                        : "text-gray-400 dark:text-gray-500"
                    }`}
                >
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderJourney;
