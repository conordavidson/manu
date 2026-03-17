import * as SanityClient from '@sanity/client';
import * as SanityImage from '@sanity/image-url';

import * as Queries from '@/lib/sanity/queries';
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

export const Articles = {
  index: () => client.fetch(Queries.INDEX_ARTICLES_QUERY),
  getBySlug: (slug: string) => client.fetch(Queries.GET_ARTICLE_BY_SLUG_QUERY, { slug }),
};

export const Pages = {
  index: () => client.fetch(Queries.INDEX_PAGES_QUERY),
  getBySlug: (slug: string) => client.fetch(Queries.GET_PAGE_BY_SLUG_QUERY, { slug }),
};

export const Events = {
  index: () => client.fetch(Queries.INDEX_EVENTS_QUERY),
  upcoming: () => client.fetch(Queries.INDEX_UPCOMING_EVENTS_QUERY),
  getBySlug: (slug: string) => client.fetch(Queries.GET_EVENT_BY_SLUG_QUERY, { slug }),
};
