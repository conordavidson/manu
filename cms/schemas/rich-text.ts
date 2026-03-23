import * as Sanity from 'sanity';
import * as Icons from '../lib/icons';

/*
This is a richtext field that can be used to display text with basic formatting.
It supports bold, italic, underline, and links. It's useful for things like
announcements and other simple text content.
*/
export const Base = Sanity.defineType({
  name: 'richTextBase',
  title: 'Base Rich Text',
  type: 'array',
  icon: Icons.Richtext,
  of: [
    {
      type: 'block',
      styles: [{ title: 'Normal', value: 'normal' }],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Underline', value: 'underline' },
        ],
        annotations: [],
      },
      lists: [],
    },
  ],
});

/*
This is a simple richtext field that can be used to display text with basic formatting.
It supports bold, italic, underline, and links. It's useful for things like
announcements and other simple text content.
*/
export const Simple = Sanity.defineType({
  name: 'richTextSimple',
  title: 'Simple Rich Text',
  type: 'array',
  icon: Icons.Richtext,
  of: [
    {
      type: 'block',
      styles: [{ title: 'Normal', value: 'normal' }],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Underline', value: 'underline' },
        ],
        annotations: [
          {
            type: 'object',
            name: 'link',
            fields: [
              {
                name: 'href',
                title: 'Href',
                type: 'url',
                validation: (Rule) =>
                  Rule.required().uri({
                    scheme: ['http', 'https', 'mailto', 'tel'],
                  }),
              },
            ],
          },
        ],
      },
      lists: [],
    },
  ],
});

export default Simple;
