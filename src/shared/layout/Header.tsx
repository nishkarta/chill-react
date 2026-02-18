import images from "@assets/images"
import useOutsideClick from "@shared/hooks/useOutsideClick"
import useWindowSize from "@shared/hooks/useWindowSize"
import Icon from "@shared/ui/Icon"
import { cx } from "@shared/utils/cx"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Header() {
  const { width } = useWindowSize()
  const navigate = useNavigate()

  const [showProfileDropdown, setShowProfileDropdown] = useState(false)

  const profileDropdownRef = useRef<HTMLDivElement | null>(null);
  const clickedOutside = useOutsideClick(profileDropdownRef);

  useEffect(() => {
    if (!showProfileDropdown) return
    if (clickedOutside) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowProfileDropdown(false)
    }
  }, [clickedOutside, showProfileDropdown])

  return (
    <header className="header bg-header sticky top-0 z-25 text-light-primary px-5 py-1.5 md:px-10 md:py-3 lg:px-20 lg:py-6">
      <nav className="flex gap-2 items-center">
        <ul className="nav-list grow flex items-center gap-3 py-3 md:py-0 md:gap-10 lg:gap-20">
          <li className="nav-item logo">
            <a href="">
              <img className="h-5 md:h-7 lg:h-9" src={width > 768 ? images.LOGO_TEXT : images.LOGO} alt="" />
            </a>
          </li>
          {
            [
              {
                label: "Series"
              },
              {
                label: "Film"
              },
              {
                label: "Daftar Saya"
              },
            ]
              ?.map((each, i) => (
                <li key={i} className="nav-item">
                  <a href="" className="text-[10px] hover:text-white cursor-pointer! md:text-[14px] lg:text-[18px]">
                    {each?.label}
                  </a>
                </li>
              ))
          }
        </ul>
        <div ref={profileDropdownRef} onClick={() => setShowProfileDropdown(!showProfileDropdown)} className="profile-dropdown relative flex items-center gap-1 lg:gap-2">
          <img className="w-5 object-cover rounded-[50%] md:w-7 md:h-7 lg:w-10 lg:h-10" src="https://placehold.co/30" alt="profile-picture" />
          <Icon
            icon="chevron-down"
            className={cx("w-4 md:w-5 lg:w-7",
              showProfileDropdown && "rotate-180"
            )}
            color="white"
          />
          {
            showProfileDropdown
            &&
            <div onClick={(e) => e.stopPropagation()} className="profile-dropdown-menu absolute flex flex-col top-full right-0 bg-header py-1 rounded-sm">
              {
                [
                  {
                    label: "Profile Saya",
                    icon: "profile",
                    onClick: () => { }
                  },
                  {
                    label: "Ubah Premium",
                    icon: "star",
                    onClick: () => { }
                  },
                  {
                    label: "Keluar",
                    icon: "logout",
                    onClick: () => {
                      localStorage?.clear()
                      navigate('/login')
                    }
                  },
                ]
                  ?.map((each, i) => (
                    <li key={i} onClick={each?.onClick} className="profile-dropdown-item flex items-center gap-1 whitespace-nowrap px-3 py-2 cursor-pointer hover:text-primary">
                      <Icon icon={each?.icon} className="h-4 md:h-5 lg:h-6" />
                      <span className="text-[10px] md:text-[12px] lg:text-[14px]">{each?.label}</span>
                    </li>
                  ))
              }
            </div>
          }
        </div>
      </nav>
    </header>
  )
}