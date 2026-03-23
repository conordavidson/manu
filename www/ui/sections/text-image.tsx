import Image from '@/ui/image';
import RichText from '@/ui/rich-text';

import * as Button from '@/ui/button';
import * as Page from '@/ui/page';
import * as Text from '@/ui/text';
import * as Types from '@/lib/types';

type TextImageProps = {
  section: Types.TextImageSection;
};

const TextImage: React.FC<TextImageProps> = (props) => {
  return (
    <section className="@container text-image" id={props.section._key}>
      <Page.Container className="grid grid-cols-12 gap-x-6 gap-y-4">
        <div className="col-span-12 order-2 sm:order-1 sm:col-span-6 flex items-center">
          <div>
            <div className="max-w-[400px]">
              <Text.Heading>{props.section.heading}</Text.Heading>
              <Text.Subheading className="mt-2 text-subdued text-balance">
                {props.section.subheading}
              </Text.Subheading>
            </div>
            <div className="mt-6 max-w-[400px]">
              <RichText value={props.section.content} />
            </div>
            {props.section.cta && (
              <div className="mt-8">
                <Button.Primary inline link={props.section.cta}>
                  {props.section.cta.label}
                </Button.Primary>
              </div>
            )}
          </div>
        </div>
        <div className="col-span-12 order-1 sm:order-2 sm:col-span-6">
          <div className="relative aspect-4/3">
            <Image className="h-full w-full object-cover" image={props.section.image} />
          </div>
        </div>
      </Page.Container>
    </section>
  );
};

export default TextImage;
