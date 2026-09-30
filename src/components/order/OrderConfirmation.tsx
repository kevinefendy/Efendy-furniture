"use client";

import Link from "next/link";
import Image from "next/image";
import { Check, MapPin, CreditCard, Truck, ArrowRight, Package } from "lucide-react";
import { formatIDR } from "@/lib/utils";
import type { Order } from "@/types";

interface OrderConfirmationProps {
  order: Order;
}

export default function OrderConfirmation({ order }: OrderConfirmationProps) {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Success header (PRD §26) */}
      <div className="text-center bg-white border border-[#E5E1DB] rounded-sm px-6 py-12 mb-6">
        <div className="w-16 h-16 bg-emerald-500/10 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-5">
          <Check size={32} />
        </div>
        <p className="text-xs uppercase tracking-widest text-emerald-700 font-bold mb-2">
          ✓ Order Confirmed
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#20201E]">
          Thank you for your order.
        </h1>
        <p className="text-sm text-[#817A71] mt-3">
          Order ID{" "}
          <span className="font-semibold text-[#20201E] font-mono">{order.id}</span>
        </p>
        <p className="text-[11px] text-[#817A71] mt-1">
          Placed on{" "}
          {new Date(order.createdAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      {/* Items */}
      <div className="bg-white border border-[#E5E1DB] rounded-sm p-6 mb-6">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[#20201E] mb-4 flex items-center gap-2">
          <Package size={14} className="text-[#6B6B6B]" /> Items Ordered
        </h2>
        <ul className="space-y-4">
          {order.items.map((item) => (
            <li key={item.id} className="flex gap-4">
              <Link
                href={`/product/${item.slug}`}
                className="relative w-16 h-20 shrink-0 rounded-sm overflow-hidden bg-[#EAE6DF]"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </Link>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#20201E] truncate">{item.name}</p>
                <p className="text-[11px] text-[#817A71]">
                  {item.selectedColor}
                  {item.selectedSize ? ` • ${item.selectedSize}` : ""} • Qty {item.quantity}
                </p>
              </div>
              <span className="text-sm font-semibold text-[#20201E] shrink-0">
                {formatIDR(item.price * item.quantity)}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Payment / Shipping / Total */}
      <dl className="bg-white border border-[#E5E1DB] rounded-sm p-6 mb-6 space-y-4 text-sm">
        <div className="flex items-start gap-3">
          <CreditCard size={17} className="text-[#6B6B6B] mt-0.5 shrink-0" aria-hidden />
          <div className="flex-1 flex justify-between gap-3">
            <dt className="text-[#817A71]">Payment</dt>
            <dd className="text-[#20201E] font-medium text-right">{order.payment.name}</dd>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Truck size={17} className="text-[#6B6B6B] mt-0.5 shrink-0" aria-hidden />
          <div className="flex-1 flex justify-between gap-3">
            <dt className="text-[#817A71]">Shipping</dt>
            <dd className="text-[#20201E] font-medium text-right">
              {order.shipping.name} • {formatIDR(order.shippingCost)}
            </dd>
          </div>
        </div>
        <div className="flex justify-between items-baseline pt-3 border-t border-[#E5E1DB]">
          <dt className="text-xs font-semibold uppercase tracking-widest">Total</dt>
          <dd className="text-xl font-semibold text-[#20201E]">{formatIDR(order.total)}</dd>
        </div>
      </dl>

      {/* Address */}
      <div className="bg-white border border-[#E5E1DB] rounded-sm p-6 mb-8">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[#20201E] mb-3 flex items-center gap-2">
          <MapPin size={14} className="text-[#6B6B6B]" /> Shipping Address
        </h2>
        <p className="text-sm font-medium text-[#20201E]">{order.customer.fullName}</p>
        <p className="text-sm text-[#817A71] mt-1">
          {order.customer.address}, {order.customer.city}
          {order.customer.postalCode ? ` ${order.customer.postalCode}` : ""}, Indonesia
        </p>
        <p className="text-sm text-[#817A71]">{order.customer.phone}</p>
        {order.customer.notes && (
          <p className="text-xs text-[#817A71] mt-2 italic">Note: {order.customer.notes}</p>
        )}
      </div>

      <Link
        href={`/tracking/${order.id.replace("#", "")}`}
        className="w-full py-4 bg-[#20201E] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#6B6B6B] transition-colors flex items-center justify-center gap-2"
      >
        Track Order <ArrowRight size={14} />
      </Link>
    </div>
  );
}
