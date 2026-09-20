import Banner from "@/component/Banner";
import FeaturedProducts from "@/components/featured-products";
import FlashSaleSection from "@/components/featured-products/FlashSaleSection";
import NewArrivalsSection from "@/components/featured-products/NewArrivalsSection";


export default function Home() {
  return (
     <main className="min-h-screen bg-background">
      {/* 1. Main Featured Products (Recommended bad diye shudhu Featured) */}
      <Banner />
      <FeaturedProducts
        badge="HANDPICKED"
        title="Featured products"
        subtitle="Curated highlights from our most trusted suppliers this week."
        browseMoreText="View all"
        browseMoreHref="/products"
        showBottomBanner={false}
      />
      <FlashSaleSection />
     
      {/* 2. Electronics Category */}
      <FeaturedProducts
        badge="ELECTRONICS"
        title="Top Gadgets & Wearables"
        subtitle="Best electronic accessories from certified vendors."
        browseMoreText="View All Gadgets"
        browseMoreHref="/products?category=electronics"
        showBottomBanner={false}
      />
      {/* 3. Cosmetics Category */}
      <FeaturedProducts
        badge="BEAUTY & CARE"
        title="Trending Cosmetics"
        subtitle="Popular skincare and makeup essentials this season."
        browseMoreText="See Cosmetics"
        browseMoreHref="/products?category=cosmetics"
        showBottomBanner={true}
      />
      <NewArrivalsSection/>
    </main>
  );
}
