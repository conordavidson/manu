'use client';

import Link from 'next/link';

import * as Pt from '@portabletext/react';
import * as Text from '@/ui/text';
import * as Types from '@/lib/types';

type RichTextProps = {
  value: Types.RichText;
};

const RichText: React.FC<RichTextProps> = (props) => {
  return (
    <div className="rich-text">
      <Pt.PortableText components={Components} value={props.value} />
    </div>
  );
};

const Components: Partial<Pt.PortableTextReactComponents> = {
  block: {
    normal: (props) => {
      return <Text.Body>{props.children}</Text.Body>;
    },
    h1: (props) => {
      return (
        <Text.Heading as="h1" id={props.value._key}>
          {props.children}
        </Text.Heading>
      );
    },
    h2: (props) => {
      return (
        <Text.Subheading as="h2" id={props.value._key}>
          {props.children}
        </Text.Subheading>
      );
    },
    h3: (props) => {
      return (
        <Text.Paragraph as="h3" id={props.value._key}>
          {props.children}
        </Text.Paragraph>
      );
    },
    h4: (props) => {
      return <Text.Body bold>{props.children}</Text.Body>;
    },
  },
  list: {
    bullet: (props) => {
      return <ul>{props.children}</ul>;
    },
    number: (props) => {
      return <ol>{props.children}</ol>;
    },
  },

  marks: {
    em: (props) => {
      return <em>{props.children}</em>;
    },
    strong: (props) => {
      return <strong>{props.children}</strong>;
    },
  },
};

export default RichText;
