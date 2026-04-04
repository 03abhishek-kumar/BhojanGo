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
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-[11px] font-bold tracking-widest uppercase text-gray-400">
          Order Journey
        </p>
        <p className="text-sm font-bold text-[#F4521E]">ETA: 14 mins</p>
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
                        ? "bg-[#F4521E] shadow-md shadow-orange-200"
                        : step.status === "active"
                          ? "bg-white border-2 border-[#F4521E]"
                          : "bg-white border-2 border-gray-200"
                    }`}
                >
                  <Icon
                    className={`w-4 h-4
                      ${
                        step.status === "done"
                          ? "text-white"
                          : step.status === "active"
                            ? "text-[#F4521E]"
                            : "text-gray-300"
                      }`}
                  />
                </div>

                {/* Connector Line */}
                {!isLast && (
                  <div
                    className={`w-0.5 flex-1 my-1 min-h-8
                      ${
                        step.status === "done" ? "bg-[#F4521E]" : "bg-gray-200"
                      }`}
                  />
                )}
              </div>

              {/* ── Right — Text ── */}
              <div className="pb-6">
                <p
                  className={`font-['Sora'] font-bold text-sm
                    ${
                      step.status === "active"
                        ? "text-[#F4521E]"
                        : step.status === "done"
                          ? "text-[#151515]"
                          : "text-gray-300"
                    }`}
                >
                  {step.label}
                </p>
                <p
                  className={`text-xs mt-0.5
                    ${
                      step.status === "pending"
                        ? "text-gray-300"
                        : "text-gray-400"
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
