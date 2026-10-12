interface ContactProfile {
  district?: string | null;
  area?: string | null;
  phoneNumber?: string | null;
}

const hasValue = (value: string | null | undefined): boolean =>
  typeof value === "string" && value.trim() !== "";

export const hasCompleteContactProfile = (profile: ContactProfile): boolean =>
  hasValue(profile.district) &&
  hasValue(profile.area) &&
  hasValue(profile.phoneNumber);
