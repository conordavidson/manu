'use client';

import Image from '@/ui/image';
import Posthog from 'posthog-js';
import RichText from '@/ui/rich-text';

import * as Page from '@/ui/page';
import * as React from 'react';
import * as RichTextUtils from '@/lib/rich-text';
import * as Scroll from '@/lib/scroll';
import * as Text from '@/ui/text';
import * as Types from '@/lib/types';

type CollectionsDetailViewProps = {
  collection: Types.Collection;
  globals: Types.Globals;
};

type ProjectWithSlideInfo = {
  hasDescription: boolean;
  imageCount: number;
  project: Types.Project;
  startIndex: number;
};

function getProjectSlideInfo(projects: null | Types.Project[] | undefined): ProjectWithSlideInfo[] {
  if (!projects) return [];
  let startIndex = 0;
  return projects.map((project) => {
    const imageCount = project.images?.length ?? 0;
    const hasDescription = !RichTextUtils.isEmpty(project.description);
    const info: ProjectWithSlideInfo = { project, startIndex, imageCount, hasDescription };
    startIndex += imageCount + (hasDescription ? 1 : 0);
    return info;
  });
}

const CollectionsDetailView: React.FC<CollectionsDetailViewProps> = (props) => {
  const projects = React.useMemo(
    () => getProjectSlideInfo(props.collection.projects),
    [props.collection.projects],
  );
  const totalSlides = projects.reduce(
    (sum, p) => sum + p.imageCount + (p.hasDescription ? 1 : 0),
    0,
  );

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
    Posthog.capture('collection_slide_navigated', {
      direction: 'next',
      slide_index: next,
      collection_title: props.collection.title,
    });
  }, [totalSlides, scrollToSlide, currentSlideIndex, props.collection.title]);

  const onPrevious = React.useCallback(() => {
    if (isScrollingRef.current) return;
    const prev = Math.max(currentSlideIndex - 1, 0);
    scrollToSlide(prev);
    Posthog.capture('collection_slide_navigated', {
      direction: 'previous',
      slide_index: prev,
      collection_title: props.collection.title,
    });
  }, [scrollToSlide, currentSlideIndex, props.collection.title]);

  // Sync currentSlide on manual scroll via IntersectionObserver
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
  }, [projects]);

  return (
    <div className="h-[calc(100dvh-var(--nav-height))] grid grid-rows-[auto_min-content]">
      <div
        className="relative flex whitespace-nowrap overflow-x-scroll pb-4 snap-x snap-mandatory pt-8"
        ref={scrollRef}
      >
        {projects.map((item) => (
          <Project
            key={item.project._id}
            onNext={onNext}
            onPrevious={onPrevious}
            project={item.project}
            slideRefs={slideRefs}
            startIndex={item.startIndex}
          />
        ))}
      </div>
      <Page.Container className="absolute bottom-0 left-0 right-0 pt-1 pb-4 flex justify-start items-start gap-x-8">
        <div>
          <Text.Body>{props.collection.title}</Text.Body>
        </div>
      </Page.Container>
    </div>
  );
};

type ProjectProps = {
  onNext: () => void;
  onPrevious: () => void;
  project: Types.Project;
  slideRefs: React.RefObject<(HTMLDivElement | null)[]>;
  startIndex: number;
};

const Project: React.FC<ProjectProps> = (props) => {
  if (!props.project.images) return null;

  return (
    <div className="relative h-full flex flex-col" id={props.project.slug.current}>
      <div className="flex flex-1 min-h-0 shrink-0">
        {props.project.images.map((image, index) => {
          const slideIdx = props.startIndex + index;
          return (
            <Slide
              key={image._key}
              onNext={props.onNext}
              onPrevious={props.onPrevious}
              ref={(el) => {
                props.slideRefs.current[slideIdx] = el;
              }}
              title={`${index + 1} / ${props.project.images?.length}`}
            >
              <Image
                className="object-contain h-full w-full min-h-0"
                image={image}
                loading="eager"
                sizes="100vw"
              />
            </Slide>
          );
        })}
        {!RichTextUtils.isEmpty(props.project.description) && (
          <Slide
            onNext={props.onNext}
            onPrevious={props.onPrevious}
            ref={(el) => {
              const getDescriptionIndex = () => {
                if (!props.project.images) return props.startIndex;
                return props.startIndex + props.project.images.length;
              };
              props.slideRefs.current[getDescriptionIndex()] = el;
            }}
            title="Statement"
          >
            <div className="flex flex-col md:grid md:grid-cols-[300px_2fr] gap-x-12 gap-y-4 h-full">
              <div className="min-h-0 md:col-start-2 md:col-end-3 md:row-start-1">
                <div className="grid grid-cols-6 gap-1">
                  {props.project.images.map((image) => {
                    return (
                      <Image
                        className="object-contain object-top-left h-full w-full"
                        image={image}
                        key={image._key}
                        loading="eager"
                        sizes="100vw"
                      />
                    );
                  })}
                </div>
              </div>
              <div className="min-h-0 whitespace-normal overflow-y-auto md:col-start-1 md:col-end-2 md:row-start-1">
                <RichText value={props.project.description as Types.RichText} />
              </div>
            </div>
          </Slide>
        )}
      </div>
      <div className="sticky left-0 w-dvw pb-5 flex gap-x-8">
        <Page.Container className="w-full flex justify-start">
          <Text.Body className="text-subdued italic">
            {props.project.title} ({props.project.year})
          </Text.Body>
        </Page.Container>
      </div>
    </div>
  );
};

type SlideProps = React.PropsWithChildren<{
  onNext: () => void;
  onPrevious: () => void;
  title: string;
}>;

const Slide = React.forwardRef<HTMLDivElement, SlideProps>((props, ref) => {
  return (
    <div className="relative w-dvw shrink-0 snap-center" ref={ref}>
      <div className="absolute inset-0 z-10 flex pointer-events-none">
        <div
          className="w-1/2 h-full cursor-w-resize pointer-events-auto"
          onClick={props.onPrevious}
        />
        <div className="w-1/2 h-full cursor-e-resize pointer-events-auto" onClick={props.onNext} />
      </div>
      <Page.Container className="h-full flex flex-col">
        {props.children}
        <div className="pt-6">
          <Text.Body className="text-subdued">{props.title}</Text.Body>
        </div>
      </Page.Container>
    </div>
  );
});

export default CollectionsDetailView;
