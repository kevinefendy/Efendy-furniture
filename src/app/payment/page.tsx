"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, Loader2, Lock, ShoppingBag } from "lucide-react";
import { formatIDR } from "@/lib/utils";
import {
  useCart,
  useCheckoutDraft,
  clearCart,
  createOrder,
} from "@/lib/store";
import {
  SHIPPING_METHODS,
  PAYMENT_METHODS,
  getEstimatedDeliveryDate,
} from "@/data/checkout";
import type { PaymentMethodType } from "@/types";
import PaymentSelector from "@/components/checkout/PaymentSelector";

type Phase = "select" | "processing" | "success";

export default function PaymentPage() {
  const router = useRouter();
  const { items, subtotal } = useCart();
  const { draft, save } = useCheckoutDraft();
  const [paymentId, setPaymentId] = useState<PaymentMethodType | null>(draft.paymentId);
  const [phase, setPhase] = useState<Phase>("select");
  const [ready, setReady] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState<string | null>(null);

  useEffect(() => {
    setPaymentId(draft.paymentId);
    setReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const shipping = useMemo(
    () => SHIPPING_METHODS.find((m) => m.id === draft.shippingId) || SHIPPING_METHODS[0],
    [draft.shippingId]
  );
  const payment = useMemo(
    () => PAYMENT_METHODS.find((m) => m.id === paymentId) || null,
    [paymentId]
  );
  const total = subtotal + shipping.price;

  const hasCustomer = useMemo(() => {
    const c = draft.customer;
    return !!(c.fullName.trim() && c.phone.trim() && c.address.trim() && c.city.trim());
  }, [draft.customer]);

  const handleSimulate = () => {
    if (!payment || phase !== "select") return;
    save({ paymentId: payment.id });
    setPhase("processing");

    setTimeout(() => {
      const order = createOrder({
        items,
        customer: draft.customer,
        shipping,
        payment,
        subtotal,
        shippingCost: shipping.price,
        total,
        estimatedDeliveryDate: getEstimatedDeliveryDate(shipping.id),
      });
      clearCart();
      setCreatedOrderId(order.id);
      setPhase("success");
      setTimeout(() => {
        router.push(`/order/${order.id.replace("#", "")}`);
      }, 1600);
    }, 1500);
  };

  if (!ready) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-sm text-[#817A71]">
        Loading payment...
      </div>
    );
  }

  if (items.length === 0 && phase === "select") {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center">
        <div className="w-16 h-16 bg-white border border-[#E5E1DB] rounded-full flex items-center justify-center text-[#817A71] mx-auto mb-5">
          <ShoppingBag size={28} />
        </div>
        <h1 className="font-serif text-4xl text-[#20201E]">Payment</h1>
        <p className="text-sm text-[#817A71] mt-3 mb-8">
          Your cart is empty. Add some furniture before paying.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#20201E] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#6B6B6B] transition-colors"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  if (!hasCustomer && phase === "select") {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center">
        <h1 className="font-serif text-4xl text-[#20201E]">Payment</h1>
        <p className="text-sm text-[#817A71] mt-3 mb-8">
          Please complete your shipping information first.
        </p>
        <Link
          href="/checkout"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#20201E] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#6B6B6B] transition-colors"
        >
          <ArrowLeft size={14} /> Back to Checkout
        </Link>
      </div>
    );
  }

  // Success state (PRD §25)
  if (phase === "success") {
    return (
      <div className="max-w-xl mx-auto px-4 sm:px-6 py-20 text-center">
        <div
          role="status"
          className="bg-white border border-[#E5E1DB] rounded-sm px-8 py-12"
        >
          <div className="w-16 h-16 bg-emerald-500/10 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-5">
            <Check size={32} />
          </div>
          <p className="text-xs uppercase tracking-widest text-emerald-700 font-bold mb-2">
            ✓ Payment Successful
          </p>
          <h1 className="font-serif text-3xl text-[#20201E]">
            Thank you for your order
          </h1>
          {createdOrderId && (
            <p className="text-sm text-[#817A71] mt-3">
              Order <span className="font-semibold text-[#20201E]">{createdOrderId}</span>
            </p>
          )}
          <p className="text-xs text-[#817A71] mt-2">Redirecting to order confirmation...</p>
          {createdOrderId && (
            <Link
              href={`/order/${createdOrderId.replace("#", "")}`}
              className="inline-block mt-6 px-8 py-3 bg-[#20201E] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#6B6B6B] transition-colors"
            >
              View Order Confirmation
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <span className="text-xs uppercase tracking-widest text-[#6B6B6B] font-semibold block mb-2">
        Secure simulated checkout
      </span>
      <h1 className="font-serif text-3xl sm:text-5xl text-[#20201E] tracking-tight mb-8">
        Payment
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <PaymentSelector
            selectedId={paymentId}
            onSelect={(id) => {
              setPaymentId(id);
              save({ paymentId: id });
            }}
          />
        </div>

        {/* Payment summary (PRD §25) */}
        <div className="lg:col-span-4">
          <div className="bg-white border border-[#E5E1DB] rounded-sm p-6 lg:sticky lg:top-28 space-y-5">
            <h2 className="font-serif text-2xl text-[#20201E]">Payment Summary</h2>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between text-[#817A71]">
                <dt>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</dt>
                <dd className="text-[#20201E] font-medium">{formatIDR(subtotal)}</dd>
              </div>
              <div className="flex justify-between text-[#817A71]">
                <dt>Shipping ({shipping.name})</dt>
                <dd className="text-[#20201E] font-medium">{formatIDR(shipping.price)}</dd>
              </div>
              <div className="flex justify-between text-[#817A71]">
                <dt>Estimated arrival</dt>
                <dd className="text-[#20201E] font-medium text-right">
                  {getEstimatedDeliveryDate(shipping.id)}
                </dd>
              </div>
              <div className="flex justify-between items-baseline pt-3 border-t border-[#E5E1DB]">
                <dt className="text-xs font-semibold uppercase tracking-widest text-[#20201E]">
                  Total
                </dt>
                <dd className="text-2xl font-semibold text-[#20201E]">{formatIDR(total)}</dd>
              </div>
            </dl>

            {payment && (
              <p className="text-xs text-[#817A71] bg-[#F7F5F0] border border-[#E5E1DB] rounded-sm px-3 py-2.5">
                Paying with <strong className="text-[#20201E]">{payment.name}</strong>
                {payment.accountNumber && (
                  <span className="block font-mono mt-0.5">{payment.accountNumber}</span>
                )}
              </p>
            )}

            <button
              onClick={handleSimulate}
              disabled={!payment || phase === "processing"}
              className="w-full py-3.5 bg-[#20201E] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#6B6B6B] transition-colors disabled:bg-stone-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {phase === "processing" ? (
                <>
                  <Loader2 size={15} className="animate-spin" /> Processing...
                </>
              ) : (
                <>
                  <Lock size={13} /> Simulate Payment
                </>
              )}
            </button>
            {!payment && (
              <p role="alert" className="text-[11px] text-[#817A71] text-center">
                Select a payment method above to continue.
              </p>
            )}
            <Link
              href="/checkout"
              className="text-[11px] text-[#817A71] hover:text-[#20201E] inline-flex items-center gap-1.5 underline underline-offset-4"
            >
              <ArrowLeft size={12} /> Back to checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
