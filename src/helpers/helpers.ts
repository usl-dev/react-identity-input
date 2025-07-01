import { countryList } from "@/assets/countryList";
import { Country } from "@/types/types";

/**
 * Builds a map of countries, keyed by their ISO 3166-1 alpha-2 code.
 * If no list is provided, the default country list is used.
 * @param {Country[]} [list] - List of countries to build the map from.
 * @returns {Record<string, Country>} - A map of countries.
 */

export const buildCountryMap = (
  list: Country[] = countryList
): Record<string, Country> => {
  return list?.reduce((acc, country) => {
    acc[country?.value] = country;
    return acc;
  }, {} as Record<string, Country>);
};

/**
 * Return an array of countries that are moved to the top of the list.
 * Countries with `highlight` are moved first, followed by countries with
 * `preferred` codes. If `preferred` is empty, all countries are moved.
 */

export const getMovedCountries = (
  countryList: Country[],
  countryMap: Record<string, Country>,
  highlight?: string[],
  preferred?: string[]
): Country[] => {
  const highlightSet = new Set(highlight);

  // Case 1: Only preferred is given
  if (preferred?.length && !highlight?.length) {
    return preferred
      .map((code) => countryMap[code])
      .filter(Boolean) as Country[];
  }

  // Case 2: Highlight is given
  if (highlight?.length) {
    const highlighted = highlight
      .map((code) => countryMap[code])
      .filter(Boolean) as Country[];

    let rest: Country[];

    if (preferred?.length) {
      // If preferred is present, remove duplicates from highlight
      rest = preferred
        .filter((code) => !highlightSet.has(code))
        .map((code) => countryMap[code])
        .filter(Boolean) as Country[];
    } else {
      // Use full list if no preferred
      rest = countryList.filter((c) => !highlightSet.has(c.value));
    }

    return [...highlighted, ...rest];
  }

  // Case 3: Neither preferred nor highlight is given
  return countryList;
};
