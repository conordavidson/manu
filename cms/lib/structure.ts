import * as SanityStructure from 'sanity/structure';
import * as Icons from './icons';

const structure: SanityStructure.StructureResolver = (S) => {
  return S.list()
    .title('Content')
    .items([
      /*
      This is the singleton document for the site settings.
      Only one instance of this document can exist.
      Its ID is 'settings'.
      */
      S.listItem()
        .title('Settings')
        .icon(Icons.Settings)
        .child(S.document().schemaType('settings').documentId('settings')),

      S.listItem()
        .title('Info')
        .icon(Icons.Info)
        .child(S.document().schemaType('info').documentId('info')),

      S.divider(),

      S.listItem().title('Projects').icon(Icons.Project).child(S.documentTypeList('project')),
    ]);
};

export default structure;
