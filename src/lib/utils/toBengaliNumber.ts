/**
 * Converts western digits in a number/string to Bengali (Bangla) numerals.
 *
 * Pure and server-safe — usable from Server Components with no
 * "use client" boundary. Falls back to the plain string form for
 * null/undefined/NaN input so callers never render "NaN" or "undefined".
 *
 * Example: 24 → "২৪", 0 → "০", NaN → "NaN" (string fallback)
 */
const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"] as const;

export function toBengaliNumber(value: number | string | null | undefined): string {
  if (value === null || value === undefined) return "";
  const asString = String(value);
  if (!Number.isFinite(Number(asString))) return asString;
  return asString.replace(/\d/g, (d) => BN_DIGITS[Number(d)]);
}
