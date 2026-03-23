import * as React from 'react';
import * as Utils from '@/lib/utils';

type TextProps = {
  [x: string]: unknown;
  as?: string;
  bold?: boolean;
  className?: string;
};

type TextComponent = React.FC<React.PropsWithChildren<TextProps>>;

const baseClasses = 'text-current';

const Base: React.FC<React.PropsWithChildren<{ defaultClasses: string } & TextProps>> = ({
  as = 'p',
  children,
  className,
  defaultClasses,
  ...props
}) => {
  return React.createElement(
    as,
    {
      className: Utils.cx(baseClasses, defaultClasses, className),
      ...props,
    },
    children,
  );
};

type TextStyle = {
  baseWeight: string;
  boldWeight: string;
};

const TextStyle = ({ bold, ...props }: TextProps, style: TextStyle) => {
  return (
    <Base
      defaultClasses={Utils.cx({
        [style.baseWeight]: !bold,
        [style.boldWeight]: !!bold,
      })}
      {...props}
    />
  );
};

export const Lead: TextComponent = (props) =>
  TextStyle(props, {
    baseWeight: 'type-lead',
    boldWeight: 'type-lead-bold',
  });

export const Heading: TextComponent = (props) =>
  TextStyle(props, {
    baseWeight: 'type-heading',
    boldWeight: 'type-heading-bold',
  });

export const Subheading: TextComponent = (props) =>
  TextStyle(props, {
    baseWeight: 'type-subheading',
    boldWeight: 'type-subheading-bold',
  });

export const Paragraph: TextComponent = (props) =>
  TextStyle(props, {
    baseWeight: 'type-paragraph',
    boldWeight: 'type-paragraph-bold',
  });

export const Body: TextComponent = (props) =>
  TextStyle(props, {
    baseWeight: 'type-body',
    boldWeight: 'type-body-bold',
  });

export const Detail: TextComponent = (props) =>
  TextStyle(props, {
    baseWeight: 'type-detail',
    boldWeight: 'type-detail-bold',
  });
