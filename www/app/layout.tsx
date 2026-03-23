import './globals.css';

import Navigation from '@/ui/navigation';

import * as Sanity from '@/lib/sanity';

export const generateMetadata = async () => {
  const globals = await Sanity.Globals.get();

  return {
    title: globals.settings.title,
    description: globals.settings.description,
  };
};

const RootLayout: React.FC<React.PropsWithChildren> = async (props) => {
  const globals = await Sanity.Globals.get();
  const projects = await Sanity.Projects.index();

  return (
    <html lang="en">
      <body>
        <Navigation globals={globals} projects={projects} />
        <main>{props.children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
