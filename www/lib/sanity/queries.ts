import { defineQuery } from 'groq';

const IMAGE_QUERY = `
  ...,
  asset -> {
    ...
  }
`;

const RICHTEXT_QUERY = `
  ...,
  markDefs[] {
    ...,
  }
`;

const SETTINGS_QUERY = `
  ...
`;

const INFO_QUERY = `
  ...,
  bioImage {
    ${IMAGE_QUERY}
  }
`;

const PROJECT_QUERY = `
  ...,
  images[] {
    ${IMAGE_QUERY}
  },
  coverImage {
    ${IMAGE_QUERY}
  },
  description[] {
    ${RICHTEXT_QUERY}
  }
`;

const COLLECTION_QUERY = `
  ...,
  projects[] -> {
    ${PROJECT_QUERY}
  },
  coverImage {
    ${IMAGE_QUERY}
  }
`;

const SLIDE_QUERY = `
  ...,
  images[] {
    ${IMAGE_QUERY}
  }
`;

const FEATURE_QUERY = `
  ...,
  slides[] {
    ${SLIDE_QUERY}
  },
  collection -> {
    ${COLLECTION_QUERY}
  }
`;

const HOMEPAGE_QUERY = `
  ...,
  features[] {
    ${FEATURE_QUERY}
  }
`;

export const INDEX_PROJECTS_QUERY = defineQuery(
  `*[_type == "project"] | order(year desc) { ${PROJECT_QUERY} }`,
);

export const GET_PROJECT_BY_SLUG_QUERY = defineQuery(
  `*[_type == "project" && slug.current == $slug][0] { ${PROJECT_QUERY} }`,
);

export const GET_SETTINGS_QUERY = defineQuery(
  `*[_type == "settings" && _id == "settings"][0] { ${SETTINGS_QUERY} }`,
);

export const GET_INFO_QUERY = defineQuery(
  `*[_type == "info" && _id == "info"][0] { ${INFO_QUERY} }`,
);

export const GET_COLLECTION_BY_SLUG_QUERY = defineQuery(
  `*[_type == "collection" && slug.current == $slug][0] { ${COLLECTION_QUERY} }`,
);

export const INDEX_COLLECTIONS_QUERY = defineQuery(
  `*[_type == "collection"] | order(title asc) { ${COLLECTION_QUERY} }`,
);

export const GET_HOMEPAGE_QUERY = defineQuery(
  `*[_type == "homepage" && _id == "homepage"][0] { ${HOMEPAGE_QUERY} }`,
);
