export default function AnnouncementBar() {
  return (
    <div className="bg-[#20201E] text-[#F7F5F0] text-xs py-2 px-4 text-center font-sans tracking-wider uppercase flex items-center justify-center gap-3">
      <span>Complimentary white-glove delivery on orders over Rp 10.000.000</span>
      <span className="hidden md:inline text-[#A88968]">•</span>
      <span className="hidden md:inline text-stone-300">Discover The Nara Collection</span>
    </div>
  );
}
