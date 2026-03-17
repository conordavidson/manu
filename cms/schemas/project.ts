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
      description: 'The title of the site',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
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
      title: 'Images',
      type: 'array',
      of: [{ type: 'image' }],
    },
    {
      name: 'projectType',
      title: 'Project Type',
      type: 'string',
      options: {
        list: ['personal', 'commissioned'],
      },
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
  ],
});

export default Project;
