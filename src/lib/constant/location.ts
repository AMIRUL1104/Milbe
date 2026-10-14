import { DISTRICT_VALUES } from "./districts";

export {
  DISTRICT_OPTIONS,
  DISTRICT_VALUES,
  DEFAULT_DISTRICT,
  getDistrictLabelBn,
  normalizeDistrict,
  isDistrictValue,
} from "./districts";
export type { DistrictValue } from "./districts";

/**
 * @deprecated Use DISTRICT_OPTIONS / DISTRICT_VALUES from `./districts`.
 * Derived from DISTRICT_VALUES so the two can never drift.
 */
export const DISTRICTS: readonly string[] = DISTRICT_VALUES;
