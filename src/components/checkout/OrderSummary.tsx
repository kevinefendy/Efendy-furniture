"use client";

import Image from "next/image";
import { formatIDR } from "@/lib/utils";
import { getEstimatedDeliveryDate } from "@/data/checkout";
import type { CartItem, ShippingTier } from "@/types";

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  shippingName: string;
  shippingId?: ShippingTier;
}

export default function OrderSummary({
  items,
  subtotal,
  shippingCost,
  total,
  shippingName,
  shippingId,
}: OrderSummaryProps) {
  return (
    <div className="bg-white border border-[#E5E1DB] rounded-sm p-6 lg:sticky lg:top-28 space-y-5">
      <h2 className="font-serif text-2xl text-[#20201E]">Order Summary</h2>

      <ul className="space-y-4 max-h-72 overflow-y-auto pr-1">
        {items.map((item) => (
          <li key={item.id} className="flex gap-3">
            <div className="relative w-14 h-16 shrink-0 rounded-sm overflow-hidden bg-[#EAE6DF]">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="56px"
                className="object-cover"
              />
              <span className="absolute top-1 right-1 w-5 h-5 bg-[#20201E] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {item.quantity}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#20201E] truncate">{item.name}</p>
              <p className="text-[11px] text-[#817A71]">
                {item.selectedColor}
                {item.selectedSize ? ` • ${item.selectedSize}` : ""}
              </p>
            </div>
            <span className="text-xs font-semibold text-[#20201E] shrink-0">
              {formatIDR(item.price * item.quantity)}
            </span>
          </li>
        ))}
      </ul>

      <dl className="border-t border-[#E5E1DB] pt-4 space-y-2 text-sm">
        <div className="flex justify-between text-[#817A71]">
          <dt>Subtotal</dt>
          <dd className="text-[#20201E] font-medium">{formatIDR(subtotal)}</dd>
        </div>
        <div className="flex justify-between text-[#817A71]">
          <dt>Shipping ({shippingName})</dt>
          <dd className="text-[#20201E] font-medium">{formatIDR(shippingCost)}</dd>
        </div>
        {shippingId && (
          <div className="flex justify-between text-[#817A71]">
            <dt>Estimated arrival</dt>
            <dd className="text-[#20201E] font-medium text-right">
              {getEstimatedDeliveryDate(shippingId)}
            </dd>
          </div>
        )}
        <div className="flex justify-between items-baseline pt-2 border-t border-[#E5E1DB]">
          <dt className="text-xs font-semibold uppercase tracking-widest text-[#20201E]">
            Total
          </dt>
          <dd className="text-xl font-semibold text-[#20201E]">{formatIDR(total)}</dd>
        </div>
      </dl>
    </div>
  );
}
