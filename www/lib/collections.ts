import * as Projects from '@/lib/projects';
import * as Types from '@/lib/types';

export const getCoverImage = (collection: Types.Collection) => {
  if (collection.coverImage) return collection.coverImage;
  if (collection.projects && collection.projects.length > 0)
    return Projects.getCoverImage(collection.projects[0]);

  return null;
};
