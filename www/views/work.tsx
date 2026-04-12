'use client';

import Image from '@/ui/image';
import Link from 'next/link';

import * as Page from '@/ui/page';
import * as Paths from '@/lib/paths';
import * as Projects from '@/lib/projects';
import * as React from 'react';
import * as Text from '@/ui/text';
import * as Types from '@/lib/types';
import * as Utils from '@/lib/utils';

type WorkDetailViewProps = {
  globals: Types.Globals;
  projects: Types.Project[];
  collections: Types.Collection[];
};

type Selection =
  | {
      type: 'project';
      project: Types.Project;
    }
  | {
      type: 'collection';
      collection: Types.Collection;
    };

const WorkIndexView: React.FC<WorkDetailViewProps> = (props) => {
  const [activeSelection, setActiveSelection] = React.useState<null | Selection>();

  const isProjectSelected = (project: Types.Project) => {
    if (!activeSelection) return false;
    if (activeSelection.type !== 'project') return false;
    return activeSelection.project._id === project._id;
  };

  const isCollectionSelected = (collection: Types.Collection) => {
    if (!activeSelection) return false;
    if (activeSelection.type !== 'collection') return false;
    return activeSelection.collection._id === collection._id;
  };

  const filteredProjects = props.projects.filter(
    (project) => project.images && project.images.length > 0,
  );

  return (
    <div>
      <Page.Container className="grid grid-cols-1 md:grid-cols-[2fr_2fr_3fr_3fr] lg:grid-cols-4 gap-gutter">
        <div className="hidden md:block relative w-full h-[calc(100dvh-var(--nav-height)-var(--nav-height))] col-span-2 sticky top-[var(--nav-height)]">
          {filteredProjects.map((project) => (
            <div
              className={Utils.cx(
                'absolute inset-0 flex items-center justify-center transition-opacity duration-150',
                {
                  'opacity-100': isProjectSelected(project),
                  'opacity-0': !isProjectSelected(project),
                },
              )}
              key={project._id}
            >
              <div className="max-w-[500px] max-h-[500px] h-full w-full">
                <Image
                  className="object-contain h-full w-full"
                  image={Projects.getCoverImage(project)}
                />
              </div>
            </div>
          ))}
          {props.collections.map((collection) => (
            <div
              className={Utils.cx(
                'absolute inset-0 flex items-center justify-center transition-opacity duration-150',
                {
                  'opacity-100': isCollectionSelected(collection),
                  'opacity-0': !isCollectionSelected(collection),
                },
              )}
              key={collection._id}
            >
              <div
                className="h-full w-full grid grid-cols-8 place-content-center place-items-center gap-2 auto-rows-[minmax(0,min-content)]
"
              >
                {collection.projects
                  ?.flatMap((project) => project.images)
                  .filter((image) => image !== null)
                  .map((image) => (
                    <Image
                      className="object-contain h-full w-full"
                      image={image}
                      key={image._key}
                      sizes="12.5vw"
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
        <div className="col-span-2 mb-12">
          <div className="divide-y divide-subdued grid grid-cols-[3fr_2fr_2fr_max-content] w-full gap-x-4">
            {props.collections.map((collection) => {
              const collectionProjects =
                collection.projects?.filter(
                  (project) => project.images && project.images.length > 0,
                ) ?? [];

              return (
                <React.Fragment key={collection._id}>
                  <Link
                    className="text-subdued hover:text-foreground transition-colors col-span-full grid grid-cols-subgrid not-first:mt-12"
                    href={Paths.Collections.detail(collection)}
                    onMouseEnter={() => setActiveSelection({ type: 'collection', collection })}
                    onMouseLeave={() => setActiveSelection(null)}
                  >
                    <Text.Body>{collection.title}</Text.Body>
                  </Link>
                  {collectionProjects.map((project) => (
                    <Link
                      className="text-subdued hover:text-foreground transition-colors duration-400 hover:duration-75 col-span-full grid grid-cols-subgrid"
                      href={`${Paths.Collections.detail(collection)}#${project.slug.current}`}
                      onMouseEnter={() => setActiveSelection({ type: 'project', project })}
                      onMouseLeave={() => setActiveSelection(null)}
                      key={project._id}
                    >
                      <Text.Body>{project.title}</Text.Body>
                      <Text.Body>{project.location}</Text.Body>
                      <Text.Body>{project.client}</Text.Body>
                      <Text.Body>{project.year}</Text.Body>
                    </Link>
                  ))}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </Page.Container>
    </div>
  );
};

export default WorkIndexView;
