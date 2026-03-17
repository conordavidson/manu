import * as Icons from '../lib/icons';
import * as Sanity from 'sanity';
import * as Utils from '../lib/utils';

/*
This will live as a singleton document in the CMS. It's used to define the
site settings.
*/
const Settings = Sanity.defineType({
  name: 'info',
  title: 'Info',
  description: 'Info for the site',
  type: 'document',
  icon: Icons.Info,
  preview: {
    prepare: () => ({
      title: 'Info',
    }),
  },
  fields: [
    {
      name: 'description',
      title: 'Description',
      description: 'The description of the site. This will be displayed in the meta tags.',
      type: 'richTextSimple',
    },
    {
      name: 'education',
      title: 'Education',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'education',
          icon: Icons.Education,
          preview: {
            select: {
              item: 'item',
            },
            prepare: ({ item }) => ({
              title: Utils.toPlainText(item),
            }),
          },
          fields: [
            {
              name: 'item',
              title: 'Education Item',
              type: 'richTextSimple',
            },
          ],
        },
      ],
    },
    {
      name: 'groupShows',
      title: 'Group Show',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'groupShow',
          icon: Icons.GroupShow,
          preview: {
            select: {
              name: 'name',
            },
            prepare: ({ name }) => ({
              title: Utils.toPlainText(name),
            }),
          },
          fields: [
            {
              name: 'name',
              title: 'Group Show',
              type: 'richTextSimple',
            },
          ],
        },
      ],
    },
    {
      name: 'pressItems',
      title: 'Selected Press',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'press',
          icon: Icons.Press,
          preview: {
            select: {
              title: 'title',
            },
            prepare: ({ title }) => ({
              title: Utils.toPlainText(title),
            }),
          },
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'richTextSimple',
            },
            {
              name: 'href',
              title: 'Url',
              type: 'url',
            },
          ],
        },
      ],
    },
    {
      name: 'contact',
      title: 'Contact',
      type: 'richTextSimple',
    },
  ],
});

export default Settings;
