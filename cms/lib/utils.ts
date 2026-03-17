import * as Sanity from 'sanity';

export const toPlainText = (blocks?: Sanity.PortableTextBlock[], maxLength = 200): string => {
  if (!blocks) return 'No content';

  const text = blocks
    .filter((block): block is Sanity.PortableTextBlock => block._type === 'block')
    .map((block) => (block.children as { text: string }[])?.map((child) => child.text).join(''))
    .join(' ');

  if (!text) return 'No content';

  return text.slice(0, maxLength);
};
