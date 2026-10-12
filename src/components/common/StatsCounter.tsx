"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { useCompany } from "@/context/CompanyContext";
import { Award, PackageCheck, HeartHandshake, ShieldCheck, Hammer, LucideIcon } from "lucide-react";

interface CounterItem {
  icon: LucideIcon;
  endValue: number;
  decimals?: number;
  suffixId: string;
  suffixEn: string;
  labelId: string;
  labelEn: string;
}

export default function StatsCounter() {
  const { lang } = useCompany();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0, 0]);

  const items: CounterItem[] = useMemo(
    () => [
      {
        icon: PackageCheck,
        endValue: 15400,
        suffixId: "+",
        suffixEn: "+",
        labelId: "Furnitur Terkirim",
        labelEn: "Pieces Delivered",
      },
      {
        icon: Award,
        endValue: 28,
        suffixId: "+ Thn",
        suffixEn: "+ Yrs",
        labelId: "Pengalaman Bengkel",
        labelEn: "Years of Legacy",
      },
      {
        icon: HeartHandshake,
        endValue: 99.4,
        decimals: 1,
        suffixId: "%",
        suffixEn: "%",
        labelId: "Kepuasan Pelanggan",
        labelEn: "Client Satisfaction",
      },
      {
        icon: ShieldCheck,
        endValue: 10,
        suffixId: " Thn",
        suffixEn: " Yrs",
        labelId: "Garansi Rangka",
        labelEn: "Frame Warranty",
      },
      {
        icon: Hammer,
        endValue: 52,
        suffixId: "+",
        suffixEn: "+",
        labelId: "Pengrajin Ahli",
        labelEn: "Master Artisans",
      },
    ],
    []
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const duration = 1800;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);

            const nextCounts = items.map((item) => {
              const currentVal = easeProgress * item.endValue;
              return item.decimals ? Math.round(currentVal * 10) / 10 : Math.floor(currentVal);
            });

            setCounts(nextCounts);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCounts(items.map((i) => i.endValue));
            }
          };

          requestAnimationFrame(animate);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    const currentEl = containerRef.current;
    if (currentEl) observer.observe(currentEl);

    return () => {
      if (currentEl) observer.unobserve(currentEl);
    };
  }, [hasAnimated, items]);

  return (
    <section
      ref={containerRef}
      className="py-14 sm:py-16 bg-[#FAFAFA] dark:bg-[#151513] border-b border-[#EEEEEC] dark:border-[#2A2A26] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[#EEEEEC] dark:divide-[#2A2A26]">
          {items.map((item, index) => {
            const val = counts[index];
            const formattedVal = item.decimals
              ? val.toFixed(1)
              : lang === "id"
              ? val.toLocaleString("id-ID")
              : val.toLocaleString("en-US");
            const suffix = lang === "id" ? item.suffixId : item.suffixEn;

            return (
              <div
                key={index}
                className={`pt-4 sm:pt-0 ${index !== 0 ? "sm:pl-6 lg:pl-8" : ""} space-y-1`}
              >
                <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#20201E] dark:text-[#F7F5F0] tracking-tight">
                  <span>{formattedVal}</span>
                  <span className="text-[#A88968] text-2xl sm:text-3xl font-light ml-0.5">
                    {suffix}
                  </span>
                </div>
                <p className="text-xs uppercase tracking-widest text-[#817A71] dark:text-[#A19A8F] font-semibold font-sans">
                  {lang === "id" ? item.labelId : item.labelEn}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
