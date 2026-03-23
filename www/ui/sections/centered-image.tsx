import Image from '@/ui/image';

import * as Page from '@/ui/page';
import * as Text from '@/ui/text';
import * as Types from '@/lib/types';

type CenteredImageProps = {
  section: Types.CenteredImageSection;
};

const CenteredImage: React.FC<CenteredImageProps> = (props) => {
  return (
    <section className="centered-image pt-head" id={props.section._key}>
      <Page.EditorialContainer>
        <div className="text-center mx-auto max-w-[400px]">
          <Text.Heading>{props.section.heading}</Text.Heading>
          {props.section.subheading && (
            <Text.Subheading className="mt-1 text-muted">
              {props.section.subheading}
            </Text.Subheading>
          )}
        </div>
        <div className="pt-6 relative aspect-4/3">
          <Image className="h-full w-full object-cover" image={props.section.image} />
        </div>
        <div className="mt-1">
          <Text.Detail>{props.section.heading}</Text.Detail>
        </div>
      </Page.EditorialContainer>
    </section>
  );
};

export default CenteredImage;
