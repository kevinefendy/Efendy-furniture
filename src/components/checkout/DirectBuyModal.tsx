"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, ArrowRight, Truck, ShieldCheck, Sparkles, MapPin, Phone, User } from "lucide-react";
import { formatIDR } from "@/lib/utils";
import { createOrder, useCheckoutDraft } from "@/lib/store";
import { SHIPPING_METHODS, getEstimatedDeliveryDate, validatePhone } from "@/data/checkout";
import { Product, ShippingTier } from "@/types";
import MidtransSimulatorModal from "@/components/payment/MidtransSimulatorModal";
import { useRouter } from "next/navigation";
import { useCompany } from "@/context/CompanyContext";

interface DirectBuyModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  selectedColor?: string;
  selectedSize?: string;
  quantity?: number;
}

export default function DirectBuyModal({
  isOpen,
  onClose,
  product,
  selectedColor,
  selectedSize,
  quantity = 1,
}: DirectBuyModalProps) {
  const router = useRouter();
  const { draft, save } = useCheckoutDraft();
  const { lang } = useCompany();
  const isId = lang === "id";

  const [fullName, setFullName] = useState(draft.customer.fullName || "Kevin Efendy");
  const [phone, setPhone] = useState(draft.customer.phone || "081288997700");
  const [address, setAddress] = useState(
    draft.customer.address || "Jl. Senopati Raya No. 45"
  );
  const [city, setCity] = useState(draft.customer.city || "Jakarta Selatan");
  const [shippingTier, setShippingTier] = useState<ShippingTier>(draft.shippingId || "regular");

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showMidtransModal, setShowMidtransModal] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState("");

  useEffect(() => {
    if (isOpen) {
      setShowMidtransModal(false);
      setErrors({});
      // Generate realistic order id
      const randNum = Math.floor(1000 + Math.random() * 9000);
      setCurrentOrderId(`ORD-EF-${new Date().toISOString().slice(2, 10).replace(/-/g, "")}-${randNum}`);
    }
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const color = selectedColor || product.colors[0]?.name || "Natural";
  const unitPrice = product.price;
  const subtotal = unitPrice * quantity;
  const selectedShipping =
    SHIPPING_METHODS.find((m) => m.id === shippingTier) || SHIPPING_METHODS[0];
  const total = subtotal + selectedShipping.price;

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!fullName.trim()) errs.fullName = isId ? "Nama lengkap wajib diisi." : "Full name is required.";
    if (!phone.trim()) {
      errs.phone = isId ? "Nomor HP/WA wajib diisi." : "Phone number is required.";
    } else if (!validatePhone(phone)) {
      errs.phone = isId ? "Format nomor HP tidak valid (contoh: 0812xxxxxxx)." : "Invalid phone number format.";
    }
    if (!address.trim()) errs.address = isId ? "Alamat lengkap wajib diisi." : "Address is required.";
    if (!city.trim()) errs.city = isId ? "Kota wajib diisi." : "City is required.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleProceedToMidtrans = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Save draft
    save({
      customer: {
        fullName,
        phone,
        address,
        city,
      },
      shippingId: shippingTier,
    });

    // Open Midtrans simulator popup
    setShowMidtransModal(true);
  };

  const handlePaymentSuccess = (paymentInfo: {
    method: string;
    transactionId: string;
    paidAt: string;
    settlementStatus: string;
  }) => {
    const directCartItem = {
      id: `${product.id}-${color}-${selectedSize || "std"}`,
      productId: product.id,
      name: product.name,
      slug: product.slug,
      category: product.category,
      price: product.price,
      image: product.images[0],
      selectedColor: color,
      selectedSize,
      quantity,
      stock: product.stock,
    };

    const order = createOrder({
      items: [directCartItem],
      customer: {
        fullName,
        phone,
        address,
        city,
      },
      shipping: selectedShipping,
      payment: {
        id: "va-bca",
        name: paymentInfo.method,
        category: "va",
      },
      subtotal,
      shippingCost: selectedShipping.price,
      total,
      estimatedDeliveryDate: getEstimatedDeliveryDate(shippingTier),
    });

    setShowMidtransModal(false);
    onClose();
    router.push(`/order/${order.id.replace("#", "")}`);
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
        role="dialog"
        aria-modal="true"
        aria-label="Direct Purchase Modal"
      >
        <div
          className="relative w-full max-w-xl bg-white border border-[#EEEEEC] rounded-sm shadow-2xl overflow-hidden max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200 font-sans"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#EEEEEC] bg-white">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="font-serif text-xl text-[#1A1A18] font-light">
                {isId ? "Beli Langsung (Simulasi Checkout)" : "Instant Buy (Checkout Simulation)"}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-[#FAFAFA] text-[#737370] hover:text-[#1A1A18] transition"
              aria-label="Tutup"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Product Summary Mini Card */}
            <div className="flex gap-4 p-3.5 bg-[#FAFAFA] border border-[#EEEEEC] rounded-sm">
              <div className="relative w-16 h-20 bg-[#F5F5F5] rounded-xs overflow-hidden shrink-0 border border-[#EEEEEC]">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] uppercase tracking-widest text-[#A88968] font-semibold">
                  {product.category}
                </p>
                <h4 className="font-serif text-base text-[#1A1A18] leading-snug truncate">
                  {product.name}
                </h4>
                <p className="text-xs text-[#737370] mt-0.5">
                  {color} {selectedSize ? `• ${selectedSize}` : ""} • {quantity} pcs
                </p>
                <div className="text-sm font-semibold text-[#1A1A18] mt-1">
                  {formatIDR(subtotal)}
                </div>
              </div>
            </div>

            {/* Form Pengiriman Cepat */}
            <form onSubmit={handleProceedToMidtrans} className="space-y-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#1A1A18] block mb-3">
                  {isId ? "1. Alamat Pengiriman Cepat" : "1. Quick Delivery Address"}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-[#737370] block mb-1">
                      {isId ? "Nama Penerima" : "Full Name"}
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Contoh: Kevin Efendy"
                      className="w-full text-xs bg-white border border-[#EEEEEC] rounded-sm px-3 py-2 text-[#1A1A18] focus:outline-none focus:border-[#1A1A18]"
                    />
                    {errors.fullName && (
                      <p className="text-[11px] text-rose-500 mt-1">{errors.fullName}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-xs text-[#737370] block mb-1">
                      {isId ? "Nomor WhatsApp / HP" : "Phone / WA Number"}
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="081288997700"
                      className="w-full text-xs bg-white border border-[#EEEEEC] rounded-sm px-3 py-2 text-[#1A1A18] focus:outline-none focus:border-[#1A1A18]"
                    />
                    {errors.phone && (
                      <p className="text-[11px] text-rose-500 mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                  <div className="sm:col-span-2">
                    <label className="text-xs text-[#737370] block mb-1">
                      {isId ? "Alamat Rumah / Apartemen" : "Street Address"}
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Jl. Senopati Raya No. 45"
                      className="w-full text-xs bg-white border border-[#EEEEEC] rounded-sm px-3 py-2 text-[#1A1A18] focus:outline-none focus:border-[#1A1A18]"
                    />
                    {errors.address && (
                      <p className="text-[11px] text-rose-500 mt-1">{errors.address}</p>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs text-[#737370] block mb-1">
                      {isId ? "Kota / Kabupaten" : "City / Region"}
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Jakarta Selatan"
                      className="w-full text-xs bg-white border border-[#EEEEEC] rounded-sm px-3 py-2 text-[#1A1A18] focus:outline-none focus:border-[#1A1A18]"
                    />
                    {errors.city && (
                      <p className="text-[11px] text-rose-500 mt-1">{errors.city}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Pilihan Pengiriman */}
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#1A1A18] block mb-2">
                  {isId ? "2. Pilihan Pengantaran" : "2. Delivery Method"}
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {SHIPPING_METHODS.map((method) => {
                    const isSelected = shippingTier === method.id;
                    return (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setShippingTier(method.id)}
                        className={`p-2.5 rounded-sm border text-left transition ${
                          isSelected
                            ? "border-[#1A1A18] bg-[#FAFAFA] ring-1 ring-[#1A1A18]"
                            : "border-[#EEEEEC] hover:border-stone-400 bg-white"
                        }`}
                      >
                        <div className="text-xs font-semibold text-[#1A1A18] truncate">
                          {method.name}
                        </div>
                        <div className="text-[11px] text-stone-500">
                          {formatIDR(method.price)}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Total Ringkasan */}
              <div className="pt-4 border-t border-[#EEEEEC] space-y-2">
                <div className="flex justify-between text-xs text-[#737370]">
                  <span>Subtotal Produk</span>
                  <span>{formatIDR(subtotal)}</span>
                </div>
                <div className="flex justify-between text-xs text-[#737370]">
                  <span>Ongkos Pengantaran</span>
                  <span>{formatIDR(selectedShipping.price)}</span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-[#EEEEEC]">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1A1A18]">
                    Total Pembayaran
                  </span>
                  <span className="text-lg font-bold text-[#1A1A18]">{formatIDR(total)}</span>
                </div>
              </div>

              {/* CTA Lanjut ke Midtrans */}
              <button
                type="submit"
                className="w-full py-3.5 bg-[#1A1A18] hover:bg-[#00529C] text-white text-xs font-semibold uppercase tracking-widest rounded-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Sparkles size={15} className="text-amber-300" />
                <span>
                  {isId
                    ? "Lanjut ke Simulasi Pembayaran Midtrans Snap"
                    : "Proceed to Midtrans Snap Simulator"}
                </span>
                <ArrowRight size={14} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Midtrans Snap Popup Simulator */}
      <MidtransSimulatorModal
        isOpen={showMidtransModal}
        onClose={() => setShowMidtransModal(false)}
        orderId={currentOrderId}
        amount={total}
        customerName={fullName}
        customerPhone={phone}
        itemsSummary={`${product.name} (${color})`}
        onSuccess={handlePaymentSuccess}
      />
    </>
  );
}
