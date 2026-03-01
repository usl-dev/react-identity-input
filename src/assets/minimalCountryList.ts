import type { Country } from "@/types/types";
import { DEFAULT_COUNTRY_CODE } from "./constants";

/**
 * Minimal list for initial render and default country; full list is lazy-loaded.
 * Keeps default country (IN) and common fallback (US) in the main bundle.
 */
export const minimalCountryList: Country[] = [
  { value: "IN", label: "India", dial_code: "+91", image: "" },
  { value: "US", label: "United States", dial_code: "+1", image: "" },
];

export const getDefaultCountryFromMinimal = (): Country =>
  minimalCountryList.find((c) => c.value === DEFAULT_COUNTRY_CODE) ??
  minimalCountryList[0];
