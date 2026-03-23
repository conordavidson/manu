import * as Types from '@/lib/types';

export const isEmpty = (value: Types.RichText) => {
  if (!value) return true;
  if (value.length === 0) return true;
  if (value.every((block) => block.children?.every((child) => child.text === ''))) return true;
  return false;
};
