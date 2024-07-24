import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function Crousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  return (
    <div className="flex justify-center">
      <Carousel
        className="w-full"
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          <CarouselItem>
            <img
              src="https://res.cloudinary.com/dfyfnvmtr/image/upload/v1721142566/compulsory/1_dqu5zs.jpg"
              alt="crousel"
              className="rounded-xl max-w-full object-contain lg:object-cover lg:h-[450px] lg:w-full"
            />
          </CarouselItem>
          <CarouselItem>
            <img
              src="https://res.cloudinary.com/dfyfnvmtr/image/upload/v1721142565/compulsory/2_xl2ghb.jpg"
              alt="crousel"
              className="rounded-xl max-w-full object-contain lg:object-cover lg:h-[450px] lg:w-full"
            />
          </CarouselItem>
          <CarouselItem>
            <img
              src="https://res.cloudinary.com/dfyfnvmtr/image/upload/v1721142565/compulsory/4_pcwion.jpg"
              alt="crousel"
              className="rounded-xl max-w-full object-contain lg:object-cover lg:h-[450px] lg:w-full"
            />
          </CarouselItem>
          <CarouselItem>
            <img
              src="https://res.cloudinary.com/dfyfnvmtr/image/upload/v1721142565/compulsory/3_hlexds.jpg"
              alt="crousel"
              className="rounded-xl max-w-full object-contain lg:object-cover lg:h-[450px] lg:w-full"
            />
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
}
