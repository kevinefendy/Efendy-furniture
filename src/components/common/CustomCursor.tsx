"use client";

import React, { useEffect, useState } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [ringPos, setRingPos] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }
    setIsTouch(false);

    let mouseX = -100;
    let mouseY = -100;
    let currentRingX = -100;
    let currentRingY = -100;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setPos({ x: mouseX, y: mouseY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest("a, button, input, textarea, select, [data-interactive='true'], .cursor-pointer");
        setIsPointer(!!interactive);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    let animationFrameId: number;
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const loop = () => {
      currentRingX = lerp(currentRingX, mouseX, 0.18);
      currentRingY = lerp(currentRingY, mouseY, 0.18);
      setRingPos({ x: currentRingX, y: currentRingY });
      animationFrameId = requestAnimationFrame(loop);
    };
    animationFrameId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  if (isTouch || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
      {/* Outer trailing ring */}
      <div
        className={`fixed top-0 left-0 rounded-full border transition-[width,height,transform] duration-200 ease-out flex items-center justify-center -translate-x-1/2 -translate-y-1/2 border-[#20201E]/40 dark:border-white/40 ${
          isPointer
            ? "w-10 h-10 bg-[#20201E]/5 dark:bg-white/10 scale-125"
            : "w-7 h-7 bg-transparent"
        }`}
        style={{
          transform: `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`,
        }}
      />

      {/* Center pinpoint dot */}
      <div
        className="fixed top-0 left-0 rounded-full bg-[#20201E] dark:bg-white transition-transform duration-75 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`,
        }}
      />
    </div>
  );
}
