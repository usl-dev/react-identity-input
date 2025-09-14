import parsePhoneNumberFromString, {
  AsYouType,
  CountryCode,
  getExampleNumber,
} from "libphonenumber-js";
import examples from "libphonenumber-js/mobile/examples";

type PhoneNoLength = {
  min: number | null;
  max: number | null;
};

/**
 * Given a country code, returns the minimum and maximum length
 * of the phone number in that country.
 *
 * @param {boolean} isNumber - Whether the input is a phone number.
 * @param {string} code - The country code.
 *
 * @returns {PhoneNoLength} - An object with min and max, or
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
          min: parsedNumber.nationalNumber.length,
          max: parsedNumber.nationalNumber.length,
        };
      }
    } catch (error) {
      console.error("Error getting phone number:", error);
    }
  }

  return { min: null, max: null };
};

export const getCountryCode = (number: string): string => {
  try {
    if (!number) return "";
    const asYouType = new AsYouType();
    asYouType.input(number);
    return asYouType.country ? asYouType.country : "";
  } catch (error) {
    console.error("Error getting country calling code:", error);
    return "";
  }
};

/**
 * Formats a phone number using the AsYouType formatter
 * @param phoneNumber - The phone number to format
 * @param dialCode - The country dial code (e.g., "+1")
 * @param countryCode - The country code (e.g., "US")
 * @returns Formatted phone number string
 */
export const formatPhoneNumber = (
  phoneNumber: string,
  dialCode: string,
  countryCode?: string
): string => {
  try {
    if (!phoneNumber) return "";

    const asYouType = countryCode
      ? new AsYouType(countryCode as CountryCode)
      : new AsYouType();
    const fullNumber = phoneNumber.startsWith(dialCode)
      ? phoneNumber
      : `${dialCode}${phoneNumber.replace(/[^\d]/g, "")}`;

    return asYouType.input(fullNumber);
  } catch (error) {
    console.error("Error formatting phone number:", error);
    return phoneNumber;
  }
};

/**
 * Formats a phone number with custom dial code spacing
 * @param phoneNumber - The raw phone number digits
 * @param dialCode - The country dial code
 * @param enableFormatting - Whether to apply formatting
 * @param countryCode - The country code for better formatting
 * @returns Formatted phone number with dial code and space
 */
export const formatPhoneWithDialCode = (
  phoneNumber: string,
  dialCode: string,
  enableFormatting: boolean = true,
  countryCode?: string
): string => {
  try {
    const cleanNumber = phoneNumber ? phoneNumber.replace(/[^\d]/g, "") : "";

    // If no clean number, return just dial code with space
    if (!cleanNumber) return `${dialCode} `;

    if (!enableFormatting) {
      return `${dialCode} ${cleanNumber}`;
    }

    const asYouType = countryCode
      ? new AsYouType(countryCode as CountryCode)
      : new AsYouType();
    const formatted = asYouType.input(`${dialCode}${cleanNumber}`);

    // Ensure the formatted number starts with dial code and space
    if (formatted.startsWith(dialCode)) {
      return formatted.replace(dialCode, `${dialCode} `);
    }

    return `${dialCode} ${cleanNumber}`;
  } catch (error) {
    console.error("Error formatting phone with dial code:", error);
    return `${dialCode} ${phoneNumber || ""}`;
  }
};

/**
 * Validates if a string looks like a phone number
 * @param input - The input string to validate
 * @returns boolean indicating if it looks like a phone number
 */
export const looksLikePhoneNumber = (input: string): boolean => {
  if (!input) return false;

  // Check if it starts with +, digits, or contains only digits and common phone separators
  return /^[+\d]/.test(input) || /^[\d\s\-\(\)]+$/.test(input);
};

/**
 * Extracts clean digits from a phone number string
 * @param phoneNumber - The phone number string
 * @returns String containing only digits
 */
export const extractDigits = (phoneNumber: string): string => {
  return phoneNumber ? phoneNumber.replace(/[^\d]/g, "") : "";
};
