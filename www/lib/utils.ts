import { twMerge } from 'tailwind-merge';

const addClass = (base: string, newClass: string) => {
  if (!newClass) return base;
  if (base === '') return newClass;
  return `${base} ${newClass}`;
};

type Class = null | Record<string, boolean> | string | undefined;

/*
Merges classnames together.
*/
export const cx = (...classes: Class[]) => {
  const combinedClasses = classes.reduce((toApply: string, newClass) => {
    if (!newClass) return toApply;
    if (typeof newClass === 'string') return addClass(toApply, newClass);
    return Object.keys(newClass).reduce((conditionals, className) => {
      if (!!newClass[className]) return addClass(conditionals, className);
      return conditionals;
    }, toApply);
  }, '');

  return twMerge(combinedClasses);
};

export const formatDateShort = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

export const formatDateRange = (startDate: string, endDate?: null | string) => {
  if (!endDate) return formatDateShort(startDate);
  return `${formatDateShort(startDate)} - ${formatDateShort(endDate)}`;
};
