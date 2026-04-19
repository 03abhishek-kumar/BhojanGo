import React from "react";
import {
  CheckIcon,
  FireIcon,
  TruckIcon,
  HomeIcon,
} from "@heroicons/react/24/solid";

const OrderJourney = () => {
  const steps = [
    {
      id: 1,
      label: "Order Received",
      description: "Confirmed at 12:45 PM",
      icon: CheckIcon,
      status: "done",
    },
    {
      id: 2,
      label: "Preparing Your Meal",
      description: "Chef is crafting your selection",
      icon: FireIcon,
      status: "done",
    },
    {
      id: 3,
      label: "Out for Delivery",
      description: "Courier picked up at 1:02 PM",
      icon: TruckIcon,
      status: "active",
    },
    {
      id: 4,
      label: "Delivered",
      description: "Estimated by 1:16 PM",
      icon: HomeIcon,
      status: "pending",
    },
  ];

  return (
    <div className="bg-white dark:bg-[#111111] rounded-[24px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 dark:border-[#222222] transition-colors duration-300">
      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-[10px] uppercase tracking-widest font-[800] text-gray-400 dark:text-gray-500">
          Order Journey
        </p>
        <p className="text-sm font-[800] text-[#F4521E] tracking-tight">ETA: 14 mins</p>
      </div>

      {/* ── Steps ── */}
      <div className="flex flex-col">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isLast = index === steps.length - 1;

          return (
            <div key={step.id} className="flex gap-4">
              {/* ── Left — Icon + Connector Line ── */}
              <div className="flex flex-col items-center">
                {/* Icon Circle */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all
                    ${
                      step.status === "done"
                        ? "bg-[#F4521E] shadow-md shadow-orange-200 dark:shadow-none"
                        : step.status === "active"
                          ? "bg-white dark:bg-[#1A1A1A] border-2 border-[#F4521E]"
                          : "bg-white dark:bg-[#1A1A1A] border-2 border-gray-200 dark:border-[#222222]"
                    }`}
                >
                  <Icon
                    className={`w-4 h-4
                      ${
                        step.status === "done"
                          ? "text-white"
                          : step.status === "active"
                            ? "text-[#F4521E]"
                            : "text-gray-300 dark:text-gray-600"
                      }`}
                  />
                </div>

                {/* Connector Line */}
                {!isLast && (
                  <div
                    className={`w-0.5 flex-1 my-1 min-h-8
                      ${
                        step.status === "done" ? "bg-[#F4521E]" : "bg-gray-100 dark:bg-[#222222]"
                      }`}
                  />
                )}
              </div>

              {/* ── Right — Text ── */}
              <div className="pb-6">
                <p
                  className={`font-[800] text-sm tracking-tight
                    ${
                      step.status === "active"
                        ? "text-[#F4521E]"
                        : step.status === "done"
                          ? "text-[#111111] dark:text-white"
                          : "text-gray-300 dark:text-gray-700"
                    }`}
                >
                  {step.label}
                </p>
                <p
                  className={`text-xs mt-0.5 font-medium
                    ${
                      step.status === "pending"
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
