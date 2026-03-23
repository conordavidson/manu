import * as Queries from '@/lib/sanity/queries';
import * as SanityClient from '@sanity/client';
import * as SanityImage from '@sanity/image-url';
import * as Types from '@/lib/types';

export const client = SanityClient.createClient({
  projectId: 'xrxtnkrx',
  dataset: 'production',
  apiVersion: '2025-11-17',
  useCdn: false,
});

export const imageBuilder = SanityImage.createImageUrlBuilder(client);

export const urlForImage = (source: SanityImage.SanityImageSource) => {
  return imageBuilder.image(source);
};

/*
This returns the information needed on all pages.

This information is piped through a lof of this application, so I create a new
shape called "Globals" so I only have to update the type in one place.
*/
export const Globals = {
  get: async (): Promise<Types.Globals> => {
    const settings = await client.fetch(Queries.GET_SETTINGS_QUERY);
    if (!settings) throw new Error('No settings found');
    return {
      settings,
    };
  },
};

export const Collections = {
  index: () => client.fetch(Queries.INDEX_COLLECTIONS_QUERY),
  getBySlug: (slug: string) => client.fetch(Queries.GET_COLLECTION_BY_SLUG_QUERY, { slug }),
};

export const Projects = {
  index: () => client.fetch(Queries.INDEX_PROJECTS_QUERY),
  getBySlug: (slug: string) => client.fetch(Queries.GET_PROJECT_BY_SLUG_QUERY, { slug }),
};

export const Info = {
  get: async (): Promise<Types.Info> => {
    const info = await client.fetch(Queries.GET_INFO_QUERY);
    if (!info) throw new Error('No info found');
    return info;
  },
};

export const Homepage = {
  get: async (): Promise<Types.Homepage> => {
    const homepage = await client.fetch(Queries.GET_HOMEPAGE_QUERY);
    if (!homepage) throw new Error('No homepage found');
    return homepage;
  },
};
