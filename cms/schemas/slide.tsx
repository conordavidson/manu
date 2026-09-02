import * as Sanity from 'sanity';
import * as Icons from '../lib/icons';

const Slide = Sanity.defineType({
  name: 'Slide',
  title: 'Slide',
  type: 'object',
  preview: {
    select: {
      imageName1: 'images.0.asset.originalFilename',
      imageName2: 'images.1.asset.originalFilename',
      image1: 'images.0',
    },
    prepare: ({ imageName1, imageName2, image1 }) => {
      const isTwoUp = imageName1 && imageName2;

      return {
        title: 'Slide',
        subtitle: [imageName1, imageName2].filter(Boolean).join(', '),
        media: isTwoUp ? Icons.TwoUp : image1,
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
          .error('At least one image is required and at most two images are allowed'),
    },
  ],
});

export default Slide;
