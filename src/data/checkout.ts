import type { PaymentMethodOption, ShippingMethod } from "@/types";

export const SHIPPING_METHODS: ShippingMethod[] = [
  {
    id: "regular",
    name: "Regular Delivery",
    estimatedDays: "3–5 days",
    price: 25000,
  },
  {
    id: "express",
    name: "Express Delivery",
    estimatedDays: "1–2 days",
    price: 45000,
  },
  {
    id: "same-day",
    name: "Same Day",
    estimatedDays: "Today",
    price: 65000,
  },
];

export const PAYMENT_METHODS: PaymentMethodOption[] = [
  { id: "bank-bca", name: "BCA", category: "bank", accountNumber: "8210 1234 56" },
  { id: "bank-bni", name: "BNI", category: "bank", accountNumber: "9880 1234 5678" },
  { id: "bank-bri", name: "BRI", category: "bank", accountNumber: "0021 0100 1234 567" },
  { id: "bank-mandiri", name: "Mandiri", category: "bank", accountNumber: "8900 1234 5678 90" },
  { id: "va-bca", name: "BCA Virtual Account", category: "va", accountNumber: "3901 0812 3456 7890" },
  { id: "va-bni", name: "BNI Virtual Account", category: "va", accountNumber: "8810 0812 3456 7890" },
  { id: "va-mandiri", name: "Mandiri Virtual Account", category: "va", accountNumber: "8950 0812 3456 7890" },
  { id: "ewallet-gopay", name: "GoPay", category: "ewallet", accountNumber: "0812-3456-7890" },
  { id: "ewallet-ovo", name: "OVO", category: "ewallet", accountNumber: "0812-3456-7890" },
  { id: "ewallet-dana", name: "DANA", category: "ewallet", accountNumber: "0812-3456-7890" },
  { id: "qris", name: "QRIS", category: "qris" },
  { id: "cod", name: "Cash on Delivery", category: "cod" },
];

export const PAYMENT_CATEGORY_LABELS: Record<PaymentMethodOption["category"], string> = {
  bank: "Bank Transfer",
  va: "Virtual Account",
  ewallet: "E-Wallet",
  qris: "QRIS",
  cod: "Cash on Delivery",
};

export function getEstimatedDeliveryDate(shippingId: string): string {
  const now = new Date();
  const addDays = shippingId === "same-day" ? 0 : shippingId === "express" ? 2 : 5;
  const d = new Date(now);
  d.setDate(d.getDate() + addDays);
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function validatePhone(phone: string): boolean {
  const digits = phone.replace(/[\s\-+.]/g, "");
  return /^(08\d{8,12}|628\d{8,12})$/.test(digits);
}
