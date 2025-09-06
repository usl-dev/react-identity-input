import { DEFAULT_COUNTRY_CODE, DEFAULT_MODE } from "@/assets/constants";
import { Options } from "@/types/types";
import { isSupportedCountry } from "libphonenumber-js";

export function getValidOptions(options: Partial<Options> = {}): Options {
  const {
    mode,
    format,
    enableFlag,
    customSelect,
    multiCountry,
    defaultCountry,
    preferredCountries,
    highLightCountries,
    customArrowIcon,
    direction,
    enforceHtmlSelect,
    enforceCustomSelect,
    classes,
    hideDialCode,
    ...rest
  } = options;

  return {
    mode: mode && ["hybrid", "phone"]?.includes(mode) ? mode : DEFAULT_MODE,
    format: format !== undefined ? format : true, // Default to true for phone number formatting
    enableFlag: enableFlag !== undefined ? enableFlag : true, // Default to true to show flags
    customSelect: {
      showFlag:
        customSelect?.showFlag !== undefined ? customSelect.showFlag : false,
      showDialCode:
        customSelect?.showDialCode !== undefined
          ? customSelect.showDialCode
          : false,
      enableSearch:
        customSelect?.enableSearch !== undefined
          ? customSelect.enableSearch
          : true,
      searchPlaceholder:
        customSelect?.searchPlaceholder || "Find your country...",
    },
    multiCountry: multiCountry !== undefined ? multiCountry : false,
    defaultCountry:
      defaultCountry && isSupportedCountry(defaultCountry)
        ? defaultCountry
        : DEFAULT_COUNTRY_CODE,
    preferredCountries: preferredCountries || [], // Default to empty array
    highLightCountries: highLightCountries || [], // Default to empty array
    customArrowIcon: customArrowIcon || undefined, // Default to undefined (uses default arrow)
    direction: direction === "rtl" ? "rtl" : "ltr",
    enforceHtmlSelect:
      enforceHtmlSelect !== undefined ? enforceHtmlSelect : true,
    enforceCustomSelect:
      enforceCustomSelect !== undefined ? enforceCustomSelect : false,
    classes: classes || {}, // Default to empty object for CSS classes
    hideDialCode: hideDialCode !== undefined ? hideDialCode : false, // Default to false
    ...rest,
  };
}
