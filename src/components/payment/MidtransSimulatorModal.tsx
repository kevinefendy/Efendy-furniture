"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  X,
  QrCode,
  CreditCard,
  Building2,
  Copy,
  Check,
  ShieldCheck,
  Clock,
  Sparkles,
  ArrowRight,
  AlertCircle,
  Smartphone,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { formatIDR } from "@/lib/utils";
import confetti from "canvas-confetti";

export interface MidtransSimulatorProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  amount: number;
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;
  itemsSummary?: string;
  onSuccess: (paymentInfo: {
    method: string;
    transactionId: string;
    paidAt: string;
    settlementStatus: string;
  }) => void;
}

type TabType = "qris" | "bca-va" | "mandiri-va" | "bni-va" | "cc";

export default function MidtransSimulatorModal({
  isOpen,
  onClose,
  orderId,
  amount,
  customerName,
  customerEmail,
  customerPhone,
  itemsSummary = "Pesanan Efendy Furniture",
  onSuccess,
}: MidtransSimulatorProps) {
  const [activeTab, setActiveTab] = useState<TabType>("qris");
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<"idle" | "processing" | "3ds_otp" | "success">("idle");
  const [otpInput, setOtpInput] = useState("123456");
  const [countdown, setCountdown] = useState(899); // 14:59
  const [accordionOpen, setAccordionOpen] = useState(true);

  // Credit card form state
  const [cardNumber, setCardNumber] = useState("4811 1111 1111 1111");
  const [cardExpiry, setCardExpiry] = useState("12/28");
  const [cardCvv, setCardCvv] = useState("123");

  // Timer countdown
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  // Reset state on open
  useEffect(() => {
    if (isOpen) {
      setStatus("idle");
      setCopied(false);
    }
  }, [isOpen]);

  // Handle ESC
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && status !== "processing") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, status, onClose]);

  if (!isOpen) return null;

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;
  const formattedCountdown = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  // Dynamic VA numbers
  const phoneSuffix = customerPhone?.replace(/\D/g, "").slice(-8) || "88997700";
  const bcaVaNumber = `80777${phoneSuffix}`;
  const mandiriVaNumber = `89508${phoneSuffix}`;
  const bniVaNumber = `88100${phoneSuffix}`;

  const currentVaNumber =
    activeTab === "bca-va"
      ? bcaVaNumber
      : activeTab === "mandiri-va"
      ? mandiriVaNumber
      : bniVaNumber;

  const handleCopyVa = () => {
    navigator.clipboard?.writeText(currentVaNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const executeSuccessfulPayment = (methodName: string) => {
    setStatus("processing");

    setTimeout(() => {
      setStatus("success");
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.3 },
        colors: ["#10B981", "#3B82F6", "#F59E0B", "#1A1A18"],
      });

      const txId = `MID-TX-${Date.now().toString().slice(-8)}`;
      setTimeout(() => {
        onSuccess({
          method: methodName,
          transactionId: txId,
          paidAt: new Date().toISOString(),
          settlementStatus: "settlement",
        });
      }, 1400);
    }, 1600);
  };

  const handlePayQRIS = () => {
    executeSuccessfulPayment("QRIS Instant (GoPay / BCA / ShopeePay)");
  };

  const handlePayVA = () => {
    const bankName =
      activeTab === "bca-va" ? "BCA" : activeTab === "mandiri-va" ? "Mandiri" : "BNI";
    executeSuccessfulPayment(`${bankName} Virtual Account`);
  };

  const handlePayCard = (e: React.FormEvent) => {
    e.preventDefault();
    // Trigger 3D Secure simulation
    setStatus("3ds_otp");
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    executeSuccessfulPayment("Kartu Kredit (Visa 3D Secure)");
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Midtrans Payment Simulator"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200 font-sans">
        {/* Midtrans Snap Branded Header */}
        <div className="bg-[#002855] text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-[#00529C] flex items-center justify-center text-white font-bold text-sm tracking-wider">
              M
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm tracking-wide">midtrans</span>
                <span className="text-[10px] bg-blue-500/30 text-blue-200 border border-blue-400/40 px-1.5 py-0.5 rounded font-mono font-medium">
                  SIMULATOR SNAP
                </span>
              </div>
              <p className="text-[11px] text-blue-100/80">
                Efendy Furniture Official Store • {orderId}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <span className="text-[10px] text-blue-200 uppercase tracking-wider block">
                Total Pembayaran
              </span>
              <span className="text-base font-bold text-amber-300">
                {formatIDR(amount)}
              </span>
            </div>
            {status !== "processing" && (
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition"
                aria-label="Tutup simulasi"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Mobile Amount Bar */}
        <div className="sm:hidden bg-[#F0F4F8] border-b border-stone-200 px-4 py-2.5 flex items-center justify-between text-xs">
          <span className="text-stone-600 font-medium">Total Pembayaran:</span>
          <span className="font-bold text-[#002855] text-sm">{formatIDR(amount)}</span>
        </div>

        {/* Simulator Info Banner */}
        <div className="bg-amber-50 border-b border-amber-200/80 px-4 py-2 flex items-center justify-between text-xs text-amber-800">
          <div className="flex items-center gap-1.5">
            <Sparkles size={14} className="text-amber-600 shrink-0" />
            <span className="font-medium">
              Mode Simulasi Langsung: Tidak ada pemotongan saldo / uang sungguhan.
            </span>
          </div>
          <div className="flex items-center gap-1 font-mono text-[11px] text-stone-600 bg-white/70 px-2 py-0.5 rounded border border-amber-200">
            <Clock size={12} />
            <span>{formattedCountdown}</span>
          </div>
        </div>

        {/* ── Processing State ────────────────────────────────────────── */}
        {status === "processing" && (
          <div className="p-12 flex flex-col items-center justify-center text-center space-y-4 my-auto">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-4 border-blue-200 border-t-[#00529C] animate-spin" />
            </div>
            <h3 className="font-semibold text-lg text-[#002855]">
              Memproses Pembayaran...
            </h3>
            <p className="text-xs text-stone-500 max-w-sm">
              Menghubungkan ke gateway Midtrans Sandbox dan memverifikasi token pembayaran dengan bank penerbit.
            </p>
          </div>
        )}

        {/* ── 3D Secure OTP State ─────────────────────────────────────── */}
        {status === "3ds_otp" && (
          <div className="p-6 sm:p-8 flex flex-col items-center justify-center text-center max-w-md mx-auto space-y-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-[#002855]">
              <ShieldCheck size={28} />
            </div>
            <h3 className="font-semibold text-base text-[#002855]">
              Verifikasi 3D Secure (Bank Simulator)
            </h3>
            <p className="text-xs text-stone-600">
              Silakan masukkan kode OTP yang dikirimkan ke nomor ponsel Anda untuk menyelesaikan otorisasi kartu.
            </p>
            <div className="bg-[#F0F4F8] p-3 rounded text-xs text-stone-600 w-full text-left space-y-1 font-mono">
              <div>Nomor Kartu: **** **** **** 1111</div>
              <div>Merchant: Efendy Furniture</div>
              <div>Jumlah: {formatIDR(amount)}</div>
            </div>
            <form onSubmit={handleVerifyOtp} className="w-full space-y-3 pt-2">
              <div>
                <label className="text-xs font-semibold text-stone-700 block text-left mb-1">
                  Kode OTP Uji Coba:
                </label>
                <input
                  type="text"
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value)}
                  className="w-full text-center tracking-[0.3em] font-mono font-bold text-lg border border-stone-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00529C]"
                  placeholder="123456"
                  maxLength={6}
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-[#00529C] hover:bg-[#003B70] text-white font-semibold text-xs rounded transition flex items-center justify-center gap-2"
              >
                <span>Konfirmasi & Bayar</span>
                <ArrowRight size={14} />
              </button>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="text-xs text-stone-500 hover:text-stone-800"
              >
                Kembali ke pilihan pembayaran
              </button>
            </form>
          </div>
        )}

        {/* ── Success State ───────────────────────────────────────────── */}
        {status === "success" && (
          <div className="p-10 flex flex-col items-center justify-center text-center space-y-4 my-auto">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center animate-in zoom-in duration-300">
              <Check size={36} strokeWidth={2.5} />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              TRANSAKSI BERHASIL (SETTLEMENT)
            </span>
            <h3 className="font-serif text-2xl text-stone-900 font-normal">
              Pembayaran Terverifikasi!
            </h3>
            <p className="text-xs text-stone-600 max-w-sm">
              Simulator telah mengkonfirmasi pembayaran secara instan. Mengalihkan Anda ke halaman invoice dan pelacakan pesanan...
            </p>
            <div className="text-[11px] font-mono text-stone-500 pt-2">
              Status: Midtrans 200 OK • Auto-Redirecting...
            </div>
          </div>
        )}

        {/* ── Main Selection Tabs ────────────────────────────────────── */}
        {status === "idle" && (
          <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-12 min-h-[380px]">
            {/* Sidebar Method Selector */}
            <div className="md:col-span-4 bg-[#F8FAFC] border-r border-stone-200 p-2 sm:p-3 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 px-3 py-1.5 block">
                Pilih Jalur Pembayaran
              </span>

              <button
                onClick={() => setActiveTab("qris")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded text-left text-xs font-medium transition ${
                  activeTab === "qris"
                    ? "bg-[#00529C] text-white shadow-sm"
                    : "text-stone-700 hover:bg-stone-200/60"
                }`}
              >
                <QrCode size={16} />
                <div className="flex-1 min-w-0">
                  <div className="truncate">QRIS Instant</div>
                  <div className={`text-[10px] ${activeTab === "qris" ? "text-blue-100" : "text-stone-500"}`}>
                    GoPay, OVO, Dana, BCA
                  </div>
                </div>
              </button>

              <button
                onClick={() => setActiveTab("bca-va")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded text-left text-xs font-medium transition ${
                  activeTab === "bca-va"
                    ? "bg-[#00529C] text-white shadow-sm"
                    : "text-stone-700 hover:bg-stone-200/60"
                }`}
              >
                <Building2 size={16} />
                <div className="flex-1 min-w-0">
                  <div className="truncate">BCA Virtual Account</div>
                  <div className={`text-[10px] ${activeTab === "bca-va" ? "text-blue-100" : "text-stone-500"}`}>
                    Cek Otomatis 24 Jam
                  </div>
                </div>
              </button>

              <button
                onClick={() => setActiveTab("mandiri-va")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded text-left text-xs font-medium transition ${
                  activeTab === "mandiri-va"
                    ? "bg-[#00529C] text-white shadow-sm"
                    : "text-stone-700 hover:bg-stone-200/60"
                }`}
              >
                <Building2 size={16} />
                <div className="flex-1 min-w-0">
                  <div className="truncate">Mandiri Bill / VA</div>
                  <div className={`text-[10px] ${activeTab === "mandiri-va" ? "text-blue-100" : "text-stone-500"}`}>
                    Livin&apos; by Mandiri & ATM
                  </div>
                </div>
              </button>

              <button
                onClick={() => setActiveTab("bni-va")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded text-left text-xs font-medium transition ${
                  activeTab === "bni-va"
                    ? "bg-[#00529C] text-white shadow-sm"
                    : "text-stone-700 hover:bg-stone-200/60"
                }`}
              >
                <Building2 size={16} />
                <div className="flex-1 min-w-0">
                  <div className="truncate">BNI / BRI Virtual Account</div>
                  <div className={`text-[10px] ${activeTab === "bni-va" ? "text-blue-100" : "text-stone-500"}`}>
                    Mobile Banking & ATM
                  </div>
                </div>
              </button>

              <button
                onClick={() => setActiveTab("cc")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded text-left text-xs font-medium transition ${
                  activeTab === "cc"
                    ? "bg-[#00529C] text-white shadow-sm"
                    : "text-stone-700 hover:bg-stone-200/60"
                }`}
              >
                <CreditCard size={16} />
                <div className="flex-1 min-w-0">
                  <div className="truncate">Kartu Kredit / Debit</div>
                  <div className={`text-[10px] ${activeTab === "cc" ? "text-blue-100" : "text-stone-500"}`}>
                    Visa, Mastercard (3DS)
                  </div>
                </div>
              </button>
            </div>

            {/* Content Area */}
            <div className="md:col-span-8 p-4 sm:p-6 flex flex-col justify-between">
              {/* 1. QRIS TAB */}
              {activeTab === "qris" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                    <div>
                      <h4 className="font-semibold text-sm text-stone-900">
                        Bayar dengan QRIS
                      </h4>
                      <p className="text-xs text-stone-500">
                        Scan dengan aplikasi e-wallet apa pun
                      </p>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-rose-100 text-rose-700 rounded border border-rose-200">
                      QRIS NASIONAL
                    </span>
                  </div>

                  {/* QRIS Code Box */}
                  <div className="flex flex-col items-center justify-center p-4 bg-white border border-stone-200 rounded-lg shadow-inner max-w-[260px] mx-auto text-center space-y-2">
                    <div className="text-[11px] font-bold tracking-widest text-stone-800 uppercase">
                      EFENDY FURNITURE
                    </div>
                    <div className="relative w-44 h-44 bg-stone-100 p-2 rounded border border-stone-300 flex items-center justify-center">
                      {/* Realistic SVG QR Pattern */}
                      <svg
                        viewBox="0 0 100 100"
                        className="w-full h-full text-stone-900"
                        fill="currentColor"
                      >
                        {/* Top-left corner */}
                        <rect x="0" y="0" width="30" height="30" />
                        <rect x="5" y="5" width="20" height="20" fill="white" />
                        <rect x="10" y="10" width="10" height="10" />
                        {/* Top-right corner */}
                        <rect x="70" y="0" width="30" height="30" />
                        <rect x="75" y="5" width="20" height="20" fill="white" />
                        <rect x="80" y="10" width="10" height="10" />
                        {/* Bottom-left corner */}
                        <rect x="0" y="70" width="30" height="30" />
                        <rect x="5" y="75" width="20" height="20" fill="white" />
                        <rect x="10" y="80" width="10" height="10" />
                        {/* Center & Random Matrix dots */}
                        <rect x="40" y="10" width="10" height="10" />
                        <rect x="45" y="25" width="15" height="10" />
                        <rect x="15" y="45" width="10" height="15" />
                        <rect x="35" y="40" width="30" height="25" />
                        <rect x="40" y="45" width="20" height="15" fill="white" />
                        <rect x="45" y="50" width="10" height="5" />
                        <rect x="70" y="45" width="20" height="10" />
                        <rect x="75" y="70" width="15" height="20" />
                        <rect x="40" y="75" width="25" height="15" />
                      </svg>
                      {/* Center QRIS logo badge */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white px-1.5 py-0.5 rounded shadow text-[9px] font-black tracking-tighter text-rose-600 border border-stone-200">
                          QRIS
                        </div>
                      </div>
                    </div>
                    <div className="text-[10px] text-stone-500">
                      NMID: ID1020268877119
                    </div>
                  </div>

                  <p className="text-xs text-center text-stone-600 font-light max-w-sm mx-auto">
                    Buka <strong>GoPay, BCA Mobile, OVO, DANA, atau ShopeePay</strong> lalu scan QR di atas.
                  </p>

                  <div className="pt-2">
                    <button
                      onClick={handlePayQRIS}
                      className="w-full py-3 bg-[#00529C] hover:bg-[#003B70] text-white font-semibold text-xs tracking-wider uppercase rounded shadow transition flex items-center justify-center gap-2 group cursor-pointer"
                    >
                      <Sparkles size={15} className="text-amber-300" />
                      <span>Simulasikan Pembayaran QRIS Berhasil</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              )}

              {/* 2. VIRTUAL ACCOUNT TABS (BCA, MANDIRI, BNI) */}
              {(activeTab === "bca-va" || activeTab === "mandiri-va" || activeTab === "bni-va") && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                    <div>
                      <h4 className="font-semibold text-sm text-stone-900">
                        {activeTab === "bca-va"
                          ? "BCA Virtual Account"
                          : activeTab === "mandiri-va"
                          ? "Mandiri Virtual Account"
                          : "BNI / BRI Virtual Account"}
                      </h4>
                      <p className="text-xs text-stone-500">
                        Verifikasi otomatis tanpa perlu upload bukti transfer
                      </p>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-100 text-blue-700 rounded border border-blue-200 uppercase">
                      Auto-Detect
                    </span>
                  </div>

                  {/* VA Number Card */}
                  <div className="bg-[#F8FAFC] border border-blue-200/70 rounded-lg p-4 space-y-3">
                    <div className="text-xs text-stone-600">
                      Nomor Virtual Account:
                    </div>
                    <div className="flex items-center justify-between gap-2 bg-white border border-stone-300 rounded px-3 py-2.5">
                      <span className="font-mono text-base sm:text-lg font-bold text-[#002855] tracking-wider">
                        {currentVaNumber}
                      </span>
                      <button
                        onClick={handleCopyVa}
                        className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 bg-[#F0F4F8] hover:bg-stone-200 text-[#002855] rounded transition"
                      >
                        {copied ? (
                          <>
                            <Check size={14} className="text-emerald-600" />
                            <span>Tersalin</span>
                          </>
                        ) : (
                          <>
                            <Copy size={14} />
                            <span>Salin</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="flex justify-between items-center text-xs pt-1 border-t border-stone-200 text-stone-600">
                      <span>Total Nominal Transfer:</span>
                      <span className="font-bold text-[#002855] text-sm">
                        {formatIDR(amount)}
                      </span>
                    </div>
                  </div>

                  {/* Transfer Guide Accordion */}
                  <div className="border border-stone-200 rounded text-xs overflow-hidden">
                    <button
                      onClick={() => setAccordionOpen(!accordionOpen)}
                      className="w-full flex items-center justify-between p-2.5 bg-stone-50 text-stone-700 font-medium hover:bg-stone-100 text-left"
                    >
                      <span>Panduan Transfer m-Banking & ATM</span>
                      {accordionOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                    {accordionOpen && (
                      <div className="p-3 bg-white space-y-2 text-stone-600 text-[11px] leading-relaxed border-t border-stone-200">
                        <p>1. Buka aplikasi m-Banking atau kunjungi ATM terdekat.</p>
                        <p>2. Pilih menu <strong>Transfer</strong> &gt; <strong>Virtual Account</strong>.</p>
                        <p>3. Masukkan kode VA: <span className="font-mono font-bold text-stone-900">{currentVaNumber}</span>.</p>
                        <p>4. Tagihan atas nama <strong>Efendy Furniture</strong> akan muncul otomatis.</p>
                        <p>5. Konfirmasi pembayaran dan simpan notifikasi transaksi.</p>
                      </div>
                    )}
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={handlePayVA}
                      className="w-full py-3 bg-[#00529C] hover:bg-[#003B70] text-white font-semibold text-xs tracking-wider uppercase rounded shadow transition flex items-center justify-center gap-2 group cursor-pointer"
                    >
                      <Sparkles size={15} className="text-amber-300" />
                      <span>Simulasikan Transfer VA Berhasil</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              )}

              {/* 3. CREDIT / DEBIT CARD TAB */}
              {activeTab === "cc" && (
                <form onSubmit={handlePayCard} className="space-y-4">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                    <div>
                      <h4 className="font-semibold text-sm text-stone-900">
                        Kartu Kredit / Debit Online
                      </h4>
                      <p className="text-xs text-stone-500">
                        Visa, Mastercard, JCB berlogo 3D Secure
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-stone-500">
                      <ShieldCheck size={16} className="text-emerald-600" />
                      <span>Encrypted</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-xs font-semibold text-stone-700">
                          Nomor Kartu (Uji Coba Sandbox)
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            setCardNumber("4811 1111 1111 1111");
                            setCardExpiry("12/28");
                            setCardCvv("123");
                          }}
                          className="text-[10px] text-blue-600 hover:underline"
                        >
                          Gunakan Kartu Test
                        </button>
                      </div>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="4811 1111 1111 1111"
                        className="w-full font-mono text-sm border border-stone-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00529C]"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-semibold text-stone-700 block mb-1">
                          Masa Berlaku (MM/YY)
                        </label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="12/28"
                          className="w-full font-mono text-sm border border-stone-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00529C]"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-stone-700 block mb-1">
                          CVV / CVC
                        </label>
                        <input
                          type="password"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          placeholder="123"
                          maxLength={4}
                          className="w-full font-mono text-sm border border-stone-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00529C]"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-2.5 bg-blue-50 border border-blue-200 rounded text-[11px] text-blue-800 leading-relaxed">
                    Setelah mengklik tombol bayar, Anda akan melihat pop-up simulasi <strong>3D Secure OTP</strong> dari bank penerbit kartu.
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 bg-[#00529C] hover:bg-[#003B70] text-white font-semibold text-xs tracking-wider uppercase rounded shadow transition flex items-center justify-center gap-2 group cursor-pointer"
                    >
                      <CreditCard size={15} />
                      <span>Bayar Sekarang • {formatIDR(amount)}</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Footer info */}
        <div className="bg-[#F8FAFC] border-t border-stone-200 px-5 py-3 flex items-center justify-between text-[11px] text-stone-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-emerald-600" />
            <span>Simulasi Pembayaran Terproteksi Midtrans Sandbox Environment</span>
          </div>
          <span className="font-mono text-[10px] text-stone-400 hidden sm:inline">
            TLS 1.3 256-Bit SSL
          </span>
        </div>
      </div>
    </div>
  );
}
