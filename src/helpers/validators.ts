import { NUMBER_REGEX, NUMBER_REGEX_WITH_PLUS } from "@/assets/constants";

export const validateDigits = (value: string): boolean =>
  NUMBER_REGEX.test(value);

export const validatePhoneNumber = (value: string): boolean =>
  NUMBER_REGEX_WITH_PLUS.test(value);

export const validateNumberFollowedByEmail = (value: string): boolean => {
  if (!value) return false;

  // Check if the value starts with a digit
  const startsWithDigit = /^\d/.test(value);
  if (!startsWithDigit) return false;

  // Remove leading number(s)
  const rest = value.replace(/^\d+/, "");

  // Basic email validation (username@domain format)
  const emailLike = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    rest
  );

  return emailLike;
};
