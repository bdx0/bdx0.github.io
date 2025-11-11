import { format } from 'date-fns';

export default function DateComponent({ date }: { date: string | Date }) {
  if (!date) {
    return null;
  }
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return <time dateTime={dateObj.toISOString()}>{format(dateObj, 'LLLL d, yyyy')}</time>;
}
