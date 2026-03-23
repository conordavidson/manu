import InfoView from '@/views/info';

import * as Next from 'next';
import * as Sanity from '@/lib/sanity';

export const metadata: Next.Metadata = {
  title: 'Info',
};

export default async function Page() {
  const info = await Sanity.Info.get();
  return <InfoView info={info} />;
}
