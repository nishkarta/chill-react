import type { ReactNode, SyntheticEvent } from "react";

interface AuthCardProps {
  children: ReactNode,
  title: string,
  caption: string,
  onSubmit: (e: SyntheticEvent<HTMLFormElement>) => void,
  onClickGoogle: (e: SyntheticEvent<HTMLButtonElement>) => void,
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

interface ButtonProps {
  variant?: string,
  size?: string,
  isLoading?: boolean,
}

interface CarouselItem {
  title: string,
  thumbnail: string,
  showTitle?: boolean,
  isNewEpisode?: boolean,
  isTop10?: boolean,
}

interface CarouselProps {
  title?: string,
  list: CarouselItem[],
  className?:string
}

export type { AuthCardProps, ButtonProps, InputProps, CarouselItem, CarouselProps };
