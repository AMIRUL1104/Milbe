/**
 * Shared list of the home-page filter query-param keys.
 *
 * Kept in one place so "clear all filters" logic in
 * ActiveFilterChips and FilterBottomSheet can never drift apart
 * (previously the bottom sheet only cleared category/condition).
 *
 * NOTE: `location` and `page` are intentionally NOT filter keys —
 * `location` is a navbar-managed preference, `page` is pagination.
 */
export const FILTER_KEYS = ["search", "category", "condition", "type"] as const;

export type FilterKey = (typeof FILTER_KEYS)[number];
