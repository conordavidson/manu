import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: 'xrxtnkrx',
    dataset: 'production',
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
    appId: 'xh4l6lpzz5garuo7wnumfu4z',
  },
  typegen: {
    path: '../www/lib/sanity/queries.ts',
    schema: './schema.json',
    generates: '../www/lib/sanity/types.ts',
  },
});
