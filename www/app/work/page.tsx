import WorkIndexView from '@/views/work';

import * as Sanity from '@/lib/sanity';

export const generateMetadata = async () => {
  const globals = await Sanity.Globals.get();

  return {
    title: `${globals.settings.title} · Index`,
  };
};

export default async function Page() {
  const collections = await Sanity.Collections.index();
  const globals = await Sanity.Globals.get();
  const projects = await Sanity.Projects.index();

  return <WorkIndexView collections={collections} globals={globals} projects={projects} />;
}
