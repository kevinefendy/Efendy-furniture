"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { TreePine, Layers, ShieldCheck, Sparkles, ArrowRight, Check } from "lucide-react";

interface Material {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  icon: typeof TreePine;
  image: string;
  provenance: string;
  treatment: string;
  durability: string;
  description: string;
  highlights: string[];
}

const MATERIALS: Material[] = [
  {
    id: "teak",
    name: "Grade-A Solid Teak",
    subtitle: "Naturally Seasoned Hardwood",
    category: "Timber & Joinery",
    icon: TreePine,
    image: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1200&q=85",
    provenance: "FSC-certified concessions, Jepara & Blora",
    treatment: "Hand-rubbed organic teak oil with matte sheen",
    durability: "Rated for 30+ years with seasonal care",
    description:
      "Drawn from slow-grown Indonesian teak trees, each plank is kiln-dried and seasoned naturally. Rich in natural silica and protective resins, it exhibits radiant amber grain lines that deepen in warmth with every passing year.",
    highlights: [
      "Naturally moisture and termite resistant",
      "Traditional mortise-and-tenon interlocking joints",
      "Zero toxic sealants or artificial stains",
    ],
  },
  {
    id: "boucle",
    name: "Architectural Bouclé",
    subtitle: "Heavyweight Tactile Weave",
    category: "Textiles & Upholstery",
    icon: Layers,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=85",
    provenance: "Curated European textile partner mills",
    treatment: "Eco-shield stain repellent nano-finish",
    durability: "Tested beyond 55,000 Martindale cycles",
    description:
      "A tactile masterpiece made from textured looped yarns that create a soft, cloud-like dimensional surface. Exceptionally durable yet invitingly warm to the touch, balancing modern minimalism with sensory comfort.",
    highlights: [
      "Ultra-soft looped yarn with high dimensional loft",
      "Breathable, pill-resistant construction",
      "Oeko-Tex Standard 100 certified non-toxic",
    ],
  },
  {
    id: "leather",
    name: "Full-Grain Saddle Leather",
    subtitle: "Vegetable-Tanned Heritage Hides",
    category: "Leather & Accents",
    icon: ShieldCheck,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85",
    provenance: "Artisanal tanneries with natural bark extracts",
    treatment: "Pure aniline dyed with natural beeswax finish",
    durability: "Develops rich personalized patina over decades",
    description:
      "We select only uncorrected top hides that preserve natural grain textures, subtle growth marks, and gentle variations. Instead of synthetic coatings, the leather breathes and softens, growing more magnificent as it ages alongside you.",
    highlights: [
      "100% full-grain uncorrected hide",
      "Natural vegetable tannins without harsh chrome",
      "Supple hand-feel that patinas beautifully",
    ],
  },
  {
    id: "brass-stone",
    name: "Honed Travertine & Brass",
    subtitle: "Raw Earth & Architectural Alloy",
    category: "Stone & Metalwork",
    icon: Sparkles,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
    provenance: "Natural Mediterranean stone & cast solid brass",
    treatment: "Hand-honed matte seal & satin brush pass",
    durability: "Solid monolithic structure built for permanence",
    description:
      "Warm porous travertine paired with brushed champagne brass components. Every slab carries distinctive geological banding formed over millennia, providing grounding architectural weight to contemporary living rooms.",
    highlights: [
      "Monolithic honed slab with natural porous pockets",
      "Solid brass accents that resist oxidation",
      "Grounding architectural silhouette",
    ],
  },
];

export default function MaterialShowcase() {
  const [activeMaterial, setActiveMaterial] = useState<Material>(MATERIALS[0]);

  return (
    <section className="py-24 bg-[#F7F5F0] border-t border-[#E5E1DB] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#A88968]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#817A71] font-semibold">
                Sensory Craftsmanship
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#20201E] tracking-tight">
              Materials Built to Age with Grace
            </h2>
          </div>
          <p className="mt-3 md:mt-0 text-sm text-[#817A71] max-w-md">
            We believe honest furniture starts with genuine raw materials. Explore our signature
            hardwoods, tactile textiles, and architectural finishes.
          </p>
        </div>

        {/* Material Selection Tabs */}
        <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-4 mb-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {MATERIALS.map((mat) => {
            const Icon = mat.icon;
            const isSelected = mat.id === activeMaterial.id;
            return (
              <button
                key={mat.id}
                onClick={() => setActiveMaterial(mat)}
                className={`shrink-0 flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                  isSelected
                    ? "bg-[#20201E] text-white border-[#20201E] shadow-sm"
                    : "bg-white text-[#20201E] border-[#E5E1DB] hover:border-[#A88968]"
                }`}
              >
                <Icon
                  size={16}
                  className={isSelected ? "text-[#A88968]" : "text-[#817A71]"}
                />
                <span>{mat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Detailed Showcase Grid */}
        <div className="bg-white border border-[#E5E1DB] rounded-2xl p-6 sm:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-200 shadow-inner">
              <Image
                src={activeMaterial.image}
                alt={activeMaterial.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center transition-all duration-700 hover:scale-105"
              />
            </div>
            <div className="absolute top-4 left-4 bg-[#20201E]/90 backdrop-blur-md text-white px-3.5 py-1.5 rounded-full text-xs font-medium flex items-center gap-2">
              <activeMaterial.icon size={13} className="text-[#A88968]" />
              <span>{activeMaterial.category}</span>
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#A88968] font-semibold block mb-1">
                {activeMaterial.subtitle}
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#20201E] tracking-tight">
                {activeMaterial.name}
              </h3>
              <p className="mt-3 text-sm text-[#817A71] leading-relaxed">
                {activeMaterial.description}
              </p>
            </div>

            {/* Specs Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="bg-[#F7F5F0] p-3.5 rounded-lg border border-[#E5E1DB]/70">
                <span className="text-[11px] uppercase tracking-wider text-[#817A71] font-semibold block mb-0.5">
                  Provenance
                </span>
                <span className="text-xs font-medium text-[#20201E]">
                  {activeMaterial.provenance}
                </span>
              </div>
              <div className="bg-[#F7F5F0] p-3.5 rounded-lg border border-[#E5E1DB]/70">
                <span className="text-[11px] uppercase tracking-wider text-[#817A71] font-semibold block mb-0.5">
                  Longevity
                </span>
                <span className="text-xs font-medium text-[#20201E]">
                  {activeMaterial.durability}
                </span>
              </div>
            </div>

            {/* Highlights List */}
            <ul className="space-y-2 pt-1 border-t border-[#E5E1DB]">
              {activeMaterial.highlights.map((point) => (
                <li key={point} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#20201E]">
                  <div className="w-4 h-4 rounded-full bg-[#A88968]/15 text-[#A88968] flex items-center justify-center shrink-0">
                    <Check size={11} strokeWidth={2.5} />
                  </div>
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#20201E] hover:bg-[#A88968] text-white text-xs font-semibold uppercase tracking-widest rounded-lg transition-colors group shadow-sm"
              >
                Explore {activeMaterial.name} Pieces
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
