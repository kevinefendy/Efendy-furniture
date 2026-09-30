"use client";

import { Check } from "lucide-react";
import type { OrderStatus } from "@/types";

export const TRACKING_STEPS: { id: OrderStatus; label: string }[] = [
  { id: "created", label: "Pesanan Dibuat" },
  { id: "paid", label: "Pembayaran Berhasil" },
  { id: "processing", label: "Pesanan Diproses" },
  { id: "shipped", label: "Diserahkan ke Kurir" },
  { id: "in_transit", label: "Dalam Pengiriman" },
  { id: "delivered", label: "Pesanan Sampai" },
];

interface OrderTimelineProps {
  status: OrderStatus;
}

export default function OrderTimeline({ status }: OrderTimelineProps) {
  const currentIdx = TRACKING_STEPS.findIndex((s) => s.id === status);

  return (
    <ol aria-label="Order tracking timeline" className="space-y-0">
      {TRACKING_STEPS.map((step, i) => {
        const completed = i < currentIdx;
        const current = i === currentIdx;
        const upcoming = i > currentIdx;
        return (
          <li key={step.id} className="flex gap-4">
            <div className="flex flex-col items-center" aria-hidden>
              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center border-2 shrink-0 ${
                  completed
                    ? "bg-[#20201E] border-[#20201E] text-white"
                    : current
                      ? "bg-[#6B6B6B] border-[#6B6B6B] text-white animate-pulse"
                      : "bg-white border-[#E5E1DB] text-stone-300"
                }`}
              >
                {completed ? (
                  <Check size={14} />
                ) : (
                  <span
                    className={`w-2 h-2 rounded-full ${
                      current ? "bg-white" : "bg-stone-300"
                    }`}
                  />
                )}
              </span>
              {i < TRACKING_STEPS.length - 1 && (
                <span
                  className={`w-0.5 flex-1 min-h-8 ${
                    i < currentIdx ? "bg-[#20201E]" : "bg-[#E5E1DB]"
                  }`}
                />
              )}
            </div>
            <div className="pb-8 -mt-0.5">
              <p
                className={`text-sm font-medium ${
                  upcoming ? "text-stone-400" : "text-[#20201E]"
                }`}
                aria-current={current ? "step" : undefined}
              >
                {step.label}
              </p>
              <p className="text-[11px] uppercase tracking-wider mt-0.5 text-[#817A71]">
                {completed ? "Completed" : current ? "Current" : "Upcoming"}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
