import * as Types from '@/lib/types';

export const home = '/';
export const info = '/info';

export const Projects = {
  index: '/index',
  detail: (project: Types.Project) => `/${project.slug.current}`,
};

export const Collections = {
  detail: (collection: Types.Collection) => `/${collection.slug.current}`,
};
