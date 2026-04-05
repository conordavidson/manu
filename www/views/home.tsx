'use client';

import Image from '@/ui/image';
import Link from 'next/link';

import * as Page from '@/ui/page';
import * as Paths from '@/lib/paths';
import * as React from 'react';
import * as Scroll from '@/lib/scroll';
import * as Text from '@/ui/text';
import * as Types from '@/lib/types';
import * as Utils from '@/lib/utils';

type HomeViewProps = {
  homepage: Types.Homepage;
};

type FeatureWithSlideInfo = {
  feature: Types.HomepageFeature;
  startIndex: number;
  slideCount: number;
};

function getFeatureSlideInfo(features: Types.HomepageFeature[]): FeatureWithSlideInfo[] {
  let startIndex = 0;
  return features.map((feature) => {
    const slideCount = feature.slides.length;
    const info: FeatureWithSlideInfo = { feature, startIndex, slideCount };
    startIndex += slideCount;
    return info;
  });
}

const HomeView: React.FC<HomeViewProps> = (props) => {
  const features = React.useMemo(
    () => getFeatureSlideInfo(props.homepage.features),
    [props.homepage.features],
  );
  const totalSlides = features.reduce((sum, f) => sum + f.slideCount, 0);

  const scrollRef = React.useRef<HTMLDivElement>(null);
  const slideRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const isScrollingRef = React.useRef(false);
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);

  const scrollToSlide = React.useCallback((index: number) => {
    const container = scrollRef.current;
    const el = slideRefs.current[index];
    if (!container || !el) return;
    isScrollingRef.current = true;
    setTimeout(() => {
      isScrollingRef.current = false;
    }, 400);
    Scroll.smoothScrollTo(container, el);
  }, []);

  const onNext = React.useCallback(() => {
    if (isScrollingRef.current) return;
    const next = Math.min(currentSlideIndex + 1, totalSlides - 1);
    scrollToSlide(next);
  }, [totalSlides, scrollToSlide, currentSlideIndex]);

  const onPrevious = React.useCallback(() => {
    if (isScrollingRef.current) return;
    const prev = Math.max(currentSlideIndex - 1, 0);
    scrollToSlide(prev);
  }, [scrollToSlide, currentSlideIndex]);

  React.useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = slideRefs.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1) {
              setCurrentSlideIndex(index);
            }
          }
        }
      },
      { root: container, threshold: 0.5 },
    );

    for (const slide of slideRefs.current) {
      if (slide) observer.observe(slide);
    }

    return () => observer.disconnect();
  }, [features]);

  return (
    <div className="h-[calc(100dvh-var(--nav-height))]">
      <div
        ref={scrollRef}
        className="relative h-full flex whitespace-nowrap overflow-x-scroll pb-4 snap-x snap-mandatory pt-8"
      >
        {features.map((item) => (
          <Feature
            key={item.feature._key}
            feature={item.feature}
            slideRefs={slideRefs}
            startIndex={item.startIndex}
            onNext={onNext}
            onPrevious={onPrevious}
          />
        ))}
      </div>
    </div>
  );
};

type FeatureProps = {
  feature: Types.HomepageFeature;
  slideRefs: React.RefObject<(HTMLDivElement | null)[]>;
  startIndex: number;
  onNext: () => void;
  onPrevious: () => void;
};

const Feature: React.FC<FeatureProps> = (props) => {
  return (
    <div className="relative h-full flex flex-col">
      <div className="flex flex-1 min-h-0 shrink-0">
        {props.feature.slides.map((slide, index) => {
          const slideIdx = props.startIndex + index;
          const getContent = () => {
            if (slide.images.length === 0) throw new Error(`No images for slide ${slide._key}`);

            if (slide.images.length === 2) {
              return (
                <div className="grid grid-cols-2 gap-x-4 h-full">
                  {slide.images.map((image, index) => (
                    <Image
                      className={Utils.cx('object-contain h-full w-full min-h-0', {
                        'object-right': index === 0,
                        'object-left': index === 1,
                      })}
                      image={image}
                      key={image._key}
                      loading="eager"
                      sizes="100vw"
                    />
                  ))}
                </div>
              );
            }

            return (
              <Image
                className="object-contain h-full w-full"
                image={slide.images[0]}
                loading="eager"
                sizes="100vw"
              />
            );
          };

          return (
            <Slide
              key={slide._key}
              ref={(el) => {
                props.slideRefs.current[slideIdx] = el;
              }}
              onNext={props.onNext}
              onPrevious={props.onPrevious}
            >
              {getContent()}
            </Slide>
          );
        })}
      </div>
      <div className="sticky left-0 w-dvw pt-16">
        <Page.Container className="w-full flex justify-start">
          <Link className="group" href={Paths.Collections.detail(props.feature.collection)}>
            <Text.Body className="text-subdued group-hover:text-foreground transition-colors">
              {props.feature.collection.title} ↗
            </Text.Body>
          </Link>
        </Page.Container>
      </div>
    </div>
  );
};

type SlideProps = React.PropsWithChildren<{
  onNext: () => void;
  onPrevious: () => void;
}>;

const Slide = React.forwardRef<HTMLDivElement, SlideProps>((props, ref) => {
  return (
    <div ref={ref} className="relative w-dvw shrink-0 snap-center">
      <div className="absolute inset-0 z-10 flex pointer-events-none">
        <div
          className="w-1/2 h-full cursor-w-resize pointer-events-auto"
          onClick={props.onPrevious}
        />
        <div className="w-1/2 h-full cursor-e-resize pointer-events-auto" onClick={props.onNext} />
      </div>
      <Page.Container className="h-full flex flex-col">{props.children}</Page.Container>
    </div>
  );
});

export default HomeView;
