import {
  COUNTRY_SELECT_TYPE,
  CUSTOM_SELECT,
  DEFAULT_COUNTRY_CODE,
  DEFAULT_MODE,
  ENABLE_FLAG,
  FORMAT,
  HIDE_DIAL_CODE,
  MULTICUNTRY,
} from "@/assets/constants";
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
    format: format !== undefined ? format : FORMAT,
    enableFlag: enableFlag !== undefined ? enableFlag : ENABLE_FLAG,
    customSelect: {
      showFlag:
        customSelect?.showFlag !== undefined
          ? customSelect.showFlag
          : CUSTOM_SELECT.showFlag,
      showDialCode:
        customSelect?.showDialCode !== undefined
          ? customSelect.showDialCode
          : CUSTOM_SELECT.showDialCode,
      enableSearch:
        customSelect?.enableSearch !== undefined
          ? customSelect.enableSearch
          : CUSTOM_SELECT.enableSearch,
      searchPlaceholder:
        customSelect?.searchPlaceholder || CUSTOM_SELECT.searchPlaceholder,
    },
    multiCountry: multiCountry !== undefined ? multiCountry : MULTICUNTRY,
    defaultCountry:
      defaultCountry && isSupportedCountry(defaultCountry)
        ? defaultCountry
        : DEFAULT_COUNTRY_CODE,
    preferredCountries: preferredCountries || [],
    highLightCountries: highLightCountries || [],
    customArrowIcon: customArrowIcon || undefined,
    direction: direction === "rtl" ? "rtl" : "ltr",
    enforceHtmlSelect:
      enforceHtmlSelect !== undefined
        ? enforceHtmlSelect
        : COUNTRY_SELECT_TYPE === "native",
    enforceCustomSelect:
      enforceCustomSelect !== undefined
        ? enforceCustomSelect
        : COUNTRY_SELECT_TYPE !== "native",
    classes: classes || {},
    hideDialCode: hideDialCode !== undefined ? hideDialCode : HIDE_DIAL_CODE,
    ...rest,
  };
}
