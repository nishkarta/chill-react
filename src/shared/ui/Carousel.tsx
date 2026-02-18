import { useEffect, useMemo, useRef, useState } from "react";
import type { CarouselProps } from "./ui.types";
import Icon from "./Icon";
import useWindowSize from "@shared/hooks/useWindowSize";
import { HoverCardPortal } from "./HoverCardPortal";
import { cn } from "@shared/utils/cn";
import { cx } from "@shared/utils/cx";



export default function Carousel({ title, list, thumbnailType, className }: CarouselProps) {
  const scrollRef = useRef<HTMLUListElement | null>(null);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);

  const disableHoverRef = useRef(false);


  const { width } = useWindowSize()

  const hoveredItem = useMemo(
    () => (hoveredIndex == null ? null : list?.[hoveredIndex]),
    [hoveredIndex, list]
  );

  // --- anti-flicker state ---
  const isOverItemRef = useRef(false);
  const isOverCardRef = useRef(false);
  const openTimerRef = useRef<number | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  const clearOpenTimer = () => {
    if (openTimerRef.current) {
      window.clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
  };

  const scheduleOpen = (index: number, rect: DOMRect) => {
    clearOpenTimer();

    openTimerRef.current = window.setTimeout(() => {
      setHoveredIndex(index);
      setAnchorRect(rect);
    }, 250); // adjust delay (150–350ms feels good)
  };

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      if (!isOverItemRef.current && !isOverCardRef.current) {
        setHoveredIndex(null);
        setAnchorRect(null);
      }
    }, 120); // tweak 80–200ms
  };




  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;

    const scrollAmount = el.clientWidth * 0.8;

    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (hoveredIndex == null) return;

    const scroller = scrollRef.current;
    if (!scroller) return;

    const sync = () => {
      const el = scroller.querySelector(
        `[data-hover-idx="${hoveredIndex}"]`
      ) as HTMLElement | null;

      if (!el) {
        setHoveredIndex(null);
        setAnchorRect(null);
        return;
      }

      const itemRect = el.getBoundingClientRect();
      const scrollRect = scroller.getBoundingClientRect();

      // must be visible inside carousel viewport AND window viewport
      const visibleInCarousel =
        itemRect.right > scrollRect.left &&
        itemRect.left < scrollRect.right &&
        itemRect.bottom > scrollRect.top &&
        itemRect.top < scrollRect.bottom;

      const visibleInWindow =
        itemRect.right > 0 &&
        itemRect.left < window.innerWidth &&
        itemRect.bottom > 0 &&
        itemRect.top < window.innerHeight;

      if (!visibleInCarousel || !visibleInWindow) {
        setHoveredIndex(null);
        setAnchorRect(null);
        return;
      }

      setAnchorRect(itemRect);
    };

    // run once immediately
    sync();

    // update while scrolling horizontally (carousel) and vertically (page)
    scroller.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);

    return () => {
      scroller.removeEventListener("scroll", sync);
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [hoveredIndex]);




  return (
    <section
      aria-roledescription="carousel"
      aria-label={title}
      className={cn("flex flex-col *:px-5.5 md:*:px-10 lg:*:px-20", className)}
    >
      {!!title && (
        <h3 className="text-white text-20px text-left font-bold mb-5 md:text-[24px] lg:text-[32px] lg:mb-8">
          {title}
        </h3>
      )}

      <div className="relative">
        {
          width > 1024
          &&
          <div
            className="pointer-events-none absolute h-full left-14 top-1/2 -translate-y-1/2 z-20 flex items-center"
            onMouseEnter={() => {
              disableHoverRef.current = true;
              setHoveredIndex(null);
              setAnchorRect(null);
            }}
            onMouseLeave={() => {
              disableHoverRef.current = false;
            }}
          >
            <button
              onClick={() => scroll("left")}
              className="pointer-events-auto w-10 h-10 flex items-center justify-center text-white rounded-full bg-body border border-outline"
            >
              <Icon icon="arrow-left" size={24} />
            </button>
          </div>
        }


        <ul
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth hide-scrollbar"
        >

          {list?.map((each, i) => (
            <li
              key={i}
              data-hover-idx={i}
              className={cx(
                thumbnailType === "horizontal"
                  ?
                  "w-[309px] h-[151px] md:w-34 md:h-51 lg:w-[302px] lg:h-[162px] "
                  : "w-23.75 h-36.25 md:w-34 md:h-51 lg:w-58.5 lg:h-91.25",
                "relative group shrink-0  bg-cover bg-center  rounded-sm lg:rounded-md  "
              )}
              style={{ backgroundImage: `url(${each?.thumbnail})` }}
              onMouseEnter={(e) => {
                if (disableHoverRef.current) return;

                clearCloseTimer();
                isOverItemRef.current = true;

                const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                scheduleOpen(i, rect); // your delayed open
              }}
              onMouseLeave={() => {
                isOverItemRef.current = false;
                scheduleClose();
              }}
            >


              {each?.isNewEpisode && (
                <span className="
                absolute top-2 left-2
                text-white text-[5.7px] font-bold
                px-2.5 py-1
                bg-primary-300 rounded-full
                md:text-[10px]
                lg:text-[14px]
                lg:top-4
                lg:left-4
              ">
                  Episode Baru
                </span>
              )}
              {each?.isTop10 && (
                <div className="
                p-[1.91px]
                absolute top-0 right-2
                flex flex-col
                text-white text-[8px] font-bold
                bg-[#B71F1D] 
                md:text-[10px]
                lg:p-1
                lg:text-[14px]
                lg:right-4
              ">
                  <span>Top</span>
                  <span>10</span>
                </div>
              )}
              {
                each?.showTitle
                &&
                <div className="absolute left-0 bottom-0 p-4 pb-2 w-full flex gap-2 text-white ">
                  <h5 className="grow text-left text-[14px] font-bold lg:text-[18px]">{each?.title}</h5>
                  <div className="flex gap-1 items-center">
                    <Icon icon="star" className="w-3 lg:w-4" />
                    <span className="text-12px lg:text-14px">{each?.rating}/5</span>
                  </div>
                </div>
              }
            </li>
          ))}
        </ul>
        {
          width > 1024
          &&
          <div
            className="pointer-events-none absolute h-full right-14 top-1/2 -translate-y-1/2 z-20 flex items-center"
            onMouseEnter={() => {
              disableHoverRef.current = true;
              setHoveredIndex(null);
              setAnchorRect(null);
            }}
            onMouseLeave={() => {
              disableHoverRef.current = false;
            }}
          >
            <button
              onClick={() => scroll("right")}
              className="pointer-events-auto w-10 h-10 flex items-center justify-center text-white rounded-full  bg-body border border-outline"
            >
              <Icon icon="arrow-right" size={24} />
            </button>
          </div>
        }
      </div>
      <HoverCardPortal
        open={hoveredIndex != null}
        anchorRect={anchorRect}
        width={width >= 1024 ? 408 : 320}
        height={460}
        offsetY={0} // set >0 if you want to shift down
      >
        {hoveredItem && (
          <div
            className="rounded-xl bg-header h-[460px] shadow-2xl overflow-hidden"
            onMouseEnter={() => {
              clearCloseTimer();
              isOverCardRef.current = true;
            }}
            onMouseLeave={() => {
              isOverCardRef.current = false;
              scheduleClose();
            }}
          >
            <div
              className="h-[255px] bg-cover bg-center"
              style={{ backgroundImage: `url(${hoveredItem.thumbnail})` }}
            />
            <div className="flex flex-col gap-4 text-white p-[30px]">

              <div className="flex items-center gap-4">
                <Icon icon="play-button" size={55} />
                <button className="w-[54px] h-[54px] border-[1.21px] border-light-disabled rounded-[50%]">
                  <Icon size={30} icon="checklist" />
                </button>
                <span className="grow" />
                <button className="w-[54px] h-[54px] border-[1.21px] border-light-disabled rounded-[50%]">
                  <Icon size={30} icon="chevron-down" />
                </button>
              </div>

              <div className="flex items-center gap-5">
                <span className="inline-block bg-[#CDF1FF4D] py-1 px-3 rounded-[29px] text-[19px] text-light-secondary font-bold">13+</span>
                <p className="text-[20px] font-bold">16 Episode</p>
              </div>
              <p className="flex items-center gap-2 justify-between text-[18px] text-light-secondary font-bold">
                <span>Misteri</span>
                <span>•</span>
                <span>Kriminal</span>
                <span>•</span>
                <span>Fantasi</span>
              </p>
            </div>
          </div>
        )}
      </HoverCardPortal>
    </section>
  );
}
