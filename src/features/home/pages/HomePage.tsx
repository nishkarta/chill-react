import Footer from "@shared/layout/Footer";
import Header from "@shared/layout/Header";
import HeroSection from "./sections/HeroSection";
import Carousel from "@shared/ui/Carousel";
import { continueWatchingList, newReleaseList, topRatedList, trendingList } from "@features/home/home.dummies";

export default function HomePage() {

  return (
    <div className="home-page bg-header">
      <Header />
      <main>
        <HeroSection />
        <Carousel
          title="Melanjutkan Nonton Fillm"
          list={continueWatchingList}
          className="mb-5 lg:mb-0 lg:py-10"
          thumbnailType="horizontal"
        />
        <Carousel
          title="Top Rating Film & Series Hari Ini"
          list={topRatedList}
          className="mb-5 lg:mb-0 lg:py-10"
        />
        <Carousel
          title="Film Trending"
          list={trendingList}
          className="mb-5 lg:mb-0 lg:py-10"
        />
        <Carousel
          title="Rilis Baru"
          list={newReleaseList}
          className="mb-5 lg:mb-0 lg:py-10"
        />
      </main>
      <Footer />
    </div>
  )
}