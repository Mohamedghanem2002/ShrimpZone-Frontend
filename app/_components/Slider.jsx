"use client";
import React, { useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from "@/components/ui/carousel";
import Image from "next/image";

function Slider({ sliderList }) {
  const [current, setCurrent] = useState(0);
  const plugin = Autoplay({ delay: 3000, stopOnInteraction: false });

  return (
    <div className="relative w-full">
      <Carousel
        plugins={[plugin]}
        opts={{ loop: true }}
        setApi={(api) => {
          if (!api) return;
          api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
          });
        }}
      >
        <CarouselContent>
          {sliderList.map((slider, index) => (
            <CarouselItem
              key={index}
              className="relative w-full h-[300px] md:h-[700px]  rounded-2xl"
            >
              <Image
                src={`http://localhost:1337${slider?.image[0]?.url}`}
                width={1000}
                height={400}
                alt=""
                className="w-full h-[300px] md:h-[700px] object-cover rounded-2xl"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

export default Slider;
