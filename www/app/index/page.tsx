import WorkIndexView from '@/views/work';

import * as Next from 'next';
import * as Sanity from '@/lib/sanity';

export const metadata: Next.Metadata = {
  title: 'Projects',
};

export default async function Page() {
  const globals = await Sanity.Globals.get();
  const projects = await Sanity.Projects.index();

  return <WorkIndexView globals={globals} projects={projects} />;
}
