import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

type HoverCardPortalProps = {
  open: boolean;
  anchorRect: DOMRect | null;
  children: React.ReactNode;
  width?: number;   // card width
  height?: number;  // optional fixed height
  offsetY?: number; // spacing from the item
};

export function HoverCardPortal({
  open,
  anchorRect,
  children,
  width = 408,
  height,
}: HoverCardPortalProps) {
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  // Compute position
  const style = useMemo(() => {
    if (!anchorRect) return null;

    const padding = 12;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const cardHeight = height ?? anchorRect.height;
    // if height not provided, fallback to item height

    // center X
    let left = anchorRect.left + anchorRect.width / 2 - width / 2;

    // center Y
    let top = anchorRect.top + anchorRect.height / 2 - cardHeight / 2;

    // clamp horizontal
    if (left < padding) left = padding;
    if (left + width > vw - padding) left = vw - padding - width;

    // clamp vertical
    if (top < padding) top = padding;
    if (top + cardHeight > vh - padding) top = vh - padding - cardHeight;

    return {
      position: "fixed" as const,
      left,
      top,
      width,
      height,
      zIndex: 9999,
    };
  }, [anchorRect, width, height]);


  if (!mounted || !open || !anchorRect || !style) return null;

  return createPortal(
    <div style={style} className="pointer-events-none">
      <div className="pointer-events-auto">{children}</div>
    </div>,
    document.body
  );
}
