import Image from '@/ui/image';

import * as Text from '@/ui/text';
import * as Types from '@/lib/types';

type FullWidthImageProps = {
  section: Types.FullWidthImageSection;
};

const FullWidthImage: React.FC<FullWidthImageProps> = (props) => {
  return (
    <section className="@container full-width-image relative" id={props.section._key}>
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-16 text-center">
        <div className="max-w-[400px]">
          <Text.Heading>{props.section.heading}</Text.Heading>
          <Text.Subheading className="mt-2 text-subdued text-balance">
            {props.section.subheading}
          </Text.Subheading>
        </div>
      </div>
      <div className="relative w-full h-[600px]">
        <Image
          className="h-full w-full object-cover mix-blend-multiply"
          image={props.section.image}
        />
      </div>
    </section>
  );
};

export default FullWidthImage;
