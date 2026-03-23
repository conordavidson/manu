import CollectionsDetailView from '@/views/collections/detail';

import * as Navigation from 'next/navigation';
import * as Projects from '@/lib/projects';
import * as Sanity from '@/lib/sanity';

export const generateMetadata = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const collection = await Sanity.Collections.getBySlug(slug);
  if (!collection) return Navigation.notFound();

  return {
    title: collection.title,
    description: collection.metadata?.description,
    keywords: collection.metadata?.keywords,
    image: collection.coverImage ? Sanity.urlForImage(collection.coverImage) : null,
  };
};

export const generateStaticParams = async () => {
  const projects = await Sanity.Projects.index();
  return projects.map((project) => {
    return {
      slug: project.slug.current,
    };
  });
};

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const collection = await Sanity.Collections.getBySlug(slug);
  const globals = await Sanity.Globals.get();

  if (!collection) return Navigation.notFound();

  return <CollectionsDetailView collection={collection} globals={globals} />;
}
