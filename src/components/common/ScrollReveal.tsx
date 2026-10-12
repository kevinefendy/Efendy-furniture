"use client";

import { useEffect, useRef } from "react";

// Scroll reveal: fade + 16px slide up, 600ms. Hormat prefers-reduced-motion via CSS.
// Alasan: animasi halus ala retail (Informa/Dekoruma), tanpa parallax/WebGL.
export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
  // Props lama (kompatibilitas): direction diabaikan — reveal selalu fade + 16px slide up.
  // delayMs adalah alias delay.
  direction,
  delayMs,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "article";
  direction?: string;
  delayMs?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("is-visible");
            io.disconnect();
          }
        });
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Merged = Tag as "div";
  const effectiveDelay = delayMs ?? delay;

  return (
    <Merged
      ref={ref}
      className={`reveal ${className}`}
      style={effectiveDelay ? { animationDelay: `${effectiveDelay}ms` } : undefined}
    >
      {children}
    </Merged>
  );
}
