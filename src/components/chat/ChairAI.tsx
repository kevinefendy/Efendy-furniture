"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Armchair, Bot, Send, X } from "lucide-react";
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
      <div className="bg-white border border-[#E5E1DB] rounded-2xl rounded-tl-md px-4 py-3 flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-[#A88968] animate-bounce"
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
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing, open]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

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
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[80] flex flex-col items-end gap-3">
      {/* ── Chat window ── */}
      {open && (
        <div
          role="dialog"
          aria-label="Chair AI chat"
          className="w-[370px] max-w-[calc(100vw-2.5rem)] h-[590px] max-h-[72dvh] bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.25)] border border-[#E5E1DB] flex flex-col overflow-hidden animate-in slide-in-from-bottom-3 fade-in duration-200"
        >
          {/* Header — palet brand Efendy */}
          <div className="bg-[#20201E] text-white px-4 py-3.5 flex items-center gap-3 shrink-0">
            <div className="relative shrink-0">
              <div className="w-10 h-10 rounded-full bg-[#A88968]/25 flex items-center justify-center">
                <Bot size={22} strokeWidth={1.8} />
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#A88968] border-2 border-[#20201E]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="font-semibold text-[15px] leading-tight">Chair AI</p>
                <span className="text-[10px] font-bold bg-[#A88968] rounded-md px-1.5 py-0.5 tracking-wide">
                  AI
                </span>
              </div>
              <p className="text-[12px] text-white/70 leading-tight">Asisten Efendy Furniture</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Tutup chat"
              className="p-1.5 rounded-full hover:bg-white/15 transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[#F7F5F0]">
            {messages.map((m) =>
              m.role === "user" ? (
                <div key={m.id} className="flex justify-end">
                  <div className="max-w-[85%] bg-[#20201E] text-white text-[13.5px] leading-relaxed rounded-2xl rounded-tr-md px-4 py-2.5 whitespace-pre-line">
                    {m.text}
                  </div>
                </div>
              ) : (
                <div key={m.id} className="flex justify-start">
                  <div className="max-w-[92%] space-y-2">
                    <div className="bg-white text-[#20201E] text-[13.5px] leading-relaxed rounded-2xl rounded-tl-md px-4 py-3 whitespace-pre-line shadow-sm border border-[#E5E1DB]">
                      {m.text}
                    </div>

                    {/* Product hits */}
                    {m.products && m.products.length > 0 && (
                      <div className="space-y-1.5">
                        {m.products.map((p) => (
                          <Link
                            key={p.slug}
                            href={`/product/${p.slug}`}
                            onClick={() => setOpen(false)}
                            className="flex items-center justify-between gap-2 bg-white border border-[#E5E1DB] rounded-xl px-3.5 py-2.5 hover:border-[#A88968] hover:shadow-sm transition group"
                          >
                            <div className="min-w-0">
                              <p className="text-[13px] font-medium text-[#20201E] truncate group-hover:text-[#A88968]">
                                {p.name}
                              </p>
                              <p className="text-[11px] text-[#817A71]">
                                {p.category} • {p.stock > 0 ? `Stok ${p.stock}` : "Stok habis"}
                              </p>
                            </div>
                            <p className="text-[12.5px] font-semibold text-[#A88968] whitespace-nowrap">
                              {formatIDR(p.price)}
                            </p>
                          </Link>
                        ))}
                      </div>
                    )}

                    {/* Links */}
                    {m.links && m.links.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {m.links.map((l) => (
                          <Link
                            key={l.href + l.label}
                            href={l.href}
                            onClick={() => setOpen(false)}
                            className="text-[12px] font-medium text-[#20201E] bg-[#EFE7D8] hover:bg-[#20201E] hover:text-white rounded-full px-3 py-1.5 transition"
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

          {/* Quick replies — palet brand */}
          <div className="shrink-0 px-3 pt-2 pb-1 bg-[#F7F5F0] border-t border-[#E5E1DB]">
            <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {quickReplies.map((qr) => (
                <button
                  key={qr}
                  onClick={() => send(qr)}
                  disabled={typing}
                  className="shrink-0 text-[12px] text-[#20201E] border border-[#E5E1DB] bg-white hover:bg-[#20201E] hover:text-white hover:border-[#20201E] rounded-full px-3.5 py-1.5 transition disabled:opacity-50 whitespace-nowrap"
                >
                  {qr}
                </button>
              ))}
            </div>
          </div>

          {/* Input — palet brand */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="shrink-0 p-3 bg-[#F7F5F0] flex items-center gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tanya tentang Efendy Furniture..."
              aria-label="Tanya tentang Efendy Furniture"
              className="flex-1 min-w-0 bg-white border border-[#E5E1DB] focus:border-[#A88968] rounded-full px-4 py-2.5 text-[13px] text-[#20201E] placeholder:text-[#817A71] focus:outline-none transition"
            />
            <button
              type="submit"
              disabled={!input.trim() || typing}
              aria-label="Kirim pesan"
              className="shrink-0 w-10 h-10 rounded-full bg-[#A88968] hover:bg-[#20201E] text-white flex items-center justify-center transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Send size={17} className="ml-0.5" />
            </button>
          </form>
        </div>
      )}

      {/* ── Floating button — palet brand ── */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Tutup Chair AI" : "Buka Chair AI"}
        aria-expanded={open}
        className="w-14 h-14 rounded-full bg-[#20201E] hover:bg-[#A88968] text-white shadow-[0_10px_30px_rgba(32,32,30,0.4)] flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
      >
        {open ? <X size={26} /> : <Armchair size={26} strokeWidth={1.8} />}
      </button>
    </div>
  );
}
