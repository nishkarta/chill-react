import type { ReactNode, SyntheticEvent } from "react";

interface AuthCardProps {
  children: ReactNode,
  title: string,
  caption: string,
  onSubmit: (e: SyntheticEvent<HTMLFormElement>) => void,
  onClickGoogle: (e: SyntheticEvent<HTMLButtonElement>) => void,
  isSubmitting?:boolean,
}

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & {
  label?: string;
  helperText?: string;
  error?: string;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  helperClassName?: string;
  requiredMark?: boolean;
  positiveOnly?: boolean;
};

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  helperText?: string;
  error?: string;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  helperClassName?: string;
  requiredMark?: boolean;
};

interface ButtonProps {
  variant?: string,
  size?: string,
  isLoading?: boolean,
}

interface CarouselItem {
  id?: string,
  title: string,
  thumbnail: string,
  thumbnailUrl?: string,
  synopsys?:string;
  thumbnailFile?: File,
  showTitle?: boolean,
  isNewEpisode?: boolean,
  isTop10?: boolean,
  rating?: number | string,
  trailer?: string,
  director?:string,
}

interface CarouselProps {
  title?: string,
  thumbnailType?: string,
  list: CarouselItem[],
  className?: string,
  isLoading?:boolean
}

export type { AuthCardProps, ButtonProps, InputProps, CarouselItem, CarouselProps, TextAreaProps };
