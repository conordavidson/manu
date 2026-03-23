import NextImage from 'next/image';

import * as Sanity from '@/lib/sanity';
import * as Types from '@/lib/types';

type ImageBaseProps = Omit<
  React.ComponentProps<typeof NextImage>,
  'alt' | 'height' | 'src' | 'width'
>;

type ImageProps = {
  image: {
    _type: 'image' | 'richImage';
    asset?: null | Types.Sanity.SanityImageAsset;
    crop?: Types.Sanity.SanityImageCrop;
    hotspot?: Types.Sanity.SanityImageHotspot;
  };
} & ImageBaseProps;

export const Image: React.FC<ImageProps> = (props) => {
  if (!props.image.asset) throw new Error('Image asset is required');

  const url = Sanity.urlForImage(props.image.asset);

  return (
    <NextImage
      {...props}
      alt={props.image.asset.altText ?? 'Image'}
      height={props.image.asset.metadata!.dimensions!.height}
      // placeholder="blur"
      // blurDataURL={props.image.asset.metadata!.lqip}
      src={url.toString()}
      width={props.image.asset.metadata!.dimensions!.width}
    />
  );
};

export default Image;
