"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Bot, Send, X, MessageCircle } from "lucide-react";
import {
  CHAIR_AI_QUICK_REPLIES,
  getChairAIResponse,
  type ChairAIResponse,
} from "@/lib/chair-ai";
import { formatIDR } from "@/lib/utils";

interface ChatMsg {
  id: number;
  role: "bot" | "user";
  text: string;
  products?: ChairAIResponse["products"];
  links?: ChairAIResponse["links"];
}

let msgId = 0;
const nextId = () => ++msgId;

const GREETING: ChatMsg = {
  id: nextId(),
  role: "bot",
  text: "Halo! Saya Chair AI, asisten Efendy Furniture. Ada yang ingin kamu tanyakan?",
};

function TypingBubble() {
  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-md border border-[#E8E6E1] bg-white px-4 py-3 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#C2410C]"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}

export default function ChairAI() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [quickReplies, setQuickReplies] = useState<string[]>(CHAIR_AI_QUICK_REPLIES);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing, open]);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 80);
      const esc = (e: KeyboardEvent) => {
        if (e.key === "Escape") setOpen(false);
      };
      document.addEventListener("keydown", esc);
      return () => {
        clearTimeout(t);
        document.removeEventListener("keydown", esc);
      };
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [open ]);

  const pushBot = (res: ChairAIResponse) => {
    setTyping(true);
    timerRef.current = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: nextId(), role: "bot", text: res.text, products: res.products, links: res.links },
      ]);
      if (res.suggestions?.length) setQuickReplies(res.suggestions);
      setTyping(false);
    }, 650);
  };

  const send = (raw?: string) => {
    const text = (raw ?? input).trim();
    if (!text || typing) return;
    setMessages((prev) => [...prev, { id: nextId(), role: "user", text }]);
    setInput("");
    pushBot(getChairAIResponse(text));
  };

  return (
    <div className="fixed bottom-5 right-5 z-[80] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {/* ── Chat window ala referensi: header gelap + body putih ── */}
      {open && (
        <div
          role="dialog"
          aria-label="Chair AI chat"
          className="flex h-[600px] max-h-[72dvh] w-[380px] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-[20px] border border-[#E8E6E1] bg-white shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
        >
          {/* Header */}
          <div className="flex shrink-0 items-center gap-3 rounded-t-[20px] bg-[#1A1A1A] px-4 py-3.5 text-white">
            <div className="relative shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
                <Bot size={22} strokeWidth={1.8} />
              </div>
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#1A1A1A] bg-emerald-400" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <p className="text-[15px] font-semibold leading-tight">Chair AI</p>
                <span className="rounded-md bg-[#C2410C] px-1.5 py-0.5 text-[10px] font-bold tracking-wide">
                  AI
                </span>
              </div>
              <p className="text-[12px] leading-tight text-white/70">Asisten Efendy Furniture</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Tutup chat"
              className="rounded-full p-1.5 transition hover:bg-white/15"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-white px-4 py-4">
            {messages.map((m) =>
              m.role === "user" ? (
                <div key={m.id} className="flex justify-end">
                  <div className="max-w-[85%] whitespace-pre-line rounded-2xl rounded-tr-md bg-[#1A1A1A] px-4 py-2.5 text-[13.5px] leading-relaxed text-white">
                    {m.text}
                  </div>
                </div>
              ) : (
                <div key={m.id} className="flex justify-start">
                  <div className="max-w-[92%] space-y-2">
                    <div className="whitespace-pre-line rounded-2xl rounded-tl-md border border-[#F0EDE8] bg-white px-4 py-3 text-[13.5px] leading-relaxed text-[#1A1A1A] shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                      {m.text}
                    </div>

                    {m.products && m.products.length > 0 && (
                      <div className="space-y-1.5">
                        {m.products.map((p) => (
                          <Link
                            key={p.slug}
                            href={`/product/${p.slug}`}
                            onClick={() => setOpen(false)}
                            className="group flex items-center justify-between gap-2 rounded-xl border border-[#E8E6E1] bg-white px-3.5 py-2.5 transition hover:border-[#C2410C] hover:shadow-sm"
                          >
                            <div className="min-w-0">
                              <p className="truncate text-[13px] font-medium text-[#1A1A1A] group-hover:text-[#C2410C]">
                                {p.name}
                              </p>
                              <p className="text-[11px] text-[#6B6B6B]">
                                {p.category} • {p.stock > 0 ? `Stok ${p.stock}` : "Stok habis"}
                              </p>
                            </div>
                            <p className="whitespace-nowrap text-[12.5px] font-semibold text-[#C2410C]">
                              {formatIDR(p.price)}
                            </p>
                          </Link>
                        ))}
                      </div>
                    )}

                    {m.links && m.links.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {m.links.map((l) => (
                          <Link
                            key={l.href + l.label}
                            href={l.href}
                            onClick={() => setOpen(false)}
                            className="rounded-full bg-[#F7F7F5] px-3 py-1.5 text-[12px] font-medium text-[#1A1A1A] transition hover:bg-[#1A1A1A] hover:text-white"
                          >
                            {l.label} →
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )
            )}
            {typing && <TypingBubble />}
          </div>

          {/* Quick replies — pill scroll kayak referensi */}
          <div className="shrink-0 border-t border-[#F0EDE8] bg-white px-3 pb-1 pt-2">
            <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {quickReplies.map((qr) => (
                <button
                  key={qr}
                  onClick={() => send(qr)}
                  disabled={typing}
                  className="shrink-0 whitespace-nowrap rounded-full border border-[#E8E6E1] bg-white px-3.5 py-1.5 text-[12px] text-[#1A1A1A] transition hover:border-[#C2410C] hover:text-[#C2410C] disabled:opacity-50"
                >
                  {qr}
                </button>
              ))}
            </div>
          </div>

          {/* Input — pill + tombol kirim bulat */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="flex shrink-0 items-center gap-2 bg-white p-3"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tanya tentang Efendy Furniture..."
              aria-label="Tanya tentang Efendy Furniture"
              className="min-w-0 flex-1 rounded-full border border-transparent bg-[#F4F4F2] px-4 py-2.5 text-[13px] text-[#1A1A1A] placeholder:text-[#9A9A9A] focus:border-[#C2410C] focus:bg-white focus:outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim() || typing}
              aria-label="Kirim pesan"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1A1A1A] text-white transition hover:bg-[#C2410C] disabled:cursor-not-allowed disabled:bg-[#C9C5BC]"
            >
              <Send size={17} className="ml-0.5" />
            </button>
          </form>
        </div>
      )}

      {/* ── Floating button — bulat, X saat terbuka ── */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Tutup Chair AI" : "Buka Chair AI"}
        aria-expanded={open}
        className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-[#1A1A1A] text-white shadow-[0_10px_30px_rgba(26,26,26,0.4)] transition-all hover:scale-105 hover:bg-[#C2410C] active:scale-95"
      >
        {open ? <X size={26} /> : <MessageCircle size={26} strokeWidth={1.8} />}
      </button>
    </div>
  );
}
