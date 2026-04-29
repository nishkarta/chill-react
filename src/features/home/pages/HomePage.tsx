import { continueWatchingList, topRatedList, trendingList } from "@features/home/home.dummies";
import { fetchMovies } from "@features/home/homeThunk";
import { useAppDispatch, useAppSelector } from "@shared/hooks/redux";
import Footer from "@shared/layout/Footer";
import Header from "@shared/layout/Header";
import Carousel from "@shared/ui/Carousel";
import { useEffect } from "react";
import HeroSection from "./sections/HeroSection";

export default function HomePage() {
  const dispatch = useAppDispatch()
  const { list, loading } = useAppSelector(
    (state) => state.home
  )

  console.log(loading)


  useEffect(() => {
    dispatch(fetchMovies())
  }, [dispatch])

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
          isLoading={loading}
        />
      </main>
      <Footer />
    </div>
  )
}