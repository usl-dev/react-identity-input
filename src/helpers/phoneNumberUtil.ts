import parsePhoneNumberFromString, {
  CountryCode,
  getExampleNumber,
} from "libphonenumber-js";
import examples from "libphonenumber-js/mobile/examples";

type PhoneNoLength = {
  minLength: number | null;
  maxLength: number | null;
};

/**
 * Given a country code, returns the minimum and maximum length
 * of the phone number in that country.
 *
 * @param {boolean} isNumber - Whether the input is a phone number.
 * @param {string} code - The country code.
 *
 * @returns {PhoneNoLength} - An object with minLength and maxLength, or
 * null if not found.
 */

export const getPhoneNoLength = (
  isNumber: boolean,
  code: string
): PhoneNoLength => {
  if (isNumber && code) {
    try {
      // Ensure countryCode is a valid CountryCode
      const country = code as CountryCode;

      // Get example number
      const exampleNumber = getExampleNumber(country, examples);

      // Ensure exampleNumber is valid
      const parsedNumber = exampleNumber?.number
        ? parsePhoneNumberFromString(exampleNumber.number, country)
        : null;

      if (parsedNumber) {
        return {
          minLength: parsedNumber.nationalNumber.length,
          maxLength: parsedNumber.nationalNumber.length,
        };
      }
    } catch (error) {
      console.error("Error getting phone number:", error);
    }
  }

  return { minLength: null, maxLength: null };
};
