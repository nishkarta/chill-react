import { useEffect, useState } from "react";
import type { RefObject } from "react";

export default function useOutsideClick<T extends HTMLElement>(
  ref: RefObject<T | null>
): boolean {
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const el = ref.current;
      const target = event.target as Node | null;

      if (!el) return;

      setIsClicked(target ? !el.contains(target) : true);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref]);

  return isClicked;
}
