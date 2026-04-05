'use client';

import Image from '@/ui/image';
import RichText from '@/ui/rich-text';

import * as Page from '@/ui/page';
import * as React from 'react';
import * as RichTextUtils from '@/lib/rich-text';
import * as Text from '@/ui/text';
import * as Types from '@/lib/types';

type CollectionsDetailViewProps = {
  collection: Types.Collection;
  globals: Types.Globals;
};

const CollectionsDetailView: React.FC<CollectionsDetailViewProps> = (props) => {
  return (
    <div className="h-[calc(100dvh-var(--nav-height))] grid grid-rows-[auto_min-content]">
      <div className="relative flex whitespace-nowrap overflow-x-scroll pb-4 snap-x snap-mandatory pt-8">
        {props.collection.projects?.map((project) => (
          <Project key={project._id} project={project} />
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
  project: Types.Project;
};

const Project: React.FC<ProjectProps> = (props) => {
  if (!props.project.images) return null;

  return (
    <div id={props.project.slug.current} className="relative h-full flex flex-col">
      <div className="flex flex-1 min-h-0 shrink-0">
        {props.project.images.map((image, index) => {
          return (
            <Slide key={image._key} title={`${index + 1} / ${props.project.images?.length}`}>
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
          <Slide title="Statement">
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
  title: string;
}>;

const Slide: React.FC<SlideProps> = (props) => {
  return (
    <div className="relative w-dvw shrink-0 snap-center">
      <Page.Container className="h-full flex flex-col">
        {props.children}
        <div className="pt-6">
          <Text.Body className="text-subdued">{props.title}</Text.Body>
        </div>
      </Page.Container>
    </div>
  );
};

export default CollectionsDetailView;
