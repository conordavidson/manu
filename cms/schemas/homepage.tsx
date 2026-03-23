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
              of: [
                {
                  name: 'Slide',
                  type: 'object',
                  preview: {
                    select: {
                      imageName1: 'images.0.asset.originalFilename',
                      imageName2: 'images.1.asset.originalFilename',
                      image1: 'images.0',
                    },
                    prepare: ({ imageName1, imageName2, image1 }) => {
                      const isTwoUp = imageName1 && imageName2;

                      const getMedia = () => {
                        if (isTwoUp) return Icons.TwoUp;
                        return image1;
                      };

                      const subtitle = [imageName1, imageName2].filter(Boolean).join(', ');
                      return {
                        title: 'Slide',
                        subtitle,
                        media: getMedia(),
                      };
                    },
                  },
                  fields: [
                    {
                      name: 'images',
                      title: 'Images',
                      type: 'array',
                      of: [{ type: 'image' }],
                      validation: (Rule) =>
                        Rule.required()
                          .min(1)
                          .max(2)
                          .error(
                            'At least one image is required and at most two images are allowed',
                          ),
                    },
                  ],
                },
              ],
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    },
  ],
});

export default Homepage;
