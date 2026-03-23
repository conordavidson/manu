import * as Sanity from '@/lib/sanity/types';
export * as Sanity from '@/lib/sanity/types';

export type Globals = {
  settings: Settings;
};

export type Collection = NonNullable<Sanity.GET_COLLECTION_BY_SLUG_QUERY_RESULT>;

export type Project = NonNullable<Sanity.GET_PROJECT_BY_SLUG_QUERY_RESULT>;

export type RichText = NonNullable<
  NonNullable<Sanity.GET_PROJECT_BY_SLUG_QUERY_RESULT>['description']
>;

export type RichTextSimple = NonNullable<Sanity.GET_INFO_QUERY_RESULT>['description'];

export type Info = NonNullable<Sanity.GET_INFO_QUERY_RESULT>;

export type Settings = NonNullable<Sanity.GET_SETTINGS_QUERY_RESULT>;

export type Homepage = NonNullable<Sanity.GET_HOMEPAGE_QUERY_RESULT>;

export type HomepageFeature = Homepage['features'][number];

export type HomepageSlide = HomepageFeature['slides'][number];
