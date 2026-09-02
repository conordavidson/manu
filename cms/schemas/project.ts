import * as Sanity from 'sanity';
import * as Icons from '../lib/icons';

const Project = Sanity.defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: Icons.Project,
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
      name: 'year',
      title: 'Year',
      type: 'number',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
    },
    {
      name: 'client',
      title: 'Client',
      type: 'string',
    },
    {
      name: 'images',
      title: 'Images / Slides',
      type: 'array',
      of: [{ type: 'image' }, { type: 'Slide' }],
    },
    {
      name: 'projectType',
      title: 'Project Type',
      type: 'string',
      options: {
        list: ['personal', 'commissioned'],
      },
      initialValue: 'personal',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'richTextSimple',
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

export default Project;
