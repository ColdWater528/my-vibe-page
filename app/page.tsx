import Hero from "@/components/Hero";
import SocialCards from "@/components/SocialCards";
import MusicCard from "@/components/MusicCard";
import InterestTags from "@/components/InterestTags";
import FootprintMap from "@/components/FootprintMap";
import PhotoGallery from "@/components/PhotoGallery";
import LiveLocation from "@/components/LiveLocation";
import StaggeredMenu from "@/components/StaggeredMenu";

export default function Home() {
  return (
    <div className="pb-32">
      <StaggeredMenu />
      <Hero />
      <div className="space-y-0">
        <div id="socials"><SocialCards /></div>
        <div id="interests"><InterestTags /></div>

        {/* Music + Footprint side by side */}
        <div id="music-footprint">
          <section className="px-6 max-w-4xl mx-auto mt-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div id="music"><MusicCard embedded /></div>
              <div id="footprint"><FootprintMap embedded /></div>
            </div>
          </section>
        </div>

        <div id="gallery"><PhotoGallery /></div>
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
