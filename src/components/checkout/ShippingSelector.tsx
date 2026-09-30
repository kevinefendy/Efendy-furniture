"use client";

import { Truck, Zap, PackageCheck } from "lucide-react";
import { SHIPPING_METHODS, getEstimatedDeliveryDate } from "@/data/checkout";
import { formatIDR } from "@/lib/utils";
import type { ShippingTier } from "@/types";

interface ShippingSelectorProps {
  selectedId: ShippingTier;
  onSelect: (id: ShippingTier) => void;
}

const ICONS: Record<ShippingTier, typeof Truck> = {
  regular: Truck,
  express: Zap,
  "same-day": PackageCheck,
};

export default function ShippingSelector({ selectedId, onSelect }: ShippingSelectorProps) {
  return (
    <section aria-labelledby="checkout-shipping-heading" className="bg-white border border-[#E5E1DB] rounded-sm p-6">
      <h2 id="checkout-shipping-heading" className="font-serif text-2xl text-[#20201E] mb-1">
        2. Shipping Method
      </h2>
      <p className="text-xs text-[#817A71] mb-6">
        Estimated arrival updates automatically with your choice.
      </p>

      <div className="space-y-3" role="radiogroup" aria-labelledby="checkout-shipping-heading">
        {SHIPPING_METHODS.map((m) => {
          const Icon = ICONS[m.id];
          const selected = selectedId === m.id;
          return (
            <button
              key={m.id}
              role="radio"
              aria-checked={selected}
              onClick={() => onSelect(m.id)}
              className={`w-full flex items-center gap-4 border rounded-sm px-4 py-4 text-left transition-all focus-visible:outline-2 focus-visible:outline-[#A88968] ${
                selected
                  ? "border-[#20201E] bg-[#F7F5F0] ring-1 ring-[#20201E]"
                  : "border-[#E5E1DB] bg-white hover:border-stone-400"
              }`}
            >
              <span
                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  selected ? "bg-[#20201E] text-white" : "bg-[#F7F5F0] text-[#A88968]"
                }`}
              >
                <Icon size={18} aria-hidden />
              </span>
              <span className="flex-1 min-w-0">
                <span className="block text-sm font-semibold text-[#20201E]">{m.name}</span>
                <span className="block text-xs text-[#817A71] mt-0.5">
                  Estimated: {m.estimatedDays} • Arrives {getEstimatedDeliveryDate(m.id)}
                </span>
              </span>
              <span className="text-sm font-semibold text-[#20201E] shrink-0">
                {formatIDR(m.price)}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
