import React, { useCallback } from 'react'
import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel'
import { DotButton, useDotButton } from './EmblaCarouselDotButton'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { CarouselProps } from '@/types'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import LoaderSpinner from './LoaderSpinner'

const EmblaCarousel = ({ fansLikeDetail }: CarouselProps) => {
    const router = useRouter();

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()])

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay || !("stopOnInteraction" in autoplay.options)) return

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? (autoplay.reset as () => void)
        : (autoplay.stop as () => void)

    resetOrStop()
  }, [])

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onNavButtonClick
  )

  const slides = fansLikeDetail && fansLikeDetail?.filter((item: any) => item.totalPodcasts > 0)

  console.log(slides);
  
  if(!slides) return <LoaderSpinner />
  
  return (
    <section className="flex w-full flex-col gap-4 overflow-hidden" ref={emblaRef}>
      <div className='flex '>
        {slides.slice(0, 5).map((item) => (
          <figure
          key={item._id}
          className='carousel_box'
          onClick={() => router.push(`/podcasts/${item.podcast[0]?.podcastId}`)}
          >
            <Image src={item.imgURL} alt='card' fill className='absolute size-full rounded-xl border-none' />

            <div>
              <h2 className='text-14 font-semibold text-white-1'>{item.podcast[0]?.podcastTitle}</h2>
              <p className='text-12 font-normal text-white-2'>{item.name}</p>
            </div>
          </figure>
        ))}
      </div>

      <div className="embla__controls">
        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected' : ''
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default EmblaCarousel
