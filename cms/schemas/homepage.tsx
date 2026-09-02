import * as Sanity from 'sanity';
import * as Icons from '../lib/icons';

const Homepage = Sanity.defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  icon: Icons.Homepage,
  preview: {
    prepare: () => ({
      title: 'Homepage',
    }),
  },
  fields: [
    {
      name: 'features',
      title: 'Features',
      type: 'array',
      validation: (Rule) => Rule.required(),
      of: [
        {
          name: 'Feature',
          type: 'object',
          preview: {
            select: {
              slides: 'slides',
              collectionTitle: 'collection.title',
            },
            prepare: ({ slides, collectionTitle }) => ({
              title: collectionTitle,
              subtitle: `${slides.length} slides`,
              media: Icons.Feature,
            }),
          },
          fields: [
            {
              name: 'collection',
              title: 'Collection',
              type: 'reference',
              to: [{ type: 'collection' }],
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'slides',
              title: 'Slides',
              type: 'array',
              of: [{ type: 'Slide' }],
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    },
  ],
});

export default Homepage;
