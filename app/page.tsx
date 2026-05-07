import Hero from "@/components/Hero";
import SocialCards from "@/components/SocialCards";
import MusicCard from "@/components/MusicCard";
import InterestTags from "@/components/InterestTags";
import FootprintMap from "@/components/FootprintMap";
import PhotoGallery from "@/components/PhotoGallery";
import LiveLocation from "@/components/LiveLocation";

export default function Home() {
  return (
    <div className="pb-32">
      <Hero />
      <div className="space-y-0">
        <SocialCards />
        <InterestTags />

        {/* Music + Footprint side by side */}
        <section className="px-6 max-w-4xl mx-auto mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <MusicCard embedded />
            <FootprintMap embedded />
          </div>
        </section>

        <PhotoGallery />
      </div>
      <LiveLocation />
      <footer className="text-center mt-24 px-6">
        <p className="text-xs text-[#6e6e73]">
          Made with vibe · {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
