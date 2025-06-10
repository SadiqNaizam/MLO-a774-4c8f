import React from 'react';
import useEmblaCarousel, { EmblaOptionsType, EmblaPluginType } from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay'; // Already in dependencies
import { Card } from "@/components/ui/card"; // Example usage of shadcn Card
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Define props if the carousel content is dynamic
interface CarouselProps {
  slides: React.ReactNode[]; // Array of slide contents
  options?: EmblaOptionsType;
  plugins?: EmblaPluginType[];
  title?: string; // Optional title for the carousel section
  slideClassName?: string; // Custom class for each slide item
}

const Carousel: React.FC<CarouselProps> = ({
  slides,
  options,
  plugins = [Autoplay({ delay: 4000, stopOnInteraction: true })], // Default autoplay
  title,
  slideClassName = "flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_33.33%] lg:flex-[0_0_25%] p-2", // Default responsive slides
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, ...options }, plugins);

  console.log("Rendering Carousel with slides:", slides.length, "Title:", title);

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (!slides || slides.length === 0) {
    return <p>No slides to display.</p>;
  }

  return (
    <div className="py-4">
      {title && <h2 className="text-2xl font-semibold mb-4 px-2">{title}</h2>}
      <div className="relative">
        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex">
            {slides.map((slideContent, index) => (
              <div className={cn("embla__slide min-w-0", slideClassName)} key={index}>
                {/* Wrap slide content in shadcn Card for consistent styling, or use as is */}
                {slideContent}
              </div>
            ))}
          </div>
        </div>
        {emblaApi && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/80 hover:bg-white"
              onClick={scrollPrev}
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/80 hover:bg-white"
              onClick={scrollNext}
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Carousel;