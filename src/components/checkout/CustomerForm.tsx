"use client";

import type { Customer } from "@/types";

export interface CustomerErrors {
  fullName?: string;
  phone?: string;
  address?: string;
  city?: string;
}

interface CustomerFormProps {
  value: Customer;
  errors: CustomerErrors;
  onChange: (patch: Partial<Customer>) => void;
}

const inputClass = (hasError: boolean) =>
  `w-full bg-white border rounded-sm px-3.5 py-3 text-sm text-[#20201E] placeholder:text-stone-400 focus:outline-none transition-colors ${
    hasError
      ? "border-rose-400 focus:border-rose-500"
      : "border-[#E5E1DB] focus:border-[#A88968]"
  }`;

export default function CustomerForm({ value, errors, onChange }: CustomerFormProps) {
  return (
    <section aria-labelledby="checkout-contact-heading" className="bg-white border border-[#E5E1DB] rounded-sm p-6">
      <h2 id="checkout-contact-heading" className="font-serif text-2xl text-[#20201E] mb-1">
        1. Contact Information
      </h2>
      <p className="text-xs text-[#817A71] mb-6">
        Where should we deliver your furniture?
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label htmlFor="cf-name" className="block text-xs font-semibold uppercase tracking-wider text-[#20201E] mb-1.5">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <input
            id="cf-name"
            type="text"
            autoComplete="name"
            value={value.fullName}
            onChange={(e) => onChange({ fullName: e.target.value })}
            placeholder="Your name"
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? "cf-name-error" : undefined}
            className={inputClass(!!errors.fullName)}
          />
          {errors.fullName && (
            <p id="cf-name-error" role="alert" className="mt-1.5 text-xs text-rose-600">
              {errors.fullName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="cf-phone" className="block text-xs font-semibold uppercase tracking-wider text-[#20201E] mb-1.5">
            Phone Number <span className="text-rose-500">*</span>
          </label>
          <input
            id="cf-phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={value.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
            placeholder="08xxxxxxxxxx"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "cf-phone-error" : undefined}
            className={inputClass(!!errors.phone)}
          />
          {errors.phone && (
            <p id="cf-phone-error" role="alert" className="mt-1.5 text-xs text-rose-600">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="cf-city" className="block text-xs font-semibold uppercase tracking-wider text-[#20201E] mb-1.5">
            City / Region <span className="text-rose-500">*</span>
          </label>
          <input
            id="cf-city"
            type="text"
            autoComplete="address-level2"
            value={value.city}
            onChange={(e) => onChange({ city: e.target.value })}
            placeholder="Jakarta"
            aria-invalid={!!errors.city}
            aria-describedby={errors.city ? "cf-city-error" : undefined}
            className={inputClass(!!errors.city)}
          />
          {errors.city && (
            <p id="cf-city-error" role="alert" className="mt-1.5 text-xs text-rose-600">
              {errors.city}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="cf-address" className="block text-xs font-semibold uppercase tracking-wider text-[#20201E] mb-1.5">
            Street Address <span className="text-rose-500">*</span>
          </label>
          <textarea
            id="cf-address"
            rows={3}
            autoComplete="street-address"
            value={value.address}
            onChange={(e) => onChange({ address: e.target.value })}
            placeholder="Street address, building, unit number"
            aria-invalid={!!errors.address}
            aria-describedby={errors.address ? "cf-address-error" : undefined}
            className={`${inputClass(!!errors.address)} resize-none`}
          />
          {errors.address && (
            <p id="cf-address-error" role="alert" className="mt-1.5 text-xs text-rose-600">
              {errors.address}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="cf-postal" className="block text-xs font-semibold uppercase tracking-wider text-[#20201E] mb-1.5">
            Postal Code <span className="text-stone-400 font-normal">(optional)</span>
          </label>
          <input
            id="cf-postal"
            type="text"
            autoComplete="postal-code"
            inputMode="numeric"
            value={value.postalCode || ""}
            onChange={(e) => onChange({ postalCode: e.target.value })}
            placeholder="12345"
            className={inputClass(false)}
          />
        </div>

        <div>
          <label htmlFor="cf-notes" className="block text-xs font-semibold uppercase tracking-wider text-[#20201E] mb-1.5">
            Order Note <span className="text-stone-400 font-normal">(optional)</span>
          </label>
          <input
            id="cf-notes"
            type="text"
            value={value.notes || ""}
            onChange={(e) => onChange({ notes: e.target.value })}
            placeholder="Optional note for courier"
            className={inputClass(false)}
          />
        </div>
      </div>
    </section>
  );
}
