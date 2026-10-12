import { Star, Quote, BadgeCheck } from "lucide-react";

interface Review {
  id: string;
  author: string;
  role: string;
  location: string;
  rating: number;
  title: string;
  comment: string;
  product: string;
}

const REVIEWS: Review[] = [
  {
    id: "1",
    author: "Arif Wicaksono",
    role: "Architect & Interior Designer",
    location: "Kebayoran Baru, Jakarta",
    rating: 5,
    title: "Proportions that respect architectural space",
    comment:
      "We specified the Nara Teak Credenza for a private residence project. The joinery tolerances and matte oil treatment rival the best Scandinavian imports we usually bring in.",
    product: "Nara Low Credenza",
  },
  {
    id: "2",
    author: "Elena Widjaja",
    role: "Verified Collector",
    location: "Menteng, Jakarta Pusat",
    rating: 5,
    title: "The tactile bouclé feels truly cloud-like",
    comment:
      "The Kumo 3-Seater Sofa exceeded expectations. The boucle weave has magnificent textural depth, and the white-glove setup team was punctual and extremely courteous.",
    product: "Kumo Bouclé 3-Seater Sofa",
  },
  {
    id: "3",
    author: "Dion Prasetya",
    role: "Studio Principal, Atelier D",
    location: "Canggu, Bali",
    rating: 5,
    title: "Heirloom craftsmanship that ages gracefully",
    comment:
      "Having inspected dozens of furniture manufacturers across Java, Efendy's adherence to natural kiln drying and hand-rubbed timber finishes sets an authentic benchmark.",
    product: "Sora Solid Teak Dining Table",
  },
];

const PRESS_LOGOS = [
  { name: "ARCHITECTURAL DIGEST", label: "Selected Design Excellence 2026" },
  { name: "ELLE DECORATION", label: "The Warm Minimalist Standard" },
  { name: "LIVINGETC INDONESIA", label: "Best Sustainable Hardwood Label" },
  { name: "DESIGN ANTHOLOGY", label: "Contemporary Asian Heritage" },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-white border-t border-[#E5E1DB] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#A88968]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#817A71] font-semibold">
              Client & Press Acclaim
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#20201E] tracking-tight">
            Loved by Designers & Homes
          </h2>
          <p className="mt-3 text-sm text-[#817A71]">
            Read reflections from architects, collectors, and homeowners living with Efendy pieces every day.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-[#F7F5F0] border border-[#E5E1DB] rounded-2xl p-7 flex flex-col justify-between hover:shadow-md transition-shadow relative"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  {/* 5 Lucide Star Icons - Zero emojis */}
                  <div className="flex items-center gap-1" aria-label={`Rating: ${review.rating} of 5 stars`}>
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={15}
                        className="fill-[#A88968] text-[#A88968]"
                      />
                    ))}
                  </div>
                  <Quote size={24} className="text-[#A88968]/30" />
                </div>

                <h3 className="font-serif text-lg font-medium text-[#20201E] mb-2 leading-snug">
                  &ldquo;{review.title}&rdquo;
                </h3>
                <p className="text-xs sm:text-sm text-[#817A71] leading-relaxed mb-6 font-light">
                  {review.comment}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E5E1DB]">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-semibold text-[#20201E]">{review.author}</p>
                      <BadgeCheck size={14} className="text-[#A88968]" />
                    </div>
                    <p className="text-[11px] text-[#817A71]">{review.role} • {review.location}</p>
                  </div>
                </div>
                <div className="mt-2 inline-block bg-white border border-[#E5E1DB] px-2.5 py-1 rounded-md text-[10px] font-medium text-[#20201E]">
                  Purchased: {review.product}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Press Strip */}
        <div className="pt-10 border-t border-[#E5E1DB]">
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#817A71] text-center font-semibold mb-8">
            As Featured In
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {PRESS_LOGOS.map((press) => (
              <div key={press.name} className="space-y-1">
                <p className="font-serif text-sm sm:text-base font-semibold tracking-wider text-[#20201E]">
                  {press.name}
                </p>
                <p className="text-[11px] text-[#817A71] font-light">
                  {press.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
