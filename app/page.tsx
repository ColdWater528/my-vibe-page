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
        <MusicCard />
        <FootprintMap />
        <PhotoGallery />
      </div>
      <LiveLocation />
      <footer className="text-center mt-24 px-6">
        <p className="text-xs text-[#86868b]">
          Made with vibe · {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
