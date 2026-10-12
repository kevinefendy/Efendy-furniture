"use client";

import React, { useEffect, useState } from "react";

/**
 * EditorialCursor
 * 
 * ALASAN DESAIN:
 * Bukan ring besar bercahaya atau efek invert neon. Hanya dot kecil 6px berwarna coklat tua
 * yang mengikuti kursor secara halus di perangkat desktop untuk memberi kesan taktil tanpa mengganggu pembacaan.
 */
export default function EditorialCursor() {
  const [position, setPosition] = useState({ x: -20, y: -20 });
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }
    setIsTouch(false);

    let mouseX = -20;
    let mouseY = -20;
    let currentX = -20;
    let currentY = -20;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    let frameId: number;
    const loop = () => {
      currentX += (mouseX - currentX) * 0.2;
      currentY += (mouseY - currentY) * 0.2;
      setPosition({ x: currentX, y: currentY });
      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(frameId);
    };
  }, [isVisible]);

  if (isTouch || !isVisible) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[9998] w-2 h-2 rounded-full bg-[#2B2118] -translate-x-1/2 -translate-y-1/2 mix-blend-multiply opacity-75 select-none transition-opacity duration-300"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
      }}
    />
  );
}
