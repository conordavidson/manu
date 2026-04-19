import Link from 'next/link';
import RichText from '@/ui/rich-text';
import Image from '@/ui/image';

import * as Page from '@/ui/page';
import * as React from 'react';
import * as Text from '@/ui/text';
import * as Types from '@/lib/types';

type InfoViewProps = {
  info: Types.Info;
};

const InfoView: React.FC<InfoViewProps> = (props) => {
  return (
    <Page.Container className="relative grid grid-cols-5 gap-8 mb-foot">
      <div className="col-span-full md:col-span-2 lg:col-span-1">
        <div>
          <Link
            className="text-subdued hover:text-foreground transition-colors"
            href="mailto:manupbsl@gmail.com"
          >
            <Text.Body>manupbsl@gmail.com</Text.Body>
          </Link>
          <Link
            className="text-subdued hover:text-foreground transition-colors"
            href="tel:+19176911275"
          >
            <Text.Body>USA +1 (917) 691-1275</Text.Body>
          </Link>
          <Link
            className="text-subdued hover:text-foreground transition-colors"
            href="tel:+5511996050071"
          >
            <Text.Body>BRA +55 (11) 99605-0071</Text.Body>
          </Link>
        </div>
        <div className="mt-4 max-w-lg">
          <Image image={props.info.bioImage} sizes="500px" />
        </div>
      </div>
      <div className="col-span-full md:col-span-3 lg:col-span-2">
        <div className="max-w-lg">
          <RichText value={props.info.description} />
        </div>
      </div>
      <div className="space-y-8 col-span-full md:col-span-2 lg:col-span-1">
        <div>
          <Text.Body bold>Education</Text.Body>
          <div className="mt-4 space-y-4">
            {props.info.education?.map((education) => (
              <div key={education._key}>
                <RichText value={education.item} />
              </div>
            ))}
          </div>
        </div>
        <div>
          <Text.Body bold>Group Shows</Text.Body>
          <div className="mt-4 space-y-4">
            {props.info.groupShows?.map((groupShow) => (
              <div key={groupShow._key}>
                <RichText value={groupShow.name} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-8 col-span-full md:col-span-2 lg:col-span-1">
        <div>
          <Text.Body bold>Press</Text.Body>
          <ul className="mt-4">
            {props.info.pressItems?.map((pressItem) => {
              if (!pressItem.href)
                return (
                  <li className="text-subdued" key={pressItem._key}>
                    <RichText value={pressItem.title} />
                  </li>
                );

              return (
                <li
                  className="text-subdued hover:text-foreground transition-colors"
                  key={pressItem._key}
                >
                  <Link href={pressItem.href} target="_blank">
                    <RichText value={pressItem.title} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <Text.Body bold>Contact</Text.Body>
          <div className="mt-4">
            <RichText value={props.info.contact} />
          </div>
        </div>
      </div>
    </Page.Container>
  );
};

export default InfoView;
