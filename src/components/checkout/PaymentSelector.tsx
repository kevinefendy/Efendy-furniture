"use client";

import { Landmark, Wallet, QrCode, Banknote, CreditCard } from "lucide-react";
import { PAYMENT_METHODS, PAYMENT_CATEGORY_LABELS } from "@/data/checkout";
import type { PaymentMethodOption, PaymentMethodType } from "@/types";

interface PaymentSelectorProps {
  selectedId: PaymentMethodType | null;
  onSelect: (id: PaymentMethodType) => void;
}

const CATEGORY_ICONS: Record<PaymentMethodOption["category"], typeof Landmark> = {
  bank: Landmark,
  va: CreditCard,
  ewallet: Wallet,
  qris: QrCode,
  cod: Banknote,
};

const CATEGORY_ORDER: PaymentMethodOption["category"][] = [
  "bank",
  "va",
  "ewallet",
  "qris",
  "cod",
];

export default function PaymentSelector({ selectedId, onSelect }: PaymentSelectorProps) {
  return (
    <section aria-labelledby="payment-method-heading" className="bg-white border border-[#E5E1DB] rounded-sm p-6">
      <h2 id="payment-method-heading" className="font-serif text-2xl text-[#20201E] mb-1">
        3. Payment Method
      </h2>
      <p className="text-xs text-[#817A71] mb-6">
        Frontend simulation — no real gateway is charged.
      </p>

      <div className="space-y-6">
        {CATEGORY_ORDER.map((category) => {
          const methods = PAYMENT_METHODS.filter((m) => m.category === category);
          if (methods.length === 0) return null;
          const Icon = CATEGORY_ICONS[category];
          return (
            <fieldset key={category}>
              <legend className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#817A71] mb-3">
                <Icon size={15} className="text-[#6B6B6B]" aria-hidden />
                {PAYMENT_CATEGORY_LABELS[category]}
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5" role="radiogroup" aria-label={PAYMENT_CATEGORY_LABELS[category]}>
                {methods.map((m) => {
                  const selected = selectedId === m.id;
                  return (
                    <button
                      key={m.id}
                      role="radio"
                      aria-checked={selected}
                      onClick={() => onSelect(m.id)}
                      className={`flex items-center gap-3 border rounded-sm px-4 py-3 text-left transition-all focus-visible:outline-2 focus-visible:outline-[#6B6B6B] ${
                        selected
                          ? "border-[#20201E] bg-[#F7F5F0] ring-1 ring-[#20201E]"
                          : "border-[#E5E1DB] bg-white hover:border-stone-400"
                      }`}
                    >
                      <span
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          selected ? "border-[#20201E]" : "border-stone-300"
                        }`}
                        aria-hidden
                      >
                        {selected && <span className="w-2 h-2 rounded-full bg-[#20201E]" />}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-medium text-[#20201E] truncate">
                          {m.name}
                        </span>
                        {m.accountNumber && (
                          <span className="block text-[11px] text-[#817A71] font-mono">
                            {m.accountNumber}
                          </span>
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>
          );
        })}
      </div>
    </section>
  );
}
