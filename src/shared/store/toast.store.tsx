import type { ToastProps } from "@shared/ui/Toast";

export interface InternalToast extends Omit<ToastProps, "isOpen"> {
  id: string;
  isOpen: boolean;
}