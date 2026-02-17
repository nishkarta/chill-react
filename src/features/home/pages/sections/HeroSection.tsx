import Button from "@shared/ui/Button"
import Icon from "@shared/ui/Icon"

export default function HeroSection() {


  return (
    <section aria-label="" className="hero-section relative">
      <article className="block h-56.25 md:h-[30vh] lg:h-[calc(100vh-70px)]">
        <iframe
          width="100%"
          height={"100%"}
          className="pointer-events-none "
          src="https://www.youtube.com/embed/U0MOoyI7pIM?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&playsinline=1"
          title="YouTube video player"
          frameBorder="0"
          allow="fullscreen; autoplay; "
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        >

        </iframe>
        <div className="absolute top-0 bg-linear-to-b from-transparent from-[16.89%] via-[rgba(16,18,19,0.86)] via-[59.37%] to-[#181A1C] flex flex-col gap-3 justify-end items-start text-light-primary px-5.5 py-10 h-full w-full md:px-10 lg:px-20 lg:py-20">
          <h1 className="max-w-167 text-[24px] leading-[120%] font-bold md:text-[32px] lg:text-[48px]">Duty After School</h1>
          <p className="max-w-167 text-[12px] font-medium text-left line-clamp-2 md:text-[14px] lg:text-[18px] lg:line-clamp-3">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat dicta dolor provident pariatur voluptatem nulla, debitis quod eum magni unde voluptates soluta temporibus, excepturi ducimus non repudiandae atque accusantium praesentium beatae ratione! Numquam exercitationem veritatis dicta quis aliquam nobis neque enim nesciunt sint rem nihil nisi suscipit optio voluptates iste sunt, eos illo, ea sapiente non, alias eum odio necessitatibus? Ipsum nesciunt obcaecati perspiciatis numquam quod molestias totam molestiae, quibusdam libero et quidem, qui adipisci repellat! Sed quos voluptatum fuga amet, assumenda omnis esse architecto accusamus. Dicta pariatur nostrum sint ea, praesentium quo eum adipisci, quaerat ducimus facilis culpa voluptas.</p>
          <div className="flex items-center gap-2.5 w-full">
            <div className="flex items-center gap-2.5 grow *:h-6.25! lg:*:h-11.25!">
              <Button
                className="h-6.25 font-bold! bg-primary-300 lg:px-6.5"
              >
                Mulai
              </Button>
              <Button
                className="h-6.25 font-bold! lg:px-6.5"
                variant="secondary"
              >
                Selengkapnya
              </Button>
              <span className="grid place-items-center text-[12px] px-1 border border-light-primary rounded-3xl lg:text-[18px] lg:px-2.5">18+</span>
            </div>

            <Button variant="outlined" className="border! w-6.5! h-6.5! grid! place-items-center rounded-[50%] border-light-primary! lg:h-11! lg:w-11!">
              <Icon icon="volume-off" className="w-4" />
            </Button>
          </div>
        </div>

      </article>
    </section>
  )
}