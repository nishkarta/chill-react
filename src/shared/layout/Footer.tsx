import images from "@assets/images"
import type { FooterNavProps } from "./layout.types"
import Icon from "@shared/ui/Icon"
import { useState } from "react"
import { cx } from "@shared/utils/cx"
import useWindowSize from "@shared/hooks/useWindowSize"

export default function Footer() {

  return (
    <footer className="footer bg-header text-light-primary border border-t-outline p-5 md:px-15 md:py:10 lg:px-20 lg:py-15">
      <nav className="footer-navigation flex flex-col lg:grid lg:grid-cols-[1fr_2fr]">
        <div className="flex flex-col footer-brand mb-10 lg:items-start lg:justify-center lg:h-full">
          <img className="h-6 mb-4 self-start " src={images.LOGO_TEXT} alt="" />
          <p className="text-start text-light-secondary text-[12px]">@2023 Chill All Rights Reserved</p>
        </div>

        <div className="flex flex-col gap-2 lg:flex-row lg:justify-between lg:gap-12">
          <FooterNavSection
            title="Genre"
            list={[
              {
                label: "Aksi",
                onClick: () => { },
              },
              {
                label: "Anak-anak",
                onClick: () => { },
              },
              {
                label: "Anime",
                onClick: () => { },
              },
              {
                label: "Britania",
                onClick: () => { },
              },
              {
                label: "Drama",
                onClick: () => { },
              },
              {
                label: "Fantasi Ilmiah & Fantasi",
                onClick: () => { },
              },
              {
                label: "Kejahatan",
                onClick: () => { },
              },
              {
                label: "KDrama",
                onClick: () => { },
              },
              {
                label: "Komedi",
                onClick: () => { },
              },
              {
                label: "Petualangan",
                onClick: () => { },
              },
              {
                label: "Perang",
                onClick: () => { },
              },
              {
                label: "Romantis",
                onClick: () => { },
              },
              {
                label: "Sains & Alam",
                onClick: () => { },
              },
              {
                label: "Thriller",
                onClick: () => { },
              },
            ]}
          />
          <FooterNavSection
            title="Bantuan"
            list={[
              {
                label: "FAQ",
                onClick: () => { },
              },
              {
                label: "Kontak Kami",
                onClick: () => { },
              },
              {
                label: "Privasi",
                onClick: () => { },
              },
              {
                label: "Syarat & Ketentuan",
                onClick: () => { },
              },
            ]}
            // className=""
          />
        </div>

      </nav>

    </footer>
  )
}

const FooterNavSection = ({
  title,
  list,
  className,
}: FooterNavProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const { width } = useWindowSize()

  return (
    <section className={cx(className, "footer-nav-section")}>
      <button disabled={width > 1024} onClick={() => setIsExpanded(!isExpanded)} className={cx("w-full flex gap-1 cursor-pointer hover:text-white", (isExpanded || width > 1024) && "text-white")}>
        <h5 className="grow text-start text-base">{title}</h5>
        {
          width <= 1024
          &&
          <Icon icon="chevron-down" className={cx("w-6", isExpanded ? "rotate-180" : "-rotate-90")} />
        }
      </button>
      <ul className={cx("grid gap-3 lg:grid-cols-1 lg:grid-rows-4 lg:grid-flow-col", (width < 1024 && !isExpanded) ? "hidden" : "mt-2")}>

        {
          list?.map((each, i) => (
            <li key={i} onClick={each?.onClick} className="block text-[12px] m-0 text-start whitespace-nowrap last:mb-3 md:text-[14px] lg:text-[16px] lg:last:mb-0 lg:inline">
              {each?.label}
            </li>
          ))
        }
      </ul>
    </section>
  )
}