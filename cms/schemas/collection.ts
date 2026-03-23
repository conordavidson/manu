import * as Sanity from 'sanity';
import * as Icons from '../lib/icons';

const Collection = Sanity.defineType({
  name: 'collection',
  title: 'Collection',
  type: 'document',
  icon: Icons.Collection,
  preview: {
    select: {
      title: 'title',
      projects: 'projects',
    },
    prepare: ({ title, projects }) => ({
      title,
      subtitle: `${projects.length} projects`,
      media: Icons.Collection,
    }),
  },
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'projects',
      title: 'Projects',
      type: 'array',
      of: [
        {
          type: 'reference',
          title: 'Project',
          to: [{ type: 'project' }],
        },
      ],
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
    },
    {
      name: 'metadata',
      title: 'Metadata',
      type: 'object',
      fields: [
        {
          name: 'description',
          title: 'Description',
          type: 'richTextSimple',
        },
        {
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          of: [{ type: 'string' }],
        },
      ],
    },
  ],
});

export default Collection;
