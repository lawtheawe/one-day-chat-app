import { format, isValid } from 'date-fns';

export const toHHmm = (isoDate: string) => {
  const date = new Date(isoDate);

  if (!isValid(date)) {
    return '';
  }

  return format(new Date(isoDate), 'HH:mm');
};
