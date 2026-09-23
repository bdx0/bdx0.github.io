import { formatDateOnly, normalizeDateOnly } from "@/lib/date";

export default function DateComponent({ date }: { date: string | Date }) {
  const normalized = normalizeDateOnly(date);
  if (!normalized) return null;

  return <time dateTime={normalized}>{formatDateOnly(normalized)}</time>;
}
