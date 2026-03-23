import Link from '@/ui/link';

import * as Text from '@/ui/text';
import * as Utils from '@/lib/utils';

export type BaseProps = React.PropsWithChildren<
  {
    className?: string;
    disabled?: boolean;
    inline?: boolean;
    label?: React.ReactNode | string;
    size?: 'default' | 'large' | 'small';
  } & (ButtonProps | React.ComponentProps<typeof Link> | SubmitButtonProps)
>;

type ButtonProps = {
  onClick: () => void;
  type?: 'button';
};

type SubmitButtonProps = {
  onClick?: () => void;
  type: 'submit';
};

const Base: React.FC<BaseProps> = (props) => {
  const className = Utils.cx(
    `inline-flex items-center justify-center min-w-[160px] whitespace-nowrap enabled:cursor-pointer transition-colors disabled:pointer-events-none rounded-lg border px-8`,
    {
      'w-full': !props.inline,
      'w-min': !!props.inline,
      'h-small-button-height': props.size === 'small',
      'h-button-height-default': !props.size || props.size === 'default',
      'h-large-button-height': props.size === 'large',
    },
    props.className,
  );

  const label = () => {
    if (!props.label) return null;

    if (typeof props.label === 'string') {
      return (
        <Text.Body bold key="label">
          {props.label}
        </Text.Body>
      );
    }

    return props.label;
  };

  const children = () => {
    if (!props.children) return null;

    if (typeof props.children === 'string') {
      return (
        <Text.Body bold key="children">
          {props.children}
        </Text.Body>
      );
    }

    return props.children;
  };

  const content = () => {
    return children() || label();
  };

  if ('link' in props) {
    return (
      <Link className={className} link={props.link}>
        {content()}
      </Link>
    );
  }

  if ('href' in props) {
    return (
      <Link className={className} href={props.href} target={props.target}>
        {content()}
      </Link>
    );
  }

  /* eslint-disable */
  const { inline, size, label: _label, className: _className, ...propsWithoutAttrs } = props;

  return (
    <button
      {...propsWithoutAttrs}
      type={props.type || 'button'}
      className={className}
      disabled={props.disabled}
      onClick={() => {
        if (props.disabled) return;
        if (props.onClick) props.onClick();
      }}
    >
      {content()}
    </button>
  );
};

export const Primary: React.FC<BaseProps> = (props) => {
  return (
    <Base
      {...props}
      className={Utils.cx(
        'bg-primary text-background transition-opacity hover:opacity-70',
        props.className,
      )}
    />
  );
};

export const Secondary: React.FC<BaseProps> = (props) => {
  return (
    <Base
      {...props}
      className={Utils.cx(
        'text-foreground bg-muted border-transparent transition-opacity hover:opacity-70',
        props.className,
      )}
    />
  );
};

export const Tertiary: React.FC<BaseProps> = (props) => {
  return (
    <Base
      {...props}
      className={Utils.cx(
        'text-foreground border-line hover:bg-muted bg-transparent transition-colors',
        props.className,
      )}
    />
  );
};

export const Ghost: React.FC<BaseProps> = (props) => {
  const isDefaultSize = !props.size || props.size === 'default';

  return (
    <Base
      {...props}
      className={Utils.cx(
        'text-foreground hover:bg-muted min-w-0 border-transparent bg-transparent transition-colors',
        {
          '-ml-2 px-2': props.size === 'small',
          '-ml-3 px-3': isDefaultSize,
          '-ml-4 px-4': props.size === 'large',
        },
        props.className,
      )}
    />
  );
};

export type ButtonVariantProps = BaseProps & {
  variant: 'primary' | 'secondary' | 'tertiary' | 'ghost';
};

export const Variant: React.FC<ButtonVariantProps> = (props) => {
  if (props.variant === 'primary') return <Primary {...props} />;
  if (props.variant === 'secondary') return <Secondary {...props} />;
  if (props.variant === 'tertiary') return <Tertiary {...props} />;
  if (props.variant === 'ghost') return <Ghost {...props} />;
  return null;
};
