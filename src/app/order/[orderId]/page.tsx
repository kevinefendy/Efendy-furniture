"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import confetti from "canvas-confetti";
import { ArrowLeft } from "lucide-react";
import { getOrderById } from "@/lib/store";
import type { Order } from "@/types";
import OrderConfirmation from "@/components/order/OrderConfirmation";

interface OrderPageProps {
  params: {
    orderId: string;
  };
}

export default function OrderPage({ params }: OrderPageProps) {
  const [order, setOrder] = useState<Order | null | undefined>(undefined);

  useEffect(() => {
    setOrder(getOrderById(decodeURIComponent(params.orderId)) ?? null);
  }, [params.orderId]);

  useEffect(() => {
    if (order) {
      const t = setTimeout(() => {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.25 },
          colors: ["#A88968", "#20201E", "#E5E1DB", "#ffffff"],
        });
      }, 350);
      return () => clearTimeout(t);
    }
  }, [order]);

  if (order === undefined) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-sm text-[#817A71]">
        Loading order...
      </div>
    );
  }

  if (order === null) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/shop"
        className="inline-flex items-center gap-1.5 text-xs text-[#817A71] hover:text-[#20201E] underline underline-offset-4 mb-6"
      >
        <ArrowLeft size={13} /> Continue shopping
      </Link>
      <OrderConfirmation order={order} />
    </div>
  );
}
