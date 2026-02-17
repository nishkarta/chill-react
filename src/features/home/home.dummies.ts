import images from "@assets/images";
import { makeRandomString } from "@shared/helpers/makeRandomString";
import type { CarouselItem } from "@shared/ui/ui.types";

const topRatedList: CarouselItem[] = [
  {
    title: `Movie ${makeRandomString(5)}`,
    thumbnail: images.P_1,
    isNewEpisode: true,
  },
  {
    title: `Movie ${makeRandomString(5)}`,
    thumbnail: images.P_2,
    isTop10: true,
  },
  {
    title: `Movie ${makeRandomString(5)}`,
    thumbnail: images.P_3
  },
  {
    title: `Movie ${makeRandomString(5)}`,
    thumbnail: images.P_4,
    isNewEpisode: true,
  },
  {
    title: `Movie ${makeRandomString(5)}`,
    thumbnail: images.P_5
  },
  {
    title: `Movie ${makeRandomString(5)}`,
    thumbnail: images.P_6
  },
  {
    title: `Movie ${makeRandomString(5)}`,
    thumbnail: images.P_7
  },
  {
    title: `Movie ${makeRandomString(5)}`,
    thumbnail: images.P_8
  },
  {
    title: `Movie ${makeRandomString(5)}`,
    thumbnail: images.P_9
  },
  {
    title: `Movie ${makeRandomString(5)}`,
    thumbnail: images.P_10
  },
]

const trendingList: CarouselItem[] = [
  {
    title: `Movie ${makeRandomString(5)}`,
    thumbnail: images.P_11,
    isTop10: true,
  },
  {
    title: `Movie ${makeRandomString(5)}`,
    thumbnail: images.P_12,
    isTop10: true,
  },
  {
    title: `Movie ${makeRandomString(5)}`,
    thumbnail: images.P_13,
    isTop10: true,
  },
  {
    title: `Movie ${makeRandomString(5)}`,
    thumbnail: images.P_14,
    isNewEpisode: true,
    isTop10: true,
  },
  {
    title: `Movie ${makeRandomString(5)}`,
    thumbnail: images.P_15,
    isTop10: true,
  },
  {
    title: `Movie ${makeRandomString(5)}`,
    thumbnail: images.P_16,
    isTop10: true,
  },
  {
    title: `Movie ${makeRandomString(5)}`,
    thumbnail: images.P_17,
    isTop10: true,
  },
  {
    title: `Movie ${makeRandomString(5)}`,
    thumbnail: images.P_18,
    isTop10: true,
  },
  {
    title: `Movie ${makeRandomString(5)}`,
    thumbnail: images.P_19,
    isTop10: true,
  },
  {
    title: `Movie ${makeRandomString(5)}`,
    thumbnail: images.P_20,
    isTop10: true,
  },
]

const newReleaseList: CarouselItem[] = [
  {
    title: `Movie ${makeRandomString(5)}`,
    thumbnail: images.P_1,
    isNewEpisode: true,
  },
  {
    title: `Movie ${makeRandomString(5)}`,
    thumbnail: images.P_2,
    isTop10: true,
  },
  {
    title: `Movie ${makeRandomString(5)}`,
    thumbnail: images.P_3
  },
  {
    title: `Movie ${makeRandomString(5)}`,
    thumbnail: images.P_4,
    isNewEpisode: true,
  },
  {
    title: `Movie ${makeRandomString(5)}`,
    thumbnail: images.P_5
  },
  {
    title: `Movie ${makeRandomString(5)}`,
    thumbnail: images.P_6
  },
  {
    title: `Movie ${makeRandomString(5)}`,
    thumbnail: images.P_7
  },
  {
    title: `Movie ${makeRandomString(5)}`,
    thumbnail: images.P_8
  },
  {
    title: `Movie ${makeRandomString(5)}`,
    thumbnail: images.P_9
  },
  {
    title: `Movie ${makeRandomString(5)}`,
    thumbnail: images.P_10
  },
]

export { topRatedList, trendingList, newReleaseList }