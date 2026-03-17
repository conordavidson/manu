import * as Sanity from 'sanity';
import * as Icons from '../lib/icons';

/*
This will live as a singleton document in the CMS. It's used to define the
site settings.
*/
const Settings = Sanity.defineType({
  name: 'settings',
  title: 'Settings',
  description: 'Settings for the site',
  type: 'document',
  icon: Icons.Settings,
  preview: {
    prepare: () => ({
      title: 'Settings',
    }),
  },
  fields: [
    {
      name: 'title',
      description: 'The title of the site',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      description: 'The description of the site. This will be displayed in the meta tags.',
      type: 'text',
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
    },
  ],
});

export default Settings;
