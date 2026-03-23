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
};

const WorkIndexView: React.FC<WorkDetailViewProps> = (props) => {
  const [activeProjectId, setActiveProjectId] = React.useState<null | string>(null);

  const filteredProjects = props.projects.filter(
    (project) => project.images && project.images.length > 0,
  );

  return (
    <div>
      <Page.Container className="grid grid-cols-1 md:grid-cols-[2fr_3fr] lg:grid-cols-2 gap-8">
        <div className="hidden md:block relative w-full h-[calc(100dvh-var(--nav-height)-var(--nav-height))]">
          {filteredProjects.map((project) => (
            <div
              className={Utils.cx(
                'absolute inset-0 flex items-center justify-center transition-opacity duration-150',
                {
                  'opacity-100': activeProjectId === project._id,
                  'opacity-0': activeProjectId !== project._id,
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
        </div>
        <div>
          <div className="divide-y divide-subdued grid grid-cols-[3fr_2fr_2fr_max-content] w-full gap-x-4">
            {filteredProjects.map((project) => (
              <Link
                className="text-subdued hover:text-foreground transition-colors col-span-full grid grid-cols-subgrid"
                href={Paths.Projects.detail(project)}
                key={project._id}
                onMouseEnter={() => setActiveProjectId(project._id)}
                onMouseLeave={() => setActiveProjectId(null)}
              >
                <Text.Body>{project.title}</Text.Body>
                <Text.Body>{project.location}</Text.Body>
                <Text.Body>{project.client}</Text.Body>
                <Text.Body>{project.year}</Text.Body>
              </Link>
            ))}
          </div>
        </div>
      </Page.Container>
    </div>
  );
};

export default WorkIndexView;
