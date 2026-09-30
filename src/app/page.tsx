import Hero from "@/components/home/Hero";
import ShopByRoom from "@/components/home/ShopByRoom";
import NewArrivals from "@/components/home/NewArrivals";
import CollectionSpotlight from "@/components/home/CollectionSpotlight";
import ShopTheRoom from "@/components/home/ShopTheRoom";
import InspirationSection from "@/components/home/InspirationSection";
import HomeCta from "@/components/home/HomeCta";
import { PRODUCTS } from "@/data/products";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <ShopByRoom />
      <NewArrivals products={PRODUCTS} />
      <CollectionSpotlight />
      <ShopTheRoom />
      <InspirationSection />
      <HomeCta />
    </div>
  );
}
