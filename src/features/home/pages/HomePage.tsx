import { continueWatchingList, topRatedList, trendingList } from "@features/home/home.dummies";
import Footer from "@shared/layout/Footer";
import Header from "@shared/layout/Header";
import { getNewReleaseList } from "@shared/services/newRelease.service";
import Carousel from "@shared/ui/Carousel";
import type { CarouselItem } from "@shared/ui/ui.types";
import { useEffect, useState } from "react";
import HeroSection from "./sections/HeroSection";

export default function HomePage() {
  const [list, setList] = useState<CarouselItem[]>([])



  useEffect(() => {
    const fetchList = async () => {
      try {
        const data = await getNewReleaseList();
        setList(data);
      } catch (err) {
        console.error("FETCH ERROR:", err);
      }
    };
    fetchList()
  }, [])

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
          list={list}
          className="mb-5 lg:mb-0 lg:py-10"
        />
      </main>
      <Footer />
    </div>
  )
}