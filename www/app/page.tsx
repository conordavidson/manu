import HomeView from '@/views/home';

import * as Sanity from '@/lib/sanity';

export default async function Page() {
  const homepage = await Sanity.Homepage.get();
  return <HomeView homepage={homepage} />;
}
