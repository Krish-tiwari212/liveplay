import React, { useCallback, useEffect, useRef } from "react";
import "../app/globals.css"
import {
  EmblaCarouselType,
  EmblaEventType,
  EmblaOptionsType,
} from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./EmbalaCarouselArroButtons";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import data from "@/data";
import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

const TWEEN_FACTOR_BASE = 0.32;

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max);


const EmblaCarousel: React.FC<PropType> = () => {
  const {eventsArray} = data;
  const options: EmblaOptionsType = { loop: true };
  const SLIDE_COUNT = 5;
  const slides = Array.from(Array(SLIDE_COUNT).keys());
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const tweenFactor = useRef(0);
  const tweenNodes = useRef<HTMLElement[]>([]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode.querySelector(".embla__slide__number") as HTMLElement;
    });
  }, []);

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, []);

  const tweenScale = useCallback(
    (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
      const engine = emblaApi.internalEngine();
      const scrollProgress = emblaApi.scrollProgress();
      const slidesInView = emblaApi.slidesInView();
      const isScrollEvent = eventName === "scroll";

      emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress;
        const slidesInSnap = engine.slideRegistry[snapIndex];

        slidesInSnap.forEach((slideIndex) => {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target();

              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target);

                if (sign === -1) {
                  diffToTarget = scrollSnap - (1 + scrollProgress);
                }
                if (sign === 1) {
                  diffToTarget = scrollSnap + (1 - scrollProgress);
                }
              }
            });
          }

          const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
          const scale = numberWithinRange(tweenValue, 0, 1).toString();
          const tweenNode = tweenNodes.current[slideIndex];
          tweenNode.style.transform = `scale(${scale})`;
        });
      });
    },
    []
  );

  useEffect(() => {
    if (!emblaApi) return;

    setTweenNodes(emblaApi);
    setTweenFactor(emblaApi);
    tweenScale(emblaApi);

    emblaApi
      .on("reInit", setTweenNodes)
      .on("reInit", setTweenFactor)
      .on("reInit", tweenScale)
      .on("scroll", tweenScale)
      .on("slideFocus", tweenScale);
  }, [emblaApi, tweenScale]);

  return (
    <section className="bg-[#121e28]">
      <div className="embla relative">
        <div className="embla__viewport w-full " ref={emblaRef}>
          <div className="embla__container mt-10">
            {eventsArray.map((e, index) => (
              <div className="embla__slide relative" key={index}>
                <div className="embla__slide__number flex flex-col items-center w-full">
                  <Card className=" bg-[#141f29] border-none">
                    <CardHeader className="p-0">
                      <Image
                        src={e.image}
                        alt={e.title}
                        width={400}
                        height={300}
                        className="object-cover w-full h-80"
                      />
                    </CardHeader>
                    <CardContent className="flex items-center justify-between pt-4 border-4 border-[#cddc29]">
                      <div>
                        <CardTitle className="text-base sm:text-lg md:text-xl text-white">
                          {e.title}
                        </CardTitle>
                      </div>
                      <Button
                        variant="tertiary"
                        className={`ml-4 text-sm sm:text-base md:text-lg ${
                          e.buttoncolor === "purple" && "bg-purple-600 text-white"
                        }`}
                      >
                        {e.buttontext}
                      </Button>
                    </CardContent>
                    {index !== selectedIndex && (
                      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70 transition-opacity duration-1000"></div>
                    )}
                  </Card>
                  {index !== selectedIndex && (
                    <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70 transition-opacity duration-1000 "></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="embla__controls">
          <div className="embla__buttons">
            <PrevButton
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
            />
            <NextButton
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
            />
          </div>

          {/* <div className="embla__dots">
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={"embla__dot".concat(
                  index === selectedIndex ? " embla__dot--selected" : ""
                )}
              />
            ))}
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
