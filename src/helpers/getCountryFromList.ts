import { countryList } from "@/assets/countryList";
import { Country } from "@/types/types";

export const getCountryFromList = (
  code: string,
  list: Country[] = countryList
): Country | undefined => {
  return list?.find((c) => c?.value === code);
};
