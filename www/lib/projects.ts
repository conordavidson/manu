import * as Types from '@/lib/types';

export const getCoverImage = (project: Types.Project) => {
  if (project.coverImage) return project.coverImage;
  if (project.images && project.images.length > 0) return project.images[0];
  throw new Error(`No cover image found for project ${project._id}`);
};
