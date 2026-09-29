// শুধু নিজের সাইটের path-এ redirect করার অনুমতি দেয় (open redirect ঠেকাতে)
export function getSafeRedirect(
  value: string | null | undefined,
  fallback = "/",
) {
  if (!value) return fallback;
  if (
    !value.startsWith("/") ||
    value.startsWith("//") ||
    value.startsWith("/\\")
  ) {
    return fallback;
  }
  return value;
}
