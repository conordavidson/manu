import InfoView from '@/views/info';

import * as Sanity from '@/lib/sanity';

export const generateMetadata = async () => {
  const globals = await Sanity.Globals.get();

  return {
    title: `${globals.settings.title} · Info`,
  };
};
export default async function Page() {
  const info = await Sanity.Info.get();
  return <InfoView info={info} />;
}
