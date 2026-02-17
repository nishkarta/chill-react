import { useEffect, useMemo, useRef, useState } from "react";
import type { CarouselProps } from "./ui.types";
import Icon from "./Icon";
import useWindowSize from "@shared/hooks/useWindowSize";
import { cn } from "@shared/utils/cn";
import { HoverCardPortal } from "./HoverCardPortal";

export default function Carousel({ title, list, className }: CarouselProps) {
  const scrollRef = useRef<HTMLUListElement | null>(null);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);


  const { width } = useWindowSize()

  const hoveredItem = useMemo(
    () => (hoveredIndex == null ? null : list?.[hoveredIndex]),
    [hoveredIndex, list]
  );

  // --- anti-flicker state ---
  const isOverItemRef = useRef(false);
  const isOverCardRef = useRef(false);
  const closeTimerRef = useRef<number | null>(null);

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

  const updateRectByIndex = (idx: number) => {
    const el = scrollRef.current?.querySelector(
      `[data-hover-idx="${idx}"]`
    ) as HTMLElement | null;
    if (el) setAnchorRect(el.getBoundingClientRect());
  };

  // Keep portal aligned during scroll/resize while open
  useEffect(() => {
    if (hoveredIndex == null) return;

    const scroller = scrollRef.current;
    if (!scroller) return;

    const onScroll = () => updateRectByIndex(hoveredIndex);
    const onResize = () => updateRectByIndex(hoveredIndex);

    scroller.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      scroller.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [hoveredIndex]);


  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;

    const scrollAmount = el.clientWidth * 0.8;

    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

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
          <div className="pointer-events-none absolute h-full left-14 top-1/2 -translate-y-1/2 z-20 flex items-center">
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
          className="flex gap-4 overflow-x-auto overflow-y-visible scroll-smooth hide-scrollbar"
        >

          {list?.map((each, i) => (
            <li
              key={i}
              data-hover-idx={i}
              className="
              relative group w-23.75 h-36.25 shrink-0
              bg-cover bg-center
              rounded-sm
              lg:rounded-xl
              md:w-34 md:h-51
              lg:w-58.5 lg:h-91.25
            "
              style={{ backgroundImage: `url(${each?.thumbnail})` }}
              onMouseEnter={(e) => {
                clearCloseTimer();
                isOverItemRef.current = true;
                setHoveredIndex(i);
                setAnchorRect(
                  (e.currentTarget as HTMLElement).getBoundingClientRect()
                );
              }}
              onMouseLeave={() => {
                isOverItemRef.current = false;
                scheduleClose();
              }}
            >


              {each?.isNewEpisode && (
                <span className="
                absolute top-2 left-2
                text-white text-[8px] font-bold
                px-2 py-1
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
                absolute top-0 right-2
                flex flex-col
                text-white text-[8px] font-bold
                px-2 py-1
                bg-primary-300 
                md:text-[10px]
                lg:text-[14px]
                lg:right-4
              ">
                  <span>Top</span>
                  <span>10</span>
                </div>
              )}
            </li>
          ))}
        </ul>
        {
          width > 1024
          &&
          <div className="pointer-events-none absolute h-full right-14 top-1/2 -translate-y-1/2 z-20 flex items-center">
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
            <div className="text-light-primary">

          test
            </div>
          </div>
        )}
      </HoverCardPortal>
    </section>
  );
}
