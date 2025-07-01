import { useRef, useState } from "react";
import { NUMBER_REGEX, NUMBER_REGEX_WITH_PLUS } from "@/assets/constants";
import { countryList } from "@/assets/countryList";
import { getPhoneNoLength } from "@/helpers/phoneNumberUtil";
import {
  ClickEvent,
  Country,
  CountryState,
  InputEvent,
  Options,
  RefType,
  SelectEvent,
} from "@/types/types";
import { buildCountryMap, getMovedCountries } from "@/helpers/helpers";
import {
  validateDigits,
  validateNumberFollowedByEmail,
} from "@/helpers/validators";

type UseInputHookReturn = {
  country: CountryState;
  handleInputChange: (e: InputEvent) => void;
  minLength: number | null;
  maxLength: number | null;
  inputRef: RefType;
  handleClick: (e: ClickEvent) => void;
  handleChangeSelect: (e: SelectEvent) => void;
  moveKeyToTop: Country[];
  inputValue: string;
  isNumber: boolean;
};

/**
 * A hook to manage the input field for international phone numbers.
 * It handles the input change, key down, and click events for the input field.
 * It also handles the select change event for the country dropdown.
 * It returns an object containing the country state, input reference, minimum and maximum lengths,
 * and the handlers for the input change, key down, and click events.
 *
 * @param {Options} props - Options object with the following properties:
 *   - mode: "phone" or "hybrid".
 *   - multiCountry: boolean indicating whether multiple countries should be allowed.
 *   - defaultCountry: string indicating the default country code.
 *   - highLightCountries: array of strings indicating the highlighted countries.
 *   - preferredCountries: array of strings indicating the preferred countries.
 *
 * @returns {UseInputHookReturn} - An object containing the country state, input reference, minimum and maximum lengths,
 *   and the handlers for the input change, key down, and click events.
 */

type ExtendedOptions = Options & {
  value: string;
  onChange: (value: string) => void;
};

const useInputHook = (props: ExtendedOptions): UseInputHookReturn => {
  const {
    mode,
    multiCountry,
    defaultCountry,
    highLightCountries,
    preferredCountries,
    value,
    onChange,
  } = props;

  const mobileNumberOnly: boolean = mode === "phone";
  // const hybrid: boolean = mode === "hybrid";

  const countryMap = buildCountryMap();

  const defaultCode = preferredCountries?.includes(defaultCountry)
    ? defaultCountry
    : preferredCountries?.[0] || defaultCountry;

  const defaultDialCode: string = countryMap[defaultCode]?.dial_code;
  const defaultFlag: string = countryMap[defaultCode]?.image;

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [country, setCountry] = useState<CountryState>({
    presentDialCode: defaultDialCode,
    code: defaultCode,
    flag: defaultFlag,
  });
  const defaultUsername = mobileNumberOnly ? `${defaultDialCode} ` : "";
  const inputValue: string = value ? value : defaultUsername;

  const dialCodeLength = country?.presentDialCode?.length + 1;
  const isNumber = mobileNumberOnly
    ? true
    : NUMBER_REGEX_WITH_PLUS.test(inputValue);

  const [, number] = inputValue?.split(" ") || [];
  const hasNumberExceptDialCode = mobileNumberOnly
    ? true
    : NUMBER_REGEX.test(number);

  const { minLength, maxLength } = getPhoneNoLength(isNumber, country?.code);

  /**
   * Handles input change in the input field.
   *
   * @param e InputEvent
   * @description
   * If the input field contains a valid phone number, it is split into a dial code and a phone number.
   * If the phone number is empty, the username is set to an empty string.
   * If the phone number is valid, the username is set to the dial code followed by the phone number.
   * If the phone number is invalid, the username is set to the input value.
   * If the maxLength is set, the phone number is truncated to the maxLength.
   */

  const handleInputChange = (e: InputEvent) => {
    const newValue = (e.target as HTMLInputElement).value;
    let [, phoneNumber] = newValue?.split(" ") || [];

    // Handle cases where dialCode is missing
    if (!phoneNumber && newValue?.startsWith(country?.presentDialCode)) {
      phoneNumber = newValue?.slice(country.presentDialCode?.length)?.trim();
    }

    const cleanedPhone = phoneNumber?.replace(/[^\d]/g, "");

    let mobileNumber;

    if (mobileNumberOnly) {
      mobileNumber = `${country.presentDialCode} ${cleanedPhone}`;
    } else if (!mobileNumberOnly && validateNumberFollowedByEmail(newValue)) {
      if (validateDigits(newValue)) {
        mobileNumber = `${country.presentDialCode} ${newValue}`;
      } else {
        mobileNumber = newValue;
      }
    } else if (
      !mobileNumberOnly &&
      !validateNumberFollowedByEmail(phoneNumber)
    ) {
      if (
        newValue?.startsWith(`${country?.presentDialCode} `) &&
        !phoneNumber
      ) {
        mobileNumber = "";
      } else if (validateDigits(phoneNumber ? phoneNumber : newValue)) {
        {
          mobileNumber = `${country.presentDialCode} ${
            cleanedPhone ? cleanedPhone : newValue
          }`;
        }
      } else {
        mobileNumber = phoneNumber ? phoneNumber : newValue;
      }
    } else {
      mobileNumber = newValue;
    }

    // Enforce max length
    if (maxLength && cleanedPhone?.length > maxLength) {
      const trimmed = cleanedPhone?.slice(0, maxLength);
      onChange(`${country.presentDialCode} ${trimmed}`);
      return;
    }

    onChange(mobileNumber);
  };

  /**
   * Updates the country state based on the selected value from a dropdown.
   * If multiCountry is enabled, retrieves the selected country's dial code and flag image.
   * Updates the country state with the new code, dial code, username (set to dial code), and flag.
   *
   * @param {SelectEvent} e - The select event triggered by changing the dropdown value.
   */

  const handleChangeSelect = (e: SelectEvent) => {
    if (multiCountry) {
      const value = e.target.value;
      const dialCode =
        e.target.selectedOptions?.[0]?.getAttribute("data-dial-code") ?? "";
      const flag = countryMap[value]?.image ?? "";

      onChange(`${dialCode} `);
      inputRef.current?.focus();
      setCountry({
        code: value,
        presentDialCode: dialCode,
        flag,
      });
    }
  };

  /**
   * Handles the click event on the input field, ensuring cursor position
   * remains after the dial code. Prevents cursor from moving before the
   * dial code by setting the selection range to the end of the input value.
   *
   * @param {ClickEvent} e - The click event triggered on the input field.
   */

  const handleClick = (e: ClickEvent) => {
    if (!hasNumberExceptDialCode) return;

    const inputEl = e.target as HTMLInputElement;
    const startPos = inputEl.selectionStart ?? 0;

    if (startPos < dialCodeLength) {
      e.preventDefault();
      inputRef.current?.setSelectionRange(
        inputEl.value.length,
        inputEl.value.length
      );
    }
  };

  /**
   * Reorders the list of countries by moving highlighted and preferred countries to the top.
   *
   * @returns {Country[]} - A reordered list of countries with highlighted and preferred countries at the top.
   */

  const moveKeyToTop = getMovedCountries(
    countryList,
    countryMap,
    highLightCountries,
    preferredCountries
  );

  return {
    country,
    inputRef,
    minLength,
    maxLength,
    handleInputChange,
    handleChangeSelect,
    handleClick,
    moveKeyToTop,
    inputValue,
    isNumber,
  };
};

export default useInputHook;
