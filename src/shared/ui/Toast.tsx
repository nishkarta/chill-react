import Icon from "@shared/ui/Icon";
import { useEffect, useState } from "react";

type ToastPosition =
  | "top-center"
  | "bottom-center"
  | "top-right"
  | "bottom-right"
  | "top-left"
  | "bottom-left";

export type ToastProps = {
  isOpen: boolean;
  onClose?: () => void;
  text?: string;
  duration?: number; // s
  position?: ToastPosition;
  icon?: string;
  width?: string | number;
  colorIcon?: string;
  status?: "success" | "failed";
};

export default function Toast({
  isOpen,
  onClose = () => {},
  text = "Text success and error here!",
  duration = 5000,
  position = "top-center",
  icon = "",
  width = "auto",
  colorIcon = "",
  status = "success",
}: ToastProps) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!isOpen) return;

    // setProgress(100);

    const interval = 50;
    const step = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          onClose();
          return 0;
        }
        return prev - step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isOpen, onClose, duration]);

  if (!isOpen) return null;

  const positionClasses: Record<ToastPosition, string> = {
    "top-center": "fixed top-6 left-1/2 -translate-x-1/2",
    "bottom-center": "fixed bottom-6 left-1/2 -translate-x-1/2",
    "top-right": "fixed top-6 right-6",
    "bottom-right": "fixed bottom-6 right-6",
    "top-left": "fixed top-6 left-6",
    "bottom-left": "fixed bottom-6 left-6",
  };

  return (
    <div className={`${positionClasses[position]} z-999`}>
      <div
        style={{ width }}
        className="relative bg-white rounded-md shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300"
      >
        <div className="flex items-center gap-4 px-6 py-5">
          {status === "success" ? (
            <Icon
              icon={icon || "check-filled"}
              color={colorIcon || "#12B76A"}
              size={20}
            />
          ) : (
            <Icon
              icon={icon || "danger-triangle"}
              color={colorIcon || "#D42701"}
              size={20}
            />
          )}
          <p className="flex-1 text-gray-800 text-[16px]">{text}</p>

          <button onClick={onClose}>
            <Icon icon="close" color={"#000"} size={14} />
          </button>
        </div>

        <div className="absolute bottom-0 left-0 h-1 w-full bg-gray-100">
          <div
            className={`h-full ${status === "success" ? "bg-green-500" : "bg-red-500"} transition-all`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
