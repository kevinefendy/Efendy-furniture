"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Truck, CalendarCheck, Hash } from "lucide-react";
import { getOrderById, updateOrderStatus, ORDERS_EVENT } from "@/lib/store";
import type { Order, OrderStatus } from "@/types";
import OrderTimeline, { TRACKING_STEPS } from "@/components/order/OrderTimeline";

interface TrackingPageProps {
  params: {
    orderId: string;
  };
}

const NEXT_STATUS: Partial<Record<OrderStatus, OrderStatus>> = {
  created: "paid",
  paid: "processing",
  processing: "shipped",
  shipped: "in_transit",
  in_transit: "delivered",
};

export default function TrackingPage({ params }: TrackingPageProps) {
  const [order, setOrder] = useState<Order | null | undefined>(undefined);

  useEffect(() => {
    const sync = () => setOrder(getOrderById(decodeURIComponent(params.orderId)) ?? null);
    sync();
    window.addEventListener(ORDERS_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(ORDERS_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, [params.orderId]);

  if (order === undefined) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-sm text-[#817A71]">
        Loading tracking...
      </div>
    );
  }

  if (order === null) {
    notFound();
  }

  const next = NEXT_STATUS[order.status];
  const nextLabel = next ? TRACKING_STEPS.find((s) => s.id === next)?.label : null;

  const handleNext = () => {
    if (!next) return;
    const updated = updateOrderStatus(order.id, next);
    if (updated) setOrder(updated);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href={`/order/${order.id.replace("#", "")}`}
        className="inline-flex items-center gap-1.5 text-xs text-[#817A71] hover:text-[#20201E] underline underline-offset-4 mb-6"
      >
        <ArrowLeft size={13} /> Back to order
      </Link>

      <span className="text-xs uppercase tracking-widest text-[#6B6B6B] font-semibold block mb-2">
        Delivery simulation
      </span>
      <h1 className="font-serif text-3xl sm:text-5xl text-[#20201E] tracking-tight">
        Track Your Order
      </h1>
      <p className="text-sm text-[#817A71] mt-2 mb-10">
        Order <span className="font-semibold text-[#20201E] font-mono">{order.id}</span>
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Timeline */}
        <div className="lg:col-span-7 bg-white border border-[#E5E1DB] rounded-sm p-6 sm:p-8">
          <OrderTimeline status={order.status} />

          {next ? (
            <div className="pt-2 border-t border-[#E5E1DB]">
              <p className="text-xs text-[#817A71] mb-3">
                Demo simulation: advance order to <strong className="text-[#20201E]">{nextLabel}</strong>.
              </p>
              <button
                onClick={handleNext}
                className="w-full sm:w-auto px-8 py-3 bg-[#20201E] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#6B6B6B] transition-colors inline-flex items-center justify-center gap-2"
              >
                Next Status <ArrowRight size={14} />
              </button>
            </div>
          ) : (
            <div className="pt-4 border-t border-[#E5E1DB]" role="status">
              <p className="text-sm font-medium text-emerald-700">
                ✓ Order arrived. Enjoy your new furniture!
              </p>
              <Link
                href="/shop"
                className="inline-block mt-4 px-8 py-3 bg-[#20201E] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#6B6B6B] transition-colors"
              >
                Shop Again
              </Link>
            </div>
          )}
        </div>

        {/* Courier info (PRD §28) */}
        <div className="lg:col-span-5">
          <div className="bg-white border border-[#E5E1DB] rounded-sm p-6 space-y-4 lg:sticky lg:top-28">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[#20201E]">
              Delivery Details
            </h2>
            <div className="flex items-start gap-3 text-sm">
              <Truck size={17} className="text-[#6B6B6B] mt-0.5 shrink-0" aria-hidden />
              <div>
                <p className="text-[#817A71] text-xs uppercase tracking-wider">Courier</p>
                <p className="text-[#20201E] font-medium">{order.shipping.name}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <Hash size={17} className="text-[#6B6B6B] mt-0.5 shrink-0" aria-hidden />
              <div>
                <p className="text-[#817A71] text-xs uppercase tracking-wider">Tracking Number</p>
                <p className="text-[#20201E] font-medium font-mono">{order.trackingNumber}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <CalendarCheck size={17} className="text-[#6B6B6B] mt-0.5 shrink-0" aria-hidden />
              <div>
                <p className="text-[#817A71] text-xs uppercase tracking-wider">Estimated Arrival</p>
                <p className="text-[#20201E] font-medium">{order.estimatedDeliveryDate}</p>
              </div>
            </div>
            <div className="border-t border-[#E5E1DB] pt-4 text-sm text-[#817A71]">
              <p>
                {order.customer.fullName} — {order.customer.address}, {order.customer.city}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
