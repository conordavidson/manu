import * as Types from '@/lib/types';

export const getCoverImage = (project: Types.Project) => {
  if (project.coverImage) return project.coverImage;
  for (const media of project.images ?? []) {
    if (media._type === 'image') return media;
    if (media.images?.[0]) return media.images[0];
  }
  throw new Error(`No cover image found for project ${project._id}`);
};
