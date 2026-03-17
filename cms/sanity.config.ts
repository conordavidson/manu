import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { media } from 'sanity-plugin-media';

import Schemas from './schemas';
import Structure from './lib/structure';

export default defineConfig({
  name: 'default',
  title: 'Manu',

  projectId: 'xrxtnkrx',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: Structure,
    }),
    ...(process.env.NODE_ENV === 'development' ? [visionTool()] : []),
    media(),
  ],

  schema: {
    types: Schemas,
  },
});
