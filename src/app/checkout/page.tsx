"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart, useCheckoutDraft } from "@/lib/store";
import type { Customer, ShippingTier } from "@/types";
import { SHIPPING_METHODS, validatePhone } from "@/data/checkout";
import CustomerForm, { type CustomerErrors as FormErrors } from "@/components/checkout/CustomerForm";
import ShippingSelector from "@/components/checkout/ShippingSelector";
import OrderSummary from "@/components/checkout/OrderSummary";

const STEPS = ["Contact", "Shipping", "Payment"];

function validateCustomer(c: Customer): FormErrors {
  const errors: FormErrors = {};
  if (!c.fullName.trim()) errors.fullName = "Full name is required.";
  if (!c.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!validatePhone(c.phone)) {
    errors.phone = "Enter a valid Indonesian phone number (e.g. 0812xxxxxxx).";
  }
  if (!c.address.trim()) errors.address = "Street address is required.";
  if (!c.city.trim()) errors.city = "City / region is required.";
  return errors;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal } = useCart();
  const { draft, save } = useCheckoutDraft();
  const [form, setForm] = useState<Customer>(draft.customer);
  const [errors, setErrors] = useState<FormErrors>({});
  const [shippingId, setShippingId] = useState<ShippingTier>(draft.shippingId);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setForm(draft.customer);
    setShippingId(draft.shippingId);
    setReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const shipping = useMemo(
    () => SHIPPING_METHODS.find((m) => m.id === shippingId) || SHIPPING_METHODS[0],
    [shippingId]
  );
  const total = subtotal + shipping.price;

  const handleContinue = () => {
    const errs = validateCustomer(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      document.getElementById("checkout-contact-heading")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      return;
    }
    save({ customer: form, shippingId });
    router.push("/payment");
  };

  if (!ready) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-sm text-[#817A71]">
        Loading checkout...
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center">
        <div className="w-16 h-16 bg-white border border-[#E5E1DB] rounded-full flex items-center justify-center text-[#817A71] mx-auto mb-5">
          <ShoppingBag size={28} />
        </div>
        <h1 className="font-serif text-4xl text-[#20201E]">Checkout</h1>
        <p className="text-sm text-[#817A71] mt-3 mb-8">
          Your cart is empty. Add some furniture before checking out.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#20201E] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#A88968] transition-colors"
        >
          <ArrowLeft size={14} /> Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <span className="text-xs uppercase tracking-widest text-[#A88968] font-semibold block mb-2">
        Almost yours
      </span>
      <h1 className="font-serif text-3xl sm:text-5xl text-[#20201E] tracking-tight mb-6">
        Checkout
      </h1>

      {/* Steps indicator */}
      <ol className="flex items-center gap-2 sm:gap-3 mb-10" aria-label="Checkout steps">
        {STEPS.map((label, i) => {
          const active = i === 0;
          const done = false;
          return (
            <li key={label} className="flex items-center gap-2 sm:gap-3">
              <span
                aria-current={active ? "step" : undefined}
                className={`flex items-center gap-2 text-[11px] sm:text-xs uppercase tracking-wider font-semibold ${
                  active ? "text-[#20201E]" : "text-stone-400"
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] border ${
                    active
                      ? "bg-[#20201E] text-white border-[#20201E]"
                      : "border-[#E5E1DB] bg-white"
                  }`}
                >
                  {i + 1}
                </span>
                {label}
              </span>
              {i < STEPS.length - 1 && (
                <span className="w-6 sm:w-12 h-px bg-[#E5E1DB]" aria-hidden />
              )}
              {done && null}
            </li>
          );
        })}
      </ol>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <CustomerForm
            value={form}
            errors={errors}
            onChange={(patch) => setForm((prev) => ({ ...prev, ...patch }))}
          />
          <ShippingSelector selectedId={shippingId} onSelect={setShippingId} />

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/cart"
              className="flex-1 py-3.5 border border-[#20201E] text-[#20201E] text-xs font-semibold uppercase tracking-widest hover:bg-[#20201E] hover:text-white transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft size={14} /> Back to Cart
            </Link>
            <button
              onClick={handleContinue}
              className="flex-1 py-3.5 bg-[#20201E] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#A88968] transition-colors flex items-center justify-center gap-2"
            >
              Continue to Payment <ArrowRight size={14} />
            </button>
          </div>
        </div>

        <div className="lg:col-span-4">
          <OrderSummary
            items={items}
            subtotal={subtotal}
            shippingCost={shipping.price}
            total={total}
            shippingName={shipping.name}
            shippingId={shipping.id}
          />
        </div>
      </div>
    </div>
  );
}
