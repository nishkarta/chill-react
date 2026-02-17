import images from "@assets/images";
import type { AuthCardProps } from "./ui.types";
import Button from "./Button";

export default function AuthCard({
  children,
  title,
  caption,
  onSubmit,
  onClickGoogle
}: AuthCardProps) {
  return (
    <section className="auth-card bg-[#181A1CD6] w-76.5 max-w-[90vw] p-6 rounded-xl text-light-primary flex flex-col md:w-100 md:p-8 lg:w-132.25 lg:p-10 lg:rounded-2xl transition-all ease-in">
      <div className="auth-card-header flex flex-col mb-5">
        <img src={images.LOGO_TEXT} className="h-6 object-contain mb-5 md:h-9 md:mb-7 lg:h-11 lg:mb-9" />
        <h1 className="text-[18px] leading-[140%] font-bold mb-1 md:text-[24px] lg:text-[32px] lg:mb-2">{title}</h1>
        <p className="text-[10px] md:text-[14px] lg:text-16px">{caption}</p>
      </div>
      <form onSubmit={onSubmit}>
        {children}
        <div className="auth-card-actions flex flex-col gap-1 lg:gap-2">
          <Button type="submit" variant="secondary">
            {title}
          </Button>
          <span className="text-[10px] text-light-disabled md:text-[12px] lg-[text-14px]">Atau</span>
          <Button onClick={onClickGoogle} variant="outlined">
            <img src={images.GOOGLE} className="h-2.5 md:h-3.5 lg:h-4.5"/>
            <span>{title} dengan Google</span>
          </Button>
        </div>
      </form>
    </section>
  )
}