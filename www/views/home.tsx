import Image from '@/ui/image';
import Link from 'next/link';

import * as Page from '@/ui/page';
import * as Paths from '@/lib/paths';
import * as React from 'react';
import * as Text from '@/ui/text';
import * as Types from '@/lib/types';
import * as Utils from '@/lib/utils';

type HomeViewProps = {
  homepage: Types.Homepage;
};

const HomeView: React.FC<HomeViewProps> = (props) => {
  return (
    <div className="h-[calc(100dvh-var(--nav-height))]">
      <div className="relative h-full flex whitespace-nowrap overflow-x-scroll pb-4 snap-x snap-mandatory pt-8">
        {props.homepage.features.map((feature) => (
          <Feature feature={feature} key={feature._key} />
        ))}
      </div>
    </div>
  );
};

type FeatureProps = {
  feature: Types.HomepageFeature;
};

const Feature: React.FC<FeatureProps> = (props) => {
  return (
    <div className="relative h-full flex flex-col">
      <div className="flex flex-1 min-h-0 shrink-0">
        {props.feature.slides.map((slide) => {
          const getContent = () => {
            if (slide.images.length === 0) throw new Error(`No images for slide ${slide._key}`);

            if (slide.images.length === 2) {
              return (
                <div className="grid grid-cols-2 gap-x-2 h-full">
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

          return <Slide key={slide._key}>{getContent()}</Slide>;
        })}
      </div>
      <div className="sticky left-0 w-dvw pt-8">
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

type SlideProps = React.PropsWithChildren;

const Slide: React.FC<SlideProps> = (props) => {
  return (
    <div className="relative w-dvw shrink-0 snap-center">
      <Page.Container className="h-full flex flex-col">{props.children}</Page.Container>
    </div>
  );
};

export default HomeView;
